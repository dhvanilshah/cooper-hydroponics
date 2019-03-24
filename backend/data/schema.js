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
    pumpSchedule: [Schedule]
    lightSchedule: [Schedule]
    sensors: String
    mounted: String
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

  input ScheduleIn {
    action: String
    time: String
    value: Float
  }

  type Query {
    dummy: String
  }

  type Mutation {
    create(name: String!): System
    recordTemp(value: Float!): String
    recordTDS(value: Float!): String
    recordReadings(waterTemp: Float, tds: Float, waterLevel: Int): String
  }
`;

module.exports = typeDefs;
