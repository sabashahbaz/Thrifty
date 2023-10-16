const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const axios = require('axios')

require('dotenv').config();
const apiKey = process.env.POSHMARK_API_KEY

//get the products from Poshmark via user input
router.get('/searchProducts/:query', async (req, res) => {
    const userInput = req.params.query;

    const options = {
        method: 'GET',
        url: 'https://poshmark.p.rapidapi.com/search',
        params: {
            query: userInput,
            domain: 'com'
        },
        headers: {
            'Accept-Encoding': 'gzip, deflate',
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'poshmark.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);

    // Process and filter the data as needed
        const apiData = response.data;

        const filteredData = apiData.data.map(product => ({
            id: product.id,
            title: product.title,
            price: product.price_amount,
            size: product.size_obj.display_with_size_system,
            coverImage: product.picture_url
        }));

    res.json({ data: filteredData });
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching and filtering data.' });
    }
});

//get products from useEffect via product id 
router.get('/searchProductsByID/:id', async (req, res) => {
    
    const productId = req.params.id

    const options = {
        method: 'GET',
        url: 'https://poshmark.p.rapidapi.com/listing',
        params: {
            id: productId,
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
        const product= response.data;

        const filteredData = {
            id: product.id,
            title: product.title,
            department: product.department.display,
            category: {
                category: product.category_v2.display, 
                category_features: product.category_features.display},
            colors: product.colors,
            price: product.price_amount,
            size: product.size_obj.display_with_size_system,
            description: product.description,
            images: product.pictures.map(picture => picture.url),
            coverImage: product.picture_url,
            brand: product.brand
        };

    res.json({ data: filteredData });
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching and filtering data.' });
    }
})

module.exports = router;