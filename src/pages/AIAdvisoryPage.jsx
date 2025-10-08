import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { BrainCircuit, Lightbulb, PieChart, Calculator, FileText, TrendingUp, Loader2, MessageCircle, BarChart, Shield, Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const reportTemplates = {
  ideaRefiner: {
    title: "AI Report for Idea Refiner",
    summary: "Analysis of your business idea's market viability, based on the concept provided.",
    sections: [
      { title: "Market Fit Analysis", content: "The concept shows a strong fit within the growing e-learning sector. The proposed niche for professional certifications is currently underserved in the MENA region." },
      { title: "Target Audience Profile", content: "Primary audience: mid-career professionals aged 28-45. Secondary audience: recent graduates seeking specialized skills. Marketing should focus on LinkedIn and professional forums." },
      { title: "Potential Roadblocks", content: "High cost of content creation and accreditation. Competition from global platforms like Coursera and Udemy. Building trust and brand recognition will be crucial." },
      { title: "Key Recommendations", content: "Start with a single, high-demand certification track to prove the model. Partner with local industry leaders for content credibility. Implement a freemium model to drive initial user adoption." }
    ]
  },
  pitchDeckGenerator: {
    title: "AI-Generated Pitch Deck Outline",
    summary: "A structured outline for your investor pitch deck, designed to be compelling and comprehensive.",
    sections: [
      { title: "Slide 1: Title", content: "Your Company Name, Tagline, Founder Name & Contact." },
      { title: "Slide 2: The Problem", content: "Clearly articulate the pain point you are solving. Use relatable examples." },
      { title: "Slide 3: The Solution", content: "Introduce your product/service as the clear solution. Showcase the core value proposition." },
      { title: "Slide 4: Market Size (TAM, SAM, SOM)", content: "Demonstrate a large and growing market opportunity." },
      { title: "Slide 5: The Product", content: "Show, don't just tell. Use screenshots or a short demo video link." },
      { title: "Slide 6: Business Model", content: "How do you make money? (e.g., SaaS, transaction fees, etc.)." }
    ]
  },
  dealStructuringAdvisor: {
    title: "AI Report for Deal Structuring",
    summary: "Recommendations for structuring your current funding round based on your stage and funding goals.",
    sections: [
      { title: "Recommended Funding Instrument", content: "For a Pre-Seed round of $500k, a SAFE (Simple Agreement for Future Equity) is recommended. It's faster, cheaper, and standard for this stage in the region." },
      { title: "Valuation Cap & Discount", content: "Suggest a valuation cap between $4M and $6M, with a 20% discount. This is competitive for a SaaS startup with early traction in MENA." },
      { title: "Cap Table Impact Simulation", content: "A $500k raise on a $5M post-money SAFE will result in approximately 10% dilution for the founders in the subsequent priced round." },
      { title: "Key Terms to Negotiate", content: "Focus on the valuation cap, discount rate, and any pro-rata rights. Avoid MFN (Most Favored Nation) clauses if possible to simplify future fundraising." }
    ]
  },
  communicationCoach: {
    title: "AI Communication Coach Analysis",
    summary: "Analysis and suggestions for your investor communication to improve clarity, tone, and impact.",
    sections: [
      { title: "Tone Analysis", content: "Your draft is professional but slightly too passive. We suggest incorporating more confident and action-oriented language." },
      { title: "Revised Opening", content: "Original: 'I was hoping you might have time to look at my startup.' Suggested: 'Following up on our recent discussion, I'm excited to share our progress and how we're positioned to capture the market.'" },
      { title: "Clarity Enhancement", content: "The section on 'synergistic value-adds' is vague. Replace with a concrete example: 'Our integration reduces customer onboarding time by 40% for our partners.'" },
      { title: "Personalized Tip", content: "Based on this investor's profile (focus on data-driven companies), be sure to highlight your key traction metrics (e.g., user growth, engagement) in the first two paragraphs." }
    ]
  },
};

const AIAdvisoryPage = () => {
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

  const founderTools = [
    { 
      id: 'ideaRefiner', 
      title: t('ideaRefiner'), 
      icon: Lightbulb, 
      description: "Upload your business plan or concept note. Our AI will analyze its market viability, identify potential roadblocks, and provide actionable recommendations to strengthen your idea.", 
      fields: [{ id: 'idea', label: 'Your Business Idea', type: 'textarea', placeholder: 'Describe your core business concept, target market, and problem you are solving...' }] 
    },
    { 
      id: 'pitchDeckGenerator', 
      title: t('pitchDeckGenerator'), 
      icon: PieChart, 
      description: "Provide key details about your company, and our AI will generate a structured, compelling outline for your investor pitch deck, ensuring you cover all critical points.", 
      fields: [{ id: 'companyName', label: 'Company Name', type: 'input', placeholder: 'e.g., TechFlow Solutions' }, { id: 'tagline', label: 'Tagline', type: 'input', placeholder: 'e.g., The future of financial data.' }] 
    },
    { 
      id: 'dealStructuringAdvisor', 
      title: 'Deal Structuring Advisor', 
      icon: Calculator, 
      description: "Get AI-driven guidance on structuring your funding round. Input your goals, and receive recommendations on funding types (SAFE, Note, Equity), valuation benchmarks, and cap table impact.", 
      features: [
        { name: 'Funding Strategy Recommendations', icon: Lightbulb },
        { name: 'Cap Table Modeling', icon: PieChart },
        { name: 'Valuation Benchmarking', icon: BarChart }
      ],
      fields: [{ id: 'fundingAmount', label: 'Funding Amount Sought', type: 'input', placeholder: '$500,000' }, { id: 'stage', label: 'Current Stage', type: 'input', placeholder: 'e.g., Pre-Seed, Seed' }] 
    },
    { 
      id: 'communicationCoach', 
      title: 'Communication Coach', 
      icon: MessageCircle, 
      description: "Enhance your investor outreach. Paste your draft emails or messages, and our AI will analyze the tone, suggest improvements for clarity, and provide personalized tips based on investor profiles.", 
      features: [
        { name: 'Message Drafting', icon: FileText },
        { name: 'Tone Feedback', icon: TrendingUp },
        { name: 'Personalized Tips', icon: Lightbulb },
        { name: 'Encrypted Drafts', icon: Shield }
      ],
      fields: [{ id: 'investorProfile', label: 'Investor Profile/Name', type: 'input', placeholder: 'e.g., Khalid Al-Saud' }, { id: 'messageContext', label: 'Message Context', type: 'textarea', placeholder: 'e.g., Follow-up after initial meeting...' }] 
    },
  ];

  const tools = founderTools;

  return (
    <>
      <Helmet>
        <title>AI Advisory - SharkVest</title>
      </Helmet>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
              <BrainCircuit className="w-10 h-10 ai-gradient rounded-lg p-2" />
              <h1 className="text-3xl font-bold">AI Advisory Suite</h1>
            </div>

            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Your Strategic AI Partner</CardTitle>
                <CardDescription>
                  Leverage artificial intelligence to refine your strategy, structure deals, and communicate effectively.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tools.map((tool) => (
                  <Card key={tool.id} className="bg-gray-800/50 card-hover flex flex-col">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg ai-gradient flex items-center justify-center mb-4">
                        <tool.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle>{tool.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 flex-grow">
                      <p className="text-sm text-gray-400">{tool.description}</p>
                      {tool.features && (
                        <div className="space-y-2 pt-2">
                          {tool.features.map(feature => (
                            <div key={feature.name} className="flex items-center text-xs text-gray-300">
                              <feature.icon className="w-3 h-3 mr-2 text-blue-400" />
                              <span>{feature.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
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
                                    {activeTool.fields.map(field => (
                                        <div key={field.id} className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor={field.id} className="text-right">
                                                {field.label}
                                            </Label>
                                            {field.type === 'textarea' ? (
                                                <Textarea id={field.id} placeholder={field.placeholder} className="col-span-3" />
                                            ) : (
                                                <Input id={field.id} placeholder={field.placeholder} className="col-span-3" />
                                            )}
                                        </div>
                                    ))}
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="docType" className="text-right">Document Type</Label>
                                        <Select>
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select document type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="business-plan">Business Plan</SelectItem>
                                                <SelectItem value="concept-note">Concept Note</SelectItem>
                                                <SelectItem value="draft-email">Draft Email</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
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

export default AIAdvisoryPage;