import React, { useState } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full max-w-md z-10">
        {isLogin ? (
          <LoginForm onToggleMode={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onToggleMode={() => setIsLogin(true)} />
        )}
      </div>
      
      {/* Enhanced Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Primary gradient orb */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-primary opacity-20 rounded-full blur-3xl animate-pulse"></div>
        {/* Secondary gradient orb */}
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-secondary opacity-15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        {/* Accent orb */}
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-accent opacity-10 rounded-full blur-2xl animate-pulse delay-500"></div>
        {/* Additional subtle orbs */}
        <div className="absolute bottom-1/3 left-1/2 w-48 h-48 bg-primary/5 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/6 right-1/6 w-32 h-32 bg-accent/8 rounded-full blur-lg animate-pulse delay-1500"></div>
      </div>
      
      {/* Subtle grid pattern overlay */}
      <div className="fixed inset-0 -z-5 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
    </div>
  );
};