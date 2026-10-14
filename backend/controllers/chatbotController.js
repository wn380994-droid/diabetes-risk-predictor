const { getChatbotResponse } = require('../services/chatbotService');
const ChatHistory = require('../models/ChatHistory');

const chat = async (req, res) => {
  const { message } = req.body;

  if (!message || message.trim() === '') {
    return res.status(400).json({ success: false, message: 'မေးခွန်း ထည့်သွင်းရန် လိုအပ်ပါသည်။' });
  }

  if (message.length > 500) {
    return res.status(400).json({
      success: false,
      message: 'မေးခွန်း ရှည်လွန်းပါသည်။ တိုတိုမေးပါ။'
    });
  }

  try {
    // ⭐ Cache Check — တူတူမေးခွန်း ရှိပြီးသားလား စစ်
    const cached = await ChatHistory.findOne({
      userMessage: message.trim(),
      success: true
    }).sort({ createdAt: -1 });

    if (cached) {
      console.log('💾 Cache ကနေ ပြန်ပေးသည် (API မခေါ်ဘူး)');

      // Cache ရလဒ်ကို ဒီ User အတွက် ပြန်သိမ်း (History မှာ ပေါ်စေဖို့)
      try {
        const chatRecord = new ChatHistory({
          userId: req.user._id,
          userMessage: message,
          botMessage: cached.botMessage,
          success: true
        });
        await chatRecord.save();
      } catch (dbError) {
        console.error('⚠️ Cache History သိမ်းလို့ မရ:', dbError.message);
      }

      return res.json({
        success: true,
        message: cached.botMessage,
        cached: true
      });
    }

    // Cache မရှိရင် API ခေါ်
    console.log('📤 Cache မရှိ → API ခေါ်မည်');
    const response = await getChatbotResponse(message);

    // ရလဒ်ကို DB မှာ သိမ်း
    try {
      const chatRecord = new ChatHistory({
        userId: req.user._id,
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
      .find({ userId: req.user._id })
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