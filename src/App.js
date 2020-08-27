import React from "react";
import "./App.css";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard.js";
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
import { ProtectedRoute } from "./components/ProtectedRoute";

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
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
    },
    query: {
      fetchPolicy: "no-cache",
    },
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => <Login {...props}></Login>}
            />
            <Route
              path="/login"
              render={(props) => <Login {...props}></Login>}
            />
            <Route
              path="/register"
              render={(props) => <Register {...props}></Register>}
            />
            <ProtectedRoute path="/dashboard" exact component={Dashboard} />
            <ProtectedRoute
              path="/profile/:username"
              exact
              component={Profile}
            />
            <Route path="*" component={() => "404 NOT FOUND"} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
