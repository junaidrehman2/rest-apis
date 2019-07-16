const validationHandler = require("../validations/validationHandler");

exports.index = (req, res) => {
  res.send({ message: "Hi" });
};

exports.store = (req, res, next) => {
  try {
    validationHandler(req);
    res.send({ message: "the description is" + req.body.description });
  } catch (err) {
    next(err);
  }
};
