const express = require('express');
const router = express.Router();
const Conversation = require('../models/Conversation');

router.post('/findOrCreate', async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] }
    });

    if (!conversation) {
      conversation = new Conversation({ members: [senderId, receiverId] });
      await conversation.save();
    }

    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
