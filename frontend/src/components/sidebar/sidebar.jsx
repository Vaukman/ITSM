import React from "react";
import { useNavigate } from "react-router-dom";
import LogoDark from "../../logo/logo_dark.png";

function Sidebar({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login"); // session handled by backend, no localStorage
  };

  const menu1 = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Tasks", path: "/tasks" },
    { name: "Members", path: "/members" },
    { name: "Reports", path: "/reports" },
  ];

  const menu2 = [
    { name: "Profile", path: "/profile" },
    { name: "Help", path: "/help" },
    { name: "Logout", path: null },
  ];

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-primary text-text flex flex-col p-4 shadow-lg z-20">
      <div className="flex items-center justify-center pr-4 mb-8 border-b border-accent pb-4">
        <img src={LogoDark} alt="Logo" className="h-14 mr-2" />
        <h1 className="text-2xl tracking-wide text-secondary">L.I.V.E.</h1>
      </div>

      <div className="flex flex-col mb-4">
        <h2 className="text-sm font-semibold text-accent mb-2 tracking-wider">
          MENU
        </h2>
        <ul className="space-y-2">
          {menu1.map((item) => (
            <li
              key={item.name}
              className="cursor-pointer px-3 py-2 rounded-md hover:bg-secondary transition-all"
              onClick={() => navigate(item.path)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col mt-4">
        <h2 className="text-sm font-semibold text-accent mb-2 tracking-wider">
          SETTINGS
        </h2>
        <ul className="space-y-2">
          {menu2.map((item) => (
            <li
              key={item.name}
              className="cursor-pointer px-3 py-2 rounded-md hover:bg-secondary transition-all"
              onClick={() =>
                item.name === "Logout" ? handleLogout() : navigate(item.path)
              }
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
