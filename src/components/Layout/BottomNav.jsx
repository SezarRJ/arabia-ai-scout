import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  MessageSquare,
  BrainCircuit,
  Bot,
  Star,
} from 'lucide-react';

const BottomNav = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getNavigationItems = () => {
    const userRole = user?.user_metadata?.role;

    if (userRole === 'admin') {
      return []; // No bottom nav for admin
    }

    const dashboardUrl = userRole === 'investor' ? '/investor-dashboard' : '/founder-dashboard';

    let items = [
      { id: 'dashboard', title: t('dashboard'), icon: LayoutDashboard, href: dashboardUrl },
      { id: 'matches', title: t('matches'), icon: Users, href: '/matches' },
    ];

    if (userRole === 'founder') {
      items.push({ id: 'aiAdvisory', title: t('aiAdvisory'), icon: BrainCircuit, href: '/ai-advisory' });
    }
    if (userRole === 'investor') {
      items.push({ id: 'aiCopilot', title: t('aiCopilot'), icon: Bot, href: '/ai-copilot' });
    }

    items.push({ id: 'messages', title: t('messages'), icon: MessageSquare, href: '/messages' });
    items.push({ id: 'dataRoom', title: t('dataRoom'), icon: FolderOpen, href: '/data-room' });

    return items.slice(0, 5); // Max 5 items
  };

  const navItems = getNavigationItems();

  if (!user || navItems.length === 0) {
    return null;
  }

  return (
    <div className="lg:hidden fixed top-16 left-0 right-0 h-14 bg-card/95 backdrop-blur-lg border-b border-border z-30 shadow-sm">
      <nav className="h-full">
        <ul className="flex justify-around items-center h-full px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.id} className="flex-1">
                <button
                  onClick={() => navigate(item.href)}
                  className={cn(
                    "w-full h-full flex flex-col items-center justify-center text-xs gap-1 transition-colors rounded-lg",
                    isActive ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.title}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default BottomNav;