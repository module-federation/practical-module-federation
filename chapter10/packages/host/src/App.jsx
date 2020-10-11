import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import VariantChooser from "ab-manager/VariantChooser";

const FrameA = React.lazy(() => import("host/FrameA"));
const FrameB = React.lazy(() => import("host/FrameB"));

const App = () => (
  <div style={{ width: 800, margin: "auto" }}>
    <p>This is a cute dog.</p>
    <VariantChooser
      test="test1"
      variations={{
        a: FrameA,
        b: FrameB,
      }}
      src="https://placedog.net/640/480?id=53"
      style={{ width: 640, height: 480 }}
    />
    <p>You should adopt this dog!</p>
  </div>
);

ReactDOM.render(<App />, document.getElementById("app"));
