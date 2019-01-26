const resolvers = {
  Query: {
    dummy: root => {
      return "Hello World";
    }
  },
  Mutation: {
    create: async (root, { name, pumpSchedule, lightSchedule }, { models }) => {
      const newSystem = await models.System.create({
        name
        // pumpSchedule: Date.now(),
        // lightSchedule: Date.now()
      });

      if (!newSystem) {
        throw new Error("Unable to create system.");
      }

      return newSystem;
    }
  }
};

module.exports = resolvers;
