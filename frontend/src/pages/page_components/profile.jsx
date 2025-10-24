import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function Profile() {
  const { user } = useOutletContext(); // user comes from DashLayout
  const [otherUsers, setOtherUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost/backend/getAllUsers.php", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((allUsers) => {
        const filtered = allUsers.filter(
          (u) => u.id !== user.id && u.role_id < user.role_id
        );
        setOtherUsers(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  if (loading) return <div>Loading...</div>;

  const statusMap = { 1: "Active", 2: "Inactive" };

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center gap-6 bg-primary p-6 rounded-lg shadow-md">
        <div className="w-32 h-32 rounded-full flex items-center justify-center bg-background border-2 border-secondary text-accent text-6xl">
          <span className="material-icons text-6xl">account_circle</span>
        </div>
        <div className="flex flex-col gap-1 text-text">
          <h2 className="text-2xl font-bold">
            {user.first_name} {user.last_name}
          </h2>
          <p>Email: {user.email}</p>
          <p>Date Joined: {new Date(user.created).toLocaleDateString()}</p>
          <p>Clearance: {user.role_name}</p>
          <p>Status: {statusMap[user.id_status] || "Unknown"}</p>
        </div>
      </div>

      <div className="bg-primary p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">
          Users with lower clearance
        </h3>
        {otherUsers.length === 0 ? (
          <p>No users to display.</p>
        ) : (
          <div className="space-y-4">
            {otherUsers.map((u) => (
              <div
                key={u.id}
                className="flex items-center gap-4 p-3 bg-background rounded-lg shadow-sm"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-background border text-accent text-3xl">
                  <span className="material-icons text-3xl">
                    account_circle
                  </span>
                </div>
                <div>
                  <p className="font-medium">
                    {u.first_name} {u.last_name}
                  </p>
                  <p className="text-sm text-accent">{u.email}</p>
                  <p className="text-sm text-accent">
                    Clearance: {u.role_name}
                  </p>
                  <p className="text-sm text-accent">
                    Status: {statusMap[u.id_status] || "Unknown"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
