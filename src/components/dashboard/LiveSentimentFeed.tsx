import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock, MessageCircle, User, Mail, Phone } from 'lucide-react';

interface SentimentMessage {
  id: string;
  message: string;
  sentiment: 'positive' | 'negative' | 'neutral' | 'mixed';
  emotion: string;
  confidence: number;
  channel: 'email' | 'chat' | 'ticket';
  agent: string;
  customer: string;
  timestamp: Date;
}

const mockMessages: SentimentMessage[] = [
  {
    id: '1',
    message: "Thank you so much for the quick resolution! This was exactly what I needed.",
    sentiment: 'positive',
    emotion: 'joy',
    confidence: 0.95,
    channel: 'email',
    agent: 'Sarah Chen',
    customer: 'John Smith',
    timestamp: new Date(Date.now() - 2 * 60 * 1000)
  },
  {
    id: '2',
    message: "I'm extremely frustrated with this ongoing issue. This is the third time I'm contacting support.",
    sentiment: 'negative',
    emotion: 'anger',
    confidence: 0.89,
    channel: 'chat',
    agent: 'Mike Johnson',
    customer: 'Emma Davis',
    timestamp: new Date(Date.now() - 5 * 60 * 1000)
  },
  {
    id: '3',
    message: "I'm not sure if I understand the process. Could you explain it again?",
    sentiment: 'neutral',
    emotion: 'confusion',
    confidence: 0.76,
    channel: 'ticket',
    agent: 'Lisa Wang',
    customer: 'Robert Brown',
    timestamp: new Date(Date.now() - 8 * 60 * 1000)
  },
  {
    id: '4',
    message: "The service is okay, but I expected better response times.",
    sentiment: 'mixed',
    emotion: 'disappointment',
    confidence: 0.82,
    channel: 'email',
    agent: 'David Wilson',
    customer: 'Mary Johnson',
    timestamp: new Date(Date.now() - 12 * 60 * 1000)
  }
];

const getSentimentColor = (sentiment: string) => {
  switch (sentiment) {
    case 'positive': return 'bg-sentiment-positive text-white';
    case 'negative': return 'bg-sentiment-negative text-white';
    case 'neutral': return 'bg-sentiment-neutral text-white';
    case 'mixed': return 'bg-sentiment-mixed text-white';
    default: return 'bg-muted text-muted-foreground';
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

export const LiveSentimentFeed: React.FC = () => {
  const [messages, setMessages] = useState<SentimentMessage[]>(mockMessages);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      const newMessage: SentimentMessage = {
        id: Math.random().toString(36).substr(2, 9),
        message: "Just received another customer message...",
        sentiment: ['positive', 'negative', 'neutral', 'mixed'][Math.floor(Math.random() * 4)] as any,
        emotion: ['joy', 'anger', 'confusion', 'satisfaction', 'disappointment'][Math.floor(Math.random() * 5)],
        confidence: 0.7 + Math.random() * 0.3,
        channel: ['email', 'chat', 'ticket'][Math.floor(Math.random() * 3)] as any,
        agent: ['Sarah Chen', 'Mike Johnson', 'Lisa Wang', 'David Wilson'][Math.floor(Math.random() * 4)],
        customer: `Customer ${Math.floor(Math.random() * 1000)}`,
        timestamp: new Date()
      };
      
      setMessages(prev => [newMessage, ...prev.slice(0, 19)]); // Keep last 20 messages
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="h-full shadow-soft">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="w-3 h-3 bg-alert-success rounded-full animate-pulse"></div>
          Real-Time Sentiment Feed
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] px-6">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="border-l-4 border-l-primary/20 pl-4 py-3 hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className={getSentimentColor(msg.sentiment)}>
                      {msg.sentiment}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {msg.emotion}
                    </Badge>
                    <div className="flex items-center gap-1 text-muted-foreground text-xs">
                      {getChannelIcon(msg.channel)}
                      <span>{msg.channel}</span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {msg.timestamp.toLocaleTimeString()}
                  </div>
                </div>
                <p className="text-sm text-foreground mb-2 line-clamp-2">
                  "{msg.message}"
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>Agent: {msg.agent}</span>
                    </div>
                    <span>Customer: {msg.customer}</span>
                  </div>
                  <span>Confidence: {(msg.confidence * 100).toFixed(0)}%</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};