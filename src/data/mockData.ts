import { ProvenanceBundle } from '@/types/traceability';

export const mockProvenanceData: ProvenanceBundle = {
  batchId: "ASH-2024-001-KR",
  qrCode: "https://trace.ayurchain.com/batch/ASH-2024-001-KR",
  product: {
    name: "Premium Ashwagandha Root Powder",
    scientificName: "Withania somnifera",
    formulation: "Fine Root Powder",
    netWeight: "100g",
    manufacturingDate: "2024-01-15",
    expiryDate: "2026-01-14"
  },
  collectionEvents: [
    {
      id: "CE-001",
      timestamp: "2023-11-15T06:30:00Z",
      location: {
        latitude: 17.3850,
        longitude: 78.4867,
        address: "Medak District, Telangana",
        region: "Deccan Plateau"
      },
      collector: {
        id: "COL-001",
        name: "Ravi Kumar",
        cooperative: "Telangana Medicinal Plants Cooperative",
        certification: "Certified Organic Collector"
      },
      species: {
        scientificName: "Withania somnifera",
        commonName: "Ashwagandha",
        localName: "Asgandh"
      },
      quantity: {
        amount: 50,
        unit: "kg"
      },
      initialQuality: {
        moisture: 8.5,
        appearance: "Fresh, unblemished roots",
        notes: "Harvested at optimal maturity, early morning collection"
      },
      photos: [
        "/api/photos/collection-001.jpg",
        "/api/photos/collector-001.jpg"
      ],
      blockchainTxId: "0x1a2b3c4d5e6f7890abcdef"
    }
  ],
  qualityTests: [
    {
      id: "QT-001",
      eventId: "CE-001",
      testDate: "2023-11-17T14:00:00Z",
      laboratory: {
        name: "National Institute of Ayurveda Testing Lab",
        accreditation: "NABL Accredited (Certificate: TC-001)",
        location: "Hyderabad, Telangana"
      },
      results: {
        moisture: 7.2,
        pesticides: 'PASSED',
        heavyMetals: 'PASSED',
        dnaBarcode: {
          verified: true,
          confidence: 98.5
        },
        activeCompounds: {
          withanolides: 3.2
        }
      },
      certificateUrl: "/api/certificates/QT-001.pdf",
      blockchainTxId: "0x2b3c4d5e6f7890abcdef12"
    }
  ],
  processingSteps: [
    {
      id: "PS-001",
      eventId: "CE-001",
      timestamp: "2023-11-20T10:00:00Z",
      processor: {
        name: "AyurTech Processing Pvt Ltd",
        location: "Bangalore, Karnataka",
        license: "AYUSH-MFG-2023-001"
      },
      stepType: 'DRYING',
      conditions: {
        temperature: 45,
        humidity: 15,
        duration: 72
      },
      batchId: "ASH-2024-001-KR",
      blockchainTxId: "0x3c4d5e6f7890abcdef123"
    },
    {
      id: "PS-002",
      eventId: "CE-001",
      timestamp: "2023-11-25T14:30:00Z",
      processor: {
        name: "AyurTech Processing Pvt Ltd",
        location: "Bangalore, Karnataka",
        license: "AYUSH-MFG-2023-001"
      },
      stepType: 'GRINDING',
      conditions: {
        temperature: 25,
        duration: 4
      },
      batchId: "ASH-2024-001-KR",
      blockchainTxId: "0x4d5e6f7890abcdef1234"
    }
  ],
  sustainability: {
    fairTrade: true,
    organic: true,
    biodiversityImpact: "Sustainable wild collection with 30% plant population retention",
    carbonFootprint: 2.1
  },
  compliance: {
    ayushApproval: true,
    exportCertification: true,
    gmpCompliant: true
  }
};