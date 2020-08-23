const db = require("../../dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove,
  findByRankId,
  findArticles,
};

function find() {
  return db("articles as a")
    .select(
      "id",
      "title",
      "description",
      "link",
      "category_id"
      // "user_id as user_id",
      // "rank_id as rank_id"
    )
    .orderBy("id");
}
function findArticles() {
  return db("users as u")
    .join("articles as a", "u.id", "a.user_id")
    .join("categories as c", "c.id", "a.category_id")
    .select(
      "a.id as article_id",
      "u.id as user_id",
      "u.username",
      "a.title",
      "a.description",
      "a.link",
      "c.category_name",
      "a.category_id",
      "a.rank_id"
    );
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
