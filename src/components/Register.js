import React from "react";
import "../css/loginStyle.css";
import { Link } from "react-router-dom";
import { Mutation } from "react-apollo";
import * as Constants from "../constants/Constants.js";

const initialState = {
  username: "",
  password: "",
  email: "",
  name: "",
  surname: "",
  bio: "",
  usernameErrorMessage: "",
  passwordErrorMessage: "",
  emailErrorMessage: "",
  nameErrorMessage: "",
  surnameErrorMessage: "",
};

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      usernameErrorMessage: "",
      passwordErrorMessage: "",
      emailErrorMessage: "",
      nameErrorMessage: "",
      surnameErrorMessage: "",
    });
  };

  isValid = () => {
    let valid = true;

    if (this.state.name.length === 0) {
      this.setState({
        nameErrorMessage: "Name can't be blank",
      });
      valid = false;
    }

    if (this.state.surname.length === 0) {
      this.setState({
        surnameErrorMessage: "Surname can't be blank",
      });
      valid = false;
    }

    if (this.state.email.length === 0) {
      this.setState({
        emailErrorMessage: "Email can't be blank",
      });
      valid = false;
    } else if (!this.state.email.includes("@")) {
      this.setState({
        emailErrorMessage: "Invalid email format",
      });
      valid = false;
    }

    if (this.state.username.length === 0) {
      this.setState({
        usernameErrorMessage: "Username can't be blank",
      });
      valid = false;
    } else if (this.state.username.length < 5) {
      this.setState({
        usernameErrorMessage: "Username must contain at least 5 characters",
      });
      valid = false;
    }

    let pwRegex = /(?=.*[0-9])/;

    if (this.state.password.length === 0) {
      this.setState({
        passwordErrorMessage: "Password can't be blank",
      });
      valid = false;
    } else if (this.state.password.length < 8) {
      this.setState({
        passwordErrorMessage: "Password must contain at least 8 characters",
      });
      valid = false;
    } else if (!this.state.password.match(pwRegex)) {
      this.setState({
        passwordErrorMessage: "Password must contain at least one digit",
      });
      valid = false;
    }

    return valid;
  };

  update = (cache, data) => {
    this.props.history.push("/dashboard", {
      loggedIn: true,
      signInData: { account: data.data.createAccount },
    });
  };

  render() {
    return (
      <div>
        <div className="centerH">
          <Mutation mutation={Constants.REGISTER_MUTATION} update={this.update}>
            {(register) => (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (this.isValid()) {
                    register({
                      variables: {
                        account: {
                          name: this.state.name,
                          surname: this.state.surname,
                          bio: this.state.bio,
                          user: {
                            username: this.state.username,
                            password: this.state.password,
                            email: this.state.email,
                          },
                        },
                      },
                    });
                  }
                }}
              >
                <h2 className="orangeText">Register</h2>
                <div>
                  <div>
                    <input
                      placeholder="name"
                      onChange={this.handleChange}
                      name="name"
                      value={this.state.name}
                    ></input>
                    <br></br>
                    <label className="error">
                      {this.state.nameErrorMessage}
                    </label>
                  </div>
                  <div>
                    <input
                      placeholder="surname"
                      onChange={this.handleChange}
                      name="surname"
                      value={this.state.surname}
                    ></input>
                    <br></br>
                    <label className="error">
                      {this.state.surnameErrorMessage}
                    </label>
                  </div>
                  <div>
                    <input
                      placeholder="email"
                      type="email"
                      onChange={this.handleChange}
                      name="email"
                      value={this.state.email}
                    ></input>
                    <br></br>
                    <label className="error">
                      {this.state.emailErrorMessage}
                    </label>
                  </div>
                  <input
                    placeholder="username"
                    onChange={this.handleChange}
                    name="username"
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
                    onChange={this.handleChange}
                    name="password"
                    value={this.state.password}
                  ></input>
                  <br></br>
                  <label className="error">
                    {this.state.passwordErrorMessage}
                  </label>
                </div>
                <div>
                  <textarea
                    placeholder="about you (optional)"
                    onChange={this.handleChange}
                    name="bio"
                    value={this.state.bio}
                  ></textarea>
                </div>
                <button className="orange" type="submit">
                  Register
                </button>
                <div>
                  <Link to="/login">
                    <button className="red">Log in</button>
                  </Link>
                </div>
              </form>
            )}
          </Mutation>
        </div>
      </div>
    );
  }
}
