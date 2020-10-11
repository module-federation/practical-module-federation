import React from "react";
import ReactDOM from "react-dom";
import { Header, Container, Menu, Button, Tab } from "semantic-ui-react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

import "semantic-ui-css/semantic.min.css";

const EmbedPage = React.lazy(() => import("admin/EmbedPage"));
const EmbedEditor = React.lazy(() => import("admin/EmbedEditor"));

const Page = () => {
  const { page } = useParams();
  return (
    <React.Suspense fallback={<div>Loading</div>}>
      <EmbedPage page={page} />
    </React.Suspense>
  );
};

const Editor = () => {
  const { page } = useParams();
  return (
    <React.Suspense fallback={<div>Loading</div>}>
      <EmbedEditor page={page} />
    </React.Suspense>
  );
};

const PageTitle = () => {
  const { page } = useParams();
  return <h1 style={{ color: "white" }}>Home Page: {page}</h1>;
};

const App = () => (
  <Router>
    <Container>
      <Menu fixed="top" inverted style={{ background: "darkgreen" }}>
        <Container
          style={{
            marginTop: "1em",
            marginBottom: "1em",
          }}
        >
          <Header>
            <Route path="/" exact>
              <h1 style={{ color: "white" }}>Home Page</h1>
            </Route>
            <Route path="/:page">
              <PageTitle />
            </Route>
          </Header>
        </Container>
      </Menu>
      <Container style={{ paddingTop: "7em" }}>
        <Switch>
          <Route path="/:page">
            <Tab
              panes={[
                {
                  menuItem: "Display",
                  render: () => (
                    <Tab.Pane>
                      <Page />
                    </Tab.Pane>
                  ),
                },
                {
                  menuItem: "Edit",
                  render: () => (
                    <Tab.Pane>
                      <Editor />
                    </Tab.Pane>
                  ),
                },
              ]}
            ></Tab>
          </Route>
          <Route path="/" exact>
            <div>Home</div>
          </Route>
        </Switch>
      </Container>
    </Container>
  </Router>
);

ReactDOM.render(<App />, document.getElementById("app"));
