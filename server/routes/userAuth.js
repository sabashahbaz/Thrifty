const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;

//     ** handle all routes for authentication and JWT creation **      \\

//register user 
router.post('/register', async (req,res) => {
    const {firstName, lastName, email, password} = req.body;    //information received from client 
    try {
        const user = await User.create({       //create user in User model 
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, 10),   //secure the password 
        }) 
        res.json(user);
    } catch (e) {
        res.status(422).json(e)
    }
});

//user login 
router.post('/login', async (req,res) => {

    const {email, password} = req.body;
    const user = await User.findOne({email});    //check to see if user exists in User model 
    if (user) {   
        const passwordOk = bcrypt.compareSync(password, user.password);  //use bcrypt library to compare password
        if (passwordOk) {
            res.status(200)
            jwt.sign({
                email: user.email, 
                id:user._id, 
            }, 
                jwtSecret, {}, (err, token)=> {
                if (err) throw err;
                res.cookie('token', token).json(user);  //set JWT as cookie
            }) 
        } else {
        res.status(422).json('password is incorrect');
        }
    } else {
        res.json("user not found");
    }
});

//user logout 
router.delete('/logout', (req,res) => {
    res.clearCookie('token')
    res.status(204).end();;
});

module.exports = router;