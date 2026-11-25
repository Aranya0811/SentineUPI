# 🛡️ SentinelUPI — Real-Time Payment Fraud Interception & Cyber Defense Console

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live_Demo-Active_Radar-emerald?style=for-the-badge&logo=firefox)](https://aranya0811.github.io/SentineUPI/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-AryanSingh1938%2FSentineUPI-blue?style=for-the-badge&logo=github)](https://github.com/AryanSingh1938/SentineUPI)
[![NPCI Compliant](https://img.shields.io/badge/Standard-NPCI_UPI_2.0-orange?style=for-the-badge)](https://www.npci.org.in/)

### 🌐 **Live Application URL:** [https://aranya0811.github.io/SentineUPI/](https://aranya0811.github.io/SentineUPI/)

</div>

---

**SentinelUPI** is an autonomous, sub-35ms digital payment threat interception platform and Security Operations Center (SOC) defense radar engineered specifically for Unified Payments Interface (UPI) rails.

It pairs **deterministic heuristic gatekeepers** with **gradient-boosted behavioral ML models** and integrates **I4C / 1930 National Cybercrime Reporting Portal (NCRP)** mule registries to detect payment scams, malicious intent links, and organized money mule layering networks in real time.

---

## ⚡ Core Capabilities

### 1. 🔍 UPI Deep Link & QR Code Forensic Inspector
* Decodes `upi://pay?...` query strings and dynamic QR codes in real time.
* Unmasks **Display Name Spoofing** (e.g., scammer naming themselves *"State Electricity Board"* or *"Bank Refund Helpdesk"* while mapping to an unverified personal handle).
* Intercepts **Reverse Collect-Request Scams** where fraudulent notes claim *"Enter UPI PIN to receive refund voucher"*.
* Identifies pre-filled high-amount dynamic QR parameters.

### 2. 🚨 Automated Cybercrime FIR Incident Dossier (1930 / NCRP)
* One-click generation and instant export of standardized Law Enforcement Incident Dossiers compliant with the Citizen Financial Cyber Fraud Reporting and Management System (CFCFRMS / Helpline 1930).
* Generates formatted electronic evidence dossiers including raw transaction telemetry, IP/device fingerprints, violation codes, and Section 91 CrPC statutory hold instructions for the beneficiary bank.

### 3. 🛑 I4C National Cybercrime Mule Registry
* Automatically cross-references recipient VPAs, mobile numbers, and bank account IFSCs against known financial cybercrime syndicates.
* Blocks payments sent to high-risk mule clusters with a 99% risk rating and attaches police FIR reference data directly into the SOC telemetry stream.

### 4. 📊 Real-Time SOC Defense Radar
* Bi-directional WebSocket telemetry (`Socket.IO`) streaming live transaction scans into an analyst dashboard.
* Real-time metric counters for *Scanned*, *Approved*, *Challenged (Step-up OTP)*, and *Blocked* payments.

### 5. 🔐 Zero-Friction Analyst Authentication
* Role-based analyst sessions (*SOC Fraud Analyst*, *Senior Risk Officer*, *Security Administrator*).
* Built-in 1-click **Auto-Fill Demo Credentials**:
  - **Email:** `analyst@sentinel.ai`
  - **Password:** `password123`
* Offline client-side simulation fallbacks for instant evaluation.

---

## 🏗️ System Architecture

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

| Component | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, Socket.IO Client, Lucide Icons |
| **Backend API** | Node.js, Express, Socket.IO, JWT, Mongoose, CORS |
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

# Windows:
.\venv\Scripts\activate
# Linux/macOS:
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

---

## 🐳 Docker Setup

Run the entire multi-tier stack with Docker Compose:

```bash
docker-compose up --build
```

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

## 🛡️ License
Built for Indian digital payment security research. Compliant with NPCI Unified Payments Interface specifications and MHA cybercrime reporting protocols.
