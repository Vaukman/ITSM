import React from "react";

function ShowTicket({ ticket }) {
  if (!ticket) {
    return (
      <div className="p-6 text-center text-accent">
        No ticket info available.
      </div>
    );
  }

  // Optional: normalize capitalization if needed
  const statusMap = {
    Open: "Open",
    "In Progress": "In Progress",
    Resolved: "Resolved",
    Closed: "Closed",
    Suspended: "Suspended", // include any other possible string
  };

  return (
    <div className="p-6 text-text space-y-4 bg-primary rounded-2xl shadow-lg border border-secondary/20">
      <div className="flex flex-col items-center gap-3">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white shadow-lg">
          <span className="material-icons text-5xl">confirmation_number</span>
        </div>
        <h2 className="text-xl font-bold text-secondary text-center">
          {ticket.title}
        </h2>
        <p className="text-xs text-accent">
          {ticket.description || "No description provided."}
        </p>
      </div>

      <div className="flex flex-col gap-2 mt-4 text-accent text-sm">
        <p>
          Status:{" "}
          <span className="capitalize font-semibold text-text">
            {statusMap[ticket.status] || ticket.status || "Unknown"}
          </span>
        </p>
        <p>
          Created on:{" "}
          <span className="font-medium">
            {new Date(ticket.created).toLocaleDateString()}
          </span>
        </p>
        {ticket.assigned_to && (
          <p>
            Assigned to:{" "}
            <span className="font-medium">{ticket.assigned_to}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default ShowTicket;
