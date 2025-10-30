import React, { useState, useEffect } from "react";

function Tasks() {
  const [tickets, setTickets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    assigned_to: "",
    status_id: 1,
    priority_id: 1,
    category_id: 1,
  });

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  // Fetch Categories
  useEffect(() => {
    fetch("http://localhost/backend/get_categories.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  // Fetch Statuses
  useEffect(() => {
    fetch("http://localhost/backend/get_statuses.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setStatuses(data));
  }, []);

  // Fetch Priorities
  useEffect(() => {
    fetch("http://localhost/backend/get_priorities.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setPriorities(data));
  }, []);

  // Fetch Users
  useEffect(() => {
    fetch("http://localhost/backend/getAllUsers.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  // Fetch Tickets
  useEffect(() => {
    fetch("http://localhost/backend/get_tickets.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setTickets(data);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "http://localhost/backend/create_ticket.php";

    fetch(url, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(async (res) => {
        const text = await res.text(); // read raw response
        try {
          return JSON.parse(text); // try parsing JSON
        } catch {
          console.error("Invalid JSON response:", text);
          throw new Error("Server returned invalid JSON. Check PHP errors.");
        }
      })
      .then((data) => {
        if (data.success) {
          alert(data.success);
          // Optionally reset the form
          setForm({
            id: null,
            title: "",
            description: "",
            assigned_to: "",
            status_id: 1,
            priority_id: 1,
            category_id: 1,
          });
        } else {
          alert(data.error);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleEdit = (ticket) => {
    setForm({
      id: ticket.id,
      title: ticket.title,
      description: ticket.description,
      assigned_to: ticket.assigned_to || "",
      status_id: ticket.status_id,
      priority_id: ticket.priority_id,
      category_id: ticket.category_id,
    });
    setEditing(true);
  };

  if (loading)
    return (
      <div className="text-center text-accent p-6">Loading tickets...</div>
    );

  return (
    <div className="p-8 bg-background min-h-screen text-text">
      <h1 className="text-3xl font-bold mb-6 text-secondary border-b border-accent pb-2">
        Task Management
      </h1>

      {/* Create/Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-primary p-6 rounded-xl shadow-lg mb-10"
      >
        <h2 className="text-xl font-semibold text-neon mb-4">
          {editing ? "Edit Ticket" : "Create a New Ticket"}
        </h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-accent mb-1 font-medium">
            Ticket Title
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter a short, descriptive title"
            required
            className="w-full p-2 rounded bg-background text-text border border-accent focus:outline-none focus:border-neon"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-accent mb-1 font-medium">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the issue or request in detail"
            required
            className="w-full p-2 rounded bg-background text-text border border-accent focus:outline-none focus:border-neon h-24"
          />
        </div>

        {/* Assigned To */}
        <div className="mb-4">
          <label className="block text-accent mb-1 font-medium">
            Assign to
          </label>
          <select
            name="assigned_to"
            value={form.assigned_to}
            onChange={handleChange}
            className="w-full p-2 rounded bg-background text-text border border-accent focus:outline-none focus:border-neon"
          >
            <option value="">Select a user</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.first_name} {u.last_name}
              </option>
            ))}
          </select>
        </div>

        {/* Status, Priority, Category */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-accent mb-1 font-medium">Status</label>
            <select
              name="status_id"
              value={form.status_id}
              onChange={handleChange}
              className="w-full p-2 rounded bg-background text-text border border-accent focus:outline-none focus:border-neon"
            >
              {statuses.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-accent mb-1 font-medium">
              Priority
            </label>
            <select
              name="priority_id"
              value={form.priority_id}
              onChange={handleChange}
              className="w-full p-2 rounded bg-background text-text border border-accent focus:outline-none focus:border-neon"
            >
              {priorities.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-accent mb-1 font-medium">
              Category
            </label>
            <select
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              className="w-full p-2 rounded bg-background text-text border border-accent focus:outline-none focus:border-neon"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="bg-secondary hover:bg-secondary/80 text-text font-semibold px-6 py-2 rounded transition"
        >
          {editing ? "Save Changes" : "Create Ticket"}
        </button>
      </form>

      {/* Tickets Table */}
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
              <th className="p-3">Created</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
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
                <td className="p-3">
                  <button
                    onClick={() => handleEdit(t)}
                    className="bg-accent text-primary px-3 py-1 rounded hover:bg-neon hover:text-background transition text-xs font-semibold"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {tickets.length === 0 && (
              <tr>
                <td colSpan="9" className="p-6 text-center text-accent italic">
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

export default Tasks;
