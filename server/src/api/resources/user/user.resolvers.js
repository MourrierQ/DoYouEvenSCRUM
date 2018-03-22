import { User } from "./user.model";
import merge from "lodash.merge";
import jwt from "jsonwebtoken";
import config from "../../../config";

//Queries
const getMe = (_, __, { user }) => {
  if (user) {
    return user;
  }
  return null;
};

const allUsers = (_, __, context) => {
  console.log(context);
  return User.find({}).exec();
};

//Mutations
const updateMe = (_, { input }, { user }) => {
  merge(user, input);
  return user.save();
};

const register = async (_, { username, email, password }, ___) => {
  const user = new User({
    username: username,
    email: email,
    passwordHash: password
  });

  return await user.save();
};

const login = async (_, { email, password }, { req, user, SECRET }) => {
  const currentUser = await User.findOne({ email }).exec();
  console.log(email);
  if (!currentUser) {
    throw new Error("No user with that email");
  }

  const valid = await currentUser.authenticate(password);
  if (!valid) {
    throw new Error("Invalid password !");
  }

  const token = jwt.sign(
    {
      user: {
        username: currentUser.username,
        id: currentUser.id
      }
    },
    SECRET,
    {
      expiresIn: "1Y"
    }
  );

  req.headers.authorization = token;
  user = currentUser;
  console.log(user);
  return token;
};

export const userResolvers = {
  Query: {
    getMe,
    allUsers
  },
  Mutation: {
    updateMe,
    register,
    login
  },

  User: {}
};
