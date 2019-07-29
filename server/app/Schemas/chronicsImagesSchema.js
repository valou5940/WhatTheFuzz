const mongoose = require('mongoose');

const chronicsImagesSchema = new mongoose.Schema({
  id: String,
  name: String,
  thumbnailPath: String,
  imagePath: String
});

module.exports = mongoose.model('chronicsImages', chronicsImagesSchema);
