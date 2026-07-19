import { useEffect, useMemo, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import motorHeroImage from '../../../assets/images/Motor-Hero.webp';
import bikeInsuranceHeroImage from '../../../assets/images/bike-insurance-hero.png';
import carInsuranceHeroImage from '../../../assets/images/car-insurance-hero.png';
import threeWheelerHeroImage from '../../../assets/images/three-wheeler-renew-hero.png';
import commercialVehicleHeroImage from '../../../assets/images/commercial-vehicle-renew-hero.webp';
import motorIconTwoWheeler from '../../../assets/icons/Motor-TwoWheeler.webp';
import motorIconThreeWheeler from '../../../assets/icons/Motor-ThreeWheeler.webp';
import motorIconFourWheeler from '../../../assets/icons/Motor-FourWheeler.webp';
import motorIconCommercial from '../../../assets/icons/Motor-Commercial.webp';
import motorCoverageAccidentalDamage from '../../../assets/images/motor-coverage/accidental-damage.png';
import motorCoverageTheftLoss from '../../../assets/images/motor-coverage/theft-loss.png';
import motorCoverageNaturalDisasters from '../../../assets/images/motor-coverage/natural-disasters.png';
import motorCoverageFireDamage from '../../../assets/images/motor-coverage/fire-damage.png';
import motorCoverageThirdPartyLiability from '../../../assets/images/motor-coverage/third-party-liability.png';
import motorCoverageVandalismRiots from '../../../assets/images/motor-coverage/vandalism-riots.png';
import motorCoverageThirdPartyInsurance from '../../../assets/images/motor-coverage/third-party-insurance.png';
import motorCoverageComprehensiveInsurance from '../../../assets/images/motor-coverage/comprehensive-insurance.png';
import Footer from '../../../components/Footer/Footer';
import { modalOverlayClass, modalPanelClass, useAnimatedModal } from '../../../components/AnimatedModal/AnimatedModal';
import InsuranceFaqAccordion from '../../../components/Faq/InsuranceFaqAccordion';
import { motorInsuranceFaqItems } from '../../../data/productContent';
import './MotorInsurance.css';
import WithoutNumber from '../Withoutnumber/WithoutNumber';
import { Newbike } from '../../NewVehicle/NewBike';
import { Newcar } from '../../NewVehicle/NewCar';
import { Newcommercial } from '../../NewVehicle/NewCommercial';
import { Newthreewheeler } from '../../NewVehicle/NewThreeWheeler';
import { Validnumber } from './vehicleNumberValidation';

const formatPolicyDate = (dateValue) => dateValue.toLocaleDateString('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

const getPolicyDates = (statusType) => {
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
    startDate: formatPolicyDate(startDate),
    endDate: formatPolicyDate(endDate),
  };
};

const vehiclenumber = {
  AP09AB1234: {
    vehicleNumber: 'AP09AB1234',
    title: 'Insurance Found',
    status: 'active',
    statusLabel: 'Active',
    iconSymbol: '✓',
    ctaLabel: 'Compare Plans',
    note: 'Renew early to save more.',
    ...getPolicyDates('active'),
  },
  AP09EX1234: {
    vehicleNumber: 'AP09EX1234',
    title: 'Insurance Expired',
    status: 'expired',
    statusLabel: 'Expired',
    iconSymbol: '✕',
    ctaLabel: 'Renew Now',
    note: 'Renew today to avoid penalties and claim rejection risk.',
    ...getPolicyDates('expired'),
  },
  AP09SO1234: {
    vehicleNumber: 'AP09SO1234',
    title: 'Insurance Expiring Soon',
    status: 'expiringSoon',
    statusLabel: 'Expiring Soon',
    iconSymbol: '!',
    ctaLabel: 'Renew Early',
    note: 'Renew early to keep your no-claim benefits protected.',
    ...getPolicyDates('expiringSoon'),
  },
};

const lookupLocalVehiclePolicy = (vehicleNumber) => {
  const key = String(vehicleNumber).toUpperCase();
  return vehiclenumber[key] ?? null;
};

const getPolicyCardStatusClass = (status) => {
  if (status === 'noData') {
    return 'no-data';
  }
  if (status === 'expiringSoon') {
    return 'expiring-soon';
  }
  if (status === 'expired') {
    return 'expired';
  }
  return 'active';
};

const buildNoDataPolicyCard = (vehicleNumber) => ({
  vehicleNumber: String(vehicleNumber).toUpperCase(),
  status: 'noData',
  title: 'No Data Found',
  statusLabel: 'No Record',
  iconSymbol: '—',
  ctaLabel: 'Get Insurance',
  note: 'No policy was found for this vehicle number. You can buy a new policy to get covered.',
});

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="10.5" cy="10.5" r="5.5" />
      <path d="M14.6 14.6L19 19" />
    </svg>
  );
}
const isMotorConsoleDebug = () => {
  if (import.meta.env.DEV) {
    return true;
  }
  if (typeof window === 'undefined') {
    return false;
  }
  const q = new URLSearchParams(window.location.search);
  return q.get('motorDebug') === '1' || q.get('debug') === 'motor';
};

const logMotorQuoteLead = (eventLabel, payload) => {
  console.info(`[MotorInsurance] ${eventLabel}`);
  if (isMotorConsoleDebug()) {
    console.info('[MotorInsurance] payload', payload);
  }
};

const normalizeMotorCategory = (categoryId) => {
  if (!categoryId) {
    return null;
  }
  switch (categoryId) {
    case 'motor-bike':
    case 'motor-three-wheeler':
    case 'motor-commercial-vehicle':
    case 'motor-car':
      return categoryId;
    case 'motor-four-wheeler':
      return 'motor-car';
    default:
      return null;
  }
};

const MOTOR_CATEGORY_ICON_SRC = {
  'motor-bike': motorIconTwoWheeler,
  'motor-three-wheeler': motorIconThreeWheeler,
  'motor-car': motorIconFourWheeler,
  'motor-commercial-vehicle': motorIconCommercial,
};

const getCategoryIcon = (categoryId) => {
  const id = normalizeMotorCategory(categoryId);
  const src = MOTOR_CATEGORY_ICON_SRC[id] ?? MOTOR_CATEGORY_ICON_SRC['motor-car'];
  return (
    <img
      src={src}
      alt=""
      className="motor-category-type-icon-img"
      decoding="async"
    />
  );
};

const MOTOR_CATEGORY_SLUGS = {
  'motor-car': 'car',
  'motor-bike': 'bike',
  'motor-three-wheeler': 'three-wheeler',
  'motor-commercial-vehicle': 'commercial-vehicle',
};

const MOTOR_HOME_ROUTE = '/motor-insurance';

const getMotorCategoryFromSlug = (slug) => {
  if (!slug) {
    return null;
  }
  const match = Object.entries(MOTOR_CATEGORY_SLUGS).find(([, value]) => value === slug);
  return match ? match[0] : null;
};

const MOTOR_CATEGORY_ROUTES = {
  'motor-car': `${MOTOR_HOME_ROUTE}/car`,
  'motor-bike': `${MOTOR_HOME_ROUTE}/bike`,
  'motor-three-wheeler': `${MOTOR_HOME_ROUTE}/three-wheeler`,
  'motor-commercial-vehicle': `${MOTOR_HOME_ROUTE}/commercial-vehicle`,
};

const MOTOR_CATEGORY_NAV_ITEMS = [
  { id: 'motor-bike', ariaLabel: 'Bike or scooter insurance' },
  { id: 'motor-car', ariaLabel: 'Private car insurance' },
  { id: 'motor-three-wheeler', ariaLabel: 'Auto rickshaw insurance' },
  { id: 'motor-commercial-vehicle', ariaLabel: 'Business vehicle insurance' },
];

// Right panel form stays the same for every category (only hero changes on icon click)
const MOTOR_DEMO_VEHICLE_NUMBERS = [
  { number: 'AP09AB1234', label: 'Active policy' },
  { number: 'AP09EX1234', label: 'Expired policy' },
  { number: 'AP09SO1234', label: 'Expiring soon' },
];

const MOTOR_QUOTE_FORM = {
  inputId: 'vehicleNumber',
  placeholder: 'AP09AB1234',
  hint: `Try: ${MOTOR_DEMO_VEHICLE_NUMBERS.map((item) => item.number).join(', ')}`,
};

// Hero content per category — update text/images here when you share screenshots
const getMotorHero = (categoryId) => {
  switch (normalizeMotorCategory(categoryId)) {
    case 'motor-bike':
      return {
        badge: 'Bike Insurance',
        titleLine1: 'Ride Worry Free',
        titleLine2: 'Stay Covered',
        image: bikeInsuranceHeroImage,
        imageAlt: 'Bike insurance illustration',
        pageClass: 'motor-page--bike',
      };
    case 'motor-car':
      return {
        badge: 'Car Insurance',
        titleLine1: 'Drive with Confidence',
        titleLine2: 'Stay Protected',
        image: carInsuranceHeroImage,
        imageAlt: 'Car insurance illustration',
        pageClass: '',
      };
    case 'motor-three-wheeler':
      return {
        badge: 'Three Wheeler Insurance',
        titleLine1: 'Protect Your Three Wheeler',
        titleLine2: 'Business',
        image: threeWheelerHeroImage,
        imageAlt: 'Three wheeler insurance illustration',
        pageClass: 'motor-page--three-wheeler',
      };
    case 'motor-commercial-vehicle':
      return {
        badge: 'Commercial Vehicle Insurance',
        titleLine1: 'Keep Your Business Moving',
        titleLine2: 'Without Risk',
        image: commercialVehicleHeroImage,
        imageAlt: 'Commercial vehicle insurance illustration',
        pageClass: '',
      };
    default:
      return {
        badge: 'Motor Insurance',
        titleLine1: 'Drive with Confidence,',
        titleLine2: 'Stay Protected',
        image: motorHeroImage,
        imageAlt: 'Motor insurance illustration',
        pageClass: '',
      };
  }
};

const MOTOR_OFFERINGS_TABS = [
  {
    id: 'motor-bike',
    label: 'Two Wheeler Insurance',
    title: 'Two Wheeler Insurance',
    iconVariant: 'bike',
    description:
      'Two wheeler insurance covers bikes and scooters against accidents, theft, and damages. It provides financial protection for repairs and third-party liabilities. This is important for everyday riders and long-distance travelers. It ensures peace of mind on every ride.'
  },
  {
    id: 'motor-car',
    label: 'Four Wheeler Insurance',
    title: 'Four Wheeler Insurance',
    iconVariant: 'car',
    description:
      'Four wheeler insurance protects your car against accidents, damages, and theft. It also covers third-party liabilities as per legal requirements. This ensures financial protection for both your vehicle and others on the road. It is essential for safe and responsible driving.'
  },
  {
    id: 'motor-three-wheeler',
    label: 'Three Wheeler Insurance',
    title: 'Three Wheeler Insurance',
    iconVariant: 'three',
    description:
      'This insurance is designed for auto-rickshaws and similar vehicles. It covers damages, accidents, and third-party liabilities. It is ideal for commercial and passenger transport vehicles. It ensures financial security for daily operations.'
  },
  {
    id: 'motor-commercial-vehicle',
    label: 'Commercial Vehicle Insurance',
    title: 'Commercial Vehicle Insurance',
    iconVariant: 'commercial',
    description:
      'Commercial vehicle insurance covers trucks, vans, and business-use vehicles. It protects against accidents, damages, and operational risks. This is essential for businesses that rely on transportation. It helps maintain smooth operations without financial disruptions.'
  }
];

const BRAND_NEW_CAR_BRANDS = [
  'Maruti Suzuki',
  'Hyundai',
  'Honda',
  'Tata',
  'Mahindra',
  'Toyota',
  'Kia',
  'Volkswagen',
  'Ford',
  'Renault',
  'Nissan',
  'Skoda'
];

const BRAND_MODEL_VARIANT_DUMMY_DATA = {
  'Maruti Suzuki': [
    { model: 'Swift', variants: ['LXi', 'VXi', 'ZXi'] },
    { model: 'Baleno', variants: ['Sigma', 'Delta', 'Alpha'] }
  ],
  Hyundai: [
    { model: 'i20', variants: ['Magna', 'Sportz', 'Asta'] },
    { model: 'Creta', variants: ['E', 'S', 'SX'] }
  ],
  Honda: [
    { model: 'City', variants: ['SV', 'V', 'ZX'] },
    { model: 'Amaze', variants: ['E', 'S', 'VX'] }
  ],
  Tata: [
    { model: 'Punch', variants: ['Pure', 'Adventure', 'Accomplished'] },
    { model: 'Nexon', variants: ['Smart', 'Pure', 'Creative'] }
  ],
  Mahindra: [
    { model: 'XUV700', variants: ['MX', 'AX3', 'AX5'] },
    { model: 'Scorpio-N', variants: ['Z2', 'Z4', 'Z8'] },
    { model: 'Thar', variants: ['AX OPT', 'LX', 'Earth Edition'] },
    { model: 'XUV300', variants: ['W2', 'W4', 'W6'] },
    { model: 'Bolero', variants: ['B4', 'B6', 'B6 OPT'] },
    { model: 'XUV400 EV', variants: ['EC Pro', 'EL Pro', 'EL Pro Fast Charger'] }
  ],
  Toyota: [
    { model: 'Glanza', variants: ['E', 'S', 'G'] },
    { model: 'Innova Hycross', variants: ['GX', 'VX', 'ZX'] }
  ],
  Kia: [
    { model: 'Sonet', variants: ['HTE', 'HTK', 'HTX'] },
    { model: 'Seltos', variants: ['HTE', 'HTK+', 'GTX+'] }
  ],
  Volkswagen: [
    { model: 'Polo', variants: ['Trendline', 'Comfortline', 'Highline'] },
    { model: 'Virtus', variants: ['Comfortline', 'Highline', 'GT'] }
  ],
  Ford: [
    { model: 'Figo', variants: ['Ambiente', 'Titanium', 'Titanium Blu'] },
    { model: 'EcoSport', variants: ['Ambiente', 'Trend', 'Titanium'] }
  ],
  Renault: [
    { model: 'Kwid', variants: ['RXE', 'RXL', 'RXT'] },
    { model: 'Kiger', variants: ['RXE', 'RXL', 'RXT'] }
  ],
  Nissan: [
    { model: 'Magnite', variants: ['XE', 'XL', 'XV'] },
    { model: 'Sunny', variants: ['XE', 'XL', 'XV Premium'] }
  ],
  Skoda: [
    { model: 'Slavia', variants: ['Active', 'Ambition', 'Style'] },
    { model: 'Kushaq', variants: ['Active', 'Ambition', 'Style'] }
  ]
};

const getBrandInitials = (brandName) => (
  String(brandName ?? '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((segment) => segment[0]?.toUpperCase() || '')
    .join('')
);

const buildDummyRcExtractedFields = (categoryId, fileName) => {
  const normalized = normalizeMotorCategory(categoryId);
  const registrationNumber = (() => {
    switch (normalized) {
      case 'motor-bike':
        return 'AP09BK1234';
      case 'motor-three-wheeler':
        return 'AP09TW1234';
      case 'motor-commercial-vehicle':
        return 'AP09CV1234';
      default:
        return 'AP09AB1234';
    }
  })();
  return {
    registrationNumber,
    ownerName: 'Rajesh Kumar',
    makerModel: 'Honda City ZX Petrol',
    vehicleClass: 'LMV',
    bodyType: 'Sedan',
    fuelType: 'PETROL',
    colour: 'White',
    registrationDate: '15-03-2020',
    chassisNumber: 'MA3FCB1SAMPLECHASSIS01',
    engineNumber: 'ENG9SAMPLE987654',
    fitnessUpto: '14-03-2030',
    insuranceUpto: '14-03-2026',
    seatingCapacity: '5',
    sourceFileName: fileName,
    scannedAtIso: new Date().toISOString()
  };
};

const BrandCarIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M4.2 12.6V11.5C4.2 10.5 4.8 9.7 5.8 9.4L8.1 8.6C8.5 8.5 8.9 8.4 9.3 8.4H14.3C14.9 8.4 15.5 8.6 15.9 9L18.1 10.7C18.6 11.1 18.9 11.7 18.9 12.3V13.5" />
    <path d="M5.3 13.5H17.9" />
    <circle cx="7.4" cy="14.8" r="1.4" />
    <circle cx="15.8" cy="14.8" r="1.4" />
    <path d="M11.9 5.5V3.8" />
    <path d="M10.8 4.6H13" />
  </svg>
);

const MOTOR_INCLUSIONS_ITEMS = [
  {
    id: 'accidental',
    image: motorCoverageAccidentalDamage,
    title: 'Accidental Damage',
    description: 'Covers repair costs due to accidents or collisions.'
  },
  {
    id: 'theft',
    image: motorCoverageTheftLoss,
    title: 'Theft or Loss of Vehicle',
    description: 'Provides compensation if your vehicle is stolen.'
  },
  {
    id: 'natural',
    image: motorCoverageNaturalDisasters,
    title: 'Natural Disasters',
    description: 'Covers damage caused by floods, storms, earthquakes, and other natural events.'
  },
  {
    id: 'fire',
    image: motorCoverageFireDamage,
    title: 'Fire Damage',
    description: 'Protects against damage caused by fire or explosions.'
  },
  {
    id: 'third-party',
    image: motorCoverageThirdPartyLiability,
    title: 'Third-Party Liability',
    description: 'Covers injury or damage caused to other people or property.'
  },
  {
    id: 'vandalism',
    image: motorCoverageVandalismRiots,
    title: 'Vandalism or Riots',
    description: 'Covers damage caused by external disturbances or intentional acts.'
  }
];
/*Motor insurance started*/ 
function MotorInsurance({ onBackHome }) {
  const navigate = useNavigate();
  const { category: categorySlug } = useParams();
  const selectedCategory = categorySlug ? getMotorCategoryFromSlug(categorySlug) : null;

  const brandSearchInputRef = useRef(null);
  const modelSearchInputRef = useRef(null);
  const variantSearchInputRef = useRef(null);
  const rcBookFileInputRef = useRef(null);
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [validatedVehicleNumber, setValidatedVehicleNumber] = useState('');
  const [vehicleNumberError, setVehicleNumberError] = useState('');
  const [policyCard, setPolicyCard] = useState(null);
  const [isWithoutVehicleFlow, setIsWithoutVehicleFlow] = useState(false);
  const [activeNewVehicleFlow, setActiveNewVehicleFlow] = useState(null);
  const [isBrandSelectionOpen, setIsBrandSelectionOpen] = useState(false);
  const [isModelSelectionOpen, setIsModelSelectionOpen] = useState(false);
  const [isVariantSelectionOpen, setIsVariantSelectionOpen] = useState(false);
  const brandModalMotion = useAnimatedModal(isBrandSelectionOpen);
  const modelModalMotion = useAnimatedModal(isModelSelectionOpen);
  const variantModalMotion = useAnimatedModal(isVariantSelectionOpen);
  const withoutVehicleModalMotion = useAnimatedModal(isWithoutVehicleFlow);
  const newVehicleModalMotion = useAnimatedModal(Boolean(activeNewVehicleFlow));
  const [brandSearchQuery, setBrandSearchQuery] = useState('');
  const [modelSearchQuery, setModelSearchQuery] = useState('');
  const [variantSearchQuery, setVariantSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [rcScanRecords, setRcScanRecords] = useState([]);
  const [isRcScanning, setIsRcScanning] = useState(false);
  const [rcScanError, setRcScanError] = useState('');
  const [motorOfferingsTab, setMotorOfferingsTab] = useState('motor-car');
  const activeCategoryId = normalizeMotorCategory(selectedCategory);
  const hero = getMotorHero(activeCategoryId);
  const filteredBrands = useMemo(
    () => BRAND_NEW_CAR_BRANDS.filter((brand) => (
      brand.toLowerCase().includes(brandSearchQuery.trim().toLowerCase())
    )),
    [brandSearchQuery]
  );
  const selectedBrandModelOptions = useMemo(
    () => BRAND_MODEL_VARIANT_DUMMY_DATA[selectedBrand] || [],
    [selectedBrand]
  );
  const filteredModels = useMemo(
    () => selectedBrandModelOptions.filter((option) => (
      option.model.toLowerCase().includes(modelSearchQuery.trim().toLowerCase())
    )),
    [selectedBrandModelOptions, modelSearchQuery]
  );
  const selectedModelVariantOptions = useMemo(
    () => selectedBrandModelOptions.find((option) => option.model === selectedModel)?.variants || [],
    [selectedBrandModelOptions, selectedModel]
  );
  const filteredVariants = useMemo(
    () => selectedModelVariantOptions.filter((variant) => (
      variant.toLowerCase().includes(variantSearchQuery.trim().toLowerCase())
    )),
    [selectedModelVariantOptions, variantSearchQuery]
  );
  const activeMotorOffering = useMemo(
    () => MOTOR_OFFERINGS_TABS.find((tab) => tab.id === motorOfferingsTab) ?? MOTOR_OFFERINGS_TABS[0],
    [motorOfferingsTab]
  );

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.info('[MotorInsurance] View Plans logs one line each click; full payload in dev or add ?motorDebug=1 on production.');
    }
  }, []);

  useEffect(() => {
    const isModalOpen = isBrandSelectionOpen
      || isModelSelectionOpen
      || isVariantSelectionOpen
      || isWithoutVehicleFlow
      || Boolean(activeNewVehicleFlow);
    if (!isModalOpen) {
      return undefined;
    }

    const originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscClose = (event) => {
      if (event.key !== 'Escape') {
        return;
      }
      if (isWithoutVehicleFlow) {
        setIsWithoutVehicleFlow(false);
        return;
      }
      if (activeNewVehicleFlow) {
        setActiveNewVehicleFlow(null);
        return;
      }
      if (isVariantSelectionOpen) {
        setIsVariantSelectionOpen(false);
        return;
      }
      if (isModelSelectionOpen) {
        setIsModelSelectionOpen(false);
        return;
      }
      if (isBrandSelectionOpen) {
        setIsBrandSelectionOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscClose);
    if (isBrandSelectionOpen) {
      brandSearchInputRef.current?.focus();
    }
    if (isModelSelectionOpen) {
      modelSearchInputRef.current?.focus();
    }
    if (isVariantSelectionOpen) {
      variantSearchInputRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      window.removeEventListener('keydown', handleEscClose);
    };
  }, [
    isBrandSelectionOpen,
    isModelSelectionOpen,
    isVariantSelectionOpen,
    isWithoutVehicleFlow,
    activeNewVehicleFlow,
  ]);

  const closeSelectionModals = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    document.body.classList.add('motor-disable-hover');
    window.setTimeout(() => {
      document.body.classList.remove('motor-disable-hover');
    }, 120);
    setIsBrandSelectionOpen(false);
    setIsModelSelectionOpen(false);
    setIsVariantSelectionOpen(false);
    setBrandSearchQuery('');
    setModelSearchQuery('');
    setVariantSearchQuery('');
  };

  useEffect(() => {
    setIsWithoutVehicleFlow(false);
    setActiveNewVehicleFlow(null);
    setIsBrandSelectionOpen(false);
    setIsModelSelectionOpen(false);
    setIsVariantSelectionOpen(false);
    setBrandSearchQuery('');
    setModelSearchQuery('');
    setVariantSearchQuery('');
    document.body.style.overflow = '';
  }, [activeCategoryId]);

  const handleCategoryNavigate = (categoryId) => {
    closeSelectionModals();
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    const nextRoute = MOTOR_CATEGORY_ROUTES[categoryId] || MOTOR_CATEGORY_ROUTES['motor-car'];
    navigate(nextRoute);
  };

  // onsubmit event handler for enter vechile number feild
  const handleVehicleNumberSubmit = (event) => {
    event.preventDefault();

    const enteredInput = (event.currentTarget.elements.vehicleNumber?.value ?? '').trim();

    if (!Validnumber(enteredInput)) {
      setVehicleNumber('');
      setValidatedVehicleNumber('');
      setVehicleNumberError('Enter valid number');
      setPolicyCard(null);
      return;
    }

    setValidatedVehicleNumber(enteredInput);
    setVehicleNumberError('');

    const storedVehicleNumber = enteredInput;
    const policyData = lookupLocalVehiclePolicy(storedVehicleNumber);
    if (!policyData) {
      setPolicyCard(buildNoDataPolicyCard(storedVehicleNumber));
      return;
    }
    setPolicyCard(policyData);
  };

  const handleRcBookFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    setRcScanError('');
    setIsRcScanning(true);
    const scanCategoryId = activeCategoryId;
    const scanFileName = file.name;
    window.setTimeout(() => {
      try {
        const extracted = buildDummyRcExtractedFields(scanCategoryId, scanFileName);
        const record = {
          id: `rc-${Date.now()}`,
          extracted
        };
        setRcScanRecords((previous) => [...previous, record]);
        setVehicleNumber(extracted.registrationNumber || '');
      } catch {
        setRcScanError('Could not read this file. Try a clear photo or PDF.');
      } finally {
        setIsRcScanning(false);
        event.target.value = '';
      }
    }, 900);
  };

  if (categorySlug && !selectedCategory) {
    return <Navigate to={MOTOR_HOME_ROUTE} replace />;
  }

  return (
    <main className={`motor-page page-section page-section--hero${hero.pageClass ? ` ${hero.pageClass}` : ''}`}>
      <section className="motor-wrap page-section-container">
          <>
          <div
            className={`motor-screen motor-screen--vehicle-check${activeNewVehicleFlow || isWithoutVehicleFlow ? ' is-behind-modal' : ''}`}
            aria-hidden={activeNewVehicleFlow || isWithoutVehicleFlow ? true : undefined}
          >
            <button
              type="button"
              className="motor-back-link"
              onClick={() => {
                closeSelectionModals();
                onBackHome();
              }}
            >
              ← Back to Home
            </button>

            <div className="motor-hero-grid">
              <section className="motor-intro-panel" aria-labelledby="motor-intro-title">
                <div className="motor-hero-inner">
                  <button
                    type="button"
                    className="motor-hero-back"
                    onClick={() => {
                      closeSelectionModals();
                      onBackHome();
                    }}
                  >
                    ← Back to Home
                  </button>

                  <div className="motor-hero-block">
                    <div className="motor-hero-badge">
                      <span aria-hidden="true">+</span>
                      {hero.badge}
                    </div>

                    <h1 id="motor-intro-title" className="motor-hero-heading">
                      <span className="motor-hero-heading-line">{hero.titleLine1}</span>
                      <span className="motor-hero-heading-line motor-hero-heading-line--gradient">{hero.titleLine2}</span>
                    </h1>

                    <div className="motor-image-placeholder">
                      <img
                        src={hero.image}
                        alt={hero.imageAlt}
                        className="motor-hero-image"
                        decoding="async"
                        fetchPriority="high"
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section className="motor-quote-panel" aria-labelledby="motor-check-title">
                <header className="motor-header">
                  <h2 id="motor-check-title">Motor Insurance</h2>
                  <p>Check your vehicle insurance status instantly.</p>
                </header>

                <nav className="motor-category-nav" aria-label="Motor insurance categories">
                  {MOTOR_CATEGORY_NAV_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`motor-category-link${activeCategoryId === item.id ? ' is-active' : ''}`}
                      aria-label={item.ariaLabel}
                      aria-pressed={activeCategoryId === item.id}
                      onClick={() => handleCategoryNavigate(item.id)}
                    >
                      <span className="motor-category-link-content">
                        <span className="motor-category-link-icon" aria-hidden="true">{getCategoryIcon(item.id)}</span>
                      </span>
                    </button>
                  ))}
                </nav>
{/*Motor insurance form started (vehicle number input and check button)*/} 
                <section className="motor-form-card">
                  <form onSubmit={handleVehicleNumberSubmit}>
                    <label htmlFor={MOTOR_QUOTE_FORM.inputId} className="motor-form-label">
                      Enter Vehicle Number
                    </label>
                    <div className="motor-input-row">
                      <input
                        id={MOTOR_QUOTE_FORM.inputId}
                        name={MOTOR_QUOTE_FORM.inputId}
                        type="text"
                        value={vehicleNumber}
                        aria-invalid={vehicleNumberError ? 'true' : undefined}
                        onChange={(event) => {
                          setVehicleNumber(event.target.value);
                          setValidatedVehicleNumber('');
                          setVehicleNumberError('');
                          setPolicyCard(null);
                        }}
                        placeholder={vehicleNumberError || `E.G. ${MOTOR_QUOTE_FORM.placeholder}`}
                        autoComplete="off"
                      />
                      <button type="submit" className="motor-check-btn">
                        <span className="motor-search-icon" aria-hidden="true"><SearchIcon /></span> Check
                      </button>
                    </div>
                    <p className="motor-form-hint">{MOTOR_QUOTE_FORM.hint}</p>
                  </form>

                  <div className="motor-rc-scan-block">
                    <p className="motor-rc-or-label">OR</p>
                    <input
                      ref={rcBookFileInputRef}
                      type="file"
                      className="motor-rc-scan-file-input"
                      accept="image/*,.pdf,application/pdf"
                      aria-label="Upload RC book image or PDF"
                      onChange={handleRcBookFileChange}
                    />
                    <button
                      type="button"
                      className="motor-rc-scan-upload-btn"
                      disabled={isRcScanning}
                      onClick={() => rcBookFileInputRef.current?.click()}
                    >
                      {isRcScanning ? 'Scanning…' : 'Upload RC book'}
                    </button>
                    {rcScanError && <p className="motor-rc-scan-error">{rcScanError}</p>}
                    {rcScanRecords.length > 0 && (
                      <p className="motor-rc-scan-meta" aria-live="polite">
                        Stored RC scans: {rcScanRecords.length} (latest registration {rcScanRecords[rcScanRecords.length - 1]?.extracted?.registrationNumber ?? '—'})
                      </p>
                    )}
                    <button
                      type="button"
                      className="motor-continue-link motor-continue-link--secondary"
                      onClick={() => {
                        closeSelectionModals();
                        setIsWithoutVehicleFlow(true);
                      }}
                    >
                      Continue without vehicle number <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </section>

                {(activeCategoryId === 'motor-bike' || activeCategoryId === 'motor-car' || activeCategoryId === 'motor-three-wheeler' || activeCategoryId === 'motor-commercial-vehicle') && (
                  <button
                    type="button"
                    className="motor-brand-new-vehicle-card"
                    onClick={() => {
                      closeSelectionModals();
                      setActiveNewVehicleFlow(activeCategoryId || 'motor-car');
                    }}
                  >
                    <span className="motor-brand-new-vehicle-icon" aria-hidden="true">✧</span>
                    <span className="motor-brand-new-vehicle-content">
                      <span className="motor-brand-new-vehicle-title">
                        {activeCategoryId === 'motor-bike' && 'Bought a Brand New Bike?'}
                        {activeCategoryId === 'motor-car' && 'Bought a Brand New Car?'}
                        {activeCategoryId === 'motor-three-wheeler' && 'Protect your new three wheeler'}
                        {activeCategoryId === 'motor-commercial-vehicle' && 'Protect your new commercial vehicle'}
                      </span>
                      <span className="motor-brand-new-vehicle-subtitle">Get insurance for your new vehicle in minutes</span>
                    </span>
                    <span className="motor-brand-new-vehicle-arrow" aria-hidden="true">→</span>
                  </button>
                )}

                {policyCard && (
                  <section className={`policy-status-card is-${getPolicyCardStatusClass(policyCard.status)}`}>
                    <div className="policy-status-head">
                      <span className="policy-status-icon" aria-hidden="true">{policyCard.iconSymbol}</span>
                      <div>
                        <h3>{policyCard.title}</h3>
                        <p className="policy-vehicle-number">{policyCard.vehicleNumber}</p>
                      </div>
                    </div>
                    {policyCard.status === 'noData' ? (
                      <p className="policy-no-data-message">
                        No policy record exists for this vehicle number.
                      </p>
                    ) : (
                      <div className="policy-status-grid">
                        <div>
                          <p className="policy-meta-label">Start Date</p>
                          <p className="policy-meta-value">{policyCard.startDate}</p>
                        </div>
                        <div>
                          <p className="policy-meta-label">End Date</p>
                          <p className="policy-meta-value">{policyCard.endDate}</p>
                        </div>
                        <div>
                          <p className="policy-meta-label">Status</p>
                          <span className="policy-badge">{policyCard.statusLabel}</span>
                        </div>
                      </div>
                    )}
                    <button type="button" className="policy-action-btn">{policyCard.ctaLabel}</button>
                    <p className="policy-note">💡 {policyCard.note}</p>
                  </section>
                )}

              </section>
            </div>
          {/*overview section started*/} 
            <section
              className="motor-overview-importance"
              aria-labelledby="motor-overview-heading motor-importance-heading"
            >
              <div className="motor-overview-inner">
                <article className="motor-overview-column">
                  <p className="motor-overview-label">01 — Overview</p>
                  <h2 id="motor-overview-heading" className="motor-overview-title">
                    What is Motor Insurance?
                  </h2>
                  <p className="motor-overview-body">
                    Motor insurance is a policy that provides financial protection against damage to your
                    vehicle and third-party liabilities. It helps cover repair costs, accidents, and legal
                    responsibilities arising from road incidents.
                  </p>
                </article>
                <article className="motor-overview-column">
                  <p className="motor-overview-label">02 — Importance</p>
                  <h2
                    id="motor-importance-heading"
                    className="motor-overview-title motor-overview-title--single-line"
                  >
                    Why Do You Need Motor Insurance?
                  </h2>
                  <p className="motor-overview-body">
                    Accidents and damages can happen at any time. Motor insurance helps you avoid heavy repair
                    costs and ensures legal compliance while driving.
                  </p>
                </article>
              </div>
            </section>

            <section className="motor-offerings" aria-labelledby="motor-offerings-title">
              <header className="motor-offerings-header">
                <p className="motor-offerings-eyebrow">Our offerings</p>
                <h2 id="motor-offerings-title" className="motor-offerings-title">
                  Types of Motor Insurance <span className="motor-offerings-title-gradient">We Offer</span>
                </h2>
              </header>

              <div className="motor-offerings-layout">
                <div
                  className="motor-offerings-tabs"
                  role="tablist"
                  aria-label="Motor insurance types"
                >
                  {MOTOR_OFFERINGS_TABS.map((tab) => {
                    const isActive = motorOfferingsTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        id={`motor-offering-tab-${tab.iconVariant}`}
                        className={`motor-offerings-tab${isActive ? ' is-active' : ''}`}
                        aria-selected={isActive}
                        aria-controls="motor-offerings-panel"
                        onClick={() => setMotorOfferingsTab(tab.id)}
                      >
                        <span
                          className={`motor-offerings-tab-icon motor-offerings-tab-icon--${tab.iconVariant}`}
                          aria-hidden="true"
                        >
                          {getCategoryIcon(tab.id)}
                        </span>
                        <span className="motor-offerings-tab-label">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div
                  id="motor-offerings-panel"
                  role="tabpanel"
                  aria-labelledby={`motor-offering-tab-${activeMotorOffering.iconVariant}`}
                  className="motor-offerings-panel"
                >
                  <div className="motor-offerings-card-topline" aria-hidden="true" />
                  <div
                    className={`motor-offerings-card-icon motor-offerings-card-icon--${activeMotorOffering.iconVariant}`}
                    aria-hidden="true"
                  >
                    {getCategoryIcon(activeMotorOffering.id)}
                  </div>
                  <h3 className="motor-offerings-card-title">{activeMotorOffering.title}</h3>
                  <p className="motor-offerings-card-text">{activeMotorOffering.description}</p>
                </div>
              </div>
            </section>

            <section className="motor-coverage" aria-labelledby="motor-coverage-title">
              <header className="motor-coverage-header">
                <p className="motor-coverage-eyebrow">Coverage options</p>
                <h2 id="motor-coverage-title" className="motor-coverage-title">
                  Choose Your Coverage
                </h2>
              </header>
              <div className="motor-coverage-wrap">
                <article className="motor-coverage-card motor-coverage-card--third-party">
                  <div className="motor-coverage-card-top">
                    <span className="motor-coverage-icon" aria-hidden="true">
                      <img
                        src={motorCoverageThirdPartyInsurance}
                        alt=""
                        className="motor-coverage-icon-img"
                        loading="lazy"
                        width={57}
                        height={57}
                      />
                    </span>
                    <span className="motor-coverage-badge motor-coverage-badge--mandatory">Mandatory</span>
                  </div>
                  <h3 className="motor-coverage-card-heading">Third-Party Insurance</h3>
                  <p className="motor-coverage-card-text">
                    Third-party insurance covers damage or injury caused to another person or property. It is
                    mandatory by law and ensures legal protection. This type does not cover damage to your own
                    vehicle. It helps you stay compliant and financially protected.
                  </p>
                </article>
                <article className="motor-coverage-card motor-coverage-card--comprehensive">
                  <div className="motor-coverage-card-top">
                    <span className="motor-coverage-icon motor-coverage-icon--comprehensive" aria-hidden="true">
                      <img
                        src={motorCoverageComprehensiveInsurance}
                        alt=""
                        className="motor-coverage-icon-img"
                        loading="lazy"
                        width={57}
                        height={57}
                      />
                    </span>
                    <span className="motor-coverage-badge motor-coverage-badge--recommended">Recommended</span>
                  </div>
                  <h3 className="motor-coverage-card-heading">Comprehensive Insurance</h3>
                  <p className="motor-coverage-card-text">
                    Comprehensive insurance provides complete protection for your vehicle. It covers both own
                    damage and third-party liabilities. This includes accidents, theft, natural disasters, and
                    more. It offers maximum protection and peace of mind.
                  </p>
                </article>
              </div>
            </section>

            <section className="motor-inclusions" aria-labelledby="motor-inclusions-title">
              <header className="motor-inclusions-header">
                <p className="motor-inclusions-eyebrow">Inclusions</p>
                <h2 id="motor-inclusions-title" className="motor-inclusions-title">
                  What Does Motor Insurance Cover?
                </h2>
              </header>
              <div className="motor-inclusions-card">
                <ul className="motor-inclusions-grid">
                  {MOTOR_INCLUSIONS_ITEMS.map((item) => (
                    <li key={item.id} className="motor-inclusion-item">
                      <span className="motor-inclusion-icon-wrap" aria-hidden="true">
                        <img
                          src={item.image}
                          alt=""
                          className="motor-inclusion-icon-img"
                          loading="lazy"
                          width={57}
                          height={57}
                        />
                      </span>
                      <div className="motor-inclusion-copy">
                        <h3 className="motor-inclusion-item-title">{item.title}</h3>
                        <p className="motor-inclusion-item-desc">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

          {brandModalMotion.visible && (
            <div
              className={modalOverlayClass(brandModalMotion.closing, 'brand-select-modal-overlay')}
              role="dialog"
              aria-modal="true"
              aria-labelledby="brand-select-title"
              onClick={() => setIsBrandSelectionOpen(false)}
            >
              <section
                className={modalPanelClass(brandModalMotion.closing, 'brand-select-modal-card')}
                onClick={(event) => event.stopPropagation()}
              >
                <header className="brand-select-modal-header">
                  <div className="brand-select-modal-title-wrap">
                    <span className="brand-select-modal-icon" aria-hidden="true">
                      <BrandCarIcon />
                    </span>
                    <div>
                      <h3 id="brand-select-title">Select your car brand</h3>
                      <p>Choose from popular Indian car brands</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="brand-select-modal-close"
                    onClick={() => setIsBrandSelectionOpen(false)}
                    aria-label="Close brand selection"
                  >
                    ×
                  </button>
                </header>

                <div className="brand-select-search-wrap">
                  <span className="brand-select-search-icon" aria-hidden="true">
                    <SearchIcon />
                  </span>
                  <input
                    ref={brandSearchInputRef}
                    type="text"
                    value={brandSearchQuery}
                    onChange={(event) => setBrandSearchQuery(event.target.value)}
                    placeholder="Search brands..."
                    aria-label="Search car brands"
                  />
                </div>

                <div className="brand-select-grid">
                  {filteredBrands.length > 0 ? (
                    filteredBrands.map((brandName) => (
                      <button
                        key={brandName}
                        type="button"
                        className="brand-select-item"
                        onClick={() => {
                          setSelectedBrand(brandName);
                          setSelectedModel('');
                          setModelSearchQuery('');
                          setVariantSearchQuery('');
                          setIsBrandSelectionOpen(false);
                          setIsModelSelectionOpen(true);
                        }}
                      >
                        <span className="brand-select-initials">{getBrandInitials(brandName)}</span>
                        <span className="brand-select-name">{brandName}</span>
                      </button>
                    ))
                  ) : (
                    <p className="brand-select-empty-state">No brands match your search.</p>
                  )}
                </div>
              </section>
            </div>
          )}

          {modelModalMotion.visible && (
            <div
              className={modalOverlayClass(modelModalMotion.closing, 'brand-select-modal-overlay')}
              role="dialog"
              aria-modal="true"
              aria-labelledby="model-select-title"
              onClick={() => setIsModelSelectionOpen(false)}
            >
              <section
                className={modalPanelClass(modelModalMotion.closing, 'brand-select-modal-card brand-select-modal-card--list')}
                onClick={(event) => event.stopPropagation()}
              >
                <header className="brand-select-modal-header">
                  <div className="brand-select-modal-title-wrap">
                    <button
                      type="button"
                      className="brand-select-modal-back"
                      onClick={() => {
                        setIsModelSelectionOpen(false);
                        setIsBrandSelectionOpen(true);
                      }}
                      aria-label="Back to brand selection"
                    >
                      ←
                    </button>
                    <div>
                      <h3 id="model-select-title">Select your car model</h3>
                      <p>Models available for {selectedBrand}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="brand-select-modal-close"
                    onClick={() => setIsModelSelectionOpen(false)}
                    aria-label="Close model selection"
                  >
                    ×
                  </button>
                </header>

                <div className="brand-select-search-wrap">
                  <span className="brand-select-search-icon" aria-hidden="true">
                    <SearchIcon />
                  </span>
                  <input
                    ref={modelSearchInputRef}
                    type="text"
                    value={modelSearchQuery}
                    onChange={(event) => setModelSearchQuery(event.target.value)}
                    placeholder="Search models..."
                    aria-label="Search car models"
                  />
                </div>

                <div className="brand-select-list">
                  {filteredModels.length > 0 ? (
                    filteredModels.map((modelOption) => (
                      <button
                        key={modelOption.model}
                        type="button"
                        className="brand-select-list-item"
                        onClick={() => {
                          setSelectedModel(modelOption.model);
                          setVariantSearchQuery('');
                          setIsModelSelectionOpen(false);
                          setIsVariantSelectionOpen(true);
                        }}
                      >
                        {modelOption.model}
                      </button>
                    ))
                  ) : (
                    <p className="brand-select-empty-state">No models match your search.</p>
                  )}
                </div>
              </section>
            </div>
          )}

          {variantModalMotion.visible && (
            <div
              className={modalOverlayClass(variantModalMotion.closing, 'brand-select-modal-overlay')}
              role="dialog"
              aria-modal="true"
              aria-labelledby="variant-select-title"
              onClick={() => setIsVariantSelectionOpen(false)}
            >
              <section
                className={modalPanelClass(variantModalMotion.closing, 'brand-select-modal-card brand-select-modal-card--list')}
                onClick={(event) => event.stopPropagation()}
              >
                <header className="brand-select-modal-header">
                  <div className="brand-select-modal-title-wrap">
                    <button
                      type="button"
                      className="brand-select-modal-back"
                      onClick={() => {
                        setIsVariantSelectionOpen(false);
                        setIsModelSelectionOpen(true);
                      }}
                      aria-label="Back to model selection"
                    >
                      ←
                    </button>
                    <div>
                      <h3 id="variant-select-title">Select your car variant</h3>
                      <p>Variants available for {selectedModel}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="brand-select-modal-close"
                    onClick={() => setIsVariantSelectionOpen(false)}
                    aria-label="Close variant selection"
                  >
                    ×
                  </button>
                </header>

                <div className="brand-select-search-wrap">
                  <span className="brand-select-search-icon" aria-hidden="true">
                    <SearchIcon />
                  </span>
                  <input
                    ref={variantSearchInputRef}
                    type="text"
                    value={variantSearchQuery}
                    onChange={(event) => setVariantSearchQuery(event.target.value)}
                    placeholder="Search variants..."
                    aria-label="Search car variants"
                  />
                </div>

                <div className="brand-select-list">
                  {filteredVariants.length > 0 ? (
                    filteredVariants.map((variantName) => (
                      <button
                        key={variantName}
                        type="button"
                        className="brand-select-list-item"
                        onClick={() => {
                          setIsVariantSelectionOpen(false);
                          setBrandSearchQuery('');
                          setModelSearchQuery('');
                          setVariantSearchQuery('');
                        }}
                      >
                        {variantName}
                      </button>
                    ))
                  ) : (
                    <p className="brand-select-empty-state">No variants match your search.</p>
                  )}
                </div>
              </section>
            </div>
          )}
          </div>

          {withoutVehicleModalMotion.visible && (
            <div
              className={modalOverlayClass(withoutVehicleModalMotion.closing, 'brand-select-modal-overlay motor-without-number-overlay')}
              role="dialog"
              aria-modal="true"
              aria-labelledby="motor-without-number-title"
              onClick={() => setIsWithoutVehicleFlow(false)}
            >
              <section
                className={modalPanelClass(withoutVehicleModalMotion.closing, 'motor-without-number-modal')}
                onClick={(event) => event.stopPropagation()}
              >
                <header className="motor-without-number-modal__header">
                  <div>
                    <h3 id="motor-without-number-title">Continue without vehicle number</h3>
                    <p>Enter your vehicle details to compare plans</p>
                  </div>
                  <button
                    type="button"
                    className="brand-select-modal-close"
                    onClick={() => setIsWithoutVehicleFlow(false)}
                    aria-label="Close"
                  >
                    ×
                  </button>
                </header>
                <div className="motor-without-number-modal__body">
                  <WithoutNumber
                    key={activeCategoryId || 'motor-car'}
                    isModal
                    selectedCategory={activeCategoryId || 'motor-car'}
                    onBackToVehicleCheck={() => setIsWithoutVehicleFlow(false)}
                    onContinue={({ vehicle, insurance }) => {
                      logMotorQuoteLead('Continue without vehicle number — View Plans', {
                        flow: 'without-vehicle-number',
                        selectedCategory: activeCategoryId,
                        vehicleNumber: null,
                        continuedWithoutVehicleNumber: true,
                        vehicle,
                        insurance
                      });
                      setIsWithoutVehicleFlow(false);
                    }}
                  />
                </div>
              </section>
            </div>
          )}

          {newVehicleModalMotion.visible && activeNewVehicleFlow === activeCategoryId && (() => {
            const closeFlow = () => setActiveNewVehicleFlow(null);
            const logPayload = {
              flow: 'brand-new-vehicle-without-number',
              vehicleNumber: null,
              continuedWithoutVehicleNumber: true,
            };
            const motionClosing = newVehicleModalMotion.closing;
            const onBackToVehicleCheck = closeFlow;
            const onContinue = (formDetails) => {
              logMotorQuoteLead(`Brand new ${activeCategoryId.replace('motor-', '').replace('-', ' ')} — View Plans (no plate yet)`, {
                ...logPayload,
                selectedCategory: activeCategoryId,
                vehicleType: activeCategoryId.replace('motor-', ''),
                formDetails,
              });
              closeFlow();
            };

            switch (activeCategoryId) {
              case 'motor-car':
                return <Newcar motionClosing={motionClosing} onBackToVehicleCheck={onBackToVehicleCheck} onContinue={onContinue} />;
              case 'motor-bike':
                return <Newbike motionClosing={motionClosing} onBackToVehicleCheck={onBackToVehicleCheck} onContinue={onContinue} />;
              case 'motor-three-wheeler':
                return <Newthreewheeler motionClosing={motionClosing} onBackToVehicleCheck={onBackToVehicleCheck} onContinue={onContinue} />;
              case 'motor-commercial-vehicle':
                return <Newcommercial motionClosing={motionClosing} onBackToVehicleCheck={onBackToVehicleCheck} onContinue={onContinue} />;
              default:
                return null;
            }
          })()}

          </>
      </section>

      <InsuranceFaqAccordion
        title="Frequently Asked Questions"
        subtitle="Answers about motor insurance types, mandatory cover, NCB, and common exclusions."
        items={motorInsuranceFaqItems}
      />

      <Footer />
    </main>
  );
}

export default MotorInsurance;
