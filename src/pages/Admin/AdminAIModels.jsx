import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Cpu, Shield, BarChart, Target, Bot, FileSearch, RefreshCw, Play, Edit } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

const aiModels = [
  {
    id: 'trustScore',
    title: 'Trust Score Model',
    description: 'Calculates a 0-100 score based on identity verification, compliance checks, and platform activity.',
    status: 'Active',
    version: '2.1.0',
    accuracy: '98.5%',
    params: { weight_identity: 30, weight_compliance: 40, weight_activity: 30 }
  },
  {
    id: 'projectScore',
    title: 'AI Project Score Model',
    description: 'A 10-factor weighted model to evaluate startup potential, including team, market, and traction.',
    status: 'Active',
    version: '1.5.2',
    accuracy: '92.1%',
    params: { weight_team: 25, weight_market: 25, weight_traction: 50 }
  },
  {
    id: 'dealProbability',
    title: 'Deal Probability Model',
    description: 'ML-based prediction of a startup\'s fundraising success probability based on historical data.',
    status: 'In Training',
    version: '0.8.0',
    accuracy: '85.3% (Validation)',
    params: { learning_rate: 0.01, epochs: 100 }
  },
  {
    id: 'investorRecommender',
    title: 'Investor Recommendation Engine',
    description: 'ML-powered matching of startups to the most relevant investors based on thesis and past activity.',
    status: 'Active',
    version: '3.0.1',
    accuracy: '94.7% (Top-5 Recall)',
    params: { embedding_dim: 128 }
  },
  {
    id: 'pitchAssistant',
    title: 'Virtual Pitch Assistant',
    description: 'NLP-powered Q&A simulation to help founders practice their pitch and prepare for investor questions.',
    status: 'Beta',
    version: '0.5.0',
    accuracy: 'N/A',
    params: { model_name: 'gpt-4-turbo' }
  },
  {
    id: 'valuationAdvisor',
    title: 'Valuation & Due Diligence Advisor',
    description: 'AI-generated insights, red-flag detection, and valuation benchmarks for investors.',
    status: 'Active',
    version: '1.9.0',
    accuracy: '91.5%',
    params: { industry_multipliers: 'Enabled' }
  },
];

const getIcon = (id) => {
  switch (id) {
    case 'trustScore': return Shield;
    case 'projectScore': return BarChart;
    case 'dealProbability': return Target;
    case 'investorRecommender': return Target;
    case 'pitchAssistant': return Bot;
    case 'valuationAdvisor': return FileSearch;
    default: return Cpu;
  }
};

const getStatusBadge = (status) => {
  switch (status) {
    case 'Active': return <Badge variant="success">Active</Badge>;
    case 'In Training': return <Badge variant="warning">In Training</Badge>;
    case 'Beta': return <Badge className="bg-blue-500 text-white">Beta</Badge>;
    default: return <Badge>{status}</Badge>;
  }
};

const AdminAIModels = () => {
  const { toast } = useToast();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);

  const handleRetrain = (title) => {
    toast({
      title: `Retraining Initiated`,
      description: `The ${title} is now being retrained with the latest data.`,
    });
  };

  const openEditModal = (model) => {
    setSelectedModel(model);
    setIsEditModalOpen(true);
  };

  const openTestModal = (model) => {
    setSelectedModel(model);
    setIsTestModalOpen(true);
  };

  const handleSaveChanges = () => {
    toast({ title: "Changes Saved", description: `Parameters for ${selectedModel.title} have been updated.` });
    setIsEditModalOpen(false);
  };

  const handleRunTest = () => {
    toast({ title: "Test Running", description: `A diagnostic test for ${selectedModel.title} has been initiated.` });
    setIsTestModalOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>AI Models - Admin Panel</title>
      </Helmet>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Cpu className="w-8 h-8" />
              <h1 className="text-3xl font-bold">AI Models Management</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiModels.map((model) => {
                const Icon = getIcon(model.id);
                return (
                  <Card key={model.id} className="glass-effect flex flex-col">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="flex items-center space-x-3">
                          <Icon className="w-6 h-6" />
                          <span>{model.title}</span>
                        </CardTitle>
                        {getStatusBadge(model.status)}
                      </div>
                      <CardDescription>{model.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-2 text-sm">
                      <p><strong>Version:</strong> {model.version}</p>
                      <p><strong>Accuracy/Metric:</strong> {model.accuracy}</p>
                    </CardContent>
                    <CardContent>
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => openEditModal(model)}>
                          <Edit className="w-4 h-4 mr-2" /> Edit
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleRetrain(model.title)}>
                          <RefreshCw className="w-4 h-4 mr-2" /> Retrain
                        </Button>
                        <Button variant="secondary" size="sm" onClick={() => openTestModal(model)}>
                          <Play className="w-4 h-4 mr-2" /> Run Test
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </main>
        </div>
      </div>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit: {selectedModel?.title}</DialogTitle>
            <DialogDescription>Adjust model parameters and weights.</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            {selectedModel?.params && Object.entries(selectedModel.params).map(([key, value]) => (
              <div key={key}>
                <Label htmlFor={key}>{key.replace(/_/g, ' ')}</Label>
                <Input id={key} defaultValue={value} />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isTestModalOpen} onOpenChange={setIsTestModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Run Test: {selectedModel?.title}</DialogTitle>
            <DialogDescription>Initiate a diagnostic test for this model.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>Test will run against a validation dataset to check for performance degradation and bias.</p>
            <p className="text-sm text-muted-foreground mt-2">Results will be available in the Audit Logs.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTestModalOpen(false)}>Cancel</Button>
            <Button onClick={handleRunTest}>Confirm & Run Test</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminAIModels;