import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const {
    email, setEmail, password, setPassword, name, setName,
    handleLogin, handleRegister, errorMessage, isRegistering, setIsRegistering
  } = useAuth();
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/posts');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = isRegistering ? await handleRegister() : await handleLogin();
    
    if (success) {
      navigate('/posts');
    } else {
      alert('Erro ao autenticar');
    }
  };

  return (
    <div>
      <h1>Bem-vindo à HomePage!</h1>
      {errorMessage && <p>{errorMessage}</p>}
      {!localStorage.getItem('token') && (
        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">
            {isRegistering ? 'Registrar' : 'Login'}
          </button>
        </form>
      )}

      {}
      {!localStorage.getItem('token') && (
        <button onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Já tem uma conta? Faça login' : 'Não tem uma conta? Registre-se'}
        </button>
      )}
    </div>
  );
};

export default HomePage;
