import React from "react";
import "../css/dashboard.css";
import Post from "./Post.js";
import Profile from "./Profile";
import NewPost from "./NewPost";
import { Query } from "react-apollo";
import * as Constants from "../constants/Constants.js";
import { logoutUser, getUser, getToken } from "./Utils";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    const account = JSON.parse(getUser());
    this.state = {
      loggedIn: getToken() != null,
      id: account.id,
      name: account.name,
      surname: account.surname,
      email: account.user.email,
      bio: account.bio,
      username: account.user.username,
      numberOfFollowers: account.numberOfFollowers,
      numberOfFollowing: account.numberOfFollowing,
      //feedPosts: [],
    };
  }

  logout = () => {
    logoutUser();
    this.props.history.push("/");
  };

  render() {
    return this.state.loggedIn ? (
      <div>
        <div className="profile">
          <button className="orange bold my-profile">
            <p className="prompt">Go to my profile</p>
          </button>
          <Profile
            account={{
              name: this.state.name,
              surname: this.state.surname,
              username: this.state.username,
              bio: this.state.bio,
              following: this.state.numberOfFollowing,
              followers: this.state.numberOfFollowers,
            }}
          />
          <div className="new-post">
            <NewPost></NewPost>
          </div>
          <button className="red bold my-profile" onClick={this.logout}>
            <p className="prompt">Logout</p>
          </button>
        </div>
        <div className="posts">
          <Query query={Constants.POPULATE_FEED}>
            {({ loading, error, data }) => {
              if (loading) return "Loading...";
              if (error) return `Error! ${error.message}`;
              const { posts } = data;
              return posts.map((post) => (
                <Post key={post.id} post={post}></Post>
              ));
            }}
          </Query>
        </div>
      </div>
    ) : (
      <div>Ups, log in</div>
    );
  }
}
