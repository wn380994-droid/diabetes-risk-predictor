import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import {
  getAdminStats,
  getAdminUsers,
  deleteUser,
  updateUserRole,
  getAllPredictionsAdmin,
  getAdminChats
} from '../services/api';
import { useAuth } from '../context/AuthContext';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'dashboard') {
        const response = await getAdminStats();
        setStats(response.data);
      } else if (activeTab === 'users') {
        const response = await getAdminUsers();
        setUsers(response.data);
      } else if (activeTab === 'predictions') {
        const response = await getAllPredictionsAdmin();
        setPredictions(response.data);
      } else if (activeTab === 'chats') {
        const response = await getAdminChats();
        setChats(response.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id, name) => {
    if (!window.confirm(`"${name}" ရဲ့ အကောင့်နဲ့ ဒေတာအားလုံးကို ဖျက်မှာ သေချာလား?`)) return;
    try {
      await deleteUser(id);
      setUsers(users.filter(u => u._id !== id));
      alert('ဖျက်ပြီးပါပြီ');
    } catch (err) {
      alert(err.response?.data?.message || 'ဖျက်လို့ မရပါ');
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await updateUserRole(id, newRole);
      setUsers(users.map(u => u._id === id ? { ...u, role: newRole } : u));
      alert('Role ပြောင်းပြီးပါပြီ');
    } catch (err) {
      alert(err.response?.data?.message || 'ပြောင်းလို့ မရပါ');
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'predictions', label: 'Predictions', icon: '🩺' },
    { id: 'chats', label: 'Chats', icon: '💬' }
  ];

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>⚙️ Admin Dashboard</h1>
        <p>စနစ် တစ်ခုလုံး၏ စီမံခန့်ခွဲမှု</p>
        <Link to="/" className="back-btn">← ပင်မစာမျက်နှာ</Link>
      </header>

      <nav className="admin-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>

      {loading ? (
        <div className="loading">ဒေတာ ရယူနေသည်...</div>
      ) : (
        <>
          {activeTab === 'dashboard' && stats && <DashboardTab stats={stats} />}
          {activeTab === 'users' && (
            <UsersTab
              users={users}
              currentUserId={currentUser?._id}
              onDelete={handleDeleteUser}
              onRoleChange={handleRoleChange}
            />
          )}
          {activeTab === 'predictions' && <PredictionsTab predictions={predictions} />}
          {activeTab === 'chats' && <ChatsTab chats={chats} />}
        </>
      )}
    </div>
  );
};

/* ========== Dashboard Tab ========== */
const DashboardTab = ({ stats }) => (
  <div className="admin-content">
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon">👥</div>
        <div className="stat-value">{stats.totalUsers}</div>
        <div className="stat-label">စုစုပေါင်း User</div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">🩺</div>
        <div className="stat-value">{stats.totalPredictions}</div>
        <div className="stat-label">စစ်ဆေးမှု စုစုပေါင်း</div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">💬</div>
        <div className="stat-value">{stats.totalChats}</div>
        <div className="stat-label">Chat စုစုပေါင်း</div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">📅</div>
        <div className="stat-value">{stats.recentPredictions}</div>
        <div className="stat-label">၇ ရက်အတွင်း စစ်ဆေးမှု</div>
      </div>
    </div>

    <h3 className="admin-sub-heading">🎯 Risk Level အလိုက်</h3>
    <div className="risk-stats">
      <div className="risk-stat high">
        <div className="risk-stat-value">{stats.highRisk}</div>
        <div className="risk-stat-label">မြင့်မားသော အန္တရာယ်</div>
        <div className="risk-stat-bar" style={{ width: `${(stats.highRisk / stats.totalPredictions) * 100 || 0}%` }}></div>
      </div>
      <div className="risk-stat moderate">
        <div className="risk-stat-value">{stats.moderateRisk}</div>
        <div className="risk-stat-label">အလယ်အလတ်</div>
        <div className="risk-stat-bar" style={{ width: `${(stats.moderateRisk / stats.totalPredictions) * 100 || 0}%` }}></div>
      </div>
      <div className="risk-stat low">
        <div className="risk-stat-value">{stats.lowRisk}</div>
        <div className="risk-stat-label">နည်းသော အန္တရာယ်</div>
        <div className="risk-stat-bar" style={{ width: `${(stats.lowRisk / stats.totalPredictions) * 100 || 0}%` }}></div>
      </div>
    </div>

    <h3 className="admin-sub-heading">🆕 အသစ်ဆုံးအသုံးပြုသူများ</h3>
    <div className="recent-users">
      {stats.recentUsers.map((u) => (
        <div key={u._id} className="recent-user-item">
          <div className="user-avatar">{u.name?.charAt(0).toUpperCase()}</div>
          <div className="user-info-mini">
            <strong>{u.name}</strong>
            <small>{u.email}</small>
          </div>
          <div className={`role-badge ${u.role}`}>{u.role}</div>
          <div className="join-date">{format(new Date(u.createdAt), 'yyyy-MM-dd')}</div>
        </div>
      ))}
    </div>
  </div>
);

/* ========== Users Tab ========== */
const UsersTab = ({ users, currentUserId, onDelete, onRoleChange }) => (
  <div className="admin-content">
    <div className="admin-content-header">
      <h3>👥 User အားလုံး ({users.length} ယောက်)</h3>
    </div>

    <div className="users-table">
      <div className="users-row header">
        <div>နာမည်</div>
        <div>အီးမေးလ်</div>
        <div>Role</div>
        <div>ရက်စွဲ</div>
        <div>လုပ်ဆောင်ချက်</div>
      </div>

      {users.map((u) => {
        const isSelf = u._id === currentUserId;
        return (
          <div key={u._id} className="users-row">
            <div className="user-cell">
              <div className="user-avatar-small">{u.name?.charAt(0).toUpperCase()}</div>
              <span>{u.name} {isSelf && <small style={{ color: '#4facfe' }}>(သင်)</small>}</span>
            </div>
            <div className="email-cell">{u.email}</div>
            <div>
              {isSelf ? (
                <span className={`role-badge ${u.role}`}>{u.role}</span>
              ) : (
                <select
                  value={u.role}
                  onChange={(e) => onRoleChange(u._id, e.target.value)}
                  className="role-select"
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              )}
            </div>
            <div className="date-cell">
              {format(new Date(u.createdAt), 'yyyy-MM-dd')}
            </div>
            <div>
              {!isSelf && (
                <button
                  className="delete-user-btn"
                  onClick={() => onDelete(u._id, u.name)}
                >
                  🗑️ ဖျက်
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

/* ========== Predictions Tab ========== */
const PredictionsTab = ({ predictions }) => (
  <div className="admin-content">
    <div className="admin-content-header">
      <h3>🩺 ခန့်မှန်းချက် အားလုံး ({predictions.length})</h3>
    </div>

    {predictions.length === 0 ? (
      <p className="empty-text">ဒေတာ မရှိသေးပါ</p>
    ) : (
      <div className="admin-predictions-list">
        {predictions.map((p) => (
          <div key={p._id} className="admin-prediction-item">
            <div className="pred-user">
              <div className="user-avatar-small">
                {p.userId?.name?.charAt(0).toUpperCase() || '?'}
              </div>
              <div>
                <strong>{p.userId?.name || 'Unknown'}</strong>
                <small>{p.userId?.email || '-'}</small>
              </div>
            </div>
            <div className="pred-info">
              <span>အသက် {p.age}</span>
              <span>ဂလူးကို့စ် {p.glucose}</span>
              <span>BMI {p.bmi?.toFixed(1)}</span>
            </div>
            <div
              className="pred-risk-badge"
              style={{
                backgroundColor:
                  p.predictionResult?.riskLevel === 'High' ? '#e74c3c' :
                  p.predictionResult?.riskLevel === 'Moderate' ? '#f39c12' : '#27ae60'
              }}
            >
              {p.predictionResult?.riskPercentage?.toFixed(1)}%
            </div>
            <div className="pred-date">
              {format(new Date(p.createdAt), 'yyyy-MM-dd HH:mm')}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

/* ========== Chats Tab ========== */
const ChatsTab = ({ chats }) => (
  <div className="admin-content">
    <div className="admin-content-header">
      <h3>💬 Chat အားလုံး ({chats.length})</h3>
    </div>

    {chats.length === 0 ? (
      <p className="empty-text">ဒေတာ မရှိသေးပါ</p>
    ) : (
      <div className="admin-chats-list">
        {chats.map((c) => (
          <div key={c._id} className="admin-chat-item">
            <div className="chat-user">
              <div className="user-avatar-small">
                {c.userId?.name?.charAt(0).toUpperCase() || '?'}
              </div>
              <div>
                <strong>{c.userId?.name || 'Unknown'}</strong>
                <small>{c.userId?.email || '-'}</small>
              </div>
              <span className="chat-date">
                {format(new Date(c.createdAt), 'yyyy-MM-dd HH:mm')}
              </span>
            </div>
            <div className="chat-messages-admin">
              <div className="admin-msg user">
                <span className="msg-label">👤 User:</span>
                {c.userMessage}
              </div>
              <div className="admin-msg bot">
                <span className="msg-label">🤖 Bot:</span>
                {c.botMessage}
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default Admin;