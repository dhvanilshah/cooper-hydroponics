const { gql } = require("apollo-server-express");
const typeDefs = gql`
  type Schedule {
    action: String
    time: String
    value: Float
  }

  type System {
    _id: String
    name: String
    mounted: Boolean
    waterTemp: Float
    tds: Float
    waterLevel: Boolean
    pumpStatus: Boolean
    lightStatus: Boolean
    lastReading: String
    lastHarvest: String
    produce: [String]
    dateCreated: String
  }

  type Reading {
    _id: String
    unit: String
    value: Float
    _systemId: String
    dateCreated: String
  }

  type Harvest {
    _id: String
    unit: String
    amount: Float
    amountUseful: Float
    _systemId: String
    dateCreated: String
    dateHarvested: String
  }

  type User {
    _id: String
    firstName: String
    lastName: String
    email: String
    password: String
    role: String
    dateCreated: String
    _farms: [String]
  }

  type Farms {
    _id: String
    name: String
    description: String
  }

  input ScheduleIn {
    action: String
    time: String
    value: Float
  }

  type Query {
    hello: String
    getFarms: [Farms]
    getSystems(farm: String!): [System]
    recordReadings(temp: Float, tds: Float, wl: Int): Boolean
  }

  type Mutation {
    create(name: String!): System
    signup(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      role: String
    ): String
    signin(email: String!, password: String!): String
    createFarm(
      name: String!
      location: String!
      zipcode: Int!
      description: String!
    ): String
    createSystem(name: String!, produce: [String], farm: String): String
  }
`;

module.exports = typeDefs;
