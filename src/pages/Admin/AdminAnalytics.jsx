import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

const userEngagementData = [
  { name: 'Jan', matches: 120, messages: 200 },
  { name: 'Feb', matches: 150, messages: 250 },
  { name: 'Mar', matches: 180, messages: 300 },
  { name: 'Apr', matches: 220, messages: 350 },
  { name: 'May', matches: 250, messages: 400 },
  { name: 'Jun', matches: 300, messages: 480 },
];

const platformPerformanceData = [
  { name: 'Page Load', value: 1.2 },
  { name: 'Uptime', value: 99.98 },
  { name: 'API Response', value: 150 },
];

const AdminAnalytics = () => {
  return (
    <>
      <Helmet>
        <title>Analytics & Reporting - Admin Panel</title>
      </Helmet>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Analytics & Reporting</h1>
                <Button><Download className="mr-2 h-4 w-4" /> Export Reports</Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass-effect">
                    <CardHeader>
                        <CardTitle>User Engagement</CardTitle>
                        <CardDescription>Matches and messages over time.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={userEngagementData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                                <YAxis stroke="rgba(255,255,255,0.5)" />
                                <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.2)' }} />
                                <Legend />
                                <Line type="monotone" dataKey="matches" stroke="#8884d8" />
                                <Line type="monotone" dataKey="messages" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="glass-effect">
                    <CardHeader>
                        <CardTitle>Platform Performance</CardTitle>
                        <CardDescription>Key performance indicators.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <p className="text-3xl font-bold">1.2s</p>
                                <p className="text-muted-foreground">Avg. Load Time</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold">99.98%</p>
                                <p className="text-muted-foreground">Uptime (30d)</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold">150ms</p>
                                <p className="text-muted-foreground">Avg. API Response</p>
                            </div>
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

export default AdminAnalytics;