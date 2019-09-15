const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
  url: {type: String, require: true},
  alt: {type: String, require: true},
  so : {type: Number, require: true}
});

module.exports = mongoose.model('Image', schema);
