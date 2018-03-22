import { makeExecutableSchema } from "graphql-tools";
import { userType, userResolvers } from "./resources/user";
import { projectType, projectResolvers } from "./resources/project";
// import { songType, songResolvers } from "./resources/song";
// import { playlistType, playlistResolvers } from "./resources/playlist";
import merge from "lodash.merge";
import { graphqlExpress } from "apollo-server-express";

const baseSchema = `
  schema {
    query: Query
    mutation: Mutation
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [baseSchema, userType, projectType],
  resolvers: merge({}, userResolvers, projectResolvers)
});

export const graphQLRouter = graphqlExpress(req => ({
  schema,
  context: {
    SECRET: "guyguyufytfoij",
    req,
    user: req.user
  }
}));
