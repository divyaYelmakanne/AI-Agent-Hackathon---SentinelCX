import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TrendData {
  time: string;
  positive: number;
  negative: number;
  neutral: number;
  mixed: number;
}

const generateMockData = (timeframe: string): TrendData[] => {
  const hours = timeframe === '24h' ? 24 : timeframe === '7d' ? 7 * 24 : 30 * 24;
  const interval = timeframe === '24h' ? 1 : timeframe === '7d' ? 24 : 24;
  
  const data: TrendData[] = [];
  
  for (let i = hours; i >= 0; i -= interval) {
    const time = new Date(Date.now() - i * 60 * 60 * 1000);
    const timeStr = timeframe === '24h' 
      ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : time.toLocaleDateString();
    
    // Generate realistic sentiment distribution
    const positive = 40 + Math.random() * 30;
    const negative = 10 + Math.random() * 20;
    const neutral = 30 + Math.random() * 20;
    const mixed = 100 - positive - negative - neutral;
    
    data.push({
      time: timeStr,
      positive: Math.round(positive),
      negative: Math.round(negative),
      neutral: Math.round(neutral),
      mixed: Math.round(Math.max(0, mixed))
    });
  }
  
  return data;
};

export const SentimentTrendChart: React.FC = () => {
  const [timeframe, setTimeframe] = useState('24h');
  const [data, setData] = useState<TrendData[]>([]);

  useEffect(() => {
    setData(generateMockData(timeframe));
  }, [timeframe]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-medium">
          <p className="font-medium text-foreground">{`Time: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${entry.value}%`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-soft">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Sentiment Trends</CardTitle>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24h</SelectItem>
            <SelectItem value="7d">Last 7d</SelectItem>
            <SelectItem value="30d">Last 30d</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                label={{ value: 'Percentage', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="positive" 
                stroke="hsl(var(--sentiment-positive))" 
                strokeWidth={2}
                name="Positive"
                dot={{ fill: "hsl(var(--sentiment-positive))", strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="negative" 
                stroke="hsl(var(--sentiment-negative))" 
                strokeWidth={2}
                name="Negative"
                dot={{ fill: "hsl(var(--sentiment-negative))", strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="neutral" 
                stroke="hsl(var(--sentiment-neutral))" 
                strokeWidth={2}
                name="Neutral"
                dot={{ fill: "hsl(var(--sentiment-neutral))", strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="mixed" 
                stroke="hsl(var(--sentiment-mixed))" 
                strokeWidth={2}
                name="Mixed"
                dot={{ fill: "hsl(var(--sentiment-mixed))", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};