const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000;
const uri = process.env.MONGODB_URI;

app.use(cors());

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Cluster has been connected");
});

app.use(
  "/",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
