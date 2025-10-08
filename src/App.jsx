import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/SupabaseAuthContext';
import BottomNav from '@/components/Layout/BottomNav';
import MobileSidebar from '@/components/Layout/MobileSidebar';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import FounderDashboard from '@/pages/FounderDashboard';
import InvestorDashboard from '@/pages/InvestorDashboard';
import ProfilePage from '@/pages/ProfilePage';
import MatchesPage from '@/pages/MatchesPage';
import DataRoomPage from '@/pages/DataRoomPage';
import MessagesPage from '@/pages/MessagesPage';
import AICopilotPage from '@/pages/AICopilotPage';
import AIAdvisoryPage from '@/pages/AIAdvisoryPage';
import SettingsPage from '@/pages/SettingsPage';
import SubscriptionPage from '@/pages/SubscriptionPage';
import IntegrationsPage from '@/pages/IntegrationsPage';
import NotificationsPage from '@/pages/NotificationsPage';
import SupportPage from '@/pages/SupportPage';
import VirtualPitchEventsPage from '@/pages/VirtualPitchEventsPage';
import ImproveScorePage from '@/pages/ImproveScorePage';
import PaymentPage from '@/pages/PaymentPage';
import DealClosingPage from '@/pages/DealClosingPage';
import TermSheetPage from '@/pages/TermSheetPage';
import ProjectOnboardingPage from '@/pages/ProjectOnboardingPage';
import TrustHubPage from '@/pages/TrustHubPage';
import AdminDashboard from '@/pages/Admin/AdminDashboard';
import AdminUserManagement from '@/pages/Admin/AdminUserManagement';
import AdminAnalytics from '@/pages/Admin/AdminAnalytics';
import AdminContentControl from '@/pages/Admin/AdminContentControl';
import AdminSecurity from '@/pages/Admin/AdminSecurity';
import AdminConfiguration from '@/pages/Admin/AdminConfiguration';
import AdminFinancials from '@/pages/Admin/AdminFinancials';
import AdminIntegrations from '@/pages/Admin/AdminIntegrations';
import AdminSupport from '@/pages/Admin/AdminSupport';
import AdminCampaigns from '@/pages/Admin/AdminCampaigns';
import AdminAppSettings from '@/pages/Admin/AdminAppSettings';
import AdminSubscriptionPlans from '@/pages/Admin/AdminSubscriptionPlans';
import AdminAIModels from '@/pages/Admin/AdminAIModels';
import AdminLanguages from '@/pages/Admin/AdminLanguages';
import AdminRoles from '@/pages/Admin/AdminRoles';
import AdminThemeEditor from '@/pages/Admin/AdminThemeEditor';
import AdminEventManagement from '@/pages/Admin/AdminEventManagement';
import AdminDataRoomAudit from '@/pages/Admin/AdminDataRoomAudit';
import AdminReportGeneration from '@/pages/Admin/AdminReportGeneration';
import ApplicationControlPage from '@/pages/ApplicationControlPage';

const AppContent = () => {
  const location = useLocation();
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const showBottomNav = !['/', '/login', '/register'].includes(location.pathname) && !location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>SharkVest - Trust & Intelligence Infrastructure for MENA Startups</title>
        <meta name="description" content="SharkVest connects startups and investors through verified identity, AI-powered advisory, and intelligent deal matching in the MENA region." />
      </Helmet>
      
      <MobileSidebar isOpen={isMobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />

      <div className={showBottomNav ? 'pb-16 lg:pb-0' : ''}>
        <Routes>
          <Route path="/" element={<LandingPage setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/founder-dashboard" element={<FounderDashboard setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/investor-dashboard" element={<InvestorDashboard setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/profile" element={<ProfilePage setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/matches" element={<MatchesPage setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/data-room" element={<DataRoomPage setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/messages" element={<MessagesPage setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/ai-copilot" element={<AICopilotPage setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/ai-advisory" element={<AIAdvisoryPage setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/settings" element={<SettingsPage setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/subscriptions" element={<SubscriptionPage setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/integrations" element={<IntegrationsPage setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/notifications" element={<NotificationsPage setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/support" element={<SupportPage setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/virtual-pitch-events" element={<VirtualPitchEventsPage setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/improve-score" element={<ImproveScorePage setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/payment" element={<PaymentPage setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/deal-closing" element={<DealClosingPage setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/term-sheet" element={<TermSheetPage setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/project-onboarding" element={<ProjectOnboardingPage setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/trust-hub" element={<TrustHubPage setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/application-control" element={<ApplicationControlPage setMobileSidebarOpen={setMobileSidebarOpen} />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/admin/users" element={<AdminUserManagement setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/admin/roles" element={<AdminRoles setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/admin/analytics" element={<AdminAnalytics setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/admin/content" element={<AdminContentControl setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/admin/events" element={<AdminEventManagement setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/admin/dataroom-audit" element={<AdminDataRoomAudit setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/admin/reports" element={<AdminReportGeneration setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/admin/security" element={<AdminSecurity setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/admin/configuration" element={<AdminConfiguration setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/admin/financials" element={<AdminFinancials setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/admin/integrations" element={<AdminIntegrations setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/admin/support" element={<AdminSupport setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/admin/campaigns" element={<AdminCampaigns setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/admin/app-settings" element={<AdminAppSettings setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/admin/subscription-plans" element={<AdminSubscriptionPlans setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/admin/ai-models" element={<AdminAIModels setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/admin/languages" element={<AdminLanguages setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="/admin/theme" element={<AdminThemeEditor setMobileSidebarOpen={setMobileSidebarOpen} />} />
        </Routes>
      </div>
      
      {showBottomNav && <BottomNav />}
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;