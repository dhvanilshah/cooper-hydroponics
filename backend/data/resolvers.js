const resolvers = {
  Query: {
    dummy: (root, {}, { models, system }) => {
      return system;
    }
  },
  Mutation: {
    // --------------------------------------------------------------------------------------------
    // CREATE A SYSTEM
    // --------------------------------------------------------------------------------------------
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
    },
    // --------------------------------------------------------------------------------------------
    // RECORD A TEMPERATURE READING
    // --------------------------------------------------------------------------------------------
    recordTemp: async (root, { value }, { models, system }) => {
      const sys = await models.System.findOne({ _id: system });
      if (!sys) {
        throw new Error("Unable to record temperature. Could not find system");
      }

      const reading = await models.Temperature.create({
        system: sys._id,
        value
      });

      if (!reading) {
        throw new Error("Unable to record temperature.");
      }

      return "Success";
    },
    // --------------------------------------------------------------------------------------------
    // RECORD A TDS READING
    // --------------------------------------------------------------------------------------------
    recordTDS: async (root, { value }, { models, system }) => {
      const sys = await models.System.findOne({ _id: system });
      if (!sys) {
        throw new Error("Unable to record temperature. Could not find system");
      }

      const reading = await models.TDS.create({
        system: sys._id,
        value
      });

      if (!reading) {
        throw new Error("Unable to record temperature.");
      }

      return "Success";
    },
    // --------------------------------------------------------------------------------------------
    // RECORD SENSOR READINGS
    // --------------------------------------------------------------------------------------------
    recordReadings: async (
      root,
      { waterTemp, tds, waterLevel },
      { models, system }
    ) => {
      const sys = await models.System.findOne({ _id: system });
      if (!sys) {
        throw new Error("Unable to record readings. Could not find system");
      }
      // UPDATE SYSTEM WITH CURRENT READINGS
      await sys.update({ waterTemp, tds, waterLevel });
      // RECORD WATER TEMPERATURE
      const tempReading = await models.Temperature.create({
        system: sys._id,
        value: waterTemp
      });
      if (!tempReading) {
        throw new Error("Unable to record temperature.");
      }

      // RECORD TDS
      const tdsReading = await models.TDS.create({
        system: sys._id,
        value: tds
      });
      if (!tdsReading) {
        throw new Error("Unable to record TDS.");
      }

      return "Success";
    }
    // --------------------------------------------------------------------------------------------
    // END
    // --------------------------------------------------------------------------------------------
  }
};

module.exports = resolvers;
