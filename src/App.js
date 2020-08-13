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

const httpLink = new HttpLink({ uri: Constants.GRAPHQL_API });

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("TOKEN");
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
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

  handleLoginChange = (event) => {
    event.preventDefault();
    this.setState({
      isLoginActive: !this.state.isLoginActive,
    });
  };

  handleLogin = (event, state, callback) => {
    event.preventDefault();
    console.log(state.username + " " + state.password);
    callback();
  };

  handleRegister = (event, state, callback) => {
    event.preventDefault();
    console.log(state.username);
    console.log(state.password);
    console.log(state.name);
    console.log(state.surname);
    console.log(state.email);
    console.log(state.bio);
    callback();
  };

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
                render={(props) => (
                  <Register
                    {...props}
                    handleSubmit={this.handleRegister}
                  ></Register>
                )}
              ></Route>
              <Route
                path="/dashboard"
                render={(props) => (
                  <Dashboard {...props} account={this.state.account} />
                )}
              ></Route>
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
