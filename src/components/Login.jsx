import React, { useState } from 'react';
import { Lock } from 'lucide-react';

export default function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'm81892461') {
      onLogin();
    } else {
      setError('Senha incorreta.');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center mb-5 border border-zinc-700 shadow-inner">
            <Lock className="text-accent" size={32} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-2">Acesso Restrito</h1>
          <p className="text-zinc-500 text-sm">Informe a senha para gerenciar suas finanças</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="password"
              placeholder="Digite a senha..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3.5 rounded-xl outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-zinc-600 font-medium"
              autoFocus
            />
            {error && <p className="text-red-400 text-sm mt-3 font-medium text-center animate-pulse">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-accent/20 flex justify-center active:scale-[0.98]"
          >
            Acessar Painel
          </button>
        </form>
      </div>
    </div>
  );
}
