import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VehicleInsurance.css';
import {
  BikeOutlineIcon,
  CarOutlineIcon,
  CommercialVehicleIcon,
  SearchIcon,
  ThreeWheelerIcon
} from './MotorIcons';
import { getPolicyCardFromVehicleNumber } from './MotorPolicyDummyData';
import WithoutNumber from './Withoutnumber/WithoutNumber';
import Newcar from './Newcar/Newcar';

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
        label: 'Bike',
        inputId: 'bikeVehicleNumber',
        placeholder: 'AP09BK1234',
        hint: 'Try: AP09BK1234 (Active) • AP09BX1234 (Expired) • AP09BS1234 (Expiring Soon)'
      };
    case 'motor-three-wheeler':
      return {
        label: 'Three Wheeler',
        inputId: 'threeWheelerVehicleNumber',
        placeholder: 'AP09TW1234',
        hint: 'Try: AP09TW1234 (Active) • AP09TE1234 (Expired) • AP09TS1234 (Expiring Soon)'
      };
    case 'motor-commercial-vehicle':
      return {
        label: 'Commercial Vehicle',
        inputId: 'commercialVehicleNumber',
        placeholder: 'AP09CV1234',
        hint: 'Try: AP09CV1234 (Active) • AP09CE1234 (Expired) • AP09CS1234 (Expiring Soon)'
      };
    case 'motor-car':
    default:
      return {
        label: 'Car',
        inputId: 'carVehicleNumber',
        placeholder: 'AP09AB1234',
        hint: 'Try: AP09AB1234 (Active) • AP09EX1234 (Expired) • AP09SO1234 (Expiring Soon)'
      };
  }
};

const getCategoryIcon = (categoryId) => {
  switch (normalizeMotorCategory(categoryId)) {
    case 'motor-bike':
      return <BikeOutlineIcon />;
    case 'motor-three-wheeler':
      return <ThreeWheelerIcon />;
    case 'motor-commercial-vehicle':
      return <CommercialVehicleIcon />;
    case 'motor-car':
    default:
      return <CarOutlineIcon />;
  }
};

const MOTOR_CATEGORY_ROUTES = {
  'motor-car': '/motor-insurance/car',
  'motor-bike': '/motor-insurance/bike',
  'motor-three-wheeler': '/motor-insurance/three-wheeler',
  'motor-commercial-vehicle': '/motor-insurance/commercial-vehicle'
};

const MOTOR_CATEGORY_NAV_ITEMS = [
  { id: 'motor-car', label: 'Car' },
  { id: 'motor-bike', label: 'Bike' }
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
  brandName
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
  const [selectedVariant, setSelectedVariant] = useState('');
  const [selectedBrandModelDetails, setSelectedBrandModelDetails] = useState(null);
  const [rcScanRecords, setRcScanRecords] = useState([]);
  const [isRcScanning, setIsRcScanning] = useState(false);
  const [rcScanError, setRcScanError] = useState('');
  const activeCategoryId = normalizeMotorCategory(selectedCategory);
  const categoryDetails = useMemo(() => getCategoryDetails(activeCategoryId), [activeCategoryId]);
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
    setSelectedVariant('');
    setSelectedBrandModelDetails(null);
    setRcScanRecords([]);
    setIsRcScanning(false);
    setRcScanError('');
  }, [activeCategoryId]);

  useEffect(() => {
    if (!isBrandSelectionOpen && !isModelSelectionOpen && !isVariantSelectionOpen) {
      return undefined;
    }

    const originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscClose = (event) => {
      if (event.key === 'Escape') {
        if (isVariantSelectionOpen) {
          setIsVariantSelectionOpen(false);
          return;
        }
        if (isModelSelectionOpen) {
          setIsModelSelectionOpen(false);
          return;
        }
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
  }, [isBrandSelectionOpen, isModelSelectionOpen, isVariantSelectionOpen]);

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
    <main className="motor-page">
      <section className="motor-wrap">
        {isWithoutVehicleFlow ? (
          <div className="motor-screen motor-screen--guest-flow">
            <WithoutNumber
              selectedCategory={selectedCategory}
              onBackToVehicleCheck={() => setIsWithoutVehicleFlow(false)}
            />
          </div>
        ) : isNewCarFlow ? (
          <div className="motor-screen motor-screen--new-car-flow">
            <Newcar
              vehicleType={newVehicleType}
              onBackToVehicleCheck={() => setIsNewCarFlow(false)}
              onContinue={(payload) => {
                setSelectedBrandModelDetails(payload);
                setIsNewCarFlow(false);
              }}
            />
          </div>
        ) : (
          <div className="motor-screen motor-screen--vehicle-check">
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

          <header className="motor-header">
            <h1>Motor Insurance</h1>
            <p>Check your vehicle insurance status instantly.</p>
          </header>

          <nav className="motor-category-nav" aria-label="Motor insurance categories">
            {MOTOR_CATEGORY_NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`motor-category-link${activeCategoryId === item.id ? ' is-active' : ''}`}
                onClick={() => handleCategoryNavigate(item.id)}
              >
                <span className="motor-category-link-content">
                  <span className="motor-category-link-icon" aria-hidden="true">{getCategoryIcon(item.id)}</span>
                  <span>{item.label}</span>
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
                  Stored RC scans: {rcScanRecords.length} (latest registration {rcScanRecords[rcScanRecords.length - 1].extracted.registrationNumber})
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
                          setSelectedVariant('');
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
                          setSelectedVariant('');
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
                          setSelectedVariant(variantName);
                          setSelectedBrandModelDetails({
                            brand: selectedBrand,
                            model: selectedModel,
                            variant: variantName
                          });
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
        )}
      </section>
    </main>
  );
}

export default MotorInsurance;
