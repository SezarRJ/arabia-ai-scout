import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Palette, Save, Type, Image as ImageIcon } from 'lucide-react';

const ApplicationControlPage = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    primaryColor: '#6366f1',
    headingFont: 'Inter',
    bodyFont: 'Roboto',
    logoUrl: '/logo.svg',
    welcomeText: 'Welcome to SharkVest',
  });

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    toast({ title: 'Settings Saved', description: 'Your application customizations have been saved.' });
  };

  return (
    <>
      <Helmet>
        <title>Application Control - SharkVest</title>
      </Helmet>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold flex items-center"><Palette className="mr-3" /> Application Control</h1>
              <Button onClick={handleSave}><Save className="mr-2 h-4 w-4" /> Save Changes</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>Branding & Colors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <Input type="color" id="primaryColor" name="primaryColor" value={settings.primaryColor} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="logoUrl">Logo URL</Label>
                    <Input id="logoUrl" name="logoUrl" value={settings.logoUrl} onChange={handleChange} />
                  </div>
                </CardContent>
              </Card>
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>Typography</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="headingFont">Heading Font</Label>
                    <Input id="headingFont" name="headingFont" value={settings.headingFont} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="bodyFont">Body Font</Label>
                    <Input id="bodyFont" name="bodyFont" value={settings.bodyFont} onChange={handleChange} />
                  </div>
                </CardContent>
              </Card>
              <Card className="glass-effect md:col-span-2">
                <CardHeader>
                  <CardTitle>Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label htmlFor="welcomeText">Welcome Text (Landing Page)</Label>
                    <Input id="welcomeText" name="welcomeText" value={settings.welcomeText} onChange={handleChange} />
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

export default ApplicationControlPage;