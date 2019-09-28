const Image = require('../models/images');
const Gallery = require('../models/gallerys');

module.exports = {
  index:  async (req, res, next) => {
    let images = await Image.find().sort({so: 1});
    try {
      return res.status(200).json(images);
    } catch (error) {
      return res.status(501).json({message: 'Error getting images'});
    }
  },

  newImage: async (req, res, next) => {
    try {
      // create new image
      const newImage = await new Image({
        url: req.file.location,
        alt: req.body.alt,
        so: 1
      });
      // get gallery based on url parameter
      const gallery = await Gallery.findById(req.params.galleryId);
      // set new image's gallery
      newImage.gallery = gallery;
      await newImage.save();
      console.log(gallery.images);
      // push new image to gallery
      gallery.images.push(newImage);
      await gallery.save();
      res.status(201).json(newImage);
    } catch (error) {
      return res.status(501).json({message: 'Error on saving record to database.'})
    }
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
