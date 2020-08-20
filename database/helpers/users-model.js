const db = require("../../dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
  findUserArticles,
  update,
  remove,
  findUserArticle,
  sortUserArticlesByRank,
  getUserArticlesByRank,
};

function find() {
  return db("users").select("id", "username", "password").orderBy("id");
}

function findBy(filter) {
  return db("users").where(filter).orderBy("id");
}

function findUserArticles(id) {
  return db("users as u")
    .join("articles as a", "u.id", "a.user_id")
    .join("categories as c", "c.id", "a.category_id")
    .select(
      "a.id as article_id",
      "u.id as user_id",
      "a.title",
      "a.description",
      "a.link",
      "c.category_name",
      "a.category_id",
      "a.rank_id"
    )
    .where("a.user_id", id);
}
function sortUserArticlesByRank(id) {
  return db("users as u")
    .join("articles as a", "u.id", "a.user_id")
    .join("categories as c", "c.id", "a.category_id")
    .select(
      "a.rank_id as rank",
      "u.id as user_id",
      "a.id as article_id",

      "a.title",
      "a.description",
      "a.link",
      "c.category_name",
      "a.category_id"
    )
    .where("a.user_id", id)
    .orderBy("rank_id");
}
function getUserArticlesByRank(id, rankID) {
  return db("users as u")
    .join("articles as a", "u.id", "a.user_id")
    .join("categories as c", "c.id", "a.category_id")
    .select(
      "a.rank_id as rank",
      "u.id as user_id",
      "a.id as article_id",
      "a.title",
      "a.description",
      "a.link",
      "c.category_name",
      "a.category_id"
    )
    .where("a.user_id", id)
    .where("a.rank_id", rankID);
}
function findUserArticle(id, articleID) {
  return db("users as u")
    .join("articles as a", "u.id", "a.user_id")
    .join("categories as c", "c.id", "a.category_id")
    .select(
      "a.id as article_id",
      "u.id as user_id",
      "a.title",
      "a.description",
      "a.link",
      "c.category_name",
      "a.category_id",
      "a.rank_id"
    )
    .where("a.user_id", id)
    .where("a.id", articleID);
}
function findById(id) {
  return db("users")
    .where({ id })
    .first()
    .select("id", "username", "name", "email", "role");
}

async function add(user) {
  try {
    const [id] = await db("users").insert(user, "id");

    return findById(id);
  } catch (error) {
    throw error;
  }
}
function update(id, changes) {
  return db("users")
    .where({ id })
    .update(changes)
    .then((count) => (count > 0 ? findById(id) : null));
}
function remove(id) {
  console.log("i am here");
  return db("users")
    .where("id", id)
    .del()
    .then((delRow) => (delRow > 0 ? id : null));
}
