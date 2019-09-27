const Image = require('../models/images');
const Gallery = require('../models/gallerys');

const upload = require('../services/image-upload')
const singleUpload = upload.single('image');

module.exports = {
  index:  async (req, res, next) => {
    let images = await Image.find().sort({so: 1});
    try {
      return res.status(200).json(images);
    } catch (error) {
      return res.status(501).json({message: 'Error getting images'});
    }
  },

  newImage: async (req, res) => {
    singleUpload(req, res, (err) => {
      if (err) {
        return res.status(422).send({errors: [{title: 'File upload error', details: err.message}]});
      }

      // get image with highest sort order
      let promise = Image.find().sort({so: -1}).limit(1);

      // set new image's sort order based on highest sort order on database
      promise.then(doc => {
        if (doc[0]) {
          let image = new Image({
            url: req.file.location,
            so: doc[0].so + 1,
            alt: req.body.alt,
            gallery: req.body.gallery
          })
          return image;
        } else {
          let image = new Image({
            url: req.file.location,
            so: 0,
            alt: req.body.alt,
            gallery: req.body.gallery
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
  },

  deleteImage: async (req, res) => {
    // TODO: delete image from S3
    let promise = Image.deleteOne({_id: req.params.id});

    promise.then(doc => {
      if (doc) {
        return res.status(200).json({message: 'Image deleted succesfully.'});
      } else {
        return res.status(501).json({message: 'Error deleting image.'})
      }
    });
  }
}
