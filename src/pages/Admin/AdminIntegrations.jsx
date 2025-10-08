import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge'; // Import Badge component
import { 
  Bot, Cpu, FileText, ShieldCheck, Pin, Link2, Languages, 
  PlayCircle, BarChart, Image, Type, TextSelect, Atom, ToyBrick, Plug, Settings, BookOpen
} from 'lucide-react';

const aiIntegrationsList = [
  { 
    key: 'openai', 
    name: 'OpenAI GPT-4o', 
    icon: Bot, 
    enabled: true, 
    description: 'Generative Tasks (pitch decks, messaging)' 
  },
  { 
    key: 'custom_ml', 
    name: 'Custom ML (SageMaker)', 
    icon: Cpu, 
    enabled: true, 
    description: 'Predictive Scoring & Risk Analysis' 
  },
  { 
    key: 'doc_ai', 
    name: 'Google Document AI', 
    icon: FileText, 
    enabled: true, 
    description: 'Document Parsing & Insights' 
  },
  { 
    key: 'onfido', 
    name: 'Onfido', 
    icon: ShieldCheck, 
    enabled: true, 
    description: 'Identity Verification & AML/PEP' 
  },
  { 
    key: 'pinecone', 
    name: 'Pinecone & OpenAI Embeddings', 
    icon: Pin, 
    enabled: true, 
    description: 'Semantic Matching & Recommendations' 
  },
  { 
    key: 'langchain', 
    name: 'LangChain', 
    icon: Link2, 
    enabled: true, 
    description: 'Workflow Orchestration' 
  },
  { 
    key: 'huggingface', 
    name: 'Hugging Face (Arabic NLP)', 
    icon: Languages, 
    enabled: true, 
    description: 'Arabic NLP Enhancements' 
  },
];

const libraryIntegrationsList = [
  { name: 'Anime.js', icon: PlayCircle, description: 'Page transitions, micro-interactions' },
  { name: 'ECharts.js', icon: BarChart, description: 'All data visualizations and charts' },
  { name: 'Splide.js', icon: Image, description: 'Feature carousels, image galleries' },
  { name: 'Typed.js', icon: Type, description: 'Hero section typewriter effects' },
  { name: 'Splitting.js', icon: TextSelect, description: 'Advanced text animations for headings' },
  { name: 'p5.js', icon: Atom, description: 'Background effects and creative elements' },
  { name: 'Matter.js', icon: ToyBrick, description: 'Physics-based animations' },
];

const AdminIntegrations = () => {
  const { toast } = useToast();
  const [aiIntegrations, setAiIntegrations] = useState(aiIntegrationsList);

  const handleToggle = (key) => {
    setAiIntegrations(prev => prev.map(item => 
      item.key === key ? { ...item, enabled: !item.enabled } : item
    ));
    const integration = aiIntegrations.find(item => item.key === key);
    toast({
      title: `${integration.name} ${!integration.enabled ? 'Enabled' : 'Disabled'}`,
    });
  };

  const handleManage = (name) => {
    toast({
      title: `Manage ${name}`,
      description: "This would navigate to the specific management page for this integration.",
    });
  };

  return (
    <>
      <Helmet>
        <title>Integrations - Admin Panel</title>
      </Helmet>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Platform Integrations</h1>
                <Button onClick={() => toast({ title: "Feature not implemented" })}><Plug className="mr-2 h-4 w-4" /> Add New Integration</Button>
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">AI & API Integrations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {aiIntegrations.map(({ key, name, icon: Icon, enabled, description }) => (
                      <Card key={key} className="glass-effect flex flex-col">
                          <CardHeader>
                              <CardTitle className="flex items-center"><Icon className="mr-3 h-6 w-6" /> {name}</CardTitle>
                              <CardDescription>{description}</CardDescription>
                          </CardHeader>
                          <CardContent className="flex-grow flex flex-col justify-end">
                              <div className="flex items-center justify-between">
                                  <Label htmlFor={`${key}-toggle`}>{enabled ? 'Connected' : 'Disconnected'}</Label>
                                  <Switch id={`${key}-toggle`} checked={enabled} onCheckedChange={() => handleToggle(key)} />
                              </div>
                              <Button variant="outline" className="w-full mt-4" onClick={() => handleManage(name)}>
                                <Settings className="mr-2 h-4 w-4" /> Manage
                              </Button>
                          </CardContent>
                      </Card>
                  ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Core Library Integrations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {libraryIntegrationsList.map(({ name, icon: Icon, description }) => (
                      <Card key={name} className="glass-effect">
                          <CardHeader>
                              <CardTitle className="flex items-center"><Icon className="mr-3 h-6 w-6" /> {name}</CardTitle>
                              <CardDescription>{description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                              <div className="flex items-center justify-between">
                                <Badge variant="success">Active & Managed</Badge>
                                <Button variant="ghost" size="sm" onClick={() => toast({ title: "This is a core library", description: "Documentation can be found online." })}>
                                  <BookOpen className="mr-2 h-4 w-4" /> View Docs
                                </Button>
                              </div>
                          </CardContent>
                      </Card>
                  ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminIntegrations;