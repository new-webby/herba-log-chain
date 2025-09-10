import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Leaf, MapPin, Scan } from 'lucide-react';
import heroImage from '@/assets/hero-botanical.jpg';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-success/40" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Blockchain-Verified
              <span className="block bg-gradient-to-r from-accent to-warning bg-clip-text text-transparent">
                Ayurvedic Authenticity
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Track every step of your herbs' journey from sustainable harvest to your doorstep. 
              Ensuring purity, authenticity, and ethical sourcing through blockchain technology.
            </p>
          </div>
          
          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 my-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <MapPin className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Geo-Tagged Origins</h3>
              <p className="text-white/80 text-sm">
                Every herb traced to its exact geographical source with GPS coordinates
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Shield className="h-12 w-12 text-success mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Quality Assured</h3>
              <p className="text-white/80 text-sm">
                Lab-verified purity, potency, and safety with immutable blockchain records
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Leaf className="h-12 w-12 text-warning mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Sustainable Sourcing</h3>
              <p className="text-white/80 text-sm">
                Supporting fair trade and biodiversity conservation practices
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-accent to-warning hover:from-accent/90 hover:to-warning/90 text-white font-semibold px-8 py-4 text-lg rounded-full shadow-strong transition-all duration-300 transform hover:scale-105"
            >
              <Scan className="mr-2 h-6 w-6" />
              Verify Your Product
            </Button>
            <p className="text-white/70 text-sm">
              Scan QR code or enter batch ID to view complete provenance
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};