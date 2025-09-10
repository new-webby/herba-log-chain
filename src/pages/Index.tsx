import React, { useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { QRScanner } from '@/components/QRScanner';
import { ProvenanceJourney } from '@/components/ProvenanceJourney';
import { mockProvenanceData } from '@/data/mockData';
import { ProvenanceBundle } from '@/types/traceability';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Index = () => {
  const [currentView, setCurrentView] = useState<'hero' | 'scanner' | 'provenance'>('hero');
  const [provenanceData, setProvenanceData] = useState<ProvenanceBundle | null>(null);

  const handleGetStarted = () => {
    setCurrentView('scanner');
  };

  const handleScan = (qrCode: string) => {
    // In a real implementation, this would fetch from blockchain
    setProvenanceData(mockProvenanceData);
    setCurrentView('provenance');
  };

  const handleBack = () => {
    if (currentView === 'provenance') {
      setCurrentView('scanner');
    } else if (currentView === 'scanner') {
      setCurrentView('hero');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {currentView === 'hero' && (
        <HeroSection onGetStarted={handleGetStarted} />
      )}
      
      {currentView === 'scanner' && (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center">
              <Button 
                variant="ghost" 
                onClick={handleBack}
                className="mb-4 text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </div>
            <QRScanner onScan={handleScan} />
          </div>
        </div>
      )}
      
      {currentView === 'provenance' && provenanceData && (
        <div className="min-h-screen py-8">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="mb-6">
              <Button 
                variant="ghost" 
                onClick={handleBack}
                className="mb-4 text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Scan Another Product
              </Button>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-primary mb-2">Product Provenance</h1>
                <p className="text-muted-foreground">Complete traceability from source to shelf</p>
              </div>
            </div>
            <ProvenanceJourney data={provenanceData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
