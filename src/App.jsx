import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import BudgetCards from './components/BudgetCards';
import Charts from './components/Charts';
import TransactionList from './components/TransactionList';
import AddTransactionModal from './components/AddTransactionModal';
import BudgetModal from './components/BudgetModal';
import { DEFAULT_CATEGORIES, INCOME_CATEGORIES, SEED_TRANSACTIONS } from './data/seedData';

const STORAGE_KEY_TX = 'expense_tracker_pro_tx';
const STORAGE_KEY_BUDGET = 'expense_tracker_pro_budgets';

export default function App() {
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TX);
      return saved ? JSON.parse(saved) : SEED_TRANSACTIONS;
    } catch {
      return SEED_TRANSACTIONS;
    }
  });

  const [budgets, setBudgets] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BUDGET);
      if (saved) return JSON.parse(saved);
      const initial = {};
      DEFAULT_CATEGORIES.forEach((c) => {
        initial[c.id] = c.defaultBudget || 5000;
      });
      return initial;
    } catch {
      const initial = {};
      DEFAULT_CATEGORIES.forEach((c) => {
        initial[c.id] = c.defaultBudget || 5000;
      });
      return initial;
    }
  });

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [budgetModalOpen, setBudgetModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_TX, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_BUDGET, JSON.stringify(budgets));
  }, [budgets]);

  // Handlers
  const handleAddTransaction = (newTx) => {
    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleDeleteTransaction = (id) => {
    if (confirm('Delete this record?')) {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const handleSaveBudgets = (newBudgets) => {
    setBudgets(newBudgets);
  };

  const handleResetData = () => {
    if (confirm('Reset transactions and budgets back to default demo seeds?')) {
      setTransactions(SEED_TRANSACTIONS);
      const initial = {};
      DEFAULT_CATEGORIES.forEach((c) => {
        initial[c.id] = c.defaultBudget || 5000;
      });
      setBudgets(initial);
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Title', 'Type', 'Category', 'Amount', 'Date', 'Notes'];
    const rows = transactions.map((t) => [
      t.id,
      `"${t.title.replace(/"/g, '""')}"`,
      t.type,
      t.category,
      t.amount,
      t.date,
      `"${(t.notes || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ExpenseTracker_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportJSON = () => {
    const data = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      transactions,
      budgets,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ExpenseTracker_Backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportJSON = (importedData) => {
    if (importedData && Array.isArray(importedData.transactions)) {
      setTransactions(importedData.transactions);
      if (importedData.budgets) {
        setBudgets(importedData.budgets);
      }
      alert('Data restored successfully!');
    } else {
      alert('Invalid backup file structure.');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Header
        onAddClick={() => setAddModalOpen(true)}
        onManageBudget={() => setBudgetModalOpen(true)}
        onExportCSV={handleExportCSV}
        onExportJSON={handleExportJSON}
        onImportJSON={handleImportJSON}
        onReset={handleResetData}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* KPI Balance Cards */}
        <StatsCards transactions={transactions} />

        {/* Categorical Budget Goals */}
        <BudgetCards
          categories={DEFAULT_CATEGORIES}
          transactions={transactions}
          budgets={budgets}
        />

        {/* Charts & Trends */}
        <Charts transactions={transactions} categories={DEFAULT_CATEGORIES} />

        {/* Transaction Ledger */}
        <TransactionList
          transactions={transactions}
          categories={DEFAULT_CATEGORIES}
          incomeCategories={INCOME_CATEGORIES}
          onDelete={handleDeleteTransaction}
        />
      </main>

      <footer className="border-t border-zinc-900 py-6 text-center text-xs text-zinc-500">
        <p>ExpenseTracker Pro • Built with React 19, Vite, Tailwind CSS & Lucide • Fully client-side private</p>
      </footer>

      {/* Modals */}
      <AddTransactionModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddTransaction}
        categories={DEFAULT_CATEGORIES}
        incomeCategories={INCOME_CATEGORIES}
      />

      <BudgetModal
        isOpen={budgetModalOpen}
        onClose={() => setBudgetModalOpen(false)}
        categories={DEFAULT_CATEGORIES}
        budgets={budgets}
        onSaveBudgets={handleSaveBudgets}
      />
    </div>
  );
}
