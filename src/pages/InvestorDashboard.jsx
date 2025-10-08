import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import TrustScore from '@/components/TrustScore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { Target, BarChart3, History, Send, MailCheck, Eye, Lock, FileSignature, HeartHandshake as Handshake, User } from 'lucide-react';

const InvestorDashboard = ({ setMobileSidebarOpen }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [invitedStartups, setInvitedStartups] = useState([]);

  const suggestedStartups = [];

  const connectionHistory = [];

  const handleInvite = (startupId, startupName) => {
    setInvitedStartups(prev => [...prev, startupId]);
    toast({
      title: 'Invitation Sent!',
      description: `Your invitation to connect has been sent to ${startupName}.`,
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Due Diligence': return <Badge variant="warning">Due Diligence</Badge>;
      case 'Initial Contact': return <Badge variant="secondary">Initial Contact</Badge>;
      case 'Passed': return <Badge variant="destructive">Passed</Badge>;
      case 'Term Sheet Sent': return <Badge className="bg-purple-500 text-white">Term Sheet Sent</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const isScoreSufficient = (user?.user_metadata?.trust_score || 0) >= 60;

  return (
    <>
      <Helmet>
        <title>Investor Dashboard - SharkVest</title>
        <meta name="description" content="Discover high-potential startups and manage your investment portfolio with AI-powered insights." />
      </Helmet>

      <div className="min-h-screen flex">
        <Sidebar />
        
        <div className="flex-1">
          <Header setMobileSidebarOpen={setMobileSidebarOpen} />
          
          <main className="p-4 sm:p-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-3xl font-bold">
                  {t('investorDashboard')}
                </h1>
                <Badge variant="outline" className="text-sm flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{t('investorAccount')}</span>
                </Badge>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-1 space-y-6">
                <TrustScore
                  score={user?.user_metadata?.trust_score || 0}
                  profileComplete={user?.user_metadata?.profile_complete || 0}
                  verified={!!user?.email_confirmed_at}
                />
                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                      <History className="w-5 h-5 text-cyan-400" />
                      <span>{t('connectionHistory')}</span>
                    </CardTitle>
                    <CardDescription>{t('trackDealFlow')}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                    {connectionHistory.length > 0 ? connectionHistory.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                        <div>
                          <p className="font-semibold">{item.startup}</p>
                          <p className="text-xs text-muted-foreground">Last contact: {item.lastContact}</p>
                        </div>
                        {getStatusBadge(item.status)}
                      </div>
                    )) : <p className="text-sm text-muted-foreground text-center py-4">No connection history yet.</p>}
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="glass-effect">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                        <BarChart3 className="w-5 h-5 text-purple-400" />
                        <span>{t('pipelineView')}</span>
                        </CardTitle>
                        <CardDescription>
                        {t('trackDealFlow')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {[
                            { stage: 'Sourcing', count: 0, color: 'bg-blue-500' },
                            { stage: 'Screening', count: 0, color: 'bg-cyan-500' },
                            { stage: 'Due Diligence', count: 0, color: 'bg-yellow-500' },
                            { stage: 'Term Sheet', count: 0, color: 'bg-purple-500' },
                            { stage: 'Closing', count: 0, color: 'bg-green-500' },
                        ].map((item) => (
                            <div key={item.stage} className="p-4 rounded-lg bg-secondary text-center">
                            <div className="text-sm text-muted-foreground mb-2">{item.stage}</div>
                            <div className="text-3xl font-bold">{item.count}</div>
                            <div className="mt-2 h-1 w-full bg-muted rounded-full">
                                <div className={`h-1 ${item.color} rounded-full`} style={{ width: `0%` }}></div>
                            </div>
                            </div>
                        ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className={`glass-effect ${!isScoreSufficient && 'relative'}`}>
                  {!isScoreSufficient && (
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-xl text-center p-4">
                      <Lock className="w-12 h-12 text-yellow-400 mb-4" />
                      <h3 className="text-xl font-bold text-white">Improve Your Trust Score</h3>
                      <p className="text-gray-300 mb-4">Your score is too low to view suggested startups.</p>
                      <Button onClick={() => navigate('/improve-score')}>Improve Score</Button>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Target className="w-5 h-5 text-blue-400" />
                      <span>{t('suggestedStartups')}</span>
                    </CardTitle>
                    <CardDescription>
                      {t('aiCuratedMatches')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {suggestedStartups.length > 0 ? suggestedStartups.map((startup) => {
                      const isInvited = invitedStartups.includes(startup.id);
                      return (
                        <div key={startup.id} className="p-4 rounded-lg bg-secondary hover:bg-accent transition-colors">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                              <Avatar className="h-12 w-12">
                                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
                                  {startup.logo}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-semibold">{startup.name}</h4>
                                <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-muted-foreground">
                                  <span>{startup.industry}</span>
                                  <span>•</span>
                                  <span>{startup.stage}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3 rtl:space-x-reverse self-end sm:self-center">
                              <div className="text-center">
                                <div className="text-sm font-medium text-blue-400">{startup.matchScore}%</div>
                                <div className="text-xs text-muted-foreground">{t('match')}</div>
                              </div>
                              <Badge variant="outline" className="trust-score-gradient text-white border-0">
                                {t('trust')}: {startup.trustScore}
                              </Badge>
                              <Button size="sm" variant="outline" onClick={() => navigate('/matches')}>
                                <Eye className="w-4 h-4 md:mr-2" />
                                <span className="hidden md:inline">{t('view')}</span>
                              </Button>
                              <Button size="sm" onClick={() => handleInvite(startup.id, startup.name)} disabled={isInvited}>
                                {isInvited ? <MailCheck className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                              </Button>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end space-x-2">
                            <Button variant="outline" size="sm" onClick={() => navigate('/term-sheet', { state: { startup } })}>
                              <FileSignature className="w-4 h-4 mr-2"/> Manage Term Sheet
                            </Button>
                            <Button variant="success" size="sm" onClick={() => navigate('/deal-closing', { state: { startup, amount: 500000 } })}>
                              <Handshake className="w-4 h-4 mr-2"/> Close Deal
                            </Button>
                          </div>
                        </div>
                      );
                    }) : <p className="text-sm text-muted-foreground text-center py-8">No suggested startups at the moment. Check back later!</p>}
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default InvestorDashboard;