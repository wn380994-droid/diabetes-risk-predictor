const express = require('express');
const router = express.Router();
const { chat, getChatHistory, clearChatHistory } = require('../controllers/chatbotController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, chat);
router.get('/history', protect, getChatHistory);
router.delete('/history', protect, clearChatHistory);

module.exports = router;