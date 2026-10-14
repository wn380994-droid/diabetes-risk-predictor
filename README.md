# 🩺 AI-Powered Diabetes Risk Predictor

> AI နည်းပညာဖြင့် ဆီးချိုရောဂါ ဖြစ်နိုင်ခြေကို စောစီးစွာ သိရှိစေတဲ့ မြန်မာဘာသာ Web Application

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20-green.svg)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3.11-blue.svg)](https://python.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7-green.svg)](https://mongodb.com/)

---

## 📌 အကြောင်းအရာ

မြန်မာနိုင်ငံတွင် ဆီးချိုရောဂါ ဖြစ်ပွားမှု မြင့်တက်လာနေပြီး လူဦးရေ **၅၀% ခန့်သည်** ရောဂါ ရှိမှန်း မသိဘဲ နေထိုင်နေကြပါသည်။ ဤ Project သည် **Machine Learning** နှင့် **AI Chatbot** ကို အသုံးပြုပြီး လူတိုင်း အလွယ်တကူ ဆီးချိုရောဂါ ဖြစ်နိုင်ခြေကို စစ်ဆေးနိုင်စေရန် ရည်ရွယ်ပါသည်။

---

## ✨ Features

| # | Feature | ရှင်းလင်းချက် |
|---|---------|---------------|
| 1 | 🎯 **Risk Prediction** | ML Model ဖြင့် ဖြစ်နိုင်ခြေ % ခန့်မှန်း |
| 2 | 💬 **AI Chatbot** | ဆီးချိုအကြောင်း မြန်မာလို ဆွေးနွေးနိုင် |
| 3 | 📊 **Personal History** | ကိုယ်ပိုင် စစ်ဆေးမှု သမိုင်း ကြည့်နိုင် |
| 4 | 📚 **Educational Center** | ဆီးချိုအကြောင်း အသိပညာ ၆ မျိုး |
| 5 | 📄 **PDF Export** | ရလဒ်ကို PDF Download |
| 6 | ⚙️ **Admin Panel** | User/Data Management |
| 7 | 🔐 **Authentication** | JWT + bcrypt |
| 8 | 🌐 **100% မြန်မာလို** | Fully Localized |

---

## 🏗️ System Architecture
┌────────────────────────────────────────────┐
│ FRONTEND (React + Vite)                    │
│ Vercel Hosting                             │
└─────────────────┬──────────────────────────┘
                  │ HTTPS + JWT
                  ▼
┌────────────────────────────────────────────┐
│ BACKEND (Node.js + Express)                │
│ Render Hosting                             │
└────┬──────────────┬────────────────┬───────┘
     │              │                │
     ▼              ▼                ▼
┌─────────┐ ┌─────────────┐ ┌──────────────┐
│ MongoDB │ │ ML API      │ │ Sargalay     │
│ Atlas   │ │ (Python)    │ │ AI API       │
│         │ │ Flask+XGB   │ │ (Chatbot)    │
└─────────┘ └─────────────┘ └──────────────┘


---

## 🛠️ Technology Stack

### Frontend
- **React 19** — UI Framework
- **Vite** — Build Tool
- **React Router** — Navigation
- **Axios** — HTTP Client
- **jsPDF** — PDF Export
- **date-fns** — Date Formatting

### Backend
- **Node.js 20** — Runtime
- **Express 4** — Web Framework
- **Mongoose** — MongoDB ODM
- **JWT** — Authentication
- **bcryptjs** — Password Hashing

### ML Model
- **Python 3.11** — Language
- **Flask** — ML API Server
- **XGBoost** — ML Algorithm
- **Scikit-learn** — Preprocessing
- **Pandas / NumPy** — Data Manipulation

### Database & AI
- **MongoDB Atlas** — Cloud Database
- **Sargalay** — AI Chatbot Provider

---

## 📊 ML Model Details

### Dataset
- **PIMA Indians Diabetes Dataset**
- ၇၆၈ ယောက် လူနာ၊ ၈ ခု Feature

### Features
| Feature | Description |
|---------|-------------|
| Pregnancies | ကိုယ်ဝန်အကြိမ် |
| Glucose | သွေးတွင်းဂလူးကို့စ် |
| BloodPressure | သွေးဖိအား |
| SkinThickness | အရေပြားအထူ |
| Insulin | အင်ဆူလင် |
| BMI | ကိုယ်အလေးချိန် အညွှန်း |
| DiabetesPedigreeFunction | မျိုးရိုးရာဇီဝ |
| Age | အသက် |

### Performance
- **Accuracy**: ~75-80%
- **ROC-AUC**: ~0.80-0.85
- **Cross-Validation**: 5-fold
- **Algorithm**: XGBoost

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+
- Python 3.11+
- MongoDB (Local သို့မဟုတ် Atlas)

### 1. Clone Repository

```bash
git clone https://github.com/wn380994-droid/diabetes-risk-predictor.git
cd diabetes-risk-predictor


Backend Setup

cd backend
npm install

# .env ဖိုင် ဆောက်ပါ
cat > .env << 'EOF'
PORT=5000
MONGODB_URI=mongodb://localhost:27017/diabetes_db
ML_API_URL=http://127.0.0.1:8000
SARGALAY_API_KEY=your_sargalay_api_key
SARGALAY_BASE_URL=https://sargalay.com/api/v1
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
EOF

npm run dev


Frontend Setup

cd ../frontend
npm install
npm run dev


ML Model Setup

cd ../ml-model
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt

# Model Train
python train_model.py

# Flask API Run
python app.py

Access Application

Frontend: http://localhost:5173

Backend API: http://localhost:5000

ML API: http://localhost:8000

📁 Project Structure

diabetes-risk-predictor/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
├── ml-model/
│   ├── dataset/
│   ├── app.py
│   ├── train_model.py
│   ├── requirements.txt
│   └── diabetes_model.pkl
├── .gitignore
├── LICENSE
└── README.md

🌐 API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/auth/register	အကောင့်ဖွင့်
POST	/api/auth/login	Login
GET	/api/auth/me	User Info
Predictions
Method	Endpoint	Description
POST	/api/predictions	ခန့်မှန်းချက် အသစ်
GET	/api/predictions	ကိုယ်ပိုင် သမိုင်း
DELETE	/api/predictions/:id	ဖျက်
Chatbot
Method	Endpoint	Description
POST	/api/chat	AI ကို မေး
GET	/api/chat/history	ကိုယ်ပိုင် Chat History
Admin (Admin Only)
Method	Endpoint	Description
GET	/api/admin/stats	Dashboard Stats
GET	/api/admin/users	User အားလုံး
DELETE	/api/admin/users/:id	User ဖျက်
PUT	/api/admin/users/:id/role	Role ပြောင်း
🔒 Security Features
✅ JWT Authentication

✅ bcryptjs Password Hashing

✅ Protected Routes

✅ Role-Based Access Control (RBAC)

✅ Input Validation

✅ CORS Protection

✅ Environment Variables

🎯 Impact
ရည်မှန်းချက်	အကျိုးသက်ရောက်မှု
စောစီးစွာ သိရှိမှု	နောက်ဆက်တွဲ ဆိုးကျိုးများ လျှော့ချ
အခမဲ့ အသုံးပြုနိုင်မှု	ဝင်ငွေ မခွဲခြား
မြန်မာဘာသာ	နားလည်လွယ်
ပညာပေးစင်တာ	ကာကွယ်မှု မြှင့်တင်
🔮 Future Enhancements
📱 Mobile App (React Native)

🎙️ Voice Input (မြန်မာလို ပြောပြီး မေးနိုင်)

⌚ Wearable Integration (Smartwatch)

🏥 Hospital Integration

🌏 Myanmar Dataset

💊 Medicine Reminder

🤝 Contributing
Pull Requests တွေကို ကြိုဆိုပါတယ်။

Fork လုပ်ပါ

Feature Branch ဆောက်ပါ (git checkout -b feature/AmazingFeature)

Commit လုပ်ပါ (git commit -m 'Add some AmazingFeature')

Push လုပ်ပါ (git push origin feature/AmazingFeature)

Pull Request ဖွင့်ပါ

📝 License
ဤ Project ကို MIT License အောက်တွင် ဖြန့်ချိပါသည်။ အသေးစိတ်ကို LICENSE ဖိုင်တွင် ကြည့်ပါ။

👨‍💻 Author
Wai Lynn Naing

GitHub: wn380994-droid

Email: wn380994@gmail.com

🙏 Acknowledgments
PIMA Indians Diabetes Dataset — UCI ML Repository

XGBoost — ML Algorithm

Open Source Community — Libraries အားလုံး

⚠️ Disclaimer
ဤ Application သည် ပညာပေးရည်ရွယ်ချက် ဖြင့်သာ ဖန်တီးထားခြင်း ဖြစ်ပါသည်။ ရလဒ်များသည် ခန့်မှန်းချက်သာ ဖြစ်ပြီး ဆေးဘက်ဆိုင်ရာ အကြံဉာဏ်အဖြစ် မယူဆပါရန်။ တိကျသော ရောဂါရှာဖွေမှုအတွက် ဆရာဝန်နှင့် တိုင်ပင်ပါ။


🩺 မြန်မာနိုင်ငံအတွက် ❤️ ဖြင့် ဖန်တီးထားသည်

⭐ ဒီ Project ကို ကြိုက်ရင် Star လေးပေးပါ ⭐

