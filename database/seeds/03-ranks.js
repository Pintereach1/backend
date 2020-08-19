exports.seed = function (knex) {
  const ranks = [
    {
      rank: 1, // will get id 1
    },
    {
      rank: 2, // will get id 2
    },
    {
      rank: 3, // will get id 3
    },
    {
      rank: 4, // will get id 4
    },
  ];

  return knex("ranks").insert(ranks);
  //.then(() => console.log("\n== Seed data for roles table added. ==\n"));
};
