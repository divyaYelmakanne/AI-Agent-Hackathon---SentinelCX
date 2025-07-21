import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock, User, MessageCircle, Mail, Phone, AlertCircle, Star } from 'lucide-react';

interface TriageItem {
  id: string;
  customer: string;
  subject: string;
  channel: 'email' | 'chat' | 'ticket';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  sentiment: 'positive' | 'negative' | 'neutral' | 'mixed';
  emotion: string;
  urgencyScore: number;
  waitTime: number;
  lastMessage: string;
  agent?: string;
  tags: string[];
}

const mockTriageItems: TriageItem[] = [
  {
    id: '1',
    customer: 'Emma Davis',
    subject: 'Payment failed multiple times - urgent help needed',
    channel: 'email',
    priority: 'urgent',
    sentiment: 'negative',
    emotion: 'anger',
    urgencyScore: 95,
    waitTime: 45,
    lastMessage: 'This is the third time my payment has failed. I need this resolved immediately!',
    tags: ['payment', 'escalation', 'vip']
  },
  {
    id: '2',
    customer: 'John Smith',
    subject: 'Account locked after update',
    channel: 'chat',
    priority: 'high',
    sentiment: 'negative',
    emotion: 'frustration',
    urgencyScore: 87,
    waitTime: 23,
    lastMessage: 'I can\'t access my account since the update. This is affecting my work.',
    agent: 'Sarah Chen',
    tags: ['account', 'technical']
  },
  {
    id: '3',
    customer: 'Lisa Johnson',
    subject: 'Feature request and feedback',
    channel: 'ticket',
    priority: 'medium',
    sentiment: 'mixed',
    emotion: 'confusion',
    urgencyScore: 62,
    waitTime: 120,
    lastMessage: 'I love the new interface but some features are hard to find.',
    tags: ['feedback', 'feature-request']
  },
  {
    id: '4',
    customer: 'Robert Brown',
    subject: 'Billing inquiry - overcharge',
    channel: 'email',
    priority: 'high',
    sentiment: 'negative',
    emotion: 'disappointment',
    urgencyScore: 78,
    waitTime: 67,
    lastMessage: 'I was charged twice for the same service. Please refund the duplicate charge.',
    tags: ['billing', 'refund']
  },
  {
    id: '5',
    customer: 'Mary Wilson',
    subject: 'Thank you for excellent service',
    channel: 'chat',
    priority: 'low',
    sentiment: 'positive',
    emotion: 'satisfaction',
    urgencyScore: 25,
    waitTime: 5,
    lastMessage: 'Your team helped me solve the issue perfectly. Great service!',
    agent: 'Mike Johnson',
    tags: ['positive', 'resolved']
  }
];

export const TriagePanel: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<TriageItem | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-sentiment-positive';
      case 'negative': return 'text-sentiment-negative';
      case 'neutral': return 'text-sentiment-neutral';
      case 'mixed': return 'text-sentiment-mixed';
      default: return 'text-muted-foreground';
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return <Mail className="h-4 w-4" />;
      case 'chat': return <MessageCircle className="h-4 w-4" />;
      case 'ticket': return <Phone className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  const getUrgencyIcon = (score: number) => {
    if (score >= 90) return <AlertCircle className="h-4 w-4 text-red-500" />;
    if (score >= 70) return <Star className="h-4 w-4 text-orange-500" />;
    return null;
  };

  const formatWaitTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const filteredItems = filter === 'all' 
    ? mockTriageItems 
    : mockTriageItems.filter(item => item.priority === filter);

  const sortedItems = [...filteredItems].sort((a, b) => b.urgencyScore - a.urgencyScore);

  return (
    <Card className="shadow-soft">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg">
          <AlertCircle className="h-5 w-5 text-primary" />
          Auto-Triage Recommendations
        </CardTitle>
        <div className="flex gap-1">
          {['all', 'urgent', 'high', 'medium'].map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(filterType)}
              className="text-xs"
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[500px]">
          <div className="space-y-2 p-6">
            {sortedItems.map((item) => (
              <div
                key={item.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-soft ${
                  selectedItem?.id === item.id ? 'ring-2 ring-primary bg-primary/5' : 'bg-card'
                }`}
                onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(item.priority)}>
                      {item.priority}
                    </Badge>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      {getChannelIcon(item.channel)}
                      <span className="text-xs">{item.channel}</span>
                    </div>
                    {getUrgencyIcon(item.urgencyScore)}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Wait: {formatWaitTime(item.waitTime)}</span>
                  </div>
                </div>

                <div className="mb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">{item.customer}</span>
                    <span className={`text-sm ${getSentimentColor(item.sentiment)}`}>
                      • {item.emotion}
                    </span>
                  </div>
                  <h4 className="font-medium text-foreground text-sm">
                    {item.subject}
                  </h4>
                </div>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  "{item.lastMessage}"
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    {item.agent && (
                      <span className="text-xs text-muted-foreground">
                        Assigned: {item.agent}
                      </span>
                    )}
                    <div className="text-xs font-medium text-primary">
                      Score: {item.urgencyScore}
                    </div>
                  </div>
                </div>

                {selectedItem?.id === item.id && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h5 className="font-medium text-foreground mb-2">Recommended Actions:</h5>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          {item.priority === 'urgent' && (
                            <>
                              <p>• Escalate to senior agent immediately</p>
                              <p>• Set up priority callback</p>
                              <p>• Notify team lead</p>
                            </>
                          )}
                          {item.priority === 'high' && (
                            <>
                              <p>• Assign to experienced agent</p>
                              <p>• Provide detailed response within 1 hour</p>
                              <p>• Monitor for escalation</p>
                            </>
                          )}
                          {item.priority === 'medium' && (
                            <>
                              <p>• Standard queue processing</p>
                              <p>• Respond within 4 hours</p>
                              <p>• Follow standard procedures</p>
                            </>
                          )}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-foreground mb-2">Context & History:</h5>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p>• Previous interactions: 3</p>
                          <p>• Customer tier: {item.tags.includes('vip') ? 'VIP' : 'Standard'}</p>
                          <p>• Last contact: 2 days ago</p>
                          <p>• Resolution rate: 95%</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-gradient-primary">
                        Assign Agent
                      </Button>
                      <Button size="sm" variant="outline">
                        View Full Thread
                      </Button>
                      <Button size="sm" variant="outline">
                        Update Priority
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};