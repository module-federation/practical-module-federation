import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import Carousel from "./Carousel";

const App = () => (
  <div>
    <Carousel />
    <div>Hi there, I'm React from React in Webpack 4.</div>
  </div>
);

ReactDOM.render(<App />, document.getElementById("app"));
