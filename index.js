require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./config/connection')
const path = require('path')
const UserRoute = require('./routes/user')

const app = express()



app.set("view engine" , 'ejs')
app.set('views' , path.resolve("./views"))

// Coonection To Database 
connectDB();




// Middelware All Here
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.get('/' , (req , res) => {
    res.render("Home")
})

app.use('/user' , UserRoute)

app.listen(process.env.SERVER_PORT  , () => {
    console.log(`Server Is Running On Port ${process.env.SERVER_PORT}`);
})