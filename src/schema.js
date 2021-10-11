const { gql } = require("apollo-server");

// Schema defining the "shape" of my grpah the queries will be executed against
const typeDefs = gql`
  # App Object
  type App {
    id: ID!
    name: String
  }
  # Stage Object
  type Stage {
    id: ID!
    name: String
  }
  # Event Object
  type Event {
    id: ID!
    appId: String!
    stageId: String!
    name: String!
    description: String
    image: String
    startsAt: Int!
    endsAt: Int!
  }

  # "Query" lists all of the available queries that clients can execute, along with the return type for each.
  type Query {
    apps: [App]
    stages: [Stage]
    events: [Event]
    stage(id: ID!): Stage
    app(id: ID!): App
    event(id: ID!): Event
    stageViaName(name: String!): Stage
    eventViaName(name: String!): Event
    allEventsViaStage(id: ID!): [Event]
    stageViaEvent(id: ID!): Stage
    eventsViaTime(startsAt: String!, endsAt: String!): [Event]
  }
`;

module.exports = typeDefs;
