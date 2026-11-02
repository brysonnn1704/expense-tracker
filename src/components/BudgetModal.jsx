import React, { useState } from 'react';
import { X, Check, RotateCcw } from 'lucide-react';

export default function BudgetModal({ isOpen, onClose, categories, budgets, onSaveBudgets }) {
  const [localBudgets, setLocalBudgets] = useState({ ...budgets });

  if (!isOpen) return null;

  const handleChange = (id, val) => {
    setLocalBudgets((prev) => ({
      ...prev,
      [id]: Number(val) || 0,
    }));
  };

  const handleResetDefaults = () => {
    const def = {};
    categories.forEach((c) => {
      def[c.id] = c.defaultBudget || 5000;
    });
    setLocalBudgets(def);
  };

  const handleSave = () => {
    onSaveBudgets(localBudgets);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
          <div>
            <h3 className="text-sm font-semibold text-white">Adjust Categorical Spending Limits</h3>
            <p className="text-xs text-zinc-400">Set targeted monthly ceilings for each expense category</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 max-h-[60vh] overflow-y-auto space-y-3">
          {categories.map((cat) => {
            const currentVal = localBudgets[cat.id] ?? cat.defaultBudget ?? 5000;
            return (
              <div
                key={cat.id}
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800/80"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-xs font-medium text-zinc-200">{cat.name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-zinc-500 font-mono">₹</span>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    value={currentVal}
                    onChange={(e) => handleChange(cat.id, e.target.value)}
                    className="w-28 px-2 py-1 text-xs font-mono bg-zinc-900 border border-zinc-700 rounded-lg text-white text-right focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-zinc-800 flex items-center justify-between bg-zinc-950/50">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset Defaults
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-1.5 text-xs font-semibold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
            >
              <Check className="h-4 w-4" /> Save Budgets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
