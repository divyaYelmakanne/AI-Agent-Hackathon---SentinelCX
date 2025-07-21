import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Brain, TrendingUp, Users, Zap, Globe, Award, Target } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Advanced sentiment analysis using machine learning algorithms to detect emotions, sarcasm, and context in customer communications.'
  },
  {
    icon: TrendingUp,
    title: 'Real-Time Monitoring',
    description: 'Live tracking of sentiment trends across all support channels with instant alerts for negative spikes and anomalies.'
  },
  {
    icon: Users,
    title: 'Agent Performance',
    description: 'Comprehensive insights into agent effectiveness with personalized recommendations for improvement and training.'
  },
  {
    icon: Zap,
    title: 'Auto-Triage System',
    description: 'Intelligent prioritization of support tickets based on sentiment analysis, urgency, and customer value.'
  },
  {
    icon: Globe,
    title: 'Multi-Channel Support',
    description: 'Unified monitoring across email, live chat, tickets, and social media platforms in a single dashboard.'
  },
  {
    icon: Target,
    title: 'Predictive Analytics',
    description: 'Forecast customer satisfaction trends and identify potential issues before they escalate.'
  }
];

const stats = [
  { label: 'Accuracy Rate', value: '94.5%', description: 'Sentiment detection accuracy' },
  { label: 'Response Time', value: '2.3sec', description: 'Average analysis speed' },
  { label: 'Customer Satisfaction', value: '+18%', description: 'Improvement with SentinelCX' },
  { label: 'Issue Prevention', value: '67%', description: 'Early intervention success' }
];

export const AboutSection: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="shadow-medium bg-gradient-primary text-primary-foreground">
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-white/20 rounded-full">
              <Shield className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">SentinelCX</h1>
              <p className="text-lg opacity-90">Interactive Sentiment Intelligence Dashboard</p>
            </div>
          </div>
          <p className="text-lg leading-relaxed opacity-95">
            Transform your customer support with AI-powered sentiment analysis. SentinelCX provides real-time emotional intelligence 
            across all support channels, helping teams detect issues early, improve agent performance, and enhance customer satisfaction.
          </p>
        </CardContent>
      </Card>

      {/* Problem & Solution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-xl text-sentiment-negative">The Problem</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Customer support teams often fail to detect early signs of rising frustration or satisfaction across 
              scattered communication channels. This leads to:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-sentiment-negative rounded-full mt-2"></div>
                Delayed interventions for escalating issues
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-sentiment-negative rounded-full mt-2"></div>
                Poor customer experience and lower retention
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-sentiment-negative rounded-full mt-2"></div>
                Lack of real-time emotional insight
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-sentiment-negative rounded-full mt-2"></div>
                Inconsistent agent performance monitoring
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-xl text-sentiment-positive">Our Solution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              SentinelCX is an AI-powered watchdog that continuously monitors support interactions, 
              providing comprehensive emotional intelligence:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-sentiment-positive rounded-full mt-2"></div>
                Real-time sentiment analysis across all channels
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-sentiment-positive rounded-full mt-2"></div>
                Intelligent alerts for emotional spikes
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-sentiment-positive rounded-full mt-2"></div>
                Agent performance insights and recommendations
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-sentiment-positive rounded-full mt-2"></div>
                Automated triage and prioritization
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Key Features */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-xl">Key Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Stats */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Performance Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="font-medium text-foreground mb-1">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technology Stack */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-xl">Technology Stack</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Frontend</h4>
              <div className="space-y-1">
                <Badge variant="outline">React</Badge>
                <Badge variant="outline">TypeScript</Badge>
                <Badge variant="outline">Tailwind CSS</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Analytics</h4>
              <div className="space-y-1">
                <Badge variant="outline">Recharts</Badge>
                <Badge variant="outline">D3.js</Badge>
                <Badge variant="outline">Chart.js</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">AI/ML</h4>
              <div className="space-y-1">
                <Badge variant="outline">VADER</Badge>
                <Badge variant="outline">TextBlob</Badge>
                <Badge variant="outline">HuggingFace</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Storage</h4>
              <div className="space-y-1">
                <Badge variant="outline">JSON</Badge>
                <Badge variant="outline">CSV</Badge>
                <Badge variant="outline">SQLite</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Design Philosophy */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-xl">Design Philosophy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Modular</h4>
              <p className="text-sm text-muted-foreground">
                Each feature runs independently and updates without needing full-page reloads.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Live-Responsive</h4>
              <p className="text-sm text-muted-foreground">
                Every panel reflects real-time data as it arrives from support channels.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">User-Centric</h4>
              <p className="text-sm text-muted-foreground">
                Designed for CX managers to take immediate action based on sentiment signals.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};