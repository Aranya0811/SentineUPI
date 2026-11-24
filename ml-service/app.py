from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
import os

app = FastAPI(title="UPI Fraud Risk Scoring Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and scaler or fallback if not trained yet
current_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_dir, "model.pkl")
scaler_path = os.path.join(current_dir, "scaler.pkl")

model = None
scaler = None

if os.path.exists(model_path) and os.path.exists(scaler_path):
    model = joblib.load(model_path)
    scaler = joblib.load(scaler_path)

class TransactionPayload(BaseModel):
    amount: float
    hour_of_day: int
    velocity_last_10m: int
    amount_to_avg_ratio: float
    is_new_payee: int
    geo_distance_km: float
    device_risk_score: float

@app.get("/health")
def health():
    return {
        "status": "ML Engine Healthy",
        "model_loaded": model is not None,
        "version": "1.0"
    }

@app.post("/predict")
def predict_risk(txn: TransactionPayload):
    global model, scaler
    if model is None or scaler is None:
        if os.path.exists(model_path) and os.path.exists(scaler_path):
            model = joblib.load(model_path)
            scaler = joblib.load(scaler_path)

    if model is not None and scaler is not None:
        feature_arr = np.array([[
            txn.amount,
            txn.hour_of_day,
            txn.velocity_last_10m,
            txn.amount_to_avg_ratio,
            txn.is_new_payee,
            txn.geo_distance_km,
            txn.device_risk_score
        ]])
        
        feature_scaled = scaler.transform(feature_arr)
        fraud_prob = float(model.predict_proba(feature_scaled)[0][1])
        risk_score = round(fraud_prob * 100, 1)
    else:
        # Fallback scoring formula if model is not yet compiled
        raw_score = (
            (txn.amount / 50000.0) * 30 +
            (txn.velocity_last_10m * 10) +
            (txn.device_risk_score * 40) +
            (25 if txn.geo_distance_km > 300 else 0)
        )
        risk_score = min(round(raw_score, 1), 100.0)

    if risk_score >= 75:
        decision = "BLOCK"
        reason = "Critical Anomaly: High risk pattern detected across amount, velocity, or device profile."
    elif risk_score >= 40:
        decision = "OTP_CHALLENGE"
        reason = "Medium Anomaly: Unusual payee or abnormal time/distance deviation."
    else:
        decision = "ALLOW"
        reason = "Standard behavioral pattern."

    return {
        "risk_score": risk_score,
        "decision": decision,
        "reason": reason
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
