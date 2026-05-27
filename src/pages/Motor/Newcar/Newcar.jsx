import { useEffect, useMemo, useState } from 'react';
import './Newcar.css';
import {
  BRAND_MODEL_VARIANT_DUMMY_DATA,
  BIKE_BRAND_MODEL_VARIANT_DUMMY_DATA,
  BIKE_ENGINE_CAPACITY_OPTIONS,
  CITY_OPTIONS,
  DELIVERY_TIMELINE_OPTIONS,
  ENGINE_CAPACITY_BY_BRAND,
  FIELD_LABELS,
  FUEL_TYPE_OPTIONS,
  REGISTRATION_YEAR_OPTIONS,
  SUMMARY_PANEL_FIELDS,
  STEP_SEQUENCE,
  STEP_TITLES
} from './NewcarDummyData';

const NEWCAR_SELECTION_KEYS = [
  'brand',
  'model',
  'variant',
  'fuelType',
  'registrationYear',
  'city',
  'deliveryTimeline'
];

const isNewcarSelectionsComplete = (data, requiredKeys = NEWCAR_SELECTION_KEYS) => (
  requiredKeys.every((key) => String(data[key] || '').trim())
);

const mergeSelectionUpdate = (previousData, fieldName, rawValue) => {
  const nextState = {
    ...previousData,
    [fieldName]: rawValue
  };
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

function Newcar({
  onBackToVehicleCheck,
  onContinue,
  vehicleType = 'car',
  selectedCategory = 'motor-car'
}) {
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
  const [carFormData, setCarFormData] = useState({
    brand: '',
    model: '',
    engine: '',
    variant: '',
    fuelType: '',
    registrationYear: '',
    city: '',
    deliveryTimeline: '',
    name: '',
    mobile: ''
  });

  const activeStepSequence = useMemo(
    () => (vehicleType === 'bike'
      ? ['brand', 'model', 'engine', 'variant', 'fuelType', 'registrationYear', 'city', 'deliveryTimeline', 'contactDetails']
      : STEP_SEQUENCE),
    [vehicleType]
  );
  const requiredSelectionKeys = useMemo(
    () => (vehicleType === 'bike'
      ? ['brand', 'model', 'engine', 'variant', 'fuelType', 'registrationYear', 'city', 'deliveryTimeline']
      : NEWCAR_SELECTION_KEYS),
    [vehicleType]
  );
  const lastStepIndex = Math.max(0, activeStepSequence.length - 1);
  const safeStepIndex = Math.min(Math.max(0, currentStepIndex), lastStepIndex);
  const currentField = activeStepSequence[safeStepIndex] ?? 'brand';
  const vehicleTypeTitle = vehicleType === 'bike' ? 'Bike' : 'Car';
  const vehicleTypeLower = vehicleType === 'bike' ? 'bike' : 'car';
  const brandModelVariantData = vehicleType === 'bike'
    ? BIKE_BRAND_MODEL_VARIANT_DUMMY_DATA
    : BRAND_MODEL_VARIANT_DUMMY_DATA;

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
      case 'brand':
        return Object.keys(brandModelVariantData);
      case 'model':
        return modelOptions;
      case 'engine':
        return vehicleType === 'bike' ? BIKE_ENGINE_CAPACITY_OPTIONS : engineOptions;
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
  }, [currentField, modelOptions, variantOptions, engineOptions, brandModelVariantData, vehicleType]);

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

  const summaryPanelData = useMemo(
    () => SUMMARY_PANEL_FIELDS
      .filter((field) => (vehicleType === 'bike' ? true : field.key !== 'engine'))
      .map((field) => ({
        key: field.key,
        label: field.label,
        value: carFormData[field.key] || '-',
        stepIndex: activeStepSequence.indexOf(field.key)
      })),
    [carFormData, vehicleType, activeStepSequence]
  );

  const hasCompletedSelectionDetails = useMemo(
    () => isNewcarSelectionsComplete(carFormData, requiredSelectionKeys),
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
      const label = (FIELD_LABELS[currentField] ?? 'this field').toLowerCase();
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

  const showBrandStyleSearch = currentField === 'brand'
    || currentField === 'model'
    || currentField === 'variant';

  const handleStepSelection = (rawValue) => {
    if (!currentField || currentField === 'contactDetails') {
      return;
    }
    const mergedForm = mergeSelectionUpdate(carFormData, currentField, rawValue);
    updateFieldValue(currentField, rawValue);
    setErrorMessage('');

    const afterComplete = isNewcarSelectionsComplete(mergedForm, requiredSelectionKeys);
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

    if (vehicleType === 'bike' && currentField === 'fuelType') {
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
    const isBikeVariantStep = vehicleType === 'bike' && currentField === 'variant';
    return (
      <>
        {!isEngineStep && !isBikeVariantStep && (
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
          className={`new-car-options-grid${currentField === 'brand' ? ' is-brand-grid' : ''}${(currentField === 'model' || currentField === 'variant') ? ' is-single-column' : ''}${isCityStep ? ' is-city-list' : ''}${isEngineStep ? ' is-engine-grid' : ''}`}
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

  const resolvedStepTitle = (STEP_TITLES[currentField] || '')
    .replace(/car/gi, vehicleTypeLower)
    .replace(/^select your bike/i, 'Select your bike')
    .replace(/^select your car/i, `Select your ${vehicleTypeLower}`)
    .replace(/when will you start using the car\?/i, `When will you start using the ${vehicleTypeLower}?`);

  return (
    <section
      className="new-car-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`New ${vehicleTypeLower} details form`}
      data-motor-flow="brand-new-without-vehicle-number"
      data-motor-selected-category={selectedCategory}
      data-motor-vehicle-type={vehicleType}
    >
      <section className="new-car-modal">
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
              aria-label="Close new car popup"
            >
              ×
            </button>
          </div>
          <div className="new-car-summary-scroll">
            <div className="new-car-summary-list">
            {summaryPanelData.map((item) => (
              <div key={item.key} className={`new-car-summary-item${item.value === '-' ? ' is-empty' : ' is-filled'}`}>
                <span className="new-car-summary-item-icon" aria-hidden="true">
                  <SummaryFieldIcon fieldKey={item.key} vehicleType={vehicleType} />
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

export default Newcar;
