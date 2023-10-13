const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const MyListing = require('./models/MyListing.js')
const Wishlist = require('./models/Wishlist.js')
const ShoppingCart = require('./models/ShoppingCart.js')
const cookieParser = require('cookie-parser');
const multer = require('multer')
const fs = require('fs')
const axios = require('axios')

require('dotenv').config();
const app = express();

const jwtSecret = process.env.JWT_SECRET;
const apiKey = process.env.POSHMARK_API_KEY

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+'/uploads')) //using express middleware (express.static) to make files assessible in thr browser
app.use(cors({
    origin: 'http://localhost:3100',
    credentials: true,
}));
mongoose.connect(process.env.MONGO_URL)


app.post('/register', async (req,res) => {
    console.log(req.body);
    const {firstName, lastName, email, password} = req.body;

    try {
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, 10),
        }) 
        res.json(user);
    } catch (e) {
        res.status(422).json(e)
    }
});

app.post('/login', async (req,res) => {
    const {email, password} = req.body;
    // console.log("helloooo",req.body);
    const user = await User.findOne({email});
    // console.log("meow", user)
    if (user) {
        // console.log("who did i find",user)
        const passwordOk = bcrypt.compareSync(password, user.password);
        if (passwordOk) {
            res.status(200)
            jwt.sign({
                email: user.email, 
                id:user._id, 
            }, 
                jwtSecret, {}, (err, token)=> {
                if (err) throw err;
                res.cookie('token', token).json(user);
                console.log(token)
            }) 
        } else {
        res.status(422).json('password is incorrect');
        }
    } else {
        res.json("user not found");
    }
});

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, async (err, userData) => { 
            if (err) throw err;
            const {firstName, email, _id} = await User.findById(userData.id)
            res.json({firstName, email, _id});
        });
    } else {
        res.json(null);
    }
})

console.log({__dirname})
const newName = Date.now() + '.jpg';
const imageMiddleware = multer({dest:'uploads'})

//upload files from computer + change the uploaded file name to include end extention 
app.post('/uploadImages',imageMiddleware.array('images', 50), (req,res) => {
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
app.post('/addNewListing', async (req,res) => {
    const {token} = req.cookies;
    console.log(token)
    const {
        title, brand, addedImages, description, price, colors, size
    } = req.body
    console.log("req body",req.body)
    jwt.verify(token, jwtSecret, async (err, userData) => { 
        if (err) throw err;
    const ListingData = await MyListing.create({
        owner: userData.id,
        title, brand, images:addedImages, description, price, colors, size
        
    })
    console.log("what is being added",ListingData)
    res.json(ListingData)
})
})

//to have the listings displayed
app.get('/userListings', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, async (err, user) => {
        const {id} = user;
        res.json( await MyListing.find({owner:id}) );
    })
})

//so the form will have the data filled out 
app.get('/listings/:id', async (req,res) => {
    console.log("req", req)
    const {id} = req.params;
    res.json(await MyListing.findById(id))
})

//update my listing 
app.put('/updateNewListing/', async (req, res) => {
    const { token } = req.cookies;
    const { id, title, brand, images, description, price, colors, size } = req.body;
    console.log("what is happening", req.body);
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
app.delete('/deleteListing/:itemId', (req,res) => {
    const {token} = req.cookies;
    const {itemId} = req.params;
    console.log("req body", req.params)

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

//get the products from Poshmark via user input
app.get('/searchProducts/:query', async (req, res) => {
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
            // department: product.department.display,
            // category: {
            //     category: product.category_v2.display, 
            //     category_features: product.category_features.display},
            // colors: product.colors,
            price: product.price_amount,
            size: product.size_obj.display_with_size_system,
            // description: product.description,
            // images: product.pictures.map(picture => picture.url),
            coverImage: product.picture_url
        }));

    res.json({ data: filteredData });
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching and filtering data.' });
    }
});

//get products from useEffect via product id 
app.get('/searchProductsByID/:id', async (req, res) => {
    
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
    console.log({data: filteredData})
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching and filtering data.' });
    }
})

//add products to wishlist
app.post('/addToWishlist', async (req, res) => {
    const { token } = req.cookies;
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

//get all the products added to user's list 
app.get('/wishlistProducts', async (req,res) => {
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
app.delete('/deleteFromWishlist/:itemId', async (req,res) => {
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
app.get('/searchWishlistByID/:id', async (req, res) => {
    
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

//add products to the shopping cart
app.post('/addToCart', (req, res) => {
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
app.get('/getProductsFromCart', (req,res) => {
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
app.delete('/deleteProductFromCart/:id', (req,res) => {
    const {token} = req.cookies;
    const {id} = req.params;
    console.log("MANO", req.params)
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

//logout user => clear web token 
app.delete('/logout', (req,res) => {
    // res.cookie('token', ' ').json(true);
    res.clearCookie('token')
    res.status(204).end();;
});

app.get('/test', (req, res) => {
    res.json('Hello World!');
}); 


app.listen(4000, () => {
    console.log('back-end listening on port 4000!');
});

//nodemon index.js 