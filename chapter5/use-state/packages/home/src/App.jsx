import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

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

const App = () => {
  const [itemCount, itemCountSet] = React.useState(0);
  const onAddToCart = () => {
    itemCountSet(itemCount + 1);
  };
  return (
    <div>
      <Header count={itemCount} onClear={() => itemCountSet(0)} />
      <div>Hi there, I'm some cool product.</div>
      <button onClick={onAddToCart}>Buy me!</button>
      <div>Cart count is {itemCount}</div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
