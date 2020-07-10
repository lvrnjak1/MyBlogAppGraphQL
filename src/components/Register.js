import React from "react";

const initialState = {
  username: "",
  password: "",
  email: "",
  name: "",
  surname: "",
  bio: "",
};

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <div className="centerH">
          <form>
            <h2 className="orangeText">Register</h2>
            <div>
              <div>
                <input
                  placeholder="name"
                  onChange={this.handleChange}
                  name="name"
                  value={this.state.name}
                ></input>
              </div>
              <div>
                <input
                  placeholder="surname"
                  onChange={this.handleChange}
                  name="surname"
                  value={this.state.surname}
                ></input>
              </div>
              <div>
                <input
                  placeholder="email"
                  type="email"
                  onChange={this.handleChange}
                  name="email"
                  value={this.state.email}
                ></input>
              </div>
              <input
                placeholder="username"
                onChange={this.handleChange}
                name="username"
                value={this.state.username}
              ></input>
            </div>
            <div>
              <input
                placeholder="passsword"
                type="password"
                onChange={this.handleChange}
                name="password"
                value={this.state.password}
              ></input>
            </div>
            <div>
              <textarea
                placeholder="about you (optional)"
                onChange={this.handleChange}
                name="bio"
                value={this.state.bio}
              ></textarea>
            </div>
            <button
              className="orange"
              type="submit"
              onClick={(event) =>
                this.props.handleRegister(event, this.state, () => {
                  this.setState(initialState);
                })
              }
            >
              Register
            </button>
            <div>
              <button className="red" onClick={this.props.handleLogin}>
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
