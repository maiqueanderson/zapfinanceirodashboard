import React, { useState } from 'react';
import { CalendarClock, AlertCircle, CreditCard, ChevronDown, ChevronRight, Wallet } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function PendingBills({ bills }) {
  const [expandedMonth, setExpandedMonth] = useState(null);

  // Filtrar faturas e outras contas
  const faturas = bills.filter(b => {
    const desc = b.description.toLowerCase();
    return desc.includes('fatura') || desc.includes('cartão') || desc.includes('cartao');
  });
  
  const others = bills.filter(b => {
    const desc = b.description.toLowerCase();
    return !(desc.includes('fatura') || desc.includes('cartão') || desc.includes('cartao'));
  });

  // Agrupar faturas por mês
  const monthsArr = [
    'janeiro', 'fevereiro', 'março', 'marco', 'abril', 'maio', 'junho', 
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
  ];
  
  const faturasByMonth = faturas.reduce((acc, fatura) => {
    let monthName = 'Outros';
    const descLower = fatura.description.toLowerCase();
    for (let m of monthsArr) {
      if (descLower.includes(m)) {
        monthName = m.charAt(0).toUpperCase() + m.slice(1);
        if (monthName === 'Marco') monthName = 'Março';
        break;
      }
    }
    if (!acc[monthName]) acc[monthName] = [];
    acc[monthName].push(fatura);
    return acc;
  }, {});

  const toggleMonth = (month) => {
    setExpandedMonth(expandedMonth === month ? null : month);
  };

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
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-6">
        {bills.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-zinc-500 h-full">
            <AlertCircle size={32} className="mb-2 opacity-50" />
            <p className="text-sm">Tudo pago por enquanto!</p>
          </div>
        ) : (
          <>
            {/* Seção de Faturas de Cartão */}
            {faturas.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-zinc-400 mb-3 flex items-center gap-2">
                  <CreditCard size={16} className="text-purple-400" /> 
                  Faturas de Cartão
                </h3>
                <div className="space-y-2">
                  {Object.entries(faturasByMonth).map(([month, monthBills]) => (
                    <div key={month} className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl overflow-hidden transition-all duration-300">
                      <button 
                        onClick={() => toggleMonth(month)}
                        className="w-full flex items-center justify-between p-3 hover:bg-zinc-800/80 transition-colors"
                      >
                        <div className="flex items-center gap-2 text-zinc-200 font-medium">
                          {expandedMonth === month ? (
                            <ChevronDown size={16} className="text-purple-400" />
                          ) : (
                            <ChevronRight size={16} className="text-zinc-500" />
                          )}
                          {month}
                        </div>
                        <div className="text-xs font-semibold text-purple-400 bg-purple-400/10 rounded-full px-2.5 py-1">
                          {monthBills.length} {monthBills.length === 1 ? 'fatura' : 'faturas'}
                        </div>
                      </button>
                      
                      {expandedMonth === month && (
                        <div className="p-3 pt-1 space-y-2 border-t border-zinc-700/30 bg-zinc-800/20">
                          {monthBills.map(bill => (
                            <div key={bill.id} className="flex justify-between items-center p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 hover:border-purple-500/30 transition-all">
                              <span className="text-sm font-medium text-zinc-300">{bill.description}</span>
                              <span className="text-sm font-bold text-purple-400">{formatCurrency(bill.amount)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Seção de Outras Contas */}
            {others.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-zinc-400 mb-3 flex items-center gap-2">
                  <Wallet size={16} className="text-amber-400" /> 
                  Outras Contas
                </h3>
                <div className="space-y-2">
                  {others.map(bill => (
                    <div key={bill.id} className="group flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-zinc-800/50 to-zinc-800/80 border border-zinc-700/50 hover:border-amber-500/30 transition-all">
                      <span className="font-medium text-zinc-200 text-sm">{bill.description}</span>
                      <span className="font-bold text-amber-500 text-sm">{formatCurrency(bill.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
