import React from "react";
import "../css/loginStyle.css";
import { Link } from "react-router-dom";
import { Mutation } from "react-apollo";
import * as Constants from "../constants/Constants.js";

const initialState = {
  username: "",
  password: "",
  errorMessage: "",
};

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      errorMessage: "",
    });
  };

  update = (cache, data) => {
    this.props.history.push("/dashboard", {
      loggedIn: true,
      signInData: data.data.signIn,
    });
  };

  showError = () => {
    this.setState({
      username: "",
      password: "",
      errorMessage: "Invalid username or password",
    });
  };

  render() {
    return (
      <div className="centerH">
        <Mutation
          mutation={Constants.LOGIN_MUTATION}
          update={this.update}
          onError={this.showError}
        >
          {(signIn) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                signIn({
                  variables: {
                    authData: {
                      username: this.state.username,
                      password: this.state.password,
                    },
                  },
                });
                this.setState({
                  errorMessage: "",
                });
              }}
            >
              <h2>Login</h2>
              <div>
                <input
                  placeholder="username"
                  name="username"
                  onChange={this.handleChange}
                  value={this.state.username}
                ></input>
                <br></br>
              </div>
              <div>
                <input
                  placeholder="passsword"
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                  value={this.state.password}
                ></input>
                <br></br>
                <label className="error">{this.state.errorMessage}</label>
              </div>
              <div>
                <button type="submit" className="red">
                  Log in
                </button>
              </div>
              <div className="label">
                <label>Don't have an account? </label>
              </div>
              <Link to="/register">
                <button className="orange">Register</button>
              </Link>
            </form>
          )}
        </Mutation>
      </div>
    );
  }
}
