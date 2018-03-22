import express from "express";
import setupMiddware from "./middleware";
import { graphQLRouter } from "./api";
import { graphiqlExpress } from "apollo-server-express";
import { connect } from "./db";
import mongoose from "mongoose";
//import { signin, protect } from "./api/modules/auth";
// Declare an app from express
const app = express();

setupMiddware(app);
connect();

mongoose.connection
  .once("open", () => console.log("Connected to MongoLab instance."))
  .on("error", error => console.log("Error connecting to MongoLab:", error));

// setup basic routing for index route

app.use("/graphql", graphQLRouter);
app.use("/docs", graphiqlExpress({ endpointURL: "/graphql" }));

// catch all
app.all("*", (req, res) => {
  res.json({ ok: true });
});

export default app;
