import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

export const useServidorSearch = () => {
  const [servidores, setServidores] = useState<any[]>([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleSearchServidor = async (value: string) => {
    if (value.length < 3) {
      setServidores([]);
      setShowAutocomplete(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8000/api/processos/servidores?nome=${value}`);
      setServidores(response.data);
      setShowAutocomplete(true);
    } catch (error) {
      console.error('Erro ao buscar servidores:', error);
      toast.error('Erro ao buscar servidores');
    }
  };

  return {
    servidores,
    showAutocomplete,
    setShowAutocomplete,
    searchTimeout,
    setSearchTimeout,
    handleSearchServidor
  };
};