import React from "react";
import { Layout, Menu } from "antd";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
} from "react-router-dom";

import "antd/dist/antd.css";
import "./index.css";

import Search from "./Search";

const Home = React.lazy(() => import("home/Home"));
const Profile = React.lazy(() => import("profile/Profile"));

const { Header, Content } = Layout;

const MENU_KEYS = {
  "/": "1",
  "/search": "2",
  "/profile": "3",
};

const App = ({ location }) => (
  <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={MENU_KEYS[location.pathname]}
      >
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/search">Search</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/profile">Profile</Link>
        </Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: "0 50px" }}>
      <div className="site-layout-content">
        <Route exact path="/">
          <React.Suspense fallback={<div>Loading home</div>}>
            <Home />
          </React.Suspense>
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/profile">
          <React.Suspense fallback={<div>Loading profile</div>}>
            <Profile />
          </React.Suspense>
        </Route>
      </div>
    </Content>
  </Layout>
);

const AppWithRouter = withRouter(App);

export default () => (
  <Router>
    <AppWithRouter />
  </Router>
);
