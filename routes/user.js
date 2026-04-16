const express = require('express')
const User = require('../models/user')
const { CreateTokenForUser } = require('../services/authantication')
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
    try{
            const token = await User.matchPasswordCreateToken(email , password)
            return res.cookie("token" , token).redirect("/")
        
        } 
        catch (error) {
        console.log(error.message);

        return res.render("SignIn", { 
            error: error.message   // 👈 use real message
        });
            
        
    }

    // console.log("token" , token);
})


router.get('/logout' , (req ,res) => {
    res.clearCookie("token").redirect("/")
})




module.exports = router