const express = require('express')
const User = require('../models/user')
const router = express.Router()

// all  routes
// Sign In Router  to route one page to another page 
router.get('/signin' , (req , res) => {
    return res.render("SignIn")
})

router.get('/signup' , (req , res) => {
    return res.render("SignUp")
})

// Sign Up Router 
router.post('/signup' , async(req , res) => {
    const {FullName , email , password } = req.body;

    await User.create({
        FullName,
        email,
        password,
    });

    return res.redirect("/")
})


//  Sign In Router 
router.post('/signin' , async (req , res) => {
    const {email , password} = req.body;
    const user = await User.matchPassword(email , password)

    console.log("User" , user);
    

     return res.redirect("/")
})




module.exports = router