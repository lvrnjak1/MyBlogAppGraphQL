import React from "react";
import "../css/profile.css";
import Avatar from "../images/female.svg";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Lamija Vrnjak",
    };
  }

  render() {
    return (
      <div className="preview">
        <img src={Avatar} alt="avatar"></img>
        <h4>{this.state.name}</h4>
      </div>
    );
  }
}
