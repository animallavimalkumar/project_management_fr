import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      const response = await axios.post("http://localhost:5000/login", credentials);
      const { token, role } = response.data;

      // Store the token and role in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      alert(`Logged in as ${role}`);
      navigate("/Mypage"); // Redirect to your desired page
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error.message);
      setError("Invalid credentials"); // Set error message
    }
  };

  const handleOAuthLogin = (provider) => {
    const oauthUser  = { username: `${provider}_user`, role: "user" }; // Simulated OAuth response
    localStorage.setItem("user", JSON.stringify(oauthUser ));
    localStorage.setItem("role", oauthUser .role);
    alert(`Logged in with ${provider}`);
    navigate("/Navbar");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: "350px" }}>
        <h2 className="text-center mb-4">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Username"
              className="form-control"
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <div className="mt-4">
          <button onClick={() => handleOAuthLogin("Google")} className="btn btn-danger w-100 mb-2">Login with Google</button>
          <button onClick={() => handleOAuthLogin("GitHub")} className="btn btn-dark w-100">Login with GitHub</button>
        </div>
      </div>
    </div>
  );
};

export default Login;