import React, { useState } from 'react';
import { Search, Filter, Trash2, ArrowUpRight, ArrowDownRight, Calendar, Tag } from 'lucide-react';

export default function TransactionList({
  transactions,
  categories,
  incomeCategories,
  onDelete,
}) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [catFilter, setCatFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');

  const allCategories = [...categories, ...incomeCategories];

  // Filtering
  const filtered = transactions.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      (t.notes && t.notes.toLowerCase().includes(search.toLowerCase()));
    const matchesType = typeFilter === 'all' || t.type === typeFilter;
    const matchesCat = catFilter === 'all' || t.category === catFilter;
    return matchesSearch && matchesType && matchesCat;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
    if (sortBy === 'amount-desc') return Number(b.amount) - Number(a.amount);
    if (sortBy === 'amount-asc') return Number(a.amount) - Number(b.amount);
    return 0;
  });

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(val);

  return (
    <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-5 backdrop-blur-sm">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800/80">
        <div>
          <h2 className="text-sm font-semibold text-white tracking-wide">Ledger & Transaction Log</h2>
          <p className="text-xs text-zinc-400">Search, filter, and audit itemized debits and credits</p>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search memo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-zinc-950/80 border border-zinc-800 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 w-36 sm:w-44"
            />
          </div>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-zinc-950/80 border border-zinc-800 rounded-lg text-zinc-300 focus:outline-none focus:border-emerald-500/50"
          >
            <option value="all">All Flows</option>
            <option value="income">Inflow (+) </option>
            <option value="expense">Outflow (-)</option>
          </select>

          {/* Category Filter */}
          <select
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-zinc-950/80 border border-zinc-800 rounded-lg text-zinc-300 focus:outline-none focus:border-emerald-500/50"
          >
            <option value="all">All Categories</option>
            {allCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-zinc-950/80 border border-zinc-800 rounded-lg text-zinc-300 focus:outline-none focus:border-emerald-500/50"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
          </select>
        </div>
      </div>

      {/* List */}
      <div className="mt-3 divide-y divide-zinc-800/60">
        {sorted.length === 0 ? (
          <div className="py-12 text-center text-xs text-zinc-500">
            No transactions matching query criteria.
          </div>
        ) : (
          sorted.map((t) => {
            const isIncome = t.type === 'income';
            const catMeta = allCategories.find((c) => c.id === t.category) || {
              name: t.category,
              color: '#71717A',
            };

            return (
              <div
                key={t.id}
                className="py-3 px-2 flex items-center justify-between gap-4 hover:bg-zinc-800/30 rounded-xl transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isIncome
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    {isIncome ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-zinc-100 truncate">{t.title}</p>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-zinc-400">
                      <span className="flex items-center gap-1 font-mono">
                        <Calendar className="h-3 w-3 text-zinc-500" />
                        {t.date}
                      </span>
                      <span className="text-zinc-600">•</span>
                      <span className="flex items-center gap-1">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: catMeta.color }}
                        />
                        {catMeta.name}
                      </span>
                    </div>
                    {t.notes && (
                      <p className="text-[10px] text-zinc-500 truncate mt-0.5 italic">{t.notes}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`text-sm font-bold font-mono tracking-tight ${
                      isIncome ? 'text-emerald-400' : 'text-zinc-100'
                    }`}
                  >
                    {isIncome ? '+' : '-'}₹{formatCurrency(t.amount)}
                  </span>

                  <button
                    onClick={() => onDelete(t.id)}
                    title="Delete Entry"
                    className="p-1.5 text-zinc-500 hover:text-rose-400 hover:bg-zinc-800 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-400">
        <span>Showing {sorted.length} of {transactions.length} total records</span>
        <span className="text-[11px] text-zinc-500">Auto-saved to client LocalStorage</span>
      </div>
    </div>
  );
}
