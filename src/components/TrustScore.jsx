import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, CheckCircle, AlertCircle, ArrowUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast'; // Import useToast

const TrustScore = ({ score, profileComplete, verified, className }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast(); // Initialize useToast
  const userRole = user?.user_metadata?.role;

  const getTrustLevel = (currentScore, role) => {
    if (role === 'founder') {
      if (currentScore >= 81) return { level: 'Investor-Ready', color: 'blue', icon: CheckCircle };
      if (currentScore >= 51) return { level: 'Explorer', color: 'green', icon: CheckCircle };
      return { level: 'Starter', color: 'yellow', icon: AlertCircle };
    } else if (role === 'investor') {
      if (currentScore >= 81) return { level: 'Verified Investor', color: 'blue', icon: CheckCircle };
      if (currentScore >= 51) return { level: 'Active Investor', color: 'green', icon: CheckCircle };
      return { level: 'Basic Investor', color: 'yellow', icon: AlertCircle };
    }
    return { level: 'Low', color: 'destructive', icon: AlertCircle };
  };

  const trustLevel = getTrustLevel(score, userRole);
  const TrustIcon = trustLevel.icon;

  const handleImproveScore = () => {
    toast({
      title: "Feature Coming Soon!",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
    // navigate('/improve-score'); // Uncomment when page is ready
  };

  return (
    <Card className={`trust-score-gradient ${className} flex flex-col`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-foreground">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Shield className="w-5 h-5" />
            <span>{t('trustScore')}</span>
          </div>
          <Badge variant={trustLevel.color} className="text-white">
            <TrustIcon className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
            {trustLevel.level}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex-grow">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="text-4xl font-bold text-foreground mb-2"
          >
            {score}
          </motion.div>
          <div className="text-foreground/80 text-sm">out of 100</div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm text-foreground/80 mb-1">
              <span>Profile Complete</span>
              <span>{profileComplete}%</span>
            </div>
            <Progress value={profileComplete} className="h-2" />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground/80">Verification Status</span>
            <Badge variant={verified ? 'success' : 'warning'} className="text-white">
              {verified ? (
                <>
                  <CheckCircle className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                  Verified
                </>
              ) : (
                <>
                  <AlertCircle className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                  Pending
                </>
              )}
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/80" onClick={handleImproveScore}>
          <ArrowUp className="w-4 h-4 mr-2" />
          Improve Score
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TrustScore;