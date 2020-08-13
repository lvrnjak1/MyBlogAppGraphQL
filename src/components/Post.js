import React, { useState } from "react";
import "../css/post.css";
import * as Constants from "../constants/Constants.js";
import { useMutation } from "react-apollo";

export default function Post(props) {
  const [likeButtonText, setLikeButtonText] = useState(
    props.post.likedByTheCurrentUser ? "Dislike" : "Like"
  );
  const [id, setId] = useState(props.post.id);
  const [title, setTitle] = useState(props.post.title);
  const [body, setBody] = useState(props.post.body);
  const [dateTime, setDateTime] = useState(props.post.dateTimePosted);
  const [likes, setLikes] = useState(props.post.numberOfLikes);
  const [like_plural, setLikePlural] = useState(
    props.post.numberOfLikes === 1 ? false : true
  );
  const [author, setAuthor] = useState({
    name: props.post.author.name,
    surname: props.post.author.surname,
  });

  const stringFromDate = (d) => {
    let date = new Date(parseInt(d));
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let month =
      date.getMonth() + 1 < 10 ? "0" + date.getMonth() : date.getMonth();
    let year = date.getFullYear();
    let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    return day + "." + month + "." + year + " " + hours + ":" + minutes;
  };

  const [toggleLike] = useMutation(Constants.TOGGLE_LIKE, {
    onCompleted(data) {
      setLikes(data.post.numberOfLikes);
      setLikeButtonText(likeButtonText === "Like" ? "Dislike" : "Like");
    },
  });

  const handleLike = async (e) => {
    e.preventDefault();
    await toggleLike({ variables: { postId: id } });
  };

  return (
    <div className="post">
      <h1>{title}</h1>
      <p>{body}</p>
      <p className="date">
        {stringFromDate(dateTime)} by {author.name + " " + author.surname}
      </p>
      <div className="button_container">
        <button className="orange bold" onClick={handleLike}>
          {likeButtonText}
        </button>
        <button className="red right">
          Liked by {likes} user{like_plural ? "s" : ""}
        </button>
      </div>
    </div>
  );
}
