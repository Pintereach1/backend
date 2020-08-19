const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");
const authenticate = require("../auth/authenticate-middleware.js");
const authRouter = require("../auth/auth-router.js");
const articlesRouter = require("./articles/articles-router.js");
const usersRouter = require("./users/users-router.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/users", authenticate, usersRouter);
server.use("/api/articles", authenticate, articlesRouter);

server.get("/", (req, res) => {
  res.status(200).send(`<h2>Welcome to the Lambda Pintereach Project API</h2>`);
});

module.exports = server;
