import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

const Widget = React.lazy(() => import("widget/Widget"));

const App = () => (
  <div>
    <React.Suspense fallback={<div>Loading</div>}>
      <Widget />
    </React.Suspense>
    <div>Hi there, I'm React from React.</div>
  </div>
);

ReactDOM.render(<App />, document.getElementById("app"));
