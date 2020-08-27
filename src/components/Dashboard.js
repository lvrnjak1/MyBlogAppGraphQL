import React, { useEffect } from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Post from "./Post.js";
import NewPost from "./NewPost";
import * as Constants from "../constants/Constants.js";
import { useQuery, withApollo, Query } from "react-apollo";
import { useState } from "react";
import Header from "./Header.js";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import "../css/style.css";
import Search from "./Search.js";

function Dashboard(props) {
  //const [feedPosts, setFeedPosts] = useState([]);

  // const { subscribeToMore, refetch, data } = useQuery(Constants.POPULATE_FEED, {
  //   onCompleted(data) {
  //     setFeedPosts(data.posts);
  //   },
  // });

  //const { data, loading } = useSubscription(Constants.SUBSCRIBE);

  //if (data) console.log(data);

  // useEffect(() => {
  //   subscribeToMore({
  //     document: Constants.SUBSCRIBE,
  //     updateQuery: (prev, { subscriptionData }) => {
  //       if (!subscriptionData.data) return prev;
  //       const newFeedItem = subscriptionData.data.newPost;
  //       return Object.assign({}, prev, {
  //         posts: [newFeedItem, ...prev.posts],
  //       });
  //       console.log(newFeedItem);
  //       console.log(prev);
  //       return prev;
  //     },
  //   });
  // }, []);

  // useEffect(() => {
  //   if (data) {
  //     console.log(data);
  //     console.log("Here");
  //     setFeedPosts(data.posts);
  //   }
  // }, [data]);

  const subscribeToNewPosts = (subscribeToMore) => {
    subscribeToMore({
      document: Constants.SUBSCRIBE,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.newPost;
        console.log(prev);
        console.log(newFeedItem);
        const exists = prev.posts.find((post) => post.id === newFeedItem.id);
        if (exists) return prev;
        return Object.assign({}, prev, {
          posts: [newFeedItem, ...prev.posts],
        });
      },
    });
  };

  return (
    <div>
      <Header {...props} dashboard={true}></Header>
      <div className="background">
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={8}>
              <NewPost></NewPost>
              <br></br>
              <Query query={Constants.POPULATE_FEED}>
                {({ loading, error, data, subscribeToMore, refetch }) => {
                  if (loading) return <div>Fetching</div>;
                  if (error) return <div>Error</div>;

                  subscribeToNewPosts(subscribeToMore);

                  const feedPosts = data.posts;

                  return (
                    <div>
                      <GridList cellhight="auto" cols={1}>
                        {feedPosts.map((post) => (
                          <GridListTile key={post.id}>
                            <Post post={post} deleteOption={false}></Post>
                          </GridListTile>
                        ))}
                      </GridList>
                    </div>
                  );
                }}
              </Query>
            </Grid>
            <Grid item xs={4}>
              <Search></Search>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default withApollo(Dashboard);
