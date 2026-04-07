import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#6366f1'];

export default function ExpensesChart({ transactions }) {
  // Aggregate data by category
  const aggregatedData = transactions.reduce((acc, curr) => {
    const existing = acc.find(item => item.name === curr.category);
    const amount = Math.abs(curr.amount);
    if (existing) {
      existing.value += amount;
    } else {
      acc.push({ name: curr.category, value: amount });
    }
    return acc;
  }, []);

  // Sort by value (descending)
  aggregatedData.sort((a, b) => b.value - a.value);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-800 border border-zinc-700 p-3 rounded-lg shadow-xl">
          <p className="text-zinc-200 font-medium">{payload[0].name}</p>
          <p className="text-accent font-bold">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 h-full flex flex-col min-h-[300px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <PieChartIcon size={20} className="text-blue-400" />
          Gastos por Categoria
        </h2>
      </div>
      
      <div className="flex-1 w-full h-full min-h-[250px]">
        {aggregatedData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-zinc-500 text-sm">
            Nenhuma transação neste mês.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={aggregatedData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {aggregatedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle"
                wrapperStyle={{ fontSize: '12px', color: '#a1a1aa' }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
