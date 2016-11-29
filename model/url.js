var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlSchema = new Schema({
  url: String,
});

module.exports = mongoose.model('Url', urlSchema);
