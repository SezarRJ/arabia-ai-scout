import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminAppSettings = () => {
  const { toast } = useToast();

  const handleSaveChanges = (section) => {
    toast({
      title: "Settings Saved",
      description: `${section} settings have been successfully updated.`,
    });
  };

  return (
    <>
      <Helmet>
        <title>App Settings - Admin Panel</title>
      </Helmet>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <h1 className="text-3xl font-bold mb-6">App Settings</h1>
            <Tabs defaultValue="general">
              <TabsList className="mb-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="payment">Payment Gateways</TabsTrigger>
                <TabsTrigger value="email">Email Templates</TabsTrigger>
              </TabsList>
              <TabsContent value="general">
                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>Manage general application settings.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="appName">Application Name</Label>
                      <Input id="appName" defaultValue="SharkVest" />
                    </div>
                    <div>
                      <Label htmlFor="appUrl">Application URL</Label>
                      <Input id="appUrl" defaultValue="https://app.sharkvest.com" />
                    </div>
                    <Button onClick={() => handleSaveChanges('General')}>Save General Settings</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="payment">
                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle>Payment Gateways</CardTitle>
                    <CardDescription>Configure your payment providers.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="stripeKey">Stripe Public Key</Label>
                      <Input id="stripeKey" placeholder="pk_live_..." />
                    </div>
                    <div>
                      <Label htmlFor="stripeSecret">Stripe Secret Key</Label>
                      <Input id="stripeSecret" type="password" placeholder="sk_live_..." />
                    </div>
                    <Button onClick={() => handleSaveChanges('Payment')}>Save Payment Settings</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="email">
                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle>Email Templates</CardTitle>
                    <CardDescription>Customize automated emails.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="welcomeEmail">Welcome Email Subject</Label>
                      <Input id="welcomeEmail" defaultValue="Welcome to SharkVest!" />
                      <Textarea className="mt-2" placeholder="Email body content... Use {{name}} for personalization." />
                    </div>
                    <Button onClick={() => handleSaveChanges('Email')}>Save Email Templates</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminAppSettings;