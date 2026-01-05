const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { username, email, password, accountType, dateOfBirth } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already in use.' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      accountType,
      ...(accountType === 'customer' && { dateOfBirth }),
    });

    await user.save();

    res.status(201).json({
      message: 'User registered successfully',
      username: user.username,
      userId: user._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Create JWT token (optional, or use session)
    const token = jwt.sign({ id: user._id }, 'your-secret', { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,
      username: user.username,
      userId: user._id,
      email: user.email,                 // ✅ include email
      dateOfBirth: user.dateOfBirth || null,  // ✅ optional for customer
      accountType: user.accountType,     // ✅ customer or business
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during login' });
  }
};
