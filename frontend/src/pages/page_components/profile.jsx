import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function Profile() {
  const { user } = useOutletContext() || {};
  const [otherUsers, setOtherUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [updatingUserId, setUpdatingUserId] = useState(null);

  // Map role IDs to names
  const roleMap = { 1: "Admin", 2: "Third", 3: "Second", 4: "First" };
  const statusMap = { 1: "Active", 2: "Inactive", 3: "Suspended" };

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetch("http://localhost/backend/getAllUsers.php", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          setError(true);
          return;
        }

        const filtered = data.filter((u) => {
          if (u.id === user.id) return false; // exclude self
          if (user.role_id === 1) return true; // Admin sees all
          return u.role_id > user.role_id; // others only see lower clearance
        });

        setOtherUsers(filtered);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [user]);

  const handleRoleChange = (userId, newRoleId) => {
    setUpdatingUserId(userId);
    fetch("http://localhost/backend/updateUserRole.php", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, newRoleId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOtherUsers((prev) =>
            prev.map((u) =>
              u.id === userId
                ? { ...u, role_id: newRoleId, role_name: roleMap[newRoleId] }
                : u
            )
          );
        } else alert(data.error || "Failed to update role.");
      })
      .catch(() => alert("Network error."))
      .finally(() => setUpdatingUserId(null));
  };

  const handleRemoveUser = (userId) => {
    if (!window.confirm("Are you sure you want to remove this user?")) return;
    fetch("http://localhost/backend/removeUser.php", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOtherUsers((prev) => prev.filter((u) => u.id !== userId));
        } else alert(data.error || "Failed to remove user.");
      })
      .catch(() => alert("Network error."));
  };

  if (!user)
    return (
      <div className="p-6 text-center text-accent">No user info available.</div>
    );

  const neonColors = {
    promote: "#7CFC00",
    demote: "#ABACAD",
    remove: "#FF4C4C",
  };

  const neonStyle = (color, textColor = "#fff") => ({
    backgroundColor: color,
    boxShadow: `0 0 4px ${color}, 0 0 10px ${color}`,
    color: textColor,
  });

  const isAdmin = user.role_id === 1; // only Admin can change roles

  return (
    <div className="p-6 space-y-8 text-text min-h-screen bg-background">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Current user card */}
        <div className="col-span-1">
          <div className="bg-primary rounded-2xl shadow-lg p-6 border border-secondary/20 hover:shadow-2xl transition duration-300">
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
        </div>

        {/* Other users */}
        <div className="col-span-2 bg-primary rounded-2xl shadow-lg p-6 border border-secondary/30">
          <h3 className="text-2xl font-semibold text-secondary mb-6">
            Users with Lower Clearance
          </h3>

          {loading ? (
            <p className="text-accent">Loading users...</p>
          ) : error ? (
            <p className="text-accent">Failed to load users.</p>
          ) : otherUsers.length === 0 ? (
            <p className="text-accent italic">No users found.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {otherUsers.map((u) => {
                const roleLabel = roleMap[u.role_id];

                return (
                  <div
                    key={u.id}
                    className="relative bg-backgrozbd p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-secondary/20"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-secondary/10 text-secondary text-2xl">
                        <span className="material-icons">account_circle</span>
                      </div>
                      <div>
                        <p className="font-semibold text-secondary">
                          {u.first_name} {u.last_name}
                        </p>
                        <p className="text-xs text-accent">{u.email}</p>
                      </div>
                    </div>
                    <p className="text-sm text-accent mb-2">
                      Date Joined: {new Date(u.created).toLocaleDateString()}
                    </p>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-accent">
                        Clearance:{" "}
                        <span className="capitalize font-medium text-text">
                          {roleLabel}
                        </span>
                      </span>
                      <span className="text-sm text-accent">
                        Status: {statusMap[u.id_status] || "Unknown"}
                      </span>
                    </div>

                    {isAdmin && (
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex gap-2">
                          <button
                            disabled={u.role_id <= 2 || updatingUserId === u.id} // cannot promote beyond Third
                            onClick={() =>
                              handleRoleChange(u.id, u.role_id - 1)
                            } // decrease role_id = promote
                            style={
                              u.role_id > 2 && updatingUserId !== u.id
                                ? neonStyle(neonColors.promote, "#000")
                                : {}
                            }
                            className={`px-3 py-1 rounded-md text-sm font-medium ${
                              u.role_id <= 2
                                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                                : ""
                            }`}
                          >
                            Promote
                          </button>

                          <button
                            disabled={u.role_id >= 4 || updatingUserId === u.id} // cannot demote below First
                            onClick={() =>
                              handleRoleChange(u.id, u.role_id + 1)
                            } // increase role_id = demote
                            style={
                              u.role_id < 4 && updatingUserId !== u.id
                                ? neonStyle(neonColors.demote)
                                : {}
                            }
                            className={`px-3 py-1 rounded-md text-sm font-medium ${
                              u.role_id >= 4
                                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                                : ""
                            }`}
                          >
                            Demote
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemoveUser(u.id)}
                          style={neonStyle(neonColors.remove)}
                          className="px-3 py-1 rounded-md text-sm font-medium absolute bottom-3 right-3"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
