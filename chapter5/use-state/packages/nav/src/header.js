import React from "react";

const Header = ({ count, onClear }) => (
  <header style={{ fontSize: "xx-large " }}>
    <span>Header - Cart count is {count}</span>
    <button onClick={onClear}>Clear</button>
  </header>
);

export default Header;
