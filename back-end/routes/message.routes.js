const express = require('express');
const router = express.Router();
const multer = require('multer');
const Message = require('../models/Message');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/send', upload.single('img'), async (req, res) => {
  try {
    const { text, senderId, receiverId } = req.body;
    const img = req.file ? req.file.buffer : null;

    const message = new Message({
      sender: senderId,
      receiver: receiverId,
      content: text,
      img: img,
    });

    await message.save();
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:senderId/:receiverId', async (req, res) => {
    try {
      const { senderId, receiverId } = req.params;
  
      const messages = await Message.find({
        $or: [
          { sender: senderId, receiver: receiverId },
          { sender: receiverId, receiver: senderId }
        ]
      }).sort({ createdAt: 1 });
  
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  module.exports = router;