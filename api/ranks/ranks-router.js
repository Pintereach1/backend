const router = require("express").Router();
const Ranks = require("../../database/helpers/ranks-model.js");
const checkRole = require("../../auth/check-role-middleware.js");

//----------------RANKS-------------------------
//---------------GET-----------------------------
router.get("/", (req, res) => {
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
//-----------------------POST-------------------------
router.post("/", validateRank, (req, res) => {
  Ranks.add(req.body)
    .then((rank) => {
      res.status(201).json(rank);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error adding the rank",
      });
    });
});

//--------------custom middlewares------------------
function validateRankId(req, res, next) {
  const { id } = req.params;
  Ranks.findById(id)
    .then((rank) => {
      if (rank) {
        req.rank = rank;
        next();
      } else {
        res.status(400).json({ message: "invalid rank id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "failed", err });
    });
}
function validateRank(req, res, next) {
  if (!isEmpty(req.body)) {
    if (!req.body.rank) {
      res.statusMessage = "missing required rank field";
      res.status(400).json({ message: "missing required rank field" });
    } else {
      next();
    }
  } else {
    res.statusMessage = "missing rank data";
    res.status(400).json({ message: "missing rank data" });
  }
}
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

module.exports = router;
