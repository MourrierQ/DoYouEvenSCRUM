import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import cors from "cors";

const setGlobalMiddleware = app => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(addUserToReq);
  app.use(cors("*"));
};
const SECRET = "guyguyufytfoij";
const addUserToReq = async (req, res) => {
  // req.headers.authorization =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoidGVzdHN0c3RzIiwiaWQiOiI1YWFmYWNhODZhYzU2YTJhZWM3MGIyMTYifSwiaWF0IjoxNTIxNDY4NzkxLCJleHAiOjE1NTMwMjYzOTF9.6grelS0o0ZdaD8x8gW4SwJucvgEQ3i5X1DdLNGCyw7c";
  const token = req.headers.authorization;
  try {
    const { user } = await jwt.verify(token, SECRET);
    req.user = user;
  } catch (err) {
    console.log(err);
  }
  req.next();
};

export default setGlobalMiddleware;
