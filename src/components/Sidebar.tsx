import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, Home, LogOut, Settings, Users, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarItemProps {
  icon: React.ComponentType<any>;
  label: string;
  href: string;
  active?: boolean;
  minimized?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, href, active, minimized }) => {
  return (
    <Link
      to={href}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
        active ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent/50',
        minimized ? 'justify-center' : ''
      )}
    >
      <Icon className="h-5 w-5" />
      {!minimized && <span>{label}</span>}
    </Link>
  );
};

interface SidebarProps {
  activePath: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activePath }) => {
  const [minimized, setMinimized] = useState(false);

  return (
    <div className={cn(
      "bg-sidebar h-screen flex flex-col transition-all duration-300",
      minimized ? "w-16" : "w-60"
    )}>
      <div className="p-4 border-b border-sidebar-border relative">
        <div className="flex items-center gap-2 text-sidebar-foreground">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
            <BarChart2 className="h-5 w-5 text-white" />
          </div>
          {!minimized && <span className="font-bold text-lg">COINSPACE</span>}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMinimized(!minimized)}
          className="absolute top-2 right-2 h-8 w-8 p-0 hover:bg-sidebar-accent/50"
        >
          {minimized ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      {!minimized && (
        <div className="p-4 border-b border-sidebar-border">
          <span className="text-sm font-medium text-sidebar-foreground">Administrativo</span>
        </div>
      )}
      
      <div className="flex-1 p-3 space-y-1.5 overflow-auto">
        <SidebarItem 
          icon={Home} 
          label="Dashboard" 
          href="/" 
          active={activePath === '/'} 
          minimized={minimized} 
        />
        <SidebarItem 
          icon={Users} 
          label="Departamentos" 
          href="/departamentos" 
          active={activePath === '/departamentos'} 
          minimized={minimized} 
        />
        <SidebarItem 
          icon={Users} 
          label="Servidores" 
          href="/servidores" 
          active={activePath === '/servidores'} 
          minimized={minimized} 
        />
        <SidebarItem 
          icon={FileText} 
          label="Processos" 
          href="/processos" 
          active={activePath === '/processos'} 
          minimized={minimized} 
        />
        <SidebarItem 
          icon={Settings} 
          label="Settings" 
          href="/settings" 
          active={activePath === '/settings'} 
          minimized={minimized} 
        />
      </div>
      
      <div className="p-3 border-t border-sidebar-border">
        <SidebarItem 
          icon={LogOut} 
          label="Log Out" 
          href="/logout" 
          minimized={minimized} 
        />
      </div>
    </div>
  );
};

export default Sidebar;
