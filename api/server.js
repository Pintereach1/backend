const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");
const authenticate = require("../auth/authenticate-middleware.js");
const authRouter = require("../auth/auth-router.js");
const articlesRouter = require("./articles/articles-router.js");
const usersRouter = require("./users/users-router.js");
const categoriesRouter = require("./categories/categories-router.js");
const adminRouter = require("./admin/admin-router.js");
const ranksRouter = require("./ranks/ranks-router.js");
const authusersRouter = require("./authusers/authusers-router.js");
const checkRole = require("../auth/check-role-middleware");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/authusers", authenticate, authusersRouter);
server.use("/api/admin", authenticate, checkRole(1), adminRouter);
server.use("/api/users", authenticate, checkRole(2), usersRouter);
server.use("/api/categories", authenticate, categoriesRouter);
server.use("/api/articles", authenticate, checkRole(2), articlesRouter);
server.use("/api/ranks", authenticate, checkRole(2), ranksRouter);

server.get("/", (req, res) => {
  res
    .status(200)
    .send(`<h2>Welcome to the Lambda Pintereach Project API!</h2>`);
});

module.exports = server;
