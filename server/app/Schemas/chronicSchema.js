const mongoose = require('mongoose');
const images = require('./chronicsImagesSchema');

const chronicSchema = new mongoose.Schema({
  id: String,
  name: String,
  title: String,
  content: String,
  date: Date,
  rating: String,
  likes: Number,
  bandName: String,
  discName: String,
  genre: String,
  imagePath: String
  // chronicImages: images
});

module.exports = mongoose.model('chronicModel', chronicSchema);
