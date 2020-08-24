import React, { useState } from "react";
import ProfileSnippet from "./ProfileSnippet";
import NewPost from "./NewPost";
import Post from "./Post";
import * as Constants from "../constants/Constants";
import { useQuery, useMutation } from "react-apollo";
import Header from "./Header.js";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { saveUserData } from "./Utils.js";

//create your forceUpdate hook
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => ++value); // update the state to force render
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    //height: 450,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  padding: {
    padding: "1em",
  },
}));

export default function Profile(props) {
  const [account, setAccount] = useState({}); //useState(JSON.parse(getUser()));
  const forceUpdate = useForceUpdate();
  const classes = useStyles();
  const [deletePost] = useMutation(Constants.DELETE_POST);

  const handleDeletePost = async (e, id) => {
    e.preventDefault();
    await deletePost({
      variables: { postId: id },
    }).then((res) => {
      if (res.data.status.success) {
        setAccount({
          ...account,
          posts: account.posts.filter((post) => post.id !== id),
        });
      }
      //err =>
    });
  };

  const handleNewPost = (post) => {
    let newPosts = account.posts;
    newPosts.unshift(post);
    setAccount({ ...account, posts: newPosts });
    forceUpdate();
  };

  const { loading, error, data } = useQuery(Constants.GET_ACCOUNT_BY_ID, {
    variables: {
      accountId: props.location.state.id,
    },
    onCompleted(data) {
      setAccount(data.account);
    },
  });

  return (
    <div>
      {!account.user || loading || error ? (
        ""
      ) : (
        <div>
          <Header {...props} dashboard={false}></Header>
          <div className="background">
            <Container maxWidth="lg">
              <Grid container spacing={4}>
                {props.location.state.isMyProfile ? (
                  <Grid item xs={12} sm={8}>
                    <NewPost callback={handleNewPost}></NewPost>
                  </Grid>
                ) : (
                  ""
                )}
                <Grid item xs={12} sm={4}>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <ProfileSnippet
                        account={{
                          id: account.id,
                          name: account.name,
                          surname: account.surname,
                          username: account.user.username,
                          email: account.user.email,
                          bio: account.bio,
                          following: account.numberOfFollowing,
                          followers: account.numberOfFollowers,
                          isFollowedByLoggedInAccount:
                            account.isFollowedByLoggedInAccount,
                        }}
                        isMyProfile={props.location.state.isMyProfile}
                      ></ProfileSnippet>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper>Followers</Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper>Following</Paper>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={8}>
                  <GridList
                    cellHeight={200}
                    cols={1}
                    className={classes.gridList}
                  >
                    {account.posts.length > 0 ? (
                      account.posts.map((post) => {
                        post["author"] = {
                          name: account.name,
                          surname: account.surname,
                          user: {
                            username: account.user.username,
                          },
                        };
                        return (
                          <GridListTile key={post.id}>
                            <Post
                              post={post}
                              deleteOption={props.isMyProfile}
                              handleDelete={handleDeletePost}
                            ></Post>
                          </GridListTile>
                        );
                      })
                    ) : (
                      <h1>No posts to show yet!</h1>
                    )}
                  </GridList>
                </Grid>
              </Grid>
            </Container>
          </div>
        </div>
      )}
    </div>
  );
}
