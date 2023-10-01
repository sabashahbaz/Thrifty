const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User.js');
require('dotenv').config();
const app = express();

app.use(express.json())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3100',
}));
mongoose.connect(process.env.MONGO_URL)

app.get('/test', (req, res) => {
    res.json('Hello World!');
});
app.post('/register', async (req,res) => {
    console.log(req.body);
    const {firstName, lastName, email, password} = req.body;
    const user = await User.create({
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password, 10),
    }) 
    res.json(user);
});


app.listen(4000, () => {
    console.log('back-end listening on port 4000!');
});