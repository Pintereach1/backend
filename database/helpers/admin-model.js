const db = require("../../dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
  findUserArticles,
  update,
  remove,
};

function find() {
  return db("users").select("id", "username", "name", "email").orderBy("id");
}

function findBy(filter) {
  return db("users").where(filter).orderBy("id");
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
  return db("users")
    .where("id", id)
    .del()
    .then((delRow) => (delRow > 0 ? id : null));
}

function findById(id) {
  return db("users").where({ id }).first();
}

function findUserArticles(id) {
  return db("users as u")
    .join("articles as a", "u.id", "a.user_id")
    .select("a.title", "a.description", "a.link", "a.source", "a.rank_id")
    .where("a.user_id", id);
}
