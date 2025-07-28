import { useState, useEffect } from "react";
import axios from 'axios';
import { MdDelete } from "react-icons/md";

const Profile = () => {
    const [posts, setPosts] = useState([]);
    const [toggle, setTggle] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const userId = localStorage.getItem('userId');
    const [show, setShow] = useState(false);
    const [modalPost, setModalPost] = useState(null);
    // Dummy user info
    const user = {
        name: "John Doe",
        email: "john.doe@example.com",
        profileImage: 'data:image/jpeg;base64,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'
    };

    const addPost = async () => {

        const response = await axios.post(`http://localhost:5000/addPost/${userId}`, { title, description, imageUrl });
        if (response && response.status === 200) {
            alert(response.data.message);
            setTitle('');
            setDescription('');
            setImageUrl('');
            setTggle(false);
            // Refresh posts after submission
            const updatedPosts = await axios.get("http://localhost:5000/getPost");
            setPosts(updatedPosts.data.posts);
        } else {
            alert(response.data.message || response.data.error);
        }
    };

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(`http://localhost:5000/getPostById/${userId}`);
            if (response && response.status === 200) {
                setPosts(response.data.response);
                console.log(response);
            } else {
                console.log(response.data.message || response.data.error);
            }
        };
        getData();
    }, []);


    const showModal = (post) => {
        setShow((p) => !p);
        setModalPost(post);
    } 

    const deletePost = async(id)=>{
        try{
             const response = await axios.delete(`http://localhost:5000/deletePost/${id}`);
             if(response && response.status==200)
             {
                alert(response.data.message);
                setShow((p)=>!p);
                const res = posts.filter((post)=>post._id!==id);
                setPosts(res);
             }
             else{
                alert(response.data.message || response.data.error);
             }
        }
        catch(error){
            console.log(error)
        }
    }

    return (
        <>
            {/* Profile Header Section */}
            <div style={{
                display: 'flex',
                justifyContent: "center",
                alignItems: 'center',
                padding: '30px',
                backgroundColor: '#fff',
                borderBottom: '1px solid #ddd'
            }}>
                <img src={user.profileImage} alt="Profile" style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginRight: '40px'
                }} />
                <div>
                    <h2 style={{ margin: '0 0 10px 0' }}>{user.name}</h2>
                    <p style={{ margin: '0 0 5px 0', color: '#555' }}>{user.email}</p>
                    <p style={{ margin: '0', color: '#777' }}>Posts: {posts.length}</p>
                </div>
            </div>

            {/* Posts Section */}
            <div style={{
                minHeight: "80vh",
                padding: "10px 20%",
                backgroundColor: "#f5f5f5"
            }}>
                <button onClick={() => setTggle(true)} style={{
                    margin: '10px 0',
                    padding: "10px 20px",
                    backgroundColor: "#0095f6",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}>+ Post Blog</button>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "20px"
                }}>
                    {posts && posts.map((post) => (
                        <div key={post._id} style={{
                            backgroundColor: "#fff",
                            borderRadius: "10px",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                            overflow: "hidden"
                        }}>
                            <img src={post.imageUrl} alt={post.title} style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                            }} onClick={() => showModal(post)} />
                        </div>
                    ))}
                </div>

            </div>

            {/* Modal */}
            {toggle && <div style={{
                position: "fixed",
                zIndex: "1",
                width: '100%',
                height: "100%",
                background: "rgba(0,0,0,0.6)",
                display: 'flex',
                justifyContent: "center",
                alignItems: "center",
                left: "0",
                top: "0"
            }}>
                <div style={{
                    height: "70%",
                    width: "400px",
                    background: "white",
                    borderRadius: '10px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ margin: 0 }}>New Post</h3>
                        <button onClick={() => setTggle(false)} style={{
                            background: 'transparent',
                            border: 'none',
                            fontSize: '18px',
                            cursor: 'pointer'
                        }}>✕</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                        <label>Title:</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={{
                            padding: '8px', border: '1px solid #ccc', borderRadius: '4px'
                        }} />
                        <label>Description:</label>
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} style={{
                            padding: '8px', border: '1px solid #ccc', borderRadius: '4px'
                        }} />
                        <label>Image URL:</label>
                        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} style={{
                            padding: '8px', border: '1px solid #ccc', borderRadius: '4px'
                        }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <button onClick={addPost} style={{
                            padding: '10px 15px',
                            backgroundColor: '#0095f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}>Submit</button>
                        <button onClick={() => setTggle(false)} style={{
                            padding: '10px 15px',
                            backgroundColor: '#ccc',
                            color: '#333',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}>Close</button>
                    </div>
                </div>
            </div>}


            {show && <div style={{ position: "fixed", zIndex: "1", width: '100%', height: "100%", background: "rgba(0,0,0,0.6)", display: 'flex', justifyContent: "center", alignItems: "center", left: "0", top: "0" }}>
                <div style={{ height: "70%", width: "50%", background: "white", borderRadius: '8px' }}>
                    <button onClick={() => {
                        setModalPost(null);
                        setShow((prev) => !prev);
                    }}>X</button>
                    <button onClick={()=>deletePost(modalPost._id)}><MdDelete /></button>
                    <img src={modalPost.imageUrl} style={{ height: "75%", width: "100%", borderRadius: "8px" }} />
                    <h2>{modalPost.title}</h2>
                    <p>{modalPost.description}</p>
                    <span>Likes: {modalPost.like.length}</span>   <span>Comments: {modalPost.comment.length}</span>
                </div>
            </div>}


        </>
    );
};

export default Profile;
