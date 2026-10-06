const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'နာမည် ထည့်ရန် လိုအပ်ပါသည်'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'အီးမေးလ် ထည့်ရန် လိုအပ်ပါသည်'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'စကားဝှက် ထည့်ရန် လိုအပ်ပါသည်'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ⭐ ပြင်ဆင်ချက်: next() မသုံးတော့ဘူး၊ async function က ကိုယ်တိုင် return လုပ်တယ်
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Password စစ်ဆေးခြင်း method
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema, 'users');