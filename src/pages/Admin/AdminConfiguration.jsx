import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const AdminConfiguration = () => {
  const { toast } = useToast();
  const [features, setFeatures] = useState({
    aiCopilot: true,
    virtualEvents: true,
    premiumReports: false,
  });
  const [pricing, setPricing] = useState({
    standard: '49',
    premium: '99',
  });

  const handleFeatureToggle = (feature) => {
    setFeatures(prev => ({ ...prev, [feature]: !prev[feature] }));
  };

  const handlePricingChange = (e) => {
    setPricing(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveChanges = () => {
    toast({
      title: "Configuration Saved",
      description: "Your changes have been successfully saved.",
    });
  };

  return (
    <>
      <Helmet>
        <title>System Configuration - Admin Panel</title>
      </Helmet>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">System Configuration</h1>
                <Button onClick={handleSaveChanges}>Save Changes</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-effect">
                    <CardHeader>
                        <CardTitle>Feature Toggles</CardTitle>
                        <CardDescription>Enable or disable platform features globally.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="ai-copilot-toggle">AI Co-Pilot for Investors</Label>
                            <Switch id="ai-copilot-toggle" checked={features.aiCopilot} onCheckedChange={() => handleFeatureToggle('aiCopilot')} />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="virtual-events-toggle">Virtual Pitch Events</Label>
                            <Switch id="virtual-events-toggle" checked={features.virtualEvents} onCheckedChange={() => handleFeatureToggle('virtualEvents')} />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="premium-reports-toggle">Premium AI Reports</Label>
                            <Switch id="premium-reports-toggle" checked={features.premiumReports} onCheckedChange={() => handleFeatureToggle('premiumReports')} />
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-effect">
                    <CardHeader>
                        <CardTitle>Monetization Settings</CardTitle>
                        <CardDescription>Update subscription pricing tiers.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="standard-price">Standard Plan ($/month)</Label>
                            <Input id="standard-price" name="standard" type="number" value={pricing.standard} onChange={handlePricingChange} />
                        </div>
                        <div>
                            <Label htmlFor="premium-price">Premium Plan ($/month)</Label>
                            <Input id="premium-price" name="premium" type="number" value={pricing.premium} onChange={handlePricingChange} />
                        </div>
                    </CardContent>
                </Card>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminConfiguration;