import React from 'react';
import { Processo } from '@/services/processoService';

interface ServerInfoProps {
  processo: Processo;
}

const ServerInfo: React.FC<ServerInfoProps> = ({ processo }) => {
  return (
    <>
      {/* Dados do Servidor */}
      <div className="col-span-2">
        <h3 className="text-lg font-semibold mb-3">Dados do Servidor</h3>
      </div>
      
      <div>
        <h3 className="font-medium mb-1">Nome do Servidor</h3>
        <p className="text-gray-600">{processo.servidor.nome_completo}</p>
      </div>
      
      <div>
        <h3 className="font-medium mb-1">CPF</h3>
        <p className="text-gray-600">{processo.servidor.cpf}</p>
      </div>
      
      <div className="col-span-2">
        <h3 className="font-medium mb-1">Endereço</h3>
        <p className="text-gray-600">
          {processo.servidor.logradouro}, {processo.servidor.numero} - {processo.servidor.bairro} - {processo.servidor.cidade}/{processo.servidor.uf}
        </p>
      </div>
      
      <div>
        <h3 className="font-medium mb-1">Contato</h3>
        <p className="text-gray-600">{processo.servidor.contato}</p>
      </div>
      
      <div>
        <h3 className="font-medium mb-1">Email</h3>
        <p className="text-gray-600">{processo.servidor.email}</p>
      </div>
      
      <div>
        <h3 className="font-medium mb-1">Matrícula</h3>
        <p className="text-gray-600">{processo.servidor.matricula || 'Não informada'}</p>
      </div>
      
      <div>
        <h3 className="font-medium mb-1">Lotação</h3>
        <p className="text-gray-600">{processo.servidor.lotacao}</p>
      </div>
      
      <div>
        <h3 className="font-medium mb-1">Sexo</h3>
        <p className="text-gray-600">{processo.servidor.sexo === 'M' ? 'Masculino' : processo.servidor.sexo === 'F' ? 'Feminino' : 'Outro'}</p>
      </div>
      
      <div>
        <h3 className="font-medium mb-1">Data de Nascimento</h3>
        <p className="text-gray-600">{new Date(processo.servidor.data_nascimento).toLocaleDateString()}</p>
      </div>
      
      <div>
        <h3 className="font-medium mb-1">Data de Admissão</h3>
        <p className="text-gray-600">{processo.servidor.data_admissao ? new Date(processo.servidor.data_admissao).toLocaleDateString() : 'Não informado'}</p>
      </div>
      
      <div>
        <h3 className="font-medium mb-1">Tipo de Servidor</h3>
        <p className="text-gray-600">{processo.servidor.tipo_servidor}</p>
      </div>
      
      <div>
        <h3 className="font-medium mb-1">Cargo</h3>
        <p className="text-gray-600">{processo.servidor.cargo}</p>
      </div>
      
      <div>
        <h3 className="font-medium mb-1">Status</h3>
        <p className="text-gray-600">{processo.servidor.status}</p>
      </div>
      
      {processo.servidor.observacoes && (
        <div className="col-span-2">
          <h3 className="font-medium mb-1">Observações</h3>
          <p className="text-gray-600">{processo.servidor.observacoes}</p>
        </div>
      )}
    </>
  );
};

export default ServerInfo;