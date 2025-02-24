import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css"; // Keep your custom styles

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user"); // Default role
    const [error, setError] = useState(""); // State for error messages
    const navigate = useNavigate(); // For navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Sending data:", { username, password, role });

        try {
            const response = await axios.post("http://localhost:5000/register", { username, password, role });
            console.log("Response received:", response.data);
            alert(response.data.message);
            navigate("/login"); // Redirect to login after successful registration
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data.message : "Registration failed. Try again.");
        }
    };

    const handleGoogleLogin = () => {
        // Redirect to your backend for Google login
        window.location.href = "http://localhost:5000/auth/google"; // Adjust the URL as needed
    };

    const handleGithubLogin = () => {
        // Redirect to your backend for GitHub login
        window.location.href = "http://localhost:5000/auth/github"; // Adjust the URL as needed
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4" style={{ width: "350px" }}>
                <h2 className="text-center mb-4">Register</h2>
                {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Role</label>
                        <select
                            className="form-select"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="user">User </option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Register</button>
                </form>
                <div className="text-center mt-3">
                    <button className="btn btn-danger w-100" onClick={handleGoogleLogin}>Login with Google</button>
                    <button className="btn btn-dark w-100 mt-2" onClick={handleGithubLogin}>Login with GitHub</button>
                </div>
                <p className="text-center mt-3">
                    Already have an account? <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => navigate("/login")}>Login</span>
                </p>
            </div>
        </div>
    );
};

export default Register;