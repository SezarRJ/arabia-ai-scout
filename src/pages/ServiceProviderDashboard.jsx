import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Briefcase,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  MessageSquare,
  Activity
} from 'lucide-react';

const ServiceProviderDashboard = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleFeatureClick = (featureName) => {
    toast({
      title: t('notImplementedYet'),
      description: `${featureName} feature coming soon!`,
    });
  };

  const metrics = [
    {
      title: 'Active Clients',
      value: '15',
      icon: Users,
      color: 'text-blue-400'
    },
    {
      title: 'Pending Requests',
      value: '4',
      icon: Clock,
      color: 'text-yellow-400'
    },
    {
      title: 'Completed Jobs',
      value: '52',
      icon: CheckCircle,
      color: 'text-green-400'
    },
    {
      title: 'Total Revenue',
      value: '$45,000',
      icon: DollarSign,
      color: 'text-purple-400'
    },
  ];

  const activeClients = [
    { name: 'TechFlow Solutions', service: 'Legal Advisory', progress: 75, logo: 'TF' },
    { name: 'GreenEnergy Co', service: 'Financial Modeling', progress: 40, logo: 'GE' },
    { name: 'AI Robotics Ltd', service: 'Technical Consulting', progress: 90, logo: 'AR' },
  ];

  const pendingRequests = [
    { from: 'HealthTech Innovations', request: 'Service Quote Request', time: '3h ago' },
    { from: 'EcoSmart Solutions', request: 'Initial Consultation', time: '1 day ago' },
  ];

  return (
    <>
      <Helmet>
        <title>Service Provider Dashboard - Tamweel</title>
        <meta name="description" content="Manage your services, connect with clients, and grow your business." />
      </Helmet>

      <div className="min-h-screen flex">
        <Sidebar />
        
        <div className="flex-1">
          <Header />
          
          <main className="p-6 space-y-6">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user?.firstName}! 🤝
              </h1>
              <p className="text-gray-400">
                Manage your services and connect with the ecosystem.
              </p>
            </motion.div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass-effect">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
                        <metric.icon className={`w-4 h-4 mr-2 ${metric.color}`} />
                        {metric.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{metric.value}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <Card className="glass-effect">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>{t('verifiedServicesBadge')}</span>
                  </CardTitle>
                  <CardDescription>
                    Your services are verified and trusted by the Tamweel network.
                  </CardDescription>
                </div>
                <Badge variant="success" className="text-lg px-4 py-2">Verified</Badge>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Active Clients */}
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Activity className="w-5 h-5 text-blue-400" />
                    <span>{t('activeClients')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeClients.map((client, index) => (
                    <div key={index} className="p-4 rounded-lg bg-gray-800/50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                           <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
                                {client.logo}
                              </AvatarFallback>
                            </Avatar>
                          <div>
                            <h4 className="font-semibold">{client.name}</h4>
                            <p className="text-sm text-gray-400">{client.service}</p>
                          </div>
                        </div>
                        <Button size="sm" onClick={() => handleFeatureClick('View Client')}>View</Button>
                      </div>
                      <div className="h-2 w-full bg-gray-700 rounded-full">
                        <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${client.progress}%` }}></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Pending Requests */}
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Clock className="w-5 h-5 text-yellow-400" />
                    <span>{t('pendingRequests')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingRequests.map((request, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                      <div>
                        <p className="font-medium">From: {request.from}</p>
                        <p className="text-sm text-gray-400">{request.request}</p>
                        <p className="text-xs text-gray-500">{request.time}</p>
                      </div>
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <Button size="sm" variant="outline" onClick={() => handleFeatureClick('Reject Request')}>Reject</Button>
                        <Button size="sm" onClick={() => handleFeatureClick('Respond Request')}>Respond</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* My Offers */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Briefcase className="w-5 h-5 text-purple-400" />
                  <span>My Service Offers</span>
                </CardTitle>
                <CardDescription>
                  Manage the services you offer on the platform.
                </CardDescription>
              </CardHeader>
              <CardContent>
                 <Button onClick={() => handleFeatureClick('Manage Offers')}>
                  Manage Offers
                 </Button>
              </CardContent>
            </Card>

          </main>
        </div>
      </div>
    </>
  );
};

export default ServiceProviderDashboard;