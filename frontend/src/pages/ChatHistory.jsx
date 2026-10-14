import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { getChatHistory } from '../services/api';

const ChatHistory = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await getChatHistory();
      setChats(response.data);
    } catch (err) {
      setError('Chat History ရယူလို့ မရပါ။');
      console.error(err);
    } finally {
      setLoading(false);
    }
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
        <h1>💬 ကျွန်ုပ်၏ ဆွေးနွေးမှု သမိုင်း</h1>
        <p>စုစုပေါင်း {chats.length} ခု ဆွေးနွေးခဲ့သည်</p>
        <Link to="/chatbot" className="back-btn">← ဆွေးနွေးရန်</Link>
        <Link to="/" className="back-btn" style={{ marginLeft: '10px' }}>← ပင်မစာမျက်နှာ</Link>
      </header>

      {error && <div className="error">{error}</div>}

      {chats.length === 0 ? (
        <div className="empty-state">
          <p>ဆွေးနွေးမှု သမိုင်း မရှိသေးပါ။</p>
          <Link to="/chatbot">ဆွေးနွေးစတင်ရန် →</Link>
        </div>
      ) : (
        <div className="history-list">
          {chats.map((chat, index) => (
            <div key={chat._id} className="history-card chat-history-card">
              <div className="history-card-header">
                <div className="history-index">#{chats.length - index}</div>
                <div className="history-date">{formatDate(chat.createdAt)}</div>
              </div>
              <div className="chat-messages-user">
                <div className="admin-msg user">
                  <span className="msg-label">👤 သင်မေးခဲ့သည်:</span>
                  {chat.userMessage}
                </div>
                <div className="admin-msg bot">
                  <span className="msg-label">🤖 ဆီးချိုအကူအညီ:</span>
                  {chat.botMessage}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatHistory;