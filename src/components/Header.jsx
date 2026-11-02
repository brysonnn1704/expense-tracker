import React from 'react';
import { Wallet, Plus, Download, Upload, RotateCcw, ShieldCheck } from 'lucide-react';

export default function Header({ onAddClick, onManageBudget, onExportCSV, onExportJSON, onImportJSON, onReset }) {
  const fileInputRef = React.useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          onImportJSON(parsed);
        } catch {
          alert('Invalid backup file. Please select a valid JSON export.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <header className="border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20 flex items-center justify-center">
            <div className="h-full w-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
              <Wallet className="h-5 w-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white">ExpenseTracker<span className="text-emerald-400">Pro</span></h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="h-3 w-3" /> E2E Local
              </span>
            </div>
            <p className="text-xs text-zinc-400">Intelligent categorical budget & cashflow control</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Data Actions */}
          <div className="flex items-center gap-1.5 bg-zinc-900/80 border border-zinc-800 rounded-lg p-1 text-xs">
            <button
              onClick={onExportCSV}
              title="Export Transactions as CSV"
              className="px-2.5 py-1 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded flex items-center gap-1 transition-colors"
            >
              <Download className="h-3.5 w-3.5" /> CSV
            </button>
            <button
              onClick={onExportJSON}
              title="Backup JSON Data"
              className="px-2.5 py-1 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded flex items-center gap-1 transition-colors"
            >
              <Download className="h-3.5 w-3.5" /> Backup
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              title="Restore from JSON"
              className="px-2.5 py-1 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded flex items-center gap-1 transition-colors"
            >
              <Upload className="h-3.5 w-3.5" /> Restore
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              onClick={onReset}
              title="Reset to Initial Seed Data"
              className="px-2 py-1 text-zinc-400 hover:text-rose-400 hover:bg-zinc-800 rounded transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>

          <button
            onClick={onManageBudget}
            className="px-3 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-colors"
          >
            Adjust Budgets
          </button>

          <button
            onClick={onAddClick}
            className="px-3.5 py-1.5 text-xs font-semibold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-md shadow-emerald-500/20 flex items-center gap-1.5 transition-all transform active:scale-95"
          >
            <Plus className="h-4 w-4 stroke-[2.5]" /> Add Transaction
          </button>
        </div>
      </div>
    </header>
  );
}
