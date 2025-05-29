import React from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DashboardActionsProps {
  yearDialogOpen: boolean;
  setYearDialogOpen: (open: boolean) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  isLoading: boolean;
  handleYearChange: (year: string) => void;
}

const DashboardActions: React.FC<DashboardActionsProps> = ({
  yearDialogOpen,
  setYearDialogOpen,
  selectedYear,
  setSelectedYear,
  isLoading,
  handleYearChange
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4">
      <Button onClick={() => navigate('/protocolo/novo')} className="bg-primary text-white">
        <Plus className="h-4 w-4 mr-2" />
        NOVO PROTOCOLO
      </Button>

      <Dialog open={yearDialogOpen} onOpenChange={setYearDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
            {selectedYear}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Escolha um ano para acessar</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Select
                value={selectedYear}
                onValueChange={setSelectedYear}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o ano" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button 
              onClick={() => handleYearChange(selectedYear)}
              disabled={isLoading}
              className="bg-primary text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Carregando...
                </>
              ) : (
                'Confirmar'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardActions;