import React from "react";
import ReactDOM from "react-dom";

const Header = React.lazy(() => import("nav/Header"));

import "./index.css";

const App = () => (
  <div>
    <React.Suspense fallback={<div />}>
      <Header />
    </React.Suspense>
    <div>Hi there, I'm React from React.</div>
  </div>
);

ReactDOM.render(<App />, document.getElementById("app"));
