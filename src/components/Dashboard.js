import React from "react";
import "../css/dashboard.css";
import Post from "./Post.js";
import Profile from "./Profile";
import NewPost from "./NewPost";
import { Query } from "react-apollo";
import * as Constants from "../constants/Constants.js";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: this.props.location.state
        ? this.props.location.state.loggedIn
        : false,
      id: this.props.location.state.signInData.id,
      name: this.props.location.state.signInData.account.name,
      surname: this.props.location.state.signInData.account.surname,
      email: this.props.location.state.signInData.account.user.email,
      bio: this.props.location.state.signInData.account.bio,
      username: this.props.location.state.signInData.account.user.username,
      numberOfFollowers: this.props.location.state.signInData.account
        .numberOfFollowers,
      numberOfFollowing: this.props.location.state.signInData.account
        .numberOfFollowing,
      posts: [],
    };

    localStorage.setItem("TOKEN", this.props.location.state.signInData.token);
  }

  logout = () => {
    localStorage.clear();
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
