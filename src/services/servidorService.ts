import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const buscarServidoresPorNome = async (nome: string) => {
  const response = await axios.get(`${API_URL}/servidores?nome=${nome}`);
  return response.data;
};

// Cria ou atualiza o servidor baseado no ID
export const salvarServidor = async (data: any) => {
    if (data.id) {
      const response = await axios.put(`${API_URL}/servidores/${data.id}`, data);
      return response.data;
    } else {
      const response = await axios.post(`${API_URL}/servidores/`, data);
      return response.data;
    }
  };

export const buscarServidorPorCPF = async (cpf: string) => {
    const response = await axios.get(`${API_URL}/servidores/cpf/${cpf}`);
    return response.data;
};
