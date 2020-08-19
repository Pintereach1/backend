const Users = require("../../database/helpers/users-model");
const Articles = require("../../database/helpers/articles-model");
module.exports = {
  validateUserId,
  validateArticleId,
  validateArticle,
};

//-------------------custom middlewares------------------------
//------------------USER---------------------------------------
function validateUserId(req, res, next) {
  const { id } = req.params;
  Users.findById(id)
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "failed", err });
    });
}
//------------------ARTICLE---------------------------------------
function validateArticleId(req, res, next) {
  const { articleID } = req.params;
  console.log("articleID", articleID);
  Articles.findById(articleID)
    .then((article) => {
      if (article && article.user_id === req.decodedJwt.subject) {
        req.article = article;
        next();
      } else {
        res.status(400).json({ message: "invalid user article id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "failed", err });
    });
}
function validateArticle(req, res, next) {
  if (!isEmpty(req.body)) {
    if (
      !req.body.description ||
      !req.body.title ||
      !req.body.link ||
      !req.body.category_id ||
      !req.body.rank_id
    ) {
      res.statusMessage = "missing required fields";
      res.status(400).json({ message: "missing required fields" });
    } else {
      req.article = {
        ...req.body,
        user_id: req.user.id,
      };
      next();
    }
  } else {
    res.statusMessage = "missing article data";
    res.status(400).json({ message: "missing article data" });
  }
}
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
