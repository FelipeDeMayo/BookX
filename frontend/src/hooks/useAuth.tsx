import { useState } from 'react';
import { login, register } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); 
  };

  const handleLogin = async (): Promise<boolean> => {
    try {
      const data = await login(email, password);
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      alert('Login bem-sucedido!');
      console.log(data);
      navigate('/posts');
      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Erro desconhecido');
      }
      return false;
    }
  };

  const handleRegister = async (): Promise<boolean> => {
    try {
      const data = await register(name, email, password);
      alert('Usuário registrado com sucesso!');
      console.log(data);
      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Erro desconhecido');
      }
      return false;
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
    handleLogout,
  };
};
