export interface CollectionEvent {
  id: string;
  timestamp: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
    region: string;
  };
  collector: {
    id: string;
    name: string;
    cooperative: string;
    certification: string;
  };
  species: {
    scientificName: string;
    commonName: string;
    localName: string;
  };
  quantity: {
    amount: number;
    unit: string;
  };
  initialQuality: {
    moisture: number;
    appearance: string;
    notes: string;
  };
  photos: string[];
  blockchainTxId: string;
}

export interface QualityTest {
  id: string;
  eventId: string;
  testDate: string;
  laboratory: {
    name: string;
    accreditation: string;
    location: string;
  };
  results: {
    moisture: number;
    pesticides: 'PASSED' | 'FAILED';
    heavyMetals: 'PASSED' | 'FAILED';
    dnaBarcode: {
      verified: boolean;
      confidence: number;
    };
    activeCompounds: {
      withanolides?: number;
      alkaloids?: number;
    };
  };
  certificateUrl: string;
  blockchainTxId: string;
}

export interface ProcessingStep {
  id: string;
  eventId: string;
  timestamp: string;
  processor: {
    name: string;
    location: string;
    license: string;
  };
  stepType: 'DRYING' | 'GRINDING' | 'EXTRACTION' | 'PACKAGING';
  conditions: {
    temperature?: number;
    humidity?: number;
    duration?: number;
  };
  batchId: string;
  blockchainTxId: string;
}

export interface ProvenanceBundle {
  batchId: string;
  qrCode: string;
  product: {
    name: string;
    scientificName: string;
    formulation: string;
    netWeight: string;
    manufacturingDate: string;
    expiryDate: string;
  };
  collectionEvents: CollectionEvent[];
  qualityTests: QualityTest[];
  processingSteps: ProcessingStep[];
  sustainability: {
    fairTrade: boolean;
    organic: boolean;
    biodiversityImpact: string;
    carbonFootprint: number;
  };
  compliance: {
    ayushApproval: boolean;
    exportCertification: boolean;
    gmpCompliant: boolean;
  };
}