import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { ProcessingStep } from '@/types/traceability';
import { 
  Factory,
  Package,
  Thermometer,
  Clock,
  Upload,
  CheckCircle,
  Loader2,
  LogOut,
  User,
  Search,
  Plus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProcessingForm {
  batchId: string;
  stepType: 'DRYING' | 'GRINDING' | 'EXTRACTION' | 'PACKAGING';
  conditions: {
    temperature?: number;
    humidity?: number;
    duration?: number;
  };
  notes: string;
}

interface BatchInfo {
  batchId: string;
  species: string;
  quantity: string;
  status: 'RECEIVED' | 'PROCESSING' | 'COMPLETED';
  lastUpdate: string;
}

const mockBatches: BatchInfo[] = [
  {
    batchId: 'ASH-2024-001-KR',
    species: 'Withania somnifera',
    quantity: '50kg',
    status: 'PROCESSING',
    lastUpdate: '2024-01-15T10:30:00Z'
  },
  {
    batchId: 'BRA-2024-002-KR',
    species: 'Bacopa monnieri',
    quantity: '25kg', 
    status: 'RECEIVED',
    lastUpdate: '2024-01-16T08:15:00Z'
  }
];

export const ProcessorDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<string>('');
  const [batches] = useState<BatchInfo[]>(mockBatches);
  const [form, setForm] = useState<ProcessingForm>({
    batchId: '',
    stepType: 'DRYING',
    conditions: {},
    notes: ''
  });

  const handleBatchSelect = (batchId: string) => {
    setSelectedBatch(batchId);
    setForm(prev => ({ ...prev, batchId }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Mock blockchain submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const processingStep: ProcessingStep = {
        id: `PS-${Date.now()}`,
        eventId: `CE-${form.batchId}`,
        timestamp: new Date().toISOString(),
        processor: {
          name: user!.organization,
          location: user!.location,
          license: user!.certifications[0]
        },
        stepType: form.stepType,
        conditions: form.conditions,
        batchId: form.batchId,
        blockchainTxId: `0x${Math.random().toString(16).substr(2, 16)}`
      };

      toast({
        title: "Processing Step Recorded",
        description: `Successfully updated batch ${form.batchId}. TX: ${processingStep.blockchainTxId}`,
      });

      // Reset form
      setForm({
        batchId: '',
        stepType: 'DRYING',
        conditions: {},
        notes: ''
      });
      setSelectedBatch('');

    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: BatchInfo['status']) => {
    switch (status) {
      case 'RECEIVED': return 'bg-info/10 text-info border-info/20';
      case 'PROCESSING': return 'bg-warning/10 text-warning border-warning/20';
      case 'COMPLETED': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/5 to-warning/5">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Factory className="h-8 w-8 text-accent" />
              <div>
                <h1 className="text-xl font-bold text-accent">AyurChain Processor Portal</h1>
                <p className="text-sm text-muted-foreground">Processing Unit Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4" />
                <span className="font-medium">{user?.name}</span>
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Batch Selection */}
          <div className="lg:col-span-1">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-accent">
                  <Package className="h-5 w-5" />
                  Active Batches
                </CardTitle>
                <CardDescription>
                  Select a batch to update processing status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {batches.map((batch) => (
                  <div
                    key={batch.batchId}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedBatch === batch.batchId 
                        ? 'border-accent bg-accent/5' 
                        : 'border-border hover:border-accent/50'
                    }`}
                    onClick={() => handleBatchSelect(batch.batchId)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-sm">{batch.batchId}</p>
                        <Badge variant="secondary" className={getStatusColor(batch.status)}>
                          {batch.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground italic">{batch.species}</p>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{batch.quantity}</span>
                        <span>{new Date(batch.lastUpdate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Processing Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-accent">
                  <Plus className="h-5 w-5" />
                  Record Processing Step
                </CardTitle>
                <CardDescription>
                  Update blockchain with processing details
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!selectedBatch ? (
                  <div className="text-center py-12">
                    <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Select a batch to begin processing</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Selected Batch Info */}
                    <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                      <p className="font-semibold text-accent">Selected Batch: {form.batchId}</p>
                      <p className="text-sm text-muted-foreground">
                        {batches.find(b => b.batchId === selectedBatch)?.species}
                      </p>
                    </div>

                    {/* Processing Step Type */}
                    <div className="space-y-2">
                      <Label htmlFor="stepType">Processing Step</Label>
                      <Select
                        value={form.stepType}
                        onValueChange={(value: ProcessingForm['stepType']) => 
                          setForm(prev => ({ ...prev, stepType: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DRYING">Drying</SelectItem>
                          <SelectItem value="GRINDING">Grinding</SelectItem>
                          <SelectItem value="EXTRACTION">Extraction</SelectItem>
                          <SelectItem value="PACKAGING">Packaging</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Processing Conditions */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-accent">Processing Conditions</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="temperature">
                            <Thermometer className="inline h-4 w-4 mr-1" />
                            Temperature (°C)
                          </Label>
                          <Input
                            id="temperature"
                            type="number"
                            value={form.conditions.temperature || ''}
                            onChange={(e) => setForm(prev => ({
                              ...prev,
                              conditions: { 
                                ...prev.conditions, 
                                temperature: parseFloat(e.target.value) || undefined 
                              }
                            }))}
                            placeholder="25"
                          />
                        </div>
                        <div>
                          <Label htmlFor="humidity">Humidity (%)</Label>
                          <Input
                            id="humidity"
                            type="number"
                            value={form.conditions.humidity || ''}
                            onChange={(e) => setForm(prev => ({
                              ...prev,
                              conditions: { 
                                ...prev.conditions, 
                                humidity: parseFloat(e.target.value) || undefined 
                              }
                            }))}
                            placeholder="15"
                          />
                        </div>
                        <div>
                          <Label htmlFor="duration">
                            <Clock className="inline h-4 w-4 mr-1" />
                            Duration (hours)
                          </Label>
                          <Input
                            id="duration"
                            type="number"
                            value={form.conditions.duration || ''}
                            onChange={(e) => setForm(prev => ({
                              ...prev,
                              conditions: { 
                                ...prev.conditions, 
                                duration: parseFloat(e.target.value) || undefined 
                              }
                            }))}
                            placeholder="72"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Processing Notes */}
                    <div className="space-y-2">
                      <Label htmlFor="notes">Processing Notes</Label>
                      <Textarea
                        id="notes"
                        value={form.notes}
                        onChange={(e) => setForm(prev => ({ ...prev, notes: e.target.value }))}
                        placeholder="Additional processing details, observations, or quality notes..."
                        rows={3}
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                      size="lg"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Updating Blockchain...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-5 w-5" />
                          Record Processing Step
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};