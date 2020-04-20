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
  },

  updateGalleries: async (req, res, next) => {
    try {
      // iterate through subgalleries
      for (let i = 0; i < req.body.subGalleries.length; i++) {
        // update subgallery
        const gallery = await Gallery.findOne({ _id: req.body.subGalleries[i]._id });
        gallery.images = req.body.subGalleries[i].images;
        let doc = await gallery.save();
        // iterate through subgallery's images
        for (let j = 0; j < req.body.subGalleries[i].images.length; j++) {
          // update images
          Image.update(
            { _id: req.body.subGalleries[i].images[j]._id },
            {
              so: req.body.subGalleries[i].images[j].so,
              alt_fi: req.body.subGalleries[i].images[j].alt_fi,
              alt_en: req.body.subGalleries[i].images[j].alt_en
            },
            (err, doc) => {
              if (err) {
                return res
                  .status(501)
                  .json({ message: "Error on saving record to database." });
              }
            }
          );
        }
      }
      let docs = await Gallery.find().populate('images');
      return res.status(201).json(docs);
    } catch (error) {
      return res.status(501).json({message: 'Error updating changes.'})
    }
  }
}
