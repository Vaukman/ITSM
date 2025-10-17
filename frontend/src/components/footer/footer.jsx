import React from "react";

function Footer() {
  return (
    <div className="fixed m-3 bottom-0 left-64 right-0 h-5 bg-black text-white text-center flex items-center justify-center text-[10px]">
      © {new Date().getFullYear()} All rights reserved.
    </div>
  );
}

export default Footer;
