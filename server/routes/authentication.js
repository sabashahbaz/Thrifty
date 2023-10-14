const express = require('express');
const router = express.Router();

router.post('/register', async (req,res) => {
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

router.post('/login', async (req,res) => {
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


module.exports = router;