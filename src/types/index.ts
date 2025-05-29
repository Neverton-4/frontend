export type Status = 'pendente' | 'em_andamento' | 'concluido' | 'cancelado';

export type TipoServidor = 'efetivo' | 'temporario' | 'comissionado' | 'nao_servidor';

// export type Secretaria = 
//   | 'Gabinete' 
//   | 'SECAD' 
//   | 'SECOM' 
//   | 'SECULT' 
//   | 'SEFIN' 
//   | 'SEICOMTUR' 
//   | 'SEMAGRI' 
//   | 'SEMAS' 
//   | 'SEMDEL' 
//   | 'SEMED' 
//   | 'SEMUTRAN' 
//   | 'SEPLAN' 
//   | 'SMS' 
//   | 'SUOV' 
//   | 'Outros';

// export type TipoProcesso = 
//   | 'licenca_especial'
//   | 'licenca_sem_vencimento'
//   | 'licenca_paternidade'
//   | 'licenca_maternidade'
//   | 'licenca_doenca_familia'
//   | 'licenca_saude'
//   | 'licenca_eletiva'
//   | 'licenca_casamento'
//   | 'licenca_afastamento_conjuge'
//   | 'licenca_obrigacoes_leis'
//   | 'licenca_nojo'
//   | 'declaracao_tempo_servico'
//   | 'declaracao_tempo_servico_ipmc'
//   | 'declaracao_tempo_servico_inss'
//   | 'declaracao_tempo_processo_seletivo'
//   | 'declaracao_nao_exerce_funcoes'
//   | 'gratificacao_nivel_superior'
//   | 'gratificacao_pos_graduacao'
//   | 'gratificacao_mestrado'
//   | 'gratificacao_doutorado'
//   | 'permissao_uso'
//   | 'renovacao_permissao_uso'
//   | 'titulo_perpetuidade'
//   | 'retificacao_nome'
//   | 'reducao_carga_horaria'
//   | 'exoneracao'
//   | 'desligamento'
//   | 'outro';

export interface Customer {
  id: string;
  fullName: string;
  cpf: string;
    logradouro: string;
    bairro: string;
    numero: string;
    cidade: string;
    uf: string;
  tipoServidor: TipoServidor;
  lotacao: string;
  cargo: string;
  sexo: 'M' | 'F' | 'O';
  secretaria: string;
  contato: string;
  isWhatsapp: boolean;
  email: string;
  dateOfBirth: string;
  tipoProcesso: string;
  tipoProcessoOutro?: string;
  status: 'pendente' | 'em_andamento' | 'concluido' | 'cancelado';
  createdAt: string;
  updatedAt: string;
  camposExtras: any;
  tipoProcesso_escolhido: string;
}

export interface StatusSummary {
  pendente: number;
  em_andamento: number;
  concluido: number;
  cancelado: number;
}

export interface Usuario {
    id: number;
    nome: string;
    username: string;
    email: string;
    cargo: string;
    departamento_id: number;
    is_admin: boolean;
    is_active: boolean;
    role: 'admin' | 'user';
    status: 'ativo' | 'inativo';
    ultimo_login: string | null;
    created_at: string;
    updated_at: string;
}

export interface Departamento {
    id: number;
    nome: string;
    acesso_total: boolean;
    is_principal: boolean;
    descricao: string | null;
    created_at: string;
    updated_at: string;
}

export interface AcaoDepartamento {
    id: number;
    departamento_id: number;
    nome_acao: string;
    codigo_acao: string;
    descricao: string | null;
    ativo: boolean;
    created_at: string;
}

export interface TipoProcesso {
    id: number;
    nome: string;
    descricao: string;
    tipo: 'licenca' | 'gratificacao' | 'declaracao' | 'outro';
    campos_extras: any;
    created_at: string;
}

export interface Modelo {
    id: number;
    departamento_id: number;
    tipos_processos_id: number;
    nome_arquivo: string;
    caminho_arquivo: string;
    created_at: string;
}

export interface Secretaria {
    id: number;
    nome: string;
    abrev: string;
    email: string;
    responsavel: string;
    sexo: 'M' | 'F' | 'O';
    cargo: string;
    created_at?: string;
    updated_at?: string;
}

export interface Servidor {
    id: number;
    matricula: string | null;
    nome_completo: string;
    cpf: string;
    data_nascimento: string | null;
    sexo: 'M' | 'F' | 'O';
    cep: string | null;
    logradouro: string | null;
    numero: string | null;
    complemento: string | null;
    bairro: string | null;
    cidade: string | null;
    uf: string | null;
    contato: string | null;
    email: string | null;
    tipo_servidor: 'efetivo' | 'comissionado' | 'temporario' | 'nao_servidor';
    cargo: string;
    lotacao: string;
    data_admissao: string | null;
    status: 'ativo' | 'inativo' | 'licenca' | 'aposentado' | 'exonerado';
    observacoes: string | null;
    created_at: string;
    updated_at: string;
}

export interface Processo {
    id: number;
    servidor_id: number;
    usuario_id: number;
    tipo_processo: 'licenca' | 'declaracao' | 'gratificacao' | 'outro';
    nome: string;
    detalhes: string | null;
    status: 'pendente' | 'em_andamento' | 'concluido' | 'cancelado';
    created_at: string;
    updated_at: string;
}

export interface Documento {
    id: number;
    processo_id: number;
    usuario_id: number;
    departamento_id: number;
    nome_arquivo: string;
    detalhes: string | null;
    caminho_arquivo: string;
    created_at: string;
}

export interface EtapaProcesso {
    id: number;
    processo_id: number;
    usuario_id: number;
    departamento_id: number;
    etapa_status: 'pendente' | 'em_andamento' | 'concluido' | 'cancelado';
    data_inicio: string;
    data_fim: string | null;
    observacao: string | null;
    etapa_final: boolean;
    ordem: number;
    created_at: string;
}
