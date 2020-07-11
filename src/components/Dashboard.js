import React from "react";
import "../css/dashboard.css";
import Post from "./Post.js";
import Profile from "./Profile";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      user: {}, //logged in user
      posts: [{}, {}, {}, {}, {}, {}],
    };
  }

  componentDidMount() {}

  render() {
    return this.state.loggedIn ? (
      <div>
        <div className="profile">
          <Profile />
        </div>
        <div className="posts">
          {this.state.posts.map((post) => {
            return <Post post={post} author={this.state.user} />;
          })}
        </div>
      </div>
    ) : (
      <div>Ups, log in</div>
    );
  }
}
