const router = require("express").Router();
const Articles = require("../../database/helpers/articles-model.js");
const checkUser = require("../../auth/check-user-middleware.js");

//----------------ARTICLES-------------------------
//---------------GET-----------------------------
router.get("/", (req, res) => {
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
//-----------------------PUT-------------------------
router.put(
  "/:id",

  validateArticleId,

  (req, res) => {
    const { id } = req.params;
    Articles.update(req.article.id, req.body)
      .then((article) => {
        if (article) {
          res.status(200).json(article);
        } else {
          req
            .status(500)
            .json({ message: "An error occured during getting article" });
        }
      })

      .catch((error) => {
        res.statusMessage = "Error updating the article";
        console.log(error);
        res.status(500).json({
          message: "Error updating the article",
        });
      });
  }
);
//-----------------------DELETE-------------------------
router.delete("/:id", validateArticleId, (req, res) => {
  Articles.remove(req.article.id)
    .then((article) => {
      res.status(200).json(article);
    })

    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error removing the article",
      });
    });
});
//--------------custom middlewares------------------
function validateArticleId(req, res, next) {
  const { id } = req.params;

  Articles.findById(id)
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

module.exports = router;
