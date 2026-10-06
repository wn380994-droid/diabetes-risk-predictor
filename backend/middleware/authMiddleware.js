const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Login လုပ်ထားမထား စစ်ဆေးခြင်း
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'User မတွေ့ပါ' });
      }
      
      next();
    } catch (error) {
      console.error('Auth Error:', error.message);
      return res.status(401).json({ success: false, message: 'Token မမှန်ပါ' });
    }
  } else {
    return res.status(401).json({ success: false, message: 'Login လုပ်ရန် လိုအပ်ပါသည်' });
  }
};

// Admin ဟုတ်မဟုတ် စစ်ဆေးခြင်း
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ success: false, message: 'Admin သာ ဝင်ရောက်နိုင်ပါသည်' });
  }
};

module.exports = { protect, adminOnly };