import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ProtocolDetails from './pages/ProtocolDetails';
import NovoProtocolo from './pages/NovoProtocolo';
import Departamentos from './pages/cadastros/Departamentos';
import Servidores from './pages/cadastros/Servidores';
import Processos from './pages/protocolos/Processos';
import ProcessoDetalhes from './pages/ProcessoDetalhes';
import NotFound from "./pages/NotFound";
import Login from './pages/Login';
import EsqueciSenha from './pages/EsqueciSenha';
import ProtectedRoute from './components/ProtectedRoute';

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const { user, isAuthenticated, loading } = useAuth();
  const isLoginPage = location.pathname === '/login';
  const isEsqueciSenhaPage = location.pathname === '/esqueci-senha';
  const isAdmin = user?.role === 'admin';
  
  React.useEffect(() => {
    console.log('AppContent - Estado:', {
      isAuthenticated,
      loading,
      user,
      isAdmin,
      path: location.pathname
    });
  }, [isAuthenticated, loading, user, isAdmin, location.pathname]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }

  return (
    <TooltipProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        {!isLoginPage && !isEsqueciSenhaPage && isAuthenticated && isAdmin && (
          <div className="flex-shrink-0">
            <Sidebar activePath={location.pathname} />
          </div>
        )}
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/esqueci-senha" element={<EsqueciSenha />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            {isAdmin && (
              <>
                <Route path="/protocolo/:id" element={<ProtectedRoute allowedRoles={['admin']}><ProtocolDetails /></ProtectedRoute>} />
                <Route path="/protocolo/novo" element={<ProtectedRoute allowedRoles={['admin']}><NovoProtocolo /></ProtectedRoute>} />
                <Route path="/departamentos" element={<ProtectedRoute allowedRoles={['admin']}><Departamentos /></ProtectedRoute>} />
                <Route path="/servidores" element={<ProtectedRoute allowedRoles={['admin']}><Servidores /></ProtectedRoute>} />
                <Route path="/processos" element={<ProtectedRoute allowedRoles={['admin']}><Processos /></ProtectedRoute>} />
                <Route path="/processo/:id" element={<ProtectedRoute allowedRoles={['admin']}><ProcessoDetalhes /></ProtectedRoute>} />
              </>
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
      <Toaster />
    </TooltipProvider>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
