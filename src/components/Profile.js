import React, { useState, useEffect } from "react";
import ProfileSnippet from "./ProfileSnippet";
import NewPost from "./NewPost";
import Post from "./Post";
import { getUser } from "./Utils";
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
    width: 500,
    height: 450,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  padding: {
    padding: "1em",
  },
}));

export default function Profile(props) {
  const [account, setAccount] = useState(JSON.parse(getUser()));
  const [posts, setPosts] = useState([]);
  const forceUpdate = useForceUpdate();
  const classes = useStyles();

  const [deletePost] = useMutation(Constants.DELETE_POST);

  const handleDeletePost = async (e, id) => {
    e.preventDefault();
    await deletePost({
      variables: { postId: id },
    }).then((res) => {
      if (res.data.status.success) {
        setPosts(posts.filter((post) => post.id !== id));
      }
      //err =>
    });
  };

  const { data } = useQuery(Constants.GET_MY_POSTS, {
    onCompleted(data) {
      setPosts(data.account.posts);
    },
  });

  useQuery(Constants.GET_MY_ACCOUNT_DETAILS, {
    onCompleted(data) {
      if (props.isMyProfile) {
        saveUserData(data.account);
        setAccount(JSON.parse(getUser()));
      } else {
        setAccount(data.account);
      }
    },
  });

  const handleNewPost = (post) => {
    let newPosts = posts;
    newPosts.unshift(post);
    setPosts(newPosts);
    forceUpdate();
  };

  return (
    <div>
      <Header {...props} dashboard={false}></Header>
      <div className="background">
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={8}>
              <NewPost callback={handleNewPost}></NewPost>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <ProfileSnippet
                    account={{
                      name: account.name,
                      surname: account.surname,
                      username: account.user.username,
                      email: account.user.email,
                      bio: account.bio,
                      following: account.numberOfFollowing,
                      followers: account.numberOfFollowers,
                    }}
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
              <GridList cellHeight={200} cols={1} classname={classes.gridList}>
                {posts.length > 0 ? (
                  posts.map((post) => {
                    post["author"] = {
                      name: account.name,
                      surname: account.surname,
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
    // <div>
    //   <div className="profile">
    //     <button className="orange bold my-profile" onClick={goToDashboard}>
    //       <p className="prompt">Go to dashboard</p>
    //     </button>
    //     <ProfileSnippet
    //       account={{
    //         name: account.name,
    //         surname: account.surname,
    //         username: account.user.username,
    //         bio: account.bio,
    //         following: account.numberOfFollowing,
    //         followers: account.numberOfFollowers,
    //       }}
    //     />
    //     <div className="new-post">
    //       <NewPost></NewPost>
    //     </div>
    //     {isMyProfile ? (
    //       <button className="red bold my-profile" onClick={logout}>
    //         <p className="prompt">Logout</p>
    //       </button>
    //     ) : (
    //       <div></div>
    //     )}
    //   </div>
    //   <div className="posts">
    //     {posts.length > 0 ? (
    //       posts.map((post) => {
    //         post["author"] = {
    //           name: account.name,
    //           surname: account.surname,
    //         };
    //         return (
    //           <Post
    //             key={post.id}
    //             post={post}
    //             deleteOption={isMyProfile}
    //             handleDelete={handleDeletePost}
    //           ></Post>
    //         );
    //       })
    //     ) : (
    //       <h1>No posts to show yet!</h1>
    //     )}
    //   </div>
    // </div>
  );
}
