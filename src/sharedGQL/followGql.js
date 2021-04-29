import { gql } from "@apollo/client";

export const FOLLOW = gql`
  mutation follow($username: String!) {
    follow(username: $username){
      ok,
      error
    }
  }
`;