const bcrypt = require("bcryptjs");
exports.seed = function (knex) {
  return knex("users").insert([
    {
      username: "user1",
      name: "John Doe",
      email: "john@gmail.com",
      password: bcrypt.hashSync("qwerty", 8),
      role: 2,
    },
    {
      username: "user2",
      name: "Jane Cimegra",
      email: "jane@gmail.com",
      password: bcrypt.hashSync("qwerty", 8),
      role: 2,
    },
    {
      username: "user3",
      name: "Robbin Wilson",
      email: "robbin@gmail.com",
      password: bcrypt.hashSync("qwerty", 8),
      role: 2,
    },
    {
      username: "user4",
      name: "Jack Dirreban",
      email: "jack@gmail.com",
      password: bcrypt.hashSync("qwerty", 8),
      role: 1,
    },
  ]);
};
