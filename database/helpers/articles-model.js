const db = require("../../dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove,
  findByRankId,
};

function find() {
  return db("articles")
    .select(
      "id",
      "title",
      "description",
      "link",
      "user_id as user_id",
      "rank_id as rank_id"
    )
    .orderBy("id");
}

function findBy(filter) {
  return db("articles").where(filter).orderBy("id");
}

function add(article) {
  return db("articles")
    .insert(article)
    .then((ids) => {
      return findById(ids[0]);
    });
}

function findById(id) {
  return db("articles").where({ id }).first();
}
function findByRankId(id, rankID) {
  return db("articles").where({ user_id: id }).where({ rank_id: rankID });
}
function update(id, changes) {
  return db("articles")
    .where({ id })
    .update(changes)
    .then((count) => (count > 0 ? findById(id) : null));
}
function remove(id) {
  return db("articles")
    .where("id", id)
    .del()
    .then((delRow) => (delRow > 0 ? id : null));
}
