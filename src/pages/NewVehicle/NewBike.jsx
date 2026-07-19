import { useMemo, useState } from 'react';
import { modalOverlayClass, modalPanelClass } from '../../components/AnimatedModal/AnimatedModal';
import { SearchBox, OptionGrid, FuelCards, DeliveryCards, ContactForm, SummaryPanel } from './NewVehicleUI';
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

const bikeSteps = [
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
    options: [
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
  sharedSteps.registrationYear,
  sharedSteps.city,
  { ...sharedSteps.deliveryTimeline, stepTitle: 'When will you start using the bike?' },
  sharedSteps.contactDetails,
];

const brandModelVariantData = {
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
};

const summarySequence = bikeSteps
  .filter((step) => step.summaryLabel)
  .map((step) => ({ field: step.field, summaryLabel: step.summaryLabel }));

const emptyForm = {
  brand: '',
  model: '',
  engine: '',
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
    next.engine = '';
  }
  if (field === 'model') {
    next.variant = '';
  }
  return next;
}

export function Newbike({ motionClosing = false, onBackToVehicleCheck, onContinue }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({ ...emptyForm });

  const brands = useMemo(() => Object.keys(brandModelVariantData), []);
  const currentStep = bikeSteps[stepIndex];
  const lastIndex = bikeSteps.length - 1;

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
      case 'engine':
        options = currentStep.options || [];
        break;
      default:
        options = currentStep.options || [];
    }
    const query = searchText.trim().toLowerCase();
    if (!query || currentStep.field === 'engine') return options;
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

  const renderEngineStep = () => (
    <OptionGrid
      options={currentStep.options}
      field="engine"
      formData={formData}
      engine
      singleCol
      onPick={onOptionPick}
    />
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
        singleCol
        onPick={onOptionPick}
      />
    </>
  );

  const renderStep = () => {
    switch (currentStep.field) {
      case 'brand':
        return renderBrandStep();
      case 'engine':
        return renderEngineStep();
      case 'model':
      case 'variant':
        return renderSearchableStep();
      case 'fuelType':
        return (
          <FuelCards
            options={currentStep.fuelCardOptions}
            selectedValue={formData.fuelType}
            onPick={onOptionPick}
          />
        );
      case 'registrationYear':
      case 'city':
        return (
          <OptionGrid
            options={currentStep.options || []}
            field={currentStep.field}
            formData={formData}
            singleCol={currentStep.field === 'city'}
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
    <section className={modalOverlayClass(motionClosing, 'nv-overlay')} role="dialog" aria-modal="true" aria-label="New bike details form">
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
          title="Your Bike Details"
          onEdit={(field) => {
            const index = bikeSteps.findIndex((step) => step.field === field);
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
