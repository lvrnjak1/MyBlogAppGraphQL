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
import LikeList from "./LikeList.js";

export default function Dashboard(props) {
  const [feedPosts, setFeedPosts] = useState([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [modalId, setModalId] = useState(null);
  const [modalList, setModalList] = useState([]);

  const { refetch } = useQuery(Constants.POPULATE_FEED, {
    onCompleted(data) {
      setFeedPosts(data.posts);
    },
  });

  const openModal = (postId, list) => {
    setModalId(postId);
    setModalList(list);
    setModalOpened(true);
  };

  return (
    <div>
      <Header {...props} dashboard={true}></Header>
      {modalOpened ? (
        <LikeList
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
          modalId={modalId}
          list={modalList}
        ></LikeList>
      ) : (
        ""
      )}
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
                    open={setModalOpened}
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
  );
}
