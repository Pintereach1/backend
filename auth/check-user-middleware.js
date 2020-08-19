function makeCheckUserMiddleware() {
  return function (req, res, next) {
    const { id } = req.params;

    if (req.decodedJwt.subject && req.decodedJwt.subject === Number(id)) {
      next();
    } else {
      res.status(403).json({ you: "do not have the power" });
    }
  };
}

module.exports = makeCheckUserMiddleware;
