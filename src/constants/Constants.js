import { gql } from "apollo-boost";

export const GRAPHQL_API = "https://lvrnjak-blog-server.herokuapp.com/graphql";
//process.env.REACT_APP_GRAPHQL_API;
export const SUBSCRIPTION_URL =
  "ws://lvrnjak-blog-server.herokuapp.com/subscriptions";
//process.env.REACT_APP_SUBSCRIPTION_URL;

export const LOGIN_MUTATION = gql`
  mutation signIn($authData: AuthData) {
    signIn(authData: $authData) {
      token
      account {
        id
        name
        surname
        user {
          username
        }
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation createAccount($account: AccountInput) {
    account: createAccount(account: $account) {
      token
      account {
        id
        name
        surname
        bio
        numberOfFollowers
        numberOfFollowing
        user {
          username
          email
        }
      }
    }
  }
`;

export const POPULATE_FEED = gql`
  {
    posts: populateFeed(offsetDays: 0, numberOfDays: 100) {
      id
      title
      body
      dateTimePosted
      edited
      author {
        id
        name
        surname
        user {
          username
        }
      }
      numberOfLikes
      likedByTheCurrentUser
    }
  }
`;

export const TOGGLE_LIKE = gql`
  mutation toggleLike($postId: ID) {
    post: toggleLike(postId: $postId) {
      numberOfLikes
    }
  }
`;

export const TOGGLE_FOLLOW = gql`
  mutation toggleFollow($followeeId: ID!) {
    account: toggleFollow(followeeId: $followeeId) {
      id
      isFollowedByLoggedInAccount
    }
  }
`;

export const NEW_POST = gql`
  mutation addPost($post: PostInput) {
    post: addPost(post: $post) {
      id
      title
      body
      dateTimePosted
      numberOfLikes
      likedByTheCurrentUser
      edited
    }
  }
`;

export const GET_MY_POSTS = gql`
  {
    account: getAccount {
      posts {
        id
        title
        body
        dateTimePosted
        numberOfLikes
        likedByTheCurrentUser
        edited
      }
    }
  }
`;

export const GET_FOLLOWERS = gql`
  {
    account: getAccount {
      followers {
        id
        name
        surname
      }
    }
  }
`;

export const GET_FOLLOWING = gql`
  {
    account: getAccount {
      following {
        id
        name
        surname
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: ID) {
    status: deletePost(postId: $postId) {
      message
      success
    }
  }
`;

export const EDIT_POST = gql`
  mutation editPost($postId: ID, $newTitle: String, $newBody: String) {
    post: editPost(postId: $postId, newTitle: $newTitle, newBody: $newBody) {
      id
      title
      body
      edited
    }
  }
`;

export const GET_MY_ACCOUNT_DETAILS = gql`
  {
    account: getAccount {
      id
      name
      surname
      bio
      numberOfFollowers
      numberOfFollowing
      user {
        username
        email
      }
    }
  }
`;

export const SEARCH = gql`
  query search($toSearch: String) {
    results: searchAccounts(toSearch: $toSearch) {
      id
      name
      surname
      user {
        username
      }
      isFollowedByLoggedInAccount
    }
  }
`;

export const GET_ACCOUNT_BY_USERNAME = gql`
  query getAccountByUsername($username: String!) {
    account: getAccountByUsername(username: $username) {
      id
      name
      surname
      bio
      numberOfFollowers
      numberOfFollowing
      isFollowedByLoggedInAccount
      user {
        username
        email
      }
      posts {
        id
        title
        body
        dateTimePosted
        numberOfLikes
        likedByTheCurrentUser
        edited
      }
      followers {
        id
        name
        surname
        user {
          username
        }
      }
      following {
        id
        name
        surname
        user {
          username
        }
      }
    }
  }
`;

export const SUBSCRIBE = gql`
  subscription {
    newPost {
      id
      title
      body
      dateTimePosted
      edited
      author {
        id
        name
        surname
        user {
          username
        }
      }
      numberOfLikes
      likedByTheCurrentUser
    }
  }
`;

export const GET_POST_LIKES = gql`
  query getPostById($postId: ID!) {
    post: getPostById(postId: $postId) {
      likes {
        account {
          id
          name
          surname
          user {
            username
          }
        }
      }
    }
  }
`;
