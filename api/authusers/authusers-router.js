const router = require("express").Router();
const Categories = require("../../database/helpers/categories-model.js");
const Articles = require("../../database/helpers/articles-model.js");
const Ranks = require("../../database/helpers/ranks-model.js");
const Users = require("../../database/helpers/admin-model");

//---------------GET ALL ARTICLES-----------------------------

router.get("/articles", (req, res) => {
  Articles.find()
    .then((articles) => {
      res.status(200).json(articles);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the articles",
      });
    });
});
//---------------GET ALL RANKS-----------------------------
router.get("/ranks", (req, res) => {
  Ranks.find()
    .then((ranks) => {
      res.status(200).json(ranks);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the ranks",
      });
    });
});
//----------------CATEGORIES----------------------------------
//---------------GET CATEGORIES-----------------------------
router.get("/categories", (req, res) => {
  Categories.find()
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the categories",
      });
    });
});

module.exports = router;
