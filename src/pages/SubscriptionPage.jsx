import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SubscriptionPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubscribe = (plan) => {
    if (plan.price === 'Contact Us') {
      navigate('/support');
    } else {
      navigate('/payment', { state: { plan } });
    }
  };
  
  const founderPlans = [
    {
      name: 'Free',
      price: '$0',
      priceAmount: 0,
      userType: 'founder',
      features: ['Create your profile', 'View blurred investor list', 'See summary scores', '0% success fee commission'],
      gradient: 'from-gray-500 to-gray-600',
    },
    {
      name: 'Pro',
      price: '$49',
      priceYearly: '$499',
      priceAmount: 49,
      userType: 'founder',
      features: ['Full AI reports', 'Upload up to 10 documents', '20 investor invites/month', '1% success fee commission'],
      gradient: 'from-blue-500 to-cyan-400',
    },
    {
      name: 'Premium',
      price: '$99',
      priceYearly: '$999',
      priceAmount: 99,
      userType: 'founder',
      features: ['Unlimited invites & docs', 'Featured "Premium" badge', 'Dedicated success coach', '1% success fee commission'],
      gradient: 'from-purple-500 to-pink-500',
      isFeatured: true,
    }
  ];

  const investorPlans = [
    {
      name: 'Free',
      price: '$0',
      priceAmount: 0,
      userType: 'investor',
      features: ['Create your profile', '5 startup previews/month', 'View summary scores'],
      gradient: 'from-gray-500 to-gray-600',
    },
    {
      name: 'Pro',
      price: '$149',
      priceYearly: '$1499',
      priceAmount: 149,
      userType: 'investor',
      features: ['Unlimited startup browsing', 'Full Data Room access', 'Access to virtual pitch events', 'Full AI-generated reports'],
      gradient: 'from-blue-500 to-cyan-400',
    },
    {
      name: 'Elite',
      price: '$299',
      priceYearly: '$2999',
      priceAmount: 299,
      userType: 'investor',
      features: ['Priority deal flow access', 'White-glove account manager', 'Exclusive events access', 'Due-diligence API access'],
      gradient: 'from-amber-500 to-orange-500',
      isFeatured: true,
    }
  ];

  const plansToShow = user?.userType === 'founder' ? founderPlans : investorPlans;

  return (
    <>
      <Helmet>
        <title>{t('subscriptions')} - SharkVest</title>
      </Helmet>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-2">Find the perfect plan</h1>
              <p className="text-gray-400 mb-8">Unlock your full potential on the SharkVest platform.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {plansToShow.map(plan => (
                <Card key={plan.name} className={cn("glass-effect flex flex-col", plan.isFeatured && "border-purple-500 border-2 shadow-lg shadow-purple-500/20")}>
                  {plan.isFeatured && (
                    <div className="absolute -top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                      <Star className="w-4 h-4 mr-1" /> Most Popular
                    </div>
                  )}
                  <CardHeader className="p-6">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="text-4xl font-bold">
                        {plan.price}
                        {plan.price !== '$0' && <span className="text-base font-normal text-gray-400">/month</span>}
                    </div>
                    {plan.priceYearly && <p className="text-sm text-gray-400">or {plan.priceYearly}/year</p>}
                  </CardHeader>
                  <CardContent className="flex-grow p-6 space-y-4">
                    <ul className="space-y-2">
                        {plan.features.map(feature => (
                            <li key={feature} className="flex items-start">
                                <CheckCircle className="w-5 h-5 text-green-400 mr-2 rtl:mr-0 rtl:ml-2 flex-shrink-0 mt-1" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className={cn("w-full", plan.isFeatured && "ai-gradient")} variant={plan.isFeatured ? 'default' : 'outline'} onClick={() => handleSubscribe(plan)}>
                      {plan.price === '$0' ? 'Get Started' : 'Subscribe Now'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;