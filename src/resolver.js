// these resolvers define the technique for fetching the types defined in the schema.

const data = require("./db.json");
const { userInputError } = require("apollo-server");
const { v4: uuidv4 } = require("uuid");

const resolvers = {
  Query: {
    apps: () => data.apps,
    stages: () => data.stages,
    events: () => data.events,
    stage(args) {
      return data.stages.find((stage) => stage.id === args.id);
    },
    app(args) {
      return data.apps.find((app) => app.id === args.id);
    },
    event(args) {
      return data.events.find((event) => event.id === args.id);
    },
    stageViaName(args) {
      return data.stages.find((stage) => stage.name === args.name);
    },
    eventViaName(args) {
      return data.events.find((event) => event.name === args.name);
    },
    allEventsViaStage(args) {
      return data.events.filter((event) => event.stageId === args.id);
    },
    stageViaEvent(args) {
      return data.stages.find((stage) => stage.id === args.id);
    },
    eventsViaTime(args) {
      return data.events.filter(
        (event) =>
          event.startsAt >= parseInt(args.startsAt) &&
          event.endsAt <= parseInt(args.endsAt)
      );
    },
  },
  Mutation: {
    addStage(args) {
      let newStage = { id: uuidv4(), name: args.name };
      data.stages.push(newStage);
      return newStage;
    },
    addEvent(args) {
      let newEvent = {
        id: uuidv4(),
        appId: uuidv4(),
        stageId: uuidv4(),
        name: args.name,
        description: args.description,
        image: args.image,
        startsAt: args.startsAt,
        endsAt: args.endsAt,
      };
      data.events.push(newEvent);
      return newEvent;
    },

    updateStage(args) {
      let foundStage = data.stages.find((stage) => stage.id === args.id);
      foundStage.name = args.name;
      return foundStage;
    },

    updateEvent(parent, args, context, info) {
      let foundEvent = data.events.find((event) => event.id === args.id);
      if (args.appId) {
        foundEvent.appId = args.appId;
      }
      if (args.stageId) {
        foundEvent.stageId = args.stageId;
      }
      if (args.name) {
        foundEvent.name = args.name;
      }
      if (args.description) {
        foundEvent.description = args.description;
      }
      if (args.image) {
        foundEvent.image = args.image;
      }
      if (args.startsAt) {
        foundEvent.startsAt = args.startsAt;
      }
      if (args.endsAt) {
        foundEvent.endsAt = args.endsAt;
      }
      return foundEvent;
    },

    deleteStage(args) {
      let foundStage = data.stages.findIndex((stage) => stage.id === args.id);
      data.apps.splice(foundStage, 1);
      return `You successfully deleted the stage!`;
    },
    deleteEvent(args) {
      let foundEvent = data.events.findIndex((event) => event.id === args.id);
      data.apps.splice(foundEvent, 1);
      return `You successfully deleted the event!`;
    },
  },
};

module.exports = resolvers;
