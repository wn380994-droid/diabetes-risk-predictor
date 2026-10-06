import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
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

    try {
      const response = await loginUser(formData);
      login(response.data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login မအောင်မြင်ပါ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>🩺 ပြန်လည်ဝင်ရောက်ခြင်း</h1>
        <p className="auth-subtitle">သင့်အကောင့်ထဲ ပြန်ဝင်ပါ</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>အီးမေးလ်</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>စကားဝှက်</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'ဝင်ရောက်နေသည်...' : 'ဝင်မည်'}
          </button>
        </form>

        <p className="auth-switch">
          အကောင့်မရှိသေးဘူးလား? <Link to="/register">အကောင့်ဖွင့်ပါ</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;