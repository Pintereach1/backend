const router = require("express").Router();

const Articles = require("../../database/helpers/articles-model.js");
const checkUser = require("../../auth/check-user-middleware.js");
const checkRole = require("../../auth/check-role-middleware.js");

router.get("/", checkRole(2), (req, res) => {
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

module.exports = router;
