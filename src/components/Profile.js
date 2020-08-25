import React, { useState } from "react";
import ProfileSnippet from "./ProfileSnippet";
import NewPost from "./NewPost";
import Post from "./Post";
import * as Constants from "../constants/Constants";
import { useQuery, useMutation } from "react-apollo";
import Header from "./Header.js";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import AccountList from "./AccountList";
import "../css/style.css";

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
  const [editPost] = useMutation(Constants.EDIT_POST);

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

  const handleEditPost = async (e, postId, newTitle, newBody, callback) => {
    e.preventDefault();
    await editPost({
      variables: {
        postId,
        newTitle,
        newBody,
      },
    })
      .then((res) => {
        let newPosts = account.posts.slice();
        let index = newPosts.findIndex((post) => post.id === res.data.post.id);
        newPosts[index].title = res.data.post.title;
        newPosts[index].body = res.data.post.body;
        newPosts[index].edited = res.data.post.edited;
        setAccount({
          ...account,
          posts: newPosts,
        });
      })
      .then(() => {
        callback(newTitle, newBody, true);
      });
  };

  const handleNewPost = (post) => {
    let newPosts = account.posts;
    newPosts.unshift(post);
    setAccount({ ...account, posts: newPosts });
    forceUpdate();
    //window.location.reload();
  };

  const { loading, error } = useQuery(Constants.GET_ACCOUNT_BY_ID, {
    variables: {
      accountId: props.location.state.id,
    },
    onCompleted(data) {
      setAccount(data.account);
    },
  });

  return (
    <div>
      {!account.user || loading || error ? null : (
        <div>
          <Header {...props} dashboard={false}></Header>
          <div className="background">
            <Container maxWidth="lg">
              <Grid container spacing={5}>
                <Grid item xs={8}>
                  {props.location.state.isMyProfile ? (
                    <div>
                      <NewPost callback={handleNewPost}></NewPost>
                      <br></br>
                    </div>
                  ) : (
                    ""
                  )}
                  <GridList
                    cellHeight="auto"
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
                              deleteOption={props.location.state.isMyProfile}
                              handleDelete={handleDeletePost}
                              handleEdit={handleEditPost}
                            ></Post>
                          </GridListTile>
                        );
                      })
                    ) : (
                      <h1>No posts to show yet!</h1>
                    )}
                  </GridList>
                </Grid>
                <Grid item xs={4}>
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
                  <br></br>
                  <AccountList
                    list={account.followers}
                    title="Followers"
                    count={account.numberOfFollowers}
                  ></AccountList>
                  <br></br>
                  <AccountList
                    list={account.following}
                    title="Following"
                    count={account.numberOfFollowing}
                  ></AccountList>
                </Grid>
              </Grid>
            </Container>
          </div>
        </div>
      )}
    </div>
  );
}
