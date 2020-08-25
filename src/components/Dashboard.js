import React from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Post from "./Post.js";
import NewPost from "./NewPost";
import * as Constants from "../constants/Constants.js";
import { useQuery } from "react-apollo";
import { useState } from "react";
import Header from "./Header.js";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import "../css/style.css";
import Search from "./Search.js";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { getModalStyle } from "./Utils";
import AccountList from "./AccountList.js";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Dashboard(props) {
  const [feedPosts, setFeedPosts] = useState([]);
  const [modalOpened, setModalOpened] = useState(false);
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [modalList, setModalList] = useState([]);

  const { refetch } = useQuery(Constants.POPULATE_FEED, {
    onCompleted(data) {
      setFeedPosts(data.posts);
    },
  });

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <AccountList list={modalList} count={modalList.length} title="Liked by" />
    </div>
  );

  //use lazy Query to get the list
  const openModal = (postId) => {
    //modalList = feedPosts.find((post) => post.id === postId).likes;
    setModalList([]);
    setModalOpened(true);
  };

  return (
    <div>
      <Header {...props} dashboard={true}></Header>
      <div className="background">
        <Modal
          open={modalOpened}
          onClose={() => {
            setModalList([]);
            setModalOpened(false);
          }}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={8}>
              <NewPost></NewPost>
              <br></br>
              <GridList cellhight="auto" cols={1}>
                {feedPosts.map((post) => (
                  <GridListTile key={post.id}>
                    <Post
                      post={post}
                      deleteOption={false}
                      openLikesList={openModal}
                    ></Post>
                  </GridListTile>
                ))}
              </GridList>
            </Grid>
            <Grid item xs={4}>
              <Search
                refreshPosts={() =>
                  refetch().then((res) => {
                    setFeedPosts(res.data.posts);
                  })
                }
              ></Search>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}
