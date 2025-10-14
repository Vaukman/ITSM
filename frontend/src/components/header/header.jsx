import React from "react";

function Header() {
  return (
    <div className="bg-black w-screen text-white p-4 flex">
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div className="flex border-2 border-red-500">
        <div className="bg-blue-500 w-50px">1</div>
        <div className="bg-green-500 w-50px">2</div>
      </div>
    </div>
  );
}

export default Header;
