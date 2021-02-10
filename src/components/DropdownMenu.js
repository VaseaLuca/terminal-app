import React from "react";

const DropdownMenu = ({ children, closeMenuFunc }) => {
  return (
    <div className="dropdown-menu">
      <div className="dropdown-list" onClick={closeMenuFunc}>
        {children}
      </div>
    </div>
  );
}
export default DropdownMenu;