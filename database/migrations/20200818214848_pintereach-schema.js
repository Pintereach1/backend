//------------------create tables----------------
exports.up = function (knex) {
  return (
    knex.schema
      //--------------roles----------------------
      .createTable("roles", (tbl) => {
        tbl.increments();
        tbl.integer("role").unsigned().notNullable().unique().defaultTo(2);
      })
      //---------------users--------------------
      .createTable("users", (tbl) => {
        tbl.increments();

        tbl.string("username", 128).notNullable().unique();
        tbl.string("name", 256).notNullable();
        tbl.string("email", 128).notNullable().unique();
        tbl.string("password", 256).notNullable();

        tbl
          .integer("role")
          .unsigned()
          .references("roles.id")
          .onDelete("RESTRICT")
          .onUpdate("CASCADE");
      })
      //----------------ranks----------------
      .createTable("ranks", (tbl) => {
        tbl.increments();
        tbl.integer("rank").unsigned().notNullable().unique();
      })
      //-----------------categories-----------
      .createTable("categories", (tbl) => {
        tbl.increments();
        tbl.string("category_name", 256).notNullable().unique();
      })
      //-----------------articles-----------
      .createTable("articles", (tbl) => {
        tbl.increments();
        tbl.string("title", 256).notNullable().unique();
        tbl.string("description", 256).notNullable();
        tbl.string("link", 256).notNullable();

        tbl
          .integer("rank_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("ranks")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
        tbl
          .integer("user_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("users")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
        tbl
          .integer("category_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("categories")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
      })
  );
};
//------------------drop tables----------------
exports.down = function (knex) {
  return knex.schema

    .dropTableIfExists("articles")
    .dropTableIfExists("categories")
    .dropTableIfExists("ranks")
    .dropTableIfExists("users")
    .dropTableIfExists("roles");
};
