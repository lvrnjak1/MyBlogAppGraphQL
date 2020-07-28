import React from "react";
import "../css/profile.css";
import Avatar from "../images/female.svg";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      surname: this.props.user.surname,
    };
  }

  render() {
    return (
      <div className="preview">
        {/* <img src={Avatar} alt="avatar"></img> */}
        <p className="center-text white-border">
          {this.state.name} {this.state.surname}
        </p>
      </div>
    );
  }
}
