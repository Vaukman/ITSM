import React, { useState, useEffect } from "react";

function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch tickets
    fetch("http://localhost/backend/get_tickets.php", {
      credentials: "include",
    })
      .then(async (res) => {
        const text = await res.text();
        try {
          return JSON.parse(text);
        } catch {
          console.error("Invalid JSON response:", text);
          throw new Error("Server returned invalid JSON.");
        }
      })
      .then((data) => {
        if (!data.error) setTickets(data);
      });

    // Fetch users
    fetch("http://localhost/backend/getAllUsers.php", {
      credentials: "include",
    })
      .then(async (res) => {
        const text = await res.text();
        try {
          return JSON.parse(text);
        } catch {
          console.error("Invalid JSON response:", text);
          throw new Error("Server returned invalid JSON.");
        }
      })
      .then((data) => {
        if (!data.error) setUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="text-center text-accent p-6 text-xl font-medium animate-pulse">
        Loading dashboard...
      </div>
    );

  // Ticket stats
  const totalTickets = tickets.length;
  const openTickets = tickets.filter((t) => t.status === "Open").length;
  const closedTickets = tickets.filter((t) => t.status === "Closed").length;
  const highPriority = tickets.filter((t) => t.priority === "High").length;
  const mediumPriority = tickets.filter((t) => t.priority === "Medium").length;
  const lowPriority = tickets.filter((t) => t.priority === "Low").length;

  // User stats
  const totalUsers = users.length;
  const adminUsers = users.filter((u) => u.role_name === "Admin").length;
  const firstLevelUsers = users.filter((u) => u.role_name === "First").length;
  const secondLevelUsers = users.filter((u) => u.role_name === "Second").length;
  const thirdLevelUsers = users.filter((u) => u.role_name === "Third").length;

  // Tickets created today
  const today = new Date().toISOString().slice(0, 10);
  const ticketsToday = tickets.filter(
    (t) => t.created_at.slice(0, 10) === today
  ).length;

  // Card data
  const cardData = [
    { title: "Total Tickets", value: totalTickets, color: "text-secondary" },
    { title: "Open Tickets", value: openTickets, color: "text-neon" },
    { title: "Closed Tickets", value: closedTickets, color: "text-accent" },
    { title: "High Priority", value: highPriority, color: "text-neon" },
    {
      title: "Medium Priority",
      value: mediumPriority,
      color: "text-secondary",
    },
    { title: "Low Priority", value: lowPriority, color: "text-accent" },
    { title: "Total Users", value: totalUsers, color: "text-secondary" },
    { title: "Admins", value: adminUsers, color: "text-red-500" },
    { title: "First", value: firstLevelUsers, color: "text-black" },
    { title: "Second", value: secondLevelUsers, color: "text-gray-400" },
    { title: "Third", value: thirdLevelUsers, color: "text-green-500" },
    { title: "Tickets Today", value: ticketsToday, color: "text-neon" },
  ];

  return (
    <div className="px-8 py-10 min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/30 backdrop-blur-sm text-white">
      <h1 className="text-5xl font-extrabold mb-12 text-secondary tracking-tight drop-shadow-md">
        Dashboard
      </h1>

      {/* Cards grid 3x4 */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`relative overflow-hidden p-6 rounded-2xl bg-primary/70 backdrop-blur-md border border-accent/20 shadow-md hover:shadow-lg transition-all duration-300 ${card.color}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-blue-500/10 pointer-events-none"></div>
            <h2 className="text-xl font-semibold mb-2 tracking-wide">
              {card.title}
            </h2>
            <p className="text-4xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Tickets Table */}
      <h2 className="text-3xl font-semibold mt-16 mb-6 text-accent">
        Recent Tickets
      </h2>
      <div className="overflow-x-auto border border-accent/20 rounded-2xl shadow-md bg-primary/60 backdrop-blur-md">
        <table className="min-w-full text-left text-sm text-white">
          <thead className="bg-primary/90 text-accent uppercase text-xs tracking-wider">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Title</th>
              <th className="p-4">Status</th>
              <th className="p-4">Priority</th>
              <th className="p-4">Created By</th>
              <th className="p-4">Created At</th>
            </tr>
          </thead>
          <tbody>
            {tickets
              .slice(-5)
              .reverse()
              .map((t) => (
                <tr
                  key={t.id}
                  className="border-t border-primary/40 hover:bg-accent/10 transition-all duration-300"
                >
                  <td className="p-4 font-semibold">{t.id}</td>
                  <td className="p-4">{t.title}</td>
                  <td
                    className={`p-4 font-semibold ${
                      t.status === "Open" ? "text-neon" : "text-accent"
                    }`}
                  >
                    {t.status}
                  </td>
                  <td
                    className={`p-4 font-medium ${
                      t.priority === "High"
                        ? "text-accent"
                        : t.priority === "Medium"
                        ? "text-secondary"
                        : "text-neon"
                    }`}
                  >
                    {t.priority}
                  </td>
                  <td className="p-4 text-white/70">{t.created_by}</td>
                  <td className="p-4 text-white/70">
                    {new Date(t.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
