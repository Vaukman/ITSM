import React from "react";

function ShowUser({ user }) {
  if (!user)
    return (
      <div className="p-6 text-center text-accent">No user info available.</div>
    );

  const roleMap = { 1: "Admin", 2: "Third", 3: "Second", 4: "First" };
  const statusMap = { 1: "Active", 2: "Inactive", 3: "Suspended" };

  return (
    <div className="p-6 space-y-6 text-text bg-background min-h-[200px] rounded-2xl shadow-lg">
      <div className="flex flex-col items-center gap-4">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white shadow-lg">
          <span className="material-icons text-5xl">account_circle</span>
        </div>
        <h2 className="text-xl font-bold text-secondary text-center">
          {user.first_name} {user.last_name}
        </h2>
        <p className="text-xs text-accent">{user.email}</p>
        <p className="text-xs text-accent">
          Date Joined: {new Date(user.created).toLocaleDateString()}
        </p>
        <p className="text-xs text-accent">
          Clearance:{" "}
          <span className="capitalize font-semibold text-text">
            {roleMap[user.role_id]}
          </span>
        </p>
        <p className="text-xs text-accent">
          Status: {statusMap[user.id_status] || "Unknown"}
        </p>
      </div>
    </div>
  );
}

export default ShowUser;
