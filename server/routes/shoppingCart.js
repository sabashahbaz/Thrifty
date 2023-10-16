const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const ShoppingCart = require('../models/ShoppingCart.js')

require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;
const stripeKey = process.env.STRIPE_KEY;


const stripe = require('stripe')(stripeKey)

//add products to the shopping cart
router.post('/addToCart', (req, res) => {
    const {token} = req.cookies;
    const{title, price, image, size} = req.body
    jwt.verify(token, jwtSecret, async (err, userData) => {
        if (err) throw err;
    const addToCart = await ShoppingCart.create({
        owner: userData.id,
        title, price, image, size
    })
    res.json(addToCart)
    })
})

//get products user added to their cart 
router.get('/getProductsFromCart', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, async (err, userData) => {
        if (err) throw err
        try {
            const userProducts = await ShoppingCart.find({owner:userData.id})
            res.json(userProducts)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Server error' });
        }
    })
})

//delete product from cart based on product id
router.delete('/deleteProductFromCart/:id', (req,res) => {
    const {token} = req.cookies;
    const {id} = req.params;
    jwt.verify(token, jwtSecret, async (err, userData) => {
        if (err) {
            return res.status(401).json({error: "unauthorized"});
        }
        const deletedProduct = await ShoppingCart.findOneAndRemove({
            owner: userData.id,
            _id: id
        })
        console.log("deletedProduct",deletedProduct)
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Item not found in shopping cart' });
        }
        res.json({message: "item deleted from wishlist"})
    })
})

router.post('/checkout', async (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, async (err, userData) => {
        if (err) {
            return res.status(401).json({error: "Unauthorized"});
        }

        const userShoppingCart = await ShoppingCart.find({owner:userData.id})
        if (userShoppingCart.length === 0 ) {
            return res.status(400).json({error: "shopping cart is empty"})
        }

    const line_items = userShoppingCart.map( item =>{
        return{
            price_data:{
                currency: 'usd',
                product_data: {
                    name: `${item.title} - Size: ${item.size}`,
                    images: [item.image],
                },
                unit_amount: item.price *100,
            },
            quantity: 1,
        }
    })
    const session = await stripe.checkout.sessions.create({
        shipping_options: [
            {
            shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
                amount: 0,
                currency: "usd",
            },
            display_name: "Free shipping",
            // Delivers between 5-7 business days
            delivery_estimate: {
                minimum: {
                unit: "business_day",
                value: 5,
                },
                maximum: {
                unit: "business_day",
                value: 7,
                },
            },
            },
        },
        {
            shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
                amount: 1500,
                currency: "usd",
            },
            display_name: "Next day air",
            // Delivers in exactly 1 business day
            delivery_estimate: {
                minimum: {
                unit: "business_day",
                value: 1,
                },
                maximum: {
                unit: "business_day",
                value: 1,
                },
            },
            },
        },
        ],
        phone_number_collection: {
        enabled: true,
        },
        line_items,
        payment_method_types: ['card'],
        mode: 'payment',
        shipping_address_collection: {
            allowed_countries: ['US', 'CA'],
        },
        phone_number_collection: {
            enabled: true,
        },
        success_url: "http://localhost:3100/success",
        cancel_url: "http://localhost:3100/cancel"
    });

    await ShoppingCart.deleteMany({owner: userData.id}) // after user has purchased items, delete them from shopping cart 

    res.send({url:session.url});
})
});

module.exports = router;