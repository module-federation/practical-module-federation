import React from "react";
import { connect } from "react-redux";

const Header = ({ count, dispatch }) => (
  <header style={{ fontSize: "xx-large " }}>
    <span>Header - Cart count is {count}</span>
    <button onClick={() => dispatch({ type: "RESET" })}>Clear</button>
  </header>
);

export default connect((state) => state)(Header);
