import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { Shield, Mail, Lock, User, ArrowLeft, Briefcase, Loader2, Globe, MapPin } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const RegisterPage = () => {
  const { t, language, changeLanguage, languages } = useLanguage();
  const { signUp, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
    country: '',
    city: '',
  });

  useEffect(() => {
    if (location.state?.userType) {
      setFormData(prev => ({ ...prev, userType: location.state.userType }));
    }
  }, [location.state]);

  useEffect(() => {
    if (user) {
      const userRole = user.user_metadata?.role || 'founder';
      if (userRole === 'admin') {
        navigate('/admin');
      } else {
        navigate(`/${userRole}-dashboard`);
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!termsAccepted) {
      toast({
        title: t('error'),
        description: t('acceptTermsAndConditions'),
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: t('error'),
        description: t('Passwords do not match.'),
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    const { error } = await signUp(formData.email, formData.password, {
      data: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        role: formData.userType,
        country: formData.country,
        city: formData.city,
      }
    });

    if (!error) {
      toast({
        title: t('success'),
        description: t('welcomeToSharkVest') + `, ${formData.firstName}! ` + t('A confirmation email has been sent.'),
      });
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const currentLanguage = languages.find(lang => lang.value === language);

  return (
    <>
      <Helmet>
        <title>{t('register')} - SharkVest</title>
        <meta name="description" content={t('joinMENAStartupEcosystem')} />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20" />
        
        <div className="absolute top-4 right-4 z-20">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>{currentLanguage?.label}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {languages.map((lang) => (
                <DropdownMenuItem key={lang.value} onSelect={() => changeLanguage(lang.value)}>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md relative z-10"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6 text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
            {t('backToHome')}
          </Button>

          <Card className="glass-effect">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">
                {t('register')}
              </CardTitle>
              <CardDescription>
                {t('joinMENAStartupEcosystem')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('firstName')}</label>
                    <div className="relative">
                      <User className="absolute left-3 rtl:left-auto rtl:right-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="pl-10 rtl:pl-3 rtl:pr-10"
                        placeholder={t('firstName')}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('lastName')}</label>
                    <div className="relative">
                      <User className="absolute left-3 rtl:left-auto rtl:right-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="pl-10 rtl:pl-3 rtl:pr-10"
                        placeholder={t('lastName')}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('email')}</label>
                  <div className="relative">
                    <Mail className="absolute left-3 rtl:left-auto rtl:right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 rtl:pl-3 rtl:pr-10"
                      placeholder={t('enterYourEmail')}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Country</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 rtl:left-auto rtl:right-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="pl-10 rtl:pl-3 rtl:pr-10"
                        placeholder="e.g., UAE"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">City</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 rtl:left-auto rtl:right-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="pl-10 rtl:pl-3 rtl:pr-10"
                        placeholder="e.g., Dubai"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('userType')}</label>
                  <Select value={formData.userType} onValueChange={(value) => handleSelectChange('userType', value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectYourRole')}>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Briefcase className="w-4 h-4" />
                          <span>
                            {formData.userType === 'founder' && t('founder')}
                            {formData.userType === 'investor' && t('investor')}
                            {!formData.userType && t('selectYourRole')}
                          </span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="founder">{t('founder')}</SelectItem>
                      <SelectItem value="investor">{t('investor')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('password')}</label>
                  <div className="relative">
                    <Lock className="absolute left-3 rtl:left-auto rtl:right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10 rtl:pl-3 rtl:pr-10"
                      placeholder={t('createPassword')}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('confirmPassword')}</label>
                  <div className="relative">
                    <Lock className="absolute left-3 rtl:left-auto rtl:right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="pl-10 rtl:pl-3 rtl:pr-10"
                      placeholder={t('confirmPassword')}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" checked={termsAccepted} onCheckedChange={setTermsAccepted} />
                  <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {t('iAcceptThe')} <Link to="/terms" className="underline">{t('termsAndConditions')}</Link>
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full gradient-bg"
                  disabled={loading || !formData.userType || !termsAccepted}
                >
                  {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t('loading')}</> : t('register')}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  {t('alreadyHaveAccount')}{' '}
                  <Link
                    to="/login"
                    className="text-blue-400 hover:text-blue-300 font-medium"
                  >
                    {t('login')}
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default RegisterPage;