import React from 'react';
import { Building2 } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function BankBalances({ accounts }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Building2 size={20} className="text-accent" />
          Saldos Bancários
        </h2>
      </div>
      
      <div className="space-y-4 flex-1 overflow-y-auto pr-2">
        {accounts.length === 0 ? (
          <p className="text-zinc-500 text-sm text-center py-4">Nenhuma conta encontrada.</p>
        ) : (
          accounts.map(acc => (
            <div key={acc.id} className="flex justify-between items-center p-4 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 transition-colors border border-zinc-700/50">
              <span className="font-medium text-zinc-200">{acc.bank_name}</span>
              <span className="font-bold text-emerald-400">{formatCurrency(acc.balance)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
