const Image = require("../models/images");
const Gallery = require("../models/gallerys");
const aws = require("aws-sdk");
let config = "";

if (process.env.NODE_ENV !== "production") {
  config = require("../config.json");
}
aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS || config.AWS_SECRET_ACCESS,
  accessKeyId: process.env.AWS_ACCESS_KEY || config.AWS_ACCESS_KEY,
  region: "us-east-2",
});

const s3 = new aws.S3();

const uploadJson = (subGalleryData) => {
  s3.putObject(
    {
      Bucket: "annes-gallery",
      Key: "sub_gallery_data.json",
      Body: JSON.stringify(subGalleryData),
      ContentType: "application/json",
      ACL: "public-read",
    },
    function (err, data) {
      console.log(JSON.stringify(err) + " " + JSON.stringify(data));
    }
  );
};

module.exports = {
  index: async (req, res, next) => {
    let docs = await Gallery.find().sort({ so: 0 }).populate("images");

    try {
      return res.status(200).json(docs);
    } catch (error) {
      return res.status(501).json({ message: "Error getting gallerys." });
    }
  },

  newGallery: async (req, res, next) => {
    try {
      const gallery = await Gallery.findOne().sort("-so");

      let newGallery = new Gallery({
        en: req.body.en,
        fi: req.body.fi,
        so: gallery ? gallery.so + 1 : 0,
      });

      let doc = await newGallery.save();
      return res.status(201).json(doc);
    } catch (error) {
      return res.status(501).json({ message: "Error creating gallery." });
    }
  },

  deleteGallery: async (req, res, next) => {
    try {
      const gallery = await Gallery.findOne({ _id: req.params.id });
      await gallery.remove();
      return res.status(200).json(gallery);
    } catch (error) {
      return res.status(501).json({ message: "Error deleting gallery." });
    }
  },

  updateGalleries: async (req, res, next) => {
    try {
      // iterate through subgalleries
      for (let i = 0; i < req.body.subGalleries.length; i++) {
        // update subgallery
        const gallery = await Gallery.findOne({
          _id: req.body.subGalleries[i]._id,
        });

        gallery.images = req.body.subGalleries[i].images;
        gallery.fi = req.body.subGalleries[i].fi;
        gallery.en = req.body.subGalleries[i].en;
        gallery.so = req.body.subGalleries[i].so;

        await gallery.save();

        // iterate through subgallery's images
        for (let j = 0; j < req.body.subGalleries[i].images.length; j++) {
          // update images
          Image.update(
            { _id: req.body.subGalleries[i].images[j]._id },
            {
              so: req.body.subGalleries[i].images[j].so,
              alt_fi: req.body.subGalleries[i].images[j].alt_fi,
              alt_en: req.body.subGalleries[i].images[j].alt_en,
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
      let docs = await Gallery.find().sort({ so: 0 }).populate("images");
      uploadJson(docs);
      return res.status(201).json(docs);
    } catch (error) {
      return res.status(501).json({ message: "Error updating changes." });
    }
  },
};
