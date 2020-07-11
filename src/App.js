import React from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginActive: true,
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
      <Router>
        <div>
          <Switch>
            <Route path="/" exact component={Login}></Route>
            <Route
              path="/login"
              render={(props) => (
                <Login {...props} handleSubmit={this.handleLogin}></Login>
              )}
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
              render={(props) => <Dashboard {...props} />}
            ></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
