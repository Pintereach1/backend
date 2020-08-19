const router = require("express").Router();
const Categories = require("../../database/helpers/categories-model.js");
const checkRole = require("../../auth/check-role-middleware.js");

//----------------ARTICLES-------------------------
//---------------GET-----------------------------
router.get("/", (req, res) => {
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
//-----------------------POST-------------------------
router.post("/", validateCategory, (req, res) => {
  Categories.add(req.body)
    .then((category) => {
      res.status(201).json(category);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error adding the category",
      });
    });
});
//-----------------------PUT-------------------------
// router.put(
//   "/:id",
//   checkRole(1),
//   validateCategoryId,
//   validateCategory,
//   (req, res) => {
//     const { id } = req.params;
//     Categories.update(req.category.id, req.body)
//       .then((category) => {
//         if (category) {
//           res.status(200).json(category);
//         } else {
//           req
//             .status(500)
//             .json({ message: "An error occured during getting category" });
//         }
//       })

//       .catch((error) => {
//         res.statusMessage = "Error updating the article";
//         console.log(error);
//         res.status(500).json({
//           message: "Error updating the article",
//         });
//       });
//   }
// );
// //-----------------------DELETE-------------------------
// router.delete("/:id", checkRole(1), validateCategoryId, (req, res) => {
//   Categories.remove(req.category.id)
//     .then((category) => {
//       res.status(200).json(category);
//     })

//     .catch((error) => {
//       console.log(error);
//       res.status(500).json({
//         message: "Error removing the category",
//       });
//     });
// });
//--------------custom middlewares------------------
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

module.exports = router;
