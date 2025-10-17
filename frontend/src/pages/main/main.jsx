import React from "react";
import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar/sidebar";
import { Navigate } from "react-router-dom";

function Main() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // Redirect to login if not logged in
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen">
      <Sidebar />
      <Header />
      <main className="ml-64 p-6">
        <h1 className="text-3xl font-bold mb-4">Dashboard Content</h1>
        <p>Here’s where your main content goes...</p>
      </main>
    </div>
  );
}

export default Main;
