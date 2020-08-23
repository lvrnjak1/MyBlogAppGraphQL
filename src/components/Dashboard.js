import React from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { makeStyles } from "@material-ui/core/styles";
import Post from "./Post.js";
import NewPost from "./NewPost";
import { Query } from "react-apollo";
import * as Constants from "../constants/Constants.js";
import { getUser, getToken } from "./Utils";
import ProfileSnippet from "./ProfileSnippet";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { useQuery } from "react-apollo";
import { useState } from "react";
import Header from "./Header.js";
import { Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import "../css/dashboard.css";

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

export default function Dashboard(props) {
  const classes = useStyles();
  const [feedPosts, setFeedPosts] = useState([]);

  useQuery(Constants.POPULATE_FEED, {
    onCompleted(data) {
      console.log(data.posts);
      setFeedPosts(data.posts);
    },
  });

  return (
    <div>
      <Header {...props}></Header>
      <div className="background">
        <Container maxWidth="lg" classname={classes.background}>
          <Grid container spacing={4}>
            <Grid item xs={9}>
              <NewPost></NewPost>
            </Grid>
            <Grid item xs={3}>
              <Paper>Search</Paper>
            </Grid>
            <Grid item xs={9}>
              <GridList cellHeight={200} cols={1} classname={classes.gridList}>
                {feedPosts.map((post) => (
                  <GridListTile key={post.id}>
                    <Post post={post} deleteOption={false}></Post>
                  </GridListTile>
                ))}
              </GridList>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}

// export default class Dashboard extends React.Component {
//   constructor(props) {
//     super(props);
//     const account = JSON.parse(getUser());
//     this.state = {
//       loggedIn: getToken() != null,
//       id: account.id,
//       name: account.name,
//       surname: account.surname,
//       email: account.user.email,
//       bio: account.bio,
//       username: account.user.username,
//       numberOfFollowers: account.numberOfFollowers,
//       numberOfFollowing: account.numberOfFollowing,
//     };
//   }

//   logout = () => {
//     localStorage.clear();
//     this.props.history.push("/");
//   };

//   goToMyProfile = () => {
//     this.props.history.push("/profile/" + this.state.username, {
//       isMyProfile: true,
//     });
//   };

//   render() {
//     return this.state.loggedIn ? (
//       <div>
//         <div className="profile">
//           <button
//             className="orange bold my-profile"
//             onClick={this.goToMyProfile}
//           >
//             <p className="prompt">Go to my profile</p>
//           </button>
//           <ProfileSnippet
//             account={{
//               name: this.state.name,
//               surname: this.state.surname,
//               username: this.state.username,
//               bio: this.state.bio,
//               following: this.state.numberOfFollowing,
//               followers: this.state.numberOfFollowers,
//             }}
//           />
//           <div className="new-post">
//             <NewPost></NewPost>
//           </div>
//           <button className="red bold my-profile" onClick={this.logout}>
//             <p className="prompt">Logout</p>
//           </button>
//         </div>
//         <div className="posts">
//           <Query query={Constants.POPULATE_FEED}>
//             {({ loading, error, data }) => {
//               if (loading) return "Loading...";
//               if (error) return `Error! ${error.message}`;
//               const { posts } = data;
//               return posts.length > 0 ? (
//                 posts.map((post) => (
//                   <Post key={post.id} post={post} deleteOption={false}></Post>
//                 ))
//               ) : (
//                 <h1>No posts to show yet!</h1>
//               );
//             }}
//           </Query>
//         </div>
//       </div>
//     ) : (
//       <div>Ups, log in</div>
//     );
//   }
// }
