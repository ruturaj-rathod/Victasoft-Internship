import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

export default function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    const auth_token = localStorage.getItem("auth_token");
    if (!auth_token) {
      navigate("/admin/login");
    }
  }, [navigate]);
  return (
    <>
      <AdminNavbar />
      <div>
        
      </div>
    </>
  );
}
