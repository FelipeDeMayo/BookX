import axios from 'axios';

const API_URL = 'http://localhost:3000/user';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('Erro no login: ' + error.message);
    } else {
      throw new Error('Erro desconhecido');
    }
  }
};

export const register = async (name: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { name, email, password });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('Erro ao registrar usuário: ' + error.message);
    } else {
      throw new Error('Erro desconhecido');
    }
  }
};
