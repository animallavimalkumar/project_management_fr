import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout({ onLogout }) {
  const navigate = useNavigate();

  useEffect(() => {
    onLogout();
    navigate("/");
  }, [onLogout, navigate]);

  return <p>Logging out...</p>;
}

export default Logout;
