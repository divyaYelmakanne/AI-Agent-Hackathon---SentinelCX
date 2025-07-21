import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { TrendingUp, TrendingDown, User, Award, MessageCircle } from 'lucide-react';

interface AgentStats {
  id: string;
  name: string;
  avatar: string;
  sentimentScore: number;
  positiveRate: number;
  negativeRate: number;
  totalInteractions: number;
  trend: 'up' | 'down' | 'stable';
  topEmotion: string;
  resolution: number;
}

const mockAgents: AgentStats[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'SC',
    sentimentScore: 92,
    positiveRate: 78,
    negativeRate: 12,
    totalInteractions: 247,
    trend: 'up',
    topEmotion: 'satisfaction',
    resolution: 96
  },
  {
    id: '2',
    name: 'Mike Johnson',
    avatar: 'MJ',
    sentimentScore: 88,
    positiveRate: 71,
    negativeRate: 18,
    totalInteractions: 189,
    trend: 'up',
    topEmotion: 'relief',
    resolution: 91
  },
  {
    id: '3',
    name: 'Lisa Wang',
    avatar: 'LW',
    sentimentScore: 85,
    positiveRate: 68,
    negativeRate: 22,
    totalInteractions: 203,
    trend: 'stable',
    topEmotion: 'understanding',
    resolution: 89
  },
  {
    id: '4',
    name: 'David Wilson',
    avatar: 'DW',
    sentimentScore: 79,
    positiveRate: 62,
    negativeRate: 28,
    totalInteractions: 156,
    trend: 'down',
    topEmotion: 'frustration',
    resolution: 84
  }
];

export const AgentPerformancePanel: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<AgentStats | null>(null);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-sentiment-positive';
    if (score >= 75) return 'text-sentiment-neutral';
    return 'text-sentiment-negative';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-sentiment-positive" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-sentiment-negative" />;
      default: return <div className="h-4 w-4" />;
    }
  };

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Award className="h-5 w-5 text-primary" />
          Agent Performance Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockAgents.map((agent) => (
          <div 
            key={agent.id} 
            className={`p-4 rounded-lg border transition-all cursor-pointer hover:shadow-soft ${
              selectedAgent?.id === agent.id ? 'ring-2 ring-primary bg-primary/5' : 'bg-card'
            }`}
            onClick={() => setSelectedAgent(selectedAgent?.id === agent.id ? null : agent)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                    {agent.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-foreground">{agent.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MessageCircle className="h-3 w-3" />
                    <span>{agent.totalInteractions} interactions</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getTrendIcon(agent.trend)}
                <span className={`text-xl font-bold ${getScoreColor(agent.sentimentScore)}`}>
                  {agent.sentimentScore}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Positive Rate</span>
                  <span className="text-sentiment-positive font-medium">{agent.positiveRate}%</span>
                </div>
                <Progress value={agent.positiveRate} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Resolution</span>
                  <span className="text-primary font-medium">{agent.resolution}%</span>
                </div>
                <Progress value={agent.resolution} className="h-2" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                Top emotion: {agent.topEmotion}
              </Badge>
              <div className="text-xs text-muted-foreground">
                {agent.negativeRate}% negative interactions
              </div>
            </div>

            {selectedAgent?.id === agent.id && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <h5 className="font-medium text-foreground">Recent Feedback</h5>
                    <div className="space-y-1 text-muted-foreground">
                      <p>• Excellent empathy in difficult situations</p>
                      <p>• Quick response times</p>
                      <p>• Clear communication style</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium text-foreground">Improvement Areas</h5>
                    <div className="space-y-1 text-muted-foreground">
                      <p>• Technical issue escalation</p>
                      <p>• Follow-up consistency</p>
                      <p>• Product knowledge depth</p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline">View Details</Button>
                  <Button size="sm" variant="outline">Send Feedback</Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};