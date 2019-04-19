const jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var _ = require("lodash");
const utils = require("./utils");
const saltRounds = 10;

const resolvers = {
  Query: {
    hello: async (root, {}, { models, secret, authToken }) => {
      return "WORLD";
    },
    getFarms: async (root, {}, { models, secret, authToken }) => {
      const user = await utils.verifyUserToken(authToken, secret);
      if (!user) throw new Error("invalid token");

      if (user._farms.length == 0) {
        throw new Error("The user has no farms");
      }

      const farms = user._farms.map(async id => {
        const farm = await models.Farm.findOne({ _id: id });
        if (!farm) throw new Error("Unable to find some farms. Try again");
        // console.log(farm.name);
        return { _id: farm.id, name: farm.name };
      });

      return farms;
    },
    getSystems: async (root, { farm }, { models, secret, authToken }) => {
      const user = await utils.verifyUserToken(authToken, secret);
      if (!user) throw new Error("invalid token");

      const parentFarm = await models.Farm.findOne({ _id: farm });

      if (!parentFarm)
        throw new Error("This farm could not be found. Please refresh");
      if (parentFarm._systems.length == 0)
        throw new Error(
          "There are no systems associated with this farm. Please add a system."
        );

      const systems = parentFarm._systems.map(async systemId => {
        const system = await models.System.findOne({ _id: systemId });
        // throw new Error("This farm has deprecated or deleted systems. Could not resolve issue.");
        return system;
      });

      return systems;
    },
    recordReadings: async (
      root,
      { temp, tds, wl },
      { models, systemToken }
    ) => {
      const system = await models.System.findOne({ _id: systemToken });
      if (!system) return false;

      // const tempA = parseFloat(temp);
      // const tdsA = parseFloat(tds);
      const wlA = wl == 1 ? true : false;

      if (system.mounted == false) {
        await system.updateOne({ mounted: true });
      }

      await system.updateOne({
        waterTemp: temp,
        waterLevel: wlA,
        tds: tds,
        lastReading: new Date()
      });

      const tempRecord = await models.Temperature.create({
        value: temp,
        _systemId: system._id
      });

      const tdsRecord = await models.TDS.create({
        value: tds,
        _systemId: system._id
      });

      if (!tempRecord) {
        return false;
      }

      if (!tdsRecord) {
        return false;
      }

      return true;
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
    },
    // SIGNUP
    signup: async (
      root,
      { firstName, lastName, email, password, role },
      { models, secret }
    ) => {
      const user = await models.User.findOne({ email: email });
      if (user) {
        throw new Error("This user email is taken.");
      }

      if (!role) {
        role = "user";
      }
      const hashword = await bcrypt.hash(password, saltRounds);
      const newUser = await models.User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashword,
        role: role,
        date: new Date()
      });

      if (!newUser) {
        throw new Error("Unable to create user.");
      }

      const token = jwt.sign({ userId: newUser.id }, secret);

      return token;
    },
    // SIGN IN
    signin: async (root, { email, password }, { models, secret }) => {
      const user = await models.User.findOne({ email: email });

      if (!user) {
        throw new Error("This user email or password is incorrect.");
      }
      const passwordIsValid = await bcrypt.compare(password, user.password);
      if (!passwordIsValid) {
        throw new Error("This user email or password is incorrect.");
      }
      const token = jwt.sign({ userId: user.id }, secret);
      return token;
    },
    createFarm: async (
      root,
      { name, location, zipcode, description },
      { models, secret, authToken }
    ) => {
      const user = await utils.verifyUserToken(authToken, secret);
      if (!user) throw new Error("invalid token");

      const newFarm = await models.Farm.create({
        name,
        location,
        zipcode,
        description,
        _creatorId: user.id,
        _members: [user.id],
        _admins: [user.id]
      });

      if (!newFarm) throw new Error("This farm could not be created.");

      await user.updateOne({ $push: { _farms: newFarm._id } });

      return "Success";
    },
    createSystem: async (
      root,
      { name, produce, farm },
      { models, secret, authToken }
    ) => {
      const user = await utils.verifyUserToken(authToken, secret);
      if (!user) throw new Error("invalid token");

      const parentFarm = await models.Farm.findOne({ _id: farm });

      if (!parentFarm)
        throw new Error(
          "This system could not associated to a farm. Please refresh"
        );

      const newSystem = await models.System.create({
        name,
        produce,
        farm: parentFarm._id
      });

      if (!newSystem) throw new Error("This system could not be created.");

      await parentFarm.updateOne({ $push: { _systems: newSystem._id } });

      return newSystem.id;
    }
  }
};

module.exports = resolvers;
