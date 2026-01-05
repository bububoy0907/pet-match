const express = require('express');
const router = express.Router();
const users = require('../controllers/user.controller');
const User = require('../models/User');

router.post('/register', users.register);
router.post('/login', users.login);

router.get('/find/:username', async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.username });
      if (!user) return res.status(404).json('User not found');
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
