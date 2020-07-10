import React from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";

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
      <div>
        {this.state.isLoginActive ? (
          <div>
            <Login
              handleLogin={this.handleLogin}
              handleRegister={this.handleLoginChange}
            ></Login>
          </div>
        ) : (
          <div>
            <Register
              handleLogin={this.handleLoginChange}
              handleRegister={this.handleRegister}
            ></Register>
          </div>
        )}
      </div>
    );
  }
}

export default App;
