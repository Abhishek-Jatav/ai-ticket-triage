
---

# 🚀 AI Ticket Triage System

A **keyword-based ticket classification system** built using:

* ⚡ **Frontend:** Next.js
* 🛠 **Backend:** NestJS
* 🗄 **Database:** MongoDB
* 🐳 **Containerization:** Docker & Docker Compose

> ❗ No external AI APIs are used.
> All logic is rule-based and fully config-driven.

---

# 📦 1️⃣ Setup Instructions (Local Development)

## 🛠 Backend

```bash
cd backend
npm install
npm run start:dev
```

Runs on:
👉 [http://localhost:3001](http://localhost:3001)

---

## 💻 Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on:
👉 [http://localhost:3000](http://localhost:3000)

---

# 🏗 2️⃣ Architecture Overview

The system follows **clean layered architecture**:

```
Controller → Service → Analyzer → Database
```

### 🔹 Backend Structure

* `tickets.controller.ts` → Handles API requests
* `tickets.service.ts` → Orchestrates analysis + persistence
* `analyzer.service.ts` → Core classification engine
* `keyword-rules.ts` → Config-driven rules (no hardcoding)
* `MongoDB` → Stores analyzed tickets

📡 Frontend communicates with backend via REST API.

---

# 🗂 3️⃣ Data Model

### 📄 Ticket Schema

```ts
{
  message: string
  category: string
  priority: string
  keywords: string[]
  urgencySignals: string[]
  confidence: number
  createdAt: Date
}
```

### 🔍 Field Explanation

* **message** → Original ticket text
* **category** → Classified category
* **priority** → P0–P3
* **keywords** → Matched keywords
* **urgencySignals** → Urgency words detected
* **confidence** → Match ratio score
* **createdAt** → Timestamp

---

# 🧠 4️⃣ Classification Logic

## 🏷 Category Detection

* Count keyword matches per category
* Category with highest match wins
* If no match → `"Other"`

---

## ⏱ Urgency Detection

* Urgency keywords detected separately
* Stored inside `urgencySignals`

---

## 🚨 Priority Assignment

Evaluation order:

1. If contains **P0 keyword** → 🔴 P0
2. Else if contains **P1 keyword** → 🟠 P1
3. Else if `urgencySignals > 0` → 🟡 P2
4. Else → 🟢 P3

---

## 📊 Confidence Score

```
confidence = matchedKeywords / totalKeywordsChecked
```

Returned as a decimal percentage.

---

# 🔐 5️⃣ Custom Security Rule

If message contains:

```
"security"
```

Then:

* Force `category = Technical`
* Force `priority = P0`

### 🎯 Reason

Security issues are always critical and must receive highest priority.

---

# ⚖️ 6️⃣ Trade-offs

* Simple substring matching (not NLP)
* Confidence is ratio-based (not semantic scoring)
* No fuzzy matching
* No multi-label classification

---

# 🚫 7️⃣ Current Limitations

* Case-insensitive substring logic only
* No stemming
* No typo tolerance
* Limited keyword scalability

---

# 🚀 8️⃣ Possible Improvements

With more time, we could add:

* 🔍 Regex-based matching
* ⚖️ Weighted scoring system
* 🧠 Fuzzy matching
* 🛠 Admin dashboard for rule management
* 📄 Pagination for ticket list
* ⚡ Caching layer

---

# 🐳 9️⃣ Run with Docker

From root directory:

```bash
docker-compose up --build
```

### 🧩 Services

* 🌐 Frontend → [http://localhost:3000](http://localhost:3000)
* ⚙ Backend → [http://localhost:3001](http://localhost:3001)
* 🗄 MongoDB → Port 27017

---

# 🧪 🔟 Test Results

Unit tests implemented for:

1. Billing classification
2. Technical classification
3. Priority P0 detection
4. Priority P1 detection
5. Default P3 case
6. Custom security override rule

✅ All tests pass successfully.

Run tests:

```bash
cd backend
npm run test
```

---

# 🏁 Summary

This project demonstrates:

* Clean backend architecture
* Config-driven rule engine
* Deterministic classification logic
* Docker-based deployment
* Unit-tested business logic

A lightweight, production-ready foundation for scalable ticket classification systems.

---

# 👨‍💻 Author

**Abhishek Jatav**
🎓 B.Tech – Delhi Technological University

🔗 **LinkedIn:**
[https://www.linkedin.com/in/abhishek-jatav-067946261](https://www.linkedin.com/in/abhishek-jatav-067946261)

🌐 **Portfolio:**
[https://nexabuild-abhishek-jatav.netlify.app/](https://nexabuild-abhishek-jatav.netlify.app/)

---
