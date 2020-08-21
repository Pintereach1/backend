const db = require("../../dbConfig");

const Users = require("./users-model.js");

describe("users model", () => {
  const user1 = {
    username: "aaron",
    password: "qwerty",
    name: "Aaron",
    email: "aaron@gmail.com",
    role: 1,
  };
  const user2 = {
    username: "mary",
    password: "qwerty",
    name: "Mary",
    email: "mary@gmail.com",
    role: 2,
  };
  beforeEach(async () => {
    await db("users").truncate();
  });
  describe("add()", () => {
    it("should insert a new user into the db", async () => {
      await Users.add(user1);
      await Users.add(user2);

      const users = await db("users");

      expect(users).toHaveLength(2);
    });
  });
  describe("findById(id)", () => {
    it("should find user by id", async () => {
      await Users.add(user2);
      const user = await Users.findById(1);

      expect(user.username).toBe("mary");
    });
  });
  describe("update", () => {
    it("should update the user by id", async () => {
      const user = {
        username: "jack",
        password: "qwerty",
        name: "Jack",
        email: "jack@gmail.com",
        role: 2,
      };
      const updatedUser = {
        username: "jack1",
        password: "qwerty1",
        name: "Jack1",
        email: "jack1@gmail.com",
        role: 2,
      };
      await Users.add(user);
      await Users.update(1, updatedUser);
      const jackUser = await Users.findById(1);

      expect(jackUser.username).toBe("jack1");
    });
  });
});
