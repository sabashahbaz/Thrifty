const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema  = new Schema({ 

    firstName: String,
    lastName: String,
    email: {type:String, unique: true},
    password: String,
})

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;