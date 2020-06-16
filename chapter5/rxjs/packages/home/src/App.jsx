import React from "react";
import ReactDOM from "react-dom";
import { Subject } from "rxjs";

import "./index.css";

const Header = React.lazy(() => import("nav/Header"));

const count = new Subject(0);

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

const App = () => {
  const itemCount = useSubject(count);

  const onAddToCart = () => {
    count.next(itemCount + 1);
  };

  return (
    <div>
      <React.Suspense fallback={<div />}>
        <Header count={count} onClear={() => count.next(0)} />
      </React.Suspense>
      <div>Hi there, I'm some cool product.</div>
      <button onClick={onAddToCart}>Buy me!</button>
      <div>Cart count is {itemCount}</div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
