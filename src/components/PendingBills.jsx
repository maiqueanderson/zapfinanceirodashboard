import React from 'react';
import { CalendarClock, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function PendingBills({ bills }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <CalendarClock size={20} className="text-amber-400" />
          Contas a Pagar
        </h2>
        <span className="text-xs font-semibold bg-amber-400/10 text-amber-500 px-2.5 py-1 rounded-full">
          {bills.length} Pendentes
        </span>
      </div>
      
      <div className="space-y-4 flex-1 overflow-y-auto pr-2">
        {bills.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-zinc-500">
            <AlertCircle size={32} className="mb-2 opacity-50" />
            <p className="text-sm">Tudo pago por enquanto!</p>
          </div>
        ) : (
          bills.map(bill => (
            <div key={bill.id} className="group flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-zinc-800/50 to-zinc-800/80 border border-zinc-700/50 hover:border-amber-500/30 transition-all">
              <div className="flex flex-col">
                <span className="font-medium text-zinc-200">{bill.description}</span>
              </div>
              <span className="font-bold text-amber-500">{formatCurrency(bill.amount)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
