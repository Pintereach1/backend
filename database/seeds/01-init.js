exports.seed = function (knex) {
  const roles = [
    {
      role: 1,
      //role: "admin", // will get id 1
    },
    {
      role: 2,
      //role: "user", // will get id 2
    },
  ];

  return knex("roles")
    .insert(roles)
    .then(() => console.log("\n== Seed data for roles table added. ==\n"));
};
