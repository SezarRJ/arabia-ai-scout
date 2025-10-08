import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Users, FileText, Check, X } from 'lucide-react';

const NotificationsPage = ({ setMobileSidebarOpen }) => {
  const { t } = useLanguage();

  const notifications = [
    { id: 1, type: 'message', icon: MessageSquare, text: 'Khalid Al-Saud sent you a new message.', time: '15m ago', read: false, category: 'all' },
    { id: 2, type: 'match', icon: Users, text: 'You have a new investor match: VC Ventures.', time: '1h ago', read: false, category: 'all' },
    { id: 3, type: 'document', icon: FileText, text: 'Your Pitch Deck has been viewed by an investor.', time: '3h ago', read: true, category: 'all' },
    { id: 4, type: 'approval', icon: Check, text: 'Your KYC documents have been approved.', time: '1d ago', read: true, category: 'all' },
    { id: 5, type: 'message', icon: MessageSquare, text: 'Fatima Consulting replied to your inquiry.', time: '2d ago', read: true, category: 'all' },
    { id: 6, type: 'match', icon: Users, text: 'New startup in your preferred sector: FinTech Innovations.', time: '3d ago', read: true, category: 'investor' },
    { id: 7, type: 'action', icon: X, text: 'Your request for access to "Project X" was denied.', time: '4d ago', read: false, category: 'all' },
  ];

  const getIconColor = (type) => {
    switch (type) {
      case 'message': return 'text-blue-400';
      case 'match': return 'text-purple-400';
      case 'document': return 'text-green-400';
      case 'approval': return 'text-teal-400';
      case 'action': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('notifications')} - SharkVest</title>
      </Helmet>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header setMobileSidebarOpen={setMobileSidebarOpen} />
          <main className="p-6 flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">{t('notifications')}</h1>
              <Button variant="outline">Mark all as read</Button>
            </div>

            <Card className="glass-effect">
              <CardContent className="p-0">
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                    <TabsTrigger value="all" className="px-4 py-3">All</TabsTrigger>
                    <TabsTrigger value="unread" className="px-4 py-3">Unread</TabsTrigger>
                    <TabsTrigger value="mentions" className="px-4 py-3">Mentions</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="p-6 space-y-4">
                    {notifications.map(notification => (
                      <div key={notification.id} className={`flex items-start space-x-4 rtl:space-x-reverse p-4 rounded-lg ${!notification.read ? 'bg-gray-800/50' : ''}`}>
                        <div className={`p-2 rounded-full ${getIconColor(notification.type)} bg-gray-700/50`}>
                          <notification.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p>{notification.text}</p>
                          <p className="text-sm text-gray-400">{notification.time}</p>
                        </div>
                        {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full self-center"></div>}
                      </div>
                    ))}
                  </TabsContent>
                  <TabsContent value="unread" className="p-6">
                    <p className="text-center text-gray-400">No unread notifications.</p>
                  </TabsContent>
                   <TabsContent value="mentions" className="p-6">
                    <p className="text-center text-gray-400">No new mentions.</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </>
  );
};

export default NotificationsPage;