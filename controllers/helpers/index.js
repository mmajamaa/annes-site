const jwt = require('jsonwebtoken');

module.exports = {
  verifyToken: (req, res, next) => {
    let token = req.query.token;
    jwt.verify(token, process.env.secret || 'secret', (err, tokendata) => {
      if (err) {
        return res.status(400).json({message: 'Unauthorized request'});
      }
      if (tokendata) {
        next();
      }
    })
  }
}
