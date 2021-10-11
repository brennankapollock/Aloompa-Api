// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.

const data = require("./db.json");

const resolvers = {
  Query: {
    apps: () => data.apps,
    stages: () => data.stages,
    events: () => data.events,
    stage(parent, args, context, info) {
      return data.stages.find((stage) => stage.id === args.id);
    },
    app(parent, args, context, info) {
      return data.apps.find((app) => app.id === args.id);
    },
    event(parent, args, context, info) {
      return data.events.find((event) => event.id === args.id);
    },
    stageViaName(parent, args, context, info) {
      return data.stages.find((stage) => stage.name === args.name);
    },
    eventViaName(parent, args, context, info) {
      return data.events.find((event) => event.name === args.name);
    },
    allEventsViaStage(parent, args, context, info) {
      return data.events.filter((event) => event.stageId === args.id);
    },
    stageViaEvent(parent, args, context, info) {
      return data.stages.find((stage) => stage.id === args.id);
    },
    eventsViaTime(parent, args, context, info) {
      return data.events.filter(
        (event) =>
          event.startsAt >= parseInt(args.startsAt) &&
          event.endsAt <= parseInt(args.endsAt)
      );
    },
  },
};

module.exports = resolvers;
