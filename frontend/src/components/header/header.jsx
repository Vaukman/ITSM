import React from "react";

function Header() {
  return (
    <div className="fixed m-3 top-0 left-64 right-0 h-16 bg-black text-white flex justify-between items-center px-6 shadow-md z-10">
      <div className="text-xl font-semibold">Dashboard Header</div>
      <div className="flex gap-4">
        <div className="bg-blue-500 px-3 py-1 rounded">1</div>
        <div className="bg-green-500 px-3 py-1 rounded">2</div>
      </div>
    </div>
  );
}

export default Header;
