const axios = require('axios');

//const ML_API_URL = process.env.ML_API_URL || 'http://localhost:8000';
const ML_API_URL = 'http://127.0.0.1:8000';

console.log('🔍 ML_API_URL =', ML_API_URL);
console.log('🔍 Type =', typeof ML_API_URL);
console.log('🔍 Length =', ML_API_URL?.length);

const getPrediction = async (userData) => {
  try {
    console.log('📤 ML API ကို ခေါ်နေသည်...');

    // ⭐ Family History → DPF Mapping
    const dpfMap = {
      'none': 0.2,
      'one_relative': 0.5,
      'multiple_relatives': 0.9
    };
    const dpf = dpfMap[userData.familyHistory] || userData.diabetesPedigreeFunction || 0.5;

    const response = await axios.post(`${ML_API_URL}/predict`, {
      pregnancies: userData.pregnancies || 0,
      glucose: userData.glucose,
      bloodPressure: userData.bloodPressure || 70,
      skinThickness: userData.skinThickness || 20,
      insulin: userData.insulin || 80,
      bmi: userData.bmi || 25,
      diabetesPedigreeFunction: dpf,   // ← အသစ်
      age: userData.age
    });
    console.log('✅ ML API ရလဒ်:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ ML API Error:', error.message);
    console.log('⚠️ Fallback logic ကို သုံးနေသည်...');
    return fallbackPrediction(userData);
  }
};

const fallbackPrediction = (userData) => {
  let riskScore = 0;
  if (userData.glucose > 140) riskScore += 30;
  else if (userData.glucose > 100) riskScore += 15;
  if (userData.bmi > 30) riskScore += 20;
  else if (userData.bmi > 25) riskScore += 10;
  if (userData.age > 45) riskScore += 15;
  else if (userData.age > 35) riskScore += 8;
  if (userData.bloodPressure > 90) riskScore += 10;
  if (userData.insulin > 200) riskScore += 10;
  const riskPercentage = Math.min(riskScore, 95);
  let riskLevel = 'Low';
  if (riskPercentage > 60) riskLevel = 'High';
  else if (riskPercentage > 30) riskLevel = 'Moderate';
  return { riskPercentage, riskLevel, confidence: 0.7 };
};

const getRecommendations = (userData, prediction) => {
  const recommendations = [];
  if (prediction.riskLevel === 'High') {
    recommendations.push('ဆရာဝန်နှင့် ချက်ချင်း ပြသပါ။');
    recommendations.push('သွေးတွင်းသကြားဓာတ်ကို နေ့စဉ် စစ်ဆေးပါ။');
  }
  if (userData.bmi > 25) {
    recommendations.push('ကိုယ်အလေးချိန် လျှော့ချပါ။');
  }
  if (userData.glucose > 100) {
    recommendations.push('သကြားပါဝင်မှုမြင့်တဲ့ အစားအသောက်များ လျှော့စားပါ။');
  }
  recommendations.push('တစ်ပတ်လျှင် အနည်းဆုံး ၃ ကြိမ် လေ့ကျင့်ခန်း လုပ်ပါ။');
  recommendations.push('အသီးအရွက်၊ အစေ့အဆန်များ များများစားပါ။');
  recommendations.push('ရေများများ သောက်ပါ။');
  if (userData.stressLevel > 7) {
    recommendations.push('တရားထိုင်ခြင်းဖြင့် စိတ်ဖိစီးမှုကို လျှော့ချပါ။');
  }
  return recommendations;
};

module.exports = { getPrediction, getRecommendations };