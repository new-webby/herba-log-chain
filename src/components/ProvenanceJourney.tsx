import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ProvenanceBundle } from '@/types/traceability';
import { 
  MapPin, 
  User, 
  Beaker, 
  Factory, 
  Leaf, 
  Shield, 
  Calendar,
  ExternalLink,
  CheckCircle,
  Award,
  Truck
} from 'lucide-react';

interface ProvenanceJourneyProps {
  data: ProvenanceBundle;
}

export const ProvenanceJourney: React.FC<ProvenanceJourneyProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      {/* Product Overview */}
      <Card className="border-primary/20 shadow-medium">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-success/5">
          <CardTitle className="flex items-center gap-2 text-primary">
            <Leaf className="h-6 w-6" />
            {data.product.name}
          </CardTitle>
          <p className="text-muted-foreground italic">{data.product.scientificName}</p>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Batch ID</p>
              <p className="font-semibold text-primary">{data.batchId}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Net Weight</p>
              <p className="font-semibold">{data.product.netWeight}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Manufactured</p>
              <p className="font-semibold">{new Date(data.product.manufacturingDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Expires</p>
              <p className="font-semibold">{new Date(data.product.expiryDate).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance & Certifications */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-success">
            <Shield className="h-5 w-5" />
            Certifications & Compliance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {data.compliance.ayushApproval && (
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                <CheckCircle className="w-3 h-3 mr-1" />
                AYUSH Approved
              </Badge>
            )}
            {data.sustainability.organic && (
              <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                <Leaf className="w-3 h-3 mr-1" />
                Certified Organic
              </Badge>
            )}
            {data.sustainability.fairTrade && (
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                <Award className="w-3 h-3 mr-1" />
                Fair Trade
              </Badge>
            )}
            {data.compliance.gmpCompliant && (
              <Badge variant="secondary" className="bg-info/10 text-info border-info/20">
                <Factory className="w-3 h-3 mr-1" />
                GMP Compliant
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Collection Journey */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-primary">Supply Chain Journey</h3>
        
        {data.collectionEvents.map((event, index) => (
          <Card key={event.id} className="shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-primary">
                  <MapPin className="h-5 w-5" />
                  Collection Event #{index + 1}
                </CardTitle>
                <Badge variant="outline" className="text-xs">
                  {new Date(event.timestamp).toLocaleDateString()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <User className="h-4 w-4 text-muted-foreground mt-1" />
                    <div>
                      <p className="font-medium">{event.collector.name}</p>
                      <p className="text-sm text-muted-foreground">{event.collector.cooperative}</p>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {event.collector.certification}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                    <div>
                      <p className="font-medium">{event.location.address}</p>
                      <p className="text-sm text-muted-foreground">{event.location.region}</p>
                      <p className="text-xs text-muted-foreground">
                        {event.location.latitude}, {event.location.longitude}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Quantity Collected</p>
                    <p className="font-semibold">{event.quantity.amount} {event.quantity.unit}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Initial Moisture</p>
                    <p className="font-semibold">{event.initialQuality.moisture}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Condition</p>
                    <p className="text-sm">{event.initialQuality.appearance}</p>
                  </div>
                </div>
              </div>
              
              {event.initialQuality.notes && (
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm">
                    <span className="font-medium">Collector Notes:</span> {event.initialQuality.notes}
                  </p>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ExternalLink className="h-3 w-3" />
                Blockchain TX: {event.blockchainTxId}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Quality Tests */}
        {data.qualityTests.map((test, index) => (
          <Card key={test.id} className="shadow-soft border-success/20">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-success">
                <Beaker className="h-5 w-5" />
                Quality Testing #{index + 1}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{test.laboratory.name}</p>
                  <p className="text-sm text-muted-foreground">{test.laboratory.location}</p>
                  <Badge variant="secondary" className="text-xs mt-1">
                    {test.laboratory.accreditation}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Test Date</p>
                  <p className="font-semibold">{new Date(test.testDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Moisture</p>
                  <p className="font-semibold text-primary">{test.results.moisture}%</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Pesticides</p>
                  <Badge variant={test.results.pesticides === 'PASSED' ? 'default' : 'destructive'} className="text-xs">
                    {test.results.pesticides}
                  </Badge>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Heavy Metals</p>
                  <Badge variant={test.results.heavyMetals === 'PASSED' ? 'default' : 'destructive'} className="text-xs">
                    {test.results.heavyMetals}
                  </Badge>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">DNA Verified</p>
                  <div className="flex flex-col items-center">
                    <CheckCircle className="h-4 w-4 text-success mb-1" />
                    <span className="text-xs">{test.results.dnaBarcode.confidence}%</span>
                  </div>
                </div>
              </div>
              
              {test.results.activeCompounds && (
                <div className="mt-4 p-3 bg-success/5 rounded-lg">
                  <p className="text-sm font-medium text-success mb-2">Active Compounds</p>
                  {test.results.activeCompounds.withanolides && (
                    <p className="text-sm">Withanolides: {test.results.activeCompounds.withanolides}%</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {/* Processing Steps */}
        {data.processingSteps.map((step, index) => (
          <Card key={step.id} className="shadow-soft border-accent/20">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-accent">
                {step.stepType === 'DRYING' && <Factory className="h-5 w-5" />}
                {step.stepType === 'GRINDING' && <Factory className="h-5 w-5" />}
                {step.stepType === 'PACKAGING' && <Truck className="h-5 w-5" />}
                Processing: {step.stepType}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{step.processor.name}</p>
                  <p className="text-sm text-muted-foreground">{step.processor.location}</p>
                  <Badge variant="secondary" className="text-xs mt-1">
                    License: {step.processor.license}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Process Date</p>
                  <p className="font-semibold">{new Date(step.timestamp).toLocaleDateString()}</p>
                </div>
              </div>
              
              {step.conditions && (
                <div className="grid grid-cols-3 gap-4 p-3 bg-muted/30 rounded-lg">
                  {step.conditions.temperature && (
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Temperature</p>
                      <p className="font-semibold">{step.conditions.temperature}°C</p>
                    </div>
                  )}
                  {step.conditions.humidity && (
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Humidity</p>
                      <p className="font-semibold">{step.conditions.humidity}%</p>
                    </div>
                  )}
                  {step.conditions.duration && (
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-semibold">{step.conditions.duration}h</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sustainability Impact */}
      <Card className="shadow-medium border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Leaf className="h-5 w-5" />
            Sustainability Impact
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Biodiversity Conservation</p>
              <p className="text-sm">{data.sustainability.biodiversityImpact}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Carbon Footprint</p>
              <p className="font-semibold text-success">{data.sustainability.carbonFootprint} kg CO₂</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};