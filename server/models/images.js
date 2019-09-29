const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
  key: String, // used as a common id in S3 and DB
  url: {type: String, require: true},
  alt: {type: String, require: true},
  so : {type: Number, require: true},
  gallery: {
    type: Schema.Types.ObjectId,
    ref: 'Gallery'
  }
});

module.exports = mongoose.model('Image', schema);
