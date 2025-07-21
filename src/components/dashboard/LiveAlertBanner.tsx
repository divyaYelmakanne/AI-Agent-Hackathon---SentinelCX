import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, AlertTriangle, Clock, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LiveAlert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  source: string;
  autoClose?: boolean;
}

export const LiveAlertBanner: React.FC = () => {
  const [alerts, setAlerts] = useState<LiveAlert[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  // Simulate live alerts
  useEffect(() => {
    const generateAlert = () => {
      const alertTypes = [
        {
          type: 'critical' as const,
          title: 'Critical Sentiment Spike',
          message: 'Negative sentiment increased by 45% in the last 10 minutes. Immediate attention required.',
          source: 'Live Chat Channel'
        },
        {
          type: 'warning' as const,
          title: 'Agent Performance Alert',
          message: 'Agent Sarah\'s sentiment score dropped below threshold (2.1/5.0).',
          source: 'Agent Monitor'
        },
        {
          type: 'info' as const,
          title: 'High Volume Detected',
          message: 'Incoming message volume is 3x higher than usual. Consider adding support staff.',
          source: 'System Monitor'
        }
      ];

      const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
      const newAlert: LiveAlert = {
        id: `alert-${Date.now()}`,
        ...randomAlert,
        timestamp: new Date(),
        autoClose: randomAlert.type === 'info'
      };

      setAlerts(prev => [newAlert, ...prev.slice(0, 2)]); // Keep max 3 alerts
      setIsVisible(true);

      // Auto-close info alerts after 8 seconds
      if (newAlert.autoClose) {
        setTimeout(() => {
          dismissAlert(newAlert.id);
        }, 8000);
      }
    };

    // Generate first alert after 3 seconds
    const initialTimeout = setTimeout(generateAlert, 3000);
    
    // Then generate alerts every 15-30 seconds
    const interval = setInterval(() => {
      if (Math.random() > 0.3) { // 70% chance to generate an alert
        generateAlert();
      }
    }, Math.random() * 15000 + 15000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const dismissAll = () => {
    setAlerts([]);
    setIsVisible(false);
  };

  const getAlertStyles = (type: LiveAlert['type']) => {
    switch (type) {
      case 'critical':
        return 'bg-alert-danger-bg border-alert-danger text-alert-danger-text shadow-alert-danger';
      case 'warning':
        return 'bg-alert-warning-bg border-alert-warning text-alert-warning-text shadow-alert-warning';
      case 'info':
        return 'bg-alert-info-bg border-alert-info text-alert-info-text shadow-alert-info';
      default:
        return 'bg-surface border-border text-foreground';
    }
  };

  const getAlertIcon = (type: LiveAlert['type']) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-5 w-5 text-alert-danger animate-pulse" />;
      case 'warning':
        return <TrendingDown className="h-5 w-5 text-alert-warning" />;
      case 'info':
        return <Clock className="h-5 w-5 text-alert-info" />;
    }
  };

  if (!isVisible || alerts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 max-w-md space-y-2 animate-slide-in-right">
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          className={cn(
            'relative backdrop-blur-lg shadow-large border-2 animate-fade-in',
            getAlertStyles(alert.type)
          )}
        >
          <div className="flex items-start gap-3">
            {getAlertIcon(alert.type)}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <AlertTitle className="text-sm font-semibold">
                  {alert.title}
                </AlertTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => dismissAlert(alert.id)}
                  className="h-6 w-6 p-0 opacity-70 hover:opacity-100"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <AlertDescription className="text-xs mb-2 leading-relaxed">
                {alert.message}
              </AlertDescription>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs px-2 py-0.5">
                  {alert.source}
                </Badge>
                <span className="text-xs opacity-75">
                  {alert.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        </Alert>
      ))}
      
      {alerts.length > 1 && (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={dismissAll}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Dismiss All
          </Button>
        </div>
      )}
    </div>
  );
};