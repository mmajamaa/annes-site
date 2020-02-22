const Image = require("../models/images");
const Gallery = require("../models/gallerys");
const deleteImage = require("../services/images").deleteImage;

module.exports = {
  index: async (req, res, next) => {
    let images = await Image.find()
      .sort({ so: 0 })
      .populate("gallery");

    try {
      return res.status(200).json(images);
    } catch (error) {
      return res.status(501).json({ message: "Error getting images" });
    }
  },

  newImage: async (req, res, next) => {
    try {
      // create new image
      const newImage = new Image({
        Key: req.file.key,
        url: req.file.location,
        alt_fi: req.body.alt_fi,
        alt_en: req.body.alt_fi,
        so: 1
      });
      // get gallery based on url parameter
      const gallery = await Gallery.findById(req.params.galleryId);
      // set new image's gallery
      newImage.gallery = gallery;
      await newImage.save();
      // push new image to gallery
      gallery.images.push(newImage._id);
      await gallery.save();
      res.status(201).json(newImage);
    } catch (error) {
      return res
        .status(501)
        .json({ message: "Error on saving record to database." });
    }
  },

  saveOrder: async (req, res, next) => {
    // TODO: reverse
    try {
      // create new image
      const newImage = new Image({
        Key: req.file.key,
        url: req.file.location,
        alt_fi: req.body.alt_fi,
        alt_en: req.body.alt_fi,
        so: 1
      });

      await newImage.save();
      // push new image to gallery

      res.status(201).json(newImage);
    } catch (error) {
      return res
        .status(501)
        .json({ message: "Error on saving record to database." });
    }
  },

  deleteImage: async (req, res, next) => {
    try {
      const image = await Image.findOne({ Key: req.params.key });
      await image.remove();
      return res.status(200).json({ message: "Image deleted succesfully." });
    } catch (error) {
      return res.status(501).json({ message: "Error deleting image." });
    }
  },

  newImageNoGallery: async (req, res, next) => {
    // TODO: reverse
    const images = JSON.parse(req.body.images);
    for (let i = 0; i < images.length; i++) {
      Image.update({ Key: images[i].Key }, { so: images[i].so }, (err, doc) => {
        if (err) {
          return res
            .status(501)
            .json({ message: "Error on saving record to database." });
        }
      });
    }

    return res.status(200).json({ message: "success" });
  }
};
