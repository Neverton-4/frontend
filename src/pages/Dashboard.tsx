import React from 'react';
import CustomerTable from '@/components/CustomerTable';
import Header from '../components/Header';
import DashboardStats from '@/components/Dashboard/DashboardStats';
import DashboardActions from '@/components/Dashboard/DashboardActions';
import DashboardSearch from '@/components/Dashboard/DashboardSearch';
import DashboardLoading from '@/components/Dashboard/DashboardLoading';
import useDashboard from '@/hooks/useDashboard';

const Dashboard: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    yearDialogOpen,
    setYearDialogOpen,
    selectedYear,
    setSelectedYear,
    isLoading,
    showStats,
    setShowStats,
    processos,
    loading,
    filteredProcessos,
    handleYearChange,
    totalPages
  } = useDashboard();

  if (loading) {
    return <DashboardLoading />;
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <Header />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8 pt-0">
          <DashboardStats 
            processos={processos}
            showStats={showStats}
            setShowStats={setShowStats}
          />
          
          <div className="flex justify-between items-center mb-6">
            <DashboardActions 
              yearDialogOpen={yearDialogOpen}
              setYearDialogOpen={setYearDialogOpen}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              isLoading={isLoading}
              handleYearChange={handleYearChange}
            />

            <DashboardSearch 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>

          <CustomerTable 
            processos={filteredProcessos}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
