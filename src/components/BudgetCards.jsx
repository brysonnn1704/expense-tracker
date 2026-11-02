import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function BudgetCards({ categories, transactions, budgets }) {
  // calculate spent per category
  const spentPerCat = {};
  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      spentPerCat[t.category] = (spentPerCat[t.category] || 0) + Number(t.amount || 0);
    });

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-5 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold text-white tracking-wide">Categorical Budget Quotas</h2>
          <p className="text-xs text-zinc-400">Real-time expenditure vs monthly budget allocations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {categories.map((cat) => {
          const budget = budgets[cat.id] ?? cat.defaultBudget ?? 5000;
          const spent = spentPerCat[cat.id] || 0;
          const pct = budget > 0 ? Math.round((spent / budget) * 100) : 0;
          const isOver = spent > budget;
          const isWarning = spent >= budget * 0.8 && !isOver;

          let badgeColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
          let progressColor = 'bg-emerald-500';

          if (isOver) {
            badgeColor = 'text-rose-400 bg-rose-500/10 border-rose-500/20';
            progressColor = 'bg-rose-500';
          } else if (isWarning) {
            badgeColor = 'text-amber-400 bg-amber-500/10 border-amber-500/20';
            progressColor = 'bg-amber-500';
          }

          return (
            <div
              key={cat.id}
              className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/60 hover:border-zinc-700/80 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-200 truncate pr-2">{cat.name}</span>
                <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badgeColor}`}>
                  {isOver ? (
                    <>
                      <AlertCircle className="h-3 w-3" /> Over
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-3 w-3" /> {pct}%
                    </>
                  )}
                </span>
              </div>

              <div className="mt-2.5 flex items-baseline justify-between text-xs">
                <span className="font-semibold text-white">₹{formatCurrency(spent)}</span>
                <span className="text-zinc-500 font-mono text-[11px]">/ ₹{formatCurrency(budget)}</span>
              </div>

              {/* Progress bar */}
              <div className="mt-2 w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-1.5 rounded-full transition-all duration-500 ${progressColor}`}
                  style={{ width: `${Math.min(100, pct)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
