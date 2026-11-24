# 🛡️ SentinelUPI — Real-Time Payment Fraud Interception & Cyber Defense Console

[![Node.js Version](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-blue.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18-cyan.svg)](https://react.dev/)
[![NPCI Compliant](https://img.shields.io/badge/NPCI%20Standard-UPI%20v2.0-orange.svg)](https://www.npci.org.in/)

**SentinelUPI** is an autonomous, sub-35ms real-time digital payment threat interception platform and Security Operations Center (SOC) defense console engineered specifically for Unified Payments Interface (UPI) rails.

It pairs **deterministic heuristic gatekeepers** with **gradient-boosted behavioral ML models** and integrates **I4C / 1930 National Cybercrime Reporting Portal** mule registries to block payment scams, collect-request phishing, and organized money mule layering networks in real time.

---

## 🚀 Key Capabilities

### 1. ⚡ Multi-Tier Fraud Interception Engine (< 35ms)
* **Tier 1 — Deterministic Heuristic Gates**: Sub-5ms detection of high velocity spikes ($\ge 5$ txns in 10 mins), impossible geolocation displacement jumps ($\ge 1000\text{ km}$), and sudden huge transfers to first-time beneficiaries.
* **Tier 2 — Gradient-Boosted Behavioral ML**: Microservice built with FastAPI + scikit-learn scoring across 7 scaled dimensions: amount-to-average ratio, time-of-day, velocity, device integrity index, and spatial distance.
* **Tier 3 — National Cybercrime Mule Registry (I4C / 1930)**: Live cross-referencing against simulated Citizen Financial Cyber Fraud Reporting and Management System (CFCFRMS) mule blacklist accounts.

### 2. 🔍 UPI Deep Link & QR Code Forensic Inspector
* Decodes `upi://pay?...` intent links and QR codes.
* Unmasks **Display Name Spoofing** (e.g. scammer naming themselves *"Electricity Board"* or *"Bank Helpdesk"* while using an individual unverified VPA).
* Detects **Collect-Request Traps** where deceptive notes tell victims to enter their UPI PIN to "receive" funds or refunds.

### 3. 🚨 Automated Cybercrime FIR Incident Dossier (1930 / NCRP)
* One-click generation and download of standardized Law Enforcement Incident Dossiers compliant with the National Cyber Crime Reporting Portal (NCRP / MHA).
* Includes raw transaction telemetry, IP/device fingerprints, violation codes, and Section 91 CrPC preservation instructions for beneficiary banks.

### 4. 📊 Real-Time SOC Defense Radar
* Bi-directional WebSocket telemetry (`Socket.IO`) feeding real-time transaction streams into an interactive analyst dashboard.
* Live metric counters for *Scanned*, *Approved*, *Challenged (Step-up OTP)*, and *Blocked* payments.

---

## 🏗️ Architecture

```
                                 [ UPI Transaction Ingestion ]
                                               │
                                               ▼
                              ┌──────────────────────────────────┐
                              │  Express Defense Server (:5000)  │
                              └─────────────────┬────────────────┘
                                                │
                 ┌──────────────────────────────┴──────────────────────────────┐
                 ▼                                                             ▼
   ┌───────────────────────────┐                                 ┌───────────────────────────┐
   │  Heuristic Rules & I4C    │                                 │   Python ML Service       │
   │  Mule Blacklist Engine    │                                 │   FastAPI (:8000)         │
   └─────────────┬─────────────┘                                 └─────────────┬─────────────┘
                 │                                                             │
                 └──────────────────────────────┬──────────────────────────────┘
                                                │
                                                ▼
                              ┌──────────────────────────────────┐
                              │  Enforce Decision Engine         │
                              │  ALLOW | OTP_CHALLENGE | BLOCK   │
                              └─────────────────┬────────────────┘
                                                │
                                                ▼
                              ┌──────────────────────────────────┐
                              │  WebSocket Telemetry Broadcast   │
                              │  React 18 Defense Console        │
                              └──────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, Socket.IO Client, Lucide Icons |
| **Backend API** | Node.js, Express, Socket.IO, JWT, Mongoose |
| **ML Engine** | Python 3.10+, FastAPI, scikit-learn, joblib, NumPy |
| **Database** | MongoDB (with seamless in-memory fallback for zero-dependency demos) |

---

## ⚡ Quick Start (Local Setup)

### Prerequisites
- Node.js (v18+)
- Python (3.9+)

### 1. Clone Repository
```bash
git clone https://github.com/AryanSingh1938/SentineUPI.git
cd SentineUPI
```

### 2. Start ML Engine (Port 8000)
```bash
cd ml-service
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
# source venv/bin/activate

pip install -r requirements.txt
python -m uvicorn app:app --port 8000 --reload
```

### 3. Start Backend Server (Port 5000)
```bash
cd ../server
npm install
npm run dev # or npm start
```

### 4. Start Frontend Console (Port 5173)
```bash
cd ../client
npm install
npm run dev
```

Visit **`http://localhost:5173`** in your browser.
- **Default Analyst Account**: `analyst@sentinel.ai`
- **Default Password**: `password123`

---

## 🌐 1-Click Live Deployment Guide

### Deploying Frontend to Vercel
1. Push your code to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"** $\rightarrow$ select your repository.
3. Configure settings:
   - **Root Directory**: `client`
   - **Framework Preset**: `Vite`
   - **Environment Variable**: `VITE_API_URL` = `https://<your-backend-domain>.onrender.com`
4. Click **Deploy**.

### Deploying Backend & ML to Render / Railway
1. **ML Service**:
   - New **Web Service** $\rightarrow$ Root Directory: `ml-service`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app:app --host 0.0.0.0 --port $PORT`
2. **Express Server**:
   - New **Web Service** $\rightarrow$ Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Environment Variables:
     - `ML_SERVICE_URL`: URL of the deployed Python ML service
     - `MONGO_URI`: MongoDB Atlas connection URI (optional; runs in-memory if omitted)
     - `JWT_SECRET`: Random secure string

---

## 📜 API Reference

### 1. Ingest Transaction
```http
POST /api/transactions/process
Content-Type: application/json

{
  "senderVpa": "victim@okhdfcbank",
  "receiverVpa": "mule_ring_99@ybl",
  "amount": 45000,
  "velocity_last_10m": 4,
  "device_risk_score": 0.85,
  "is_new_payee": 1,
  "geo_distance_km": 1200
}
```

### 2. Forensic Scan of UPI QR / Intent
```http
POST /api/scan/upi-intent
Content-Type: application/json

{
  "uri": "upi://pay?pa=fake_support_refund@oksbi&pn=SBI%20Card%20Support&am=25000&cu=INR&tn=Security%20Refund%20Validation"
}
```

### 3. Generate 1930 / NCRP Law Enforcement Dossier
```http
GET /api/reports/cybercrime-dossier/:txnId
```

---

## 🛡️ License & Acknowledgements
Built for Indian digital payment security research. Compliant with NPCI Unified Payments Interface architectural standards and MHA cybercrime reporting protocols.
