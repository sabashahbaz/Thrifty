const mongoose = require('mongoose')

const myListingSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: String,
    brand: String,
    image: [String],
    description: String,
    price: Number, 
    color: String,
    size: mongoose.Schema.Types.Mixed,
})


const MyListingModel = mongoose.model('MyListing', myListingSchema)

module.exports = MyListingModel