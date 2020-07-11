import React from "react";
import "../css/loginStyle.css";
import { Link } from "react-router-dom";

const initialState = {
  username: "",
  password: "",
};

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleSubmit(
      event,
      { username: this.state.username, password: this.state.password },
      () => {
        this.setState(initialState);
      }
    );
  };

  render() {
    return (
      <div className="centerH">
        <form>
          <h2>Login</h2>
          <div>
            <input
              placeholder="username"
              name="username"
              onChange={this.handleChange}
              value={this.state.username}
            ></input>
            <br></br>
            <label className="error">{this.state.usernameErrorMessage}</label>
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
            <label className="error">{this.state.passwordErrorMessage}</label>
          </div>
          <div>
            <button type="submit" className="red" onClick={this.handleSubmit}>
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
      </div>
    );
  }
}
