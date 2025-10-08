import React from 'react';
import { Helmet } from 'react-helmet';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ShoppingCart, BarChart2, Calendar } from 'lucide-react';

const EcosystemPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleNotify = (featureName) => {
    toast({ title: `Coming Soon: ${featureName}`, description: `We'll notify you when it's available!` });
  };
  
  const futureFeatures = [
      {
          name: "Service Provider Marketplace",
          description: "Find and hire vetted legal, accounting, and consulting partners directly on the platform.",
          icon: ShoppingCart,
          eta: "Q1 2026"
      },
      {
          name: "Advanced Analytics Dashboard",
          description: "AI-powered metrics for deal flow, engagement, and investment insights with industry benchmarks.",
          icon: BarChart2,
          eta: "Q2 2026"
      },
      {
          name: "Events Hub",
          description: "Join exclusive startup pitch events, workshops, and investor webinars to expand your network.",
          icon: Calendar,
          eta: "Q3 2026"
      },
  ];

  return (
    <>
      <Helmet>
        <title>{t('ecosystem')} Expansion - Tamweel</title>
      </Helmet>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <h1 className="text-3xl font-bold mb-2">{t('ecosystem')} Expansion & Scale</h1>
            <p className="text-gray-400 mb-6">A glimpse into the future of Tamweel. The following features are on our roadmap.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {futureFeatures.map(feature => (
                    <Card key={feature.name} className="glass-effect card-hover">
                        <CardHeader>
                            <div className="w-12 h-12 rounded-lg ai-gradient flex items-center justify-center mb-4">
                                <feature.icon className="w-6 h-6 text-white" />
                            </div>
                            <CardTitle>{feature.name}</CardTitle>
                            <CardDescription>Expected: {feature.eta}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <p className="text-sm text-gray-300">{feature.description}</p>
                           <Button className="w-full" variant="outline" onClick={() => handleNotify(feature.name)}>
                               Notify Me
                           </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default EcosystemPage;