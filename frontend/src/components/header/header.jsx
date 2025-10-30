import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import ShowUser from "../../pages/page_components/showUser";
import ShowTicket from "../../pages/page_components/showTicket";

function Header({ user }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showItem, setShowItem] = useState(null); // can be user or ticket

  useEffect(() => {
    if (!searchTerm) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      try {
        // Fetch users
        const resUsers = await fetch(
          "http://localhost/backend/getAllUsers.php",
          {
            credentials: "include",
          }
        );
        const users = await resUsers.json();

        // Fetch tickets
        const resTickets = await fetch(
          "http://localhost/backend/get_tickets.php",
          {
            credentials: "include",
          }
        );
        const tickets = await resTickets.json();

        // Filter users and tickets
        const filteredUsers = users.filter((u) =>
          `${u.first_name} ${u.last_name}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
        const filteredTickets = tickets.filter((t) =>
          t.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setResults([
          ...filteredUsers.map((u) => ({ ...u, type: "user" })),
          ...filteredTickets.map((t) => ({ ...t, type: "ticket" })),
        ]);
      } catch (e) {
        console.error("Search error:", e);
      }
    };

    fetchResults();
  }, [searchTerm]);

  const handleSelectItem = (item) => {
    if (item.type === "user") {
      setShowItem({
        type: "user",
        data: {
          id: item.id,
          first_name: item.first_name,
          last_name: item.last_name,
          email: item.email,
          role_id: item.role_id,
          role_name: item.role_name,
          id_status: item.id_status ?? 1,
          created: item.created ?? new Date().toISOString(),
        },
      });
    } else if (item.type === "ticket") {
      setShowItem({
        type: "ticket",
        data: {
          id: item.id,
          title: item.title,
          description: item.description,
          status: item.status,
          created: item.created ?? new Date().toISOString(),
        },
      });
    }

    setResults([]);
    setSearchTerm("");
  };

  return (
    <>
      <div className="fixed top-0 left-64 right-0 h-16 bg-primary text-text flex justify-between items-center px-6 shadow-md z-10">
        <div className="flex items-center w-1/2 relative">
          <input
            type="text"
            placeholder="Search users or tickets..."
            className="w-full px-4 py-2 rounded-md bg-background text-text placeholder:text-accent focus:outline-none focus:ring-2 focus:ring-secondary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {results.length > 0 && (
            <div className="absolute top-12 left-0 w-full bg-primary border border-accent/30 rounded-md shadow-lg max-h-64 overflow-y-auto z-20">
              {results.map((r) =>
                r.type === "user" ? (
                  <div
                    key={`user-${r.id}`}
                    className="px-4 py-2 hover:bg-secondary/20 cursor-pointer"
                    onClick={() => handleSelectItem(r)}
                  >
                    {r.first_name} {r.last_name} ({r.role_name})
                  </div>
                ) : (
                  <div
                    key={`ticket-${r.id}`}
                    className="px-4 py-2 hover:bg-secondary/20 cursor-pointer"
                    onClick={() => handleSelectItem(r)}
                  >
                    Ticket: {r.title}
                  </div>
                )
              )}
            </div>
          )}
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

      {/* Modal for selected user or ticket */}
      {showItem &&
        createPortal(
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-primary rounded-2xl shadow-xl p-6 w-96 relative">
              <button
                className="absolute top-3 right-3 text-accent text-2xl"
                onClick={() => setShowItem(null)}
              >
                &times;
              </button>

              {showItem.type === "user" && <ShowUser user={showItem.data} />}
              {showItem.type === "ticket" && (
                <ShowTicket ticket={showItem.data} />
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default Header;
