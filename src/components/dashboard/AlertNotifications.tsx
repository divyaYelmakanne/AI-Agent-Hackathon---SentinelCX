import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { X, AlertTriangle, TrendingDown, Bell, Clock, ArrowRight } from 'lucide-react';

interface AlertItem {
  id: string;
  type: 'spike' | 'threshold' | 'agent' | 'channel';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: Date;
  source: string;
  actionable: boolean;
}

const mockAlerts: AlertItem[] = [
  {
    id: '1',
    type: 'spike',
    severity: 'critical',
    title: 'Negative Sentiment Spike Detected',
    description: '45% increase in negative sentiment in the last hour across email support',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    source: 'Email Support',
    actionable: true
  },
  {
    id: '2',
    type: 'threshold',
    severity: 'high',
    title: 'Agent Performance Alert',
    description: 'David Wilson\'s sentiment score dropped below 80% threshold',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    source: 'Agent Monitoring',
    actionable: true
  },
  {
    id: '3',
    type: 'channel',
    severity: 'medium',
    title: 'Chat Response Time Impact',
    description: 'Longer response times correlating with increased frustration',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    source: 'Live Chat',
    actionable: false
  }
];

export const AlertNotifications: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertItem[]>(mockAlerts);
  const [activeAlert, setActiveAlert] = useState<AlertItem | null>(null);

  useEffect(() => {
    // Simulate new alerts
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 20 seconds
        const newAlert: AlertItem = {
          id: Math.random().toString(36).substr(2, 9),
          type: ['spike', 'threshold', 'agent', 'channel'][Math.floor(Math.random() * 4)] as any,
          severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as any,
          title: 'New Alert Generated',
          description: 'System detected anomaly in sentiment patterns',
          timestamp: new Date(),
          source: ['Email Support', 'Live Chat', 'Ticket System'][Math.floor(Math.random() * 3)],
          actionable: Math.random() > 0.5
        };
        
        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]); // Keep last 10 alerts
      }
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'high':
        return <AlertTriangle className="h-4 w-4" />;
      case 'medium':
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  return (
    <Card className="shadow-soft">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bell className="h-5 w-5 text-primary animate-pulse" />
          Live Alerts & Notifications
          {alerts.length > 0 && (
            <Badge variant="destructive" className="ml-2">
              {alerts.length}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No active alerts at the moment</p>
            <p className="text-sm">System is monitoring for sentiment anomalies</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <Alert 
              key={alert.id} 
              className={`relative border-l-4 ${
                alert.severity === 'critical' ? 'border-l-red-500' :
                alert.severity === 'high' ? 'border-l-orange-500' :
                alert.severity === 'medium' ? 'border-l-yellow-500' :
                'border-l-blue-500'
              } hover:shadow-soft transition-shadow cursor-pointer`}
              onClick={() => setActiveAlert(activeAlert?.id === alert.id ? null : alert)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`p-1 rounded-full ${getSeverityColor(alert.severity)}`}>
                    {getSeverityIcon(alert.severity)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground text-sm">
                        {alert.title}
                      </h4>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getSeverityColor(alert.severity)}`}
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                    <AlertDescription className="text-sm text-muted-foreground mb-2">
                      {alert.description}
                    </AlertDescription>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        <span>{alert.timestamp.toLocaleTimeString()}</span>
                        <span>•</span>
                        <span>{alert.source}</span>
                      </div>
                      {alert.actionable && (
                        <Badge variant="outline" className="text-xs">
                          Action Required
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                    dismissAlert(alert.id);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>

              {activeAlert?.id === alert.id && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium text-foreground mb-1">Recommended Actions:</h5>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Review recent customer interactions</li>
                        <li>• Check system performance metrics</li>
                        <li>• Escalate to team lead if needed</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-foreground mb-1">Impact Analysis:</h5>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Affected customers: 23</li>
                        <li>• Average resolution time: 45 min</li>
                        <li>• Satisfaction drop: 15%</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="flex items-center gap-1">
                      Investigate
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      Mark as Reviewed
                    </Button>
                    <Button size="sm" variant="outline">
                      Set Reminder
                    </Button>
                  </div>
                </div>
              )}
            </Alert>
          ))
        )}
      </CardContent>
    </Card>
  );
};