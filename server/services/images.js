const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const config = require('../config')

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS || config.AWS_SECRET_ACCESS,
  accessKeyId: process.env.AWS_ACCESS_KEY || config.AWS_ACCESS_KEY,
  region: 'us-east-2'
})

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
  }
}

const upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: 'annes-gallery',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'TESTING'});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

const deleteImage = file => {
  s3.deleteObject(
    {
      Bucket: 'annes-gallery',
      Key: file
    }, (error, data) => {
      console.log(data)
    }
  );
}

module.exports = {upload, deleteImage};
