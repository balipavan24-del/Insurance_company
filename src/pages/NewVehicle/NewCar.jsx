import { useMemo, useState } from 'react';
import { modalOverlayClass, modalPanelClass } from '../../components/AnimatedModal/AnimatedModal';
import { SearchBox, OptionGrid, DeliveryCards, ContactForm, SummaryPanel } from './NewVehicleUI';
import './NewVehicle.css';

const sharedSteps = {
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
    options: ['Hyderabad', 'Bengaluru', 'Mumbai', 'Delhi', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Indore', 'Bhopal', 'Visakhapatnam', 'Coimbatore', 'Surat', 'Nagpur', 'Patna', 'Chandigarh', 'Noida', 'Gurugram'],
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
  contactDetails: {
    field: 'contactDetails',
    stepTitle: 'Almost done',
    fieldLabel: 'Contact Details',
  },
};

const carSteps = [
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
  sharedSteps.registrationYear,
  sharedSteps.city,
  { ...sharedSteps.deliveryTimeline, stepTitle: 'When will you start using the car?' },
  sharedSteps.contactDetails,
];

const brandModelVariantData = {
  'Maruti Suzuki': [
    { model: 'Swift', variants: ['LXi', 'VXi', 'ZXi'] },
    { model: 'Baleno', variants: ['Sigma', 'Delta', 'Alpha'] },
    { model: 'Brezza', variants: ['LXi', 'VXi', 'ZXi'] },
    { model: 'Fronx', variants: ['Sigma', 'Delta', 'Alpha'] },
    { model: 'Grand Vitara', variants: ['Sigma', 'Delta', 'Alpha'] },
  ],
  Hyundai: [
    { model: 'i20', variants: ['Magna', 'Sportz', 'Asta'] },
    { model: 'Creta', variants: ['E', 'S', 'SX'] },
    { model: 'Venue', variants: ['E', 'S(O)', 'SX'] },
    { model: 'Verna', variants: ['EX', 'S', 'SX(O)'] },
    { model: 'Alcazar', variants: ['Prestige', 'Platinum', 'Signature'] },
  ],
  Honda: [
    { model: 'City', variants: ['SV', 'V', 'ZX'] },
    { model: 'Amaze', variants: ['E', 'S', 'VX'] },
    { model: 'Elevate', variants: ['SV', 'V', 'ZX'] },
    { model: 'WR-V', variants: ['SV', 'VX', 'ZX'] },
  ],
  Tata: [
    { model: 'Punch', variants: ['Pure', 'Adventure', 'Accomplished'] },
    { model: 'Nexon', variants: ['Smart', 'Pure', 'Creative'] },
    { model: 'Harrier', variants: ['Smart', 'Pure', 'Fearless'] },
    { model: 'Safari', variants: ['Smart', 'Pure', 'Accomplished'] },
    { model: 'Tiago', variants: ['XE', 'XT', 'XZ'] },
  ],
  Mahindra: [
    { model: 'XUV700', variants: ['MX', 'AX3', 'AX5'] },
    { model: 'Scorpio-N', variants: ['Z2', 'Z4', 'Z8'] },
    { model: 'Thar', variants: ['AX OPT', 'LX', 'Earth Edition'] },
    { model: 'XUV300', variants: ['W2', 'W4', 'W6'] },
    { model: 'Bolero', variants: ['B4', 'B6', 'B6 OPT'] },
  ],
  Toyota: [
    { model: 'Glanza', variants: ['E', 'S', 'G'] },
    { model: 'Innova Hycross', variants: ['GX', 'VX', 'ZX'] },
    { model: 'Urban Cruiser Hyryder', variants: ['E', 'S', 'V'] },
    { model: 'Fortuner', variants: ['4x2', '4x4', 'Legender'] },
  ],
  Kia: [
    { model: 'Sonet', variants: ['HTE', 'HTK', 'HTX'] },
    { model: 'Seltos', variants: ['HTE', 'HTK+', 'GTX+'] },
    { model: 'Carens', variants: ['Premium', 'Prestige', 'Luxury'] },
    { model: 'Syros', variants: ['HTK', 'HTX', 'HTX+'] },
  ],
  Volkswagen: [
    { model: 'Polo', variants: ['Trendline', 'Comfortline', 'Highline'] },
    { model: 'Virtus', variants: ['Comfortline', 'Highline', 'GT'] },
    { model: 'Taigun', variants: ['Comfortline', 'Highline', 'GT'] },
  ],
  Ford: [
    { model: 'Figo', variants: ['Ambiente', 'Titanium', 'Titanium Blu'] },
    { model: 'EcoSport', variants: ['Ambiente', 'Trend', 'Titanium'] },
    { model: 'Aspire', variants: ['Ambiente', 'Trend', 'Titanium'] },
  ],
  Renault: [
    { model: 'Kwid', variants: ['RXE', 'RXL', 'RXT'] },
    { model: 'Kiger', variants: ['RXE', 'RXL', 'RXT'] },
    { model: 'Triber', variants: ['RXE', 'RXL', 'RXZ'] },
  ],
  Nissan: [
    { model: 'Magnite', variants: ['XE', 'XL', 'XV'] },
    { model: 'Sunny', variants: ['XE', 'XL', 'XV Premium'] },
    { model: 'Kicks', variants: ['XL', 'XV', 'XV Premium'] },
  ],
  Skoda: [
    { model: 'Slavia', variants: ['Active', 'Ambition', 'Style'] },
    { model: 'Kushaq', variants: ['Active', 'Ambition', 'Style'] },
    { model: 'Kylaq', variants: ['Classic', 'Signature', 'Prestige'] },
  ],
};

const summarySequence = carSteps
  .filter((step) => step.summaryLabel)
  .map((step) => ({ field: step.field, summaryLabel: step.summaryLabel }));

const emptyForm = {
  brand: '',
  model: '',
  variant: '',
  fuelType: '',
  registrationYear: '',
  city: '',
  deliveryTimeline: '',
  name: '',
  mobile: '',
};

function mergeForm(prev, field, value) {
  const next = { ...prev, [field]: value };
  if (field === 'brand') {
    next.model = '';
    next.variant = '';
  }
  if (field === 'model') {
    next.variant = '';
  }
  return next;
}

export function Newcar({ motionClosing = false, onBackToVehicleCheck, onContinue }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({ ...emptyForm });

  const brands = useMemo(() => Object.keys(brandModelVariantData), []);
  const currentStep = carSteps[stepIndex];
  const lastIndex = carSteps.length - 1;

  const modelOptions = useMemo(
    () => (brandModelVariantData[formData.brand] || []).map((row) => row.model),
    [formData.brand],
  );

  const variantOptions = useMemo(() => {
    const row = (brandModelVariantData[formData.brand] || [])
      .find((item) => item.model === formData.model);
    return row?.variants || [];
  }, [formData.brand, formData.model]);

  const filteredBrands = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    if (!query) return brands;
    return brands.filter((brand) => brand.toLowerCase().includes(query));
  }, [brands, searchText]);

  const filteredOptions = useMemo(() => {
    let options = [];
    switch (currentStep.field) {
      case 'model':
        options = modelOptions;
        break;
      case 'variant':
        options = variantOptions;
        break;
      default:
        options = currentStep.options || [];
    }
    const query = searchText.trim().toLowerCase();
    if (!query) return options;
    return options.filter((option) => String(option).toLowerCase().includes(query));
  }, [currentStep, modelOptions, variantOptions, searchText]);

  const selectionsComplete = useMemo(
    () => summarySequence.every(({ field }) => String(formData[field] || '').trim()),
    [formData],
  );

  const pickValue = (field, value) => {
    setFormData((prev) => mergeForm(prev, field, value));
    setErrorMessage('');
  };

  const advance = () => {
    setSearchText('');
    setStepIndex((prev) => Math.min(prev + 1, lastIndex));
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

  const validateStep = () => {
    if (!String(formData[currentStep.field] || '').trim()) {
      setErrorMessage(`Please select ${(currentStep.fieldLabel || 'an option').toLowerCase()}.`);
      return false;
    }
    return true;
  };

  const submitContact = () => {
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
  };

  const onOptionPick = (value) => {
    pickValue(currentStep.field, value);
    if (stepIndex >= lastIndex) return;
    setSearchText('');
    setStepIndex((prev) => Math.min(prev + 1, lastIndex));
  };

  const jumpToContact = () => {
    if (!selectionsComplete) return;
    setSearchText('');
    setErrorMessage('');
    setStepIndex(lastIndex);
  };

  const renderBrandStep = () => (
    <>
      <SearchBox placeholder="Search brand..." value={searchText} onChange={setSearchText} />
      <OptionGrid options={filteredBrands} field="brand" formData={formData} brandGrid onPick={onOptionPick} />
    </>
  );

  const renderSearchableStep = () => (
    <>
      <SearchBox
        placeholder={`Search ${currentStep.fieldLabel?.toLowerCase() || 'option'}...`}
        value={searchText}
        onChange={setSearchText}
      />
      <OptionGrid
        options={filteredOptions}
        field={currentStep.field}
        formData={formData}
        singleCol={currentStep.field === 'model' || currentStep.field === 'variant'}
        onPick={onOptionPick}
      />
    </>
  );

  const renderStep = () => {
    switch (currentStep.field) {
      case 'brand':
        return renderBrandStep();
      case 'model':
      case 'variant':
        return renderSearchableStep();
      case 'fuelType':
      case 'registrationYear':
      case 'city':
        return (
          <OptionGrid
            options={currentStep.options || []}
            field={currentStep.field}
            formData={formData}
            brandGrid={currentStep.field === 'fuelType'}
            singleCol={currentStep.field !== 'fuelType'}
            city={currentStep.field === 'city'}
            onPick={onOptionPick}
          />
        );
      case 'deliveryTimeline':
        return (
          <DeliveryCards
            options={currentStep.deliveryCardOptions}
            selectedValue={formData.deliveryTimeline}
            onPick={onOptionPick}
          />
        );
      case 'contactDetails':
        return <ContactForm formData={formData} onChange={pickValue} onSubmit={submitContact} />;
      default:
        return null;
    }
  };

  return (
    <section className={modalOverlayClass(motionClosing, 'nv-overlay')} role="dialog" aria-modal="true" aria-label="New car details form">
      <section className={modalPanelClass(motionClosing, 'nv-modal')}>
        <div className="nv-left-pane">
          <header className="nv-left-header">
            <button type="button" className="nv-top-back-btn" onClick={goBack} aria-label="Go back">
              <span aria-hidden="true">←</span>
            </button>
            <h2>{currentStep.stepTitle}</h2>
          </header>

          {renderStep()}
          {errorMessage && <p className="nv-error">{errorMessage}</p>}

          {currentStep.field !== 'contactDetails' && selectionsComplete && stepIndex < lastIndex && (
            <div className="nv-edit-continue-row">
              <button type="button" className="nv-edit-continue-btn" onClick={jumpToContact}>Continue</button>
            </div>
          )}
        </div>

        <SummaryPanel
          summarySequence={summarySequence}
          formData={formData}
          title="Your Car Details"
          onEdit={(field) => {
            const index = carSteps.findIndex((step) => step.field === field);
            if (index >= 0) {
              setSearchText('');
              setErrorMessage('');
              setStepIndex(index);
            }
          }}
          onClose={onBackToVehicleCheck}
        />
      </section>
    </section>
  );
}
