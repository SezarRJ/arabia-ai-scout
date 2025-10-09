import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Layout/Sidebar';
import Header from '@/components/Layout/Header';
import RadarChart from '@/components/RadarChart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';
import { 
  Users, 
  MessageSquare, 
  TrendingUp,
  Upload,
  FileText,
  Shield,
  BrainCircuit,
  Target,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  TrendingDown,
  Activity,
  Sparkles,
  Lightbulb,
  FileSignature,
  FileCheck,
  FileClock,
  UserCheck,
  HelpCircle,
  Award,
  BarChart,
  ShieldAlert,
  BookOpen,
  Info,
  User
} from 'lucide-react';

const FounderDashboard = ({ setMobileSidebarOpen }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [projectConcept, setProjectConcept] = useState('');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isRiskModalOpen, setIsRiskModalOpen] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);

  // Initialize from localStorage
  useEffect(() => {
    const storedDocs = JSON.parse(localStorage.getItem('uploadedDocuments')) || [];
    setUploadedDocuments(storedDocs);
    const storedConcept = localStorage.getItem('projectConcept') || '';
    setProjectConcept(storedConcept);
  }, []);

  useEffect(() => {
    localStorage.setItem('projectConcept', projectConcept);
  }, [projectConcept]);

  // Calculate AI project score
  const calculateAiScore = () => {
    let score = 0;
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

    // Only calculate if we have both concept and documents
    if (!projectConcept || uploadedDocuments.length === 0) {
      return { overall: 0, factors, swor, stage: 'Not Started', badge: 'None' };
    }

    if (projectConcept.trim().length > 50) {
      score += 10;
      factors.find(f => f.label === 'Product').value = 30;
      factors.find(f => f.label === 'Market').value = 20;
      swor.strengths.push('Clear project concept defined');
      swor.opportunities.push('Strong market potential identified');
    }

    const hasKYC = uploadedDocuments.some(doc => doc.type === 'KYC');
    const hasPitchDeck = uploadedDocuments.some(doc => doc.type === 'Business Docs');
    const hasFinancials = uploadedDocuments.some(doc => doc.type === 'Financials');

    if (hasKYC) {
      score += 15;
      factors.find(f => f.label === 'Team').value = 70;
      swor.strengths.push('Founder identity verified');
    } else {
      swor.weaknesses.push('KYC verification pending');
    }

    if (hasPitchDeck) {
      score += 40;
      factors.find(f => f.label === 'Product').value = 75;
      factors.find(f => f.label === 'Market').value = 80;
      factors.find(f => f.label === 'Validation').value = 60;
      swor.strengths.push('Comprehensive pitch deck provided');
      swor.opportunities.push('Ready for investor presentations');
    } else {
      swor.weaknesses.push('Pitch deck not uploaded');
    }

    if (hasFinancials) {
      score += 35;
      factors.find(f => f.label === 'Financials').value = 70;
      factors.find(f => f.label === 'Traction').value = 50;
      swor.strengths.push('Financial projections available');
    } else {
      swor.weaknesses.push('Financial data missing');
    }

    if (score < 30) {
      swor.risks.push('Limited documentation reduces credibility');
      swor.risks.push('High execution risk');
    }

    let stage = 'Idea';
    let badge = 'Bronze';
    
    if (score >= 85) {
      badge = 'Platinum';
      stage = 'Growth';
    } else if (score >= 70) {
      badge = 'Gold';
      stage = 'Seed';
    } else if (score >= 50) {
      badge = 'Silver';
      stage = 'Pre-Seed';
    }

    return { overall: score, factors, swor, stage, badge };
  };

  const aiProjectScore = calculateAiScore();

  const handleEnhanceConcept = () => {
    if (!projectConcept) {
      toast({
        title: "Concept Required",
        description: "Please enter your project concept first.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Feature Coming Soon!",
      description: "AI enhancement will be available soon.",
    });
  };

  const handleUpload = () => {
    navigate('/project-onboarding');
  };

  const getScoreBadgeColor = (score) => {
    if (score >= 85) return 'bg-gradient-to-r from-purple-500 to-pink-500';
    if (score >= 70) return 'bg-gradient-to-r from-yellow-400 to-orange-500';
    if (score >= 50) return 'bg-gradient-to-r from-blue-400 to-cyan-500';
    return 'bg-gradient-to-r from-gray-400 to-gray-600';
  };

  const getRiskColor = (level) => {
    if (level >= 15) return 'bg-red-500/80';
    if (level >= 10) return 'bg-orange-500/80';
    if (level >= 5) return 'bg-yellow-500/80';
    return 'bg-blue-500/80';
  };

  return (
    <>
      <Helmet>
        <title>Founder Dashboard - SharkVest</title>
        <meta name="description" content="Manage your startup journey with AI-powered insights" />
      </Helmet>

      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1">
          <Header setMobileSidebarOpen={setMobileSidebarOpen} />
          
          <main className="container mx-auto px-4 py-8 space-y-8 pb-20 lg:pt-8 pt-24">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Welcome back, {user?.user_metadata?.first_name || 'Founder'}!
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Let's continue building your success story
                  </p>
                </div>
                <Badge variant="outline" className="text-sm px-4 py-2 flex items-center gap-2 border-primary/30 bg-primary/5">
                  <User className="w-4 h-4 text-primary" />
                  <span>Founder Account</span>
                </Badge>
              </div>
            </motion.div>

            {/* AI Advisory Suite - Only show if project concept exists */}
            {projectConcept && (
              <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <BrainCircuit className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-2xl">AI Advisory Suite</span>
                    </div>
                  </CardTitle>
                  <CardDescription>AI-powered tools to accelerate your startup journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button 
                      onClick={() => navigate('/ai-advisory')} 
                      variant="outline" 
                      className="h-auto py-4 flex flex-col items-start gap-2 relative hover:border-primary/50 hover:bg-primary/5 transition-all"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <Lightbulb className="w-5 h-5 text-amber-500" />
                        <span className="font-semibold">Idea Refiner</span>
                        <Badge variant="secondary" className="ml-auto text-xs bg-green-500/20 text-green-700 dark:text-green-300">New</Badge>
                      </div>
                      <span className="text-xs text-muted-foreground text-left">Enhance your business concept with AI</span>
                    </Button>
                    
                    <Button 
                      onClick={() => navigate('/ai-advisory')} 
                      variant="outline" 
                      className="h-auto py-4 flex flex-col items-start gap-2 relative hover:border-primary/50 hover:bg-primary/5 transition-all"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <FileText className="w-5 h-5 text-blue-500" />
                        <span className="font-semibold">Pitch Deck Generator</span>
                        <Badge variant="destructive" className="ml-auto text-xs">Update</Badge>
                      </div>
                      <span className="text-xs text-muted-foreground text-left">Create compelling investor presentations</span>
                    </Button>
                    
                    <Button 
                      onClick={() => navigate('/ai-advisory')} 
                      variant="outline" 
                      className="h-auto py-4 flex flex-col items-start gap-2 relative hover:border-primary/50 hover:bg-primary/5 transition-all"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <FileSignature className="w-5 h-5 text-purple-500" />
                        <span className="font-semibold">Deal Structuring Advisor</span>
                      </div>
                      <span className="text-xs text-muted-foreground text-left">Optimize your funding terms</span>
                    </Button>
                    
                    <Button 
                      onClick={() => navigate('/ai-advisory')} 
                      variant="outline" 
                      className="h-auto py-4 flex flex-col items-start gap-2 relative hover:border-primary/50 hover:bg-primary/5 transition-all"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <MessageSquare className="w-5 h-5 text-green-500" />
                        <span className="font-semibold">Communication Coach</span>
                        <Badge variant="secondary" className="ml-auto text-xs bg-amber-500/20 text-amber-700 dark:text-amber-300">Tip</Badge>
                      </div>
                      <span className="text-xs text-muted-foreground text-left">Improve investor communications</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Project Concept & Document Center */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-primary/10 shadow-md hover:shadow-lg transition-all">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Lightbulb className="w-6 h-6 text-amber-500"/>
                    Project Concept
                  </CardTitle>
                  <CardDescription>Describe your startup idea to unlock AI insights</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea 
                    placeholder="Describe your project idea, target market, and unique value proposition..."
                    className="min-h-[180px] text-base resize-none focus:ring-2 focus:ring-primary/20 border-primary/20"
                    value={projectConcept}
                    onChange={(e) => setProjectConcept(e.target.value)}
                  />
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-12 text-base font-medium" 
                    onClick={handleEnhanceConcept}
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Enhance with AI
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-primary/10 shadow-md hover:shadow-lg transition-all">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Upload className="w-6 h-6 text-primary"/>
                    Document Center
                  </CardTitle>
                  <CardDescription>Upload documents to unlock AI analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/50 border border-border hover:border-primary/30 transition-colors cursor-pointer" onClick={handleUpload}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-semibold flex items-center gap-2 mb-1">
                          <UserCheck className="w-5 h-5 text-primary"/> 
                          Personal Documents
                        </p>
                        <p className="text-sm text-muted-foreground">KYC & Identity</p>
                      </div>
                      <FileCheck className="w-5 h-5 text-muted-foreground"/>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50 border border-border hover:border-primary/30 transition-colors cursor-pointer" onClick={handleUpload}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-semibold flex items-center gap-2 mb-1">
                          <FileText className="w-5 h-5 text-primary"/> 
                          Business Documents
                        </p>
                        <p className="text-sm text-muted-foreground">Pitch Deck & Financials</p>
                      </div>
                      <FileCheck className="w-5 h-5 text-muted-foreground"/>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground p-4 rounded-lg bg-primary/5 flex items-start gap-3 border border-primary/20">
                    <Info className="w-5 h-5 shrink-0 text-primary mt-0.5"/>
                    <span>Upload documents to get AI-powered SWOR analysis and project scoring</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-primary/10 shadow-md hover:shadow-lg transition-all">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Investor Matches</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">0</div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Target className="w-4 h-4" />
                    <span>0 new this week</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/10 shadow-md hover:shadow-lg transition-all">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">0</div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MessageSquare className="w-4 h-4" />
                    <span>0 unread</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Project Score & SWOR - Only show if both concept and documents exist */}
            {projectConcept && uploadedDocuments.length > 0 && (
              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-emerald-500/5 to-blue-500/5 border-emerald-500/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center">
                          <BrainCircuit className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl">AI Project Score</span>
                      </div>
                      <Badge className={`${getScoreBadgeColor(aiProjectScore.overall)} text-white px-4 py-2 text-lg shadow-md`}>
                        {aiProjectScore.overall}/100
                      </Badge>
                    </CardTitle>
                    <CardDescription>AI-powered analysis based on 10-factor investment model</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 flex flex-col items-center justify-center space-y-6 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                      <div className="text-6xl font-bold bg-gradient-to-br from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {aiProjectScore.overall}
                      </div>
                      <div className="flex flex-col items-center gap-3">
                        <Badge className={`${getScoreBadgeColor(aiProjectScore.overall)} px-4 py-1.5 text-sm font-semibold shadow-md`}>
                          <Award className="w-4 h-4 mr-2"/> {aiProjectScore.badge}
                        </Badge>
                        <Badge variant="secondary" className="px-4 py-1.5 text-sm font-semibold">
                          {aiProjectScore.stage} Stage
                        </Badge>
                      </div>
                    </div>
                    <div className="lg:col-span-2">
                      <RadarChart data={aiProjectScore.factors} />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      AI SWOR Analysis
                    </CardTitle>
                    <CardDescription>Comprehensive Strengths, Weaknesses, Opportunities & Risks assessment</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-5 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border-2 border-green-500/30">
                        <p className="font-bold text-green-600 dark:text-green-400 flex items-center gap-2 text-base mb-3">
                          <CheckCircle2 className="w-5 h-5" />
                          Strengths
                        </p>
                        <ul className="list-disc list-inside text-sm space-y-2">
                          {aiProjectScore.swor.strengths.length > 0 ? 
                            aiProjectScore.swor.strengths.map((s, i) => <li key={i}>{s}</li>) : 
                            <li className="text-muted-foreground">Add documents to see strengths</li>
                          }
                        </ul>
                      </div>
                      <div className="p-5 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-2 border-amber-500/30">
                        <p className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-2 text-base mb-3">
                          <AlertTriangle className="w-5 h-5" />
                          Weaknesses
                        </p>
                        <ul className="list-disc list-inside text-sm space-y-2">
                          {aiProjectScore.swor.weaknesses.length > 0 ? 
                            aiProjectScore.swor.weaknesses.map((w, i) => <li key={i}>{w}</li>) : 
                            <li className="text-muted-foreground">No critical weaknesses found</li>
                          }
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="p-5 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-2 border-blue-500/30">
                        <p className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2 text-base mb-3">
                          <TrendingUp className="w-5 h-5" />
                          Opportunities
                        </p>
                        <ul className="list-disc list-inside text-sm space-y-2">
                          {aiProjectScore.swor.opportunities.length > 0 ? 
                            aiProjectScore.swor.opportunities.map((o, i) => <li key={i}>{o}</li>) : 
                            <li className="text-muted-foreground">Upload pitch deck to see opportunities</li>
                          }
                        </ul>
                      </div>
                      <div className="p-5 rounded-xl bg-gradient-to-br from-red-500/10 to-red-500/5 border-2 border-red-500/30">
                        <p className="font-bold text-red-600 dark:text-red-400 flex items-center gap-2 text-base mb-3">
                          <ShieldAlert className="w-5 h-5" />
                          Risks
                        </p>
                        <ul className="list-disc list-inside text-sm space-y-2">
                          {aiProjectScore.swor.risks.length > 0 ? 
                            aiProjectScore.swor.risks.map((r, i) => <li key={i}>{r}</li>) : 
                            <li className="text-muted-foreground">No significant risks identified</li>
                          }
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Placeholder when no data */}
            {(!projectConcept || uploadedDocuments.length === 0) && (
              <Card className="border-dashed border-2 border-primary/30 bg-muted/20">
                <CardContent className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <BrainCircuit className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Unlock AI-Powered Insights</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      {!projectConcept && !uploadedDocuments.length 
                        ? "Add your project concept and upload documents to receive AI-powered analysis, project scoring, and SWOR insights."
                        : !projectConcept 
                        ? "Add your project concept to unlock AI analysis."
                        : "Upload documents to receive comprehensive AI analysis."}
                    </p>
                  </div>
                  <Button 
                    className="mt-4 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
                    onClick={() => {
                      if (!projectConcept) {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      } else {
                        handleUpload();
                      }
                    }}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default FounderDashboard;