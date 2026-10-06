const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
  age: { type: Number, required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  weight: { type: Number },
  height: { type: Number },
  bmi: { type: Number },
  glucose: { type: Number, required: true },
  insulin: { type: Number },
  bloodPressure: { type: Number },
  hba1c: { type: Number },
  skinThickness: { type: Number },
  diabetesPedigreeFunction: { type: Number },
  pregnancies: { type: Number, default: 0 },
  dietHabit: { 
    type: String, 
    enum: ['high_sugar', 'balanced', 'low_sugar', 'vegetarian'] 
  },
  stressLevel: { type: Number, min: 1, max: 10 },
  exerciseFrequency: { type: Number, default: 0 },
  symptoms: [{ type: String }],
  predictionResult: {
    riskPercentage: Number,
    riskLevel: String,
    confidence: Number
  },
  recommendations: [{ type: String }],
  userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true,
  index: true
},
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserData', userDataSchema, 'user_predictions');