export type FlooringType = 'garage' | 'residential' | 'commercial' | 'industrial' | 'showroom' | 'other';

export type FlooringFinishId = 'metallic' | 'flake' | 'quartz' | 'highgloss';

export interface FlooringFinish {
  id: FlooringFinishId;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  image: string;
  texturePattern: string;
  bestFor: string[];
  specs: {
    durability: string;
    glossLevel: string;
    slipResistance: string;
    cureTime: string;
    thickness: string;
    tensileStrength: string;
    warranty: string;
  };
  features: string[];
  swatches: {
    name: string;
    colorHex: string;
    secondaryColor?: string;
  }[];
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  equipment: string;
  duration: string;
  highlight: string;
}

export interface GalleryProject {
  id: string;
  title: string;
  category: 'garages' | 'showrooms' | 'commercial' | 'aviation' | 'residential';
  categoryLabel: string;
  sqft: number;
  finishType: string;
  finishId: FlooringFinishId;
  location: string;
  duration: string;
  image: string;
  description: string;
  tags: string[];
}

export interface QuoteFormData {
  // Step 1
  flooringType: FlooringType;
  
  // Step 2
  sqft: number;
  floorCondition: 'new' | 'minor_cracks' | 'heavy_damage' | 'existing_coating';
  preferredFinish: FlooringFinishId;
  addons: {
    moistureBarrier: boolean;
    coveBase: boolean;
    antiSlipAdditive: boolean;
    highTrafficClearTopcoat: boolean;
  };
  notes: string;

  // Step 3
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  preferredTimeline: 'asap' | 'within_month' | '1_3_months' | 'planning';

  // State
  submissionId?: string;
  estimatedTotal?: number;
}
