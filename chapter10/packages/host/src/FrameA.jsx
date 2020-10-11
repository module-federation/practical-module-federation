import React from "react";

export default ({ src, style, ...props }) => (
  <>
    <div>Variant A:</div>
    <img
      src={src}
      style={{
        ...style,
        padding: "1em",
        border: "5px solid blue",
      }}
      {...props}
    ></img>
  </>
);
