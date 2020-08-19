exports.seed = function (knex) {
  return knex("categories").insert([
    { category_name: "Research" },
    { category_name: "Hypotheses" },
    { category_name: "Commentaries" },
    { category_name: "Psychology" },
  ]);
};
