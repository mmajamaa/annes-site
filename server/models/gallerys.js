const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
  en: {type: String, require: true}, // also used as a path
  fi: {type: String, require: true}
});

module.exports = mongoose.model('Gallery', schema);
