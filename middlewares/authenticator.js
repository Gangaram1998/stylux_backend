const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticator(req, res, next) {
  let token = req.headers.authorization;

  jwt.verify(token, process.env.SecretKey, function (err, decoded) {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong: " + err,
        status: 0,
        error: true,
      });
    }

    if (decoded) {
      console.log(decoded);
      if (decoded.role === "deactivate") {
        return res.status(403).json({
          message: "Your Account is deactivated: Contact SuperAdmin",
          status: 0,
          error: true,
        });
      }
      next();
    } else {
      return res.status(401).json({
        message: "Invalid token, Please Login",
        status: 2,
        error: true,
      });
    }
  });
}

module.exports = {
  authenticator,
};
