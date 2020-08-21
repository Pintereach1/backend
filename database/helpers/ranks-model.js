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
  return db("ranks").select("id", "rank").orderBy("id");
}

function findBy(filter) {
  return db("ranks").where(filter).orderBy("id");
}

function add(rank) {
  return db("ranks")
    .insert(rank)
    .then((ids) => {
      return findById(ids[0]);
    });
}

function findById(id) {
  return db("ranks").where({ id }).first();
}
function update(id, changes) {
  return db("ranks")
    .where({ id })
    .update(changes)
    .then((count) => (count > 0 ? findById(id) : null));
}
function remove(id) {
  return db("ranks")
    .where("id", id)
    .del()
    .then((delRow) => (delRow > 0 ? id : null));
}
