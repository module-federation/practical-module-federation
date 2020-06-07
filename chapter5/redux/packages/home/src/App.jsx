import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";

import "./index.css";

function cartReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1,
      };
    case "RESET":
      return {
        ...state,
        count: 0,
      };
    default:
      return state;
  }
}

const store = createStore(cartReducer);

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

const App = connect((state) => state)(({ count, dispatch }) => {
  const onAddToCart = () => {
    dispatch({
      type: "INCREMENT",
    });
  };
  return (
    <div>
      <Header />
      <div>Hi there, I'm some cool product.</div>
      <button onClick={onAddToCart}>Buy me!</button>
      <div>Cart count is {count}</div>
    </div>
  );
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
