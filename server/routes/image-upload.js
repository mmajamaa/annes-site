const express = require("express");
const router = express.Router();

const upload = require('../services/image-upload')

const singleUpload = upload.single('image');

router.post('/', (req, res) => {
  singleUpload(req, res, (err) => {
    if (err) {
      return res.status(422).send({errors: [{title: 'File upload error', details: err.message}]});
    }
    return res.json({'imageUrl': req.file.location});
    console.log(err);
  });
});

module.exports = router;
