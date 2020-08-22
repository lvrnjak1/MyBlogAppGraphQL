import React, { useState, useEffect } from "react";
import ProfileSnippet from "./ProfileSnippet";
import NewPost from "./NewPost";
import Post from "./Post";
import { getUser } from "./Utils";
import * as Constants from "../constants/Constants";
import { useQuery, useLazyQuery, useMutation } from "react-apollo";

export default function Profile(props) {
  const goToDashboard = () => {
    props.history.push("/dashboard");
  };

  const logout = () => {
    localStorage.clear();
    props.history.push("/");
  };

  const [account, setAccount] = useState(JSON.parse(getUser()));
  const [posts, setPosts] = useState([]);
  const [isMyProfile, setMyProfile] = useState(
    props.location.state.isMyProfile
  );

  // const [getMyFollowing] = useLazyQuery(Constants.GET_FOLLOWING, {
  //   onCompleted(data) {
  //     console.log(data);
  //     setFollowing(data.account.following);
  //   },
  // });

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

  return (
    <div>
      <div className="profile">
        <button className="orange bold my-profile" onClick={goToDashboard}>
          <p className="prompt">Go to dashboard</p>
        </button>
        <ProfileSnippet
          account={{
            name: account.name,
            surname: account.surname,
            username: account.user.username,
            bio: account.bio,
            following: account.numberOfFollowing,
            followers: account.numberOfFollowers,
          }}
        />
        <div className="new-post">
          <NewPost></NewPost>
        </div>
        {isMyProfile ? (
          <button className="red bold my-profile" onClick={logout}>
            <p className="prompt">Logout</p>
          </button>
        ) : (
          <div></div>
        )}
      </div>
      <div className="posts">
        {posts.length > 0 ? (
          posts.map((post) => {
            post["author"] = {
              name: account.name,
              surname: account.surname,
            };
            return (
              <Post
                key={post.id}
                post={post}
                deleteOption={isMyProfile}
                handleDelete={handleDeletePost}
              ></Post>
            );
          })
        ) : (
          <h1>No posts to show yet!</h1>
        )}
      </div>
    </div>
  );
}
