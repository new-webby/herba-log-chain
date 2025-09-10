import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginForm } from '@/components/LoginForm';
import { FarmerDashboard } from '@/components/FarmerDashboard';
import { ProcessorDashboard } from '@/components/ProcessorDashboard';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  switch (user?.role) {
    case 'farmer':
      return <FarmerDashboard />;
    case 'processor':
      return <ProcessorDashboard />;
    case 'lab':
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary mb-4">Laboratory Dashboard</h1>
            <p className="text-muted-foreground">Coming Soon...</p>
          </div>
        </div>
      );
    case 'manufacturer':
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary mb-4">Manufacturer Dashboard</h1>
            <p className="text-muted-foreground">Coming Soon...</p>
          </div>
        </div>
      );
    default:
      return <LoginForm />;
  }
};

export default Dashboard;