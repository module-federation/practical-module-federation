import React from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react";
import { observable } from "mobx";

import "./index.css";

const store = observable({
  count: 0,
});

class FederatedWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.error || <div>Something went wrong.</div>;
    }

    return (
      <React.Suspense fallback={this.props.delayed || <div />}>
        {this.props.children}
      </React.Suspense>
    );
  }
}

const wrapComponent = (Component) => ({ error, delayed, ...props }) => (
  <FederatedWrapper error={error} delayed={delayed}>
    <Component {...props} />
  </FederatedWrapper>
);

const Header = wrapComponent(React.lazy(() => import("nav/Header")));

const App = observer(({ store }) => {
  return (
    <div>
      <Header store={store} />
      <div>Hi there, I'm some cool product.</div>
      <button onClick={() => (store.count = store.count + 1)}>Buy me!</button>
      <div>Cart count is {store.count}</div>
    </div>
  );
});

ReactDOM.render(<App store={cartStore} />, document.getElementById("app"));
