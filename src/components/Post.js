import React from "react";
import "../css/post.css";

export default class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.post.id,
      title: this.props.post.title,
      body: this.props.post.body,
      dateTime: new Date().getDate(),
      author: {
        name: this.props.author.name,
        surname: this.props.author.surname,
      },
      likes: this.props.post.likes.lenght,
      like_plural: this.props.post.likes.lenght === 1 ? false : true,
      // likedBy: this.props.post.likes,
    };
  }

  render() {
    return (
      <div className="post">
        <h1>{this.state.title}</h1>
        <p>{this.state.body}</p>
        <p className="date">
          11.07.2020. 12:51 by{" "}
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
