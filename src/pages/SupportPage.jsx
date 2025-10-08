import React from 'react';
import { Helmet } from 'react-helmet';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { LifeBuoy, Search, PlusCircle, ChevronRight } from 'lucide-react';

const SupportPage = () => {
  const { t } = useLanguage();

  const faq = [
    { q: "How do I improve my Trust Score?", a: "You can improve your Trust Score by completing your profile, verifying your identity, and uploading all required business documents." },
    { q: "How does AI matching work?", a: "Our AI analyzes your startup's data and compares it against investor preferences to find the most relevant matches." },
    { q: "Can I cancel my subscription?", a: "Yes, you can manage your subscription from the Settings page at any time." },
  ];

  const tickets = [
    { id: '#78342', title: 'Problem with document upload', status: 'Open', updated: '2h ago' },
    { id: '#78339', title: 'Question about billing', status: 'Closed', updated: '1d ago' },
    { id: '#78335', title: 'AI Co-Pilot feature request', status: 'In Progress', updated: '3d ago' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'bg-green-500';
      case 'In Progress': return 'bg-yellow-500';
      case 'Closed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('support')} - SharkVest</title>
      </Helmet>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
              <LifeBuoy className="w-10 h-10 text-blue-400" />
              <div>
                <h1 className="text-3xl font-bold">Support Center</h1>
                <p className="text-gray-400">How can we help you today?</p>
              </div>
            </div>

            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search for help articles..." className="pl-10 h-12 text-lg" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {faq.map((item, index) => (
                        <li key={index} className="border-b border-border pb-4">
                          <h3 className="font-semibold">{item.q}</h3>
                          <p className="text-sm text-gray-300 mt-1">{item.a}</p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle>Submit a New Ticket</CardTitle>
                    <CardDescription>Can't find an answer? Our team is here to help.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input placeholder="Subject" />
                    <Textarea placeholder="Please describe your issue in detail..." rows={5} />
                    <Button className="w-full ai-gradient">
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Submit Ticket
                    </Button>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle>My Support Tickets</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {tickets.map(ticket => (
                        <li key={ticket.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800/50 cursor-pointer">
                          <div>
                            <p className="font-semibold">{ticket.title}</p>
                            <p className="text-xs text-gray-400">{ticket.id} • Updated {ticket.updated}</p>
                          </div>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Badge className={`${getStatusColor(ticket.status)} text-white`}>{ticket.status}</Badge>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </div>
                        </li>
                      ))}
                    </ul>
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

export default SupportPage;