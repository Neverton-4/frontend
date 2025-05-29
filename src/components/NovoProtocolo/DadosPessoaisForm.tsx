import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Search } from 'lucide-react';
import ServidorAutocomplete from './ServidorAutocomplete';

const DadosPessoaisForm = ({ formData, handleChange, handleNameChange, servidores, showAutocomplete, handleServidorSelect, secretarias }) => {
  return (
    <div className="grid gap-4">
      <h2 className="text-lg font-semibold mb-2">Dados Pessoais</h2>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-4 space-y-2 relative">
          <Label htmlFor="fullName">Nome Completo</Label>
          <div className="relative">
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleNameChange}
              required
            />
            <Search className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <ServidorAutocomplete servidores={servidores} showAutocomplete={showAutocomplete} handleServidorSelect={handleServidorSelect} />
        </div>
        <div className="col-span-1 space-y-2">
          <Label htmlFor="cpf">CPF</Label>
          <Input id="cpf" name="cpf" value={formData.cpf} onChange={handleChange} />
        </div>
      </div>

      <div className="grid grid-cols-10 gap-4">
        <div className="col-span-9 space-y-2">
          <Label htmlFor="logradouro">Logradouro</Label>
          <Input id="logradouro" name="logradouro" value={formData.logradouro} onChange={handleChange}  />
        </div>
        <div className="col-span-1 space-y-2">
          <Label htmlFor="numero">Número</Label>
          <Input id="numero" name="numero" value={formData.numero} onChange={handleChange}  />
        </div>
      </div>

      <div className="grid grid-cols-10 gap-4">
        <div className="col-span-4 space-y-2">
          <Label htmlFor="bairro">Bairro</Label>
          <Input id="bairro" name="bairro" value={formData.bairro} onChange={handleChange}  />
        </div>
        <div className="col-span-4 space-y-2">
          <Label htmlFor="cidade">Cidade</Label>
          <Input id="cidade" name="cidade" value={formData.cidade} onChange={handleChange}  />
        </div>
        <div className="col-span-2 space-y-2">
          <Label htmlFor="uf">UF</Label>
          <Input id="uf" name="uf" value={formData.uf} onChange={handleChange}  />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
      <div className="space-y-2">
          <Label>Sexo</Label>
          <Select value={formData.sexo} onValueChange={(value) => handleChange({ target: { name: 'sexo', value } })}>
            <SelectTrigger><SelectValue placeholder="Selecione o sexo" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="M">Masculino</SelectItem>
              <SelectItem value="F">Feminino</SelectItem>
              <SelectItem value="O">Outro</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input id="email" name="email" value={formData.email} onChange={handleChange}  />
        </div>
        
        <div className="space-y-2">
      <Label>Contato</Label>
      <div className="flex items-center gap-4">
        <Input
          id="contato"
          name="contato"
          value={formData.contato}
          onChange={handleChange}
          required
          className="flex-1"
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="isWhatsapp"
            checked={formData.isWhatsapp || false}
            onChange={(e) => handleChange({ target: { name: 'isWhatsapp', value: e.target.checked } })}
          />
          WhatsApp?
        </label>
      </div>
    </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label>Tipo de Servidor</Label>
          <Select value={formData.tipoServidor} onValueChange={(value) => handleChange({ target: { name: 'tipoServidor', value } })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="efetivo">Efetivo</SelectItem>
              <SelectItem value="comissionado">Comissionado</SelectItem>
              <SelectItem value="temporario">Temporário</SelectItem>
              <SelectItem value="nao_servidor">Não Servidor</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Lotação</Label>
          <Select value={formData.lotacao} onValueChange={(value) => handleChange({ target: { name: 'lotacao', value } })}>
            <SelectTrigger><SelectValue placeholder="Selecione a lotação" /></SelectTrigger>
            <SelectContent>
              {secretarias.map((secretaria) => (
                <SelectItem key={secretaria.id} value={secretaria.abrev}>
                  ({secretaria.abrev}) {secretaria.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Cargo</Label>
          <Input id="cargo" name="cargo" value={formData.cargo} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label>Data de Nascimento</Label>
          <Input id="dateOfBirth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} required />
        </div>
      </div>
    </div>
  );
};

export default DadosPessoaisForm;