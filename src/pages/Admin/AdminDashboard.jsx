import React from 'react';
import { Helmet } from 'react-helmet';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, DollarSign, FileText, Shield, Activity, BarChart2, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = ({ setMobileSidebarOpen }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const stats = [
    { title: 'Total Users', value: '1,250', icon: Users, change: '+12%', changeType: 'positive' },
    { title: 'Total Revenue', value: '$45,231.89', icon: DollarSign, change: '+20.1%', changeType: 'positive' },
    { title: 'Documents for Review', value: '32', icon: FileText, change: '+5', changeType: 'warning' },
    { title: 'Trust Score Average', value: '78', icon: Shield, change: '-1.2%', changeType: 'negative' },
  ];

  const recentActivities = [
    { id: 1, text: "New user 'Ahmad' registered as Founder.", time: '5m ago', type: 'user' },
    { id: 2, text: "Investor 'Fatima' viewed 'InnovateAI' data room.", time: '15m ago', type: 'activity' },
    { id: 3, text: "AI flagged a document from user 'john.doe@example.com'.", time: '1h ago', type: 'alert' },
    { id: 4, text: "Subscription payment of $99 received from 'EcoSolutions'.", time: '3h ago', type: 'revenue' },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user': return <Users className="w-4 h-4 text-blue-500" />;
      case 'activity': return <Activity className="w-4 h-4 text-green-500" />;
      case 'alert': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'revenue': return <DollarSign className="w-4 h-4 text-yellow-500" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - SharkVest</title>
      </Helmet>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1">
          <Header setMobileSidebarOpen={setMobileSidebarOpen} />
          <main className="p-4 sm:p-6 space-y-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="glass-effect">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className={`text-xs ${stat.changeType === 'positive' ? 'text-green-500' : stat.changeType === 'negative' ? 'text-red-500' : 'text-yellow-500'}`}>
                      {stat.change} from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 glass-effect">
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>An overview of the latest platform events.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map(activity => (
                      <div key={activity.id} className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="p-2 bg-secondary rounded-full">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{activity.text}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Manage key areas of the platform.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <Button variant="outline" onClick={() => navigate('/admin/users')}>Manage Users</Button>
                  <Button variant="outline" onClick={() => navigate('/admin/content')}>Content Control</Button>
                  <Button variant="outline" onClick={() => navigate('/admin/analytics')}>View Analytics</Button>
                  <Button variant="outline" onClick={() => navigate('/admin/security')}>Security Settings</Button>
                  <Button variant="outline" onClick={() => navigate('/admin/subscription-plans')}>Plans</Button>
                  <Button variant="outline" onClick={() => navigate('/admin/support')}>Support Tickets</Button>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;