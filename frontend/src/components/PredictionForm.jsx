import React, { useState } from 'react';
import { createPrediction } from '../services/api';

const PredictionForm = ({ onResult }) => {
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    glucose: '',
    insulin: '',
    bloodPressure: '',
    hba1c: '',
    pregnancies: 0,
    dietHabit: 'balanced',
    stressLevel: 5,
    exerciseFrequency: 0,
    symptoms: []
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSymptomChange = (symptom) => {
    const updated = formData.symptoms.includes(symptom)
      ? formData.symptoms.filter(s => s !== symptom)
      : [...formData.symptoms, symptom];
    setFormData({ ...formData, symptoms: updated });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const payload = {
        ...formData,
        age: Number(formData.age),
        weight: Number(formData.weight),
        height: Number(formData.height),
        glucose: Number(formData.glucose),
        insulin: Number(formData.insulin) || 0,
        bloodPressure: Number(formData.bloodPressure) || 0,
        hba1c: Number(formData.hba1c) || undefined,
        stressLevel: Number(formData.stressLevel),
        exerciseFrequency: Number(formData.exerciseFrequency),
        pregnancies: Number(formData.pregnancies)
      };
      
      const result = await createPrediction(payload);
      onResult(result.data);
    } catch (err) {
      setError('ခန့်မှန်းချက် မအောင်မြင်ပါ။ ပြန်ကြိုးစားပါ။');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="prediction-form">
      <h2>ဆီးချိုရောဂါ ဖြစ်နိုင်ခြေ စစ်ဆေးရန်</h2>
      
      {error && <div className="error">{error}</div>}
      
      <div className="form-group">
        <label>အသက်</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} required />
      </div>
      
      <div className="form-group">
        <label>လိင်</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="male">အမျိုးသား</option>
          <option value="female">အမျိုးသမီး</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>ကိုယ်အလေးချိန် (kg)</label>
        <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />
      </div>
      
      <div className="form-group">
        <label>အရပ် (cm)</label>
        <input type="number" name="height" value={formData.height} onChange={handleChange} required />
      </div>
      
      <div className="form-group">
        <label>သွေးတွင်းဂလူးကို့စ် (mg/dL)</label>
        <input type="number" name="glucose" value={formData.glucose} onChange={handleChange} required />
      </div>
      
      <div className="form-group">
        <label>အင်ဆူလင် (mu U/ml)</label>
        <input type="number" name="insulin" value={formData.insulin} onChange={handleChange} />
      </div>
      
      <div className="form-group">
        <label>သွေးဖိအား (mm Hg)</label>
        <input type="number" name="bloodPressure" value={formData.bloodPressure} onChange={handleChange} />
      </div>
      
      <div className="form-group">
        <label>HbA1c (%)</label>
        <input type="number" step="0.1" name="hba1c" value={formData.hba1c} onChange={handleChange} />
      </div>
      
      <div className="form-group">
        <label>အစားအသောက် စားသုံးမှုပုံစံ</label>
        <select name="dietHabit" value={formData.dietHabit} onChange={handleChange}>
          <option value="balanced">မျှတအောင် စားသုံးသည်</option>
          <option value="high_sugar">သကြားများစွာ စားသုံးသည်</option>
          <option value="low_sugar">သကြားနည်းစွာ စားသုံးသည်</option>
          <option value="vegetarian">သက်သတ်လွတ်</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>စိတ်ဖိစီးမှုအဆင့် (1-10): {formData.stressLevel}</label>
        <input type="range" name="stressLevel" min="1" max="10" value={formData.stressLevel} onChange={handleChange} />
      </div>
      
      <div className="form-group">
        <label>တစ်ပတ်လျှင် လေ့ကျင့်ခန်း လုပ်သည့်အကြိမ်</label>
        <input type="number" name="exerciseFrequency" value={formData.exerciseFrequency} onChange={handleChange} />
      </div>
      
      <div className="form-group">
        <label>ရောဂါလက္ခဏာများ (ရှိရင် အမှတ်ခြစ်ပါ)</label>
        <div className="symptoms">
          {[
            { key: 'polyuria', label: 'ဆီးအလွန်အကျွံသွားခြင်း' },
            { key: 'polydipsia', label: 'ရေအလွန်အကျွံသောက်ခြင်း' },
            { key: 'polyphagia', label: 'အလွန်အကျွံဆာလောင်ခြင်း' },
            { key: 'weight_loss', label: 'ကိုယ်အလေးချိန် ရုတ်တရက်ကျခြင်း' },
            { key: 'fatigue', label: 'အားနည်းခြင်း' },
            { key: 'blurred_vision', label: 'အမြင်အာရုံဝေဝါးခြင်း' }
          ].map((s) => (
            <label key={s.key} className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.symptoms.includes(s.key)}
                onChange={() => handleSymptomChange(s.key)}
              />
              {s.label}
            </label>
          ))}
        </div>
      </div>
      
      <button type="submit" disabled={loading}>
        {loading ? 'စစ်ဆေးနေသည်...' : 'စစ်ဆေးမည်'}
      </button>
    </form>
  );
};

export default PredictionForm;