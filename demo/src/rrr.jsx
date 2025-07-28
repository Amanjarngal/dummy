// Home.js
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './rrr.css';
import Footer from './Footer'
import axios from 'axios';
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

const Home = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const { hello, id, name } = useParams();
  const location = useLocation();
  const [show, setShow] = useState(false)
  const [imageUrl, setImageUrl] = useState(null);
  const [toggle, setToggle] = useState(false);
  const userId = localStorage.getItem('userId')
  const [comment, setComment] = useState('');
  console.log(hello, id, name);


  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getPost');
        if (response && response.status == 200) {
          setBlogPosts(response.data.posts);
        }
        else {
          alert(response.data.message || response.data.error);
        }
      }
      catch (error) {
        console.log(error);
      }

    }

    getPosts();
  }, [toggle])

  const handleModal = (image) => {
    setImageUrl(image);
    setShow((prev) => !prev);
  }

  const doLike = async (id) => {
    const response = await axios.put(`http://localhost:5000/doLike/${userId}/${id}`);
    if (response && response.status == 200) {
      setToggle((pre) => !pre);
    }

  }

  const addComment = async (id) => {
    if(!comment)
    {
      return alert("First Write Comment!");
    }
    const response = await axios.put(`http://localhost:5000/addComment/${userId}/${id}`,{comment});
    if (response && response.status == 200) {
      setToggle((pre) => !pre);
      alert(response.data.message);
      setComment('');
    }
  }


  return (
    <>
      <main className="home" style={{ position: 'relative', left: "0", top: "0" }}>
        <h2>Blog Posts</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px",
            padding: "40px",
            backgroundColor: "#f9f9f9",
          }}
        >
          {blogPosts.map((post) => (
            <div
              key={post._id}
              style={{
                background: "#fff",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                transition: "transform 0.2s ease, box-shadow 0.3s ease",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
              }}
            >
              <img
                src={post.imageUrl}
                alt={post.title}
                onClick={() => handleModal(post)}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <h3
                style={{
                  margin: "16px",
                  fontSize: "1.2rem",
                  color: "#333",
                }}
              >
                {post.title}
              </h3>
              <p
                style={{
                  margin: "0 16px 12px 16px",
                  fontSize: "0.95rem",
                  color: "#666",
                }}
              >
                {post.description}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0 16px 16px 16px",
                  fontSize: "0.9rem",
                  color: "#444",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <FaHeart style={{ height: "20px", width: "20px", color: post.like.some((like) => like.userId === userId) ? "red" : "gray" }} onClick={() => doLike(post._id)} /> {post.like.length}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <FaComment /> {post.comment.length}
                </span>
              </div>
            </div>
          ))}
        </div>


      </main>



      {show && (
  <div style={{
    position: "fixed",
    zIndex: "1000",
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.6)",
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 0
  }}>
    <div style={{
      height: "80%",
      width: "80%",
      maxWidth: "1000px",
      background: "#fff",
      borderRadius: '10px',
      display: "flex",
      flexDirection: "row",
      position: "relative",
      overflow: "hidden",
      boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)"
    }}>
      {/* Close Button */}
      <button onClick={() => {
        setImageUrl(null);
        setShow(false);
      }} style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        border: "none",
        background: "transparent",
        fontSize: "20px",
        cursor: "pointer"
      }}>×</button>

      {/* Left Side - Image and Info */}
      <div style={{
        width: "50%",
        padding: "20px",
        borderRight: "1px solid #ccc",
        overflowY: "auto"
      }}>
        <img
          src={imageUrl.imageUrl}
          alt="post"
          style={{
            width: "100%",
            maxHeight: "250px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "10px"
          }}
        />
        <h3>{imageUrl.title}</h3>
        <p>{imageUrl.description}</p>

        {/* Like & Comment Counts */}
        <div style={{ marginTop: "10px", display: "flex", gap: "20px" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
            <FaHeart
              style={{
                height: "20px",
                width: "20px",
                color: imageUrl.like.some((like) => like.userId === userId) ? "red" : "gray"
              }}
              onClick={() => doLike(imageUrl._id)}
            />
            {imageUrl.like.length}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <FaComment />
            {imageUrl.comment.length}
          </span>
        </div>
      </div>

      {/* Right Side - Comments */}
      <div style={{ width: "50%", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          padding: "15px 20px",
          borderBottom: "1px solid #ccc"
        }}>
          <img
            style={{ height: '40px', width: "40px", borderRadius: "50%", marginRight: "10px" }}
            src="data:image/jpeg;base64,/9j/..." // Keep your base64 here
            alt="user"
          />
          <h4 style={{ margin: 0 }}>Deepak Kumar</h4>
        </div>

        {/* Comments */}
        <div style={{
          padding: "10px 20px",
          flex: 1,
          overflowY: "auto"
        }}>
          {imageUrl.comment.map((cmt, idx) => (
            <div key={idx} style={{ marginBottom: "10px", borderBottom: "1px solid #eee", paddingBottom: "5px" }}>
              <p style={{ margin: 0 }}>{cmt.cmt}</p>
            </div>
          ))}
        </div>

        {/* Comment Input */}
        <div style={{
          display: "flex",
          alignItems: "center",
          padding: "10px 20px",
          borderTop: "1px solid #ccc"
        }}>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            style={{
              flex: 1,
              padding: "8px 10px",
              border: "1px solid #ccc",
              borderRadius: "20px",
              outline: "none"
            }}
          />
          <IoMdSend
            onClick={() => addComment(imageUrl._id)}
            style={{
              marginLeft: "10px",
              fontSize: "24px",
              color: "#333",
              cursor: "pointer"
            }}
          />
        </div>
      </div>
    </div>
  </div>
)}



      <Footer />
    </>
  );
};

export default Home;
