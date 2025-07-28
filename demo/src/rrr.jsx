// Home.js
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './rrr.css';
import Footer from './Footer'
import axios from 'axios';
import { CiHeart } from "react-icons/ci";
import { FaComment } from "react-icons/fa";

const Home = () => {
  const [blogPosts ,setBlogPosts] = useState([]);
  const {hello, id, name} = useParams();
  const location = useLocation();
  const [show, setShow] = useState(false)
  const [imageUrl,setImageUrl] = useState(null);
  console.log(hello, id, name);


  useEffect(()=>{
     const getPosts = async()=>{
         try{
              const response = await axios.get('http://localhost:5000/getPost');
              if(response && response.status==200)
              {
                setBlogPosts(response.data.posts);
              }
              else{
                alert(response.data.message || response.data.error);
              }
         }
         catch(error)
         {
             console.log(error);
         }

     }

     getPosts();
  },[])

  const handleModal = (image)=>{
      setImageUrl(image);
      setShow((prev)=>!prev);
  }


  return (
    <>
    <main className="home" style={{position:'relative', left:"0",top:"0"}}>
      <h2>Blog Posts</h2>
      <div className="blog-grid">
        {blogPosts.map((post) => (
          <div key={post._id} className="blog-card">
            <img src={post.imageUrl} alt={post.title}  onClick={()=>handleModal(post.imageUrl)}/>
            <h3>{post.title}</h3>
            <p>{post.description}</p>   <CiHeart />  <FaComment />
          </div>
        ))}
      </div>
    </main>



{show && <div style={{position:"fixed", zIndex:"1", width:'100%', height:"100%",background:"rgba(0,0,0,0.6)", display:'flex', justifyContent:"center", alignItems:"center", left:"0",top:"0"}}>
   <div style={{height:"70%", width:"50%",background:"white", borderRadius:'8px'}}>
    <button onClick={()=>{
      setImageUrl(null);
      setShow((prev) =>!prev);
    }}>X</button>
      <img  src={imageUrl} style={{height:"100%", width:"100%",borderRadius:"8px"}}/>
   </div>
</div>}


    <Footer />
    </>
  );
};

export default Home;
