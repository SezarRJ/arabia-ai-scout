import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Upload, CheckCircle, FileText, Shield, User, Image as ImageIcon, Phone, DollarSign, Briefcase, Link, UserCheck, BarChart2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const ImproveScorePage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadCriteria, setUploadCriteria] = useState(null);
  const [uploadFileName, setUploadFileName] = useState('');
  const userRole = user?.user_metadata?.role;

  const founderScoreCriteria = [
    { name: 'Add profile photo', weight: 10, completed: 0, icon: ImageIcon },
    { name: 'Fill about section', weight: 10, completed: 0, icon: FileText },
    { name: 'Connect LinkedIn', weight: 8, completed: 0, icon: Link },
    { name: 'Add company name', weight: 5, completed: 100, icon: User },
    { name: 'Verify email', weight: 10, completed: 100, icon: Shield },
    { name: 'Verify phone', weight: 10, completed: 0, icon: Phone },
    { name: 'Upload ID (simple)', weight: 13, completed: 0, icon: UserCheck },
    { name: 'Upload pitch deck', weight: 15, completed: 0, icon: FileText },
    { name: 'Add funding goal', weight: 10, completed: 0, icon: DollarSign },
    { name: 'Select industry', weight: 5, completed: 100, icon: Briefcase },
    { name: 'Write 1-line description', weight: 4, completed: 100, icon: FileText },
  ];

  const investorScoreCriteria = [
    { name: 'Add profile photo', weight: 10, completed: 0, icon: ImageIcon },
    { name: 'Fill "About Me" section', weight: 10, completed: 0, icon: FileText },
    { name: 'Connect LinkedIn', weight: 10, completed: 0, icon: Link },
    { name: 'Add company/firm name', weight: 10, completed: 100, icon: User },
    { name: 'Verify email', weight: 10, completed: 100, icon: Shield },
    { name: 'Verify phone', weight: 10, completed: 0, icon: Phone },
    { name: 'Simple accreditation check', weight: 10, completed: 0, icon: UserCheck },
    { name: 'Select industries you invest in', weight: 10, completed: 0, icon: Briefcase },
    { name: 'Set investment range', weight: 10, completed: 0, icon: DollarSign },
    { name: 'Choose startup stages', weight: 10, completed: 0, icon: BarChart2 },
  ];

  const founderScoreTiers = [
    { range: '81-100', level: '🔵 Investor-Ready', description: 'Full access to investors!', color: 'blue' },
    { range: '51-80', level: '🟢 Explorer', description: 'Getting noticed', color: 'green' },
    { range: '0-50', level: '🟡 Starter', description: 'Just beginning', color: 'yellow' },
  ];

  const investorScoreTiers = [
    { range: '81-100', level: '🔵 Verified Investor', description: 'Full platform access', color: 'blue' },
    { range: '51-80', level: '🟢 Active Investor', description: 'Can browse startups', color: 'green' },
    { range: '0-50', level: '🟡 Basic Investor', description: 'Just getting started', color: 'yellow' },
  ];

  const scoreCriteria = userRole === 'founder' ? founderScoreCriteria : investorScoreCriteria;
  const scoreTiers = userRole === 'founder' ? founderScoreTiers : investorScoreTiers;

  const handleUploadClick = (criteria) => {
    setUploadCriteria(criteria);
    setIsUploadModalOpen(true);
    setUploadFileName('');
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFileName(e.target.files[0].name);
    }
  };

  const handleUploadSubmit = () => {
    if (!uploadFileName) {
      toast({ variant: 'destructive', title: 'No file selected', description: 'Please choose a file to upload.' });
      return;
    }
    toast({
      title: 'Upload Successful',
      description: `${uploadFileName} has been submitted for verification for ${uploadCriteria.name}.`,
    });
    setIsUploadModalOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Improve Trust Score - SharkVest</title>
      </Helmet>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <h1 className="text-3xl font-bold mb-6">Improve Your Trust Score®</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle>Score Components</CardTitle>
                    <CardDescription>Complete these sections to increase your Trust Score and unlock more features.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {scoreCriteria.map(item => (
                      <div key={item.name} className="p-4 rounded-lg bg-background/50 border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3 rtl:space-x-reverse">
                            <item.icon className="w-6 h-6 text-light-blue-500" />
                            <div>
                              <p className="font-semibold">{item.name}</p>
                              <p className="text-xs text-gray-600">Points: {item.weight}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            {item.completed === 100 ? (
                              <Badge variant="success" className="flex items-center space-x-1 rtl:space-x-reverse">
                                <CheckCircle className="w-3 h-3" />
                                <span>Complete</span>
                              </Badge>
                            ) : (
                              <Button size="sm" onClick={() => handleUploadClick(item)}>
                                <Upload className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                                {item.name.includes('Upload') || item.name.includes('check') ? 'Start' : 'Complete'}
                              </Button>
                            )}
                          </div>
                        </div>
                        <Progress value={item.completed} />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle>Score Tiers</CardTitle>
                    <CardDescription>Understand what your score means.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {scoreTiers.map(tier => (
                      <div key={tier.level} className="p-3 rounded-lg bg-background/50 border border-border">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold">{tier.level}</h4>
                          <Badge variant={tier.color}>{tier.range}%</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{tier.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>

      <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload for {uploadCriteria?.name}</DialogTitle>
            <DialogDescription>Please upload the relevant documents to improve your score.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="docUpload" className="text-right">File</Label>
              <div className="col-span-3">
                <Button asChild variant="outline">
                  <label htmlFor="docUpload" className="cursor-pointer w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    {uploadFileName || 'Choose a file'}
                    <Input id="docUpload" type="file" className="hidden" onChange={handleFileChange} />
                  </label>
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadModalOpen(false)}>Cancel</Button>
            <Button onClick={handleUploadSubmit}>Upload & Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImproveScorePage;