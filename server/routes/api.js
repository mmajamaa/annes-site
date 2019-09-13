const express = require("express");
const router = express.Router();

router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body.username, req.body.password)
  return res.json({'success': true});
});

module.exports = router;
