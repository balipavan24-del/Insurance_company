/**
 * Motor dummy data — remove sample values when API is live.
 *
 * API field names to keep (backend should use the same keys):
 *
 * Vehicle lookup:  registrationNumber → title, status, statusLabel, startDate, endDate, ctaLabel, note
 * Guest vehicle:   vehicleType, vehicleTypeLabel, brand, model, variant, registrationYear, registrationCity
 * Guest insurance: previousPolicyExpiryDate, previousInsurer, hadClaimLastYear (yes | no)
 * Guest options:   brands, models, variants, registrationYears, cities, insurers
 */

export const MOTOR_GUEST_VEHICLE_REQUIRED_FIELDS = [
  'brand',
  'model',
  'variant',
  'registrationYear',
  'registrationCity',
];

export const MOTOR_GUEST_INSURANCE_EMPTY = {
  previousPolicyExpiryDate: '',
  previousInsurer: '',
  hadClaimLastYear: '',
};

// ---------------------------------------------------------------------------
// UI copy only (not sent to API)
// ---------------------------------------------------------------------------

export const GUEST_FLOW_UI = {
  titles: {
    heading: 'Browse Insurance Plans',
    subtitle: 'Complete the details below to find the best plans for you.',
    cardHeading: 'Vehicle Details',
    insuranceCardHeading: 'Insurance Details',
  },
  steps: [
    { id: 1, label: 'Vehicle Details', isActive: true },
    { id: 2, label: 'Insurance Details', isActive: false },
    { id: 3, label: 'Add-ons & Plans', isActive: false },
  ],
};

// ---------------------------------------------------------------------------
// Guest flow — dropdown options until GET /motor/meta/options is live
// ---------------------------------------------------------------------------

const DUMMY_CATEGORY_OPTIONS = {
  'motor-car': {
    vehicleTypeLabel: 'Car',
    brands: ['Hyundai', 'Honda', 'Tata', 'Mahindra'],
    models: ['Venue', 'i20', 'Creta', 'Verna'],
    variants: ['S+', 'S', 'SX', 'SX(O)'],
  },
  'motor-bike': {
    vehicleTypeLabel: 'Bike',
    brands: ['Hero', 'Honda', 'Bajaj', 'TVS'],
    models: ['Splendor Plus', 'Shine', 'Pulsar 150', 'Apache RTR 160'],
    variants: ['Drum', 'Disc', 'ABS', 'Top'],
  },
  'motor-three-wheeler': {
    vehicleTypeLabel: 'Three Wheeler',
    brands: ['Bajaj', 'Piaggio', 'Mahindra', 'TVS'],
    models: ['RE Auto', 'Ape City', 'Alfa', 'King Duramax'],
    variants: ['Passenger', 'Cargo', 'CNG', 'Diesel'],
  },
  'motor-commercial-vehicle': {
    vehicleTypeLabel: 'Commercial Vehicle',
    brands: ['Tata', 'Ashok Leyland', 'Eicher', 'Mahindra'],
    models: ['Ace', 'Dost', 'Pro 2049', 'Bolero Pickup'],
    variants: ['Mini Truck', 'Pickup', 'CNG', 'Diesel'],
  },
};

const DUMMY_REGISTRATION_YEARS = ['2014', '2016', '2018', '2020', '2022'];
const DUMMY_CITIES = ['Jaipur', 'Hyderabad', 'Bengaluru', 'Chennai'];
const DUMMY_INSURERS = ['Oriental Insurance', 'HDFC Ergo', 'ICICI Lombard', 'Bajaj Allianz'];

/** Replace with: fetchMotorGuestOptions(vehicleType) */
export const getGuestCategoryDummyData = (categoryId) => {
  const categoryData = DUMMY_CATEGORY_OPTIONS[categoryId] || DUMMY_CATEGORY_OPTIONS['motor-car'];
  const vehicleTypeId = categoryId in DUMMY_CATEGORY_OPTIONS ? categoryId : 'motor-car';

  return {
    vehicleType: vehicleTypeId,
    vehicleTypeLabel: categoryData.vehicleTypeLabel,
    selectOptions: {
      brand: categoryData.brands,
      model: categoryData.models,
      variant: categoryData.variants,
      registrationYear: DUMMY_REGISTRATION_YEARS,
      registrationCity: DUMMY_CITIES,
    },
    defaultFormValues: {
      brand: '',
      model: '',
      variant: '',
      registrationYear: '',
      registrationCity: '',
    },
    insurers: DUMMY_INSURERS,
  };
};

// ---------------------------------------------------------------------------
// Vehicle number check — until GET /motor/vehicles/:registrationNumber is live
// Try: AP09AB1234 (active) • AP09EX1234 (expired) • AP09SO1234 (expiringSoon)
// ---------------------------------------------------------------------------

const formatDate = (dateValue) => {
  return dateValue.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const DUMMY_POLICY_BY_STATUS = {
  expired: {
    title: 'Insurance Expired',
    status: 'expired',
    statusLabel: 'Expired',
    iconSymbol: '✕',
    ctaLabel: 'Renew Now',
    note: 'Renew today to avoid penalties and claim rejection risk.',
  },
  expiringSoon: {
    title: 'Insurance Expiring Soon',
    status: 'expiringSoon',
    statusLabel: 'Expiring Soon',
    iconSymbol: '!',
    ctaLabel: 'Renew Early',
    note: 'Renew early to keep your no-claim benefits protected.',
  },
  active: {
    title: 'Insurance Found',
    status: 'active',
    statusLabel: 'Active',
    iconSymbol: '✓',
    ctaLabel: 'Compare Plans',
    note: 'Renew early to save more.',
  },
};

const getDummyPolicyDates = (statusType) => {
  const today = new Date();
  const startDate = new Date(today);
  const endDate = new Date(today);

  if (statusType === 'expired') {
    startDate.setFullYear(today.getFullYear() - 1);
    endDate.setDate(today.getDate() - 12);
  } else if (statusType === 'expiringSoon') {
    startDate.setFullYear(today.getFullYear() - 1);
    endDate.setDate(today.getDate() + 20);
  } else {
    startDate.setFullYear(today.getFullYear() - 1);
    endDate.setFullYear(today.getFullYear() + 1);
  }

  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
  };
};

const getDummyPolicyStatusFromNumber = (registrationNumber) => {
  const id = String(registrationNumber ?? '');
  if (/(EX|BX|TE|CE)/.test(id)) {
    return 'expired';
  }
  if (/(SO|BS|TS|CS)/.test(id)) {
    return 'expiringSoon';
  }
  return 'active';
};

export const MOTOR_POLICY_DUMMY_EXAMPLES = {
  active: 'AP09AB1234',
  expired: 'AP09EX1234',
  expiringSoon: 'AP09SO1234',
};

/** Replace with: fetchMotorVehicleLookup(registrationNumber) */
export const getPolicyCardFromVehicleNumber = (registrationNumber) => {
  const status = getDummyPolicyStatusFromNumber(registrationNumber);
  return {
    ...DUMMY_POLICY_BY_STATUS[status],
    ...getDummyPolicyDates(status),
  };
};
