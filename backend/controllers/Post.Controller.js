const Post = require('../models/Post.Model');

const CreatePost = async(req,res)=>{
    const {title,imageUrl,description} = req.body;
    const userId = req.params.id;
    if(!title || !imageUrl || !description)
    {
        return res.status(404).json({message:"Fill all the fields!"});
    }
    try{ 
        const post = new Post({title,imageUrl,description,userId,like:[],comment:[]});
        await post.save();

        res.status(200).json({message:"Blog Posted Successfully!"});

    }
    catch(error)
    {
        res.status(500).json({error});
    }
}

const getPost = async(req,res)=>{
   try{
      const posts = await Post.find();
      if(posts)
      {
      res.status(200).json({message:"Data Fetched!",posts});
      }
      else{
        res.status(404).json({message:"Data not Found!"});
      }
   }
   catch(error){
    res.status(500).json({error});
   }
}

const getPostById = async(req,res)=>{
    const userId = req.params.id;
    console.log("userId",userId);
   try{
      const posts = await Post.find();
        console.log("POSTS",posts);
      const response = await posts.filter((post)=>post.userId.toString()===userId.toString());
        console.log("res:",response);
      if(response.length>0)
      {
        res.status(200).json({message:"Data Fetched!",response});
      }
      else{
        res.status(404).json({message:"Data Not Found!"});
      }
      
   }
   catch(error){
    res.status(500).json({error});
   }
}

const deletePost = async(req,res)=>{
   const id = req.params.id;
   try{
        const response = await Post.findByIdAndDelete(id);
        if(response)
        {
            res.status(200).json({message:"Post Deleted Successfully!"});
        }
        else{
            res.status(404).json({message:"Post not Found!"});
        }
   }
   catch(error){
    res.status(500).json({error});
   }
}


module.exports = {
    CreatePost,
    getPost,
    getPostById,
    deletePost,
}