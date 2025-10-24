import React from "react";

function Header({ user }) {
  if (!user) return null;
  return (
    <div className="fixed top-0 left-64 right-0 h-16 bg-primary text-text flex justify-between items-center px-6 shadow-md z-10">
      <div className="flex items-center w-1/2">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 rounded-md bg-background text-text placeholder:text-accent focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>

      <div className="flex items-center gap-3">
        <span className="material-icons text-3xl text-accent">
          account_circle
        </span>
        <span className="font-medium">
          Welcome, {user.first_name} {user.last_name}
        </span>
      </div>
    </div>
  );
}

export default Header;
