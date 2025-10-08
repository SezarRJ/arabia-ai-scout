import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Search, SlidersHorizontal, Send, Star, MailCheck, Info, Briefcase, TrendingUp, Target, Globe, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const MatchesPage = ({ setMobileSidebarOpen }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [invitedInvestors, setInvitedInvestors] = useState([]);
  const [selectedInvestor, setSelectedInvestor] = useState(null);

  const investors = [
    { id: 1, name: 'VC Ventures', sector: 'FinTech', stage: 'Seed, Series A', esg: true, risk: 'Medium', logo: 'VC', match: 95, location: 'Dubai, UAE', aum: '$250M', checks: '$500k - $2M', bio: 'Leading FinTech investor in MENA, focused on scalable B2B solutions. We partner with ambitious founders to build category-defining companies.' },
    { id: 2, name: 'Growth Capital', sector: 'SaaS', stage: 'Series A, Series B', esg: false, risk: 'Low', logo: 'GC', match: 88, location: 'Riyadh, KSA', aum: '$1B', checks: '$2M - $10M', bio: 'We back proven SaaS companies with strong metrics, helping them scale globally. Our expertise lies in sales, marketing, and international expansion.' },
    { id: 3, name: 'Impact Investors', sector: 'CleanTech', stage: 'Seed', esg: true, risk: 'High', logo: 'II', match: 82, location: 'Cairo, Egypt', aum: '$50M', checks: '$100k - $500k', bio: 'Dedicated to funding startups that solve critical environmental and social challenges. We believe in profit with purpose.' },
    { id: 4, name: 'MENA Angels', sector: 'E-commerce', stage: 'Pre-Seed, Seed', esg: false, risk: 'High', logo: 'MA', match: 76, location: 'Beirut, Lebanon', aum: 'N/A', checks: '$25k - $100k', bio: 'A network of experienced angel investors passionate about supporting the next generation of e-commerce and consumer tech founders in the region.' },
  ];

  const investorConnections = [
    { id: 1, name: 'VC Ventures', status: 'Connected', logo: 'VC' },
    { id: 2, name: 'Growth Capital', status: 'Pending', logo: 'GC' },
    { id: 3, name: 'Impact Investors', status: 'Declined', logo: 'II' },
  ];

  const handleInvite = (investorId, investorName) => {
    setInvitedInvestors(prev => [...prev, investorId]);
    toast({
      title: t('sent'),
      description: `${t('invite')} ${t('sent')} to ${investorName}.`,
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Connected': return <Badge variant="success">{t('connected')}</Badge>;
      case 'Pending': return <Badge variant="warning">{t('pending')}</Badge>;
      case 'Declined': return <Badge variant="destructive">{t('refused')}</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('matches')} - SharkVest</title>
      </Helmet>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header setMobileSidebarOpen={setMobileSidebarOpen} />
          <main className="p-4 sm:p-6 flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h1 className="text-3xl font-bold">{t('matches')}</h1>
              <Button onClick={() => navigate('/virtual-pitch-events')}>
                <Star className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2"/> {t('viewPitchEvents')}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="glass-effect">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4 flex-wrap">
                      <div className="relative flex-grow min-w-[200px]">
                        <label htmlFor="search-investors" className="sr-only">{t('search')}</label>
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <Input id="search-investors" placeholder={t('search')} className="pl-10 rtl:pr-10 rtl:pl-4" />
                      </div>
                      <Select>
                        <SelectTrigger className="w-full md:w-[150px]" aria-label="Filter by Country">
                          <SelectValue placeholder="Country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="uae">UAE</SelectItem>
                          <SelectItem value="ksa">KSA</SelectItem>
                          <SelectItem value="egypt">Egypt</SelectItem>
                          <SelectItem value="lebanon">Lebanon</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger className="w-full md:w-[150px]" aria-label="Filter by City">
                          <SelectValue placeholder="City" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dubai">Dubai</SelectItem>
                          <SelectItem value="riyadh">Riyadh</SelectItem>
                          <SelectItem value="cairo">Cairo</SelectItem>
                          <SelectItem value="beirut">Beirut</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger className="w-full md:w-[150px]" aria-label={t('filterByStage')}>
                          <SelectValue placeholder={t('filterByStage')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pre-seed">{t('preSeed')}</SelectItem>
                          <SelectItem value="seed">{t('seed')}</SelectItem>
                          <SelectItem value="series-a">{t('seriesA')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger className="w-full md:w-[150px]" aria-label={t('esgPreference')}>
                          <SelectValue placeholder={t('esgPreference')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="esg-focused">{t('esgFocused')}</SelectItem>
                          <SelectItem value="not-required">{t('notRequired')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="icon" aria-label={t('filter')}>
                        <SlidersHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {investors.map(investor => {
                    const isInvited = invitedInvestors.includes(investor.id);
                    return (
                      <Card key={investor.id} className="glass-effect card-hover flex flex-col">
                        <CardHeader className="flex-row items-start space-x-4 rtl:space-x-reverse">
                          <Avatar className="h-16 w-16">
                            <AvatarFallback className="text-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold">
                              {investor.logo}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle>{investor.name}</CardTitle>
                            <CardDescription>{investor.sector}</CardDescription>
                          </div>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                          <div className="flex flex-wrap gap-2 text-xs">
                            <Badge variant="outline">{investor.stage}</Badge>
                            {investor.esg && <Badge variant="success">ESG Focus</Badge>}
                            <Badge variant="warning">Risk: {investor.risk}</Badge>
                          </div>
                          <p className="text-sm text-gray-400 line-clamp-2">{investor.bio}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                          <Button variant="outline" size="sm" onClick={() => setSelectedInvestor(investor)}>
                            <Info className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2"/> {t('moreInfo')}
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleInvite(investor.id, investor.name)}
                            disabled={isInvited}
                          >
                            {isInvited ? (
                              <>
                                <MailCheck className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" /> {t('sent')}
                              </>
                            ) : (
                              <>
                                <Send className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" /> {t('invite')}
                              </>
                            )}
                          </Button>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
              </div>
              <div className="lg:col-span-1">
                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle className="flex items-center"><Users className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2"/> {t('connectionStatus')}</CardTitle>
                    <CardDescription>{t('trackYourInvestorNetwork')}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {investorConnections.map(conn => (
                      <div key={conn.id} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-muted">{conn.logo}</AvatarFallback>
                          </Avatar>
                          <p className="font-semibold">{conn.name}</p>
                        </div>
                        {getStatusBadge(conn.status)}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>

      <Dialog open={!!selectedInvestor} onOpenChange={() => setSelectedInvestor(null)}>
        <DialogContent className="sm:max-w-lg">
          {selectedInvestor && (
            <>
              <DialogHeader>
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="text-3xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold">
                      {selectedInvestor.logo}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="text-2xl">{selectedInvestor.name}</DialogTitle>
                    <DialogDescription>{selectedInvestor.sector}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <p className="text-sm text-gray-300">{selectedInvestor.bio}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center"><Briefcase className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2 text-blue-400"/> <strong>AUM:</strong> <span className="ml-2 rtl:ml-0 rtl:mr-2">{selectedInvestor.aum}</span></div>
                  <div className="flex items-center"><Target className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2 text-green-400"/> <strong>Checks:</strong> <span className="ml-2 rtl:ml-0 rtl:mr-2">{selectedInvestor.checks}</span></div>
                  <div className="flex items-center"><TrendingUp className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2 text-purple-400"/> <strong>Stage:</strong> <span className="ml-2 rtl:ml-0 rtl:mr-2">{selectedInvestor.stage}</span></div>
                  <div className="flex items-center"><Globe className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2 text-yellow-400"/> <strong>Location:</strong> <span className="ml-2 rtl:ml-0 rtl:mr-2">{selectedInvestor.location}</span></div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MatchesPage;