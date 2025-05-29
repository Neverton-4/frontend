import Header from '../components/Header';
import NovoProtocoloFormWrapper from '@/components/NovoProtocolo/NovoProtocoloFormWrapper';
import { useAuth } from '../contexts/AuthContext';

const NovoProtocolo = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col h-full">
      <Header
        userName={user?.nome || "Usuário"}
        userRole={user?.cargo || "Cargo"}
        breadcrumb="Novo Protocolo"
      />
      <NovoProtocoloFormWrapper />
    </div>
  );
};

export default NovoProtocolo;