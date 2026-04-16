const express = require('express')
const multer = require('multer')
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const router = express.Router()
const path = require('path')




const storage = multer.diskStorage({
    destination : function(req ,  file , CallBack){
        CallBack(null , path.resolve(`./public/uploads/`))
    },
    filename : function(req , file , CallBack){
        const filename = `${Date.now()}-${file.originalname}`
        CallBack(null , filename)
    }
})

const upload = multer({storage : storage})

router.get('/addblog' , (req , res) => {
    return res.render("AddBlog" , {
        user : req.user
    })
})

router.post('/' , upload.single("coverImgURl") ,async (req , res) => {
        const {title , description} = req.body;
        const blog = await Blog.create({
            title,
            description,
            coverImgURl: `/uploads/${req.file.filename}`,
            createdBy : req.user._id
        })
        return res.redirect(`/blog/${blog._id}`)
        
})


router.post('/comment/:blogId', async (req, res) => {
    await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id
    });

    return res.redirect(`/blog/${req.params.blogId}`);
});

router.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate('createdBy');

    const comments = await Comment.find({ blogId : req.params.id }).populate("createdBy");

    console.log("comments" , comments);
    

    return res.render('blog', {
        user: req.user,
        blog,
        comments,
    });
});


module.exports = router