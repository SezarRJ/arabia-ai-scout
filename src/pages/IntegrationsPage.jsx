import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Video, Calendar, CreditCard, ShieldCheck, CheckCircle, KeyRound, BarChart2, Plus, Edit, Copy, RefreshCw } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const initialIntegrations = [
    {
        name: "Video Conferencing",
        description: "Connect Zoom or Google Meet for seamless video calls.",
        icon: Video,
        providers: ["Zoom", "Google Meet"],
        connected: false
    },
    {
        name: "Calendar",
        description: "Integrate Google or Outlook calendars to schedule meetings.",
        icon: Calendar,
        providers: ["Google Calendar", "Outlook Calendar"],
        connected: true
    },
    {
        name: "Payment Processing",
        description: "Enable payments with Stripe and other local providers.",
        icon: CreditCard,
        providers: ["Stripe"],
        connected: false
    },
    {
        name: "KYC/AML",
        description: "Automate identity verification for enhanced security.",
        icon: ShieldCheck,
        providers: ["Veriff", "Onfido"],
        connected: true
    },
];

const IntegrationsPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [newApiKey, setNewApiKey] = useState('');

  const handleToggleConnect = (integrationName) => {
    setIntegrations(prev => prev.map(int => 
      int.name === integrationName ? { ...int, connected: !int.connected } : int
    ));
    const isConnecting = !integrations.find(int => int.name === integrationName)?.connected;
    toast({
      title: `Integration ${isConnecting ? 'Connected' : 'Disconnected'}`,
      description: `${integrationName} has been successfully ${isConnecting ? 'connected' : 'disconnected'}.`,
    });
  };

  const handleViewAnalytics = () => {
    setIsAnalyticsModalOpen(true);
  };

  const handleGenerateKey = () => {
    const key = `sk_live_${[...Array(24)].map(() => Math.random().toString(36)[2]).join('')}`;
    setNewApiKey(key);
    setIsApiKeyModalOpen(true);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied to clipboard!' });
  };

  return (
    <>
      <Helmet>
        <title>{t('integrations')} - SharkVest</title>
      </Helmet>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{t('integrations')}</h1>
                <p className="text-gray-400">Connect your favorite tools to streamline your workflow.</p>
              </div>
              <Button onClick={() => toast({ title: 'Feature coming soon!' })}>
                <Plus className="w-4 h-4 mr-2" /> Add Integration
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {integrations.map(integration => (
                    <Card key={integration.name} className="glass-effect">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <integration.icon className="w-6 h-6 mr-3 rtl:mr-0 rtl:ml-3" />
                                    {integration.name}
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => toast({ title: 'Feature coming soon!' })}>
                                    <Edit className="w-4 h-4" />
                                </Button>
                            </CardTitle>
                            <CardDescription>{integration.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                                {integration.providers.map(provider => (
                                    <span key={provider} className="text-sm px-2 py-1 bg-gray-700 rounded-md">{provider}</span>
                                ))}
                            </div>
                            {integration.connected ? (
                                <Button className="w-full" variant="destructive" onClick={() => handleToggleConnect(integration.name)}>
                                    Disconnect
                                </Button>
                            ) : (
                                <Button className="w-full" onClick={() => handleToggleConnect(integration.name)}>
                                    Connect
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">API Management</h2>
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>Developer API</CardTitle>
                  <CardDescription>Monitor usage and generate keys for custom integrations.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col justify-between p-4 rounded-lg bg-gray-800/50">
                    <div>
                      <h3 className="font-semibold flex items-center mb-2"><BarChart2 className="w-5 h-5 mr-2"/>API Usage</h3>
                      <p className="text-sm text-gray-400">You have used 75% of your monthly API call limit.</p>
                    </div>
                    <Button variant="outline" className="mt-4" onClick={handleViewAnalytics}>View Analytics</Button>
                  </div>
                  <div className="flex flex-col justify-between p-4 rounded-lg bg-gray-800/50">
                    <div>
                      <h3 className="font-semibold flex items-center mb-2"><KeyRound className="w-5 h-5 mr-2"/>API Keys</h3>
                      <p className="text-sm text-gray-400">You have 2 active API keys.</p>
                    </div>
                    <Button className="mt-4 ai-gradient" onClick={handleGenerateKey}>Generate New Key</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>

      <Dialog open={isAnalyticsModalOpen} onOpenChange={setIsAnalyticsModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>API Usage Analytics</DialogTitle>
            <DialogDescription>Mock analytics for your API usage.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>Chart and data visualization would be here.</p>
            <div className="mt-4 p-4 bg-gray-800 rounded-lg">
              <p><strong>Total Calls:</strong> 7,500 / 10,000</p>
              <p><strong>Most Used Endpoint:</strong> /v1/startups/match</p>
              <p><strong>Error Rate:</strong> 1.2%</p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsAnalyticsModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isApiKeyModalOpen} onOpenChange={setIsApiKeyModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New API Key Generated</DialogTitle>
            <DialogDescription>Please copy this key and store it securely. You will not be able to see it again.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="apiKey">Your New API Key</Label>
            <div className="flex items-center space-x-2 mt-2">
              <Input id="apiKey" value={newApiKey} readOnly className="font-mono" />
              <Button variant="outline" size="icon" onClick={() => copyToClipboard(newApiKey)}><Copy className="w-4 h-4" /></Button>
              <Button variant="outline" size="icon" onClick={handleGenerateKey}><RefreshCw className="w-4 h-4" /></Button>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsApiKeyModalOpen(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default IntegrationsPage;