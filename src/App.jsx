import React, { useState, useEffect } from 'react';
import { isSameMonth, parseISO } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { supabase } from './supabaseClient';

import Sidebar from './components/Sidebar';
import OverviewCards from './components/OverviewCards';
import BankBalances from './components/BankBalances';
import PendingBills from './components/PendingBills';
import GoalsProgress from './components/GoalsProgress';
import ExpensesChart from './components/ExpensesChart';
import TransactionsTable from './components/TransactionsTable';
import Login from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('zapFinAuth') === 'true';
  });
  const [loading, setLoading] = useState(true);
  
  // States to hold db data
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [scheduledExpenses, setScheduledExpenses] = useState([]);
  const [categoryGoals, setCategoryGoals] = useState([]);

  // States to hold derived metrics
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalSpentMonth, setTotalSpentMonth] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
  const [transactionsCurrentMonth, setTransactionsCurrentMonth] = useState([]);

  const userId = 1; // Fixo conforme instrução

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch All Data Concurrently using user_id = 1
        const [
          { data: accData, error: accErr },
          { data: transData, error: transErr },
          { data: expData, error: expErr },
          { data: goalsData, error: goalsErr }
        ] = await Promise.all([
          supabase.from('accounts').select('*').eq('user_id', userId),
          supabase.from('transactions').select('*').eq('user_id', userId),
          supabase.from('scheduled_expenses').select('*').eq('user_id', userId).eq('is_active', true),
          supabase.from('category_goals').select('*').eq('user_id', userId)
        ]);

        if (accErr) console.error("Error accounts:", accErr);
        if (transErr) console.error("Error transactions:", transErr);
        if (expErr) console.error("Error scheduled_expenses:", expErr);
        if (goalsErr) console.error("Error category_goals:", goalsErr);

        const safeAccounts = accData || [];
        const safeTransactions = transData || [];
        const safeExpenses = expData || [];
        const safeGoals = goalsData || [];

        setAccounts(safeAccounts);
        setTransactions(safeTransactions);
        setScheduledExpenses(safeExpenses);
        setCategoryGoals(safeGoals);

        // Calculate derived variables
        const currentMonth = new Date();
        
        // Total balance
        const accTotal = safeAccounts.reduce((acc, curr) => acc + Number(curr.balance), 0);
        setTotalBalance(accTotal);

        // Filter transactions for current month only
        const currentMonthTxs = safeTransactions.filter(tx => {
          if (!tx.date) return false;
          return isSameMonth(parseISO(tx.date), currentMonth);
        });
        setTransactionsCurrentMonth(currentMonthTxs);

        // Total spent in month
        // Assuming expenses might be stored as positive or negative. Let's sum absolute values or sum negatives.
        // For standard personal finance, usually "gastos" is sum of negatives or known categories.
        // As we don't know the exact schema behavior, we will sum all amounts. If negative, sum Math.abs() for those < 0.
        const spentTotal = currentMonthTxs.reduce((acc, tx) => {
          // Assuming all transactions might be expenses or income. 
          // If amount < 0, it's expense. Or maybe the category is what matters. 
          // Let's assume everything shown in chart and spent is an absolute expense.
          return acc + Math.abs(Number(tx.amount));
        }, 0);
        setTotalSpentMonth(spentTotal);

        // Total pending
        const pendingTotal = safeExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
        setTotalPending(pendingTotal);

      } catch (err) {
        console.error("Dashboard fetching error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userId, isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('zapFinAuth', 'true');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-accent" size={48} />
        <h2 className="text-zinc-400 font-medium tracking-tight">Sincronizando ZapFinanceiro...</h2>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden font-sans">
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto relative">
        {/* Header (Mobile Logo fallback / Top Actions if needed) */}
        <header className="px-8 py-6 flex justify-between items-center bg-zinc-950/80 backdrop-blur-md sticky top-0 z-10 border-b border-zinc-900">
          <h1 className="text-2xl font-bold text-white tracking-tight">Visão Geral</h1>
          
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-zinc-700 overflow-hidden flex items-center justify-center">
              <span className="text-zinc-400 font-medium">U1</span>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8 flex-1 pb-24">
          
          {/* Section 1: Overview stats */}
          <OverviewCards 
            totalBalance={totalBalance} 
            totalSpent={totalSpentMonth} 
            totalPending={totalPending} 
          />

          {/* Section 2: Top Widgets */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:h-[400px]">
            <div className="xl:col-span-1">
              <BankBalances accounts={accounts} />
            </div>
            <div className="xl:col-span-1">
              <PendingBills bills={scheduledExpenses} />
            </div>
            <div className="xl:col-span-1">
              <GoalsProgress 
                goals={categoryGoals} 
                transactionsCurrentMonth={transactionsCurrentMonth} 
              />
            </div>
          </div>

          {/* Section 3: Bottom Widgets */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:h-[450px]">
            <div className="xl:col-span-1">
              <ExpensesChart transactions={transactionsCurrentMonth} />
            </div>
            <div className="xl:col-span-2">
              <TransactionsTable transactions={transactions} />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
