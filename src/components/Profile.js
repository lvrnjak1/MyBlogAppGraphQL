import React from "react";
import "../css/profile.css";
import Avatar from "../images/female.svg";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.account.name,
      surname: this.props.account.surname,
      username: this.props.account.username,
      bio: this.props.account.bio,
      followers: this.props.account.followers,
      following: this.props.account.following,
    };
  }

  render() {
    return (
      <div className="profile_container">
        <img src={Avatar} alt="avatar"></img>
        <div className="other">
          <h3>name: {this.state.name}</h3>
          <h3>surname: {this.state.surname}</h3>
          <h3>username: {this.state.username}</h3>
        </div>
        <div className="clear bio">
          <p className="prompt">About me:</p>
          <p>{this.state.bio}</p>
        </div>
        <div className="account_list">
          <button className="orange bold">
            <p className="prompt">Following: {this.state.following}</p>
          </button>
          <button className="red bold">
            <p className="prompt">Followers: {this.state.followers}</p>
          </button>
        </div>
      </div>
    );
  }
}
