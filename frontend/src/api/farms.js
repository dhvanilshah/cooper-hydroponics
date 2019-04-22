import gql from "graphql-tag";

const GETFARMS = gql`
  query getFarms {
    getFarms {
      _id
      name
    }
  }
`;

const GETSYSTEMS = gql`
  query getSystems($farm: String!) {
    getSystems(farm: $farm) {
      name
      _id
      produce
      lastHarvest
      waterLevel
      waterTemp
      tds
      pumpStatus
      lightStatus
      lastReading
      mounted
    }
  }
`;

const ADDSYSTEM = gql`
  mutation createSystem($name: String!, $produce: [String], $farm: String!) {
    createSystem(name: $name, produce: $produce, farm: $farm)
  }
`;

const ADDFARM = gql`
  mutation createFarm(
    $name: String!
    $location: String!
    $zipcode: Int!
    $description: String!
  ) {
    createFarm(
      name: $name
      location: $location
      zipcode: $zipcode
      description: $description
    )
  }
`;

export { GETFARMS, GETSYSTEMS, ADDSYSTEM, ADDFARM };
