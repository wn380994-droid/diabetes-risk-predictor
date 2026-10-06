import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirm) {
      setError('စကားဝှက် နှစ်ခု တူညီရပါမည်');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('စကားဝှက် အနည်းဆုံး ၆ လုံး ရှိရပါမည်');
      setLoading(false);
      return;
    }

    try {
      const response = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      login(response.data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'အကောင့်ဖွင့် မအောင်မြင်ပါ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>🩺 အကောင့်အသစ်ဖွင့်ခြင်း</h1>
        <p className="auth-subtitle">သင့်ကျန်းမာရေး အချက်အလက်များကို လုံခြုံစွာ သိမ်းဆည်းပါ</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>နာမည်</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="သင့်နာမည်" required />
          </div>

          <div className="form-group">
            <label>အီးမေးလ်</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
          </div>

          <div className="form-group">
            <label>စကားဝှက်</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="အနည်းဆုံး ၆ လုံး" required />
          </div>

          <div className="form-group">
            <label>စကားဝှက် အတည်ပြုပါ</label>
            <input type="password" name="confirm" value={formData.confirm} onChange={handleChange} placeholder="စကားဝှက် ပြန်ထည့်ပါ" required />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'အကောင့်ဖွင့်နေသည်...' : 'အကောင့်ဖွင့်မည်'}
          </button>
        </form>

        <p className="auth-switch">
          အကောင့်ရှိပြီးသားလား? <Link to="/login">ဝင်ရောက်ပါ</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;