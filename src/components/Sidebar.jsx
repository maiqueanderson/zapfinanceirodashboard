import React from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  Receipt, 
  Target, 
  Settings, 
  LogOut 
} from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Wallet, label: 'Contas', active: false },
    { icon: Receipt, label: 'Transações', active: false },
    { icon: Target, label: 'Metas', active: false },
  ];

  return (
    <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col h-screen fixed lg:relative z-20 hidden lg:flex">
      <div className="p-6">
        <h1 className="text-xl tracking-tight font-bold bg-gradient-to-r from-accent to-accent-dark bg-clip-text text-transparent flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center text-white shadow-lg">
            $
          </div>
          ZapFin
        </h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                item.active 
                  ? 'bg-zinc-800/80 text-white shadow-sm border border-zinc-700/50' 
                  : 'text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-200'
              }`}
            >
              <Icon size={20} className={item.active ? 'text-accent' : ''} />
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-zinc-800 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-200 rounded-xl transition-colors font-medium">
          <Settings size={20} />
          Configurações
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-red-400 rounded-xl transition-colors font-medium">
          <LogOut size={20} />
          Sair
        </button>
      </div>
    </aside>
  );
}
