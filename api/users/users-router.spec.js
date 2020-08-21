require("dotenv").config();
const server = require("../server.js");
const request = require("supertest");
const db = require("../../dbConfig");

describe("users-router.js", () => {
  const user = {
    username: "aaron",
    password: "qwerty",
    name: "Aaron",
    email: "aaron@gmail.com",
    role: 2,
  };
  const updatedUser = {
    username: "aaron1",
    password: "qwerty1",
    name: "Aaron1",
    email: "aaron1@gmail.com",
    role: 2,
  };
  const article = {
    title: "The New Power Article user-router",
    description: "How to Build Article created by user2",
    link: "https://www.nature.com/articles/s41586-020-2665-2",
    category_id: 3,
    user_id: 1,
    rank_id: 4,
  };

  let reg = {};
  let login = {};
  beforeEach(async () => {
    await db("users").truncate();
    reg = await request(server).post("/api/auth/register").send(user);
    login = await request(server).post("/api/auth/login").send(user);
  });
  describe("GET api/users/:id", () => {
    it("should return 200 OK", async () => {
      const resUsers = await request(server)
        .get("/api/users/1")
        .set("authorization", login.body.jwt_token);

      //sanity test:
      //expect(res.status).toBe(400);
      expect(resUsers.status).toBe(200);
    });
  });
  describe("PUT api/users/:id", () => {
    it("should return 200 OK", async () => {
      const resUsers = await request(server)
        .put("/api/users/1")
        .send(updatedUser)
        .set("authorization", login.body.jwt_token);
      expect(resUsers.status).toBe(200);
      expect(resUsers.body.username).toBe("aaron1");
    });
  });
  describe("POST api/users/:id/articles", () => {
    it("should return 201 OK", async () => {
      const resArticles = await request(server)
        .post("/api/users/1/articles")
        .send(article)
        .set("authorization", login.body.jwt_token);
      expect(resArticles.status).toBe(201);
      expect(resArticles.body.title).toBe("The New Power Article user-router");
    });
  });
});
