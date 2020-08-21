const router = require("express").Router();

const Users = require("../../database/helpers/users-model");
const Articles = require("../../database/helpers/articles-model");
const checkUser = require("../../auth/check-user-middleware.js");

//----------------USER-------------------------
//---------------GET USER-----------------------------
router.get("/:id", checkUser(), validateUserId, (req, res) => {
  // Users.findBy({ id: req.decodedJwt.subject })
  Users.findById(req.decodedJwt.subject)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: `Error retrieving the user with id= ${req.decodedJwt.subject}`,
      });
    });
});
//---------------UPDATE USER-----------------------------
router.put("/:id", checkUser(), validateUserId, (req, res) => {
  Users.update(req.user.id, req.body)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        req
          .status(500)
          .json({ message: "An error occured during getting user" });
      }
    })

    .catch((error) => {
      res.statusMessage = "Error updating the user";
      console.log(error);
      res.status(500).json({
        message: "Error updating the user",
      });
    });
});
//---------------GET ALL USER ARTICLES-----------------------------
router.get("/:id/articles", checkUser(), validateUserId, (req, res) => {
  const { id } = req.params;
  Users.findUserArticles(id)
    .then((articles) => {
      res.status(200).json(articles);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: `Error retrieving the articles of the user with id=${req.decodedJwt.subject}`,
      });
    });
});
//---------------GET SORTED USER ARTICLES BY RANK-----------------------------
router.get("/:id/articles/rank", checkUser(), validateUserId, (req, res) => {
  const { id } = req.params;

  Users.sortUserArticlesByRank(id)
    .then((articles) => {
      res.status(200).json(articles);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: `Error retrieving the articles of the user with id=${req.decodedJwt.subject}`,
      });
    });
});
//---------------GET USER ARTICLES BY RANK-----------------------------
router.get(
  "/:id/articles/rank/:rankID",
  checkUser(),
  validateUserId,
  validateRankId,
  (req, res) => {
    const { id, rankID } = req.params;

    Users.getUserArticlesByRank(id, rankID)
      .then((article) => {
        res.status(200).json(article);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          message: `Error retrieving the articles by rank of the user with id=${req.decodedJwt.subject}`,
        });
      });
  }
);
//---------------GET SPECIFIC USER ARTICLE-----------------------------
router.get(
  "/:id/articles/:articleID",
  checkUser(),
  validateUserId,
  validateArticleId,
  (req, res) => {
    const { id, articleID } = req.params;

    Users.findUserArticle(id, articleID)
      .then((article) => {
        res.status(200).json(article);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          message: `Error retrieving the articles of the user with id=${req.decodedJwt.subject}`,
        });
      });
  }
);
//-----------------------POST NEW ARTICLE-------------------------
router.post(
  "/:id/articles",
  checkUser(),
  validateUserId,
  validateArticle,
  (req, res) => {
    Articles.add(req.article)
      .then((article) => {
        res.status(201).json(article);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          message: "Error adding the article",
        });
      });
  }
);

//-------------------custom middlewares------------------------
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
function validateArticleId(req, res, next) {
  const { id, articleID } = req.params;
  Articles.findById(articleID)
    .then((article) => {
      if (article && article.user_id === Number(id)) {
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
function validateUser(req, res, next) {
  if (!isEmpty(req.body)) {
    if (
      !req.body.username ||
      !req.body.name ||
      !req.body.email ||
      !req.body.role
    ) {
      res.statusMessage = "missing required fields";
      res.status(400).json({ message: "missing required fields" });
    } else {
      next();
    }
  } else {
    res.statusMessage = "missing user data";
    res.status(400).json({ message: "missing user data" });
  }
}
function validateRankId(req, res, next) {
  const { id, rankID } = req.params;
  Articles.findByRankId(id, rankID)
    .then((articles) => {
      if (articles.length !== 0) {
        next();
      } else {
        res.status(400).json({ message: "invalid  rank id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "failed", err });
    });
}
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
module.exports = router;
