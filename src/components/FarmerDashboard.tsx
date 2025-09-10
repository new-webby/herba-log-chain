import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { CollectionEvent } from '@/types/traceability';
import { 
  MapPin, 
  Camera, 
  Upload, 
  Plus, 
  CheckCircle, 
  Loader2,
  LogOut,
  Leaf,
  User
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { compressImage } from '@/utils/imageProcessing';

interface CollectionForm {
  species: {
    scientificName: string;
    commonName: string;
    localName: string;
  };
  quantity: {
    amount: number;
    unit: string;
  };
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  initialQuality: {
    moisture: number;
    appearance: string;
    notes: string;
  };
  photos: File[];
}

export const FarmerDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<CollectionForm>({
    species: {
      scientificName: '',
      commonName: '',
      localName: ''
    },
    quantity: {
      amount: 0,
      unit: 'kg'
    },
    location: {
      latitude: 0,
      longitude: 0,
      address: ''
    },
    initialQuality: {
      moisture: 0,
      appearance: '',
      notes: ''
    },
    photos: []
  });

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation not supported",
        description: "Please enter coordinates manually.",
        variant: "destructive"
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setForm(prev => ({
          ...prev,
          location: {
            ...prev.location,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        }));
        toast({
          title: "Location captured",
          description: "GPS coordinates updated successfully."
        });
      },
      (error) => {
        toast({
          title: "Location error",
          description: "Unable to get current location. Please enter manually.",
          variant: "destructive"
        });
      }
    );
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const compressedFiles = await Promise.all(
      files.map(file => compressImage(file))
    );
    
    setForm(prev => ({
      ...prev,
      photos: [...prev.photos, ...compressedFiles.map(blob => new File([blob], 'compressed.jpg'))]
    }));
    
    toast({
      title: "Photos uploaded",
      description: `${files.length} photo(s) added successfully.`
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Mock blockchain submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const collectionEvent: CollectionEvent = {
        id: `CE-${Date.now()}`,
        timestamp: new Date().toISOString(),
        location: {
          ...form.location,
          region: 'Deccan Plateau' // Would be determined by coordinates
        },
        collector: {
          id: user!.id,
          name: user!.name,
          cooperative: user!.organization,
          certification: user!.certifications[0]
        },
        species: form.species,
        quantity: form.quantity,
        initialQuality: form.initialQuality,
        photos: form.photos.map((_, index) => `/api/photos/collection-${Date.now()}-${index}.jpg`),
        blockchainTxId: `0x${Math.random().toString(16).substr(2, 16)}`
      };

      toast({
        title: "Collection Recorded",
        description: `Successfully submitted to blockchain. TX: ${collectionEvent.blockchainTxId}`,
      });

      // Reset form
      setForm({
        species: { scientificName: '', commonName: '', localName: '' },
        quantity: { amount: 0, unit: 'kg' },
        location: { latitude: 0, longitude: 0, address: '' },
        initialQuality: { moisture: 0, appearance: '', notes: '' },
        photos: []
      });

    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-success/5">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Leaf className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-primary">AyurChain Farmer Portal</h1>
                <p className="text-sm text-muted-foreground">Blockchain Collection Interface</p>
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
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Plus className="h-5 w-5" />
                Record New Collection
              </CardTitle>
              <CardDescription>
                Submit herb collection data to the blockchain for traceability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Species Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary">Species Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="scientificName">Scientific Name</Label>
                      <Select
                        value={form.species.scientificName}
                        onValueChange={(value) => {
                          const species = {
                            'Withania somnifera': { scientific: 'Withania somnifera', common: 'Ashwagandha', local: 'Asgandh' },
                            'Bacopa monnieri': { scientific: 'Bacopa monnieri', common: 'Brahmi', local: 'Brahmi' },
                            'Centella asiatica': { scientific: 'Centella asiatica', common: 'Gotu Kola', local: 'Mandukaparni' }
                          }[value as keyof typeof species];
                          
                          if (species) {
                            setForm(prev => ({
                              ...prev,
                              species: {
                                scientificName: species.scientific,
                                commonName: species.common,
                                localName: species.local
                              }
                            }));
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select species" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Withania somnifera">Withania somnifera</SelectItem>
                          <SelectItem value="Bacopa monnieri">Bacopa monnieri</SelectItem>
                          <SelectItem value="Centella asiatica">Centella asiatica</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="commonName">Common Name</Label>
                      <Input
                        id="commonName"
                        value={form.species.commonName}
                        readOnly
                        className="bg-muted/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Quantity */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary">Quantity Collected</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="amount">Amount</Label>
                      <Input
                        id="amount"
                        type="number"
                        step="0.1"
                        value={form.quantity.amount}
                        onChange={(e) => setForm(prev => ({
                          ...prev,
                          quantity: { ...prev.quantity, amount: parseFloat(e.target.value) || 0 }
                        }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="unit">Unit</Label>
                      <Select
                        value={form.quantity.unit}
                        onValueChange={(value) => setForm(prev => ({
                          ...prev,
                          quantity: { ...prev.quantity, unit: value }
                        }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kg">Kilograms</SelectItem>
                          <SelectItem value="g">Grams</SelectItem>
                          <SelectItem value="bundles">Bundles</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-primary">Collection Location</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={getCurrentLocation}
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      Get GPS
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="latitude">Latitude</Label>
                      <Input
                        id="latitude"
                        type="number"
                        step="any"
                        value={form.location.latitude}
                        onChange={(e) => setForm(prev => ({
                          ...prev,
                          location: { ...prev.location, latitude: parseFloat(e.target.value) || 0 }
                        }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="longitude">Longitude</Label>
                      <Input
                        id="longitude"
                        type="number"
                        step="any"
                        value={form.location.longitude}
                        onChange={(e) => setForm(prev => ({
                          ...prev,
                          location: { ...prev.location, longitude: parseFloat(e.target.value) || 0 }
                        }))}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Address/Location Description</Label>
                    <Textarea
                      id="address"
                      value={form.location.address}
                      onChange={(e) => setForm(prev => ({
                        ...prev,
                        location: { ...prev.location, address: e.target.value }
                      }))}
                      placeholder="Describe the collection location..."
                      required
                    />
                  </div>
                </div>

                {/* Quality Assessment */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary">Initial Quality Assessment</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="moisture">Estimated Moisture %</Label>
                      <Input
                        id="moisture"
                        type="number"
                        step="0.1"
                        value={form.initialQuality.moisture}
                        onChange={(e) => setForm(prev => ({
                          ...prev,
                          initialQuality: { ...prev.initialQuality, moisture: parseFloat(e.target.value) || 0 }
                        }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="appearance">Appearance</Label>
                      <Select
                        value={form.initialQuality.appearance}
                        onValueChange={(value) => setForm(prev => ({
                          ...prev,
                          initialQuality: { ...prev.initialQuality, appearance: value }
                        }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Excellent">Excellent</SelectItem>
                          <SelectItem value="Good">Good</SelectItem>
                          <SelectItem value="Fair">Fair</SelectItem>
                          <SelectItem value="Poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="notes">Collection Notes</Label>
                    <Textarea
                      id="notes"
                      value={form.initialQuality.notes}
                      onChange={(e) => setForm(prev => ({
                        ...prev,
                        initialQuality: { ...prev.initialQuality, notes: e.target.value }
                      }))}
                      placeholder="Any additional observations or notes..."
                    />
                  </div>
                </div>

                {/* Photo Upload */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary">Collection Photos</h3>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <div className="space-y-2">
                      <Label htmlFor="photos" className="cursor-pointer">
                        <span className="text-primary hover:underline">Upload photos</span>
                        <span className="text-muted-foreground"> or drag and drop</span>
                      </Label>
                      <Input
                        id="photos"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                      <p className="text-xs text-muted-foreground">
                        {form.photos.length} photo(s) selected
                      </p>
                    </div>
                  </div>
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
                      Submitting to Blockchain...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-5 w-5" />
                      Submit Collection Event
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};