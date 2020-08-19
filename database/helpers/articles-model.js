const db = require("../../dbConfig.js");

module.exports = {
  // add,
  find,
  // findBy,
  //findById,
};

// function find() {
//   return db("articles").select("id", "username", "password").orderBy("id");
// }
function find() {
  return db("articles")
    .select(
      "id",
      "title",
      "description",
      "link"
      //   "source",
      //   "user_id as user_id",
      //   "rank_id as rank_id"
    )
    .orderBy("id");
}

// function findBy(filter) {
//   return db("users").where(filter).orderBy("id");
// }

// async function add(user) {
//   try {
//     const [id] = await db("users").insert(user, "id");

//     return findById(id);
//   } catch (error) {
//     throw error;
//   }
// }

// function findById(id) {
//   return db("users").where({ id }).first();
// }
