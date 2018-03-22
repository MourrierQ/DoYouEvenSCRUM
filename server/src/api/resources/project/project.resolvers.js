import { Project } from "./project.model";

//Queries
const getAllProjectsByOwner = (parentValue, __, { user }) => {
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
    getAllProjectsByOwner
  },
  Mutation: {
    createProject
  },

  Project: {
    async owner(project) {
      const populated = await project.populate("owner").execPopulate();

      return populated.owner;
    }
  }
};
