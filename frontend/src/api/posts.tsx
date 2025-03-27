import axios from 'axios';

const API_URL = 'http://localhost:3000/user/posts';

export const fetchPosts = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Usuário não autenticado');
    }

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    return [];
  }
};
