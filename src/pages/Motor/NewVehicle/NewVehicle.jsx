import { useMemo, useState } from 'react';
import { modalOverlayClass, modalPanelClass } from '../../../components/AnimatedModal/AnimatedModal';
import './NewVehicle.css';

const inheritStep = (baseStep, overrides = {}) => ({ ...baseStep, ...overrides });

const NewVehicleTwoPanelShared = {
  registrationYear: {
    field: 'registrationYear',
    stepTitle: 'Select registration year',
    fieldLabel: 'Registration Year',
    summaryLabel: 'Year',
    options: ['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019'],
  },
  city: {
    field: 'city',
    stepTitle: 'Select your city',
    fieldLabel: 'City',
    summaryLabel: 'City',
    options: ['Hyderabad', 'Bengaluru', 'Mumbai', 'Delhi', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Indore', 'Bhopal', 'Visakhapatnam', 'Coimbatore', 'Surat', 'Nagpur', 'Patna', 'Chandigarh', 'Noida', 'Gurugram']
  },
  deliveryTimeline: {
    field: 'deliveryTimeline',
    fieldLabel: 'Delivery Timeline',
    summaryLabel: 'Delivery Time',
    deliveryCardOptions: [
      { value: 'Already using', icon: '✓', tone: 'is-green' },
      { value: 'Within a few days', icon: '◷', tone: 'is-blue' },
      { value: 'Within a week', icon: '◉', tone: 'is-purple' },
      { value: 'Within a month', icon: '◔', tone: 'is-orange' },
    ],
  },
  policyType: {
    field: 'policyType',
    stepTitle: 'Select policy type',
    fieldLabel: 'Policy Type',
    summaryLabel: 'Policy',
    options: ['Comprehensive Insurance', 'Third Party Insurance', 'Own Damage Cover'],
  },
  contactDetails: {
    field: 'contactDetails',
    stepTitle: 'Almost done',
    fieldLabel: 'Contact Details',
  },
};

const buildTwoPanelFlow = (stepsInOrder) => ({
  stepsInOrder,
  stepSequence: stepsInOrder.map((step) => step.field),
  selectionKeys: stepsInOrder
    .filter((step) => step.field !== 'contactDetails')
    .map((step) => step.field),
  summarySequence: stepsInOrder
    .filter((step) => step.summaryLabel)
    .map((step) => step.field),
});

const newcarData = {
  brandModelVariantData: {
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
  },
  ...buildTwoPanelFlow([
    {
      field: 'brand',
      stepTitle: 'Select your car brand',
      fieldLabel: 'Brand',
      summaryLabel: 'Brand',
    },
    {
      field: 'model',
      stepTitle: 'Select your car model',
      fieldLabel: 'Model',
      summaryLabel: 'Model',
    },
    {
      field: 'variant',
      stepTitle: 'Select your car variant',
      fieldLabel: 'Variant',
      summaryLabel: 'Variant',
    },
    {
      field: 'fuelType',
      stepTitle: 'Select fuel type',
      fieldLabel: 'Fuel Type',
      summaryLabel: 'Fuel',
      options: ['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid'],
    },
    NewVehicleTwoPanelShared.registrationYear,
    NewVehicleTwoPanelShared.city,
    inheritStep(NewVehicleTwoPanelShared.deliveryTimeline, {
      stepTitle: 'When will you start using the car?',
    }),
    NewVehicleTwoPanelShared.contactDetails,
  ]),
};

const newbikeData = {
  brandModelVariantData: {
    Hero: [
      { model: 'Splendor Plus', variants: ['Standard', 'Drum', 'Disc', 'ABS', 'Top'] },
      { model: 'HF Deluxe', variants: ['Kick Start', 'Self Start', 'i3S'] },
      { model: 'Xtreme 125R', variants: ['ABS', 'IBS'] },
    ],
    Honda: [
      { model: 'Shine 125', variants: ['Drum', 'Disc'] },
      { model: 'SP 125', variants: ['Drum', 'Disc'] },
      { model: 'Unicorn', variants: ['Standard', 'OBD2'] },
    ],
    TVS: [
      { model: 'Apache RTR 160', variants: ['Drum', 'Disc', '4V'] },
      { model: 'Raider 125', variants: ['Single Seat', 'Split Seat', 'SmartXonnect'] },
      { model: 'Jupiter', variants: ['Drum', 'ZX', 'Classic'] },
    ],
    Bajaj: [
      { model: 'Pulsar 150', variants: ['Single Disc', 'Twin Disc'] },
      { model: 'Pulsar NS200', variants: ['ABS', 'Bluetooth'] },
      { model: 'Platina 110', variants: ['Drum', 'ABS'] },
    ],
    'Royal Enfield': [
      { model: 'Classic 350', variants: ['Redditch', 'Halcyon', 'Signals'] },
      { model: 'Hunter 350', variants: ['Retro', 'Metro Dapper', 'Metro Rebel'] },
      { model: 'Meteor 350', variants: ['Fireball', 'Stellar', 'Supernova'] },
    ],
    Yamaha: [
      { model: 'FZ-S Fi', variants: ['Standard', 'Deluxe'] },
      { model: 'R15 V4', variants: ['Metallic Red', 'Dark Knight', 'M'] },
      { model: 'MT-15', variants: ['Standard', 'Deluxe'] },
    ],
    Suzuki: [
      { model: 'Access 125', variants: ['Drum', 'Disc', 'Ride Connect'] },
      { model: 'Gixxer', variants: ['Single Disc', 'Dual Tone'] },
      { model: 'V-Strom SX', variants: ['Standard', 'Tour Edition'] },
    ],
    KTM: [
      { model: '125 Duke', variants: ['Standard', 'ABS'] },
      { model: '200 Duke', variants: ['Standard', 'GP Edition'] },
      { model: '390 Duke', variants: ['Standard', 'Gen-3'] },
    ],
    'Ola Electric': [
      { model: 'S1 X', variants: ['2kWh', '3kWh', '4kWh'] },
      { model: 'S1 Air', variants: ['Standard', 'Pro'] },
      { model: 'S1 Pro', variants: ['Gen2', 'Gen3'] },
    ],
    Ather: [
      { model: '450S', variants: ['Standard', 'Pro Pack'] },
      { model: '450X', variants: ['2.9kWh', '3.7kWh'] },
      { model: 'Rizta', variants: ['S', 'Z'] },
    ],
  },
  ...buildTwoPanelFlow([
    {
      field: 'brand',
      stepTitle: 'Select your bike brand',
      fieldLabel: 'Brand',
      summaryLabel: 'Brand',
    },
    {
      field: 'model',
      stepTitle: 'Select your bike model',
      fieldLabel: 'Model',
      summaryLabel: 'Model',
    },
    {
      field: 'engine',
      stepTitle: 'Select engine capacity',
      fieldLabel: 'Engine Capacity',
      summaryLabel: 'Engine',
      engineCapacityOptions: [
        { value: 'Up to 110cc', subtitle: 'Commuter & scooters' },
        { value: '110cc - 150cc', subtitle: 'Daily commute' },
        { value: '150cc - 250cc', subtitle: 'Sporty & touring' },
        { value: 'Above 250cc', subtitle: 'Performance & cruisers' },
      ],
    },
    {
      field: 'variant',
      stepTitle: 'Select your bike variant',
      fieldLabel: 'Variant',
      summaryLabel: 'Variant',
    },
    {
      field: 'fuelType',
      stepTitle: 'Select fuel type',
      fieldLabel: 'Fuel Type',
      summaryLabel: 'Fuel',
      options: ['Petrol', 'Electric'],
      fuelCardOptions: [
        { value: 'Petrol', tone: 'is-petrol', iconKey: 'fuel' },
        { value: 'Electric', tone: 'is-electric', iconKey: 'electric' },
      ],
    },
    NewVehicleTwoPanelShared.registrationYear,
    NewVehicleTwoPanelShared.city,
    inheritStep(NewVehicleTwoPanelShared.deliveryTimeline, {
      stepTitle: 'When will you start using the bike?',
    }),
    NewVehicleTwoPanelShared.contactDetails,
  ]),
};

const newthreewheelerData = {
  flowTitle: 'Three Wheeler Insurance',
  brandModelVariantData: {
    Bajaj: [
      { model: 'RE Auto', variants: ['Passenger', 'Cargo', 'CNG'] },
      { model: 'Maxima Z', variants: ['CNG', 'Diesel', 'Cargo'] },
      { model: 'Compact RE', variants: ['Standard', 'Deluxe'] },
    ],
    Piaggio: [
      { model: 'Ape City', variants: ['Petrol', 'CNG', 'XP'] },
      { model: 'Ape Xtra', variants: ['Cargo', 'CNG', 'Diesel'] },
      { model: 'Ape E-City', variants: ['Electric', 'FX'] },
    ],
    Mahindra: [
      { model: 'Alfa', variants: ['Passenger', 'Cargo', 'CNG'] },
      { model: 'Treo', variants: ['Zor', 'Plus', 'Cargo'] },
      { model: 'Zor Grand', variants: ['Standard', 'Premium'] },
    ],
    TVS: [
      { model: 'King Duramax', variants: ['Diesel', 'CNG', 'Cargo'] },
      { model: 'King Kargo', variants: ['Cargo', 'Refrigerated'] },
      { model: 'King Deluxe', variants: ['Passenger', 'CNG'] },
    ],
    Atul: [
      { model: 'Shakti', variants: ['Petrol', 'CNG', 'Cargo'] },
      { model: 'Gemini', variants: ['Passenger', 'School Van'] },
      { model: 'Smart', variants: ['Standard', 'Deluxe'] },
    ],
    'Force Motors': [
      { model: 'Trump 40', variants: ['Diesel', 'CNG'] },
      { model: 'Traveller', variants: ['School Van', 'Passenger'] },
    ],
  },
  fuelTypeOptions: ['Petrol', 'CNG', 'Diesel', 'Electric'],
  ...buildTwoPanelFlow([
    {
      field: 'vehicleType',
      stepTitle: 'Select vehicle type',
      fieldLabel: 'Vehicle Type',
      summaryLabel: 'Type',
      options: ['Passenger Auto', 'Cargo Auto', 'Electric Auto'],
    },
    {
      field: 'brand',
      stepTitle: 'Select manufacturer',
      fieldLabel: 'Manufacturer',
      summaryLabel: 'Manufacturer',
    },
    {
      field: 'model',
      stepTitle: 'Select model',
      fieldLabel: 'Model',
      summaryLabel: 'Model',
    },
    {
      field: 'fuelType',
      stepTitle: 'Select fuel type',
      fieldLabel: 'Fuel Type',
      summaryLabel: 'Fuel',
      options: ['Petrol', 'CNG', 'Diesel', 'Electric'],
    },
    NewVehicleTwoPanelShared.registrationYear,
    NewVehicleTwoPanelShared.city,
    inheritStep(NewVehicleTwoPanelShared.deliveryTimeline, {
      stepTitle: 'When will you start using the three-wheeler?',
    }),
    NewVehicleTwoPanelShared.policyType,
    NewVehicleTwoPanelShared.contactDetails,
  ]),
};

const newcommercialData = {
  flowTitle: 'Commercial Vehicle Insurance',
  brandModelVariantData: {
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
  },
  ...buildTwoPanelFlow([
    {
      field: 'vehicleCategory',
      stepTitle: 'Select vehicle category',
      fieldLabel: 'Vehicle Category',
      summaryLabel: 'Category',
      options: [
        'Truck',
        'Pickup',
        'LCV',
        'HCV',
        'Bus',
        'School Bus',
        'Taxi',
        'Delivery Van',
        'Fleet',
      ],
    },
    {
      field: 'brand',
      stepTitle: 'Select manufacturer',
      fieldLabel: 'Manufacturer',
      summaryLabel: 'Manufacturer',
    },
    {
      field: 'model',
      stepTitle: 'Select model',
      fieldLabel: 'Model',
      summaryLabel: 'Model',
    },
    {
      field: 'payloadCapacity',
      stepTitle: 'Select payload capacity',
      fieldLabel: 'Payload Capacity',
      summaryLabel: 'Payload',
      options: [
        'Up to 1 Ton',
        '1 – 3 Tons',
        '3 – 7 Tons',
        '7 – 12 Tons',
        '12+ Tons',
      ],
    },
    NewVehicleTwoPanelShared.registrationYear,
    NewVehicleTwoPanelShared.city,
    inheritStep(NewVehicleTwoPanelShared.deliveryTimeline, {
      stepTitle: 'When will you start using the commercial vehicle?',
    }),
    NewVehicleTwoPanelShared.policyType,
    NewVehicleTwoPanelShared.contactDetails,
  ]),
};

const twoPanelEmptyForm = {
  vehicleType: '',
  vehicleCategory: '',
  brand: '',
  model: '',
  engine: '',
  variant: '',
  fuelType: '',
  payloadCapacity: '',
  registrationYear: '',
  city: '',
  deliveryTimeline: '',
  policyType: '',
  name: '',
  mobile: '',
};

const getFlowStep = (flowData, field) => flowData.stepsInOrder.find((step) => step.field === field);

const getFlowStepIndex = (flowData, field) => flowData.stepSequence.indexOf(field);

const isFlowSelectionsComplete = (flowData, data) => (
  flowData.selectionKeys.every((key) => String(data[key] || '').trim())
);

const mergeTwoPanelForm = (prev, field, value) => {
  const next = { ...prev, [field]: value };
  if (field === 'vehicleType' || field === 'vehicleCategory') {
    next.brand = '';
    next.model = '';
    next.variant = '';
    next.engine = '';
  }
  if (field === 'brand') {
    next.model = '';
    next.variant = '';
    next.engine = '';
  }
  if (field === 'model') {
    next.variant = '';
  }
  return next;
};

const sel = (active) => (active ? ' is-selected' : '');

function TwoPanelVehicleFlow({
  flowData,
  summaryTitle,
  ariaLabel,
  defaultBrandTitle,
  formIdPrefix,
  continueFields = ['brand'],
  catalogField = 'brand',
  motionClosing = false,
  onBackToVehicleCheck,
  onContinue,
}) {
  const brands = useMemo(() => Object.keys(flowData.brandModelVariantData), [flowData]);
  const stepSequence = flowData.stepSequence;

  const [stepIndex, setStepIndex] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [pauseAutoNext, setPauseAutoNext] = useState(false);
  const [formData, setFormData] = useState({ ...twoPanelEmptyForm });

  const currentField = stepSequence[stepIndex] ?? catalogField;
  const currentStep = getFlowStep(flowData, currentField);
  const lastIndex = Math.max(0, stepSequence.length - 1);
  const contactStepIndex = getFlowStepIndex(flowData, 'contactDetails');
  const isContinueStep = continueFields.includes(currentField);

  const modelOptions = useMemo(
    () => (flowData.brandModelVariantData[formData[catalogField]] || []).map((row) => row.model),
    [flowData, formData, catalogField],
  );

  const variantOptions = useMemo(() => {
    const row = (flowData.brandModelVariantData[formData[catalogField]] || [])
      .find((item) => item.model === formData.model);
    return row?.variants || [];
  }, [flowData, formData, catalogField]);

  const stepOptions = useMemo(() => {
    switch (currentField) {
      case 'vehicleType':
        return getFlowStep(flowData, 'vehicleType')?.options || [];
      case 'vehicleCategory':
        return getFlowStep(flowData, 'vehicleCategory')?.options || [];
      case 'payloadCapacity':
        return getFlowStep(flowData, 'payloadCapacity')?.options || [];
      case 'policyType':
        return getFlowStep(flowData, 'policyType')?.options || [];
      case 'model':
        return modelOptions;
      case 'engine':
        return getFlowStep(flowData, 'engine')?.engineCapacityOptions || [];
      case 'variant':
        return variantOptions;
      case 'fuelType':
        return getFlowStep(flowData, 'fuelType')?.options || [];
      case 'registrationYear':
        return getFlowStep(flowData, 'registrationYear')?.options || [];
      case 'city':
        return getFlowStep(flowData, 'city')?.options || [];
      default:
        return [];
    }
  }, [flowData, currentField, modelOptions, variantOptions]);

  const filteredBrands = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    if (!query) return brands;
    return brands.filter((brand) => brand.toLowerCase().includes(query));
  }, [brands, searchText]);

  const filteredOptions = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    if (!query) return stepOptions;
    return stepOptions.filter((option) => {
      if (currentField === 'engine') {
        return String(option.value).toLowerCase().includes(query);
      }
      return String(option).toLowerCase().includes(query);
    });
  }, [stepOptions, searchText, currentField]);

  const selectionsComplete = useMemo(
    () => isFlowSelectionsComplete(flowData, formData),
    [flowData, formData],
  );

  const pickValue = (field, value) => {
    setFormData((prev) => mergeTwoPanelForm(prev, field, value));
    setErrorMessage('');
  };

  const goBack = () => {
    if (stepIndex === 0) {
      onBackToVehicleCheck?.();
      return;
    }
    setSearchText('');
    setErrorMessage('');
    setStepIndex((prev) => prev - 1);
  };

  const goNext = () => {
    if (isContinueStep) {
      if (!String(formData[currentField] || '').trim()) {
        setErrorMessage(`Please select ${(currentStep?.fieldLabel || 'an option').toLowerCase()}.`);
        return;
      }
      setErrorMessage('');
      setSearchText('');
      setPauseAutoNext(false);
      setStepIndex((prev) => Math.min(prev + 1, lastIndex));
      return;
    }

    if (currentField === 'contactDetails') {
      const name = String(formData.name || '').trim();
      const mobile = String(formData.mobile || '').trim();
      if (!name) {
        setErrorMessage('Please enter your full name.');
        return;
      }
      if (!/^\d{10}$/.test(mobile)) {
        setErrorMessage('Please enter a valid 10 digit mobile number.');
        return;
      }
      onContinue?.(formData);
      return;
    }

    if (!String(formData[currentField] || '').trim()) {
      setErrorMessage(`Please select ${(currentStep?.fieldLabel || 'an option').toLowerCase()}.`);
      return;
    }

    setErrorMessage('');
    setSearchText('');
    setStepIndex((prev) => Math.min(prev + 1, lastIndex));
  };

  const onOptionPick = (value) => {
    const merged = mergeTwoPanelForm(formData, currentField, value);
    pickValue(currentField, value);
    if (currentField === 'contactDetails') return;
    if (!isFlowSelectionsComplete(flowData, merged)) setPauseAutoNext(false);
    if (stepIndex >= lastIndex || (pauseAutoNext && isFlowSelectionsComplete(flowData, merged))) return;
    setSearchText('');
    setStepIndex((prev) => Math.min(prev + 1, lastIndex));
  };

  const editSummaryField = (field) => {
    setPauseAutoNext(true);
    setSearchText('');
    setErrorMessage('');
    setStepIndex(getFlowStepIndex(flowData, field));
  };

  const jumpToContact = () => {
    if (!selectionsComplete || contactStepIndex < 0) return;
    setPauseAutoNext(false);
    setSearchText('');
    setErrorMessage('');
    setStepIndex(contactStepIndex);
  };

  const renderSearch = (placeholder, city = false) => (
    <div className={`nv-search-wrap${city ? ' nv-search-wrap--city' : ' nv-search-wrap--brand'}`}>
      <input
        type="text"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        placeholder={placeholder}
        className="nv-search-input"
        aria-label={placeholder}
      />
    </div>
  );

  const renderOptionGrid = (options, field, { brandGrid = false, singleCol = false, city = false, engine = false, pickOnly = false } = {}) => (
    <div className={`nv-options-grid${brandGrid ? ' is-brand-grid' : ''}${singleCol ? ' is-single-column' : ''}${city ? ' is-city-list' : ''}${engine ? ' is-engine-grid' : ''}`}>
      {options.map((option) => {
        const value = engine ? option.value : option;
        const label = engine ? option.value : option;
  return (
          <button
            key={label}
            type="button"
            className={`nv-option-item${sel(formData[field] === value)}${engine ? ' is-engine' : ''}${city ? ' is-city-item' : ''}`}
            onClick={() => {
              if (pickOnly) {
                pickValue(field, value);
                return;
              }
              if (field === catalogField) {
                onOptionPick(value);
                return;
              }
              onOptionPick(value);
            }}
          >
            {engine ? (
              <span className="nv-engine-option-content">
                <span className="nv-engine-title">{option.value}</span>
                {option.subtitle ? <span className="nv-engine-subtitle">{option.subtitle}</span> : null}
              </span>
            ) : value}
          </button>
        );
      })}
      {options.length === 0 && <p className="nv-empty-state">No results found.</p>}
    </div>
  );

  const renderFuelStep = () => {
    const fuelStep = getFlowStep(flowData, 'fuelType');
    const fuelCards = fuelStep?.fuelCardOptions;
    if (fuelCards?.length) {
      return (
        <div className="nv-fuel-wrap">
          <div className="nv-fuel-grid">
            {fuelCards.map((option) => (
              <button key={option.value} type="button" className={`nv-fuel-item${sel(formData.fuelType === option.value)}`} onClick={() => onOptionPick(option.value)}>
                <span className={`nv-fuel-icon ${option.tone}`} aria-hidden="true">●</span>
                <span className="nv-fuel-label">{option.value}</span>
              </button>
            ))}
          </div>
          </div>
      );
    }
    return renderOptionGrid(fuelStep?.options || [], 'fuelType', { brandGrid: true });
  };

  const renderContinueStep = () => {
    const isCatalogStep = currentField === catalogField;
    const options = isCatalogStep ? filteredBrands : stepOptions;
    const gridField = isCatalogStep ? catalogField : currentField;
    const gridProps = isCatalogStep
      ? { brandGrid: true }
      : { singleCol: currentField === 'vehicleType' || currentField === 'vehicleCategory' || currentField === 'policyType' };

    return (
      <>
        {isCatalogStep && renderSearch(`Search ${currentStep?.fieldLabel?.toLowerCase() || 'brand'}...`)}
        {renderOptionGrid(options, gridField, {
          ...gridProps,
        })}
      </>
    );
  };

  const renderLeftStep = () => {
    if (isContinueStep) {
      return renderContinueStep();
    }

    if (currentField === 'deliveryTimeline') {
      const cards = getFlowStep(flowData, 'deliveryTimeline')?.deliveryCardOptions || [];
      return (
        <div className="nv-delivery-wrap">
          <p className="nv-delivery-help">Helps us tailor accurate plans and pricing.</p>
          <div className="nv-delivery-grid">
            {cards.map((option) => (
              <button key={option.value} type="button" className={`nv-delivery-item${sel(formData.deliveryTimeline === option.value)}`} onClick={() => onOptionPick(option.value)}>
                <span className={`nv-delivery-icon ${option.tone}`} aria-hidden="true">{option.icon}</span>
                <span className="nv-delivery-label">{option.value}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (currentField === 'fuelType') {
      return renderFuelStep();
    }

    if (currentField === 'contactDetails') {
      return (
        <div className="nv-contact-form">
          <label htmlFor={`${formIdPrefix}Name`} className="nv-contact-label">Full Name</label>
          <input id={`${formIdPrefix}Name`} type="text" value={formData.name} onChange={(e) => pickValue('name', e.target.value)} placeholder="Enter your full name" className="nv-text-input" />
          <label htmlFor={`${formIdPrefix}Mobile`} className="nv-contact-label">Mobile Number</label>
          <input id={`${formIdPrefix}Mobile`} type="tel" value={formData.mobile} onChange={(e) => pickValue('mobile', e.target.value)} placeholder="10-digit mobile number" maxLength={10} className="nv-text-input" />
          <button type="button" className="nv-view-plans-btn" onClick={goNext}>View Plans</button>
        </div>
      );
    }

    const isCity = currentField === 'city';
    const isEngine = currentField === 'engine';
    const showSearch = currentField === 'model' || currentField === 'variant' || isCity;
    return (
      <>
        {showSearch && renderSearch(`Search ${currentStep?.fieldLabel?.toLowerCase() || 'option'}...`, isCity)}
        {renderOptionGrid(filteredOptions, currentField, {
          singleCol: currentField === 'model' || currentField === 'variant' || currentField === 'policyType' || currentField === 'payloadCapacity' || currentField === 'vehicleCategory',
          city: isCity,
          engine: isEngine,
        })}
      </>
    );
  };

  return (
    <section className={modalOverlayClass(motionClosing, 'nv-overlay')} role="dialog" aria-modal="true" aria-label={ariaLabel}>
      <section className={modalPanelClass(motionClosing, 'nv-modal')}>
        <div className="nv-left-pane">
          <header className="nv-left-header">
            <button type="button" className="nv-top-back-btn" onClick={goBack} aria-label="Go back">
              <span aria-hidden="true">←</span>
            </button>
            <h2>{currentStep?.stepTitle || defaultBrandTitle}</h2>
          </header>

          {renderLeftStep()}
          {errorMessage && <p className="nv-error">{errorMessage}</p>}

          {!isContinueStep && currentField !== 'contactDetails' && selectionsComplete && (
            <div className="nv-edit-continue-row">
              <button type="button" className="nv-edit-continue-btn" onClick={jumpToContact}>Continue</button>
            </div>
          )}
        </div>

        <aside className="nv-summary-pane">
          <div className="nv-summary-header">
            <h3>{summaryTitle}</h3>
            <button type="button" className="nv-close-icon" onClick={onBackToVehicleCheck} aria-label="Close">×</button>
          </div>
          <div className="nv-summary-scroll">
            <div className="nv-summary-list">
              {flowData.summarySequence.map((field) => {
                const step = getFlowStep(flowData, field);
                const value = String(formData[field] || '').trim() || '-';
                const filled = value !== '-';
                return (
                  <div key={field} className={`nv-summary-item${filled ? ' is-filled' : ' is-empty'}`}>
                    <span className="nv-summary-item-icon" aria-hidden="true">•</span>
                    <div className="nv-summary-item-content">
                      <p>{step?.summaryLabel}</p>
                      <span>{value}</span>
                    </div>
                    {filled && (
                      <button type="button" className="nv-summary-edit-btn" aria-label={`Edit ${step?.summaryLabel}`} onClick={() => editSummaryField(field)}>
                        <span aria-hidden="true">✎</span>
          </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <footer className="nv-summary-footer">
            <div className="nv-summary-item is-filled nv-summary-item--no-plate">
              <div className="nv-summary-item-content">
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

export function Newbike(props) {
  return (
    <TwoPanelVehicleFlow
      flowData={newbikeData}
      summaryTitle="Your Bike Details"
      ariaLabel="New bike details form"
      defaultBrandTitle="Select your bike brand"
      formIdPrefix="bike"
      {...props}
    />
  );
}

export function Newcar(props) {
  return (
    <TwoPanelVehicleFlow
      flowData={newcarData}
      summaryTitle="Your Car Details"
      ariaLabel="New car details form"
      defaultBrandTitle="Select your car brand"
      formIdPrefix="car"
      {...props}
    />
  );
}

export function Newthreewheeler(props) {
  return (
    <TwoPanelVehicleFlow
      flowData={newthreewheelerData}
      summaryTitle="Your Three Wheeler Details"
      ariaLabel="New three-wheeler details form"
      defaultBrandTitle="Select vehicle type"
      formIdPrefix="threewheeler"
      continueFields={['vehicleType', 'brand']}
      {...props}
    />
  );
}

export function Newcommercial(props) {
  return (
    <TwoPanelVehicleFlow
      flowData={newcommercialData}
      summaryTitle="Your Commercial Vehicle Details"
      ariaLabel="New commercial vehicle details form"
      defaultBrandTitle="Select vehicle category"
      formIdPrefix="commercial"
      continueFields={['vehicleCategory', 'brand']}
      {...props}
    />
  );
}
