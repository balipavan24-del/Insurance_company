import { useEffect, useMemo, useState } from 'react';
import { modalOverlayClass, modalPanelClass } from '../../../components/AnimatedModal/AnimatedModal';
import './NewVehicle.css';


export const BRAND_MODEL_VARIANT_DUMMY_DATA = {
  'Maruti Suzuki': [
    { model: 'Swift', variants: ['LXi', 'VXi', 'ZXi'] },
    { model: 'Baleno', variants: ['Sigma', 'Delta', 'Alpha'] },
    { model: 'Brezza', variants: ['LXi', 'VXi', 'ZXi'] },
    { model: 'Fronx', variants: ['Sigma', 'Delta', 'Alpha'] },
    { model: 'Grand Vitara', variants: ['Sigma', 'Delta', 'Alpha'] }
  ],
  Hyundai: [
    { model: 'i20', variants: ['Magna', 'Sportz', 'Asta'] },
    { model: 'Creta', variants: ['E', 'S', 'SX'] },
    { model: 'Venue', variants: ['E', 'S(O)', 'SX'] },
    { model: 'Verna', variants: ['EX', 'S', 'SX(O)'] },
    { model: 'Alcazar', variants: ['Prestige', 'Platinum', 'Signature'] }
  ],
  Honda: [
    { model: 'City', variants: ['SV', 'V', 'ZX'] },
    { model: 'Amaze', variants: ['E', 'S', 'VX'] },
    { model: 'Elevate', variants: ['SV', 'V', 'ZX'] },
    { model: 'WR-V', variants: ['SV', 'VX', 'ZX'] }
  ],
  Tata: [
    { model: 'Punch', variants: ['Pure', 'Adventure', 'Accomplished'] },
    { model: 'Nexon', variants: ['Smart', 'Pure', 'Creative'] },
    { model: 'Harrier', variants: ['Smart', 'Pure', 'Fearless'] },
    { model: 'Safari', variants: ['Smart', 'Pure', 'Accomplished'] },
    { model: 'Tiago', variants: ['XE', 'XT', 'XZ'] }
  ],
  Mahindra: [
    { model: 'XUV700', variants: ['MX', 'AX3', 'AX5'] },
    { model: 'Scorpio-N', variants: ['Z2', 'Z4', 'Z8'] },
    { model: 'Thar', variants: ['AX OPT', 'LX', 'Earth Edition'] },
    { model: 'XUV300', variants: ['W2', 'W4', 'W6'] },
    { model: 'Bolero', variants: ['B4', 'B6', 'B6 OPT'] }
  ],
  Toyota: [
    { model: 'Glanza', variants: ['E', 'S', 'G'] },
    { model: 'Innova Hycross', variants: ['GX', 'VX', 'ZX'] },
    { model: 'Urban Cruiser Hyryder', variants: ['E', 'S', 'V'] },
    { model: 'Fortuner', variants: ['4x2', '4x4', 'Legender'] }
  ],
  Kia: [
    { model: 'Sonet', variants: ['HTE', 'HTK', 'HTX'] },
    { model: 'Seltos', variants: ['HTE', 'HTK+', 'GTX+'] },
    { model: 'Carens', variants: ['Premium', 'Prestige', 'Luxury'] },
    { model: 'Syros', variants: ['HTK', 'HTX', 'HTX+'] }
  ],
  Volkswagen: [
    { model: 'Polo', variants: ['Trendline', 'Comfortline', 'Highline'] },
    { model: 'Virtus', variants: ['Comfortline', 'Highline', 'GT'] },
    { model: 'Taigun', variants: ['Comfortline', 'Highline', 'GT'] }
  ],
  Ford: [
    { model: 'Figo', variants: ['Ambiente', 'Titanium', 'Titanium Blu'] },
    { model: 'EcoSport', variants: ['Ambiente', 'Trend', 'Titanium'] },
    { model: 'Aspire', variants: ['Ambiente', 'Trend', 'Titanium'] }
  ],
  Renault: [
    { model: 'Kwid', variants: ['RXE', 'RXL', 'RXT'] },
    { model: 'Kiger', variants: ['RXE', 'RXL', 'RXT'] },
    { model: 'Triber', variants: ['RXE', 'RXL', 'RXZ'] }
  ],
  Nissan: [
    { model: 'Magnite', variants: ['XE', 'XL', 'XV'] },
    { model: 'Sunny', variants: ['XE', 'XL', 'XV Premium'] },
    { model: 'Kicks', variants: ['XL', 'XV', 'XV Premium'] }
  ],
  Skoda: [
    { model: 'Slavia', variants: ['Active', 'Ambition', 'Style'] },
    { model: 'Kushaq', variants: ['Active', 'Ambition', 'Style'] },
    { model: 'Kylaq', variants: ['Classic', 'Signature', 'Prestige'] }
  ]
};

export const BIKE_BRAND_MODEL_VARIANT_DUMMY_DATA = {
  Hero: [
    { model: 'Splendor Plus', variants: ['Standard', 'Drum', 'Disc', 'ABS', 'Top'] },
    { model: 'HF Deluxe', variants: ['Kick Start', 'Self Start', 'i3S'] },
    { model: 'Xtreme 125R', variants: ['ABS', 'IBS'] }
  ],
  Honda: [
    { model: 'Shine 125', variants: ['Drum', 'Disc'] },
    { model: 'SP 125', variants: ['Drum', 'Disc'] },
    { model: 'Unicorn', variants: ['Standard', 'OBD2'] }
  ],
  TVS: [
    { model: 'Apache RTR 160', variants: ['Drum', 'Disc', '4V'] },
    { model: 'Raider 125', variants: ['Single Seat', 'Split Seat', 'SmartXonnect'] },
    { model: 'Jupiter', variants: ['Drum', 'ZX', 'Classic'] }
  ],
  Bajaj: [
    { model: 'Pulsar 150', variants: ['Single Disc', 'Twin Disc'] },
    { model: 'Pulsar NS200', variants: ['ABS', 'Bluetooth'] },
    { model: 'Platina 110', variants: ['Drum', 'ABS'] }
  ],
  'Royal Enfield': [
    { model: 'Classic 350', variants: ['Redditch', 'Halcyon', 'Signals'] },
    { model: 'Hunter 350', variants: ['Retro', 'Metro Dapper', 'Metro Rebel'] },
    { model: 'Meteor 350', variants: ['Fireball', 'Stellar', 'Supernova'] }
  ],
  Yamaha: [
    { model: 'FZ-S Fi', variants: ['Standard', 'Deluxe'] },
    { model: 'R15 V4', variants: ['Metallic Red', 'Dark Knight', 'M'] },
    { model: 'MT-15', variants: ['Standard', 'Deluxe'] }
  ],
  Suzuki: [
    { model: 'Access 125', variants: ['Drum', 'Disc', 'Ride Connect'] },
    { model: 'Gixxer', variants: ['Single Disc', 'Dual Tone'] },
    { model: 'V-Strom SX', variants: ['Standard', 'Tour Edition'] }
  ],
  KTM: [
    { model: '125 Duke', variants: ['Standard', 'ABS'] },
    { model: '200 Duke', variants: ['Standard', 'GP Edition'] },
    { model: '390 Duke', variants: ['Standard', 'Gen-3'] }
  ],
  'Ola Electric': [
    { model: 'S1 X', variants: ['2kWh', '3kWh', '4kWh'] },
    { model: 'S1 Air', variants: ['Standard', 'Pro'] },
    { model: 'S1 Pro', variants: ['Gen2', 'Gen3'] }
  ],
  Ather: [
    { model: '450S', variants: ['Standard', 'Pro Pack'] },
    { model: '450X', variants: ['2.9kWh', '3.7kWh'] },
    { model: 'Rizta', variants: ['S', 'Z'] }
  ]
};

export const THREE_WHEELER_BRAND_MODEL_VARIANT_DUMMY_DATA = {
  Bajaj: [
    { model: 'RE Auto', variants: ['Passenger', 'Cargo', 'CNG'] },
    { model: 'Maxima Z', variants: ['CNG', 'Diesel', 'Cargo'] },
    { model: 'Compact RE', variants: ['Standard', 'Deluxe'] }
  ],
  Piaggio: [
    { model: 'Ape City', variants: ['Petrol', 'CNG', 'XP'] },
    { model: 'Ape Xtra', variants: ['Cargo', 'CNG', 'Diesel'] },
    { model: 'Ape E-City', variants: ['Electric', 'FX'] }
  ],
  Mahindra: [
    { model: 'Alfa', variants: ['Passenger', 'Cargo', 'CNG'] },
    { model: 'Treo', variants: ['Zor', 'Plus', 'Cargo'] },
    { model: 'Zor Grand', variants: ['Standard', 'Premium'] }
  ],
  TVS: [
    { model: 'King Duramax', variants: ['Diesel', 'CNG', 'Cargo'] },
    { model: 'King Kargo', variants: ['Cargo', 'Refrigerated'] },
    { model: 'King Deluxe', variants: ['Passenger', 'CNG'] }
  ],
  Atul: [
    { model: 'Shakti', variants: ['Petrol', 'CNG', 'Cargo'] },
    { model: 'Gemini', variants: ['Passenger', 'School Van'] },
    { model: 'Smart', variants: ['Standard', 'Deluxe'] }
  ],
  'Force Motors': [
    { model: 'Trump 40', variants: ['Diesel', 'CNG'] },
    { model: 'Traveller', variants: ['School Van', 'Passenger'] }
  ]
};

export const THREE_WHEELER_FUEL_TYPE_OPTIONS = ['Petrol', 'CNG', 'Diesel', 'Electric'];

const THREE_WHEELER_WIZARD_YEAR_OPTIONS = ['2025', '2024', '2023', '2022', '2021', 'Older'];
const THREE_WHEELER_WIZARD_POLICY_OPTIONS = ['New Insurance', 'Renewal'];

const THREE_WHEELER_WIZARD_STEPS = [
          { field: 'vehicleType', stepLabel: 'Select Vehicle Type', heading: 'Select Vehicle Type', subtitle: 'Choose your three-wheeler category', layout: 'list' },
          { field: 'manufacturer', stepLabel: 'Select Manufacturer', heading: 'Select Manufacturer', subtitle: 'Pick your three-wheeler brand', layout: 'grid' },
          { field: 'model', stepLabel: 'Select Model', heading: 'Select Model', subtitle: 'Popular models for your vehicle', layout: 'grid' },
          { field: 'registrationYear', stepLabel: 'Registration Year', heading: 'Registration Year', subtitle: 'When was your vehicle registered?', layout: 'grid-3' },
          { field: 'policyType', stepLabel: 'Policy Type', heading: 'Policy Type', subtitle: 'How would you like to proceed?', hint: 'Select an option to view tailored plans', layout: 'list' },
];

function getThreeWheelerWizardConfig() {
  const manufacturers = Object.keys(THREE_WHEELER_BRAND_MODEL_VARIANT_DUMMY_DATA);
  const models = Object.values(THREE_WHEELER_BRAND_MODEL_VARIANT_DUMMY_DATA)
    .flatMap((entries) => entries.map((entry) => entry.model));

  return {
    flowTitle: 'Three Wheeler Insurance',
    steps: THREE_WHEELER_WIZARD_STEPS,
        options: {
          vehicleType: ['Passenger Auto', 'Cargo Auto', 'Electric Auto'],
      manufacturer: manufacturers,
      model: models,
      registrationYear: THREE_WHEELER_WIZARD_YEAR_OPTIONS,
      policyType: THREE_WHEELER_WIZARD_POLICY_OPTIONS,
    },
  };
}

const THREE_WHEELER_WIZARD_EMPTY_FORM = {
  vehicleType: '',
  manufacturer: '',
  model: '',
  registrationYear: '',
  policyType: '',
};

// --- Commercial vehicle (Step 1–3 from UI) ---

/** Step 1 of 6 — Vehicle Category */
export const COMMERCIAL_VEHICLE_CATEGORIES = [
  'Truck',
  'Pickup',
  'LCV',
  'HCV',
  'Bus',
  'School Bus',
  'Taxi',
  'Delivery Van',
  'Fleet',
];

/** Step 2 of 6 — Manufacturer */
export const COMMERCIAL_MANUFACTURERS = [
  'Tata Motors',
  'Ashok Leyland',
  'Eicher',
  'BharatBenz',
  'Mahindra',
  'Force Motors',
];

/** Step 3 of 6 — Model (brand → model → variant) */
export const COMMERCIAL_BRAND_MODEL_VARIANT_DUMMY_DATA = {
  'Tata Motors': [
    { model: 'Ace', variants: ['Gold', 'HT', 'EV'] },
    { model: 'Intra', variants: ['V10', 'V20', 'V30'] },
    { model: 'Dost', variants: ['Lite', 'Plus', 'Strong'] },
    { model: 'Bolero Pickup', variants: ['XL', 'Camper Gold', 'Maxi Truck'] },
    { model: 'Canter', variants: ['Pro 1005', 'Pro 1109', 'Pro 3015'] },
    { model: 'Traveller', variants: ['Monobus', 'Winger', 'Magic Express'] },
  ],
  'Ashok Leyland': [
    { model: 'Dost', variants: ['Lite', 'Plus', 'Strong'] },
    { model: 'Partner', variants: ['4 Tyre', '6 Tyre', 'Super'] },
    { model: 'Boss', variants: ['LE', 'LX', 'EX'] },
    { model: 'Ecomet', variants: ['1212', '1412', '1612'] },
    { model: 'Bada Dost', variants: ['i4', 'i5', 'i6'] },
    { model: 'Viking', variants: ['City Bus', 'Staff Bus', 'School Bus'] },
  ],
  Eicher: [
    { model: 'Pro 2049', variants: ['CBC', 'HSD', 'FSD'] },
    { model: 'Pro 2059', variants: ['CBC', 'HSD', 'FSD'] },
    { model: 'Pro 3015', variants: ['CBC', 'HSD', 'FSD'] },
    { model: 'Pro 6028', variants: ['Tourist', 'Staff', 'School'] },
    { model: 'Skyline Pro', variants: ['3010', '5016', '6016'] },
    { model: 'Multix', variants: ['MX', 'MX+', 'Cargo'] },
  ],
  BharatBenz: [
    { model: '914R', variants: ['CBC', 'HSD', 'FSD'] },
    { model: '1217C', variants: ['CBC', 'HSD', 'FSD'] },
    { model: '1617R', variants: ['CBC', 'HSD', 'FSD'] },
    { model: '2823R', variants: ['CBC', 'HSD', 'FSD'] },
    { model: '3528R', variants: ['CBC', 'HSD', 'FSD'] },
    { model: 'Staff Bus', variants: ['32 Seater', '40 Seater', '52 Seater'] },
  ],
  Mahindra: [
    { model: 'Bolero Pickup', variants: ['XL', 'Camper Gold', 'Maxi Truck'] },
    { model: 'Jeeto', variants: ['Plus', 'Strong', 'CNG'] },
    { model: 'Supro', variants: ['Profit Truck', 'Cargo Van', 'Mini Van'] },
    { model: 'Furio', variants: ['7', '11', '14'] },
    { model: 'Blazo X', variants: ['28', '35', '42'] },
    { model: 'Cruzio', variants: ['Staff', 'School', 'Tourist'] },
  ],
  'Force Motors': [
    { model: 'Traveller', variants: ['Monobus', 'Winger', 'Urbania'] },
    { model: 'Shaktiman', variants: ['400', '425', '450'] },
    { model: 'Trump', variants: ['40', '45', '50'] },
    { model: 'Kargo King', variants: ['6.5T', '7.5T', '9T'] },
    { model: 'Urbania', variants: ['9 Seater', '13 Seater', '17 Seater'] },
    { model: 'Trax', variants: ['Cruiser', 'Toofan', 'Kargo'] },
  ],
};

/** Commercial flow — all 6 steps */
export const COMMERCIAL_TOTAL_STEPS = 6;

export const COMMERCIAL_STEP_SEQUENCE = [
  'vehicleCategory',
  'brand',
  'model',
  'payloadCapacity',
  'registrationYear',
  'policyType',
];

export const COMMERCIAL_FORM_SELECTION_KEYS = [
  'vehicleCategory',
  'brand',
  'model',
  'payloadCapacity',
  'registrationYear',
  'policyType',
];

export const COMMERCIAL_PAYLOAD_CAPACITY_OPTIONS = [
  'Up to 1 Ton',
  '1 – 3 Tons',
  '3 – 7 Tons',
  '7 – 12 Tons',
  '12+ Tons',
];

export const COMMERCIAL_REGISTRATION_YEAR_OPTIONS = [
  '2025',
  '2024',
  '2023',
  '2022',
  '2021',
  'Older',
];

export const COMMERCIAL_POLICY_TYPE_OPTIONS = [
  'New Policy',
  'Renewal',
  'Fleet Insurance',
];

export const COMMERCIAL_STEP_TITLES = {
  vehicleCategory: 'Vehicle Category',
  brand: 'Manufacturer',
  model: 'Select Model',
  payloadCapacity: 'Payload Capacity',
  registrationYear: 'Registration Year',
  policyType: 'Policy Type',
};

export const COMMERCIAL_STEP_HINTS = {
  vehicleCategory: 'Choose your commercial vehicle type',
  brand: 'Pick your vehicle brand',
  payloadCapacity: 'Total goods carrying capacity',
  policyType: 'How would you like to proceed?',
};

export const COMMERCIAL_SUMMARY_PANEL_FIELDS = [
  { key: 'vehicleCategory', label: 'Category' },
  { key: 'brand', label: 'Manufacturer' },
  { key: 'model', label: 'Model' },
  { key: 'payloadCapacity', label: 'Payload' },
  { key: 'registrationYear', label: 'Year' },
  { key: 'policyType', label: 'Policy' },
];

export const FUEL_TYPE_OPTIONS = ['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid'];
export const CITY_OPTIONS = [
  'Hyderabad',
  'Bengaluru',
  'Mumbai',
  'Delhi',
  'Chennai',
  'Pune',
  'Kolkata',
  'Ahmedabad',
  'Jaipur',
  'Lucknow',
  'Indore',
  'Bhopal',
  'Visakhapatnam',
  'Coimbatore',
  'Surat',
  'Nagpur',
  'Patna',
  'Chandigarh',
  'Noida',
  'Gurugram'
];
export const DELIVERY_TIMELINE_OPTIONS = ['Already Delivered', 'Within 7 Days', 'Within 30 Days', 'After 30 Days'];
export const REGISTRATION_YEAR_OPTIONS = ['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019'];
export const BIKE_ENGINE_CAPACITY_OPTIONS = [
  { value: 'Up to 110cc', subtitle: 'Commuter & scooters' },
  { value: '110cc - 150cc', subtitle: 'Daily commute' },
  { value: '150cc - 250cc', subtitle: 'Sporty & touring' },
  { value: 'Above 250cc', subtitle: 'Performance & cruisers' }
];
export const ENGINE_CAPACITY_BY_BRAND = {
  Mahindra: [
    {
      value: 'Up to 1000cc',
      subtitle: 'No major Mahindra cars in this segment'
    },
    {
      value: '1000cc - 1200cc',
      subtitle: 'Very limited segment; entry turbo range starts around 1197cc'
    },
    {
      value: '1200cc - 1500cc',
      subtitle: 'XUV 3XO (~1197cc), Thar base diesel (~1497cc)'
    },
    {
      value: '1500cc - 2000cc',
      subtitle: 'Thar 1997cc, XUV700 petrol, Scorpio N petrol'
    },
    {
      value: 'Above 2000cc',
      subtitle: 'Scorpio N, Thar, XUV700, Scorpio Classic (~2184cc diesel)'
    },
    {
      value: 'EV / Electric',
      subtitle: 'XUV400 EV, XUV 3XO EV, BE 6, XEV 9e'
    }
  ],
  'Maruti Suzuki': [
    { value: 'Up to 1000cc', subtitle: 'Alto K10, S-Presso, Celerio' },
    { value: '1000cc - 1200cc', subtitle: 'WagonR, Swift, Baleno, Dzire' },
    { value: '1200cc - 1500cc', subtitle: 'Brezza, Ertiga, XL6, Fronx' },
    { value: '1500cc - 2000cc', subtitle: 'Grand Vitara strong-hybrid range' },
    { value: 'Above 2000cc', subtitle: 'Limited in this segment for Maruti' },
    { value: 'EV / Electric', subtitle: 'Upcoming EV lineup (dummy data)' }
  ],
  Hyundai: [
    { value: 'Up to 1000cc', subtitle: 'Grand i10 Nios, Exter lower variants' },
    { value: '1000cc - 1200cc', subtitle: 'i20, Venue NA, Aura, Verna base' },
    { value: '1200cc - 1500cc', subtitle: 'Creta diesel, Venue turbo, Alcazar base' },
    { value: '1500cc - 2000cc', subtitle: 'Alcazar turbo petrol, Tucson base' },
    { value: 'Above 2000cc', subtitle: 'Tucson diesel upper range' },
    { value: 'EV / Electric', subtitle: 'Kona EV, Ioniq 5, Creta EV (dummy)' }
  ],
  Honda: [
    { value: 'Up to 1000cc', subtitle: 'Very limited segment for Honda' },
    { value: '1000cc - 1200cc', subtitle: 'Amaze lower petrol range' },
    { value: '1200cc - 1500cc', subtitle: 'City, Elevate, Amaze CVT range' },
    { value: '1500cc - 2000cc', subtitle: 'City hybrid e:HEV band' },
    { value: 'Above 2000cc', subtitle: 'Limited for current India lineup' },
    { value: 'EV / Electric', subtitle: 'Upcoming Honda EV lineup (dummy)' }
  ],
  Tata: [
    { value: 'Up to 1000cc', subtitle: 'Tiago, Punch CNG lower engines' },
    { value: '1000cc - 1200cc', subtitle: 'Altroz, Nexon petrol range' },
    { value: '1200cc - 1500cc', subtitle: 'Nexon diesel, Curvv lower range' },
    { value: '1500cc - 2000cc', subtitle: 'Harrier, Safari range' },
    { value: 'Above 2000cc', subtitle: 'Limited in India lineup' },
    { value: 'EV / Electric', subtitle: 'Tiago EV, Tigor EV, Punch EV, Nexon EV, Curvv EV' }
  ],
  Toyota: [
    { value: 'Up to 1000cc', subtitle: 'Limited in this segment' },
    { value: '1000cc - 1200cc', subtitle: 'Glanza, Taisor range' },
    { value: '1200cc - 1500cc', subtitle: 'Urban Cruiser Hyryder, Rumion range' },
    { value: '1500cc - 2000cc', subtitle: 'Innova Hycross petrol/hybrid band' },
    { value: 'Above 2000cc', subtitle: 'Fortuner and Hilux segment' },
    { value: 'EV / Electric', subtitle: 'Hybrid-heavy portfolio, EV upcoming (dummy)' }
  ],
  Kia: [
    { value: 'Up to 1000cc', subtitle: 'Sonet turbo lower range' },
    { value: '1000cc - 1200cc', subtitle: 'Sonet, Syros entry engines' },
    { value: '1200cc - 1500cc', subtitle: 'Seltos, Carens diesel/petrol mix' },
    { value: '1500cc - 2000cc', subtitle: 'Carens turbo and future SUV band' },
    { value: 'Above 2000cc', subtitle: 'Limited in current lineup' },
    { value: 'EV / Electric', subtitle: 'EV6, EV9, upcoming compact EVs (dummy)' }
  ],
  Volkswagen: [
    { value: 'Up to 1000cc', subtitle: 'Polo/entry turbo range' },
    { value: '1000cc - 1200cc', subtitle: 'Virtus, Taigun 1.0 TSI' },
    { value: '1200cc - 1500cc', subtitle: 'Virtus GT, Taigun GT 1.5 TSI' },
    { value: '1500cc - 2000cc', subtitle: 'Global models placeholder (dummy)' },
    { value: 'Above 2000cc', subtitle: 'Performance imports only (dummy)' },
    { value: 'EV / Electric', subtitle: 'ID family future availability (dummy)' }
  ],
  Ford: [
    { value: 'Up to 1000cc', subtitle: 'Figo lower segment (legacy)' },
    { value: '1000cc - 1200cc', subtitle: 'Figo/Aspire petrol band (legacy)' },
    { value: '1200cc - 1500cc', subtitle: 'EcoSport, Aspire diesel range (legacy)' },
    { value: '1500cc - 2000cc', subtitle: 'EcoSport petrol upper band (legacy)' },
    { value: 'Above 2000cc', subtitle: 'Endeavour category (legacy)' },
    { value: 'EV / Electric', subtitle: 'Global EV lineup placeholder (dummy)' }
  ],
  Renault: [
    { value: 'Up to 1000cc', subtitle: 'Kwid lower segment' },
    { value: '1000cc - 1200cc', subtitle: 'Kiger, Triber petrol band' },
    { value: '1200cc - 1500cc', subtitle: 'Duster-type segment placeholder (dummy)' },
    { value: '1500cc - 2000cc', subtitle: 'Premium SUV placeholder (dummy)' },
    { value: 'Above 2000cc', subtitle: 'Limited in India lineup' },
    { value: 'EV / Electric', subtitle: 'Renault EV roadmap placeholder (dummy)' }
  ],
  Nissan: [
    { value: 'Up to 1000cc', subtitle: 'Compact lower segment (limited)' },
    { value: '1000cc - 1200cc', subtitle: 'Magnite turbo and NA range' },
    { value: '1200cc - 1500cc', subtitle: 'Kicks and compact SUV band' },
    { value: '1500cc - 2000cc', subtitle: 'Global SUV segment placeholder (dummy)' },
    { value: 'Above 2000cc', subtitle: 'Limited for current local lineup' },
    { value: 'EV / Electric', subtitle: 'Leaf/Magnite EV future placeholder (dummy)' }
  ],
  Skoda: [
    { value: 'Up to 1000cc', subtitle: 'Entry segment mostly limited' },
    { value: '1000cc - 1200cc', subtitle: 'Kylaq and compact TSI band' },
    { value: '1200cc - 1500cc', subtitle: 'Slavia, Kushaq, Kylaq 1.5 range' },
    { value: '1500cc - 2000cc', subtitle: 'Global sedan/SUV placeholder (dummy)' },
    { value: 'Above 2000cc', subtitle: 'Performance imports placeholder (dummy)' },
    { value: 'EV / Electric', subtitle: 'Enyaq and EV roadmap placeholder (dummy)' }
  ]
};

export const STEP_SEQUENCE = [
  'brand',
  'model',
  'variant',
  'fuelType',
  'registrationYear',
  'city',
  'deliveryTimeline',
  'contactDetails'
];

export const FIELD_LABELS = {
  brand: 'Brand',
  model: 'Model',
  engine: 'Engine Capacity',
  variant: 'Variant',
  fuelType: 'Fuel Type',
  registrationYear: 'Registration Year',
  city: 'City',
  deliveryTimeline: 'Delivery Timeline',
  contactDetails: 'Contact Details',
  name: 'Name',
  mobile: 'Mobile'
};

export const STEP_TITLES = {
  brand: 'Select your car brand',
  model: 'Select your car model',
  engine: 'Select engine capacity',
  variant: 'Select your car variant',
  fuelType: 'Select fuel type',
  registrationYear: 'Select registration year',
  city: 'Select your city',
  deliveryTimeline: 'When will you start using the car?',
  contactDetails: 'Almost done'
};

export const SUMMARY_SEQUENCE = [
  'brand',
  'model',
  'engine',
  'variant',
  'fuelType',
  'registrationYear',
  'city',
  'deliveryTimeline'
];

export const SUMMARY_LABELS = {
  brand: 'Brand',
  model: 'Model',
  engine: 'Engine',
  variant: 'Variant',
  fuelType: 'Fuel',
  registrationYear: 'Year',
  city: 'City',
  deliveryTimeline: 'Delivery Time'
};

export const SUMMARY_PANEL_FIELDS = [
  { key: 'brand', label: 'Brand' },
  { key: 'model', label: 'Model' },
  { key: 'engine', label: 'Engine' },
  { key: 'variant', label: 'Variant' },
  { key: 'fuelType', label: 'Fuel' },
  { key: 'registrationYear', label: 'Year' },
  { key: 'city', label: 'City' },
  { key: 'deliveryTimeline', label: 'Delivery Time' }
];

const FORM_SELECTION_KEYS = [
  'brand',
  'model',
  'variant',
  'fuelType',
  'registrationYear',
  'city',
  'deliveryTimeline'
];

const isFormSelectionsComplete = (data, requiredKeys = FORM_SELECTION_KEYS) => (
  requiredKeys.every((key) => String(data[key] || '').trim())
);

const EMPTY_NEW_VEHICLE_FORM = {
  vehicleCategory: '',
  brand: '',
  model: '',
  payloadCapacity: '',
  policyType: '',
  engine: '',
  variant: '',
  fuelType: '',
  registrationYear: '',
  city: '',
  deliveryTimeline: '',
  name: '',
  mobile: '',
};

const mergeSelectionUpdate = (previousData, fieldName, rawValue) => {
  const nextState = {
    ...previousData,
    [fieldName]: rawValue
  };
  if (fieldName === 'vehicleCategory') {
    nextState.brand = '';
    nextState.model = '';
    nextState.variant = '';
  }
  if (fieldName === 'brand') {
    nextState.model = '';
    nextState.variant = '';
  }
  if (fieldName === 'model') {
    nextState.variant = '';
  }
  return nextState;
};

const SearchGlyph = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20L16.65 16.65" />
  </svg>
);

const LocationPinGlyph = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 21C15.7 17.6 18 14.7 18 11.5C18 8.5 15.5 6 12.5 6C9.5 6 7 8.5 7 11.5C7 14.7 9.3 17.6 13 21H12Z" />
    <circle cx="12.5" cy="11.2" r="1.7" />
  </svg>
);

const EngineGaugeGlyph = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M5 14a7 7 0 1 1 14 0" />
    <path d="M12 14l3.4-3.4" />
    <circle cx="12" cy="14" r="1.1" />
  </svg>
);

const FuelDropGlyph = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 4.8c1.7 2.3 3.8 4.7 3.8 7.2A3.8 3.8 0 0 1 12 15.8A3.8 3.8 0 0 1 8.2 12c0-2.5 2.1-4.9 3.8-7.2Z" />
  </svg>
);

const ElectricBoltGlyph = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M13.4 4.8L8.8 12h3.7L10.6 19.2l4.6-7.2h-3.7l1.9-7.2Z" />
  </svg>
);

const BikeGlyph = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <circle cx="6.2" cy="16.2" r="2.2" />
    <circle cx="17.8" cy="16.2" r="2.2" />
    <path d="M6.2 16.2l3.7-5.9h3.2l2.2 3.2h2.5" />
    <path d="M10.2 10.3h2.8" />
    <path d="M13 10.3l-1.3-2.1" />
    <path d="M14.9 13.5h-3.7" />
  </svg>
);

const ChevronUpGlyph = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M6 14l6-6 6 6" />
  </svg>
);

const PlateGlyph = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none">
    <rect x="4" y="7" width="16" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M7 10.5h10M7 13.5h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const SummaryFieldIcon = ({ fieldKey, vehicleType }) => {
  switch (fieldKey) {
    case 'brand':
    case 'model':
      return vehicleType === 'bike' ? (
        <BikeGlyph />
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <circle cx="7.2" cy="15.2" r="2" />
          <circle cx="16.8" cy="15.2" r="2" />
          <path d="M5.6 13.4l1.8-3.2h5.2l1.8 3.2" />
          <path d="M14.4 12.2h2.1l1.8 1.7" />
        </svg>
      );
    case 'engine':
      return <EngineGaugeGlyph />;
    case 'variant':
  return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M12 4.2l1.5 3.3L17 9l-3.5 1.5L12 14l-1.5-3.5L7 9l3.5-1.5L12 4.2Z" />
          <path d="M18.4 13.4l.8 1.7 1.8.8-1.8.8-.8 1.8-.8-1.8-1.8-.8 1.8-.8.8-1.7Z" />
        </svg>
      );
    case 'fuel':
    case 'fuelType':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M7 6.2h5.6v11.6H7z" />
          <path d="M12.6 8.4h2l1.4 1.3v5.3" />
          <path d="M9.4 12.2h1.8" />
        </svg>
      );
    case 'registrationYear':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <rect x="5.2" y="6.7" width="13.6" height="12" rx="2" />
          <path d="M8.5 4.8v3M15.5 4.8v3M5.2 10.1h13.6" />
        </svg>
      );
    case 'city':
      return <LocationPinGlyph />;
    case 'deliveryTimeline':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <circle cx="12" cy="12" r="7" />
          <path d="M12 8.4v4.2l2.9 1.8" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <circle cx="12" cy="12" r="1.5" />
    </svg>
  );
}
};

function NewVehicleForm({
  onBackToVehicleCheck,
  onContinue,
  vehicleType = 'car',
  selectedCategory = 'motor-car',
  motionClosing = false,
}) {
  const isCommercial = selectedCategory === 'motor-commercial-vehicle';
  const resolvedVehicleType = selectedCategory === 'motor-bike'
    ? 'bike'
    : isCommercial
      ? 'commercial'
      : vehicleType;

  const BIKE_FUEL_CARD_OPTIONS = [
    { value: 'Petrol', tone: 'is-petrol', icon: <FuelDropGlyph /> },
    { value: 'Electric', tone: 'is-electric', icon: <ElectricBoltGlyph /> }
  ];
  const DELIVERY_TIMELINE_CARD_OPTIONS = [
    { value: 'Already using', icon: '✓', tone: 'is-green' },
    { value: 'Within a few days', icon: '◷', tone: 'is-blue' },
    { value: 'Within a week', icon: '◉', tone: 'is-purple' },
    { value: 'Within a month', icon: '◔', tone: 'is-orange' }
  ];
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [suppressAutoNextAfterSummaryEdit, setSuppressAutoNextAfterSummaryEdit] = useState(false);
  const [carFormData, setCarFormData] = useState({ ...EMPTY_NEW_VEHICLE_FORM });

  const activeStepSequence = useMemo(() => {
    if (resolvedVehicleType === 'commercial') {
      return COMMERCIAL_STEP_SEQUENCE;
    }
    if (resolvedVehicleType === 'bike') {
      return ['brand', 'model', 'engine', 'variant', 'fuelType', 'registrationYear', 'city', 'deliveryTimeline', 'contactDetails'];
    }
    return STEP_SEQUENCE;
  }, [resolvedVehicleType]);

  const requiredSelectionKeys = useMemo(() => {
    if (resolvedVehicleType === 'commercial') {
      return COMMERCIAL_FORM_SELECTION_KEYS;
    }
    if (resolvedVehicleType === 'bike') {
      return ['brand', 'model', 'engine', 'variant', 'fuelType', 'registrationYear', 'city', 'deliveryTimeline'];
    }
    return FORM_SELECTION_KEYS;
  }, [resolvedVehicleType]);

  const lastStepIndex = Math.max(0, activeStepSequence.length - 1);
  const safeStepIndex = Math.min(Math.max(0, currentStepIndex), lastStepIndex);
  const currentField = activeStepSequence[safeStepIndex] ?? 'brand';
  const vehicleTypeTitle = resolvedVehicleType === 'bike'
    ? 'Bike'
    : resolvedVehicleType === 'commercial'
      ? 'Commercial Vehicle'
      : 'Car';
  const vehicleTypeLower = resolvedVehicleType === 'bike'
    ? 'bike'
    : resolvedVehicleType === 'commercial'
      ? 'commercial vehicle'
      : 'car';

  const brandModelVariantData = useMemo(() => {
    if (resolvedVehicleType === 'bike') {
      return BIKE_BRAND_MODEL_VARIANT_DUMMY_DATA;
    }
    if (resolvedVehicleType === 'commercial') {
      return COMMERCIAL_BRAND_MODEL_VARIANT_DUMMY_DATA;
    }
    return BRAND_MODEL_VARIANT_DUMMY_DATA;
  }, [resolvedVehicleType]);

  useEffect(() => {
    setCurrentStepIndex(0);
    setSearchText('');
    setErrorMessage('');
    setSuppressAutoNextAfterSummaryEdit(false);
    setCarFormData({ ...EMPTY_NEW_VEHICLE_FORM });
  }, [resolvedVehicleType, selectedCategory]);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousBodyOverflow;
    };
  }, []);

  const modelOptions = useMemo(
    () => (brandModelVariantData[carFormData.brand] || []).map((option) => option.model),
    [brandModelVariantData, carFormData.brand]
  );

  const variantOptions = useMemo(() => {
    const selectedModelData = (brandModelVariantData[carFormData.brand] || [])
      .find((option) => option.model === carFormData.model);
    return selectedModelData?.variants || [];
  }, [brandModelVariantData, carFormData.brand, carFormData.model]);

  const engineOptions = useMemo(
    () => ENGINE_CAPACITY_BY_BRAND[carFormData.brand] || [],
    [carFormData.brand]
  );

  const optionValues = useMemo(() => {
    switch (currentField) {
      case 'vehicleCategory':
        return COMMERCIAL_VEHICLE_CATEGORIES;
      case 'brand':
        return resolvedVehicleType === 'commercial'
          ? COMMERCIAL_MANUFACTURERS
          : Object.keys(brandModelVariantData);
      case 'model':
        return modelOptions;
      case 'engine':
        return resolvedVehicleType === 'bike' ? BIKE_ENGINE_CAPACITY_OPTIONS : engineOptions;
      case 'variant':
        return variantOptions;
      case 'fuelType':
        return FUEL_TYPE_OPTIONS;
      case 'registrationYear':
        return REGISTRATION_YEAR_OPTIONS;
      case 'city':
        return CITY_OPTIONS;
      case 'deliveryTimeline':
        return DELIVERY_TIMELINE_OPTIONS;
      default:
        return [];
    }
  }, [currentField, modelOptions, variantOptions, engineOptions, brandModelVariantData, resolvedVehicleType]);

  const filteredOptionValues = useMemo(() => {
    if (!searchText.trim()) {
      return optionValues;
    }
    return optionValues.filter((option) => {
      if (currentField === 'engine') {
        const searchableText = `${option.value}`.toLowerCase();
        return searchableText.includes(searchText.trim().toLowerCase());
      }
      return String(option).toLowerCase().includes(searchText.trim().toLowerCase());
    });
  }, [optionValues, searchText, currentField]);

  const summaryPanelData = useMemo(() => {
    const fields = resolvedVehicleType === 'commercial'
      ? COMMERCIAL_SUMMARY_PANEL_FIELDS
      : SUMMARY_PANEL_FIELDS.filter((field) => (resolvedVehicleType === 'bike' ? true : field.key !== 'engine'));

    return fields.map((field) => ({
      key: field.key,
      label: field.label,
      value: carFormData[field.key] || '-',
      stepIndex: activeStepSequence.indexOf(field.key),
    }));
  }, [carFormData, resolvedVehicleType, activeStepSequence]);

  const hasCompletedSelectionDetails = useMemo(
    () => isFormSelectionsComplete(carFormData, requiredSelectionKeys),
    [carFormData, requiredSelectionKeys]
  );

  const updateFieldValue = (fieldName, value) => {
    setCarFormData((previousState) => mergeSelectionUpdate(previousState, fieldName, value));
  };

  const validateCurrentStep = () => {
    if (currentField === 'contactDetails') {
      const userName = String(carFormData.name || '').trim();
      const mobileNumber = String(carFormData.mobile || '').trim();
      if (!userName) {
        setErrorMessage('Please enter your full name.');
        return false;
      }
      if (!/^\d{10}$/.test(mobileNumber)) {
        setErrorMessage('Please enter a valid 10 digit mobile number.');
        return false;
      }
      return true;
    }

    const currentValue = String(carFormData[currentField] || '').trim();
    if (!currentValue) {
      const label = resolvedVehicleType === 'commercial'
        ? (COMMERCIAL_STEP_TITLES[currentField] ?? 'this field').toLowerCase()
        : (FIELD_LABELS[currentField] ?? 'this field').toLowerCase();
      setErrorMessage(`Please select ${label}.`);
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      return;
    }
    setErrorMessage('');
    if (currentField === 'contactDetails') {
      onContinue?.(carFormData);
      return;
    }
    setSearchText('');
    setCurrentStepIndex((previous) => {
      const p = Math.min(Math.max(0, previous), lastStepIndex);
      return Math.min(p + 1, lastStepIndex);
    });
  };

  const handleBack = () => {
    const idx = safeStepIndex;
    if (idx === 0) {
      onBackToVehicleCheck?.();
      return;
    }
    setSearchText('');
    setErrorMessage('');
    setCurrentStepIndex(idx - 1);
  };

  const contactDetailsStepIndex = activeStepSequence.indexOf('contactDetails');

  const handleContinueToViewPlans = () => {
    if (!hasCompletedSelectionDetails || contactDetailsStepIndex < 0) {
      return;
    }
    setErrorMessage('');
    setSuppressAutoNextAfterSummaryEdit(false);
    setSearchText('');
    setCurrentStepIndex(Math.min(Math.max(0, contactDetailsStepIndex), lastStepIndex));
  };

  const searchPlaceholder = useMemo(() => {
    if (currentField === 'brand') {
      return 'Search brand...';
    }
    if (currentField === 'city') {
      return 'Search city...';
    }
    if (currentField === 'model') {
      return 'Search model...';
    }
    if (currentField === 'variant') {
      return 'Search variant...';
    }
    return `Search ${(FIELD_LABELS[currentField] ?? 'options').toLowerCase()}...`;
  }, [currentField]);

  const showBrandStyleSearch = resolvedVehicleType !== 'commercial' && (
    currentField === 'brand'
    || currentField === 'model'
    || currentField === 'variant'
  );

  const handleStepSelection = (rawValue) => {
    if (!currentField || currentField === 'contactDetails') {
      return;
    }

    if (resolvedVehicleType === 'commercial') {
      setCarFormData((previousState) => mergeSelectionUpdate(previousState, currentField, rawValue));
      setErrorMessage('');
      return;
    }

    const mergedForm = mergeSelectionUpdate(carFormData, currentField, rawValue);
    updateFieldValue(currentField, rawValue);
    setErrorMessage('');

    const afterComplete = isFormSelectionsComplete(mergedForm, requiredSelectionKeys);
    if (!afterComplete) {
      setSuppressAutoNextAfterSummaryEdit(false);
    }

    const shouldAutoAdvance = currentField !== 'contactDetails' && safeStepIndex < lastStepIndex;

    if (!shouldAutoAdvance) {
      return;
    }

    if (suppressAutoNextAfterSummaryEdit && afterComplete) {
      return;
    }

    setSearchText('');
    setCurrentStepIndex((previous) => {
      const p = Math.min(Math.max(0, previous), lastStepIndex);
      return Math.min(p + 1, lastStepIndex);
    });
  };

  const renderStepInput = () => {
    const isCityStep = currentField === 'city';
    const commercialHint = COMMERCIAL_STEP_HINTS[currentField];

    if (currentField === 'vehicleCategory') {
  return (
        <>
          {commercialHint && <p className="new-car-delivery-help">{commercialHint}</p>}
          <div className="new-car-options-grid is-brand-grid">
            {COMMERCIAL_VEHICLE_CATEGORIES.map((option) => (
              <button
                key={option}
                type="button"
                className={`new-car-option-item${carFormData.vehicleCategory === option ? ' is-selected' : ''}`}
                onClick={() => handleStepSelection(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      );
    }

    if (currentField === 'deliveryTimeline') {
      return (
        <div className="new-car-delivery-wrap">
          <p className="new-car-delivery-help">Helps us tailor accurate plans and pricing.</p>
          <div className="new-car-delivery-grid">
            {DELIVERY_TIMELINE_CARD_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`new-car-delivery-item${carFormData.deliveryTimeline === option.value ? ' is-selected' : ''}`}
                onClick={() => handleStepSelection(option.value)}
              >
                <span className={`new-car-delivery-icon ${option.tone}`} aria-hidden="true">{option.icon}</span>
                <span className="new-car-delivery-label">{option.value}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            className={`new-car-delivery-unsure${carFormData.deliveryTimeline === 'I am not sure yet' ? ' is-selected' : ''}`}
            onClick={() => handleStepSelection('I am not sure yet')}
          >
            <span aria-hidden="true">?</span> I'm not sure yet
          </button>
        </div>
      );
    }

    if (currentField === 'contactDetails') {
      return (
        <div className="new-car-contact-form">
          <label htmlFor="newCarUserName" className="new-car-contact-label">Full Name</label>
          <input
            id="newCarUserName"
            type="text"
            value={carFormData.name}
            onChange={(event) => updateFieldValue('name', event.target.value)}
            placeholder="Enter your full name"
            maxLength={60}
            className="new-car-text-input"
          />

          <label htmlFor="newCarMobile" className="new-car-contact-label">Mobile Number</label>
          <input
            id="newCarMobile"
            type="tel"
            value={carFormData.mobile}
            onChange={(event) => updateFieldValue('mobile', event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                handleNext();
              }
            }}
            placeholder="10-digit mobile number"
            maxLength={10}
            className="new-car-text-input"
          />

          <button type="button" className="new-car-view-plans-btn" onClick={handleNext}>
            View Plans
          </button>
        </div>
      );
    }

    if (resolvedVehicleType === 'bike' && currentField === 'fuelType') {
      return (
        <div className="new-car-bike-fuel-wrap">
          <div className="new-car-bike-fuel-grid">
            {BIKE_FUEL_CARD_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`new-car-bike-fuel-item${carFormData.fuelType === option.value ? ' is-selected' : ''}`}
                onClick={() => handleStepSelection(option.value)}
              >
                <span className={`new-car-bike-fuel-icon ${option.tone}`} aria-hidden="true">
                  {option.icon}
                </span>
                <span className="new-car-bike-fuel-label">{option.value}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    const isEngineStep = currentField === 'engine';
    const isBikeVariantStep = resolvedVehicleType === 'bike' && currentField === 'variant';
    const isCommercialGridStep = resolvedVehicleType === 'commercial' && (
      currentField === 'brand' || currentField === 'model' || currentField === 'variant'
    );
    return (
      <>
        {commercialHint && resolvedVehicleType === 'commercial' && (
          <p className="new-car-delivery-help">{commercialHint}</p>
        )}
        {!isEngineStep && !isBikeVariantStep && !isCommercialGridStep && (
          <div className={`new-car-search-wrap${isCityStep ? ' new-car-search-wrap--city' : ''}${showBrandStyleSearch ? ' new-car-search-wrap--brand' : ''}`}>
            {isCityStep && (
              <span className="new-car-city-search-icon" aria-hidden="true">
                <SearchGlyph />
              </span>
            )}
            <input
              type="text"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder={searchPlaceholder}
              className="new-car-search-input"
              aria-label={searchPlaceholder}
            />
          </div>
        )}
        <div
          className={`new-car-options-grid${currentField === 'brand' || currentField === 'vehicleCategory' ? ' is-brand-grid' : ''}${(currentField === 'model' || currentField === 'variant') ? ' is-single-column' : ''}${isCityStep ? ' is-city-list' : ''}${isEngineStep ? ' is-engine-grid' : ''}${isCommercialGridStep && currentField === 'model' ? ' is-brand-grid' : ''}`}
        >
          {filteredOptionValues.map((optionValue) => (
            <button
              key={currentField === 'engine' ? optionValue.value : optionValue}
              type="button"
              className={`new-car-option-item${carFormData[currentField] === (currentField === 'engine' ? optionValue.value : optionValue) ? ' is-selected' : ''}${currentField === 'engine' ? ' is-engine' : ''}${isCityStep ? ' is-city-item' : ''}`}
              onClick={() => {
                const rawValue = currentField === 'engine' ? optionValue.value : optionValue;
                handleStepSelection(rawValue);
              }}
            >
              {currentField === 'engine' ? (
                <span className="new-car-engine-row">
                  <span className="new-car-engine-icon" aria-hidden="true">
                    <EngineGaugeGlyph />
                  </span>
                  <span className="new-car-engine-option-content">
                    <span className="new-car-engine-title">{optionValue.value}</span>
                    {optionValue.subtitle ? <span className="new-car-engine-subtitle">{optionValue.subtitle}</span> : null}
                  </span>
                </span>
              ) : isCityStep ? (
                <span className="new-car-city-option-content">
                  <span className="new-car-city-icon" aria-hidden="true">
                    <LocationPinGlyph />
                  </span>
                  <span>{optionValue}</span>
              </span>
            ) : (
                optionValue
              )}
              </button>
          ))}
          {filteredOptionValues.length === 0 && (
            <p className="new-car-empty-state">No results found.</p>
            )}
          </div>
      </>
    );
  };

  const commercialStepOptions = useMemo(() => {
    switch (currentField) {
      case 'vehicleCategory':
        return COMMERCIAL_VEHICLE_CATEGORIES;
      case 'brand':
        return COMMERCIAL_MANUFACTURERS;
      case 'model':
        return modelOptions;
      case 'payloadCapacity':
        return COMMERCIAL_PAYLOAD_CAPACITY_OPTIONS;
      case 'registrationYear':
        return COMMERCIAL_REGISTRATION_YEAR_OPTIONS;
      case 'policyType':
        return COMMERCIAL_POLICY_TYPE_OPTIONS;
      default:
        return [];
    }
  }, [currentField, modelOptions]);

  const commercialGridClass = currentField === 'registrationYear'
    ? 'commercial-grid commercial-grid--three-col'
    : (currentField === 'payloadCapacity' || currentField === 'policyType')
      ? 'commercial-grid commercial-grid--stack'
      : 'commercial-grid';

  const commercialCanContinue = Boolean(String(carFormData[currentField] || '').trim());

  const handleCommercialContinue = () => {
    if (!commercialCanContinue) {
      const label = (COMMERCIAL_STEP_TITLES[currentField] ?? 'an option').toLowerCase();
      setErrorMessage(`Please select ${label}.`);
      return;
    }
    setErrorMessage('');
    if (safeStepIndex >= lastStepIndex) {
      onContinue?.(carFormData);
      return;
    }
    setCurrentStepIndex(safeStepIndex + 1);
  };

  const handleCommercialBack = () => {
    if (safeStepIndex === 0) {
      onBackToVehicleCheck?.();
      return;
    }
    setErrorMessage('');
    setCurrentStepIndex(safeStepIndex - 1);
  };

  if (resolvedVehicleType === 'commercial') {
    const commercialStepLabel = `Step ${safeStepIndex + 1} of ${COMMERCIAL_TOTAL_STEPS} · ${COMMERCIAL_STEP_TITLES[currentField] || ''}`;

    return (
      <section
        className={modalOverlayClass(motionClosing, 'commercial-overlay')}
        role="dialog"
        aria-modal="true"
        aria-label="Commercial vehicle insurance form"
        data-motor-flow="brand-new-commercial-vehicle"
        data-motor-selected-category={selectedCategory}
      >
        <section className={modalPanelClass(motionClosing, 'commercial-modal')}>
          <header className="commercial-header">
            <button type="button" className="commercial-icon-btn" onClick={handleCommercialBack} aria-label="Go back">
              <span className="commercial-back-circle" aria-hidden="true">←</span>
            </button>
            <div className="commercial-header-text">
              <h2>Commercial Vehicle Insurance</h2>
              <p>{commercialStepLabel}</p>
          </div>
            <button
              type="button"
              className="commercial-icon-btn commercial-close-btn"
              onClick={onBackToVehicleCheck}
              aria-label="Close commercial vehicle form"
            >
            ×
          </button>
        </header>

          <div className="commercial-progress" aria-hidden="true">
            {Array.from({ length: COMMERCIAL_TOTAL_STEPS }, (_, index) => (
              <span key={index} className={index <= safeStepIndex ? 'is-filled' : ''} />
          ))}
        </div>

          <div className="commercial-body">
            <h3>{COMMERCIAL_STEP_TITLES[currentField]}</h3>
            {COMMERCIAL_STEP_HINTS[currentField] && (
              <p className="commercial-hint">{COMMERCIAL_STEP_HINTS[currentField]}</p>
            )}
            <div className={commercialGridClass}>
              {commercialStepOptions.map((option) => (
              <button
                key={option}
                type="button"
                  className={`commercial-grid-btn${carFormData[currentField] === option ? ' is-selected' : ''}`}
                  onClick={() => handleStepSelection(option)}
              >
                {option}
              </button>
            ))}
          </div>
            {currentField === 'policyType' && (
              <p className="commercial-step-note">Select an option to view tailored plans</p>
            )}
            {errorMessage && <p className="commercial-error">{errorMessage}</p>}
        </div>

          <footer className="commercial-footer">
            <span className="commercial-footer-count">{safeStepIndex + 1} / {COMMERCIAL_TOTAL_STEPS}</span>
          <button
            type="button"
              className="commercial-footer-continue"
              onClick={handleCommercialContinue}
              disabled={!commercialCanContinue}
          >
            Tap to continue <span aria-hidden="true">→</span>
          </button>
        </footer>
        </section>
      </section>
    );
  }

  const resolvedStepTitle = (STEP_TITLES[currentField] || '')
    .replace(/car/gi, vehicleTypeLower)
    .replace(/^select your bike/i, 'Select your bike')
    .replace(/^select your car/i, `Select your ${vehicleTypeLower}`)
    .replace(/when will you start using the car\?/i, `When will you start using the ${vehicleTypeLower}?`);

  return (
    <section
      className={modalOverlayClass(motionClosing, 'new-car-overlay')}
      role="dialog"
      aria-modal="true"
      aria-label={`New ${vehicleTypeLower} details form`}
      data-motor-flow="brand-new-without-vehicle-number"
      data-motor-selected-category={selectedCategory}
      data-motor-vehicle-type={resolvedVehicleType}
    >
      <section className={modalPanelClass(motionClosing, 'new-car-modal')}>
        <div className="new-car-left-pane">
          <header className="new-car-left-header">
            <button type="button" className="new-car-top-back-btn" onClick={handleBack} aria-label="Go back">
              <span aria-hidden="true">←</span>
            </button>
            <h2>{resolvedStepTitle}</h2>
          </header>

          {renderStepInput()}

          {errorMessage && <p className="new-car-error">{errorMessage}</p>}

          {currentField !== 'contactDetails' && hasCompletedSelectionDetails && (
            <div className="new-car-edit-continue-row">
              <button type="button" className="new-car-edit-continue-btn" onClick={handleContinueToViewPlans}>
                Continue
              </button>
      </div>
          )}
        </div>

        <aside className="new-car-summary-pane">
          <div className="new-car-summary-header">
            <h3>
              <span className="new-car-summary-head-icon" aria-hidden="true">
                <ChevronUpGlyph />
              </span>
              Your {vehicleTypeTitle} Details
            </h3>
            <button
              type="button"
              className="new-car-close-icon"
              onClick={onBackToVehicleCheck}
              aria-label={`Close new ${vehicleTypeLower} popup`}
            >
              ×
            </button>
          </div>
          <div className="new-car-summary-scroll">
            <div className="new-car-summary-list">
            {summaryPanelData.map((item) => (
              <div key={item.key} className={`new-car-summary-item${item.value === '-' ? ' is-empty' : ' is-filled'}`}>
                <span className="new-car-summary-item-icon" aria-hidden="true">
                  <SummaryFieldIcon fieldKey={item.key} vehicleType={resolvedVehicleType} />
                </span>
                <div className="new-car-summary-item-content">
                  <p>{item.label}</p>
                  <span>{item.value}</span>
                </div>
                {item.value !== '-' && item.stepIndex >= 0 && (
                  <button
                    type="button"
                    className="new-car-summary-edit-btn"
                    aria-label={`Edit ${item.label}`}
                    onClick={() => {
                      setSuppressAutoNextAfterSummaryEdit(true);
                      setSearchText('');
                      setErrorMessage('');
                      setCurrentStepIndex(item.stepIndex);
                    }}
                  >
                    <span aria-hidden="true">✎</span>
                  </button>
                )}
              </div>
            ))}
            </div>
          </div>
          <footer className="new-car-summary-footer">
            <div className="new-car-summary-item is-filled new-car-summary-item--no-plate new-car-summary-vehicle-card">
              <span className="new-car-summary-item-icon" aria-hidden="true">
                <PlateGlyph />
              </span>
              <div className="new-car-summary-item-content">
                <p>Vehicle number</p>
                <span>Not assigned — continue without registration number</span>
              </div>
            </div>
          </footer>
        </aside>
      </section>
    </section>
  );
}


// --- Three wheeler: compact step wizard (original UI) ---

function WizardCheckBadgeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
      <path
        d="M8 12.2l2.2 2.2L16 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ThreeWheelerNewVehicleWizard({
  selectedCategory = 'motor-three-wheeler',
  motionClosing = false,
  onBackToVehicleCheck,
  onContinue,
}) {
  const categoryId = selectedCategory || 'motor-three-wheeler';
  const config = useMemo(() => getThreeWheelerWizardConfig(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState({ ...THREE_WHEELER_WIZARD_EMPTY_FORM });

  useEffect(() => {
    setStepIndex(0);
    setFormData({ ...THREE_WHEELER_WIZARD_EMPTY_FORM });
  }, [categoryId]);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousBodyOverflow;
    };
  }, []);

  const { flowTitle, steps, options } = config;
  const currentStep = steps[stepIndex];
  const currentField = currentStep.field;
  const currentValue = formData[currentField];
  const stepOptions = options[currentField] || [];
  const isLastStep = stepIndex === steps.length - 1;
  const canContinue = Boolean(String(currentValue || '').trim());

  const layoutClass = currentStep.layout === 'grid-3'
    ? 'new-vehicle__options--grid-3'
    : currentStep.layout === 'grid'
      ? 'new-vehicle__options--grid'
      : 'new-vehicle__options--list';

  const handleSelect = (value) => {
    const nextFormData = { ...formData, [currentField]: value };
    setFormData(nextFormData);

    if (isLastStep) {
      onContinue?.({ ...nextFormData, vehicleCategory: categoryId });
      return;
    }
    setStepIndex((prev) => prev + 1);
  };

  const handleBack = () => {
    if (stepIndex === 0) {
      onBackToVehicleCheck?.();
      return;
    }
    setStepIndex((prev) => prev - 1);
  };

  const handleContinue = () => {
    if (!canContinue) {
      return;
    }
    if (isLastStep) {
      onContinue?.({ ...formData, vehicleCategory: categoryId });
      return;
    }
    setStepIndex((prev) => prev + 1);
  };

  return (
    <section
      className={modalOverlayClass(motionClosing, 'new-vehicle-overlay')}
      role="dialog"
      aria-modal="true"
      aria-label={flowTitle}
      data-motor-flow="brand-new-vehicle"
      data-motor-selected-category={categoryId}
    >
      <div className={modalPanelClass(motionClosing, 'new-vehicle')}>
        <header className="new-vehicle__header">
          <div className="new-vehicle__header-start">
            {stepIndex === 0 ? (
              <span className="new-vehicle__badge" aria-hidden="true">
                <WizardCheckBadgeIcon />
              </span>
            ) : (
              <button type="button" className="new-vehicle__back" onClick={handleBack} aria-label="Go back">
                ←
              </button>
            )}
          </div>
          <div className="new-vehicle__header-text">
            <h2>{flowTitle}</h2>
            <p>
              Step {stepIndex + 1} of {steps.length} · {currentStep.stepLabel}
            </p>
          </div>
          <button type="button" className="new-vehicle__close" onClick={onBackToVehicleCheck} aria-label="Close">
            ×
          </button>
        </header>

        <div className="new-vehicle__progress" aria-hidden="true">
          {steps.map((step, index) => (
            <span
              key={step.field}
              className={`new-vehicle__progress-segment${index <= stepIndex ? ' is-filled' : ''}`}
            />
          ))}
        </div>

        <div className="new-vehicle__body">
          <h3>{currentStep.heading}</h3>
          <p className="new-vehicle__subtitle">{currentStep.subtitle}</p>

          <div className={`new-vehicle__options ${layoutClass}`} role="listbox" aria-label={currentStep.heading}>
            {stepOptions.map((option) => (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={currentValue === option}
                className={`new-vehicle__option${currentValue === option ? ' is-selected' : ''}`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>

          {currentStep.hint && <p className="new-vehicle__hint">{currentStep.hint}</p>}
        </div>

        <footer className="new-vehicle__footer">
          <span className="new-vehicle__step-count">
            {stepIndex + 1} / {steps.length}
          </span>
          <button
            type="button"
            className={`new-vehicle__continue${canContinue ? '' : ' is-disabled'}`}
            onClick={handleContinue}
            disabled={!canContinue}
          >
            Tap to continue <span aria-hidden="true">→</span>
          </button>
        </footer>
      </div>
    </section>
  );
}


// --- Motor home card + modal ---
export const NEW_VEHICLE_FLOW = 'brand-new-vehicle-without-number';

export const NEW_VEHICLE_CARD = {
  icon: '✧',
  subtitle: 'Get insurance for your new vehicle in minutes',
  arrow: '→',
};

const CATEGORY_LABELS = {
  'motor-bike': 'Bike',
  'motor-car': 'Car',
  'motor-three-wheeler': 'Three Wheeler',
  'motor-commercial-vehicle': 'Commercial Vehicle',
};

export const getVehicleType = (categoryId) => {
  if (categoryId === 'motor-bike') {
    return 'bike';
  }
  if (categoryId === 'motor-three-wheeler') {
    return 'threeWheeler';
  }
  if (categoryId === 'motor-commercial-vehicle') {
    return 'commercial';
  }
  return 'car';
};

export const getVehicleTypeLabel = (categoryId) => (
  CATEGORY_LABELS[categoryId] || CATEGORY_LABELS['motor-car']
);

export const getNewVehicleCardTitle = (categoryId) => (
  `Bought a Brand New ${getVehicleTypeLabel(categoryId)}?`
);

export const buildNewVehicleLeadPayload = ({ categoryId, vehicleType, formDetails }) => ({
  flow: NEW_VEHICLE_FLOW,
  selectedCategory: categoryId,
  vehicleType,
  vehicleNumber: null,
  continuedWithoutVehicleNumber: true,
  newCarDetails: formDetails,
});

export function BoughtNewVehicleCard({ categoryId, onOpen }) {
  return (
    <button type="button" className="motor-brand-new-car-card" onClick={onOpen}>
      <span className="motor-brand-new-car-icon" aria-hidden="true">{NEW_VEHICLE_CARD.icon}</span>
      <span className="motor-brand-new-car-content">
        <span className="motor-brand-new-car-title">{getNewVehicleCardTitle(categoryId)}</span>
        <span className="motor-brand-new-car-subtitle">{NEW_VEHICLE_CARD.subtitle}</span>
      </span>
      <span className="motor-brand-new-car-arrow" aria-hidden="true">{NEW_VEHICLE_CARD.arrow}</span>
    </button>
  );
}

export function BoughtNewVehicleModal({ categoryId, motionClosing, onBackToVehicleCheck, onContinue }) {
  if (categoryId === 'motor-three-wheeler') {
    return (
      <ThreeWheelerNewVehicleWizard
        key="motor-three-wheeler-wizard"
        selectedCategory={categoryId}
        motionClosing={motionClosing}
        onBackToVehicleCheck={onBackToVehicleCheck}
        onContinue={onContinue}
      />
    );
  }

  const vehicleType = getVehicleType(categoryId);
  return (
    <NewVehicleForm
      key={`${categoryId || 'motor-car'}-${vehicleType}`}
      selectedCategory={categoryId || 'motor-car'}
      vehicleType={vehicleType}
      motionClosing={motionClosing}
      onBackToVehicleCheck={onBackToVehicleCheck}
      onContinue={onContinue}
    />
  );
}
