import React, { useState, useEffect } from "react";

function Reports() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all tickets on mount
  useEffect(() => {
    fetch("http://localhost/backend/get_tickets.php", {
      credentials: "include",
    })
      .then(async (res) => {
        const text = await res.text();
        try {
          return JSON.parse(text);
        } catch {
          console.error("Invalid JSON response:", text);
          throw new Error("Server returned invalid JSON. Check PHP errors.");
        }
      })
      .then((data) => {
        if (!data.error) setTickets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="text-center text-accent p-6">Loading tickets...</div>
    );

  return (
    <div className="p-8 bg-background min-h-screen text-text">
      <h1 className="text-3xl font-bold mb-6 text-secondary border-b border-accent pb-2">
        All Tickets Report
      </h1>

      <div className="overflow-x-auto border border-primary rounded-lg">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-primary text-accent uppercase text-xs tracking-wide">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Title</th>
              <th className="p-3">Created By</th>
              <th className="p-3">Assigned To</th>
              <th className="p-3">Status</th>
              <th className="p-3">Priority</th>
              <th className="p-3">Category</th>
              <th className="p-3">Created At</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length > 0 ? (
              tickets.map((t) => (
                <tr
                  key={t.id}
                  className="border-t border-primary hover:bg-primary/40 transition"
                >
                  <td className="p-3">{t.id}</td>
                  <td className="p-3 font-medium">{t.title}</td>
                  <td className="p-3">{t.created_by}</td>
                  <td className="p-3">{t.assigned_to_email || "—"}</td>
                  <td className="p-3 text-neon">{t.status}</td>
                  <td className="p-3 text-secondary">{t.priority}</td>
                  <td className="p-3 text-accent">{t.category}</td>
                  <td className="p-3">
                    {new Date(t.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-6 text-center text-accent italic">
                  No tickets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;
