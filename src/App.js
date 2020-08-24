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

let client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginActive: true,
      account: {},
      token: "",
    };
  }

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
                render={(props) => (
                  <Dashboard {...props} account={this.state.account} />
                )}
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
