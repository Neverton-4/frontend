import React from 'react';
import { Processo } from '@/services/processoService';

interface ProcessInfoProps {
  processo: Processo;
}

const ProcessInfo: React.FC<ProcessInfoProps> = ({ processo }) => {
  return (
    <>
      {/* Linha divisória */}
      <div className="col-span-2 my-4 border-t border-gray-200"></div>

      {/* Dados do Processo */}
      <div className="col-span-2">
        <h3 className="text-lg font-semibold mb-2">Dados do Processo</h3>
      </div>

      <div>
        <h3 className="font-medium mb-0.5">Tipo de Processo</h3>
        <p className="text-gray-600">{processo.tipo_processo}</p>
      </div>
      
      {/* <div>
        <h3 className="font-medium mb-0.5">Descrição</h3>
        <p className="text-gray-600">{processo.descricao}</p>
      </div> */}

      <div>
        <h3 className="font-medium mb-0.5">Data de Entrada</h3>
        <p className="text-gray-600">{new Date(processo.created_at).toLocaleDateString()}</p>
      </div>
      
      <div>
        <h3 className="font-medium mb-0.5">Status</h3>
        <p className="text-gray-600">{processo.status}</p>
      </div>

      {processo.detalhes && (
        <div className="col-span-2">
          <h3 className="font-medium mb-0.5">Detalhes</h3>
          <p className="text-gray-600">{processo.detalhes}</p>
        </div>
      )}
    </>
  );
};

export default ProcessInfo;