const router = require("express").Router();
const Categories = require("../../database/helpers/categories-model.js");
const Users = require("../../database/helpers/admin-model");
//const checkUser = require("../../auth/check-user-middleware.js");
//const checkRole = require("../../auth/check-role-middleware.js");

//----------------ADMIN-------------------------
router.get("/users", (req, res) => {
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
router.delete("/:id", validateUserId, (req, res) => {
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
//----------------CATEGORIES----------------------------------
//-----------------------PUT-------------------------
router.put(
  "/categories/:id",

  validateCategoryId,
  validateCategory,
  (req, res) => {
    const { id } = req.params;
    Categories.update(req.category.id, req.body)
      .then((category) => {
        if (category) {
          res.status(200).json(category);
        } else {
          req
            .status(500)
            .json({ message: "An error occured during getting category" });
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
//-----------------------DELETE CATEGORY-------------------------
router.delete("/categories/:id", validateCategoryId, (req, res) => {
  Categories.remove(req.category.id)
    .then((category) => {
      res.status(200).json(category);
    })

    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error removing the category",
      });
    });
});
//-------------- CATEGORIES custom middlewares------------------
function validateCategoryId(req, res, next) {
  const { id } = req.params;
  Categories.findById(id)
    .then((category) => {
      if (category) {
        req.category = category;
        next();
      } else {
        res.status(400).json({ message: "invalid category id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "failed", err });
    });
}
function validateCategory(req, res, next) {
  if (!isEmpty(req.body)) {
    if (!req.body.category_name) {
      res.statusMessage = "missing required category_name field";
      res.status(400).json({ message: "missing required category_name field" });
    } else {
      next();
    }
  } else {
    res.statusMessage = "missing category data";
    res.status(400).json({ message: "missing category data" });
  }
}
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

//-------------------USERS custom middlewares------------------------
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
