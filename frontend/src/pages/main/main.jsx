import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Sidebar from "../../components/sidebar/sidebar";

function main() {
  return (
    <div className="min-h-screen ">
      <Sidebar />

      <main className="ml-64 p-6">
        <h1 className="text-3xl font-bold mb-4">Dashboard Content</h1>
        <p>Here’s where your main content goes...</p>
      </main>
    </div>
  );
}

export default main;
