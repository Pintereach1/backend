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
//async function remove(id) {
// const totalDeleted = await db("users as u")
//   .join("articles as a", "u.id", "a.user_id")
//   //.join("article_categories as ac", "a.id", "ac.article_id")
//   .where("u.id", id)
//   .del();
// return totalDeleted;
// const deletedArticle_Categories = await db("article_categories as ac").join("articles as a", "" ).where("user_id", id).del();

// const deletedUserArticle_Categories = await db("article_category as ac")
//   .join("articles as a", "ac.article_id", "a.id")
//   .join("users as u", "u.id", "ac.article_id")

//   .where("user_id", id)
//   .del();
//  const deletedUserArticles = await db("articles").where("user_id", id).del();
// const deletedUser = await db("users").where("id", id).del();
// return deletedUser;
// return db("users")
// .join("articles as a",)
//   .where("id", id)
//   .del()
//   .then((deleted) => db("articles").where("user_id", id).del())
//   .then((delRow) => (delRow > 0 ? id : null));
//}

function findById(id) {
  return db("users").where({ id }).first();
}
