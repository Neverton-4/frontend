
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/pages/Dashboard';

const Index = () => {
  const location = useLocation();
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activePath={location.pathname} />
      <Dashboard />
    </div>
  );
};

export default Index;
