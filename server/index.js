const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

require('dotenv').config();
const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3100',
    credentials: true,
}));
mongoose.connect(process.env.MONGO_URL)
app.use(express.static("public"));

const userAuthRoutes = require('./routes/userAuth.js');
const userListingRoutes = require('./routes/userListing.js')
const producutsRoutes = require('./routes/products.js')
const wishlistRoutes = require('./routes/wishlist.js')
const shoppingCartRoutes = require('./routes/shoppingCart.js')

app.use(userAuthRoutes)
app.use(userListingRoutes)
app.use(producutsRoutes)
app.use(wishlistRoutes)
app.use(shoppingCartRoutes)

app.get('/test', (req, res) => {
    res.json('Hello World!');
}); 

app.listen(4000, () => {
    console.log('back-end listening on port 4000!');
});

//nodemon index.js 