import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Bell, Globe, CreditCard, Puzzle, User, LifeBuoy, Palette, FileText, Moon, Sun } from 'lucide-react';

const SettingsPage = ({ setMobileSidebarOpen }) => {
  const { t, language, changeLanguage, languages } = useLanguage();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleDeleteAccount = async () => {
    await signOut();
    toast({
      title: 'Account Deleted',
      description: 'Your account has been successfully deleted.',
    });
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title>{t('settings')} - SharkVest</title>
      </Helmet>
      <div className="min-h-screen flex bg-background">
        <Sidebar />
        <div className="flex-1">
          <Header setMobileSidebarOpen={setMobileSidebarOpen} />
          <main className="p-4 sm:p-6">
            <h1 className="text-3xl font-bold mb-6">{t('settings')}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle className="flex items-center"><User className="mr-2"/> {t('manageYourProfile')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline" onClick={() => navigate('/profile')}>{t('myProfile')}</Button>
                </CardContent>
              </Card>

              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle className="flex items-center"><Globe className="mr-2"/> {t('languageAndRegion')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline" onClick={() => setIsLanguageModalOpen(true)}>{t('chooseYourLanguage')}</Button>
                </CardContent>
              </Card>

              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle className="flex items-center"><Bell className="mr-2"/> {t('manageNotifications')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline" onClick={() => setIsNotificationsModalOpen(true)}>{t('chooseHowToBeNotified')}</Button>
                </CardContent>
              </Card>

              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle className="flex items-center"><Shield className="mr-2"/> {t('securitySettings')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline" onClick={() => setIsSecurityModalOpen(true)}>{t('manageAccountSecurity')}</Button>
                </CardContent>
              </Card>

              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle className="flex items-center"><CreditCard className="mr-2"/> {t('subscriptions')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline" onClick={() => navigate('/subscriptions')}>{t('manageSubscriptions')}</Button>
                </CardContent>
              </Card>

              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle className="flex items-center"><FileText className="mr-2"/> {t('termsAndConditions')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline" onClick={() => setIsTermsModalOpen(true)}>{t('viewTerms')}</Button>
                </CardContent>
              </Card>

              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle className="flex items-center"><Palette className="mr-2"/> Theme</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <Label htmlFor="theme-switch">
                    {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                  </Label>
                  <div className="flex items-center">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Switch
                      id="theme-switch"
                      checked={theme === 'dark'}
                      onCheckedChange={handleThemeSwitch}
                      className="mx-2"
                    />
                    <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  </div>
                </CardContent>
              </Card>

              {user?.user_metadata?.role === 'admin' && (
                <>
                  <Card className="glass-effect">
                    <CardHeader>
                      <CardTitle className="flex items-center"><Puzzle className="mr-2"/> {t('integrations')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" variant="outline" onClick={() => navigate('/integrations')}>{t('connectApps')}</Button>
                    </CardContent>
                  </Card>
                  <Card className="glass-effect">
                    <CardHeader>
                      <CardTitle className="flex items-center"><Palette className="mr-2"/> {t('applicationControl')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" variant="outline" onClick={() => navigate('/application-control')}>{t('customizeUI')}</Button>
                    </CardContent>
                  </Card>
                </>
              )}

              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle className="flex items-center"><LifeBuoy className="mr-2"/> {t('support')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline" onClick={() => navigate('/support')}>{t('visitSupportCenter')}</Button>
                </CardContent>
              </Card>

              <Card className="glass-effect border-destructive">
                <CardHeader>
                  <CardTitle className="text-destructive">{t('deleteAccount')}</CardTitle>
                  <CardDescription>{t('permanentlyRemoveAccount')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="w-full">
                        {t('deleteAccount')}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>{t('areYouSure')}</AlertDialogTitle>
                        <AlertDialogDescription>
                          {t('deleteAccountConfirmation')}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                          {t('delete')}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>

      <Dialog open={isLanguageModalOpen} onOpenChange={setIsLanguageModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('languageAndRegion')}</DialogTitle>
            <DialogDescription>{t('chooseYourLanguage')}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select value={language} onValueChange={changeLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Select a language" />
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
          <DialogFooter>
            <Button onClick={() => setIsLanguageModalOpen(false)}>{t('done')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isNotificationsModalOpen} onOpenChange={setIsNotificationsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('manageNotifications')}</DialogTitle>
            <DialogDescription>{t('chooseHowToBeNotified')}</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">{t('emailNotifications')}</Label>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notifications">{t('pushNotifications')}</Label>
              <Switch id="push-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="new-matches">{t('newMatchAlerts')}</Label>
              <Switch id="new-matches" defaultChecked />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsNotificationsModalOpen(false)}>{t('savePreferences')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isSecurityModalOpen} onOpenChange={setIsSecurityModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('securitySettings')}</DialogTitle>
            <DialogDescription>{t('manageAccountSecurity')}</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-6">
            <div>
              <Label htmlFor="current-password">{t('changePassword')}</Label>
              <Input id="current-password" type="password" placeholder={t('currentPassword')} />
              <Input className="mt-2" type="password" placeholder={t('newPassword')} />
              <Input className="mt-2" type="password" placeholder={t('confirmNewPassword')} />
            </div>
            <div>
              <Label htmlFor="ip-whitelist">{t('ipWhitelisting')}</Label>
              <Input id="ip-whitelist" placeholder="e.g., 192.168.1.1" />
              <p className="text-xs text-muted-foreground mt-1">{t('ipWhitelistDesc')}</p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsSecurityModalOpen(false)}>{t('saveChanges')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isTermsModalOpen} onOpenChange={setIsTermsModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{t('termsAndConditions')}</DialogTitle>
          </DialogHeader>
          <div className="py-4 max-h-[60vh] overflow-y-auto text-sm text-muted-foreground space-y-4">
            <p>Last updated: October 2, 2025</p>
            <p>Please read these terms and conditions carefully before using Our Service.</p>
            <h3 className="font-bold text-lg text-foreground">Interpretation and Definitions</h3>
            <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
            <h3 className="font-bold text-lg text-foreground">Acknowledgment</h3>
            <p>These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p>
            <p>Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.</p>
            <h3 className="font-bold text-lg text-foreground">User Accounts</h3>
            <p>When You create an account with Us, You must provide Us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of Your account on Our Service.</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsTermsModalOpen(false)}>{t('close')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SettingsPage;