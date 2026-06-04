import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import motorHeroImage from '../../assets/images/Motor-Hero.webp';
import bikeInsuranceHeroImage from '../../assets/images/bike-insurance-hero.png';
import motorIconTwoWheeler from '../../assets/icons/Motor-TwoWheeler.webp';
import motorIconThreeWheeler from '../../assets/icons/Motor-ThreeWheeler.webp';
import motorIconFourWheeler from '../../assets/icons/Motor-FourWheeler.webp';
import motorIconCommercial from '../../assets/icons/Motor-Commercial.webp';
import Footer from '../../components/Footer/Footer';
import InsuranceFaqAccordion from '../../components/Faq/InsuranceFaqAccordion';
import { motorInsuranceFaqItems } from '../../data/productContent';
import './VehicleInsurance.css';
import { SearchIcon } from './MotorIcons';
import { getPolicyCardFromVehicleNumber } from './MotorPolicyDummyData';
import WithoutNumber from './Withoutnumber/WithoutNumber';
import Newcar from './Newcar/Newcar';

/** True in dev, or on any build when URL has ?motorDebug=1 or ?debug=motor */
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
  switch (categoryId) {
    case 'motor-bike':
    case 'motor-three-wheeler':
    case 'motor-commercial-vehicle':
    case 'motor-car':
      return categoryId;
    case 'motor-four-wheeler':
      return 'motor-car';
    default:
      return 'motor-car';
  }
};

const getCategoryDetails = (categoryId) => {
  switch (normalizeMotorCategory(categoryId)) {
    case 'motor-bike':
      return {
        inputId: 'bikeVehicleNumber',
        placeholder: 'AP09BK1234',
        hint: 'Try: AP09BK1234 (Active) • AP09BX1234 (Expired) • AP09BS1234 (Expiring Soon)'
      };
    case 'motor-three-wheeler':
      return {
        inputId: 'threeWheelerVehicleNumber',
        placeholder: 'AP09TW1234',
        hint: 'Try: AP09TW1234 (Active) • AP09TE1234 (Expired) • AP09TS1234 (Expiring Soon)'
      };
    case 'motor-commercial-vehicle':
      return {
        inputId: 'commercialVehicleNumber',
        placeholder: 'AP09CV1234',
        hint: 'Try: AP09CV1234 (Active) • AP09CE1234 (Expired) • AP09CS1234 (Expiring Soon)'
      };
    case 'motor-car':
    default:
      return {
        inputId: 'carVehicleNumber',
        placeholder: 'AP09AB1234',
        hint: 'Try: AP09AB1234 (Active) • AP09EX1234 (Expired) • AP09SO1234 (Expiring Soon)'
      };
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

const MOTOR_CATEGORY_ROUTES = {
  'motor-car': '/motor-insurance/car',
  'motor-bike': '/motor-insurance/bike',
  'motor-three-wheeler': '/motor-insurance/three-wheeler',
  'motor-commercial-vehicle': '/motor-insurance/commercial-vehicle'
};

const MOTOR_CATEGORY_NAV_ITEMS = [
  { id: 'motor-bike', ariaLabel: 'Bike or scooter insurance' },
  { id: 'motor-three-wheeler', ariaLabel: 'Auto rickshaw insurance' },
  { id: 'motor-car', ariaLabel: 'Private car insurance' },
  { id: 'motor-commercial-vehicle', ariaLabel: 'Business vehicle insurance' },
];

const MOTOR_OFFERINGS_TABS = [
  {
    id: 'motor-car',
    label: 'Four Wheeler Insurance',
    title: 'Four Wheeler Insurance',
    iconVariant: 'car',
    description:
      'Four wheeler insurance protects your car against accidents, damages, and theft. It also covers third-party liabilities as per legal requirements. This ensures financial protection for both your vehicle and others on the road. It is essential for safe and responsible driving.'
  },
  {
    id: 'motor-bike',
    label: 'Two Wheeler Insurance',
    title: 'Two Wheeler Insurance',
    iconVariant: 'bike',
    description:
      'Two wheeler insurance covers bikes and scooters against accidents, theft, and damages. It provides financial protection for repairs and third-party liabilities. This is important for everyday riders and long-distance travelers. It ensures peace of mind on every ride.'
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

const MotorCoverageShieldIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M12 2 4 5v6.09C4 16.14 7.41 20.85 12 22c4.59-1.15 8-5.86 8-10.91V5l-8-3Z"
    />
  </svg>
);

const MotorCoverageAwardIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M12 2.2 14.4 9h7.6l-6.1 4.5 2.3 7.3L12 16.3l-6.2 4.5 2.3-7.3L2 9h7.6L12 2.2Zm-5.5 15.3h11v2.5h-11v-2.5Z"
    />
  </svg>
);

function MotorInclusionIcon({ name }) {
  const svgProps = { viewBox: '0 0 24 24', 'aria-hidden': true, focusable: 'false', className: 'motor-inclusion-svg' };
  switch (name) {
    case 'warning':
      return (
        <svg {...svgProps}>
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
          />
        </svg>
      );
    case 'theft':
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.75" />
          <path fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" d="M9 9l6 6M15 9l-6 6" />
        </svg>
      );
    case 'sparkle':
      return (
        <svg {...svgProps}>
          <path
            fill="currentColor"
            d="M12 5 13.35 9.2h4.4l-3.55 2.55L15.6 16 12 14.05 8.41 16l1.35-4.25L6.21 9.2h4.4L12 5z"
          />
          <circle fill="currentColor" cx="6" cy="10" r="1.15" opacity="0.72" />
          <circle fill="currentColor" cx="18" cy="12" r="1" opacity="0.72" />
        </svg>
      );
    case 'document':
      return (
        <svg {...svgProps}>
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
            d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
          />
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
            points="14 2 14 8 20 8"
          />
        </svg>
      );
    case 'shield':
      return (
        <svg {...svgProps}>
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
          />
        </svg>
      );
    default:
      return null;
  }
}

const MOTOR_INCLUSIONS_ITEMS = [
  {
    id: 'accidental',
    icon: 'warning',
    title: 'Accidental Damage',
    description: 'Covers repair costs due to accidents or collisions.'
  },
  {
    id: 'theft',
    icon: 'theft',
    title: 'Theft or Loss of Vehicle',
    description: 'Provides compensation if your vehicle is stolen.'
  },
  {
    id: 'natural',
    icon: 'sparkle',
    title: 'Natural Disasters',
    description: 'Covers damage caused by floods, storms, earthquakes, and other natural events.'
  },
  {
    id: 'fire',
    icon: 'warning',
    title: 'Fire Damage',
    description: 'Protects against damage caused by fire or explosions.'
  },
  {
    id: 'third-party',
    icon: 'document',
    title: 'Third-Party Liability',
    description: 'Covers injury or damage caused to other people or property.'
  },
  {
    id: 'vandalism',
    icon: 'shield',
    title: 'Vandalism or Riots',
    description: 'Covers damage caused by external disturbances or intentional acts.'
  }
];

function MotorInsurance({ onBackHome, selectedCategory = 'motor-car' }) {
  const navigate = useNavigate();
  const brandSearchInputRef = useRef(null);
  const modelSearchInputRef = useRef(null);
  const variantSearchInputRef = useRef(null);
  const rcBookFileInputRef = useRef(null);
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [hasInputError, setHasInputError] = useState(false);
  const [policyCard, setPolicyCard] = useState(null);
  const [isWithoutVehicleFlow, setIsWithoutVehicleFlow] = useState(false);
  const [isNewCarFlow, setIsNewCarFlow] = useState(false);
  const [isBrandSelectionOpen, setIsBrandSelectionOpen] = useState(false);
  const [isModelSelectionOpen, setIsModelSelectionOpen] = useState(false);
  const [isVariantSelectionOpen, setIsVariantSelectionOpen] = useState(false);
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
  const categoryDetails = useMemo(() => getCategoryDetails(activeCategoryId), [activeCategoryId]);
  const heroImage = activeCategoryId === 'motor-bike' ? bikeInsuranceHeroImage : motorHeroImage;
  const heroImageAlt = activeCategoryId === 'motor-bike'
    ? 'Bike insurance protection illustration'
    : 'Motor insurance illustration';
  const newVehicleType = activeCategoryId === 'motor-bike' ? 'bike' : 'car';
  const newVehicleTypeLabel = newVehicleType === 'bike' ? 'Bike' : 'Car';
  const normalizedVehicleNumber = vehicleNumber.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
  const indianVehicleNumberRegex = /^[A-Z]{2}\d{1,2}[A-Z]{1,3}\d{4}$/;
  const isCheckEnabled = normalizedVehicleNumber.length >= 8;
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
    setPolicyCard(null);
    setVehicleNumber('');
    setHasInputError(false);
    setIsWithoutVehicleFlow(false);
    setIsNewCarFlow(false);
    setIsBrandSelectionOpen(false);
    setIsModelSelectionOpen(false);
    setIsVariantSelectionOpen(false);
    setBrandSearchQuery('');
    setModelSearchQuery('');
    setVariantSearchQuery('');
    setSelectedBrand('');
    setSelectedModel('');
    setRcScanRecords([]);
    setIsRcScanning(false);
    setRcScanError('');
  }, [activeCategoryId]);

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.info('[MotorInsurance] View Plans logs one line each click; full payload in dev or add ?motorDebug=1 on production.');
    }
  }, []);

  useEffect(() => {
    const isModalOpen = isBrandSelectionOpen || isModelSelectionOpen || isVariantSelectionOpen || isWithoutVehicleFlow;
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
  }, [isBrandSelectionOpen, isModelSelectionOpen, isVariantSelectionOpen, isWithoutVehicleFlow]);

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

  const handleCategoryNavigate = (categoryId) => {
    closeSelectionModals();
    const nextRoute = MOTOR_CATEGORY_ROUTES[categoryId] || MOTOR_CATEGORY_ROUTES['motor-car'];
    navigate(nextRoute);
  };

  const handleVehicleNumberChange = (event) => {
    const cleanedValue = event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
    setVehicleNumber(cleanedValue);
    setPolicyCard(null);
    if (hasInputError) {
      setHasInputError(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isCheckEnabled) {
      return;
    }
    if (!indianVehicleNumberRegex.test(normalizedVehicleNumber)) {
      setHasInputError(true);
      setVehicleNumber('');
      setPolicyCard(null);
      return;
    }

    setPolicyCard(getPolicyCardFromVehicleNumber(normalizedVehicleNumber));
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
        const regNorm = extracted.registrationNumber.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
        setVehicleNumber(regNorm);
        setHasInputError(false);
        setPolicyCard(null);
        if (indianVehicleNumberRegex.test(regNorm)) {
          setPolicyCard(getPolicyCardFromVehicleNumber(regNorm));
        }
      } catch {
        setRcScanError('Could not read this file. Try a clear photo or PDF.');
      } finally {
        setIsRcScanning(false);
        event.target.value = '';
      }
    }, 900);
  };

  return (
    <main className={`motor-page page-section page-section--hero${activeCategoryId === 'motor-bike' ? ' motor-page--bike' : ''}`}>
      <section className="motor-wrap page-section-container">
          <>
          <div
            className={`motor-screen motor-screen--vehicle-check${isNewCarFlow || isWithoutVehicleFlow ? ' is-behind-modal' : ''}`}
            aria-hidden={isNewCarFlow || isWithoutVehicleFlow ? true : undefined}
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
                      Motor Insurance
                    </div>

                    <h1 id="motor-intro-title" className="motor-hero-heading">
                      <span className="motor-hero-heading-line">Drive with Confidence,</span>
                      <span className="motor-hero-heading-line motor-hero-heading-line--gradient">Stay Protected</span>
                    </h1>

                    <div className="motor-image-placeholder">
                      <img
                        src={heroImage}
                        alt={heroImageAlt}
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

                <section className="motor-form-card">
                  <form onSubmit={handleSubmit}>
                    <label htmlFor={categoryDetails.inputId} className="motor-form-label">
                      Enter Vehicle Number
                    </label>
                    <div className="motor-input-row">
                      <input
                        id={categoryDetails.inputId}
                        name={categoryDetails.inputId}
                        type="text"
                        value={vehicleNumber}
                        onChange={handleVehicleNumberChange}
                        placeholder={hasInputError ? 'Enter correct number' : `E.G. ${categoryDetails.placeholder}`}
                        autoComplete="off"
                        required
                        aria-invalid={hasInputError}
                      />
                      <button type="submit" className="motor-check-btn" disabled={!isCheckEnabled}>
                        <span className="motor-search-icon" aria-hidden="true"><SearchIcon /></span> Check
                      </button>
                    </div>
                    <p className="motor-form-hint">{categoryDetails.hint}</p>
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

                <button
                  type="button"
                  className="motor-brand-new-car-card"
                  onClick={() => {
                    closeSelectionModals();
                    setIsNewCarFlow(true);
                  }}
                >
                  <span className="motor-brand-new-car-icon" aria-hidden="true">✧</span>
                  <span className="motor-brand-new-car-content">
                    <span className="motor-brand-new-car-title">Bought a Brand New {newVehicleTypeLabel}?</span>
                    <span className="motor-brand-new-car-subtitle">Get insurance for your new vehicle in minutes</span>
                  </span>
                  <span className="motor-brand-new-car-arrow" aria-hidden="true">→</span>
                </button>

                {policyCard && (
                  <section className={`policy-status-card is-${policyCard.statusLabel.toLowerCase().replace(' ', '-')}`}>
                    <div className="policy-status-head">
                      <span className="policy-status-icon" aria-hidden="true">{policyCard.iconSymbol}</span>
                      <h3>{policyCard.title}</h3>
                    </div>
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
                    <button type="button" className="policy-action-btn">{policyCard.ctaLabel}</button>
                    <p className="policy-note">💡 {policyCard.note}</p>
                  </section>
                )}
              </section>
            </div>

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
                    <span className="motor-coverage-icon motor-coverage-icon--shield" aria-hidden="true">
                      <MotorCoverageShieldIcon />
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
                    <span className="motor-coverage-icon motor-coverage-icon--award" aria-hidden="true">
                      <MotorCoverageAwardIcon />
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
                        <MotorInclusionIcon name={item.icon} />
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

          {isBrandSelectionOpen && (
            <div
              className="brand-select-modal-overlay"
              role="dialog"
              aria-modal="true"
              aria-labelledby="brand-select-title"
              onClick={() => setIsBrandSelectionOpen(false)}
            >
              <section className="brand-select-modal-card" onClick={(event) => event.stopPropagation()}>
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

          {isModelSelectionOpen && (
            <div
              className="brand-select-modal-overlay"
              role="dialog"
              aria-modal="true"
              aria-labelledby="model-select-title"
              onClick={() => setIsModelSelectionOpen(false)}
            >
              <section className="brand-select-modal-card brand-select-modal-card--list" onClick={(event) => event.stopPropagation()}>
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

          {isVariantSelectionOpen && (
            <div
              className="brand-select-modal-overlay"
              role="dialog"
              aria-modal="true"
              aria-labelledby="variant-select-title"
              onClick={() => setIsVariantSelectionOpen(false)}
            >
              <section className="brand-select-modal-card brand-select-modal-card--list" onClick={(event) => event.stopPropagation()}>
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

          {isWithoutVehicleFlow && (
            <div
              className="brand-select-modal-overlay motor-without-number-overlay"
              role="dialog"
              aria-modal="true"
              aria-labelledby="motor-without-number-title"
              onClick={() => setIsWithoutVehicleFlow(false)}
            >
              <section
                className="motor-without-number-modal"
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
                    isModal
                    selectedCategory={selectedCategory}
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

          {isNewCarFlow && (
            <Newcar
              selectedCategory={activeCategoryId}
              vehicleType={newVehicleType}
              onBackToVehicleCheck={() => setIsNewCarFlow(false)}
              onContinue={(newCarFormDetails) => {
                logMotorQuoteLead('Brand new vehicle — View Plans (no plate yet)', {
                  flow: 'brand-new-vehicle-without-number',
                  selectedCategory: activeCategoryId,
                  vehicleType: newVehicleType,
                  vehicleNumber: null,
                  continuedWithoutVehicleNumber: true,
                  newCarDetails: newCarFormDetails
                });
                setIsNewCarFlow(false);
              }}
            />
          )}
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
