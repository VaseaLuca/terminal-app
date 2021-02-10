import React from "react";

import "./Navbar.scss";

const Navbar = ({ children }) => {
  return (
    <div className="navbar">
      <ul className="navbar-nav">{children}</ul>
    </div>
  );
}
export default Navbar;