import React from "react";
import "../css/post.css";

export default class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 123,
      title: "The post title",
      body:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam, quis nostrud exercitation ullamco laboris nisi utaliquip ex ea commodo consequat. Duis aute irure dolor in",
      dateTime: new Date().getDate(),
      author: {
        name: "Lamija",
        surname: "Vrnjak",
      },
      likes: 10,
      like_plural: true,
      likedBy: [
        {
          id: 541,
          name: "Azemina",
          surname: "Vrnjak",
        },
      ],
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
