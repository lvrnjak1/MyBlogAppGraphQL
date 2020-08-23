import React, { useState } from "react";
import * as Constants from "../constants/Constants.js";
import { useMutation } from "react-apollo";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "@material-ui/core/Hidden";
import image from "../images/female.svg";
import { Container } from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    display: "flex",
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  blue: {
    backgroundColor: "#f123d",
  },
});

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

  const classes = useStyles();
  const [author, setAuthor] = useState({
    name: props.post.author.name,
    surname: props.post.author.surname,
    username: props.post.author.username,
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

  const editPost = (e) => {
    //async??
    props.handleEdit(e, id);
  };

  return (
    <Grid item xs={12}>
      <Card className={classes.card} variant="outlined">
        <div className={classes.cardDetails}>
          <CardContent>
            <Typography component="h2" variant="h5">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {stringFromDate(dateTime)} by {author.name + " " + author.surname}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {body}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </Grid>
    // <div className="post">
    //   <h1>{title}</h1>
    //   <p>{body}</p>
    //   <p className="date">
    //     {stringFromDate(dateTime)} by {author.name + " " + author.surname}
    //   </p>
    //   <div className="button_container">
    //     <button className="orange bold" onClick={handleLike}>
    //       {likeButtonText}
    //     </button>
    //     <button className="red right">
    //       Liked by {likes} user{like_plural ? "s" : ""}
    //     </button>
    //     {props.deleteOption ? (
    //       <div className="utils">
    //         <button onClick={(e) => editPost()}>edit</button>
    //         <button onClick={(e) => props.handleDelete(e, id)}>delete</button>
    //       </div>
    //     ) : (
    //       ""
    //     )}
    //   </div>
    // </div>
  );
}
