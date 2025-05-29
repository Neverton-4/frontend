import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { tipoProcessoService } from '@/services/tipoProcessoService';
import { secretariaService } from '@/services/secretariaService';
import { createProcesso } from '@/services/processoService';
import { salvarServidor, buscarServidoresPorNome, buscarServidorPorCPF } from '@/services/servidorService';
import { Customer, TipoServidor, TipoProcesso, Secretaria } from '@/types';
import DadosPessoaisForm from './DadosPessoaisForm';
import ProcessoForm from './ProcessoForm';
import { Button } from '@/components/ui/button';
import AnexarDialog from './AnexarDialog';
import { Paperclip } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import ComprovanteDialog from '@/components/ComprovanteDialog';

const NovoProtocoloFormWrapper = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Customer>({
    id: '', fullName: '', cpf: '',
    logradouro: '', bairro: '', numero: '', cidade: '', uf: '',
    tipoServidor: 'efetivo', lotacao: '', cargo: '', sexo: 'M', secretaria: '', isWhatsapp: false,
    status: 'pendente', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    contato: '', email: '', dateOfBirth: '', tipoProcesso: '', tipoProcesso_escolhido: '', tipoProcessoOutro: '', camposExtras: {}
  });
  const [tiposProcesso, setTiposProcesso] = useState<TipoProcesso[]>([]);
  const [secretarias, setSecretarias] = useState<Secretaria[]>([]);
  const [servidores, setServidores] = useState<any[]>([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);
  const [showAnexarDialog, setShowAnexarDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [protocoloId, setProtocoloId] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tipos, secretarias] = await Promise.all([
          tipoProcessoService.getAll(), secretariaService.getAll()
        ]);
        setTiposProcesso(tipos);
        setSecretarias(secretarias);
      } catch (e) {
        toast.error("Erro ao carregar dados necessários");
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    let fieldValue = type === 'checkbox' ? checked : value;

    if (name.startsWith('extra_')) {
      const campo = name.replace('extra_', '');
      setFormData(prev => ({
        ...prev,
        camposExtras: {
          ...(prev.camposExtras || {}),
          [campo]: fieldValue
        }
      }));
      return;
    }

    if (["cpf", "contato"].includes(name)) {
      fieldValue = value.replace(/\D/g, '');
    }

    if (name === 'cpf' && fieldValue.length <= 11) {
      fieldValue = fieldValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    if (name === 'contato' && fieldValue.length <= 11) {
      fieldValue = fieldValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }

    if (typeof fieldValue === 'string') {
      fieldValue = name === 'email' ? fieldValue.toLowerCase() : fieldValue.toUpperCase();
    }

    setFormData(prev => ({ ...prev, [name]: fieldValue }));
  };

  const handleNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, fullName: value }));

    if (value.length < 3) {
      setServidores([]);
      setShowAutocomplete(false);
      return;
    }

    try {
      const data = await buscarServidoresPorNome(value);
      setServidores(data);
      setShowAutocomplete(true);
    } catch (error) {
      toast.error('Erro ao buscar servidores');
    }
  };

  const handleServidorSelect = (servidor: any) => {
    setFormData(prev => ({
      ...prev,
      id: servidor.id,
      fullName: servidor.nome_completo,
      cpf: servidor.cpf,
      dateOfBirth: servidor.data_nascimento,
      sexo: servidor.sexo,
      logradouro: servidor.logradouro,
      numero: servidor.numero,
      bairro: servidor.bairro,
      cidade: servidor.cidade,
      uf: servidor.uf,
      contato: servidor.contato,
      email: servidor.email,
      tipoServidor: servidor.tipo_servidor,
      cargo: servidor.cargo,
      lotacao: servidor.lotacao,
    }));
    setShowAutocomplete(false);
  };

  const handleProcessoSelect = ({ nome, tipo }) => {
    setFormData(prev => ({
      ...prev,
      tipoProcesso: nome,
      tipoProcesso2: tipo,
      tipoProcessoOutro: '',
      camposExtras: {}
    }));
    setCategoriaSelecionada(tipo);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let servidorId = formData.id;

      if (!servidorId) {
        const servidorExistente = await buscarServidorPorCPF(formData.cpf);
        if (servidorExistente) {
          servidorId = servidorExistente.id;
        } else {
          const novoServidor = await salvarServidor(formData);
          servidorId = novoServidor.id;
        }
      }

      const processoPayload = {
        servidor_id: servidorId,
        usuario_id: user?.id,
        tipo_processo: formData.tipoProcesso_escolhido.toLowerCase(),
        nome: formData.tipoProcesso,
        detalhes: formData.tipoProcessoOutro || '',
        status: 'pendente',
        campos_extras: formData.camposExtras || {}
      };

      const response = await createProcesso(processoPayload);
      setProtocoloId(response.id.toString());
      toast.success('Protocolo criado com sucesso!');
      setShowDialog(true);
    } catch (error) {
      toast.error('Erro ao criar protocolo.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 p-8 overflow-auto">
      <div className="grid grid-cols-10 gap-6">
        <div className="col-span-10 p-4 bg-white">
          <DadosPessoaisForm
            formData={formData}
            handleChange={handleChange}
            handleNameChange={handleNameChange}
            servidores={servidores}
            showAutocomplete={showAutocomplete}
            handleServidorSelect={handleServidorSelect}
            secretarias={secretarias}
          />
          <ProcessoForm
            formData={formData}
            tiposProcesso={tiposProcesso}
            categoriaSelecionada={categoriaSelecionada}
            handleProcessoSelect={handleProcessoSelect}
            handleChange={handleChange}
          />
          <div className="flex justify-between items-center mt-8">
            <Button type="button" variant="outline" size="sm" className="flex items-center gap-2" onClick={() => setShowAnexarDialog(true)}>
              <Paperclip className="h-4 w-4" /> Anexar
            </Button>
            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>Voltar</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Salvando...' : 'Criar'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ComprovanteDialog
        open={showDialog}
        protocoloId={protocoloId}
        onOpenChange={(open) => {
          setShowDialog(open);
          if (!open) navigate('/');
        }}
      />

      {showAnexarDialog && (
        <AnexarDialog
          onClose={() => setShowAnexarDialog(false)}
          onSelecionarArquivo={(file) => toast.success(`Arquivo selecionado: ${file.name}`)}
        />
      )}
    </form>
  );
};

export default NovoProtocoloFormWrapper;
