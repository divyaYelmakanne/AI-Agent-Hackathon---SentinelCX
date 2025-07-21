import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MapPin, AlertTriangle, TrendingUp, Filter } from 'lucide-react';

interface HeatmapData {
  id: string;
  feature: string;
  category: string;
  frustrationLevel: number;
  complaints: number;
  trend: 'up' | 'down' | 'stable';
  topIssues: string[];
  resolution: number;
}

const mockHeatmapData: HeatmapData[] = [
  {
    id: '1',
    feature: 'Login System',
    category: 'Authentication',
    frustrationLevel: 85,
    complaints: 47,
    trend: 'up',
    topIssues: ['Password reset not working', 'Two-factor authentication issues'],
    resolution: 72
  },
  {
    id: '2',
    feature: 'Payment Processing',
    category: 'Finance',
    frustrationLevel: 78,
    complaints: 34,
    trend: 'down',
    topIssues: ['Card declined errors', 'Processing delays'],
    resolution: 89
  },
  {
    id: '3',
    feature: 'Search Function',
    category: 'Navigation',
    frustrationLevel: 65,
    complaints: 23,
    trend: 'stable',
    topIssues: ['Irrelevant results', 'Slow response'],
    resolution: 91
  },
  {
    id: '4',
    feature: 'Mobile App',
    category: 'Mobile',
    frustrationLevel: 72,
    complaints: 56,
    trend: 'up',
    topIssues: ['Crashes on iOS', 'Battery drain'],
    resolution: 67
  },
  {
    id: '5',
    feature: 'Customer Support',
    category: 'Support',
    frustrationLevel: 45,
    complaints: 18,
    trend: 'down',
    topIssues: ['Response time', 'Knowledge gaps'],
    resolution: 94
  },
  {
    id: '6',
    feature: 'Data Export',
    category: 'Analytics',
    frustrationLevel: 38,
    complaints: 12,
    trend: 'stable',
    topIssues: ['Format issues', 'Missing fields'],
    resolution: 96
  },
  {
    id: '7',
    feature: 'Notifications',
    category: 'Communication',
    frustrationLevel: 42,
    complaints: 15,
    trend: 'down',
    topIssues: ['Too frequent', 'Not relevant'],
    resolution: 93
  },
  {
    id: '8',
    feature: 'Dashboard',
    category: 'Interface',
    frustrationLevel: 29,
    complaints: 8,
    trend: 'stable',
    topIssues: ['Slow loading', 'Layout issues'],
    resolution: 97
  }
];

export const FrustrationHeatmap: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<HeatmapData | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const getHeatColor = (level: number) => {
    if (level >= 80) return 'bg-red-500';
    if (level >= 60) return 'bg-orange-500';
    if (level >= 40) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getHeatIntensity = (level: number) => {
    return `opacity-${Math.round(level / 10) * 10}`;
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-red-500" />;
      case 'down': return <TrendingUp className="h-3 w-3 text-green-500 rotate-180" />;
      default: return <div className="h-3 w-3 rounded-full bg-gray-400" />;
    }
  };

  const filteredData = filter === 'all' ? mockHeatmapData : mockHeatmapData.filter(item => item.category.toLowerCase() === filter);

  return (
    <Card className="shadow-soft">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg">
          <MapPin className="h-5 w-5 text-primary" />
          Customer Frustration Heatmap
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setFilter(filter === 'all' ? 'authentication' : 'all')}
          >
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {filteredData.map((item) => (
            <TooltipProvider key={item.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`relative p-3 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 ${
                      selectedFeature?.id === item.id ? 'ring-2 ring-primary' : ''
                    } ${getHeatColor(item.frustrationLevel)} ${getHeatIntensity(item.frustrationLevel)}`}
                    onClick={() => setSelectedFeature(selectedFeature?.id === item.id ? null : item)}
                  >
                    <div className="text-white font-medium text-sm mb-1">
                      {item.feature}
                    </div>
                    <div className="flex items-center justify-between text-white/90 text-xs">
                      <span>{item.complaints} issues</span>
                      {getTrendIcon(item.trend)}
                    </div>
                    <div className="absolute top-1 right-1">
                      {item.frustrationLevel >= 75 && (
                        <AlertTriangle className="h-4 w-4 text-white" />
                      )}
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-sm">
                    <p className="font-medium">{item.feature}</p>
                    <p>Frustration Level: {item.frustrationLevel}%</p>
                    <p>Resolution Rate: {item.resolution}%</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        {selectedFeature && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg border">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-lg text-foreground">
                {selectedFeature.feature}
              </h4>
              <Badge variant="outline">
                {selectedFeature.category}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-card rounded-lg">
                <div className="text-2xl font-bold text-red-500">
                  {selectedFeature.frustrationLevel}%
                </div>
                <div className="text-sm text-muted-foreground">Frustration Level</div>
              </div>
              <div className="text-center p-3 bg-card rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {selectedFeature.complaints}
                </div>
                <div className="text-sm text-muted-foreground">Total Complaints</div>
              </div>
              <div className="text-center p-3 bg-card rounded-lg">
                <div className="text-2xl font-bold text-green-500">
                  {selectedFeature.resolution}%
                </div>
                <div className="text-sm text-muted-foreground">Resolution Rate</div>
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-2 text-foreground">Top Issues:</h5>
              <div className="space-y-1">
                {selectedFeature.topIssues.map((issue, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    {issue}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 flex gap-2">
              <Button size="sm" variant="outline">View Details</Button>
              <Button size="sm" variant="outline">Create Action Plan</Button>
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Low (0-40%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span>Medium (40-60%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-orange-500 rounded"></div>
              <span>High (60-80%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>Critical (80%+)</span>
            </div>
          </div>
          <span>Click on any area for detailed analysis</span>
        </div>
      </CardContent>
    </Card>
  );
};