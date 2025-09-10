import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Scan, Search } from 'lucide-react';

interface QRScannerProps {
  onScan: (qrCode: string) => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onScan }) => {
  const [manualCode, setManualCode] = useState('');

  const handleScan = () => {
    // For demo purposes, we'll use the mock batch ID
    onScan('ASH-2024-001-KR');
  };

  const handleManualSubmit = () => {
    if (manualCode.trim()) {
      onScan(manualCode.trim());
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-medium">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-primary">
          <Scan className="h-6 w-6" />
          Verify Authenticity
        </CardTitle>
        <p className="text-muted-foreground">
          Scan QR code or enter batch ID to trace your Ayurvedic product
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={handleScan}
          className="w-full bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90 transition-all duration-300"
          size="lg"
        >
          <Scan className="mr-2 h-5 w-5" />
          Scan QR Code
        </Button>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Enter batch ID (e.g., ASH-2024-001-KR)"
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleManualSubmit()}
            className="transition-shadow focus:shadow-soft"
          />
          <Button 
            onClick={handleManualSubmit}
            variant="outline"
            size="icon"
            className="shrink-0 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};