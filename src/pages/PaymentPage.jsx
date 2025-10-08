import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { CreditCard, Lock } from 'lucide-react';

const PaymentPage = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { plan } = location.state || {};

  if (!plan) {
    // Redirect if no plan is selected
    navigate('/subscriptions');
    return null;
  }

  const handlePayment = (e) => {
    e.preventDefault();
    toast({
      title: "Payment Successful!",
      description: `Your subscription to the ${plan.name} plan is now active.`,
    });
    navigate(`/${plan.userType}-dashboard`);
  };

  return (
    <>
      <Helmet>
        <title>Complete Payment - SharkVest</title>
      </Helmet>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6 flex justify-center items-center">
            <Card className="w-full max-w-2xl glass-effect">
              <CardHeader>
                <CardTitle className="text-2xl">Complete Your Subscription</CardTitle>
                <CardDescription>Securely enter your payment details to activate the {plan.name} plan.</CardDescription>
              </CardHeader>
              <form onSubmit={handlePayment}>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <Card className="bg-gray-800/50">
                      <CardContent className="p-4 flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{plan.name}</p>
                          <p className="text-sm text-gray-400">Billed monthly</p>
                        </div>
                        <p className="text-2xl font-bold">{plan.price}/month</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="card-name">Name on Card</Label>
                    <Input id="card-name" placeholder="e.g., Khalid Al-Saud" required />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <Input id="card-number" placeholder="•••• •••• •••• ••••" className="pl-10" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiry-date">Expiry Date</Label>
                    <Input id="expiry-date" placeholder="MM / YY" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="•••" required />
                  </div>
                </CardContent>
                <CardFooter className="flex-col items-stretch space-y-4">
                  <Button type="submit" className="w-full ai-gradient">
                    <Lock className="w-4 h-4 mr-2" />
                    Pay {plan.price}
                  </Button>
                  <p className="text-xs text-center text-gray-400">
                    Your payment is securely processed by Stripe. By clicking "Pay", you agree to our Terms of Service.
                  </p>
                </CardFooter>
              </form>
            </Card>
          </main>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;