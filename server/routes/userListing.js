const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const MyListing = require('../models/MyListing.js')
const multer = require('multer')
const fs = require('fs')
const path = require('path');
// const uploades = require('../uploads')

require('dotenv').config();
//const app = express();

const jwtSecret = process.env.JWT_SECRET;

router.use('/uploads', express.static(path.join(__dirname, '..', 'uploads'))) //using express middleware (express.static) to make files assessible in thr browser
const newName = Date.now() + '.jpg';
const imageMiddleware = multer({dest:'uploads'})

//upload files from computer + change the uploaded file name to include end extention 
router.post('/uploadImages',imageMiddleware.array('images', 50), (req,res) => {
    const uploadedFiles = [] // create an empty array of files that will be the uploaded files
    for (let i = 0; i < req.files.length; i++){ //as long as i is less than the length of the files coming from the res, increment i by 1 
        const {path, originalname} = req.files[i]; //fom the file, desctructing the path and original name
        const parts = originalname.split('.'); //splits the name based on the dot, to get the file extension
        const ext = parts[parts.length -  1]; // remove the last part of the extenion 
        const newPath = path + '.' + ext; //add the last part to the path, which is the temp location of the file
        fs.renameSync(path, newPath) // remaning the original path to the new path name 
        uploadedFiles.push(newPath.replace('uploads/', '')); // add new path to loaded files array 
    }
    res.json(uploadedFiles); // send client the response
})

//adding a new listing 
router.post('/addNewListing', async (req,res) => {
    const {token} = req.cookies;
    const {
        title, brand, addedImages, description, price, colors, size
    } = req.body
    jwt.verify(token, jwtSecret, async (err, userData) => { 
        if (err) throw err;
    const ListingData = await MyListing.create({
        owner: userData.id,
        title, brand, images:addedImages, description, price, colors, size
        
    })
    res.json(ListingData)
})
})

//to have the listings displayed
router.get('/userListings', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, async (err, user) => {
        const {id} = user;
        res.json( await MyListing.find({owner:id}) );
    })
})

//so the form will have the data filled out 
router.get('/listings/:id', async (req,res) => {
    const {id} = req.params;
    res.json(await MyListing.findById(id))
})

//update my listing 
router.put('/updateNewListing/', async (req, res) => {
    const { token } = req.cookies;
    const { id, title, brand, images, description, price, colors, size } = req.body;
    jwt.verify(token, jwtSecret, async (err, user) => {
        const listingData = await MyListing.findById(id);
        if (user.id == listingData.owner.toString()) {
            // Only update fields that need to be updated
            listingData.title = title;
            listingData.brand = brand;
            listingData.description = description;
            listingData.price = price;
            listingData.colors = colors;
            listingData.size = size;

            // Update images only if new images are provided
            if (images && images.length > 0) {
                listingData.images = images;
            }
            await listingData.save();
            res.json('ok');
        }
    });
});

//delete my listing 
router.delete('/deleteListing/:itemId', (req,res) => {
    const {token} = req.cookies;
    const {itemId} = req.params;

    jwt.verify(token, jwtSecret, async (err, userData) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const deletedItem = await MyListing.findOneAndRemove({
            owner: userData.id,
            _id: itemId
        })
        if (!deletedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json({message: "item deleted from wishlist"})
    })
})

module.exports = router;