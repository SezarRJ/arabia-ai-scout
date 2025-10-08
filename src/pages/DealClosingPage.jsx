import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { PartyPopper, FileText, CreditCard, Share2, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const DealClosingPage = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { startup, amount } = location.state || { startup: { name: 'a Startup' }, amount: 500000 };

  const successFeeRate = 0.02; // 2%
  const successFee = amount * successFeeRate;

  const handlePayment = () => {
    toast({
      title: "Redirecting to Payment...",
      description: "You will be redirected to Stripe to complete the payment.",
    });
  };

  const handleShare = () => {
    toast({
      title: "Success Story Shared!",
      description: "Thank you for sharing! Our team will be in touch to create a case study.",
    });
  };

  return (
    <>
      <Helmet>
        <title>Deal Closed! - SharkVest</title>
      </Helmet>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6 flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-4xl"
            >
              <Card className="glass-effect text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-400 to-cyan-500 rounded-full flex items-center justify-center mb-4">
                    <PartyPopper className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-bold">Congratulations!</CardTitle>
                  <CardDescription className="text-lg text-gray-300">
                    You have successfully closed your deal with {startup.name}.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <Card className="bg-gray-800/50">
                    <CardHeader>
                      <CardTitle className="flex items-center"><FileText className="w-5 h-5 mr-2 text-blue-400"/> Success Fee Invoice</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between"><span>Deal Amount:</span> <span className="font-mono">${amount.toLocaleString()}</span></div>
                      <div className="flex justify-between"><span>Success Fee (2%):</span> <span className="font-mono">${successFee.toLocaleString()}</span></div>
                      <div className="border-t border-gray-700 my-2"></div>
                      <div className="flex justify-between font-bold text-lg"><span>Total Due:</span> <span className="font-mono">${successFee.toLocaleString()}</span></div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full"><Download className="w-4 h-4 mr-2"/> Download Invoice</Button>
                    </CardFooter>
                  </Card>
                  <Card className="bg-gray-800/50">
                    <CardHeader>
                      <CardTitle className="flex items-center"><CreditCard className="w-5 h-5 mr-2 text-green-400"/> Payment Instructions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-400">Please complete the payment for the success fee to finalize the process. You can pay securely via Stripe.</p>
                      <Button className="w-full" onClick={handlePayment}>Pay with Stripe</Button>
                      <p className="text-xs text-center text-gray-500">For bank transfer details, please contact support.</p>
                    </CardContent>
                  </Card>
                </CardContent>
                <CardFooter className="flex-col items-center space-y-4 pt-6">
                  <p className="text-gray-400">Want to inspire others?</p>
                  <Button variant="secondary" onClick={handleShare}>
                    <Share2 className="w-4 h-4 mr-2"/> Share Your Success Story
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </main>
        </div>
      </div>
    </>
  );
};

export default DealClosingPage;