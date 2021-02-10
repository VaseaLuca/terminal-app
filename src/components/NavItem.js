import React, { useState } from "react";

import "./NavItem.scss";

function NavItem({ name, children }) {
  const [open, setOpen] = useState(false);
  const childrenComponent = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      closeMenuFunc: () => setOpen(!open),
    });
  });
  return (
    <div className="navitem" onMouseLeave={() => setOpen(false)}>
      <div className="nav-item" onClick={() => setOpen(!open)}>
        {name}
      </div>
      {open && childrenComponent}
    </div>
  );
};
export default NavItem;