import React from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { concat, InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import * as Constants from "./constants/Constants.js";
import { HttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";
import { ApolloClient } from "apollo-client";
import Profile from "./components/Profile";
import "fontsource-roboto";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { split } from "@apollo/client";

const httpLink = new HttpLink({ uri: Constants.GRAPHQL_API });

let authMiddleware = new ApolloLink((operation, forward) => {
  let token = localStorage.getItem("token");
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  return forward(operation);
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:8080/subscriptions`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem("token"),
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

let client = new ApolloClient({
  link: concat(authMiddleware, splitLink),
  cache: new InMemoryCache(),
});

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Switch>
              <Route
                path="/"
                exact
                render={(props) => <Login {...props}></Login>}
              ></Route>
              <Route
                path="/login"
                render={(props) => <Login {...props}></Login>}
              ></Route>
              <Route
                path="/register"
                render={(props) => <Register {...props}></Register>}
              ></Route>
              <Route
                path="/dashboard"
                render={(props) => <Dashboard {...props} />}
              ></Route>
              <Route
                path="/profile/:username"
                render={(props) => <Profile {...props} />}
              ></Route>
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
