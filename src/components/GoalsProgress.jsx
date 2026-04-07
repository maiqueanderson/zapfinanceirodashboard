import React from 'react';
import { Target } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function GoalsProgress({ goals, transactionsCurrentMonth }) {
  // Cross data: calculate total spent per category
  const categorySpends = transactionsCurrentMonth.reduce((acc, curr) => {
    // Assuming amount could be negative or positive depending on how they store. 
    // Usually expenses are positive in 'transactions' or we take Math.abs
    acc[curr.category] = (acc[curr.category] || 0) + Math.abs(curr.amount);
    return acc;
  }, {});

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Target size={20} className="text-accent" />
          Metas e Orçamento
        </h2>
      </div>
      
      <div className="space-y-6 flex-1 overflow-y-auto pr-2">
        {goals.length === 0 ? (
          <p className="text-zinc-500 text-sm text-center py-4">Nenhuma meta configurada.</p>
        ) : (
          goals.map(goal => {
            const spent = categorySpends[goal.category] || 0;
            const limit = goal.goal_amount;
            const percentage = limit > 0 ? (spent / limit) * 100 : 0;
            const isOverBudget = percentage > 100;
            const remaining = limit - spent;
            
            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="font-semibold text-zinc-200 block">{goal.category}</span>
                    <span className="text-xs text-zinc-500">
                      {isOverBudget 
                        ? <span className="text-red-400">Excedeu {formatCurrency(Math.abs(remaining))}</span>
                        : <span>Restam {formatCurrency(remaining)}</span>
                      }
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-white">{formatCurrency(spent)}</span>
                    <span className="text-xs text-zinc-500 block">de {formatCurrency(limit)}</span>
                  </div>
                </div>
                
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      isOverBudget ? 'bg-red-500' : percentage > 80 ? 'bg-amber-400' : 'bg-accent'
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
