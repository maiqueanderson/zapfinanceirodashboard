import React from 'react';
import { History } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/formatters';

export default function TransactionsTable({ transactions }) {
  // Take only the 10 most recent transactions for the table, or all if preferred. Let's show up to 10.
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 h-full flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <History size={20} className="text-zinc-400" />
          Últimas Transações
        </h2>
      </div>
      
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 text-zinc-500 text-sm">
              <th className="pb-3 font-semibold pl-2">Data</th>
              <th className="pb-3 font-semibold">Descrição</th>
              <th className="pb-3 font-semibold">Categoria</th>
              <th className="pb-3 font-semibold text-right pr-2">Valor</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {recentTransactions.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-8 text-zinc-500">
                  Nenhuma transação encontrada.
                </td>
              </tr>
            ) : (
              recentTransactions.map((tx) => (
                <tr key={tx.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                  <td className="py-4 pl-2 text-zinc-400">
                    {formatDate(tx.date)}
                  </td>
                  <td className="py-4 font-medium text-zinc-200">
                    {tx.description}
                  </td>
                  <td className="py-4">
                    <span className="bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded-md text-xs font-medium">
                      {tx.category}
                    </span>
                  </td>
                  <td className="py-4 text-right pr-2">
                    <span className={`font-bold ${tx.amount < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                      {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
