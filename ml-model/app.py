from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

# Model နဲ့ Scaler ကို Load လုပ်ခြင်း
print("📂 Model ကို Load လုပ်နေသည်...")
model = joblib.load('diabetes_model.pkl')
scaler = joblib.load('scaler.pkl')
features = joblib.load('features.pkl')
print(f"✅ Model Load ပြီးပါပြီ")
print(f"📊 Features: {features}")


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        print(f"\n📥 ရလာတဲ့ ဒေတာ: {data}")
        
        input_data = {
            'Pregnancies': data.get('pregnancies', 0),
            'Glucose': data.get('glucose', 120),
            'BloodPressure': data.get('bloodPressure', 70),
            'SkinThickness': data.get('skinThickness', 20),
            'Insulin': data.get('insulin', 80),
            'BMI': data.get('bmi', 25),
            'DiabetesPedigreeFunction': data.get('diabetesPedigreeFunction', 0.5),
            'Age': data.get('age', 30)
        }
        
        df = pd.DataFrame([input_data])[features]
        
        # ⭐ Model type ကို စစ်ပြီး Scaling လိုမလို ဆုံးဖြတ်ခြင်း
        model_type = type(model).__name__
        print(f"🔍 Model Type: {model_type}")
        
        # XGBoost/RandomForest/DecisionTree တွေက scaling မလိုဘူး
        tree_models = ['XGBClassifier', 'RandomForestClassifier', 'DecisionTreeClassifier', 'GradientBoostingClassifier']
        
        if model_type in tree_models:
            print("ℹ️ Tree-based model ဖြစ်လို့ scaling မလုပ်ပါ")
            df_input = df.values  # scaling မလုပ်
        else:
            print("ℹ️ Scaled model ဖြစ်လို့ scaling လုပ်ပါ")
            df_input = scaler.transform(df)
        
        # Prediction
        prediction = model.predict(df_input)[0]
        probability = model.predict_proba(df_input)[0]
        
        # numpy types → Python native types
        risk_percentage = float(probability[1] * 100)
        confidence = float(max(probability))
        prediction_int = int(prediction)
        
        if risk_percentage >= 60:
            risk_level = 'High'
        elif risk_percentage >= 30:
            risk_level = 'Moderate'
        else:
            risk_level = 'Low'
        
        result = {
            'riskPercentage': round(risk_percentage, 2),
            'riskLevel': risk_level,
            'confidence': round(confidence, 2),
            'prediction': prediction_int
        }
        
        print(f"📤 ရလဒ်: {result}")
        return jsonify(result), 200
    
    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f"❌ Error: {str(e)}")
        return jsonify({'error': str(e)}), 500
    

@app.route('/', methods=['GET'])
def health():
    return jsonify({
        'status': 'running',
        'message': 'ML API သည် အလုပ်လုပ်နေပါသည်',
        'model': 'Diabetes Risk Predictor'
    }), 200


if __name__ == '__main__':
    print("\n🚀 ML API Server စတင်နေသည်...")
    print("📍 http://localhost:8000")
    app.run(host='0.0.0.0', port=8000, debug=True)