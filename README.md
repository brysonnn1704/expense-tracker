# ExpenseTracker Pro 💰

> Modern, privacy-first personal finance and categorical budget management application built with **React 19**, **Vite**, **Tailwind CSS**, and **Lucide Icons**.

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.3-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## ✨ Features

- **📊 Comprehensive Financial Overview:**
  - Real-time **Net Balance**, **Total Inflow (Income)**, **Total Outflow (Expenses)**, and **Savings Efficiency Rate %**.
  - Dynamic currency formatting (INR `₹` with Indian numerical grouping).

- **🎯 Categorical Budget Quotas:**
  - Set custom monthly spending ceilings per category (*Housing, Food & Dining, Transportation, Utilities, Entertainment, Shopping, Health, Miscellaneous*).
  - Visual status progress meters with early warning indicators (≥80%) and over-budget alerts (>100%).

- **📈 Visual Analytics & Cashflow Velocity:**
  - Categorical expense distribution breakdown with proportional spend meters.
  - Multi-day inflow vs outflow bar chart timeline.

- **📑 Transaction Ledger & Audit Log:**
  - Add, audit, and delete itemized debits and credits.
  - Multi-parameter filtering by Flow Type (*Inflow / Outflow*), Category, and instant text memo search.
  - Multi-mode sorting (*Newest, Oldest, Highest Amount, Lowest Amount*).

- **🔒 100% Client-Side Privacy & Data Portability:**
  - Zero external tracking — all records persist locally in browser `localStorage`.
  - **One-click Export to CSV** for spreadsheets and taxation review.
  - **JSON Backup & Restore** for cross-device migration.
  - One-click reset to verified demo seed data.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/brysonnn1704/expense-tracker.git
cd expense-tracker

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 🛠️ Tech Stack

- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Storage:** Client-side LocalStorage + JSON/CSV Serializers

---

## 📄 License
MIT License © 2026 Bryson Prakash Almeida
