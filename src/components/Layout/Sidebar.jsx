import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  MessageSquare,
  Bot,
  Settings,
  BrainCircuit,
  Star,
  ShieldCheck,
  FilePlus,
  BarChart2,
  Edit,
  Lock,
  SlidersHorizontal,
  DollarSign,
  Plug,
  LifeBuoy,
  Send,
  CreditCard,
  Settings2,
  Cpu,
  Globe,
  UserCheck,
  Palette,
  Calendar,
  FileSearch,
  FileKey
} from 'lucide-react';

const Sidebar = ({ className }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getNavigationItems = () => {
    const userRole = user?.user_metadata?.role;

    if (userRole === 'admin') {
      return {
        top: [
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
        ],
        bottom: [
          { id: 'ai-models', title: t('aiModels'), icon: Cpu, href: '/admin/ai-models' },
          { id: 'integrations', title: t('integrations'), icon: Plug, href: '/admin/integrations' },
          { id: 'subscriptions', title: t('subscriptionPlans'), icon: CreditCard, href: '/admin/subscription-plans' },
          { id: 'configuration', title: t('featureFlags'), icon: SlidersHorizontal, href: '/admin/configuration' },
          { id: 'security', title: t('securityAndLogs'), icon: Lock, href: '/admin/security' },
          { id: 'languages', title: t('languages'), icon: Globe, href: '/admin/languages' },
          { id: 'theme', title: t('themeEditor'), icon: Palette, href: '/admin/theme' },
          { id: 'app-settings', title: t('appSettings'), icon: Settings2, href: '/admin/app-settings' },
          { id: 'settings', title: t('settings'), icon: Settings, href: '/settings' }
        ]
      };
    }

    const dashboardUrl = userRole === 'investor' ? '/investor-dashboard' : '/founder-dashboard';

    let baseItems = [
      {
        id: 'dashboard',
        title: t('dashboard'),
        icon: LayoutDashboard,
        href: dashboardUrl,
      },
      {
        id: 'matches',
        title: t('matches'),
        icon: Users,
        href: '/matches',
      },
      {
        id: 'pitchEvents',
        title: t('virtualPitchEvents'),
        icon: Star,
        href: '/virtual-pitch-events',
      },
      {
        id: 'dataRoom',
        title: t('dataRoom'),
        icon: FolderOpen,
        href: '/data-room',
      },
      {
        id: 'messages',
        title: t('messages'),
        icon: MessageSquare,
        href: '/messages',
      },
    ];

    if (userRole === 'founder') {
      baseItems.splice(1, 0, {
        id: 'aiAdvisory',
        title: t('aiAdvisory'),
        icon: BrainCircuit,
        href: '/ai-advisory',
      });
      baseItems.push({
        id: 'onboarding',
        title: t('projectOnboarding'),
        icon: FilePlus,
        href: '/project-onboarding',
      });
      baseItems.push({
        id: 'trustHub',
        title: t('trustHub'),
        icon: ShieldCheck,
        href: '/trust-hub',
      });
    }
    
    if (userRole === 'investor') {
      baseItems.splice(1, 0, {
        id: 'aiCopilot',
        title: t('aiCopilot'),
        icon: Bot,
        href: '/ai-copilot',
      });
    }

    const bottomItems = [
      {
        id: 'settings',
        title: t('settings'),
        icon: Settings,
        href: '/settings',
      }
    ];

    return { top: baseItems, bottom: bottomItems };
  };

  const { top: topItems, bottom: bottomItems } = getNavigationItems();

  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={cn(
        "hidden lg:flex flex-col justify-between pb-12 w-64 glass-effect border-r rtl:border-r-0 rtl:border-l min-h-screen",
        className
      )}
      aria-label="Sidebar Navigation"
    >
      <div className="space-y-4 py-4">
        <nav className="px-3 py-2">
          <ul className="space-y-1">
            {topItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.id}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      isActive && "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-white"
                    )}
                    onClick={() => navigate(item.href)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <item.icon className="mr-2 h-4 w-4 rtl:mr-0 rtl:ml-2" aria-hidden="true" />
                    {item.title}
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="space-y-4 py-4">
        <nav className="px-3 py-2">
          <ul className="space-y-1">
            {bottomItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.id}>
                  <Button
                    key={item.href}
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      isActive && "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-white"
                    )}
                    onClick={() => navigate(item.href)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <item.icon className="mr-2 h-4 w-4 rtl:mr-0 rtl:ml-2" aria-hidden="true" />
                    {item.title}
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </motion.aside>
  );
};

export default Sidebar;