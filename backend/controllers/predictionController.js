const UserData = require('../models/UserData');
const { getPrediction, getRecommendations } = require('../services/mlService');

const createPrediction = async (req, res) => {
  try {
    const userData = req.body;
    
    if (!userData.bmi && userData.weight && userData.height) {
      const heightInMeters = userData.height / 100;
      userData.bmi = parseFloat((userData.weight / (heightInMeters ** 2)).toFixed(1));
    }
    
    const prediction = await getPrediction(userData);
    const recommendations = getRecommendations(userData, prediction);
    
    const finalData = {
      ...userData,
      userId: req.user._id,   // ⭐ User ID ထည့်
      predictionResult: prediction,
      recommendations
    };
    
    const savedData = new UserData(finalData);
    await savedData.save();
    
    res.status(201).json({
      success: true,
      message: 'ခန့်မှန်းချက် အောင်မြင်စွာ ပြီးစီးပါပြီ',
      data: savedData
    });
  } catch (error) {
    console.error('Prediction Error:', error);
    res.status(500).json({ success: false, message: 'ခန့်မှန်းချက် မအောင်မြင်ပါ', error: error.message });
  }
};

// ⭐ ကိုယ်ပိုင် သမိုင်းသာ ပြသခြင်း
const getAllPredictions = async (req, res) => {
  try {
    const predictions = await UserData
      .find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    res.json({ success: true, data: predictions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getPredictionById = async (req, res) => {
  try {
    const prediction = await UserData.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });
    if (!prediction) {
      return res.status(404).json({ success: false, message: 'မတွေ့ပါ' });
    }
    res.json({ success: true, data: prediction });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ⭐ ကိုယ်ပိုင် သမိုင်း ဖျက်ခြင်း
const deletePrediction = async (req, res) => {
  try {
    const result = await UserData.deleteOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'မတွေ့ပါ' });
    }
    res.json({ success: true, message: 'ဖျက်ပြီးပါပြီ' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ⭐ Admin — User အားလုံး၏ ခန့်မှန်းချက်
const getAllPredictionsAdmin = async (req, res) => {
  try {
    const predictions = await UserData
      .find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: predictions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createPrediction,
  getAllPredictions,
  getPredictionById,
  deletePrediction,
  getAllPredictionsAdmin
};