import React from 'react';
import { Customer, Secretaria as SecretariaInterface } from '@/types';

interface Props {
  formData: Customer;
  setFormData: React.Dispatch<React.SetStateAction<Customer>>;
  secretarias: SecretariaInterface[];
}

const FormDadosPessoais: React.FC<Props> = ({ formData, setFormData, secretarias }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('endereco.')) {
      const campo = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        endereco: {
          ...prev.endereco,
          [campo]: value,
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div>
        <label htmlFor="cpf" className="block font-semibold mb-1">CPF</label>
        <input
          type="text"
          id="cpf"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label htmlFor="contato" className="block font-semibold mb-1">Contato</label>
        <input
          type="text"
          id="contato"
          name="contato"
          value={formData.contato}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label htmlFor="endereco.logradouro" className="block font-semibold mb-1">Logradouro</label>
        <input
          type="text"
          id="endereco.logradouro"
          name="endereco.logradouro"
          value={formData.endereco.logradouro}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label htmlFor="endereco.numero" className="block font-semibold mb-1">Número</label>
        <input
          type="text"
          id="endereco.numero"
          name="endereco.numero"
          value={formData.endereco.numero}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label htmlFor="endereco.bairro" className="block font-semibold mb-1">Bairro</label>
        <input
          type="text"
          id="endereco.bairro"
          name="endereco.bairro"
          value={formData.endereco.bairro}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label htmlFor="endereco.cidade" className="block font-semibold mb-1">Cidade</label>
        <input
          type="text"
          id="endereco.cidade"
          name="endereco.cidade"
          value={formData.endereco.cidade}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label htmlFor="endereco.uf" className="block font-semibold mb-1">UF</label>
        <input
          type="text"
          id="endereco.uf"
          name="endereco.uf"
          value={formData.endereco.uf}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label htmlFor="sexo" className="block font-semibold mb-1">Sexo</label>
        <select
          id="sexo"
          name="sexo"
          value={formData.sexo}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        >
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
          <option value="O">Outro</option>
        </select>
      </div>

      <div>
        <label htmlFor="lotacao" className="block font-semibold mb-1">Lotação</label>
        <select
          id="lotacao"
          name="lotacao"
          value={formData.lotacao}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        >
          <option value="">Selecione a lotação</option>
          {secretarias.map(sec => (
            <option key={sec.id} value={sec.abrev}>
              ({sec.abrev}) {sec.nome}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="cargo" className="block font-semibold mb-1">Cargo</label>
        <input
          type="text"
          id="cargo"
          name="cargo"
          value={formData.cargo}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label htmlFor="dateOfBirth" className="block font-semibold mb-1">Data de Nascimento</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>
    </div>
  );
};

export default FormDadosPessoais;
