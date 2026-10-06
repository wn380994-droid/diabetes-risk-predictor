import React, { useState } from 'react';
import { sendChatMessage } from '../services/api';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await sendChatMessage(input);
      const botMessage = { text: response.message, sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { text: 'ချိတ်ဆက်မှု အဆင်မပြေဖြစ်နေပါတယ်။', sender: 'bot' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="chat-welcome">
            <p>💬 ဆီးချိုရောဂါအကြောင်း မေးမြန်းပါ</p>
            <div className="sample-questions">
              <button onClick={() => setInput('ဆီးချိုရောဂါ လက္ခဏာတွေက ဘာလဲ')}>ဆီးချိုရောဂါ လက္ခဏာများ</button>
              <button onClick={() => setInput('သွေးတွင်းသကြားဓာတ် ဘယ်လောက်ရှိရင် ဆီးချိုလို့ ခေါ်လဲ')}>သွေးတွင်းသကြားဓာတ်</button>
              <button onClick={() => setInput('ဆီးချိုရောဂါ ကာကွယ်ဖို့ ဘာစားသင့်လဲ')}>ကာကွယ်နည်း</button>
            </div>
          </div>
        )}
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>{msg.text}</div>
        ))}
        {loading && <div className="message bot">စဉ်းစားနေသည်...</div>}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="ဆီးချိုရောဂါအကြောင်း မေးပါ..."
        />
        <button onClick={handleSend} disabled={loading}>ပို့မည်</button>
      </div>
    </div>
  );
};

export default Chatbot;