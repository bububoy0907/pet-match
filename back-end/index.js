const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const dbConfig = require('./config/db.config');
const app = express();
const PORT = process.env.PORT || 5000;
const runSeeder = require('./seedDatabase');

// Middleware
app.use(cors());
app.use(express.json());


// Connect to MongoDB
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('✅ Connected to MongoDB');
  await runSeeder(); 
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

// ✅ Default test route for "/"
app.get('/', (req, res) => {
  res.send('🎉 Backend server is running successfully!');
});

// Routes
app.use('/api/pets', require('./routes/petRoutes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/messages', require('./routes/message.routes'));
app.use('/api/conversations', require('./routes/conversation.routes'));
app.use('/api/chats', require('./routes/chat.routes'));
app.use('/uploads', express.static('uploads')); // ✅ serve images


// ... add other routes as needed

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
