const server = require("../api/server.js");
const request = require("supertest");
const bcryptjs = require("bcryptjs");
const router = require("express").Router();
const db = require("../dbConfig");
const secrets = require("../config/secrets.js");
const Users = require("../database/helpers/users-model.js");
describe("auth-router.js", () => {
  //--------------register-------------------
  describe("POST api/auth/register", () => {
    const user = {
      username: "john",
      password: "qwerty",
      name: "Aaron",
      email: "aaron@gmail.com",
      role: 1,
    };
    let res = {};
    beforeEach(async () => {
      await db("users").truncate();
      res = await request(server).post("/api/auth/register").send(user);
    });
    it("should return 201 OK", async () => {
      expect(res.status).toBe(201);
      //sanity test
      //expect(res.status).toBe(401);
    });

    it("should add a new user", async () => {
      const insertedUser = await db("users")
        .where({ username: user.username })
        .first();
      expect(res.body.data.username).toEqual(insertedUser.username);
    });
    it("should create hash", async () => {
      const insertedUser = await db("users")
        .where({ username: user.username })
        .first();
      const received = bcryptjs.compareSync(
        user.password,
        insertedUser.password
      );
      expect(received).toEqual(true);
    });
  });

  //--------------login-------------------
  describe("POST api/auth/login", () => {
    const user = {
      username: "john",
      password: "qwerty",
      name: "Aaron",
      email: "aaron@gmail.com",
      role: 1,
    };
    let res = {};
    beforeEach(async () => {
      await db("users").truncate();
      await request(server).post("/api/auth/register").send(user);
      res = await request(server).post("/api/auth/login").send(user);
    });
    it("should return 200 if successfully logged in", async () => {
      expect(res.status).toBe(200);
    });
    it("should return token to user", async () => {
      expect(res.jwt_token).not.toBe("");
    });
  });
});
