import React from "react";
import "../css/dashboard.css";
import Post from "./Post.js";
import Profile from "./Profile";
import NewPost from "./NewPost";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: this.props.location.state.loggedIn,
      id: this.props.location.state.signInData.id,
      token: this.props.location.state.signInData.token,
      name: this.props.location.state.signInData.account.name,
      surname: this.props.location.state.signInData.account.surname,
      email: this.props.location.state.signInData.account.user.email,
      bio: this.props.location.state.signInData.account.bio,
      username: this.props.location.state.signInData.account.user.username,
    };
  }

  render() {
    return this.state.loggedIn ? (
      <div>
        <div className="profile">
          <Profile
            account={{
              name: this.state.name,
              surname: this.state.surname,
              username: this.state.username,
              bio: this.state.bio,
              following: this.state.following,
              followers: this.state.followers,
            }}
          />
        </div>
        <div className="new-post">
          <NewPost></NewPost>
        </div>
        {/* <div className="posts">
          {this.state.posts.map((post) => {
            return (
              <div key={post.id}>
                <Post
                  post={post}
                  author={{
                    id: this.state.id,
                    name: this.state.name,
                    surname: this.state.surname,
                  }}
                />
              </div>
            );
          })}
        </div> */}
      </div>
    ) : (
      <div>Ups, log in</div>
    );
  }
}
