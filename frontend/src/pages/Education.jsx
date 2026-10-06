import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Education = () => {
  const [activeTab, setActiveTab] = useState('basics');

  const tabs = [
    { id: 'basics', label: 'အခြေခံအကြောင်း', icon: '📖' },
    { id: 'complications', label: 'နောက်ဆက်တွဲ', icon: '⚠️' },
    { id: 'food', label: 'အစားအသောက်', icon: '🍎' },
    { id: 'exercise', label: 'လေ့ကျင့်ခန်း', icon: '🏃' },
    { id: 'prevention', label: 'ကာကွယ်နည်း', icon: '🛡️' },
    { id: 'age', label: 'အသက်အလိုက်', icon: '👥' }
  ];

  return (
    <div className="education-page">
      {/* Hero Section */}
      <header className="edu-hero">
        <div className="edu-hero-content">
          <h1>📚 ဆီးချိုရောဂါ အသိပညာပေးစင်တာ</h1>
          <p>ဆီးချိုရောဂါအကြောင်း သိသင့်သမျှ အားလုံး ဒီနေရာမှာ</p>
        </div>
        <Link to="/" className="back-btn">← ပင်မစာမျက်နှာ</Link>
      </header>

      {/* Quick Stats */}
      <section className="edu-stats">
        <div className="edu-stat">
          <div className="edu-stat-icon">🌏</div>
          <div className="edu-stat-value">537M+</div>
          <div className="edu-stat-label">ကမ္ဘာတစ်ဝှမ်း ဆီးချိုလူနာ</div>
        </div>
        <div className="edu-stat">
          <div className="edu-stat-icon">🇲🇲</div>
          <div className="edu-stat-value">~10%</div>
          <div className="edu-stat-label">မြန်မာလူဦးရေ ဖြစ်နိုင်ခြေ</div>
        </div>
        <div className="edu-stat">
          <div className="edu-stat-icon">💊</div>
          <div className="edu-stat-value">90%</div>
          <div className="edu-stat-label">Type 2 ဖြစ်နိုင်ခြေ ကာကွယ်နိုင်</div>
        </div>
        <div className="edu-stat">
          <div className="edu-stat-icon">🩺</div>
          <div className="edu-stat-value">50%</div>
          <div className="edu-stat-label">ရောဂါမသိဘဲ ရှိနေသူ</div>
        </div>
      </section>

      {/* Tab Navigation */}
      <nav className="edu-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`edu-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Tab Content */}
      <div className="edu-content">
        {activeTab === 'basics' && <BasicsTab />}
        {activeTab === 'complications' && <ComplicationsTab />}
        {activeTab === 'food' && <FoodTab />}
        {activeTab === 'exercise' && <ExerciseTab />}
        {activeTab === 'prevention' && <PreventionTab />}
        {activeTab === 'age' && <AgeTab />}
      </div>

      <div className="edu-disclaimer">
        <p>⚠️ ဤအချက်အလက်များသည် ယေဘုယျ ပညာပေးရည်ရွယ်ချက်သာဖြစ်ပြီး ဆေးဘက်ဆိုင်ရာ အကြံဉာဏ်အဖြစ် မယူဆပါရန်။ ဆရာဝန်နှင့် တိုင်ပင်ပါ။</p>
      </div>
    </div>
  );
};

/* ========== Tab 1: အခြေခံအကြောင်း ========== */
const BasicsTab = () => (
  <div className="tab-content">
    <h2>📖 ဆီးချိုရောဂါ ဆိုတာ ဘာလဲ?</h2>
    <p className="tab-intro">
      ဆီးချိုရောဂါ (Diabetes Mellitus) ဆိုတာ ခန္ဓာကိုယ်မှာ အင်ဆူလင် (Insulin) ထုတ်လုပ်မှု နည်းပါးခြင်း
      သို့မဟုတ် အင်ဆူလင်ကို ကောင်းစွာ အသုံးမပြုနိုင်ခြင်းကြောင့် သွေးတွင်းသကြားဓာတ် (Glucose) မြင့်တက်နေတဲ့
      နာတာရှည်ရောဂါတစ်မျိုးဖြစ်ပါတယ်။
    </p>

    <div className="info-cards">
      <div className="info-card">
        <div className="info-card-icon">1️⃣</div>
        <h3>Type 1 ဆီးချို</h3>
        <p>ငယ်ရွယ်စဉ်မှာ ဖြစ်တတ်ပါတယ်။ ခန္ဓာကိုယ်က အင်ဆူလင် လုံးဝ မထုတ်နိုင်တော့ပါ။ အင်ဆူလင် ထိုးရပါတယ်။</p>
        <div className="info-card-stat">~5-10% လူနာ</div>
      </div>

      <div className="info-card">
        <div className="info-card-icon">2️⃣</div>
        <h3>Type 2 ဆီးချို</h3>
        <p>အသက်ကြီးသူတွေမှာ အဖြစ်များပါတယ်။ ခန္ဓာကိုယ်က အင်ဆူလင်ကို ကောင်းစွာ အသုံးမပြုနိုင်ပါ။ အဖြစ်အများဆုံး အမျိုးအစားပါ။</p>
        <div className="info-card-stat">~90% လူနာ</div>
      </div>

      <div className="info-card">
        <div className="info-card-icon">3️⃣</div>
        <h3>ကိုယ်ဝန်ဆောင် ဆီးချို</h3>
        <p>ကိုယ်ဝန်ဆောင်စဉ်မှာ ဖြစ်တတ်ပါတယ်။ ကလေးမွေးပြီးရင် ပြန်ကောင်းသွားနိုင်ပါတယ်။ ဒါပေမယ့် နောက်ပိုင်း Type 2 ဖြစ်နိုင်ခြေ မြင့်ပါတယ်။</p>
        <div className="info-card-stat">ကိုယ်ဝန်ဆောင် 2-10%</div>
      </div>
    </div>

    <h3 className="sub-heading">🔍 အဖြစ်များသော လက္ခဏာများ</h3>
    <div className="symptom-grid">
      <div className="symptom-item"><span>💧</span>ဆီးအလွန်အကျွံသွားခြင်း</div>
      <div className="symptom-item"><span>🥤</span>ရေအလွန်အကျွံသောက်ခြင်း</div>
      <div className="symptom-item"><span>🍽️</span>အလွန်အကျွံဆာလောင်ခြင်း</div>
      <div className="symptom-item"><span>⚖️</span>ကိုယ်အလေးချိန် ရုတ်တရက်ကျခြင်း</div>
      <div className="symptom-item"><span>😴</span>ပင်ပန်းနွမ်းနယ်ခြင်း</div>
      <div className="symptom-item"><span>👁️</span>အမြင်အာရုံ ဝေဝါးခြင်း</div>
      <div className="symptom-item"><span>🩹</span>အနာကျက်နှေးခြင်း</div>
      <div className="symptom-item"><span>🤲</span>လက်/ခြေ ထုံကျင်ခြင်း</div>
    </div>

    <h3 className="sub-heading">📊 အရေးကြီး အညွှန်းကိန်းများ</h3>
    <div className="metric-table">
      <div className="metric-row header">
        <div>အညွှန်းကိန်း</div>
        <div>ပုံမှန်</div>
        <div>ကြိုတင်သတိပေး</div>
        <div>ဆီးချို</div>
      </div>
      <div className="metric-row">
        <div>သွေးတွင်းသကြားဓာတ် (အစာမစားမီ)</div>
        <div className="good">&lt; 100</div>
        <div className="warn">100-125</div>
        <div className="bad">≥ 126</div>
      </div>
      <div className="metric-row">
        <div>HbA1c</div>
        <div className="good">&lt; 5.7%</div>
        <div className="warn">5.7-6.4%</div>
        <div className="bad">≥ 6.5%</div>
      </div>
      <div className="metric-row">
        <div>BMI</div>
        <div className="good">18.5-24.9</div>
        <div className="warn">25-29.9</div>
        <div className="bad">≥ 30</div>
      </div>
    </div>
  </div>
);

/* ========== Tab 2: နောက်ဆက်တွဲ ========== */
const ComplicationsTab = () => (
  <div className="tab-content">
    <h2>⚠️ ဆီးချိုရောဂါ၏ နောက်ဆက်တွဲ ဆိုးကျိုးများ</h2>
    <p className="tab-intro">
      ဆီးချိုရောဂါကို ထိန်းမထားနိုင်ရင် ခန္ဓာကိုယ် အင်္ဂါအစိတ်အပိုင်းများစွာကို ထိခိုက်နိုင်ပါတယ်။
      စောစီးစွာ သိရှိပြီး ထိန်းသိမ်းခြင်းဖြင့် ဒီနောက်ဆက်တွဲများကို ကာကွယ်နိုင်ပါတယ်။
    </p>

    <div className="complication-grid">
      <div className="complication-card">
        <div className="comp-icon">❤️</div>
        <h3>နှလုံးရောဂါ</h3>
        <p>နှလုံးဖောက်ခြင်း၊ လေဖြတ်ခြင်း ဖြစ်နိုင်ခြေ ၂-၄ ဆ မြင့်မားပါတယ်။</p>
      </div>

      <div className="complication-card">
        <div className="comp-icon">🫘</div>
        <h3>ကျောက်ကပ်ပျက်စီးခြင်း</h3>
        <p>ကျောက်ကပ်၏ သွေးကြောငယ်များ ပျက်စီးပြီး ကျောက်ကပ် အားနည်းလာပါတယ်။</p>
      </div>

      <div className="complication-card">
        <div className="comp-icon">👁️</div>
        <h3>မျက်စိပျက်စီးခြင်း</h3>
        <p>Retinopathy ဖြစ်ပြီး အမြင်အာရုံ ဆုံးရှုံးနိုင်ပါတယ်။ အဖြစ်အများဆုံး အကြောင်းရင်းတစ်ခုပါ။</p>
      </div>

      <div className="complication-card">
        <div className="comp-icon">🦶</div>
        <h3>ခြေထောက် အနာ</h3>
        <p>သွေးလည်ပတ်မှု အားနည်းပြီး အနာကျက်နှေးခြင်း။ ပြင်းထန်ရင် ခြေထောက် ဖြတ်ရနိုင်ပါတယ်။</p>
      </div>

      <div className="complication-card">
        <div className="comp-icon">🧠</div>
        <h3>အာရုံကြော ပျက်စီးခြင်း</h3>
        <p>လက်/ခြေ ထုံကျင်ခြင်း၊ ပူလောင်ခြင်း၊ အာရုံခံစားမှု လျော့နည်းခြင်း။</p>
      </div>

      <div className="complication-card">
        <div className="comp-icon">🦷</div>
        <h3>သွားဖုံး ရောဂါ</h3>
        <p>သွားဖုံးရောင်၊ သွားကျွတ်ခြင်း ဖြစ်နိုင်ခြေ မြင့်မားပါတယ်။</p>
      </div>

      <div className="complication-card">
        <div className="comp-icon">🧠</div>
        <h3>မှတ်ဉာဏ် ချို့ယွင်းခြင်း</h3>
        <p>အယ်လ်ဇိုင်းမား ဖြစ်နိုင်ခြေ မြင့်မားလာပါတယ်။</p>
      </div>

      <div className="complication-card">
        <div className="comp-icon">😔</div>
        <h3>စိတ်ကျရောဂါ</h3>
        <p>ဆီးချိုလူနာ ၂၅% လောက်မှာ စိတ်ကျရောဂါ ခံစားရတတ်ပါတယ်။</p>
      </div>
    </div>
  </div>
);

/* ========== Tab 3: အစားအသောက် ========== */
const FoodTab = () => (
  <div className="tab-content">
    <h2>🍎 ဆီးချိုအတွက် အစားအသောက် လမ်းညွှန်</h2>
    <p className="tab-intro">
      မှန်ကန်တဲ့ အစားအသောက်ပုံစံက သွေးတွင်းသကြားဓာတ်ကို ထိန်းသိမ်းဖို့ အဓိကပါ။
    </p>

    <h3 className="sub-heading good-heading">✅ စားသင့်သော အစားအစာများ</h3>
    <div className="food-grid">
      <div className="food-card good">
        <div className="food-icon">🥬</div>
        <h4>အစိမ်းရောင် ဟင်းသီးဟင်းရွက်</h4>
        <p>ကန်စွန်းရွက်၊ ဂေါ်ဖီ၊ ပဲသီး — သကြားနည်း၊ အမျှင်ဓာတ်မြင့်</p>
      </div>
      <div className="food-card good">
        <div className="food-icon">🍚</div>
        <h4>အညိုရောင် ဆန်/ဂျုံ</h4>
        <p>Brown Rice, Oats, လုံးတီးဂျုံ — သကြားထိန်းသိမ်းပေးတယ်</p>
      </div>
      <div className="food-card good">
        <div className="food-icon">🐟</div>
        <h4>ငါး/အသားပိန်စား</h4>
        <p>ဆယ်လ်မွန်၊ ကြက်ရင်ပုံ၊ ပဲအမျိုးမျိုး — ပရိုတိန်းမြင့်၊ အဆီနည်း</p>
      </div>
      <div className="food-card good">
        <div className="food-icon">🥑</div>
        <h4>ကောင်းသော အဆီ</h4>
        <p>ထောပတ်သီး၊ သံလွင်၊ နှမ်း — နှလုံးကျန်းမာရေးအတွက်</p>
      </div>
      <div className="food-card good">
        <div className="food-icon">🍓</div>
        <h4>သကြားနည်း သစ်သီး</h4>
        <p>စပျစ်သီး၊ စတော်ဘယ်ရီ၊ ပန်းသီး — ဓာတ်တိုးဆန့်ကျင်ပစ္စည်းများ</p>
      </div>
      <div className="food-card good">
        <div className="food-icon">🥛</div>
        <h4>အဆီနည်း နို့ထွက်ပစ္စည်း</h4>
        <p>ဒိန်ချဉ်၊ နို့ — ကယ်လ်ဆီယမ်နဲ့ ပရိုတိန်း</p>
      </div>
    </div>

    <h3 className="sub-heading bad-heading">❌ ရှောင်သင့်သော အစားအစာများ</h3>
    <div className="food-grid">
      <div className="food-card bad">
        <div className="food-icon">🍰</div>
        <h4>အချိုပွဲများ</h4>
        <p>ကိတ်၊ ချောကလက်၊ သကြားလုံး — သကြားမြင့်မား</p>
      </div>
      <div className="food-card bad">
        <div className="food-icon">🥤</div>
        <h4>အချိုရည်များ</h4>
        <p>Coke, Pepsi, လက်ဖက်ရည် (အချိုများ) — သကြားအလွန်များ</p>
      </div>
      <div className="food-card bad">
        <div className="food-icon">🍟</div>
        <h4>အဆီများ အစားအစာ</h4>
        <p>ကြော်စာ၊ Fast Food — ကိုယ်အလေးချိန် တက်စေ</p>
      </div>
      <div className="food-card bad">
        <div className="food-icon">🍚</div>
        <h4>ဆန် ဖြူ အလွန်အကျွံ</h4>
        <p>ဆန် ဖြူအလွန်အကျွံစားရင် သကြားဓာတ် မြန်မြန်တက်</p>
      </div>
      <div className="food-card bad">
        <div className="food-icon">🧂</div>
        <h4>ဆား အလွန်များ</h4>
        <p>ငါးပိ၊ ငါးခြောက် — သွေးတိုးနဲ့ နှလုံးရောဂါ ဖြစ်စေ</p>
      </div>
      <div className="food-card bad">
        <div className="food-icon">🍺</div>
        <h4>အရက်/ဘီယာ</h4>
        <p>သကြားဓာတ် မထိန်းနိုင်၊ အာရုံကြောပျက်စီး</p>
      </div>
    </div>

    <div className="tip-box">
      <h4>💡 အစားအသောက် စည်းမျဉ်း ၅ ချက်</h4>
      <ol>
        <li>အစာကို အချိန်မှန် စားပါ (တစ်နေ့ ၃ ကြိမ် + အဆာပြေ ၂ ကြိမ်)</li>
        <li>ပန်းကန်တစ်ဝက်ကို ဟင်းသီးဟင်းရွက် ထည့်ပါ</li>
        <li>အစာစားတဲ့အခါ ဖြည်းဖြည်းချင်း စားပါ</li>
        <li>ရေများများ သောက်ပါ (တစ်နေ့ ၈-၁၀ ဖန်ခွက်)</li>
        <li>အစားအသောက် Diary ရေးပါ</li>
      </ol>
    </div>
  </div>
);

/* ========== Tab 4: လေ့ကျင့်ခန်း ========== */
const ExerciseTab = () => (
  <div className="tab-content">
    <h2>🏃 ဆီးချိုအတွက် လေ့ကျင့်ခန်း လမ်းညွှန်</h2>
    <p className="tab-intro">
      လေ့ကျင့်ခန်း ပုံမှန်လုပ်ခြင်းက သွေးတွင်းသကြားဓာတ်ကို ထိန်းသိမ်းပေးပြီး အင်ဆူလင် အာနိသင် တိုးစေပါတယ်။
    </p>

    <div className="exercise-grid">
      <div className="exercise-card">
        <div className="ex-icon">🚶</div>
        <h3>လမ်းလျှောက်ခြင်း</h3>
        <div className="ex-detail">
          <div><strong>ကြာချိန်:</strong> ၃၀-၄၅ မိနစ်</div>
          <div><strong>အကြိမ်:</strong> တစ်ပတ် ၅ ကြိမ်</div>
          <div><strong>အကျိုး:</strong> သကြားဓာတ် ၂၀-၃၀% ကျစေ</div>
        </div>
        <div className="ex-level easy">အလွယ်</div>
      </div>

      <div className="exercise-card">
        <div className="ex-icon">🏊</div>
        <h3>ရေကူးခြင်း</h3>
        <div className="ex-detail">
          <div><strong>ကြာချိန်:</strong> ၂၀-၃၀ မိနစ်</div>
          <div><strong>အကြိမ်:</strong> တစ်ပတ် ၃ ကြိမ်</div>
          <div><strong>အကျိုး:</strong> အဆစ်အမြစ် မထိခိုက်</div>
        </div>
        <div className="ex-level medium">အလယ်</div>
      </div>

      <div className="exercise-card">
        <div className="ex-icon">🚴</div>
        <h3>စက်ဘီးစီးခြင်း</h3>
        <div className="ex-detail">
          <div><strong>ကြာချိန်:</strong> ၃၀ မိနစ်</div>
          <div><strong>အကြိမ်:</strong> တစ်ပတ် ၄ ကြိမ်</div>
          <div><strong>အကျိုး:</strong> ခြေထောက်ကြွက်သား သန်စွမ်း</div>
        </div>
        <div className="ex-level medium">အလယ်</div>
      </div>

      <div className="exercise-card">
        <div className="ex-icon">🧘</div>
        <h3>တရားထိုင်ခြင်း/ယောဂ</h3>
        <div className="ex-detail">
          <div><strong>ကြာချိန်:</strong> ၁၅-၂၀ မိနစ်</div>
          <div><strong>အကြိမ်:</strong> နေ့စဉ်</div>
          <div><strong>အကျိုး:</strong> စိတ်ဖိစီးမှု လျှော့ချ</div>
        </div>
        <div className="ex-level easy">အလွယ်</div>
      </div>

      <div className="exercise-card">
        <div className="ex-icon">💪</div>
        <h3>အလေးမခြင်း</h3>
        <div className="ex-detail">
          <div><strong>ကြာချိန်:</strong> ၂၀-၃၀ မိနစ်</div>
          <div><strong>အကြိမ်:</strong> တစ်ပတ် ၂-၃ ကြိမ်</div>
          <div><strong>အကျိုး:</strong> ကြွက်သား တိုးပြီး သကြားဓာတ် စားသုံး</div>
        </div>
        <div className="ex-level hard">ခက်</div>
      </div>

      <div className="exercise-card">
        <div className="ex-icon">🤸</div>
        <h3>Stretching</h3>
        <div className="ex-detail">
          <div><strong>ကြာချိန်:</strong> ၁၀ မိနစ်</div>
          <div><strong>အကြိမ်:</strong> နေ့စဉ်</div>
          <div><strong>အကျိုး:</strong> ခန္ဓာကိုယ် ပြောင်းလွယ်</div>
        </div>
        <div className="ex-level easy">အလွယ်</div>
      </div>
    </div>

    <div className="tip-box warning">
      <h4>⚠️ လေ့ကျင့်ခန်း လုပ်တဲ့အခါ သတိထားရမယ့်အချက်</h4>
      <ul>
        <li>လေ့ကျင့်ခန်း မလုပ်ခင် သွေးတွင်းသကြားဓာတ် တိုင်းပါ</li>
        <li>သကြားဓာတ် ၁၀၀ အောက်ရင် အဆာပြေ စားပြီးမှ လုပ်ပါ</li>
        <li>သကြားဓာတ် ၂၅၀ အထက်ရင် လေ့ကျင့်ခန်း မလုပ်ပါနဲ့</li>
        <li>ရေဓာတ် ပြည့်ဝအောင် သောက်ပါ</li>
        <li>ခြေထောက် အနာ ရှိရင် ဂရုစိုက်ပါ</li>
        <li>ခေါင်းမူး၊ ရင်တုန်ရင် ချက်ချင်းရပ်ပါ</li>
      </ul>
    </div>
  </div>
);

/* ========== Tab 5: ကာကွယ်နည်း ========== */
const PreventionTab = () => (
  <div className="tab-content">
    <h2>🛡️ ဆီးချိုရောဂါ ကာကွယ်နည်း ၇ ချက်</h2>
    <p className="tab-intro">
      Type 2 ဆီးချိုရောဂါကို ၉၀% အထိ ကာကွယ်နိုင်ပါတယ်။ ရိုးရှင်းတဲ့ နေထိုင်မှုပုံစံ ပြောင်းလဲမှုတွေနဲ့
      ကာကွယ်နိုင်ပါတယ်။
    </p>

    <div className="prevention-list">
      <div className="prevention-item">
        <div className="prev-num">1</div>
        <div className="prev-content">
          <h3>ကိုယ်အလေးချိန် ထိန်းသိမ်းပါ</h3>
          <p>ကိုယ်အလေးချိန် ၅-၇% လျှော့ချခြင်းက ဆီးချိုဖြစ်နိုင်ခြေကို ၅၈% လျှော့ချနိုင်ပါတယ်။</p>
        </div>
      </div>

      <div className="prevention-item">
        <div className="prev-num">2</div>
        <div className="prev-content">
          <h3>လေ့ကျင့်ခန်း ပုံမှန်လုပ်ပါ</h3>
          <p>တစ်ပတ်လျှင် အနည်းဆုံး ၁၅၀ မိနစ် (တစ်နေ့ ၃၀ မိနစ် × ၅ ကြိမ်) လုပ်ပါ။</p>
        </div>
      </div>

      <div className="prevention-item">
        <div className="prev-num">3</div>
        <div className="prev-content">
          <h3>အမျှင်ဓာတ် များများစားပါ</h3>
          <p>ဟင်းသီးဟင်းရွက်၊ သစ်သီး၊ အစေ့အဆန်များ နေ့စဉ် စားပါ။</p>
        </div>
      </div>

      <div className="prevention-item">
        <div className="prev-num">4</div>
        <div className="prev-content">
          <h3>အချိုရည် ရှောင်ပါ</h3>
          <p>အချိုရည်တွေက သကြားဓာတ်ကို လျင်မြန်စွာ တက်စေပါတယ်။ ရေကို အစားထိုးသောက်ပါ။</p>
        </div>
      </div>

      <div className="prevention-item">
        <div className="prev-num">5</div>
        <div className="prev-content">
          <h3>ဆေးလိပ် မသောက်ပါနဲ့</h3>
          <p>ဆေးလိပ်သောက်ခြင်းက ဆီးချိုဖြစ်နိုင်ခြေကို ၄၄% တိုးစေပါတယ်။</p>
        </div>
      </div>

      <div className="prevention-item">
        <div className="prev-num">6</div>
        <div className="prev-content">
          <h3>အိပ်ရေးဝဝ် အိပ်ပါ</h3>
          <p>တစ်ည ၇-၈ နာရီ အိပ်ပါ။ အိပ်ရေးပျက်ခြင်းက အင်ဆူလင် အာနိသင် လျော့စေတယ်။</p>
        </div>
      </div>

      <div className="prevention-item">
        <div className="prev-num">7</div>
        <div className="prev-content">
          <h3>ပုံမှန် စစ်ဆေးပါ</h3>
          <p>အသက် ၄၅ နှစ်အထက် လူတိုင်း တစ်နှစ်တစ်ခါ သွေးတွင်းသကြားဓာတ် စစ်ဆေးပါ။</p>
        </div>
      </div>
    </div>

    <div className="tip-box success">
      <h4>🎯 ရည်မှန်းချက် (Target)</h4>
      <div className="target-grid">
        <div className="target-item">
          <div className="target-label">သွေးတွင်းသကြားဓာတ်</div>
          <div className="target-value">&lt; 100 mg/dL</div>
        </div>
        <div className="target-item">
          <div className="target-label">HbA1c</div>
          <div className="target-value">&lt; 5.7%</div>
        </div>
        <div className="target-item">
          <div className="target-label">သွေးဖိအား</div>
          <div className="target-value">&lt; 120/80</div>
        </div>
        <div className="target-item">
          <div className="target-label">BMI</div>
          <div className="target-value">18.5-24.9</div>
        </div>
      </div>
    </div>
  </div>
);

/* ========== Tab 6: အသက်အလိုက် ========== */
const AgeTab = () => (
  <div className="tab-content">
    <h2>👥 အသက်အလိုက် အကြံပြုချက်များ</h2>
    <p className="tab-intro">
      အသက်အရွယ်အလိုက် ဆီးချိုဖြစ်နိုင်ခြေနဲ့ ကာကွယ်နည်းတွေ မတူညီပါဘူး။
    </p>

    <div className="age-cards">
      <div className="age-card">
        <div className="age-badge">20-30 နှစ်</div>
        <div className="age-icon">🌱</div>
        <h3>ငယ်ရွယ်စဉ် ကာကွယ်ခြင်း</h3>
        <div className="age-risk low">ဖြစ်နိုင်ခြေ: နည်း</div>
        <ul>
          <li>ကျန်းမာတဲ့ နေထိုင်မှုပုံစံ စတင်တည်ဆောက်ပါ</li>
          <li>ကိုယ်အလေးချိန် ထိန်းပါ (BMI 18.5-24.9)</li>
          <li>အားကစား ပုံမှန်လုပ်ပါ</li>
          <li>Fast Food ရှောင်ပါ</li>
          <li>မိသားစုရာဇီဝ သိထားပါ</li>
        </ul>
      </div>

      <div className="age-card">
        <div className="age-badge">30-45 နှစ်</div>
        <div className="age-icon">🌿</div>
        <h3>အလုပ်များချိန် ထိန်းသိမ်းခြင်း</h3>
        <div className="age-risk medium">ဖြစ်နိုင်ခြေ: အလယ်</div>
        <ul>
          <li>စိတ်ဖိစီးမှု စီမံခန့်ခွဲပါ</li>
          <li>အစားအသောက် ပုံမှန်စားပါ</li>
          <li>အိပ်ရေးဝဝ် အိပ်ပါ</li>
          <li>ဆေးလိပ်/အရက် ရှောင်ပါ</li>
          <li>၂ နှစ်တစ်ခါ သွေးစစ်ပါ</li>
        </ul>
      </div>

      <div className="age-card">
        <div className="age-badge">45-60 နှစ်</div>
        <div className="age-icon">🌳</div>
        <h3>အန္တရာယ် မြင့်မားချိန်</h3>
        <div className="age-risk high">ဖြစ်နိုင်ခြေ: မြင့်</div>
        <ul>
          <li>တစ်နှစ်တစ်ခါ သွေးစစ်ပါ (HbA1c + Glucose)</li>
          <li>သွေးဖိအား၊ ကိုလက်စထရော စစ်ပါ</li>
          <li>ကိုယ်အလေးချိန် ထိန်းပါ</li>
          <li>ဟင်းသီးဟင်းရွက် များများစားပါ</li>
          <li>လမ်းလျှောက်ခြင်း နေ့စဉ်လုပ်ပါ</li>
        </ul>
      </div>

      <div className="age-card">
        <div className="age-badge">60+ နှစ်</div>
        <div className="age-icon">🌲</div>
        <h3>ထိန်းသိမ်းစောင့်ရှောက်ခြင်း</h3>
        <div className="age-risk high">ဖြစ်နိုင်ခြေ: အလွန်မြင့်</div>
        <ul>
          <li>ဆေးစစ်မှု ပုံမှန်လုပ်ပါ</li>
          <li>ဆရာဝန် ညွှန်ကြားချက်အတိုင်း လိုက်နာပါ</li>
          <li>ခြေထောက် ဂရုစိုက်ပါ</li>
          <li>မျက်စိ ပုံမှန်စစ်ပါ</li>
          <li>လှုပ်ရှားမှု မရပ်ပါနဲ့</li>
        </ul>
      </div>
    </div>
  </div>
);

export default Education;