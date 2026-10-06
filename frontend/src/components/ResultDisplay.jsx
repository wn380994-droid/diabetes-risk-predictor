import React, { useState } from 'react';
import { exportToPDF } from '../utils/pdfExport';

const ResultDisplay = ({ result, onReset }) => {
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState('');

  if (!result) return null;
  
  const { predictionResult, recommendations } = result;
  const { riskPercentage, riskLevel } = predictionResult;
  
  const getRiskColor = () => {
    if (riskLevel === 'High') return '#e74c3c';
    if (riskLevel === 'Moderate') return '#f39c12';
    return '#27ae60';
  };
  
  const getRiskLabel = () => {
    if (riskLevel === 'High') return 'မြင့်မားသော အန္တရာယ်';
    if (riskLevel === 'Moderate') return 'အလယ်အလတ် အန္တရာယ်';
    return 'နည်းသော အန္တရာယ်';
  };

  const handleExportPDF = async () => {
    setExporting(true);
    setExportError('');
    
    const date = new Date().toISOString().slice(0, 10);
    const filename = `diabetes-report-${date}.pdf`;
    
    const success = await exportToPDF('pdf-content', filename);
    
    if (!success) {
      setExportError('PDF ထုတ်လို့ မရပါ။ ပြန်ကြိုးစားပါ။');
    }
    
    setExporting(false);
  };
  
  return (
    <div className="result-display">
      {/* PDF ထဲမှာ ပါမယ့် အပိုင်း */}
      <div id="pdf-content" className="pdf-content">
        <div className="pdf-header">
          <h1>🩺 ဆီးချိုရောဂါ ဖြစ်နိုင်ခြေ အစီရင်ခံစာ</h1>
          <p className="pdf-date">
            ထုတ်လုပ်သည့်ရက်စွဲ: {new Date().toLocaleString('en-GB')}
          </p>
        </div>

        <h2>စစ်ဆေးမှု ရလဒ်</h2>
        
        <div className="risk-circle" style={{ borderColor: getRiskColor() }}>
          <div className="risk-percentage" style={{ color: getRiskColor() }}>
            {riskPercentage}%
          </div>
          <div className="risk-label">{getRiskLabel()}</div>
        </div>

        <div className="patient-info">
          <h3>လူနာ အချက်အလက်</h3>
          <div className="info-grid">
            <div><strong>အသက်:</strong> {result.age} နှစ်</div>
            <div><strong>လိင်:</strong> {result.gender === 'male' ? 'အမျိုးသား' : 'အမျိုးသမီး'}</div>
            <div><strong>BMI:</strong> {result.bmi?.toFixed(1)}</div>
            <div><strong>ဂလူးကို့စ်:</strong> {result.glucose} mg/dL</div>
            <div><strong>သွေးဖိအား:</strong> {result.bloodPressure} mm Hg</div>
            <div><strong>အင်ဆူလင်:</strong> {result.insulin} mu U/ml</div>
            {result.hba1c && <div><strong>HbA1c:</strong> {result.hba1c}%</div>}
            <div><strong>စိတ်ဖိစီးမှု:</strong> {result.stressLevel}/10</div>
          </div>
        </div>
        
        <div className="recommendations">
          <h3>အကြံပြုချက်များ</h3>
          <ul>
            {recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
        
        <div className="disclaimer">
          <p>⚠️ ဤရလဒ်သည် ခန့်မှန်းချက်သာဖြစ်ပြီး ဆေးဘက်ဆိုင်ရာ အကြံဉာဏ်အဖြစ် မယူဆပါရန်။ ဆရာဝန်နှင့် တိုင်ပင်ပါ။</p>
        </div>
      </div>

      {/* ခလုတ်များ (PDF ထဲ မပါဘူး) */}
      <div className="result-actions">
        <button 
          onClick={handleExportPDF} 
          disabled={exporting}
          className="pdf-btn"
        >
          {exporting ? '⏳ PDF ထုတ်နေသည်...' : '📄 PDF Download'}
        </button>
        <button onClick={onReset} className="reset-btn">
          ပြန်စစ်ဆေးမည်
        </button>
      </div>

      {exportError && <div className="error">{exportError}</div>}
    </div>
  );
};

export default ResultDisplay;