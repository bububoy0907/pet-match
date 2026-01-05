const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  photoURL: { type: String },
  dateOfBirth: { type: Date },
  accountType: { type: String, enum: ['customer', 'business'], default: 'customer' },
  bio: String, // For pet shop intro
  rating: { type: Number, default: 0 }, // Overall rating for pet shop
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
