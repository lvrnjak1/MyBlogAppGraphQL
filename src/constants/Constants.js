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
        user {
          username
          email
        }
        posts {
          id
          title
          body
          dateTimePosted
          likes {
            id
            account {
              id
              name
              surname
            }
          }
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
  }
`;

export const REGISTER_MUTATION = gql`
  mutation register($AccountInput: AccountInput) {
    createAccount(account: $AccountInput) {
      id
      name
      surname
      bio
      user {
        username
        email
      }
      posts {
        id
        title
        body
        dateTimePosted
        likes {
          id
          account {
            id
            name
            surname
          }
        }
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
