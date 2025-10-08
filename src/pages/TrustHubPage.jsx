import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';
import { ShieldCheck, UserCheck, Building, Link, MailCheck, CheckCircle, AlertCircle, Clock, FileText, DollarSign, Briefcase, Image as ImageIcon, Phone, BarChart2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const VerificationItem = ({ icon: Icon, title, description, status, actionText, onAction, disabled, points }) => {
  const getStatusBadge = () => {
    switch (status) {
      case 'Verified':
        return <Badge variant="success"><CheckCircle className="w-3 h-3 mr-1" /> Verified</Badge>;
      case 'In Review':
        return <Badge variant="warning"><Clock className="w-3 h-3 mr-1" /> In Review</Badge>;
      case 'Pending':
        return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" /> Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-secondary rounded-lg border border-border gap-4">
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <Icon className="w-8 h-8 text-primary" />
        <div>
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4 rtl:space-x-reverse self-end sm:self-center">
        <Badge variant="outline" className="font-bold">+{points} pts</Badge>
        {getStatusBadge()}
        {status === 'Pending' && <Button size="sm" onClick={onAction} disabled={disabled}>{actionText}</Button>}
      </div>
    </div>
  );
};

const TrustHubPage = ({ setMobileSidebarOpen }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const userRole = user?.user_metadata?.role;

  const handleAction = (actionName, points) => {
    toast({
      title: `Action: ${actionName}`,
      description: `This would trigger the flow and grant ${points} points upon completion.`,
    });
  };

  // Founder Score Items
  const founderProfileItems = [
    { icon: ImageIcon, title: 'Add profile photo', points: 10, status: 'Pending', actionText: 'Upload' },
    { icon: FileText, title: 'Fill about section', points: 10, status: 'Pending', actionText: 'Edit Profile' },
    { icon: Link, title: 'Connect LinkedIn', points: 8, status: 'Pending', actionText: 'Connect' },
    { icon: Building, title: 'Add company name', points: 5, status: 'Verified', actionText: 'Edit' },
  ];

  const founderIdentityItems = [
    { icon: MailCheck, title: 'Verify email', points: 10, status: 'Verified', actionText: 'Resend' },
    { icon: Phone, title: 'Verify phone', points: 10, status: 'Pending', actionText: 'Verify' },
    { icon: UserCheck, title: 'Upload ID', points: 13, status: 'Pending', actionText: 'Upload' },
  ];

  const founderProjectItems = [
    { icon: FileText, title: 'Upload pitch deck', points: 15, status: 'Pending', actionText: 'Upload' },
    { icon: DollarSign, title: 'Add funding goal', points: 10, status: 'Pending', actionText: 'Add' },
    { icon: Briefcase, title: 'Select industry', points: 5, status: 'Verified', actionText: 'Edit' },
    { icon: FileText, title: 'Write 1-line description', points: 4, status: 'Verified', actionText: 'Edit' },
  ];

  // Investor Score Items
  const investorProfileItems = [
    { icon: ImageIcon, title: 'Add profile photo', points: 10, status: 'Pending', actionText: 'Upload' },
    { icon: FileText, title: 'Fill "About Me" section', points: 10, status: 'Pending', actionText: 'Edit Profile' },
    { icon: Link, title: 'Connect LinkedIn', points: 10, status: 'Pending', actionText: 'Connect' },
    { icon: Building, title: 'Add company/firm name', points: 10, status: 'Verified', actionText: 'Edit' },
  ];

  const investorIdentityItems = [
    { icon: MailCheck, title: 'Verify email', points: 10, status: 'Verified', actionText: 'Resend' },
    { icon: Phone, title: 'Verify phone', points: 10, status: 'Pending', actionText: 'Verify' },
    { icon: UserCheck, title: 'Simple accreditation check', points: 10, status: 'Pending', actionText: 'Start Check' },
  ];

  const investorPreferencesItems = [
    { icon: Briefcase, title: 'Select industries you invest in', points: 10, status: 'Pending', actionText: 'Select' },
    { icon: DollarSign, title: 'Set investment range', points: 10, status: 'Pending', actionText: 'Set Range' },
    { icon: BarChart2, title: 'Choose startup stages', points: 10, status: 'Pending', actionText: 'Choose Stages' },
  ];

  const calculateProgress = (items) => {
    const total = items.length;
    if (total === 0) return 0;
    const completed = items.filter(item => item.status === 'Verified').length;
    return (completed / total) * 100;
  };

  const renderFounderTrustScore = () => (
    <>
      <div className="space-y-4">
        <h3 className="font-semibold">Step 1: Complete Basic Profile (33 points)</h3>
        <Progress value={calculateProgress(founderProfileItems)} />
        <div className="space-y-3">
          {founderProfileItems.map((item, index) => (
            <VerificationItem key={`founder-profile-${index}`} {...item} onAction={() => handleAction(item.title, item.points)} />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="font-semibold">Step 2: Verify Identity (33 points)</h3>
        <Progress value={calculateProgress(founderIdentityItems)} />
        <div className="space-y-3">
          {founderIdentityItems.map((item, index) => (
            <VerificationItem key={`founder-identity-${index}`} {...item} onAction={() => handleAction(item.title, item.points)} />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="font-semibold">Step 3: Add Project (34 points)</h3>
        <Progress value={calculateProgress(founderProjectItems)} />
        <div className="space-y-3">
          {founderProjectItems.map((item, index) => (
            <VerificationItem key={`founder-project-${index}`} {...item} onAction={() => handleAction(item.title, item.points)} />
          ))}
        </div>
      </div>
    </>
  );

  const renderInvestorTrustScore = () => (
    <>
      <div className="space-y-4">
        <h3 className="font-semibold">Step 1: Complete Profile (40 points)</h3>
        <Progress value={calculateProgress(investorProfileItems)} />
        <div className="space-y-3">
          {investorProfileItems.map((item, index) => (
            <VerificationItem key={`investor-profile-${index}`} {...item} onAction={() => handleAction(item.title, item.points)} />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="font-semibold">Step 2: Verify Identity (30 points)</h3>
        <Progress value={calculateProgress(investorIdentityItems)} />
        <div className="space-y-3">
          {investorIdentityItems.map((item, index) => (
            <VerificationItem key={`investor-identity-${index}`} {...item} onAction={() => handleAction(item.title, item.points)} />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="font-semibold">Step 3: Investment Preferences (30 points)</h3>
        <Progress value={calculateProgress(investorPreferencesItems)} />
        <div className="space-y-3">
          {investorPreferencesItems.map((item, index) => (
            <VerificationItem key={`investor-prefs-${index}`} {...item} onAction={() => handleAction(item.title, item.points)} />
          ))}
        </div>
      </div>
    </>
  );

  return (
    <>
      <Helmet>
        <title>{t('trustHub')} - SharkVest</title>
      </Helmet>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1">
          <Header setMobileSidebarOpen={setMobileSidebarOpen} />
          <main className="p-4 sm:p-6">
            <Card className="w-full max-w-4xl mx-auto glass-effect">
              <CardHeader>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                  <div>
                    <CardTitle>{t('trustAndVerificationHub')}</CardTitle>
                    <CardDescription>{t('buildCredibility')}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h3 className="font-semibold mb-2">{t('yourTrustScore')}</h3>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse p-4 bg-secondary rounded-lg border border-border">
                    <div className="text-5xl font-bold text-primary">{user?.user_metadata?.trust_score || 0}</div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">{t('yourScoreIsBasedOn')}</p>
                      <Button variant="link" className="p-0 h-auto text-primary" onClick={() => navigate('/improve-score')}>{t('learnHowToImprove')}</Button>
                    </div>
                  </div>
                </div>

                {userRole === 'founder' ? renderFounderTrustScore() : renderInvestorTrustScore()}
                
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </>
  );
};

export default TrustHubPage;