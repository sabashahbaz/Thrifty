const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Wishlist = require('../models/Wishlist.js')

require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;
const apiKey = process.env.POSHMARK_API_KEY

//add products to wishlist
router.post('/addToWishlist', async (req, res) => {
    const { token } = req.cookies;
    console.log(token)
    const { productId, title, price, size, image } = req.body;
    console.log("req.body", req.body)
    jwt.verify(token, jwtSecret, async (err, userData) => {
        if (err) throw err;
        
        const newWishlistItem = await Wishlist.create({ 
            owner: userData.id,
            product: {productId, title, price, size ,image
            }
        });
        res.json(newWishlistItem);
    })
});

//get all the products added to user's wishlist 
router.get('/wishlistProducts', async (req,res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, async (err, userData) => {
        // console.log(userData.id)
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        try {
            const wishlistItems = await Wishlist.find({owner:userData.id})
            console.log(wishlistItems)
            res.json(wishlistItems)
        }catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    })
})

//delete item from wishlist based on product id
router.delete('/deleteFromWishlist/:itemId', async (req,res) => {
    const {token} = req.cookies;
    const {itemId} = req.params;
    console.log("req body", req.params)

    jwt.verify(token, jwtSecret, async (err, userData) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const deletedItem = await Wishlist.findOneAndRemove({
            owner: userData.id,
            'product.productId': itemId
        })
        if (!deletedItem) {
            return res.status(404).json({ error: 'Item not found in the wishlist' });
        }

        res.json({message: "item deleted from wishlist"})
    })
})

//get wishlist products from useEffect via product id 
router.get('/searchWishlistByID/:id', async (req, res) => {
    
    const wishlistProductId = req.params.id

    const options = {
        method: 'GET',
        url: 'https://poshmark.p.rapidapi.com/listing',
        params: {
            id: wishlistProductId,
            domain: 'com'
        },
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'poshmark.p.rapidapi.com'
        }
    };
    
    try {
        const response = await axios.request(options);

    // Process and filter the data as needed
        const wishlistProduct= response.data;

        const filteredData = {
            id: wishlistProduct.id,
            title:wishlistProduct.title,
            department: wishlistProduct.department.display,
            category: {
                category: wishlistProduct.category_v2.display, 
                category_features: wishlistProduct.category_features.display},
            colors: wishlistProduct.colors,
            price: wishlistProduct.price_amount,
            size: wishlistProduct.size_obj.display_with_size_system,
            description: wishlistProduct.description,
            images: wishlistProduct.pictures.map(picture => picture.url),
            coverImage: wishlistProduct.picture_url,
            brand: wishlistProduct.brand
        };

    res.json({ data: filteredData });
        console.log({data: filteredData})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching and filtering data.' });
    }
})

module.exports = router;