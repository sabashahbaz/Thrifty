const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    product: {
        productId: {type: String, required: true},
        title: {type: String, required: true},
        size: {type: String, required: true},
        price: {type: Number, required: true},
        image: {type:String, required: true }
    },

    addedAt: {
        type: Date,
        default: Date.now,
        required: true
    }

})

const WishlistModel = mongoose.model('Wishlist', wishlistSchema)
module.exports = WishlistModel;