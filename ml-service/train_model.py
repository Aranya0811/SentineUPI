import numpy as np
import pandas as pd
from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import joblib

def generate_synthetic_data(n_samples=15000):
    np.random.seed(42)
    
    amount = np.random.exponential(scale=1200, size=n_samples)
    hour = np.random.randint(0, 24, size=n_samples)
    velocity = np.random.poisson(lam=1.2, size=n_samples)
    amount_ratio = np.random.normal(loc=1.0, scale=0.8, size=n_samples)
    amount_ratio = np.clip(amount_ratio, 0.1, 15.0)
    is_new_payee = np.random.binomial(n=1, p=0.25, size=n_samples)
    geo_distance = np.random.exponential(scale=15, size=n_samples)
    device_risk = np.random.beta(a=0.5, b=5.0, size=n_samples)

    # Base fraud condition
    fraud_prob = (
        (amount > 25000) * 0.35 +
        ((hour >= 1) & (hour <= 4)) * 0.25 +
        (velocity > 4) * 0.40 +
        (amount_ratio > 4.5) * 0.30 +
        (is_new_payee == 1) * 0.15 +
        (geo_distance > 300) * 0.35 +
        (device_risk > 0.7) * 0.35
    )
    
    y = (fraud_prob > 0.65).astype(int)

    # Inject deliberate UPI phishing/mule burst patterns
    fraud_indices = np.random.choice(n_samples, size=int(n_samples * 0.04), replace=False)
    amount[fraud_indices] = np.random.uniform(40000, 100000, size=len(fraud_indices))
    velocity[fraud_indices] = np.random.randint(6, 15, size=len(fraud_indices))
    is_new_payee[fraud_indices] = 1
    device_risk[fraud_indices] = np.random.uniform(0.75, 1.0, size=len(fraud_indices))
    y[fraud_indices] = 1

    df = pd.DataFrame({
        'amount': amount,
        'hour_of_day': hour,
        'velocity_last_10m': velocity,
        'amount_to_avg_ratio': amount_ratio,
        'is_new_payee': is_new_payee,
        'geo_distance_km': geo_distance,
        'device_risk_score': device_risk,
        'is_fraud': y
    })
    return df

print("1. Generating synthetic UPI dataset...")
df = generate_synthetic_data()

features = [
    'amount', 'hour_of_day', 'velocity_last_10m', 
    'amount_to_avg_ratio', 'is_new_payee', 
    'geo_distance_km', 'device_risk_score'
]

X = df[features]
y = df['is_fraud']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)

print("2. Training XGBoost Classifier...")
model = XGBClassifier(
    n_estimators=100,
    max_depth=4,
    learning_rate=0.1,
    scale_pos_weight=5, # balance fraud penalties
    random_state=42
)
model.fit(X_train_scaled, y_train)

joblib.dump(model, "model.pkl")
joblib.dump(scaler, "scaler.pkl")
print("Model exported successfully to 'model.pkl' & 'scaler.pkl'")
