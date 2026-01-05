const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: { type: String },
  img: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const ChatSchema = new mongoose.Schema({
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [MessageSchema],
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Chat', ChatSchema);
