'use client';

// app/login/page.js
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.token);
        window.location.href = '/dashboard'; // Redireciona para o painel de controle
      } else {
        setError('Credenciais inválidas');
      }
    } catch (err) {
      setError('Erro ao fazer login');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Lado esquerdo - Imagem da barbearia */}
      <div 
        className="w-1/2 bg-cover bg-center relative flex justify-center items-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}
      >
        {/* Texto sobre a imagem */}
        <div className="absolute text-white text-4xl font-bold text-center px-4">
          <h3>Tenha a sua barbearia personalizada</h3>
        </div>
      </div>

      {/* Lado direito - Formulário de login */}
      <div className="w-1/2 bg-gradient-to-r from-brown-500 to-bromn-800 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Login</h2>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 border border-gray-300 rounded-md mt-1"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-3 border border-gray-300 rounded-md mt-1"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
            >
              Entrar
            </button>
          </form>
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-black hover:text-gray-500 hover:underline">Esqueceu a senha?</a>
          </div>
        </div>
      </div>
    </div>
  );
}
