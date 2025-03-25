import { useState } from 'react';
import { login, register } from '../api/auth';

export const useAuth = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      alert('Login bem-sucedido!');
      console.log(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Erro desconhecido');
      }
    }
  };
  
  const handleRegister = async () => {
    try {
      const data = await register(name, email, password);
      alert('Usuário registrado com sucesso!');
      console.log(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Erro desconhecido');
      }
    }
  };
  

  return {
    isRegistering,
    setIsRegistering,
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    errorMessage,
    handleLogin,
    handleRegister,
  };
};
