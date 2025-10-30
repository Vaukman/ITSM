import React, { useEffect, useState } from "react";

function Members() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost/backend/getAllUsers.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          // Sort users by clearance (Admin -> First)
          const sorted = data.sort((a, b) => a.role_id - b.role_id);
          setUsers(sorted);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  const getRoleBadge = (roleName) => {
    switch (roleName) {
      case "Admin":
        return "bg-secondary text-text";
      case "Third":
        return "bg-neon text-primary";
      case "Second":
        return "bg-accent text-primary";
      case "First":
        return "bg-primary text-text";
      default:
        return "bg-background text-accent";
    }
  };

  if (loading)
    return (
      <div className="text-center text-accent p-4 text-lg">
        Loading members...
      </div>
    );

  return (
    <div className="p-8 bg-background min-h-screen text-text">
      <h2 className="text-3xl font-bold mb-6 border-b border-accent pb-2">
        Members List
      </h2>

      <div className="overflow-x-auto rounded-lg shadow-lg border border-primary">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-primary text-accent uppercase tracking-wide text-xs">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Created</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((u, i) => (
                <tr
                  key={u.id}
                  className="border-t border-primary hover:bg-primary/40 transition"
                >
                  <td className="py-3 px-4">{i + 1}</td>
                  <td className="py-3 px-4 font-medium">
                    {u.first_name} {u.last_name}
                  </td>
                  <td className="py-3 px-4 text-accent">{u.email}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadge(
                        u.role_name
                      )}`}
                    >
                      {u.role_name}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {new Date(u.created).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-6 text-center text-accent italic">
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Members;
