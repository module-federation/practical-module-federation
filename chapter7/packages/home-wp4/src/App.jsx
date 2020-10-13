import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

const useDynamicScript = (url) => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (!url) {
      return;
    }

    const element = document.createElement("script");
    element.src = url;
    element.type = "text/javascript";
    element.async = true;

    setReady(false);
    setFailed(false);

    element.onload = () => {
      console.log(`Dynamic Script Loaded: ${url}`);
      setReady(true);
    };

    element.onerror = () => {
      console.error(`Dynamic Script Error: ${url}`);
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);

    return () => {
      console.log(`Dynamic Script Removed: ${url}`);
      document.head.removeChild(element);
    };
  }, [url]);

  return {
    ready,
    failed,
  };
};

const DynamicWidget = ({ url, scope, module, ...props }) => {
  const { ready, failed } = useDynamicScript(url);

  if (!ready) {
    return <h2>Loading dynamic script: {url}</h2>;
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {url}</h2>;
  }

  const Component = React.lazy(
    () =>
      new Promise((moduleResolve) => {
        const react = require("react");
        const legacyShareScope = {
          react: {
            [react.version]: {
              get: () =>
                new Promise((reactResolve) => {
                  reactResolve(() => react);
                }),
              loaded: true,
              from: "webpack4",
            },
          },
        };
        new Promise((contaierResolve) => {
          contaierResolve(window[scope].init(legacyShareScope));
        }).then(() => {
          window[scope].get(module).then((factory) => {
            moduleResolve(factory());
          });
        });
      })
  );

  return (
    <React.Suspense fallback="Loading System">
      <Component {...props} />
    </React.Suspense>
  );
};

const App = () => (
  <div>
    <DynamicWidget
      url={"http://localhost:8082/remoteEntry.js"}
      scope={"widget"}
      module={"./Widget"}
    />
    <div>Hi there, I'm React from React in Webpack 4.</div>
  </div>
);

ReactDOM.render(<App />, document.getElementById("app"));
