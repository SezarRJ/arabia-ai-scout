import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const campaigns = [
  { id: 1, name: 'Welcome Series', target: 'New Founders', status: 'Active', sent: 1250, openRate: '45%' },
  { id: 2, name: 'Investor Update Q4', target: 'All Investors', status: 'Sent', sent: 850, openRate: '62%' },
  { id: 3, name: 'New Feature: AI Co-Pilot', target: 'Active Investors', status: 'Draft', sent: 0, openRate: 'N/A' },
];

const AdminCampaigns = () => {
  const { toast } = useToast();

  const handleSendCampaign = () => {
    toast({
      title: "Campaign Sent!",
      description: "Your email campaign is now being sent to the target audience.",
    });
  };

  return (
    <>
      <Helmet>
        <title>Email Campaigns - Admin Panel</title>
      </Helmet>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle>Campaigns</CardTitle>
                    <CardDescription>Manage and view your email campaigns.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Campaign</TableHead>
                          <TableHead>Target</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Sent</TableHead>
                          <TableHead>Open Rate</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {campaigns.map((campaign) => (
                          <TableRow key={campaign.id}>
                            <TableCell>{campaign.name}</TableCell>
                            <TableCell>{campaign.target}</TableCell>
                            <TableCell><Badge variant={campaign.status === 'Active' ? 'success' : 'secondary'}>{campaign.status}</Badge></TableCell>
                            <TableCell>{campaign.sent}</TableCell>
                            <TableCell>{campaign.openRate}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle>Create New Campaign</CardTitle>
                    <CardDescription>Draft and send a new email campaign.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input placeholder="Campaign Name" />
                    <Input placeholder="Email Subject" />
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Target Audience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="founders">All Founders</SelectItem>
                        <SelectItem value="investors">All Investors</SelectItem>
                        <SelectItem value="active-founders">Active Founders</SelectItem>
                      </SelectContent>
                    </Select>
                    <Textarea placeholder="Email content..." rows={6} />
                    <Button className="w-full" onClick={handleSendCampaign}><Send className="mr-2 h-4 w-4" /> Send Campaign</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminCampaigns;