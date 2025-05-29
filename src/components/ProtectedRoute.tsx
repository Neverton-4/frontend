import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  allowedDepartments?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles = ['admin', 'user'],
  allowedDepartments = []
}) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    console.log('ProtectedRoute - Estado:', {
      isAuthenticated,
      loading,
      user,
      path: location.pathname
    });
  }, [isAuthenticated, loading, user, location.pathname]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!isAuthenticated) {
    console.log('Usuário não autenticado, redirecionando para login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user) {
    console.log('Usuário não encontrado');
    return null;
  }

  // Verifica se o usuário tem a role necessária
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    console.log('Usuário sem permissão para acessar esta página');
    toast.error('Você não tem permissão para acessar esta página');
    return <Navigate to="/dashboard" replace />;
  }

  // Se for um usuário comum, verifica se tem acesso ao departamento
  if (user.role === 'user' && allowedDepartments.length > 0) {
    if (!user.department || !allowedDepartments.includes(user.department)) {
      console.log('Usuário sem permissão para acessar este departamento');
      toast.error('Você não tem permissão para acessar este departamento');
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute; 