import React from 'react';
import { Link } from 'react-router-dom';
import Chatbot from '../components/Chatbot';

const ChatbotPage = () => {
  return (
    <div className="chatbot-page">
      <header className="history-header">
        <h1>💬 ဆွေးနွေးတိုင်ပင်ရန်</h1>
        <p>ဆီးချိုရောဂါအကြောင်း AI နှင့် ဆွေးနွေးပါ</p>
        <Link to="/" className="back-btn">← ပင်မစာမျက်နှာ</Link>
      </header>
      <Chatbot />
    </div>
  );
};

export default ChatbotPage;