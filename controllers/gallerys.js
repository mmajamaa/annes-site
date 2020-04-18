const Image = require('../models/images');
const Gallery = require('../models/gallerys');

const deleteImages = require('../services/images').deleteImages;

module.exports = {
  index: async (req, res, next) => {
    let docs = await Gallery.find().populate('images');

    try {
      return res.status(200).json(docs);
    } catch (error) {
      return res.status(501).json({message: 'Error getting gallerys.'})
    }
  },

  newGallery: async (req, res, next) => {
    let gallery = new Gallery({
      en: req.body.en,
      fi: req.body.fi
    });

    let doc = await gallery.save();

    try {
      return res.status(201).json(doc);
    } catch (error) {
      return res.status(501).json({message: 'Error creating gallery.'});
    }
  },

  deleteGallery: async (req, res, next) => {
    try {
      const gallery = await Gallery.findOne({_id: req.params.id});
      await gallery.remove();
      return res.status(200).json(gallery);
    } catch (error) {
      return res.status(501).json({message: 'Error deleting gallery.'})
    }
  }
}
