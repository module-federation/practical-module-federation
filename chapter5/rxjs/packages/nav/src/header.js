import React from "react";

const useSubject = (subject) => {
  const [value, valueSet] = React.useState(0);
  React.useEffect(() => {
    const sub = subject.subscribe(valueSet);
    return () => {
      sub.unsubscribe();
    };
  }, [subject]);
  return value;
};

const Header = ({ count, onClear }) => {
  const itemCount = useSubject(count);
  return (
    <header style={{ fontSize: "xx-large " }}>
      <span>Header - Cart count is {itemCount}</span>
      <button onClick={onClear}>Clear</button>
    </header>
  );
};

export default Header;
