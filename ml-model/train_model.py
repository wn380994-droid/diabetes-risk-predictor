import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score, classification_report, confusion_matrix,
    roc_auc_score, roc_curve
)
from xgboost import XGBClassifier
import joblib
import os

# ==========================================
# ၁။ ဒေတာ ဖတ်ခြင်း
# ==========================================
print("=" * 60)
print("📂 STEP 1: ဒေတာ ဖတ်နေသည်...")
print("=" * 60)
data_path = os.path.join('dataset', 'diabetes.csv')
df = pd.read_csv(data_path)
print(f"✅ ဒေတာ {len(df)} ကြောင်း ဖတ်ပြီးပါပြီ")
print(f"📊 Columns: {list(df.columns)}")

# ==========================================
# ၂။ ဒေတာ သန့်ရှင်းရေး
# ==========================================
print("\n" + "=" * 60)
print("🧹 STEP 2: ဒေတာ သန့်ရှင်းရေး လုပ်နေသည်...")
print("=" * 60)

zero_columns = ['Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI']
df[zero_columns] = df[zero_columns].replace(0, np.nan)

for col in zero_columns:
    df[col] = df[col].fillna(df[col].median())

print(f"✅ ပျောက်နေတဲ့ ဒေတာ အားလုံး ဖြည့်ပြီးပါပြီ")

# ==========================================
# ၃။ Feature နဲ့ Target ခွဲခြင်း
# ==========================================
print("\n" + "=" * 60)
print("🎯 STEP 3: Feature နဲ့ Target ခွဲခြင်း")
print("=" * 60)
X = df.drop('Outcome', axis=1)
y = df['Outcome']

print(f"📊 Features: {list(X.columns)}")
print(f"⚖️ Class Distribution:")
print(y.value_counts())
print(f"📈 Imbalance Ratio: {y.value_counts()[0] / y.value_counts()[1]:.2f}")

# Class Imbalance အတွက် scale_pos_weight တွက်ခြင်း
scale_pos_weight_value = y.value_counts()[0] / y.value_counts()[1]
print(f"⚖️ scale_pos_weight = {scale_pos_weight_value:.2f}")

# ==========================================
# ၄။ Train/Test Split
# ==========================================
print("\n" + "=" * 60)
print("✂️ STEP 4: Train/Test Split")
print("=" * 60)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
print(f"📚 Training set: {len(X_train)} ကြောင်း")
print(f"📝 Testing set: {len(X_test)} ကြောင်း")

# ==========================================
# ၅။ Feature Scaling (Logistic Regression အတွက်သာ)
# ==========================================
print("\n" + "=" * 60)
print("📏 STEP 5: Feature Scaling")
print("=" * 60)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
print("✅ Scaler fit ပြီးပါပြီ")

# ==========================================
# ၆။ Baseline Models နှိုင်းယှဉ်ခြင်း
# ==========================================
print("\n" + "=" * 60)
print("🤖 STEP 6: Baseline Models လေ့ကျင့်နေသည်...")
print("=" * 60)

baseline_models = {
    'Logistic Regression': LogisticRegression(
        max_iter=1000, random_state=42,
        class_weight='balanced'  # Class imbalance ကိုင်တွယ်မှု
    ),
    'Random Forest': RandomForestClassifier(
        n_estimators=100, random_state=42,
        class_weight='balanced'  # Class imbalance ကိုင်တွယ်မှု
    ),
    'XGBoost': XGBClassifier(
        n_estimators=100, random_state=42,
        eval_metric='logloss',
        scale_pos_weight=scale_pos_weight_value  # Class imbalance ကိုင်တွယ်မှု
    )
}

results = {}
for name, model in baseline_models.items():
    # XGBoost/RF တို့က scaled မလိုဘူး
    if name == 'Logistic Regression':
        model.fit(X_train_scaled, y_train)
        y_pred = model.predict(X_test_scaled)
        y_prob = model.predict_proba(X_test_scaled)[:, 1]
    else:
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)
        y_prob = model.predict_proba(X_test)[:, 1]
    
    acc = accuracy_score(y_test, y_pred)
    auc = roc_auc_score(y_test, y_prob)
    results[name] = {'accuracy': acc, 'auc': auc}
    
    print(f"\n📊 {name}:")
    print(f"   Accuracy: {acc*100:.2f}%")
    print(f"   ROC-AUC:  {auc:.4f}")

# ==========================================
# ၇။ GridSearchCV — XGBoost အတွက် Hyperparameter Tuning
# ==========================================
print("\n" + "=" * 60)
print("🔍 STEP 7: GridSearchCV နဲ့ XGBoost Tuning လုပ်နေသည်...")
print("⏳ ဒီအဆင့်က ၂-၅ မိနစ်လောက် ကြာနိုင်ပါတယ်...")
print("=" * 60)

param_grid = {
    'n_estimators': [100, 200, 300],
    'max_depth': [3, 5, 7],
    'learning_rate': [0.05, 0.1],
    'subsample': [0.8, 1.0],
    'colsample_bytree': [0.8, 1.0]
}

xgb_base = XGBClassifier(
    random_state=42,
    eval_metric='logloss',
    scale_pos_weight=scale_pos_weight_value
)

grid_search = GridSearchCV(
    estimator=xgb_base,
    param_grid=param_grid,
    cv=5,
    scoring='roc_auc',  # ROC-AUC က accuracy ထက် ပိုကောင်းတဲ့ metric
    n_jobs=-1,
    verbose=1
)

grid_search.fit(X_train, y_train)

print("\n" + "=" * 60)
print("🏆 STEP 7 Result: Best Parameters")
print("=" * 60)
print(f"Best params: {grid_search.best_params_}")
print(f"Best CV AUC: {grid_search.best_score_:.4f}")

# ==========================================
# ၈။ Best Model ကို Test Set မှာ စမ်းသပ်ခြင်း
# ==========================================
print("\n" + "=" * 60)
print("📊 STEP 8: Best Model ကို Test Set မှာ စမ်းသပ်ခြင်း")
print("=" * 60)

best_model = grid_search.best_estimator_
y_pred_best = best_model.predict(X_test)
y_prob_best = best_model.predict_proba(X_test)[:, 1]

best_acc = accuracy_score(y_test, y_pred_best)
best_auc = roc_auc_score(y_test, y_prob_best)

print(f"🎯 Test Accuracy: {best_acc*100:.2f}%")
print(f"📈 Test ROC-AUC:  {best_auc:.4f}")

# ==========================================
# ၉။ အကောင်းဆုံး မော်ဒယ်ကို သိမ်းခြင်း
# ==========================================
print("\n" + "=" * 60)
print("💾 STEP 9: Model သိမ်းနေသည်...")
print("=" * 60)

joblib.dump(best_model, 'diabetes_model.pkl')
joblib.dump(scaler, 'scaler.pkl')
joblib.dump(list(X.columns), 'features.pkl')

print("✅ diabetes_model.pkl — သိမ်းပြီး")
print("✅ scaler.pkl — သိမ်းပြီး")
print("✅ features.pkl — သိမ်းပြီး")
print(f"ℹ️ Model Type: {type(best_model).__name__}")
print(f"ℹ️ Scaling လိုအပ်/မလိုအပ်: False (Tree-based model)")

# ==========================================
# ၁၀။ အသေးစိတ် Report
# ==========================================
print("\n" + "=" * 60)
print("📋 STEP 10: အသေးစိတ် Report")
print("=" * 60)

print("\n📋 Classification Report:")
print(classification_report(y_test, y_pred_best,
      target_names=['မရှိ (0)', 'ရှိ (1)']))

print("\n📋 Confusion Matrix:")
cm = confusion_matrix(y_test, y_pred_best)
print(cm)
print(f"\n   True Negative:  {cm[0][0]}")
print(f"   False Positive: {cm[0][1]}")
print(f"   False Negative: {cm[1][0]}")
print(f"   True Positive:  {cm[1][1]}")

# Feature Importance
if hasattr(best_model, 'feature_importances_'):
    print("\n🔍 Feature Importance (အမြင့်ဆုံးမှ အနိမ့်ဆုံး):")
    importances = best_model.feature_importances_
    for feat, imp in sorted(zip(X.columns, importances),
                            key=lambda x: x[1], reverse=True):
        bar = '█' * int(imp * 50)
        print(f"   {feat:30s} {imp:.4f}  {bar}")

# ==========================================
# ၁၁။ Cross-Validation Score
# ==========================================
print("\n" + "=" * 60)
print("🔁 STEP 11: Cross-Validation (5-fold)")
print("=" * 60)
cv_scores = cross_val_score(best_model, X_train, y_train, cv=5, scoring='roc_auc')
print(f"CV AUC Scores: {[f'{s:.4f}' for s in cv_scores]}")
print(f"Mean CV AUC:   {cv_scores.mean():.4f} (+/- {cv_scores.std():.4f})")

print("\n" + "=" * 60)
print("🎉 Model လေ့ကျင့်ခြင်း အားလုံး ပြီးစီးပါပြီ!")
print("=" * 60)