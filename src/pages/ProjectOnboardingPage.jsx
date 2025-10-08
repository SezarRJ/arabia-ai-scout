import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { UploadCloud, FileText, DollarSign, Users, ArrowRight, ArrowLeft, Check, PartyPopper, UserCheck } from 'lucide-react';

const steps = [
  { id: 1, title: 'Basic Information' },
  { id: 2, title: 'Elevator Pitch' },
  { id: 3, title: 'Document Upload' },
  { id: 4, title: 'Team Members' },
];

const FileUploadZone = ({ title, description, icon: Icon, required, onUpload, docKey }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setUploading(true);
      setTimeout(() => {
        setFile(selectedFile);
        setUploading(false);
        onUpload(docKey);
      }, 1500);
    }
  };

  return (
    <div className="p-4 border-2 border-dashed rounded-lg text-center bg-secondary/50 hover:border-primary transition-colors">
      <label htmlFor={`upload-${title}`} className="cursor-pointer">
        <div className="flex flex-col items-center">
          <Icon className="w-8 h-8 text-primary mb-2" />
          <h4 className="font-semibold">{title} {required && <span className="text-destructive">*</span>}</h4>
          <p className="text-xs text-muted-foreground">{description}</p>
          <Input id={`upload-${title}`} type="file" className="hidden" onChange={handleFileChange} />
          {uploading && <p className="text-sm mt-2 text-yellow-400">Uploading...</p>}
          {file && !uploading && <p className="text-sm mt-2 text-green-400 truncate max-w-xs">{file.name} uploaded!</p>}
        </div>
      </label>
    </div>
  );
};

const ProjectOnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDocumentUpload = (docKey) => {
    const currentDocs = JSON.parse(localStorage.getItem('uploadedDocuments')) || {};
    currentDocs[docKey] = true;
    localStorage.setItem('uploadedDocuments', JSON.stringify(currentDocs));
    toast({
      title: "Document Uploaded!",
      description: "Your AI Project Score on the dashboard will be updated.",
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    toast({
      title: "Project Onboarding Complete!",
      description: "Your project details have been saved. Next, complete your verification.",
    });
    navigate('/founder-dashboard');
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <>
      <Helmet>
        <title>Project Onboarding - SharkVest</title>
      </Helmet>
      <div className="min-h-screen flex bg-background">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <Card className="w-full max-w-4xl mx-auto glass-effect">
              <CardHeader>
                <CardTitle>Project Onboarding Wizard</CardTitle>
                <CardDescription>Let's get your project set up for success.</CardDescription>
                <div className="pt-4">
                  <Progress value={progress} className="w-full" />
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    {steps.map(step => (
                      <span key={step.id} className={currentStep >= step.id ? 'font-bold text-foreground' : ''}>
                        {step.title}
                      </span>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    {currentStep === 1 && (
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Step 1: Basic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div><Label htmlFor="startupName">Startup Name</Label><Input id="startupName" placeholder="e.g., TechFlow Solutions" /></div>
                          <div><Label htmlFor="logo">Logo URL</Label><Input id="logo" placeholder="https://example.com/logo.png" /></div>
                          <div><Label htmlFor="tagline">Tagline</Label><Input id="tagline" placeholder="Reinventing financial data." /></div>
                          <div><Label htmlFor="website">Website</Label><Input id="website" placeholder="https://techflow.com" /></div>
                          <div>
                            <Label htmlFor="industry">Industry</Label>
                            <Select><SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger><SelectContent><SelectItem value="fintech">FinTech</SelectItem><SelectItem value="healthtech">HealthTech</SelectItem></SelectContent></Select>
                          </div>
                          <div>
                            <Label htmlFor="stage">Stage</Label>
                            <Select><SelectTrigger><SelectValue placeholder="Select stage" /></SelectTrigger><SelectContent><SelectItem value="idea">Idea</SelectItem><SelectItem value="seed">Seed</SelectItem><SelectItem value="series-a">Series A</SelectItem></SelectContent></Select>
                          </div>
                        </div>
                      </div>
                    )}
                    {currentStep === 2 && (
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Step 2: Elevator Pitch</h3>
                        <Label htmlFor="pitch">Provide a one-paragraph summary of your startup.</Label>
                        <Textarea id="pitch" placeholder="Our startup, TechFlow Solutions, is a B2B SaaS platform..." className="min-h-[150px]" />
                      </div>
                    )}
                    {currentStep === 3 && (
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Step 3: Document Upload Zone</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FileUploadZone title="Personal ID (KYC)" description="Passport, ID Card" icon={UserCheck} required onUpload={handleDocumentUpload} docKey="kyc" />
                          <FileUploadZone title="Pitch Deck" description="PDF, PPTX" icon={FileText} required onUpload={handleDocumentUpload} docKey="pitchDeck" />
                          <FileUploadZone title="Financial Model" description="XLSX, CSV" icon={DollarSign} onUpload={handleDocumentUpload} docKey="financials" />
                          <FileUploadZone title="Other Documents" description="Demo, Research" icon={UploadCloud} onUpload={() => {}} docKey="other" />
                        </div>
                      </div>
                    )}
                    {currentStep === 4 && (
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Step 4: Invite Your Team</h3>
                        <p className="text-sm text-muted-foreground">Invite co-founders and key team members to complete their profiles. This strengthens your Trust Score.</p>
                        <div className="flex gap-2">
                          <Input placeholder="cofounder@example.com" />
                          <Button>Invite</Button>
                        </div>
                        <div className="p-4 bg-secondary/50 rounded-lg space-y-2">
                          <div className="flex justify-between items-center">
                            <p>jane.doe@techflow.com</p>
                            <span className="text-green-400 text-sm flex items-center"><Check className="w-4 h-4 mr-1"/> Joined</span>
                          </div>
                           <div className="flex justify-between items-center">
                            <p>john.smith@techflow.com</p>
                            <span className="text-yellow-400 text-sm">Pending</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </CardContent>
              <CardContent className="flex justify-between pt-6">
                <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                {currentStep < steps.length ? (
                  <Button onClick={handleNext}>
                    Next <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handleFinish} className="bg-green-600 hover:bg-green-700">
                    Finish <PartyPopper className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </>
  );
};

export default ProjectOnboardingPage;