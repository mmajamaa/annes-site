const express = require('express');
const router = express.Router();
const Image = require('../models/images');

const upload = require('../services/image-upload')

const singleUpload = upload.single('image');

router.post('/', (req, res) => {
  singleUpload(req, res, (err) => {
    if (err) {
      return res.status(422).send({errors: [{title: 'File upload error', details: err.message}]});
    }

    // get image with highest sort order
    let promise = Image.find().sort({so: -1}).limit(1);

    // set new image's sort order based on highest sort order on database
    promise.then(doc => {
      if (doc) {
        let image = new Image({
          url: req.file.location,
          so: doc[0].so + 1,
          alt: req.body.alt
        })
        return image;
      } else {
        let image = new Image({
          url: req.file.location,
          so: 0,
          alt: req.body.alt
        })
        return image;
      }
    }).then(image => {
      // save image
      let promise2 = image.save();
      promise2.then(doc => {
          return res.status(201).json(doc);
        })
        promise2.catch((err) => {
          return res.status(501).json({message: 'Error on saving record to database.'})
        });
      }
    );

    promise.catch(err => {
      return res.status(501).json({message: 'Error on getting newest image from database.'})
    });
  });
});

module.exports = router;
