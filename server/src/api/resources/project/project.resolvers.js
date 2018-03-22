import { Project } from "./project.model";

//Queries
const getAllProjectByOwnerId = (parentValue, __, { user }) => {
  return Project.find({ owner: user }).exec();
};

//Mutations
const createProject = (parentValue, { input }, ___) => {
  const newProject = new Project({
    title: input.title,
    owner: input.owner
  });
  return newProject.save();
};

export const projectResolvers = {
  Query: {
    getAllProjectByOwnerId
  },
  Mutation: {
    createProject
  }
};
