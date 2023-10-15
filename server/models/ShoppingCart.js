const mongoose = require('mongoose')

const shoppingCartSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: String, 
    image: String,
    price: Number,
    size: String
})

const ShoppingCart = mongoose.model("ShoppingCart", shoppingCartSchema)

module.exports = ShoppingCart