import { gql } from "apollo-boost";

export const GRAPHQL_API = "http://localhost:8080/graphql";

export const LOGIN_MUTATION = gql`
  mutation signIn($authData: AuthData) {
    signIn(authData: $authData) {
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

export const REGISTER_MUTATION = gql`
  mutation createAccount($account: AccountInput) {
    createAccount(account: $account) {
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

export const POPULATE_FEED = gql`
  {
    posts: populateFeed(offsetDays: 0, numberOfDays: 2) {
      id
      title
      body
      dateTimePosted
      author {
        name
        surname
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

export const NEW_POST = gql`
  mutation addPost($post: PostInput) {
    post: addPost(post: $post) {
      id
    }
  }
`;
