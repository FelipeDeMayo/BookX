import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const HomePage = () => {
  const {
    email, setEmail, password, setPassword, name, setName, 
    handleLogin, handleRegister, errorMessage, isRegistering, setIsRegistering
  } = useAuth();

  return (
    <div>
      <h1>Bem-vindo à HomePage!</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={(e) => {
        e.preventDefault();
        isRegistering ? handleRegister() : handleLogin();
      }}>
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
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Já tem uma conta? Faça login' : 'Não tem uma conta? Registre-se'}
      </button>
    </div>
  );
};

export default HomePage;
