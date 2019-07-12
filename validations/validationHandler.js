const { validationResult } = require("express-validator/check");

module.exports = req => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const error = new Error("validation Failed");
    error.statusCode = 422;
    error.message = validationErrors.array();
    throw error;
  }
};
