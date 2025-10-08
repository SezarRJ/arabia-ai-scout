import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Shield,
  Bot,
  Users,
  FileText,
  Globe,
  Zap,
  Target,
  TrendingUp,
  Lock,
} from 'lucide-react';
import Header from '@/components/Layout/Header';

const LandingPage = ({ setMobileSidebarOpen }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: t('trustScoreSystem'),
      description: t('trustScoreSystemDesc'),
    },
    {
      icon: Bot,
      title: t('aiCoPilot'),
      description: t('aiCoPilotDesc'),
    },
    {
      icon: Users,
      title: t('intelligentMatching'),
      description: t('intelligentMatchingDesc'),
    },
    {
      icon: FileText,
      title: t('smartDataRoom'),
      description: t('smartDataRoomDesc'),
    },
    {
      icon: Globe,
      title: t('menaFocus'),
      description: t('menaFocusDesc'),
    },
    {
      icon: Lock,
      title: t('regulatoryCompliant'),
      description: t('regulatoryCompliantDesc'),
    },
  ];

  const userTypes = [
    {
      title: t('founders'),
      description: t('foundersDesc'),
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500',
      userType: 'founder',
    },
    {
      title: t('investors'),
      description: t('investorsDesc'),
      icon: Target,
      color: 'from-purple-500 to-pink-500',
      userType: 'investor',
    },
  ];

  return (
    <>
      <Helmet>
        <title>{t('welcomeToSharkVest')} - {t('trustIntelligenceInfrastructure')}</title>
        <meta name="description" content={t('connectStartupsInvestors')} />
      </Helmet>

      <div className="min-h-screen">
        <Header setMobileSidebarOpen={setMobileSidebarOpen} />

        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {t('welcomeToSharkVest')}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                {t('trustIntelligenceInfrastructure')}
              </p>
              <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
                {t('connectStartupsInvestors')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => navigate('/register')}
                  className="gradient-bg text-lg px-8 py-4 h-auto"
                >
                  <Zap className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                  {t('getStarted')}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-4 h-auto glass-effect"
                >
                  {t('learnMore')}
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse-slow" />
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse-slow" />
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-cyan-500/10 rounded-full blur-xl animate-pulse-slow" />
        </section>

        {/* User Types Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">{t('whoWeServe')}</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                {t('whoWeServeDesc')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {userTypes.map((type, index) => (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="cursor-pointer"
                  onClick={() => navigate('/register', { state: { userType: type.userType } })}
                >
                  <Card className="h-full card-hover glass-effect">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${type.color} flex items-center justify-center mb-4`}>
                        <type.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{type.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-400">
                        {type.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900/10 to-purple-900/10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">{t('coreFeatures')}</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                {t('coreFeaturesDesc')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full card-hover glass-effect">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center mb-4">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-400">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-4xl font-bold mb-6">{t('readyToTransform')}</h2>
              <p className="text-xl text-gray-400 mb-8">
                {t('readyToTransformDesc')}
              </p>
              <Button
                size="lg"
                onClick={() => navigate('/register')}
                className="gradient-bg text-lg px-12 py-4 h-auto"
              >
                <Shield className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                {t('startBuildingTrust')}
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t glass-effect py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4 md:mb-0">
                <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  SharkVest
                </span>
              </div>
              <p className="text-gray-400 text-center">
                {t('copyright')}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;