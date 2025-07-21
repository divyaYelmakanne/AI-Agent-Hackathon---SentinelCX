import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { TrendingUp, TrendingDown, Users, MessageSquare, Clock, Award } from 'lucide-react';

const sentimentData = [
  { name: 'Positive', value: 45, color: 'hsl(var(--sentiment-positive))' },
  { name: 'Neutral', value: 30, color: 'hsl(var(--sentiment-neutral))' },
  { name: 'Negative', value: 20, color: 'hsl(var(--sentiment-negative))' },
  { name: 'Mixed', value: 5, color: 'hsl(var(--sentiment-mixed))' }
];

const channelData = [
  { channel: 'Email', positive: 42, negative: 18, neutral: 35, mixed: 5 },
  { channel: 'Chat', positive: 48, negative: 22, neutral: 25, mixed: 5 },
  { channel: 'Tickets', positive: 45, negative: 20, neutral: 30, mixed: 5 }
];

const metrics = [
  {
    title: 'Total Interactions',
    value: '1,247',
    change: '+12%',
    trend: 'up',
    icon: MessageSquare,
    description: 'Last 24 hours'
  },
  {
    title: 'Avg Response Time',
    value: '2.3h',
    change: '-15%',
    trend: 'up',
    icon: Clock,
    description: 'Improved efficiency'
  },
  {
    title: 'Active Agents',
    value: '23',
    change: '+2',
    trend: 'up',
    icon: Users,
    description: 'Currently online'
  },
  {
    title: 'Satisfaction Score',
    value: '4.2/5',
    change: '+0.3',
    trend: 'up',
    icon: Award,
    description: 'Customer rating'
  }
];

export const SentimentOverview: React.FC = () => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-medium">
          <p className="font-medium text-foreground">{payload[0].name}</p>
          <p className="text-sm" style={{ color: payload[0].color }}>
            {`${payload[0].value}% (${Math.round((payload[0].value / 100) * 1247)} interactions)`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Key Metrics */}
      <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.title} className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {metric.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3 text-sentiment-positive" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-sentiment-negative" />
                    )}
                    <span className={`text-xs ${
                      metric.trend === 'up' ? 'text-sentiment-positive' : 'text-sentiment-negative'
                    }`}>
                      {metric.change}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {metric.description}
                    </span>
                  </div>
                </div>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <metric.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sentiment Distribution */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-lg">Overall Sentiment Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {sentimentData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-muted-foreground">
                  {item.name}: {item.value}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Channel Performance */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-lg">Channel Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelData}>
                <XAxis dataKey="channel" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="positive" fill="hsl(var(--sentiment-positive))" />
                <Bar dataKey="negative" fill="hsl(var(--sentiment-negative))" />
                <Bar dataKey="neutral" fill="hsl(var(--sentiment-neutral))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Quick Insights */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-lg">Quick Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Email Satisfaction</span>
              <span className="font-medium">85%</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Chat Resolution Rate</span>
              <span className="font-medium">92%</span>
            </div>
            <Progress value={92} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Ticket First Contact</span>
              <span className="font-medium">78%</span>
            </div>
            <Progress value={78} className="h-2" />
          </div>

          <div className="pt-2 border-t border-border">
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  Peak Hours
                </Badge>
                <span className="text-sm text-muted-foreground">2-4 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  Top Agent
                </Badge>
                <span className="text-sm text-muted-foreground">Sarah Chen (96%)</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  Critical Alerts
                </Badge>
                <span className="text-sm text-sentiment-negative">2 active</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};