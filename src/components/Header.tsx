import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export interface HeaderProps {
  userName: string;
  userRole: string;
  breadcrumb: string;
}

const Header: React.FC<HeaderProps> = ({ userName, userRole, breadcrumb }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log('Dados do usuário no Header:', user);
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-2">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">{breadcrumb || "Dashboard"}</h1>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 h-8">
              <div className="flex flex-col items-end">
                <span className="font-medium text-xs">{user?.nome || "Usuário"}</span>
                <span className="text-[10px] text-muted-foreground">{user?.cargo || "Cargo"}</span>
              </div>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>Meu Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuItem 
              className="text-red-600"
              onClick={handleLogout}
            >
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header; 