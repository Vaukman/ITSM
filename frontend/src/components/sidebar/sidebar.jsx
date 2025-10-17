import React from "react";
import { useNavigate } from "react-router-dom"; // for navigation
import LogoDark from "../../logo/logo_dark.png";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove auth token (or any user session data)
    localStorage.removeItem("authToken");
    // Redirect to login page
    navigate("/login");
  };

  const menu1 = ["Dashboard", "Tasks", "Members", "Reports"];
  const menu2 = ["Profile", "Help", "Logout"];

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-primary text-text flex flex-col p-4 shadow-lg">
      {/* Header / Logo Section */}
      <div className="flex items-center justify-center mb-8 border-b border-accent pb-4">
        <img src={LogoDark} alt="Logo" className="h-14 mr-2" />
        <h1 className="text-2xl tracking-wide text-secondary">L.I.V.E.</h1>
      </div>

      {/* Menu 1 */}
      <div className="flex flex-col mb-6">
        <h2 className="text-sm font-semibold text-accent mb-2 tracking-wider">
          MENU
        </h2>
        <ul className="space-y-2">
          {menu1.map((item) => (
            <li
              key={item}
              className="cursor-pointer px-3 py-2 rounded-md hover:bg-secondary transition-all"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Menu 2 */}
      <div className="flex flex-col">
        <h2 className="text-sm font-semibold text-accent mb-2 tracking-wider">
          SETTINGS
        </h2>
        <ul className="space-y-2">
          {menu2.map((item) => (
            <li
              key={item}
              className="cursor-pointer px-3 py-2 rounded-md hover:bg-secondary transition-all"
              onClick={item === "Logout" ? handleLogout : undefined} // only Logout triggers logout
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
