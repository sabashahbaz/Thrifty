const mongoose = require('mongoose')

const myListingSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: String,
    brand: String,
    images: [String],
    description: String,
    price: Number, 
    colors: [String],
    size: String,
})


const MyListingModel = mongoose.model('MyListing', myListingSchema)

module.exports = MyListingModel