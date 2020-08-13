import React from "react";
import "../css/loginStyle.css";
import { Link } from "react-router-dom";
import { Mutation } from "react-apollo";
import * as Constants from "../constants/Constants.js";

const initialState = {
  username: "",
  password: "",
};

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = initialState;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  update = (cache, data) => {
    this.props.history.push("/dashboard", {
      loggedIn: true,
      signInData: data.data.signIn,
    });
  };

  render() {
    return (
      <div className="centerH">
        <Mutation mutation={Constants.LOGIN_MUTATION} update={this.update}>
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
                <label className="error">
                  {this.state.usernameErrorMessage}
                </label>
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
                <label className="error">
                  {this.state.passwordErrorMessage}
                </label>
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
