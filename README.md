<h1 align="center">
  🚀 FinSight — Smart Financial Dashboard
</h1>

<p align="center">
  <b>Track • Analyze • Improve Your Financial Health</b><br/>
  A modern, responsive finance dashboard built with performance and UX in mind.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-blue?logo=react" />
  <img src="https://img.shields.io/badge/Zustand-State%20Management-purple" />
  <img src="https://img.shields.io/badge/TailwindCSS-UI-38B2AC?logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel" />
  <img src="https://img.shields.io/badge/Status-Production%20Ready-success" />
</p>

---

## 🌐 Live Demo

🔗 **[View FinSight Live](https://fin-sight-liard.vercel.app/)**

---

## ✨ What is FinSight?

**FinSight** is a data-driven financial dashboard that enables users to:

* 💰 Track income, expenses, and balance in real time
* 📊 Visualize financial trends and spending behavior
* 🧠 Gain actionable insights into financial habits
* 🔐 Interact with a role-based UI (Admin / Viewer)

Designed with **clean UX, responsive layout, and scalable architecture**.

---

## 🎯 Key Features

### 💰 Financial Overview

* Dynamic **Summary Cards** (Balance, Income, Expenses)
* Real-time updates on transaction changes
* Monthly trend indicators

---

### 📊 Interactive Visualizations

* 📈 **Balance Trend Chart** (time-based insights)
* 📊 **Spending Breakdown** (category-wise analysis)

---

### 📋 Transaction Management

* Search, filter, and sort transactions
* Detailed transaction history
* Export data as **CSV**

---

### 🔐 Role-Based UI

| Role       | Access                      |
| ---------- | --------------------------- |
| 👁️ Viewer | View-only access            |
| 🛡️ Admin  | Add, delete, and reset data |

---

### 🧠 Insights Engine

* Monthly spending comparison
* Spending alerts (High / Stable / Improving)
* Visual progress indicators

---

## 📱 Responsive Design

* 📲 Mobile-first experience
* 📊 Card layout for transactions on small screens
* 🖥️ Grid-based dashboard for desktop
* ⚡ Smooth transitions and interactions

---

## 🛠️ Tech Stack

```id="stack"
Frontend     → React.js  
State        → Zustand  
Styling      → Tailwind CSS  
Charts       → Recharts  
Persistence  → LocalStorage  
Deployment   → Vercel  
```

---

## 🧩 Project Architecture

```id="structure"
src/
├── components/
│   ├── cards/
│   ├── charts/
│   ├── transactions/
│   └── ui/
│
├── pages/
│   ├── Dashboard.jsx
│   ├── Insights.jsx
│   └── Transactions.jsx
│
├── store/
│   └── useFinanceStore.js
│
├── utils/
│   ├── helpers.js
│   └── export.js
│
├── services/
│   └── api.js
│
└── data/
    └── mockData.js
```

---

## ⚙️ Getting Started

```bash id="setup"
# Clone repository
git clone https://github.com/your-username/finsight.git

# Navigate into project
cd finsight

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## ⚡ Performance & Optimization

* Efficient state updates using Zustand
* Component-based modular architecture
* Lazy loading for heavy components (optional)
* Minimal re-renders and optimized UI updates

---

## 🧪 Edge Cases Handled

* ✅ Empty transaction state
* ✅ Invalid/corrupt localStorage data
* ✅ Division-by-zero handling in insights
* ✅ Rapid user interactions (add/delete)
* ✅ Large transaction values

---

## 🚀 Future Enhancements

* 🔐 Authentication system
* 🌐 Backend integration (Node.js / Express)
* 🤖 AI-based financial insights
* 🔔 Notification system
* ↩️ Undo/Redo actions

---

## 📌 Why This Project Matters

This project demonstrates:

* 💡 Real-world frontend architecture
* 🎨 UI/UX design thinking
* ⚙️ State management expertise
* 📊 Data-driven rendering
* 🧠 Problem-solving with edge cases

---

## ⭐ Support

If you like this project:

👉 Star the repo
👉 Share it
👉 Use it as inspiration

---

## 👩‍💻 Author

**Prashanti Hebbar**
