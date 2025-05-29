import React, { createContext, useContext, useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  nome: string;
  cargo: string;
  department?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token encontrado:', token ? 'Sim' : 'Não');
    
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      checkAuth();
    } else {
      setLoading(false);
    }
  }, []);

  const checkAuth = async () => {
    try {
      console.log('Verificando autenticação...');
      const response = await axios.get('http://localhost:8000/api/auth/me');
      console.log('Dados do usuário:', response.data);
      setUser(response.data);
    } catch (error) {
      console.error('Erro na verificação de autenticação:', error);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      console.log('Tentando login...');
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      const response = await axios.post('http://localhost:8000/api/auth/token', formData);
      console.log('Resposta do login:', response.data);
      
      const { access_token, user } = response.data;
      localStorage.setItem('token', access_token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      setUser(user);
    } catch (error) {
      console.error('Erro no login:', error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
          throw new Error('Usuário ou senha inválidos');
        } else if (axiosError.response?.status === 403) {
          throw new Error('Usuário inativo ou sem permissão de acesso');
        } else if (axiosError.response?.status === 404) {
          throw new Error('Servidor de autenticação não encontrado');
        } else if (axiosError.response?.status === 500) {
          throw new Error('Erro interno do servidor. Tente novamente mais tarde.');
        } else if (!axiosError.response) {
          throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão.');
        } else {
          throw new Error('Ocorreu um erro durante a autenticação');
        }
      } else {
        throw new Error('Ocorreu um erro inesperado');
      }
    }
  };

  const logout = () => {
    console.log('Logout sendo executado...');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user && !!localStorage.getItem('token'),
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 