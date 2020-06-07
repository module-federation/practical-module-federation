import React from "react";
import { observer } from "mobx-react";

const Header = observer(({ store }) => (
  <header style={{ fontSize: "xx-large " }}>
    <span>Header - Cart count is {store.count}</span>
    <button onClick={() => (store.count = 0)}>Clear</button>
  </header>
));

export default Header;
