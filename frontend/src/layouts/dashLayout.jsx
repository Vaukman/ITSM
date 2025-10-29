import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar/sidebar";
import Header from "../components/header/header";
import { Navigate, Outlet } from "react-router-dom";

function DashLayout() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost/backend/getCurrentUser.php", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setUser(data);
        } else {
          setUser(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setUser(null);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header user={user} />
      <div className="ml-64 mt-16 p-6">
        <Outlet context={{ user }} />
      </div>
    </div>
  );
}

export default DashLayout;
