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

const DynamicWidget = ({url, scope, module, ...props}) => {
  const {ready, failed} = useDynamicScript(url);

  if (!ready) {
    return <h2>Loading dynamic script: {url}</h2>;
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {url}</h2>;
  }

  const Component = React.lazy(
    () =>
      new Promise((resolve) => {
        console.log([scope, module]);
        const react = require("react")
        //might not be a promise, and might not be thennable
        const legacyShareScope = {
          react: {
            [react.version || "10.0.0"]: {
              get: () => new Promise(resolve => {
                resolve(() => require('react'))
              }),
              loaded: true,
              from: "webpack4"
            }
          }
        }
        console.log(legacyShareScope)
        const container = window[scope]; // or get the container somewhere else
        // Initialize the container, it may provide shared modules
        new Promise((resolve) => {
          resolve(container.init(legacyShareScope))
        }).then(() => {
          console.log('then')
          window[scope].get(module).then((factory) => {
            console.log(factory())
            const Module = factory();
            console.log(Module);
            resolve(Module);
          })
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

ReactDOM.render(<App/>, document.getElementById("app"));
