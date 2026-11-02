import React from 'react';
import { PieChart, TrendingUp } from 'lucide-react';

export default function Charts({ transactions, categories }) {
  // 1. Calculate expense by category
  const expenseByCategory = {};
  let totalExpense = 0;

  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      const amt = Number(t.amount || 0);
      expenseByCategory[t.category] = (expenseByCategory[t.category] || 0) + amt;
      totalExpense += amt;
    });

  const catBreakdown = Object.entries(expenseByCategory)
    .map(([catId, amount]) => {
      const meta = categories.find((c) => c.id === catId) || { name: catId, color: '#94A3B8' };
      const pct = totalExpense > 0 ? (amount / totalExpense) * 100 : 0;
      return { id: catId, name: meta.name, color: meta.color, amount, pct };
    })
    .sort((a, b) => b.amount - a.amount);

  // 2. Calculate day/trend stats
  const dateMap = {};
  transactions.forEach((t) => {
    const d = t.date;
    if (!dateMap[d]) dateMap[d] = { income: 0, expense: 0 };
    if (t.type === 'income') dateMap[d].income += Number(t.amount);
    if (t.type === 'expense') dateMap[d].expense += Number(t.amount);
  });

  const sortedDates = Object.keys(dateMap).sort().slice(-7);
  const maxDayVal = Math.max(
    1,
    ...sortedDates.map((d) => Math.max(dateMap[d].income, dateMap[d].expense))
  );

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(val);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Category Distribution */}
      <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-5 backdrop-blur-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <PieChart className="h-4 w-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">Expense Distribution</h3>
          </div>
          <p className="text-xs text-zinc-400">Proportional spend across active categories</p>
        </div>

        <div className="my-5 flex flex-col gap-3">
          {catBreakdown.length === 0 ? (
            <p className="text-xs text-zinc-500 py-8 text-center">No expense entries recorded yet</p>
          ) : (
            catBreakdown.slice(0, 5).map((item) => (
              <div key={item.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-zinc-200 font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">₹{formatCurrency(item.amount)}</span>
                    <span className="text-zinc-500 font-mono text-[11px] w-10 text-right">{item.pct.toFixed(1)}%</span>
                  </div>
                </div>
                <div className="w-full bg-zinc-800/80 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))
          )}
        </div>

        <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-400">
          <span>Active Spending Categories:</span>
          <span className="font-semibold text-white">{catBreakdown.length}</span>
        </div>
      </div>

      {/* Cashflow Velocity */}
      <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-5 backdrop-blur-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-teal-400" />
            <h3 className="text-sm font-semibold text-white">Recent Activity Timeline</h3>
          </div>
          <p className="text-xs text-zinc-400">Daily inflow (green) vs outflow (rose)</p>
        </div>

        <div className="my-6">
          {sortedDates.length === 0 ? (
            <p className="text-xs text-zinc-500 py-8 text-center">No transactions available for chart</p>
          ) : (
            <div className="flex items-end justify-between gap-3 h-36 pt-4 border-b border-zinc-800/80 pb-2">
              {sortedDates.map((d) => {
                const { income, expense } = dateMap[d];
                const incHeight = (income / maxDayVal) * 100;
                const expHeight = (expense / maxDayVal) * 100;
                const shortDate = d.slice(5);

                return (
                  <div key={d} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                    <div className="w-full flex items-end justify-center gap-1 h-28">
                      {/* Income Bar */}
                      <div
                        className="w-2.5 sm:w-3.5 bg-emerald-500/80 group-hover:bg-emerald-400 rounded-t transition-all"
                        style={{ height: `${Math.max(4, incHeight)}%` }}
                        title={`Income: ₹${formatCurrency(income)}`}
                      />
                      {/* Expense Bar */}
                      <div
                        className="w-2.5 sm:w-3.5 bg-rose-500/80 group-hover:bg-rose-400 rounded-t transition-all"
                        style={{ height: `${Math.max(4, expHeight)}%` }}
                        title={`Expense: ₹${formatCurrency(expense)}`}
                      />
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono group-hover:text-zinc-300 transition-colors">
                      {shortDate}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="pt-2 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> Inflow</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-rose-500" /> Outflow</span>
          </div>
          <span className="text-[11px] text-zinc-500">Last 7 Active Days</span>
        </div>
      </div>
    </div>
  );
}
