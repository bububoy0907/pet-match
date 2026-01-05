const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const User = require('../models/User');

// Get chats for a user
router.get('/:userId', async (req, res) => {
  try {
    const chats = await Chat.find({ members: req.params.userId }).populate('members', 'username photoURL');
    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create or get chat between two users
router.post('/', async (req, res) => {
  const { senderId, receiverId } = req.body;
  try {
    let chat = await Chat.findOne({ members: { $all: [senderId, receiverId] } });
    if (!chat) {
      chat = new Chat({ members: [senderId, receiverId], messages: [] });
      await chat.save();
    }
    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Send a message
router.post('/:chatId/message', async (req, res) => {
  const { senderId, text, img } = req.body;
  try {
    const chat = await Chat.findById(req.params.chatId);
    const message = { senderId, text, img, createdAt: new Date() };
    chat.messages.push(message);
    chat.updatedAt = new Date();
    await chat.save();
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
