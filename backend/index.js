const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const path = require("path"); //changed from var
const mongoose = require("mongoose");
const typeDefs = require("./data/schema");
const resolvers = require("./data/resolvers");
const models = require("./data/models");

require("dotenv").config();

const environment = process.env.NODE_ENV;
const secret = process.env.SECRET;
const db = process.env.DB;
var port = process.env.PORT;

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(
    () => {
      console.log("Database is connected");
    },
    err => {
      console.log("Can not connect to the database" + err);
    }
  );

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models, secret }
});

const app = express();

server.applyMiddleware({ app, path: "/api" });

app.listen(port, () => console.log(`🚀 Server ready ${server.graphqlPath}`));

// if (environment === "production") {
//   app.use(express.static(path.join(__dirname, "/../frontend/build")));
//   app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, "/../frontend/build", "index.html"));
//   });
// }
