const User = require('../models/User');
const UserData = require('../models/UserData');
const ChatHistory = require('../models/ChatHistory');

// User အားလုံး ရယူခြင်း
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// User တစ်ယောက်ကို ဖျက်ခြင်း
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // ကိုယ့်ကိုယ်ကို မဖျက်ရ
    if (userId === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: 'ကိုယ့်အကောင့်ကို ဖျက်လို့ မရပါ' });
    }

    // User ရဲ့ ဒေတာအားလုံး ဖျက်ခြင်း
    await UserData.deleteMany({ userId });
    await ChatHistory.deleteMany({ userId });
    await User.findByIdAndDelete(userId);

    res.json({ success: true, message: 'User နှင့် ဒေတာအားလုံး ဖျက်ပြီးပါပြီ' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// User ရဲ့ Role ပြောင်းခြင်း
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const userId = req.params.id;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Role မမှန်ပါ' });
    }

    // ကိုယ့်ရဲ့ role ကို ကိုယ် မပြောင်းရ
    if (userId === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: 'ကိုယ့် Role ကို ကိုယ် မပြောင်းနိုင်ပါ' });
    }

    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User မတွေ့ပါ' });
    }

    res.json({ success: true, message: 'Role ပြောင်းပြီးပါပြီ', data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Dashboard Statistics
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPredictions = await UserData.countDocuments();
    const totalChats = await ChatHistory.countDocuments();

    // Risk Level အလိုက်
    const highRisk = await UserData.countDocuments({ 'predictionResult.riskLevel': 'High' });
    const moderateRisk = await UserData.countDocuments({ 'predictionResult.riskLevel': 'Moderate' });
    const lowRisk = await UserData.countDocuments({ 'predictionResult.riskLevel': 'Low' });

    // လွန်ခဲ့တဲ့ ၇ ရက်အတွင်း စစ်ဆေးမှု
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentPredictions = await UserData.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    // အသစ်ဆုံး User ၅ ယောက်
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email role createdAt');

    res.json({
      success: true,
      data: {
        totalUsers,
        totalPredictions,
        totalChats,
        highRisk,
        moderateRisk,
        lowRisk,
        recentPredictions,
        recentUsers
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Chat History အားလုံး ကြည့်ခြင်း
const getAllChats = async (req, res) => {
  try {
    const chats = await ChatHistory
      .find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .limit(200);
    res.json({ success: true, data: chats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  updateUserRole,
  getDashboardStats,
  getAllChats
};