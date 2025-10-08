import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Palette, Save } from 'lucide-react';

const AdminThemeEditor = () => {
  const { toast } = useToast();
  const [colors, setColors] = useState({
    primary: '#6366f1',
    secondary: '#a855f7',
    background: '#0f172a',
    card: '#1e293b',
    text: '#e2e8f0',
  });

  const handleColorChange = (e) => {
    setColors({ ...colors, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // In a real app, you'd save this to a CSS variables file or a context
    Object.entries(colors).forEach(([name, value]) => {
      document.documentElement.style.setProperty(`--color-${name}`, value);
    });
    toast({ title: 'Theme Saved', description: 'The new color scheme has been applied.' });
  };

  return (
    <>
      <Helmet>
        <title>Theme Editor - Admin Panel</title>
      </Helmet>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold flex items-center"><Palette className="mr-3" /> Theme Editor</h1>
              <Button onClick={handleSave}><Save className="mr-2 h-4 w-4" /> Save & Publish</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>Color Palette</CardTitle>
                  <CardDescription>Customize the main colors of the application.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  {Object.entries(colors).map(([name, value]) => (
                    <div key={name}>
                      <Label htmlFor={`color-${name}`} className="capitalize">{name}</Label>
                      <div className="flex items-center space-x-2">
                        <Input type="color" id={`color-${name}`} name={name} value={value} onChange={handleColorChange} className="p-1 h-10 w-14" />
                        <Input type="text" value={value} onChange={handleColorChange} name={name} />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>Live Preview</CardTitle>
                  <CardDescription>See your changes in real-time.</CardDescription>
                </CardHeader>
                <CardContent style={{ backgroundColor: colors.background, color: colors.text, padding: '1.5rem', borderRadius: '0.5rem' }}>
                  <Card style={{ backgroundColor: colors.card, marginBottom: '1rem' }}>
                    <CardHeader>
                      <CardTitle style={{ color: colors.text }}>Example Card</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>This is some example text.</p>
                    </CardContent>
                  </Card>
                  <Button style={{ backgroundColor: colors.primary, color: '#fff' }}>Primary Button</Button>
                  <Button style={{ backgroundColor: colors.secondary, color: '#fff', marginLeft: '1rem' }}>Secondary Button</Button>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminThemeEditor;