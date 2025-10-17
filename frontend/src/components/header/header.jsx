import React, { useEffect, useState } from "react";

function Header() {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setCurrentUser(user.firstName);
  }, []);

  return (
    <div className="fixed top-0 left-64 right-0 h-16 bg-primary text-text flex justify-between items-center px-6 shadow-md z-10">
      {/* Left: Search */}
      <div className="flex items-center w-1/2">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 rounded-md bg-background text-text placeholder:text-accent focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>

      {/* Right: User */}
      <div className="flex items-center gap-3">
        <span className="material-icons text-3xl text-accent">
          account_circle
        </span>
        <span className="font-medium">{currentUser || "Guest"}</span>
      </div>
    </div>
  );
}

export default Header;
