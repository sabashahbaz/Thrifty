const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const cookieParser = require('cookie-parser');
const multer = require('multer')
const fs = require('fs')

require('dotenv').config();
const app = express();

const jwtSecret = process.env.JWT_SECRET;

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+'/uploads')) //using express middleware (express.static) to make files assessible in thr browser
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3100',
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
    console.log("helloooo",req.body);
    const user = await User.findOne({email});
    console.log("meow", user)
    if (user) {
        console.log("who did i find",user)
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
                console.log("did it set",res.cookie('token'));
            } ) 
        } else {
        res.status(422).json('password is incorrect');
    }
    } else {
    res.json("user not found");
    }
});

app.get('/profile', (req, res) => {
    console.log("meio")
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

app.post('/logout', (req,res) => {
    res.cookie('token', ' ').json(true);
});

app.get('/test', (req, res) => {
    res.json('Hello World!');
});

//nodemon index.js  

app.listen(4000, () => {
    console.log('back-end listening on port 4000!');
});