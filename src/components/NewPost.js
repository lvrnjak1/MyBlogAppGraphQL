import React, { useState } from "react";
import * as Constants from "../constants/Constants.js";
import { Mutation } from "react-apollo";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: "#ff5252",
  },
  card: {
    display: "center",
    padding: "3em",
    textAlign: "center",
  },
}));

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [publishedMessage, setPublishedMessage] = useState("");
  const classes = useStyles();

  const handleChange = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else {
      setBody(e.target.value);
    }
    setPublishedMessage("");
  };

  return (
    <Card className={classes.card} raised variant="outlined">
      <Mutation mutation={Constants.NEW_POST}>
        {(addPost) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addPost({
                variables: {
                  post: {
                    title: title,
                    body: body,
                    dateTimePosted: new Date().getTime(),
                  },
                },
              });
              setTitle("");
              setBody("");
              setPublishedMessage("Post successfully published");
            }}
          >
            <Typography component="h3">New Post</Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Post title"
              name="title"
              autoFocus
              onChange={handleChange}
              value={title}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              rows={4}
              name="body"
              label="Post body"
              onChange={handleChange}
              value={body}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Publish
            </Button>
            <Typography component="lable">{publishedMessage}</Typography>
          </form>
        )}
      </Mutation>
    </Card>
  );
}
