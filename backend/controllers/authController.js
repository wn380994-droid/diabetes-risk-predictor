const jwt = require('jsonwebtoken');
const User = require('../models/User');

// JWT Token ဖန်တီးခြင်း
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });
};

// Register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'အချက်အလက် အားလုံး ဖြည့်ပါ' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'စကားဝှက် အနည်းဆုံး ၆ လုံး ရှိရပါမည်' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'ဒီအီးမေးလ်နဲ့ အကောင့်ရှိပြီးသားပါ' });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      success: true,
      message: 'အကောင့်ဖွင့်ခြင်း အောင်မြင်ပါသည်',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      }
    });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'အီးမေးလ်နှင့် စကားဝှက် ဖြည့်ပါ' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'အီးမေးလ် သို့မဟုတ် စကားဝှက် မှားနေပါသည်' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'အီးမေးလ် သို့မဟုတ် စကားဝှက် မှားနေပါသည်' });
    }

    res.json({
      success: true,
      message: 'Login အောင်မြင်ပါသည်',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Current User ရယူခြင်း
const getMe = async (req, res) => {
  res.json({
    success: true,
    data: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    }
  });
};

module.exports = { register, login, getMe };