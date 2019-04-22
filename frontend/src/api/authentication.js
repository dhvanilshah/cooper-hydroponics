// import { gql } from "apollo-boost";
import gql from "graphql-tag";

const SIGNIN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signin(email: $email, password: $password)
  }
`;

const SIGNUP = gql`
  mutation SignUp(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    signup(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    )
  }
`;

const GETUSER = gql`
  query GetUser($token: String!) {
    verifyUser(token: $token) {
      _id
      firstName
      lastName
      role
      _accountId
    }
  }
`;

export { SIGNIN, SIGNUP, GETUSER };
