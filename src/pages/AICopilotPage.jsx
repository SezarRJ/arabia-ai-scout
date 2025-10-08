import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Bot, Lightbulb, PieChart, Calculator, FileText, TrendingUp, Loader2, Upload, FileSearch, Users, Map, BarChart, Shield, FileSignature, GitCommit, MessageSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const reportTemplates = {
  dealSourcing: {
    title: "AI Report for Deal Sourcing",
    summary: "Analysis of market trends and potential investment opportunities.",
    sections: [{ title: "Market Trends", content: "The FinTech sector in MENA is projected to grow by 25% in the next year." }, { title: "Top Verticals", content: "Payments, Lending, and WealthTech show the most promise." }]
  },
  dueDiligence: {
    title: "AI Report for Due Diligence",
    summary: "Automated analysis of a startup's provided documents.",
    sections: [{ title: "Financial Health", content: "The startup has a 12-month runway with current burn rate." }, { title: "Red Flags", content: "Potential IP conflict identified in the technical documentation." }]
  },
  portfolioFit: {
    title: "AI Report for Portfolio Fit",
    summary: "Analysis of how a startup aligns with your investment thesis.",
    sections: [{ title: "Thesis Alignment", content: "The startup's B2B SaaS model aligns with your focus on scalable enterprise solutions." }, { title: "Synergy Potential", content: "High synergy potential with portfolio company 'ConnectSphere'." }]
  },
  executiveSummary: {
    title: "AI-Generated Executive Summary",
    summary: "A concise summary of the startup's key aspects based on their data room.",
    sections: [{ title: "One-Liner", content: "TechFlow Solutions is a B2B FinTech SaaS platform streamlining financial data for enterprises in emerging markets." }, { title: "Key Highlights", content: "Experienced team, $15k MRR with 20% MoM growth, and a large addressable market." }]
  },
  financialProjections: {
    title: "Financial Projection Analysis",
    summary: "A sanity check of the startup's financial projections against market benchmarks.",
    sections: [{ title: "Revenue Growth", content: "Projected 300% YoY growth is aggressive but achievable if key customer contracts are secured. Industry average is 150%." }, { title: "Burn Rate", content: "The projected burn rate seems low given the hiring plan. Recommend re-evaluating salary and marketing budgets." }]
  },
  competitiveLandscape: {
    title: "Competitive Landscape Map",
    summary: "A mapping of direct and indirect competitors.",
    sections: [{ title: "Direct Competitors", content: "FinData, DataCorp." }, { title: "Indirect Competitors", content: "In-house data teams, manual spreadsheet solutions." }, { title: "Unique Differentiator", content: "TechFlow's real-time data integration is a key advantage." }]
  },
  teamComposition: {
    title: "Team Composition Analysis",
    summary: "An analysis of the founding team's background and expertise.",
    sections: [{ title: "Strengths", content: "CEO has a strong sales background. CTO has 10+ years of experience in scalable systems." }, { title: "Gaps", content: "Lack of a dedicated marketing lead. This is a key hiring priority post-funding." }]
  },
  riskHeatmap: {
    title: "Risk Heatmap",
    summary: "A visual representation of key risks.",
    sections: [{ title: "High-Risk (Red)", content: "Market adoption risk, dependency on a single large client." }, { title: "Medium-Risk (Yellow)", content: "Execution risk, future fundraising risk." }, { title: "Low-Risk (Green)", content: "Technical risk, team risk." }]
  },
};

const AICopilotPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [activeTool, setActiveTool] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleLaunchTool = (tool) => {
    setActiveTool(tool);
    setReportData(null);
    setFileName('');
  };
  
  const handleCloseDialog = () => {
    setActiveTool(null);
    setIsGenerating(false);
    setReportData(null);
    setFileName('');
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
        const generatedReport = reportTemplates[activeTool?.id] || {
            title: `AI Report for ${activeTool?.title}`,
            summary: "This is a default report. The tool-specific report could not be generated.",
            sections: [{ title: "Error", content: "No template found for this tool." }]
        };
        setReportData(generatedReport);
        setIsGenerating(false);
        toast({
            title: `Report Generated for ${activeTool?.title}`,
            description: "Your AI-powered report is ready.",
        });
    }, 2000);
  };

  const investorTools = [
    { id: 'dealSourcing', title: 'AI Deal Sourcing', icon: FileSearch, description: "Analyze market trends and identify investment opportunities based on your thesis." },
    { id: 'dueDiligence', title: 'Automated Due Diligence', icon: FileSearch, description: "Upload startup documents for automated analysis of financials, legal, and technical aspects." },
    { id: 'portfolioFit', title: 'Portfolio Fit Analysis', icon: PieChart, description: "Assess how a potential investment aligns with your current portfolio and strategy." },
    { id: 'executiveSummary', title: 'Executive Summary', icon: FileText, description: "Generate a concise summary from a startup's data room." },
    { id: 'financialProjections', title: 'Financial Projection Analysis', icon: BarChart, description: "Sanity-check a startup's financial projections against market data." },
    { id: 'competitiveLandscape', title: 'Competitive Landscape Mapping', icon: Map, description: "Map out direct and indirect competitors for a target startup." },
    { id: 'teamComposition', title: 'Team Composition Analysis', icon: Users, description: "Analyze the founding team's strengths, weaknesses, and gaps." },
    { id: 'riskHeatmap', title: 'Risk Heatmap', icon: Shield, description: "Generate a visual heatmap of potential investment risks." },
  ];

  const tools = investorTools;

  return (
    <>
      <Helmet>
        <title>{t('aiCopilot')} - SharkVest</title>
      </Helmet>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
              <Bot className="w-10 h-10 ai-gradient rounded-lg p-2" />
              <h1 className="text-3xl font-bold">{t('aiCopilot')} for Investors</h1>
            </div>

            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Your AI-Powered Investment Analyst</CardTitle>
                <CardDescription>
                  Leverage cutting-edge AI to streamline your deal flow, automate due diligence, and make data-driven investment decisions.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {tools.map((tool) => (
                  <Card key={tool.id} className="bg-gray-800/50 card-hover flex flex-col">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg ai-gradient flex items-center justify-center mb-4">
                        <tool.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle>{tool.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-gray-400">{tool.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full ai-gradient" onClick={() => handleLaunchTool(tool)}>
                        Launch Tool
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </CardContent>
            </Card>

            <Dialog open={!!activeTool} onOpenChange={handleCloseDialog}>
                <DialogContent className="sm:max-w-2xl">
                    {activeTool && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="flex items-center"><activeTool.icon className="mr-2 h-5 w-5"/> {activeTool.title}</DialogTitle>
                                <DialogDescription>
                                    {reportData ? reportData.summary : "Provide the details below and let our AI assist you."}
                                </DialogDescription>
                            </DialogHeader>
                            
                            {reportData ? (
                                <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto">
                                    {reportData.sections.map((section, index) => (
                                        <div key={index}>
                                            <h4 className="font-semibold text-lg mb-2">{section.title}</h4>
                                            <p className="text-sm text-muted-foreground">{section.content}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="startupName" className="text-right">
                                            Startup Name
                                        </Label>
                                        <Input id="startupName" placeholder="e.g., TechFlow Solutions" className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="docType" className="text-right">Document Type</Label>
                                        <Select>
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select document type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pitch-deck">Pitch Deck</SelectItem>
                                                <SelectItem value="financials">Financials</SelectItem>
                                                <SelectItem value="business-plan">Business Plan</SelectItem>
                                                <SelectItem value="data-room-zip">Data Room (.zip)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="docUpload" className="text-right">Upload</Label>
                                        <div className="col-span-3">
                                            <Button asChild variant="outline">
                                                <label htmlFor="docUpload" className="cursor-pointer w-full">
                                                    <Upload className="mr-2 h-4 w-4" />
                                                    {fileName || 'Choose a file'}
                                                    <Input id="docUpload" type="file" className="hidden" onChange={handleFileChange} />
                                                </label>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <DialogFooter>
                                <Button variant="outline" onClick={handleCloseDialog}>Close</Button>
                                {!reportData && (
                                    <Button onClick={handleGenerate} disabled={isGenerating}>
                                        {isGenerating ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Generating...
                                            </>
                                        ) : (
                                            'Generate Report'
                                        )}
                                    </Button>
                                )}
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
          </main>
        </div>
      </div>
    </>
  );
};

export default AICopilotPage;