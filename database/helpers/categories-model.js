const db = require("../../dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove,
};

function find() {
  return db("categories").select("id", "category_name").orderBy("id");
}

function findBy(filter) {
  return db("categories").where(filter).orderBy("id");
}

function add(category) {
  return db("categories")
    .insert(category)
    .then((ids) => {
      return findById(ids[0]);
    });
}

function findById(id) {
  return db("categories").where({ id }).first();
}
function update(id, changes) {
  return db("categories")
    .where({ id })
    .update(changes)
    .then((count) => (count > 0 ? findById(id) : null));
}
function remove(id) {
  return db("categories")
    .where("id", id)
    .del()
    .then((delRow) => (delRow > 0 ? id : null));
}
