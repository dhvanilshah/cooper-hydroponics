import gql from "graphql-tag";

const GETFARMS = gql`
  query getFarms {
    getFarms {
      _id
      name
    }
  }
`;

export { GETFARMS };
