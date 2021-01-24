import React from 'react'

function DropdownMenu({ children, closeMenuFunc }) {


  return (
    <div className="dropdown-menu">
      <div className="dropdown-list" onClick={closeMenuFunc}>
        {children}
      </div>
    </div>
  );
}

export default DropdownMenu
