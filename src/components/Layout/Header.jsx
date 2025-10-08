import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Bell, Settings, LogOut, Globe, Shield, User, Home, FileUp, Menu } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const adminNotifications = [
  { id: 1, text: "Aisha Al-Fulan uploaded 'ID_Card.jpg'", time: "2m ago" },
  { id: 2, text: "New startup 'InnovateAI' completed onboarding.", time: "1h ago" },
  { id: 3, text: "John Doe's document 'inappropriate_image.jpg' was flagged by AI.", time: "3h ago" },
];

const Header = ({ setMobileSidebarOpen }) => {
  const { language, changeLanguage, t, direction, languages } = useLanguage();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleAdminNotificationClick = (notification) => {
    toast({
      title: "Navigating to task...",
      description: notification.text,
    });
    if (notification.text.includes("uploaded")) {
      navigate('/admin/users');
    }
  };

  const getDashboardUrl = () => {
    if (!user) return '/';
    const role = user.user_metadata?.role;
    if (role === 'admin') return '/admin';
    if (role === 'investor') return '/investor-dashboard';
    return '/founder-dashboard';
  }

  const userRole = user?.user_metadata?.role;
  const userFirstName = user?.user_metadata?.first_name;
  const userLastName = user?.user_metadata?.last_name;

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-30 w-full border-b glass-effect"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-4 rtl:space-x-reverse">
          {user && (
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
          )}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer"
            onClick={() => navigate(getDashboardUrl())}
          >
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="hidden sm:inline text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              SharkVest
            </span>
          </motion.div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4 rtl:space-x-reverse">
          <div className="hidden sm:block">
            <Select value={language} onValueChange={changeLanguage}>
              <SelectTrigger className="w-auto sm:w-32" aria-label={t('chooseYourLanguage')}>
                <SelectValue>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Globe className="w-4 h-4" />
                    <span className="hidden sm:inline">{languages.find(l => l.value === language)?.flag}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {user ? (
            <>
              {userRole !== 'admin' && (
                <div className="hidden sm:flex items-center space-x-2 rtl:space-x-reverse">
                  <Badge variant="outline" className="trust-score-gradient text-white border-0">
                    <Shield className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                    {user.user_metadata?.trust_score || 0}
                  </Badge>
                </div>
              )}

              {userRole === 'admin' ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative" aria-label={`${adminNotifications.length} ${t('adminNotifications')}`}>
                      <Bell className="w-5 h-5" />
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                        {adminNotifications.length}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-80" align={direction === 'rtl' ? 'start' : 'end'}>
                    <DropdownMenuLabel>{t('adminNotifications')}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {adminNotifications.map(notif => (
                      <DropdownMenuItem key={notif.id} onClick={() => handleAdminNotificationClick(notif)}>
                        <FileUp className="mr-2 h-4 w-4 text-blue-400 rtl:mr-0 rtl:ml-2" />
                        <div className="flex flex-col">
                          <span className="text-sm">{notif.text}</span>
                          <span className="text-xs text-muted-foreground">{notif.time}</span>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" size="icon" className="relative" onClick={() => navigate('/notifications')} aria-label={`3 ${t('unread')} ${t('notifications')}`}>
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white" aria-hidden="true">
                    3
                  </span>
                </Button>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full" aria-label={t('profile')}>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url || "/placeholder-avatar.jpg"} alt={userFirstName} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        {userFirstName?.[0]}{userLastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align={direction === 'rtl' ? 'start' : 'end'}>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {userFirstName} {userLastName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4 rtl:mr-0 rtl:ml-2" />
                    <span>{t('profile')}</span>
                  </DropdownMenuItem>
                   <DropdownMenuItem onClick={() => navigate('/notifications')}>
                    <Bell className="mr-2 h-4 w-4 rtl:mr-0 rtl:ml-2" />
                    <span>{t('notifications')}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <Settings className="mr-2 h-4 w-4 rtl:mr-0 rtl:ml-2" />
                    <span>{t('settings')}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4 rtl:mr-0 rtl:ml-2" />
                    <span>{t('logout')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
             <>
              <Button variant="ghost" onClick={() => navigate('/login')}>
                {t('login')}
              </Button>
              <Button onClick={() => navigate('/register')} className="gradient-bg">
                {t('getStarted')}
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;