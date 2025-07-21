import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

// Dashboard Components
import { SentimentOverview } from '@/components/dashboard/SentimentOverview';
import { LiveSentimentFeed } from '@/components/dashboard/LiveSentimentFeed';
import { SentimentTrendChart } from '@/components/dashboard/SentimentTrendChart';
import { AgentPerformancePanel } from '@/components/dashboard/AgentPerformancePanel';
import { FrustrationHeatmap } from '@/components/dashboard/FrustrationHeatmap';
import { AlertNotifications } from '@/components/dashboard/AlertNotifications';
import { TriagePanel } from '@/components/dashboard/TriagePanel';
import { AboutSection } from '@/components/dashboard/AboutSection';
import { ContactSection } from '@/components/dashboard/ContactSection';
import { LiveAlertBanner } from '@/components/dashboard/LiveAlertBanner';

// Icons
import { 
  Shield, 
  LogOut, 
  Bell, 
  Settings, 
  BarChart3, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  MessageSquare,
  Info,
  Mail,
  Activity,
  Clock
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out"
    });
  };

  const tabConfig = [
    { value: 'overview', label: 'Overview', icon: BarChart3 },
    { value: 'live-feed', label: 'Live Feed', icon: Activity },
    { value: 'trends', label: 'Trends', icon: TrendingUp },
    { value: 'agents', label: 'Agents', icon: Users },
    { value: 'heatmap', label: 'Heatmap', icon: AlertTriangle },
    { value: 'alerts', label: 'Alerts', icon: Bell },
    { value: 'triage', label: 'Triage', icon: MessageSquare },
    { value: 'about', label: 'About', icon: Info },
    { value: 'contact', label: 'Contact', icon: Mail }
  ];

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <header className="bg-gradient-card border-b border-border shadow-colored sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-primary rounded-xl shadow-glow transform hover:scale-105 transition-transform duration-200">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  SentinelCX
                </h1>
                <p className="text-xs text-muted-foreground">Sentiment Intelligence Dashboard</p>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm bg-sentiment-positive-light px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 bg-sentiment-positive rounded-full animate-pulse shadow-sm"></div>
                <span className="text-sentiment-positive font-medium">System Online</span>
              </div>
              <div className="flex items-center gap-2 text-sm bg-surface px-3 py-1.5 rounded-full border border-border">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-foreground">Last update: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="hidden sm:flex bg-gradient-secondary text-secondary-foreground border-secondary/20 shadow-sm">
                {user?.role}
              </Badge>
              <div className="flex items-center gap-2 bg-surface px-3 py-2 rounded-xl border border-border shadow-soft">
                <Avatar className="h-8 w-8 shadow-medium">
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold text-sm">
                    {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-foreground">{user?.name}</p>
                  <p className="text-xs text-accent">{user?.email}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-muted-foreground hover:text-destructive hover:bg-alert-danger-bg transition-colors duration-200"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navigation Tabs */}
          <div className="bg-gradient-card rounded-xl shadow-large p-1.5 overflow-x-auto border border-border">
            <TabsList className="grid w-full grid-cols-9 bg-transparent gap-1">
              {tabConfig.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium transition-all rounded-lg hover:bg-surface-hover data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-colored transform data-[state=active]:scale-105"
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            <TabsContent value="overview" className="space-y-6">
              <SentimentOverview />
            </TabsContent>

            <TabsContent value="live-feed" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <LiveSentimentFeed />
                <AlertNotifications />
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <SentimentTrendChart />
            </TabsContent>

            <TabsContent value="agents" className="space-y-6">
              <AgentPerformancePanel />
            </TabsContent>

            <TabsContent value="heatmap" className="space-y-6">
              <FrustrationHeatmap />
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6">
              <AlertNotifications />
            </TabsContent>

            <TabsContent value="triage" className="space-y-6">
              <TriagePanel />
            </TabsContent>

            <TabsContent value="about" className="space-y-6">
              <AboutSection />
            </TabsContent>

            <TabsContent value="contact" className="space-y-6">
              <ContactSection />
            </TabsContent>
          </div>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-card border-t border-border mt-12 shadow-large">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-gradient-secondary rounded-lg shadow-accent">
                <Shield className="h-4 w-4 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">SentinelCX Dashboard</p>
                <p className="text-xs text-accent">© 2024 Sentiment Intelligence Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="bg-gradient-accent bg-clip-text text-transparent font-medium">Built with ❤️ by Divya Yelmakanne</span>
              <div className="hidden md:flex items-center gap-2 bg-sentiment-positive-light px-3 py-1 rounded-full">
                <div className="w-1.5 h-1.5 bg-sentiment-positive rounded-full animate-pulse"></div>
                <span className="text-sentiment-positive font-medium">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Live Alert Banner */}
      <LiveAlertBanner />
    </div>
  );
};