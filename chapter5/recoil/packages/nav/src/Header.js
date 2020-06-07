import React from "react";
import { useRecoilState } from "recoil";
import { cartCount } from "home/atoms";

export default () => {
  const [count, setCount] = useRecoilState(cartCount);
  return (
    <header style={{ fontSize: "xx-large " }}>
      <span>Header - Cart count is {count}</span>
      <button onClick={() => setCount(0)}>Clear</button>
    </header>
  );
};
