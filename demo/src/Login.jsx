import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return alert("Fill all the Required Fields!");
    }
     
    try{
    const res = await axios.post("http://localhost:5000/login",{email,password});

    if(res && res.status==200)
    {
      console.log(res)
        alert(res.data.message);
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("userId",res.data.user._id)
        navigate('/')
    }
    else{
      alert(res.data.message);
    }
  }
  catch(error){
    alert(error)
  }
  
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to right, #74ebd5, #9face6)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "350px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Login Form</h2>

        <div style={{ marginBottom: "15px", textAlign: "left" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            E-mail:
          </label>
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter Your E-Mail..."
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px", textAlign: "left" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter Your Password..."
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            margin: "10px 5px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
        <button
          type="button"
          style={{
            padding: "10px 20px",
            margin: "10px 5px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => {
            setEmail('');
            setPassword('');
          }}
        >
          Clear
        </button>

        <p style={{ marginTop: "20px", fontSize: "14px", color: "#555" }}>
          Create an account:{" "}
          <Link to="/signup" style={{ color: "#2196F3", textDecoration: "none" }}>
            Click here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
