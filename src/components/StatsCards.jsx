import React from 'react';
import { ArrowUpRight, ArrowDownRight, IndianRupee, Percent } from 'lucide-react';

export default function StatsCards({ transactions }) {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + Number(t.amount || 0), 0);

  const expense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + Number(t.amount || 0), 0);

  const balance = income - expense;
  const savingsRate = income > 0 ? Math.max(0, Math.round(((income - expense) / income) * 100)) : 0;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Balance */}
      <div className="relative overflow-hidden rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-5 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Total Net Balance</p>
          <span className={`inline-flex items-center justify-center h-8 w-8 rounded-xl ${balance >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
            <IndianRupee className="h-4 w-4" />
          </span>
        </div>
        <div className="mt-3">
          <h2 className={`text-2xl font-bold tracking-tight ${balance >= 0 ? 'text-white' : 'text-rose-400'}`}>
            ₹{formatCurrency(balance)}
          </h2>
          <p className="mt-1 text-xs text-zinc-500">
            {balance >= 0 ? 'Liquid surplus available' : 'Deficit spending caution'}
          </p>
        </div>
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Total Income */}
      <div className="relative overflow-hidden rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-5 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Total Inflow</p>
          <span className="inline-flex items-center justify-center h-8 w-8 rounded-xl bg-teal-500/10 text-teal-400">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
        <div className="mt-3">
          <h2 className="text-2xl font-bold tracking-tight text-emerald-400">
            +₹{formatCurrency(income)}
          </h2>
          <p className="mt-1 text-xs text-zinc-500">All credited revenue & income</p>
        </div>
      </div>

      {/* Total Expense */}
      <div className="relative overflow-hidden rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-5 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Total Outflow</p>
          <span className="inline-flex items-center justify-center h-8 w-8 rounded-xl bg-rose-500/10 text-rose-400">
            <ArrowDownRight className="h-4 w-4" />
          </span>
        </div>
        <div className="mt-3">
          <h2 className="text-2xl font-bold tracking-tight text-rose-400">
            -₹{formatCurrency(expense)}
          </h2>
          <p className="mt-1 text-xs text-zinc-500">Total debit expenditure</p>
        </div>
      </div>

      {/* Savings Rate */}
      <div className="relative overflow-hidden rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-5 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Savings Efficiency</p>
          <span className="inline-flex items-center justify-center h-8 w-8 rounded-xl bg-indigo-500/10 text-indigo-400">
            <Percent className="h-4 w-4" />
          </span>
        </div>
        <div className="mt-3">
          <h2 className="text-2xl font-bold tracking-tight text-indigo-400">
            {savingsRate}%
          </h2>
          <div className="mt-2 w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-indigo-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, savingsRate))}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
