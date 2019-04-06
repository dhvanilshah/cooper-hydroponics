const jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var _ = require("lodash");
const utils = require("./utils");
const saltRounds = 10;

const resolvers = {
  Query: {
    getFarms: async (root, {}, { models, secret, authToken }) => {
      const user = await utils.verifyUserToken(authToken, secret);
      if (!user) throw new Error("invalid token");

      if (user._farms.length == 0) {
        return null;
      }

      const farms = user._farms.map(async id => {
        console.log(id);
        const farm = await models.Farm.findOne({ _id: id });
        if (!farm) throw new Error("Unable to find some farms. Try again");
        // console.log(farm.name);
        return { _id: farm.id, name: farm.name };
      });

      return farms;
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

      await user.updateO({ $push: { _farms: newFarm.id } });

      return "Success";
    }
  }
};

module.exports = resolvers;
