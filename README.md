# 💸 FinSight — Financial Dashboard

A modern, responsive financial dashboard to track, analyze, and understand personal finances through real-time insights and interactive visualizations.

---

## 🚀 Live Demo

🔗 https://your-vercel-link.vercel.app

---

## 📌 Overview

**FinSight** is a frontend-driven financial analytics platform that helps users:

* Monitor income, expenses, and balance
* Explore transaction history
* Understand spending patterns through visual insights
* Interact with a role-based UI system

Built with a focus on **clean UI, performance, and user experience**.

---

## ✨ Features

### 💰 Dashboard Overview

* Summary cards for **Balance, Income, Expenses**
* Real-time updates based on transactions
* Monthly trend indicators

### 📊 Data Visualization

* **Balance Trend Chart** (time-based)
* **Spending Breakdown** (category-wise bar chart)

### 📋 Transaction Management

* View transaction list (date, amount, category, type)
* Search, filter, and sort transactions
* Export transactions as **CSV**

### 🔐 Role-Based UI (Simulated)

* 👁️ Viewer → read-only access
* 🛡️ Admin → add, delete, and reset data

### 🧠 Insights Engine

* Monthly comparison analysis
* Spending alerts (high / stable / improving)
* Progress visualization

---

## 🛠️ Tech Stack

| Technology   | Usage                   |
| ------------ | ----------------------- |
| React.js     | Frontend framework      |
| Zustand      | State management        |
| Tailwind CSS | Styling & responsive UI |
| Recharts     | Data visualization      |
| LocalStorage | Data persistence        |
| Vercel       | Deployment              |

---

## 🧩 Project Structure

```
src/
│
├── components/
│   ├── cards/
│   ├── charts/
│   ├── transactions/
│   └── ui/
│
├── pages/
│   ├── Dashboard.jsx
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

## ⚙️ Installation & Setup

```bash
# Clone repository
git clone https://github.com/your-username/finsight.git

# Navigate into project
cd finsight

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 📱 Responsive Design

* Fully responsive across **mobile, tablet, and desktop**
* Mobile-first improvements:

  * Card layout for transactions
  * Optimized navigation
  * Touch-friendly UI

---

## 💾 Data Handling

* Uses **LocalStorage** for persistence
* Mock API fallback for initial data
* Handles:

  * Empty states
  * Corrupted data
  * Loading states

---

## ⚡ Performance Optimizations

* Component-based architecture
* Lazy loading (optional)
* Efficient state updates with Zustand
* Minimal re-renders

---

## 🔍 Edge Cases Handled

* No transactions available
* Division by zero in analytics
* Invalid localStorage data
* Rapid user interactions (add/delete)
* Large transaction values

---

## 🧪 Testing Checklist

* ✅ Dashboard updates correctly
* ✅ Filtering & sorting works
* ✅ Role-based restrictions enforced
* ✅ Mobile layout optimized
* ✅ CSV export verified

---

## 📈 Future Improvements

* Backend integration (Node.js / Express)
* Authentication system
* Advanced analytics (AI-based insights)
* Undo/redo actions
* Notifications & alerts system

---

## 👩‍💻 Author

**Prashanti Hebbar**

---

## ⭐ Acknowledgment

This project was built to demonstrate:

* Frontend engineering skills
* UI/UX design thinking
* State management and data handling
* Real-world application structure

---

## 📄 License

This project is open-source and available under the MIT License.
