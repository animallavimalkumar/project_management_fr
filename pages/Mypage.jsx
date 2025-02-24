import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function MyPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, role } = location.state || {};

  if (!user) {
    return (
      <div className="container text-center mt-5">
        <h2>No User Found</h2>
        <button onClick={() => navigate("/")} className="btn btn-primary">Go Home</button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Welcome, {user}!</h2>
      <p>You are logged in as: <strong>{role}</strong></p>

      {role === "admin" ? (
        <div>
          <h3>Admin Dashboard</h3>
          <p>Manage projects and users.</p>
        </div>
      ) : (
        <div>
          <h3>User Dashboard</h3>
          <p>View and manage your projects.</p>
        </div>
      )}

      <button onClick={() => navigate("/")} className="btn btn-danger mt-3">Logout</button>
    </div>
  );
}

export default MyPage;
