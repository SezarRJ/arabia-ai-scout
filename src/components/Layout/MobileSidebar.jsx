import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { X, LayoutDashboard, Users, FolderOpen, MessageSquare, BrainCircuit, Bot, Settings, ShieldCheck, FilePlus, BarChart2, Edit, Lock, SlidersHorizontal, DollarSign, Plug, LifeBuoy, Send, CreditCard, Settings2, Cpu, Globe, UserCheck, Palette, Calendar, FileSearch, FileKey, Shield } from 'lucide-react';

const MobileSidebar = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (href) => {
    navigate(href);
    onClose();
  };

  const getNavigationItems = () => {
    const userRole = user?.user_metadata?.role;

    if (userRole === 'admin') {
      return [
        { id: 'dashboard', title: t('adminDashboard'), icon: LayoutDashboard, href: '/admin' },
        { id: 'users', title: t('userManagement'), icon: Users, href: '/admin/users' },
        { id: 'roles', title: t('roleManagement'), icon: UserCheck, href: '/admin/roles' },
        { id: 'financials', title: t('financials'), icon: DollarSign, href: '/admin/financials' },
        { id: 'analytics', title: t('analytics'), icon: BarChart2, href: '/admin/analytics' },
        { id: 'content', title: t('contentControl'), icon: Edit, href: '/admin/content' },
        { id: 'events', title: t('eventManagement'), icon: Calendar, href: '/admin/events' },
        { id: 'dataroom', title: t('dataRoomAudit'), icon: FileKey, href: '/admin/dataroom-audit' },
        { id: 'reports', title: t('reportGeneration'), icon: FileSearch, href: '/admin/reports' },
        { id: 'support', title: t('support'), icon: LifeBuoy, href: '/admin/support' },
        { id: 'campaigns', title: t('emailCampaigns'), icon: Send, href: '/admin/campaigns' },
        { id: 'ai-models', title: t('aiModels'), icon: Cpu, href: '/admin/ai-models' },
        { id: 'integrations', title: t('integrations'), icon: Plug, href: '/admin/integrations' },
        { id: 'subscriptions', title: t('subscriptionPlans'), icon: CreditCard, href: '/admin/subscription-plans' },
        { id: 'configuration', title: t('featureFlags'), icon: SlidersHorizontal, href: '/admin/configuration' },
        { id: 'security', title: t('securityAndLogs'), icon: Lock, href: '/admin/security' },
        { id: 'languages', title: t('languages'), icon: Globe, href: '/admin/languages' },
        { id: 'theme', title: t('themeEditor'), icon: Palette, href: '/admin/theme' },
        { id: 'app-settings', title: t('appSettings'), icon: Settings2, href: '/admin/app-settings' },
        { id: 'settings', title: t('settings'), icon: Settings, href: '/settings' }
      ];
    }

    const dashboardUrl = userRole === 'investor' ? '/investor-dashboard' : '/founder-dashboard';

    let items = [
      { id: 'dashboard', title: t('dashboard'), icon: LayoutDashboard, href: dashboardUrl },
      { id: 'matches', title: t('matches'), icon: Users, href: '/matches' },
    ];

    if (userRole === 'founder') {
      items.push({ id: 'aiAdvisory', title: t('aiAdvisory'), icon: BrainCircuit, href: '/ai-advisory' });
      items.push({ id: 'trustHub', title: t('trustHub'), icon: ShieldCheck, href: '/trust-hub' });
    }
    if (userRole === 'investor') {
      items.push({ id: 'aiCopilot', title: t('aiCopilot'), icon: Bot, href: '/ai-copilot' });
    }
    
    items.push({ id: 'messages', title: t('messages'), icon: MessageSquare, href: '/messages' });
    items.push({ id: 'dataRoom', title: t('dataRoom'), icon: FolderOpen, href: '/data-room' });
    items.push({ id: 'settings', title: t('settings'), icon: Settings, href: '/settings' });

    return items;
  };

  const navItems = getNavigationItems();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 z-50 lg:hidden"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-full w-72 bg-background z-50 flex flex-col lg:hidden"
            aria-label="Mobile Sidebar Navigation"
          >
            <div className="p-4 border-b border-border flex justify-between items-center">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  SharkVest
                </span>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex-1 p-4 overflow-y-auto">
              <ul className="space-y-2">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <li key={item.id}>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn("w-full justify-start text-base h-12", isActive && "font-bold")}
                        onClick={() => handleNavigation(item.href)}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <item.icon className="mr-3 h-5 w-5 rtl:mr-0 rtl:ml-3" aria-hidden="true" />
                        {item.title}
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;