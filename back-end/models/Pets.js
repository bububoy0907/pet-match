const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  vaccineStatus: String,
  sellType: { type: String, enum: ['Adopt', 'Buy'] },
  sellingStatus: { type: String, enum: ['Sold Out', 'Currently Selling'], default: 'Currently Selling' },
  species: String, // Added clearly
  breed: String, // Optional breed
  petShop: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  blogPost: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost' },
}, { timestamps: true });

module.exports = mongoose.model('Pet', petSchema);
