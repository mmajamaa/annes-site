const express = require("express");
const router = express.Router();

const helpers = require('../controllers/helpers');

const upload = require('../services/image-upload')
const singleUpload = upload.single('image');

// controllers
const ImagesController = require('../controllers/images.js');
const GallerysController = require('../controllers/gallerys.js');
const AuthenticationController = require('../controllers/authentication.js');

router.route('/images')
  .get(ImagesController.index)

router.route('/images/:galleryId')
  .post(helpers.verifyToken, singleUpload, ImagesController.newImage)

router.route('/image/:id')
  .delete(helpers.verifyToken, ImagesController.deleteImage);

router.route('/auth/login')
  .post(AuthenticationController.index);

router.route('/auth/status')
  .get(helpers.verifyToken, AuthenticationController.authenticated);

router.route('/gallerys')
  .get(GallerysController.index)
  .post(helpers.verifyToken, GallerysController.newGallery);

router.route('/gallery/:id')
  .delete(helpers.verifyToken, GallerysController.deleteGallery);

module.exports = router;
