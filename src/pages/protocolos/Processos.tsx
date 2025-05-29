import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card-component';
import Header from '@/components/Header';
import { Edit, Trash2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProcessoItem {
  id: string;
  title: string;
}

interface ProcessoSection {
  title: string;
  items: ProcessoItem[];
}

const Processos: React.FC = () => {
  const navigate = useNavigate();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newProcess, setNewProcess] = useState<{ type: string; name: string }>({
    type: '',
    name: ''
  });
  
  const sections: ProcessoSection[] = [
    {
      title: 'Licenças',
      items: [
        { id: 'especial', title: 'Especial' },
        { id: 'sem-vencimentos', title: 'Sem Vencimentos' },
        { id: 'maternidade', title: 'Maternidade' },
        { id: 'paternidade', title: 'Paternidade' },
        { id: 'motivo-doenca-familia', title: 'Motivo de Doença em Pessoa da Família' },
        { id: 'saude', title: 'Saúde' },
        { id: 'eletiva', title: 'Eletiva' },
        { id: 'casamento', title: 'Casamento' },
        { id: 'motivo-afastamento-conjuge', title: 'Motivo de Afastamento de Cônjuge' },
        { id: 'cumprir-obrigacoes', title: 'Cumprir as Obrigações Estabelecidas em lei' },
        { id: 'nojo', title: 'Nojo' }
      ]
    },
    {
      title: 'Declarações de Tempo de Serviço',
      items: [
        { id: 'aposentadoria-inss', title: 'Aposentadoria INSS' },
        { id: 'aposentadoria-ipmc', title: 'Aposentadoria IPMC' },
        { id: 'processo-seletivo', title: 'Processo Seletivo' },
        { id: 'nao-exerce-funcoes', title: 'Que não exerce mais funções nessa Prefeitura' },
        { id: 'motivo-doenca-familia-dec', title: 'Motivo de Doença em Pessoa da Família' }
      ]
    },
    {
      title: 'Gratificações',
      items: [
        { id: 'nivel-superior', title: 'Nível superior' },
        { id: 'titularidade-pos', title: 'Titularidade Pós-Graduação' },
        { id: 'titularidade-mestrado', title: 'Titularidade Mestrado' },
        { id: 'titularidade-doutorado', title: 'Titularidade Doutorado' }
      ]
    },
    {
      title: 'Outros',
      items: [
        { id: 'permissao-uso', title: 'Permissão de Uso' },
        { id: 'renovacao-permissao', title: 'Renovação da Permissão de Uso' },
        { id: 'titulo-perpetuidade', title: 'Título de Perpetuidade' },
        { id: 'retificacao-nome', title: 'Retificação de Nome' },
        { id: 'reducao-carga', title: 'Redução de Carga horária' },
        { id: 'exoneracao', title: 'Exoneração' },
        { id: 'desligamento', title: 'Desligamento' }
      ]
    }
  ];

  const processTypes = [
    'Licenças',
    'Declarações de Tempo de Serviço',
    'Gratificações',
    'Outros'
  ];

  const handleEdit = (id: string) => {
    navigate(`/processo/${id}`);
  };

  const handleDelete = (id: string) => {
    console.log('Delete:', id);
  };

  const handleAddProcess = () => {
    if (newProcess.type && newProcess.name) {
      console.log('Novo processo:', newProcess);
      setNewProcess({ type: '', name: '' });
      setIsAddDialogOpen(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <Header 
        userName="João Silva" 
        userRole="Administrador" 
        breadcrumb="Processos" 
      />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex gap-4 mb-8">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  ADICIONAR PROCESSO
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Processo</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="type">Tipo de Processo</Label>
                    <Select
                      value={newProcess.type}
                      onValueChange={(value) => setNewProcess({ ...newProcess, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {processTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nome do Processo</Label>
                    <Input
                      id="name"
                      placeholder="Digite o nome do processo"
                      value={newProcess.name}
                      onChange={(e) => setNewProcess({ ...newProcess, name: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddProcess} className="bg-blue-600 hover:bg-blue-700 text-white">
                    Salvar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.map((section) => (
              <div key={section.title}>
                <Card className="overflow-hidden">
                  <div className="bg-[#1E293B] text-white p-4">
                    <h2 className="text-lg font-semibold">{section.title}</h2>
                  </div>
                  <div className="p-4 space-y-2 bg-white">
                    {section.items.map((item) => (
                      <div 
                        key={item.id}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => handleEdit(item.id)}
                      >
                        <span className="text-sm text-gray-700">{item.title}</span>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-gray-200"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(item.id);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-gray-200"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(item.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Processos;
