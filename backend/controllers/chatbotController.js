const { getChatbotResponse } = require('../services/chatbotService');
const ChatHistory = require('../models/ChatHistory');

const chat = async (req, res) => {
  const { message } = req.body;

  if (!message || message.trim() === '') {
    return res.status(400).json({ success: false, message: 'မေးခွန်း ထည့်သွင်းရန် လိုအပ်ပါသည်။' });
  }

  try {
    const response = await getChatbotResponse(message);

    try {
      const chatRecord = new ChatHistory({
        userId: req.user._id,   // ⭐ User ID ထည့်
        userMessage: message,
        botMessage: response.message,
        success: response.success
      });
      await chatRecord.save();
      console.log('💾 Chat History သိမ်းပြီး');
    } catch (dbError) {
      console.error('⚠️ Chat History သိမ်းလို့ မရ:', dbError.message);
    }

    res.json(response);
  } catch (error) {
    console.error('❌ Chat Controller Error:', error.message);
    res.status(500).json({ success: false, message: 'ချိတ်ဆက်မှု အဆင်မပြေဖြစ်နေပါတယ်။' });
  }
};

const getChatHistory = async (req, res) => {
  try {
    const history = await ChatHistory
      .find({ userId: req.user._id })   // ⭐ ကိုယ်ပိုင်သာ
      .sort({ createdAt: -1 })
      .limit(100);
    res.json({ success: true, data: history });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const clearChatHistory = async (req, res) => {
  try {
    await ChatHistory.deleteMany({ userId: req.user._id });
    res.json({ success: true, message: 'Chat History အားလုံး ဖျက်ပြီးပါပြီ' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { chat, getChatHistory, clearChatHistory };