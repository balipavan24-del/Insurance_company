export const GUEST_DUMMY_DATA = {
  titles: {
    heading: 'Browse Insurance Plans',
    subtitle: 'Complete the details below to find the best plans for you.',
    cardHeading: 'Vehicle Details',
    insuranceCardHeading: 'Insurance Details'
  },
  steps: [
    { id: 1, label: 'Vehicle Details', isActive: true },
    { id: 2, label: 'Insurance Details', isActive: false },
    { id: 3, label: 'Add-ons & Plans', isActive: false }
  ],
  vehicleTypeOptions: [
    { id: 'motor-car', label: 'Car' },
    { id: 'motor-bike', label: 'Bike' },
    { id: 'motor-three-wheeler', label: 'Three Wheeler' },
    { id: 'motor-four-wheeler', label: 'Four Wheeler' },
    { id: 'motor-commercial-vehicle', label: 'Commercial Vehicle' }
  ],
  commonOptions: {
    registrationYear: ['2014', '2016', '2018', '2020', '2022'],
    registrationCity: ['Jaipur', 'Hyderabad', 'Bengaluru', 'Chennai']
  },
  insuranceDetails: {
    defaultPreviousPolicyExpiryDate: '2026-04-06',
    previousInsurerOptions: ['Oriental Insurance', 'HDFC Ergo', 'ICICI Lombard', 'Bajaj Allianz'],
    defaultPreviousInsurer: 'Oriental Insurance',
    defaultHadClaimLastYear: 'no',
    defaultOwnershipChangedLast12Months: 'no'
  },
  addOns: [
    {
      id: 'zero-dep',
      name: 'Zero Depreciation',
      description: 'Full claim on depreciable parts like plastic and fiber components.',
      price: 1200
    },
    {
      id: 'roadside-assistance',
      name: 'Roadside Assistance',
      description: '24x7 towing, on-road repair help, and battery support.',
      price: 650
    },
    {
      id: 'engine-protect',
      name: 'Engine Protect',
      description: 'Coverage for water ingression and engine damage incidents.',
      price: 900
    },
    {
      id: 'consumables-cover',
      name: 'Consumables Cover',
      description: 'Covers nuts, bolts, oil, and other non-reusable consumables.',
      price: 500
    }
  ],
  plans: [
    {
      id: 'basic',
      name: 'Basic Plan',
      description: 'Third-party + standard own-damage cover.',
      basePremium: 6200
    },
    {
      id: 'smart',
      name: 'Smart Plan',
      description: 'Enhanced own-damage with cashless garage support.',
      basePremium: 7900
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      description: 'Comprehensive cover with higher claim convenience.',
      basePremium: 9800
    }
  ]
};

const CATEGORY_DUMMY_OPTIONS = {
  'motor-car': {
    vehicleTypeLabel: 'Car',
    brand: ['Hyundai', 'Honda', 'Tata', 'Mahindra'],
    model: ['Venue', 'i20', 'Creta', 'Verna'],
    variant: ['S+', 'S', 'SX', 'SX(O)']
  },
  'motor-four-wheeler': {
    vehicleTypeLabel: 'Four Wheeler',
    brand: ['Hyundai', 'Honda', 'Tata', 'Mahindra'],
    model: ['Venue', 'i20', 'Creta', 'Verna'],
    variant: ['S+', 'S', 'SX', 'SX(O)']
  },
  'motor-bike': {
    vehicleTypeLabel: 'Bike',
    brand: ['Hero', 'Honda', 'Bajaj', 'TVS'],
    model: ['Splendor Plus', 'Shine', 'Pulsar 150', 'Apache RTR 160'],
    variant: ['Drum', 'Disc', 'ABS', 'Top']
  },
  'motor-three-wheeler': {
    vehicleTypeLabel: 'Three Wheeler',
    brand: ['Bajaj', 'Piaggio', 'Mahindra', 'TVS'],
    model: ['RE Auto', 'Ape City', 'Alfa', 'King Duramax'],
    variant: ['Passenger', 'Cargo', 'CNG', 'Diesel']
  },
  'motor-commercial-vehicle': {
    vehicleTypeLabel: 'Commercial Vehicle',
    brand: ['Tata', 'Ashok Leyland', 'Eicher', 'Mahindra'],
    model: ['Ace', 'Dost', 'Pro 2049', 'Bolero Pickup'],
    variant: ['Mini Truck', 'Pickup', 'CNG', 'Diesel']
  }
};

export const getGuestCategoryDummyData = (categoryId) => {
  const categoryData = CATEGORY_DUMMY_OPTIONS[categoryId] || CATEGORY_DUMMY_OPTIONS['motor-car'];

  return {
    vehicleTypeId: categoryId in CATEGORY_DUMMY_OPTIONS ? categoryId : 'motor-car',
    vehicleTypeLabel: categoryData.vehicleTypeLabel,
    selectOptions: {
      brand: categoryData.brand,
      model: categoryData.model,
      variant: categoryData.variant,
      registrationYear: GUEST_DUMMY_DATA.commonOptions.registrationYear,
      registrationCity: GUEST_DUMMY_DATA.commonOptions.registrationCity
    },
    defaultFormValues: {
      brand: '',
      model: '',
      variant: '',
      registrationYear: '',
      registrationCity: ''
    }
  };
};
