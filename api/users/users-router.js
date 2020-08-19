const router = require("express").Router();

const Users = require("../../database/helpers/users-model");
const checkUser = require("../../auth/check-user-middleware.js");
const checkRole = require("../../auth/check-role-middleware.js");

//----------------ADMIN-------------------------
router.get("/", checkRole(1), (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the users",
      });
    });
});
router.delete("/:id", checkRole(1), validateUserId, (req, res) => {
  Users.remove(req.user.id)
    .then((user) => {
      res.status(200).json(user);
    })

    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error removing the user",
      });
    });
});

//----------------USER-------------------------
router.get("/:id", checkRole(2), checkUser(), (req, res) => {
  Users.findBy({ id: req.decodedJwt.subject })
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: `Error retrieving the user with id= ${req.decodedJwt.subject}`,
      });
    });
});
router.get("/:id/articles", checkRole(2), checkUser(), (req, res) => {
  const { id } = req.params;
  //const {  sortby = "id"} = req.query;

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

module.exports = router;
