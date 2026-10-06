import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { getAllPredictions, deletePrediction } from '../services/api';


const History = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await getAllPredictions();
      setPredictions(response.data);
    } catch (err) {
      setError('သမိုင်း ရယူလို့ မရပါ။ Backend run နေမနေ စစ်ပါ။');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id, e) => {
  e.stopPropagation();
  if (!window.confirm('ဒီမှတ်တမ်းကို ဖျက်မှာ သေချာလား?')) return;
  
  try {
    await deletePrediction(id);
    setPredictions(predictions.filter(p => p._id !== id));
    if (selected?._id === id) setSelected(null);
  } catch (err) {
    alert('ဖျက်လို့ မရပါ');
  }
};

  const getRiskColor = (level) => {
    if (level === 'High') return '#e74c3c';
    if (level === 'Moderate') return '#f39c12';
    return '#27ae60';
  };

  const getRiskLabel = (level) => {
    if (level === 'High') return 'မြင့်';
    if (level === 'Moderate') return 'အလယ်';
    return 'နည်း';
  };

  const formatDate = (dateStr) => {
    try {
      return format(new Date(dateStr), 'yyyy-MM-dd HH:mm');
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className="history-page">
        <div className="loading">ဒေတာ ရယူနေသည်...</div>
      </div>
    );
  }

  return (
    <div className="history-page">
      <header className="history-header">
        <h1>📊 ခန့်မှန်းချက် သမိုင်း</h1>
        <p>စုစုပေါင်း {predictions.length} ကြိမ် စစ်ဆေးခဲ့သည်</p>
        <Link to="/" className="back-btn">← ပင်မစာမျက်နှာ</Link>
      </header>

      {error && <div className="error">{error}</div>}

      {predictions.length === 0 ? (
        <div className="empty-state">
          <p>ခန့်မှန်းချက် သမိုင်း မရှိသေးပါ။</p>
          <Link to="/">စစ်ဆေးစတင်ရန် →</Link>
        </div>
      ) : (
        <div className="history-list">
          {predictions.map((item, index) => (
            <div 
              key={item._id} 
              className="history-card"
              onClick={() => setSelected(selected?._id === item._id ? null : item)}
            >
              <div className="history-card-header">
                <div className="history-index">#{predictions.length - index}</div>
                <button className="delete-btn" onClick={(e) => handleDelete(item._id, e)}>🗑️</button>
                <div className="history-date">
                  {formatDate(item.createdAt)}
                </div>
                <div 
                  className="history-risk-badge"
                  style={{ backgroundColor: getRiskColor(item.predictionResult?.riskLevel) }}
                >
                  {getRiskLabel(item.predictionResult?.riskLevel)}{' '}
                  {item.predictionResult?.riskPercentage?.toFixed(1)}%
                </div>
              </div>

              {selected?._id === item._id && (
                <div className="history-card-details">
                  <div className="detail-grid">
                    <div><strong>အသက်:</strong> {item.age}</div>
                    <div><strong>လိင်:</strong> {item.gender === 'male' ? 'အမျိုးသား' : 'အမျိုးသမီး'}</div>
                    <div><strong>BMI:</strong> {item.bmi?.toFixed(1)}</div>
                    <div><strong>ဂလူးကို့စ်:</strong> {item.glucose} mg/dL</div>
                    <div><strong>သွေးဖိအား:</strong> {item.bloodPressure} mm Hg</div>
                    <div><strong>အင်ဆူလင်:</strong> {item.insulin} mu U/ml</div>
                    {item.hba1c && <div><strong>HbA1c:</strong> {item.hba1c}%</div>}
                    <div><strong>စိတ်ဖိစီးမှု:</strong> {item.stressLevel}/10</div>
                  </div>

                  {item.recommendations && item.recommendations.length > 0 && (
                    <div className="detail-recommendations">
                      <strong>အကြံပြုချက်များ:</strong>
                      <ul>
                        {item.recommendations.map((rec, i) => (
                          <li key={i}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;