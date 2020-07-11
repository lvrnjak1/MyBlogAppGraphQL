import React from "react";
import "../css/profile.css";
import Avatar from "../images/female.svg";
import ProfilePreview from "./ProfilePreview";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      followers: [{}, {}],
      following: [{}, {}],
    };
  }

  render() {
    return (
      <div className="profile_container">
        <img src={Avatar} alt="avatar"></img>
        <div className="other">
          <h3>Name: Lamija</h3>
          <h3>Surname: Vrnjak</h3>
          <h3>Username: lvrnjak1</h3>
        </div>
        <div className="clear bio">
          <p>I am a student and a programmer.</p>
        </div>
        <div className="account_list">
          Following
          {this.state.following.map((user) => {
            return <ProfilePreview></ProfilePreview>;
          })}
        </div>
        <div className="account_list clear">Followers</div>
      </div>
    );
  }
}
