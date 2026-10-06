const mongoose = require('mongoose');

const chatHistorySchema = new mongoose.Schema({
  userMessage: { type: String, required: true },
  botMessage: { type: String, required: true },
  success: { type: Boolean, default: true },
  userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true,
  index: true
},
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChatHistory', chatHistorySchema, 'chat_history');