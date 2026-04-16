require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/connection')
const path = require('path')
const UserRoute = require('./routes/user')
const BlogRoute = require('./routes/blog')
const { CheckForAuthenticationCookie } = require('./middlewares/authantication')
const Blogs = require('./models/blog')

const app = express()
app.use(cookieParser())



app.set("view engine" , 'ejs')
app.set('views' , path.resolve("./views"))

// Coonection To Database 
connectDB();




// Middelware All Here
app.use(express.static(path.resolve('./public')))
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(CheckForAuthenticationCookie("token"))

app.get('/' , async (req , res) => {

    const allBlogs = await Blogs.find({})
    res.render("Home" , {
        user : req.user,
        Blogs : allBlogs,
    });
})  

app.use('/user' , UserRoute)
app.use('/blog' , BlogRoute)




app.listen(process.env.PORT  , () => {
    console.log(`Server Is Running On Port ${process.env.PORT}`);
})