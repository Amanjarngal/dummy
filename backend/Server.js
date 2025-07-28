const express = require('express')
const dotenv = require('dotenv');
const cors = require('cors');
const ConnectDB = require('./config/ConnectDB')
const {Signup, Login} = require('./controllers/User.Controller')
const {CreatePost, getPost, getPostById, deletePost, doLike, addComment} = require('./controllers/Post.Controller')
const varifyToken = require('./middlewares/Varification')
const app    = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
require("dotenv").config();
app.use(express.json());
app.use(cors());
ConnectDB();


app.post('/signup',Signup)
app.post('/login',Login)
app.post('/addPost/:id',CreatePost)
app.get('/getPost',getPost)
app.put('/doLike/:userId/:postId',doLike)
app.put('/addComment/:userId/:postId',addComment)
app.get('/getPostById/:id',getPostById)
app.delete('/deletePost/:id',deletePost)
app.get('/user',(req,res)=>{
     res.json({message:"hello World"});
})

app.get('/verify-token',varifyToken,(req,res)=>{
    res.status(200).json({message:"Token Varified!",userId:req.user})
});



app.listen(PORT,()=>{
    console.log(`Server is running on Port ${PORT}`);
});