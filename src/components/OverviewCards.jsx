import React from 'react';
import { Wallet, TrendingDown, CreditCard } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function OverviewCards({ totalBalance, totalSpent, totalPending }) {
  const cards = [
    {
      title: 'Saldo Total',
      amount: totalBalance,
      icon: Wallet,
      color: 'text-emerald-400',
      bgIcon: 'bg-emerald-400/10',
      border: 'border-emerald-500/20'
    },
    {
      title: 'Gasto este Mês',
      amount: totalSpent,
      icon: TrendingDown,
      color: 'text-red-400',
      bgIcon: 'bg-red-400/10',
      border: 'border-red-500/20'
    },
    {
      title: 'Pendente (Contas)',
      amount: totalPending,
      icon: CreditCard,
      color: 'text-amber-400',
      bgIcon: 'bg-amber-400/10',
      border: 'border-amber-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div 
            key={idx} 
            className={`p-6 rounded-2xl bg-zinc-900 border ${card.border} shadow-lg flex items-center gap-5 transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20`}
          >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${card.bgIcon}`}>
              <Icon className={card.color} size={28} />
            </div>
            <div>
              <p className="text-zinc-400 text-sm font-medium mb-1">{card.title}</p>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {formatCurrency(card.amount)}
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}
