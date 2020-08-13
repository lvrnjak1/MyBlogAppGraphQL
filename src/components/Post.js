import React from "react";
import "../css/post.css";

export default class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.post.id,
      title: this.props.post.title,
      body: this.props.post.body,
      dateTime: this.props.post.dateTimePosted,
      author: {
        name: this.props.post.author.name,
        surname: this.props.post.author.surname,
      },
      likes: this.props.post.numberOfLikes,
      like_plural: this.props.post.numberOfLikes === 1 ? false : true,
    };
  }

  stringFromDate = (dateTime) => {
    let date = new Date(parseInt(dateTime));
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let month =
      date.getMonth() + 1 < 10 ? "0" + date.getMonth() : date.getMonth();
    let year = date.getFullYear();
    let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    return day + "." + month + "." + year + " " + hours + ":" + minutes;
  };

  render() {
    return (
      <div className="post">
        <h1>{this.state.title}</h1>
        <p>{this.state.body}</p>
        <p className="date">
          {this.stringFromDate(this.state.dateTime)} by{" "}
          {this.state.author.name + " " + this.state.author.surname}
        </p>
        <div className="button_container">
          <button className="orange bold">Like</button>
          <button className="red right">
            Liked by {this.state.likes} user{this.state.like_plural ? "s" : ""}
          </button>
        </div>
      </div>
    );
  }
}
