const jwt = require("jsonwebtoken");

let config = { secret: "" };

if (process.env.NODE_ENV !== "production") {
  config = require("../../config.json");
}

module.exports = {
  verifyToken: (req, res, next) => {
    let token = req.query.token;
    jwt.verify(token, process.env.secret || config.secret, (err, tokendata) => {
      if (err) {
        return res.status(400).json({ message: "Unauthorized request" });
      }
      if (tokendata) {
        next();
      }
    });
  },
};
