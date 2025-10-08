import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import TrustScore from '@/components/TrustScore';
import RadarChart from '@/components/RadarChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { 
    Bot, FileText, Target, MessageSquare, Lightbulb, 
    Upload, Sparkles, FileCheck, FileClock, UserCheck, HelpCircle, Award, BarChart, ShieldAlert, BrainCircuit, BookOpen, Info, User
} from 'lucide-react';

const FounderDashboard = ({ setMobileSidebarOpen }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [projectConcept, setProjectConcept] = useState('');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isRiskModalOpen, setIsRiskModalOpen] = useState(false);
  const [documents, setDocuments] = useState({
    kyc: false,
    pitchDeck: false,
    financials: false,
  });
  const [aiProjectScoreData, setAiProjectScoreData] = useState(null);

  useEffect(() => {
    const storedDocs = JSON.parse(localStorage.getItem('uploadedDocuments')) || { kyc: false, pitchDeck: false, financials: false };
    setDocuments(storedDocs);
    const storedConcept = localStorage.getItem('projectConcept') || '';
    setProjectConcept(storedConcept);
  }, []);

  useEffect(() => {
    localStorage.setItem('projectConcept', projectConcept);
  }, [projectConcept]);

  useEffect(() => {
    const calculateAiScore = () => {
      let score = 0; // Base score is Zero
      let factors = [
        { label: 'Team', value: 0, weight: 15 },
        { label: 'Market', value: 0, weight: 15 },
        { label: 'Traction', value: 0, weight: 15 },
        { label: 'Financials', value: 0, weight: 15 },
        { label: 'Product', value: 0, weight: 10 },
        { label: 'Validation', value: 0, weight: 10 },
        { label: 'Risk', value: 0, weight: 10 },
        { label: 'Impact', value: 0, weight: 5 },
        { label: 'Fit', value: 0, weight: 5 },
        { label: 'Prediction', value: 0, weight: 5 },
      ];
      let swor = {
        strengths: [],
        weaknesses: [],
        opportunities: [],
        risks: [],
      };

      if (projectConcept.trim().length > 50) {
        score += 10;
        factors.find(f => f.label === 'Product').value = 30;
        factors.find(f => f.label === 'Market').value = 20;
        swor.strengths.push('Initial project concept defined.');
        swor.opportunities.push('Potential to address an identified market need.');
      } else {
        swor.weaknesses.push('Project concept is not clearly defined.');
      }

      if (documents.kyc) {
        score += 15;
        factors.find(f => f.label === 'Team').value = 70;
        swor.strengths.push('Founder identity verified, increasing trust.');
      }
      if (documents.pitchDeck) {
        score += 40;
        factors.find(f => f.label === 'Product').value = 75;
        factors.find(f => f.label === 'Market').value = 80;
        factors.find(f => f.label === 'Validation').value = 60;
        swor.strengths.push('Clear product vision and market analysis from pitch deck.');
      }
      if (documents.financials) {
        score += 35;
        factors.find(f => f.label === 'Financials').value = 70;
        factors.find(f => f.label === 'Traction').value = 50;
        swor.strengths.push('Solid financial planning and projections available.');
      }
      
      if (swor.strengths.length === 0 && swor.weaknesses.length === 1) {
        swor.weaknesses.push('Business model not yet validated.');
        swor.weaknesses.push('Limited financial projections.');
        swor.weaknesses.push('Founder identity not verified.');
        swor.risks.push('High execution risk.');
        swor.risks.push('Unclear competitive landscape.');
      }

      let badge = 'Bronze';
      if (score > 85) badge = 'Platinum';
      else if (score > 70) badge = 'Gold';
      else if (score > 50) badge = 'Silver';

      setAiProjectScoreData({
        score,
        stage: documents.pitchDeck ? 'Seed' : 'Idea',
        badge,
        factors,
        swor,
      });
    };

    calculateAiScore();
  }, [documents, projectConcept]);

  const handleEnhanceConcept = () => {
    if (!projectConcept) {
      toast({
        title: "Concept Required",
        description: "Please enter your project concept before enhancing with AI.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Feature Coming Soon!",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const handleUpload = (docType) => {
    navigate('/project-onboarding');
  };

  const getScoreBadgeColor = (badge) => {
    switch (badge) {
      case 'Platinum': return 'bg-gradient-to-r from-gray-400 to-white text-black';
      case 'Gold': return 'bg-gradient-to-r from-yellow-400 to-yellow-200 text-black';
      case 'Silver': return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 'Bronze': return 'bg-gradient-to-r from-orange-400 to-yellow-600 text-white';
      default: return 'bg-gray-600';
    }
  };
  
  const riskMatrixData = {
    risks: [],
    likelihoodLevels: ['Very Unlikely', 'Unlikely', 'Possible', 'Likely', 'Very Likely'],
    impactLevels: ['Insignificant', 'Minor', 'Moderate', 'Major', 'Catastrophic'],
  };

  const getRiskColor = (level) => {
    if (level >= 15) return 'bg-red-500/80';
    if (level >= 10) return 'bg-orange-500/80';
    if (level >= 5) return 'bg-yellow-500/80';
    return 'bg-blue-500/80';
  };

  if (!aiProjectScoreData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Founder Dashboard - SharkVest</title>
        <meta name="description" content="Manage your startup journey with AI-powered tools and connect with investors." />
      </Helmet>

      <div className="min-h-screen flex">
        <Sidebar />
        
        <div className="flex-1">
          <Header setMobileSidebarOpen={setMobileSidebarOpen} />
          
          <main className="p-4 sm:p-8 lg:p-12 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
                <div>
                  <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    {t('welcomeBack', { firstName: user?.user_metadata?.first_name || 'Founder' })}
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    {t('letsContinueBuilding')}
                  </p>
                </div>
                <Badge variant="outline" className="text-sm px-4 py-2 flex items-center gap-2 border-primary/20">
                  <User className="w-4 h-4 text-primary" />
                  <span>{t('founderAccount')}</span>
                </Badge>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <Card className="glass-effect border-primary/10 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Lightbulb className="w-6 h-6 text-yellow-500"/>
                    {t('projectConcept')}
                  </CardTitle>
                  <CardDescription>{t('developIdea')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea 
                    placeholder="Describe your project idea, target market, and unique value proposition..."
                    className="min-h-[180px] text-base resize-none focus:ring-2 focus:ring-primary/20"
                    value={projectConcept}
                    onChange={(e) => setProjectConcept(e.target.value)}
                  />
                  <Button className="w-full ai-gradient hover:opacity-90 transition-opacity h-12 text-base font-medium" onClick={handleEnhanceConcept}>
                    <Sparkles className="w-5 h-5 mr-2" />
                    {t('enhanceWithAI')}
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-effect border-primary/10 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Upload className="w-6 h-6 text-primary"/>
                    {t('documentCenter')}
                  </CardTitle>
                  <CardDescription>Upload documents to boost your score</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Card className="bg-background/80 border-2 border-border/50 hover:border-primary/30 transition-colors">
                    <CardContent className="p-5 flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-semibold flex items-center gap-2 mb-2">
                          <UserCheck className="w-5 h-5 text-primary"/> 
                          {t('personalDocuments')}
                        </p>
                        <div className={`flex items-center text-sm font-medium ${documents.kyc ? 'text-green-500' : 'text-amber-500'}`}>
                          {documents.kyc ? <FileCheck className="w-4 h-4 mr-1.5"/> : <FileClock className="w-4 h-4 mr-1.5"/>}
                          <span>{documents.kyc ? 'KYC Verified' : t('verificationPending')}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="h-10 px-4" onClick={() => handleUpload('KYC')}>{t('upload')}</Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-background/80 border-2 border-border/50 hover:border-primary/30 transition-colors">
                    <CardContent className="p-5 flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-semibold flex items-center gap-2 mb-2">
                          <FileText className="w-5 h-5 text-primary"/> 
                          {t('businessDocuments')}
                        </p>
                        <div className={`flex items-center text-sm font-medium ${documents.pitchDeck ? 'text-green-500' : 'text-amber-500'}`}>
                          {documents.pitchDeck ? <FileCheck className="w-4 h-4 mr-1.5"/> : <FileClock className="w-4 h-4 mr-1.5"/>}
                          <span>{documents.pitchDeck ? t('pitchDeckVerified') : 'Pitch Deck Pending'}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="h-10 px-4" onClick={() => handleUpload('Business Docs')}>{t('upload')}</Button>
                    </CardContent>
                  </Card>

                  <div className="text-sm text-muted-foreground p-4 rounded-lg bg-primary/5 flex items-start gap-3 border border-primary/20">
                    <HelpCircle className="w-5 h-5 shrink-0 text-primary mt-0.5"/>
                    <span>{t('uploadingImprovesScore')}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <TrustScore
                score={user?.user_metadata?.trust_score || 0}
                profileComplete={user?.user_metadata?.profile_complete || 0}
                verified={!!user?.email_confirmed_at}
              />
              
              <Card className="glass-effect border-primary/10 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{t('investorMatches')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-2">0</div>
                  <div className="flex items-center gap-2 text-sm text-primary font-medium">
                    <Target className="w-4 h-4" />
                    <span>{t('newThisWeek', { count: 0 })}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-effect border-primary/10 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{t('messages')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-2">0</div>
                  <div className="flex items-center gap-2 text-sm text-primary font-medium">
                    <MessageSquare className="w-4 h-4" />
                    <span>{t('unread', { count: 0 })}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="glass-effect border-primary/10 shadow-lg">
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-3 text-2xl mb-2">
                      <div className="p-2 rounded-lg ai-gradient">
                        <BrainCircuit className="w-6 h-6 text-white" />
                      </div>
                      <span>{t('aiProjectScore')}</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      {t('aiAnalysisDescription')}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Info className="w-4 h-4" />
                    Details
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 flex flex-col items-center justify-center space-y-6 p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20">
                  <div className="text-7xl font-bold bg-gradient-to-br from-primary to-blue-600 bg-clip-text text-transparent">
                    {aiProjectScoreData.score}
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <Badge className={`${getScoreBadgeColor(aiProjectScoreData.badge)} px-4 py-1.5 text-sm font-semibold`}>
                      <Award className="w-4 h-4 mr-2"/> {aiProjectScoreData.badge}
                    </Badge>
                    <Badge variant="secondary" className="px-4 py-1.5 text-sm font-semibold">
                      {aiProjectScoreData.stage} Stage
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground text-center font-medium">{t('basedOn10FactorModel')}</p>
                </div>
                <div className="lg:col-span-2">
                  <RadarChart data={aiProjectScoreData.factors} />
                </div>
              </CardContent>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-bold text-lg flex items-center gap-2 mb-4">
                      <BarChart className="w-5 h-5 text-primary"/> 
                      {t('aiSworAnalysis')}
                    </h4>
                    <div className="p-5 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-2 border-blue-500/20 space-y-3">
                      <p className="font-bold text-blue-500 flex items-center gap-2 text-base">
                        {t('strengths')}
                      </p>
                      <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1.5">
                        {aiProjectScoreData.swor.strengths.length > 0 ? aiProjectScoreData.swor.strengths.map(s => <li key={s} className="leading-relaxed">{s}</li>) : <li>No strengths identified yet.</li>}
                      </ul>
                    </div>
                    <div className="p-5 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-2 border-amber-500/20 space-y-3">
                      <p className="font-bold text-amber-500 flex items-center gap-2 text-base">
                        {t('weaknesses')}
                      </p>
                      <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1.5">
                        {aiProjectScoreData.swor.weaknesses.length > 0 ? aiProjectScoreData.swor.weaknesses.map(w => <li key={w} className="leading-relaxed">{w}</li>) : <li>No weaknesses identified yet.</li>}
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold text-lg flex items-center gap-2 mb-4">
                      <ShieldAlert className="w-5 h-5 text-primary"/> 
                      {t('aiRiskAssessment')}
                    </h4>
                    <div className="p-5 rounded-xl bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border-2 border-cyan-500/20 space-y-3">
                      <p className="font-bold text-cyan-500 flex items-center gap-2 text-base">
                        {t('opportunities')}
                      </p>
                      <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1.5">
                        {aiProjectScoreData.swor.opportunities.length > 0 ? aiProjectScoreData.swor.opportunities.map(o => <li key={o} className="leading-relaxed">{o}</li>) : <li>No opportunities identified yet.</li>}
                      </ul>
                    </div>
                    <div className="p-5 rounded-xl bg-gradient-to-br from-red-500/10 to-red-500/5 border-2 border-red-500/20 space-y-3">
                      <div className="flex justify-between items-center">
                        <p className="font-bold text-red-500 flex items-center gap-2 text-base">
                          {t('risks')}
                        </p>
                        <Dialog open={isRiskModalOpen} onOpenChange={setIsRiskModalOpen}>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 gap-2">
                              <BookOpen className="w-4 h-4"/> {t('viewSpecialReport')}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl glass-effect">
                            <DialogHeader>
                              <DialogTitle>Special Report: Risk Matrix & Criteria</DialogTitle>
                              <DialogDescription>
                                Visualizing potential risks based on likelihood and impact, generated from your uploaded business documents.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                              <div>
                                <h4 className="font-semibold mb-2">Risk Matrix</h4>
                                <div className="grid grid-cols-6 gap-1 text-xs text-center">
                                  <div className="col-span-1"></div>
                                  {riskMatrixData.impactLevels.map(level => <div key={level} className="font-bold text-[10px] leading-tight">{level}</div>)}
                                  {riskMatrixData.likelihoodLevels.slice().reverse().map((level, rowIndex) => (
                                    <React.Fragment key={level}>
                                      <div className="font-bold self-center text-[10px] -rotate-90">{level}</div>
                                      {riskMatrixData.impactLevels.map((_, colIndex) => {
                                        const likelihood = 5 - rowIndex;
                                        const impact = colIndex + 1;
                                        const riskValue = likelihood * impact;
                                        const riskItems = riskMatrixData.risks.filter(r => r.likelihood === likelihood && r.impact === impact);
                                        return (
                                          <div key={colIndex} className={`h-16 rounded flex items-center justify-center p-1 ${getRiskColor(riskValue)}`}>
                                            <div className="flex flex-wrap gap-1 justify-center">
                                              {riskItems.map(item => <Badge key={item.id} variant="secondary" className="text-xs">{item.id}</Badge>)}
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </React.Fragment>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Identified Risks</h4>
                                {riskMatrixData.risks.length > 0 ? (
                                  <ul className="space-y-2 text-sm">
                                    {riskMatrixData.risks.map(risk => (
                                      <li key={risk.id}><Badge variant="secondary" className="mr-2">{risk.id}</Badge> {risk.name} - <span className="font-semibold">{risk.level}</span></li>
                                    ))}
                                  </ul>
                                ) : <p className="text-sm text-muted-foreground">No risks identified yet.</p>}
                                <h4 className="font-semibold mt-4 mb-2">Criteria</h4>
                                <div className="text-xs text-muted-foreground space-y-2">
                                  <p><span className="font-bold">Likelihood:</span> Very Likely (&gt;80%), Likely (60-80%), Possible (40-60%), Unlikely (20-40%), Very Unlikely (&lt;20%)</p>
                                  <p><span className="font-bold">Impact:</span> Catastrophic (Threatens survival), Major (Significant financial/reputational loss), Moderate (Noticeable impact), Minor (Minimal impact), Insignificant (Negligible impact)</p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1.5">
                        {aiProjectScoreData.swor.risks.length > 0 ? aiProjectScoreData.swor.risks.map(r => <li key={r} className="leading-relaxed">{r}</li>) : <li>No risks identified yet.</li>}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-6 text-sm text-muted-foreground p-4 rounded-xl bg-primary/5 flex items-start gap-3 border border-primary/20">
                  <Info className="w-5 h-5 shrink-0 text-primary mt-0.5"/>
                  <span>{t('aiReportInfo')}</span>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>

      <Dialog open={isAiModalOpen} onOpenChange={setIsAiModalOpen}>
        <DialogContent className="sm:max-w-[625px] glass-effect">
          <DialogHeader>
            <DialogTitle className="flex items-center"><Sparkles className="w-5 h-5 mr-2 ai-gradient rounded p-1"/>AI-Powered Concept Analysis</DialogTitle>
            <DialogDescription>
              Here are AI-driven insights based on your project concept.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Structured Business Recommendations</h4>
              <p className="text-sm text-muted-foreground">Consider focusing on a niche B2B SaaS model first to validate product-market fit before expanding to a wider consumer base. A subscription-based revenue model seems most viable.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Market Analysis & Competitive Insights</h4>
              <p className="text-sm text-muted-foreground">The MENA fintech market is growing at 20% YoY. Key competitors include [Competitor A] and [Competitor B]. Your unique value proposition of [Your Feature] gives you a competitive edge in the SME segment.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Funding Strategy Suggestions</h4>
              <p className="text-sm text-muted-foreground">For your pre-seed stage, a SAFE note is recommended. Target angel investors focused on fintech in the UAE and KSA. A target raise of $250k for an 18-month runway is realistic.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FounderDashboard;