import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PredictionForm from '../components/PredictionForm';
import ResultDisplay from '../components/ResultDisplay';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [result, setResult] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="home">
      <header className="app-header">
        <div className="header-top">
          <div>
            <h1>🩺 ဆီးချိုရောဂါ ဖြစ်နိုင်ခြေ ခန့်မှန်းစနစ်</h1>
            <p className="welcome-text">မင်္ဂလာပါ, {user?.name} 👋</p>
          </div>
          <div className="header-actions">
            <Link to="/chatbot" className="action-link chatbot-link">
              💬 ဆွေးနွေးတိုင်ပင်ရန်
            </Link>
            <Link to="/history" className="action-link history-link">
              📊 သမိုင်း
            </Link>
            <Link to="/education" className="action-link education-link">
              📚 အသိပညာ
            </Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className="action-link admin-link">
                ⚙️ Admin
              </Link>
            )}
            <button onClick={handleLogout} className="logout-btn">
              ထွက်မည်
            </button>
          </div>
        </div>
      </header>
      
      {!result ? (
        <PredictionForm onResult={setResult} />
      ) : (
        <ResultDisplay result={result} onReset={() => setResult(null)} />
      )}
    </div>
  );
};

export default Home;