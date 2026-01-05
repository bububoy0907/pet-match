const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  petShop: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet' },
  title: String,
  content: String,
  images: [String], // Array of image URLs
  videos: [String],
}, { timestamps: true });

module.exports = mongoose.model('BlogPost', blogPostSchema);
