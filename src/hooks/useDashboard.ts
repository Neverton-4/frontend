import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Processo } from '@/components/CustomerTable';

const useDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [yearDialogOpen, setYearDialogOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState('2025');
  const [isLoading, setIsLoading] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [processos, setProcessos] = useState<Processo[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { toast } = useToast();

  useEffect(() => {
    const fetchProcessos = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/processos');
        if (!response.ok) {
          throw new Error('Erro ao carregar processos');
        }
        const data = await response.json();
        setProcessos(data.value || data);
      } catch (error) {
        console.error('Erro ao buscar processos:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar os processos',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProcessos();
  }, [toast]);

  // Filter processos based on search query
  const filteredProcessos = processos.filter(processo => {
    const searchLower = searchQuery.toLowerCase();
    return (
      processo.descricao?.toLowerCase().includes(searchLower) ||
      processo.tipo_processo?.toLowerCase().includes(searchLower) ||
      processo.servidor?.nome_completo?.toLowerCase().includes(searchLower) ||
      processo.servidor?.matricula?.toLowerCase().includes(searchLower) ||
      processo.servidor?.cpf?.toLowerCase().includes(searchLower) ||
      processo.status?.toLowerCase().includes(searchLower) ||
      processo.id?.toString().includes(searchLower)
    );
  });

  const handleYearChange = async (year: string) => {
    setIsLoading(true);
    try {
      // Simulando uma chamada à API
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSelectedYear(year);
      toast({
        title: 'Sucesso',
        description: `Ano alterado para ${year}`,
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao alterar o ano',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
      setYearDialogOpen(false);
    }
  };

  const totalPages = Math.ceil(filteredProcessos.length / 10);

  return {
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    yearDialogOpen,
    setYearDialogOpen,
    selectedYear,
    setSelectedYear,
    isLoading,
    showStats,
    setShowStats,
    processos,
    loading,
    filteredProcessos,
    handleYearChange,
    totalPages
  };
};

export default useDashboard;