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

const threeWheelerSteps = [
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
  sharedSteps.registrationYear,
  sharedSteps.city,
  { ...sharedSteps.deliveryTimeline, stepTitle: 'When will you start using the three-wheeler?' },
  sharedSteps.policyType,
  sharedSteps.contactDetails,
];

const brandModelVariantData = {
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
};

const summarySequence = threeWheelerSteps
  .filter((step) => step.summaryLabel)
  .map((step) => ({ field: step.field, summaryLabel: step.summaryLabel }));

const emptyForm = {
  vehicleType: '',
  brand: '',
  model: '',
  fuelType: '',
  registrationYear: '',
  city: '',
  deliveryTimeline: '',
  policyType: '',
  name: '',
  mobile: '',
};

function mergeForm(prev, field, value) {
  const next = { ...prev, [field]: value };
  if (field === 'vehicleType') {
    next.brand = '';
    next.model = '';
    next.fuelType = '';
  }
  if (field === 'brand') {
    next.model = '';
  }
  return next;
}

export function Newthreewheeler({ motionClosing = false, onBackToVehicleCheck, onContinue }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({ ...emptyForm });

  const brands = useMemo(() => Object.keys(brandModelVariantData), []);
  const currentStep = threeWheelerSteps[stepIndex];
  const lastIndex = threeWheelerSteps.length - 1;

  const modelOptions = useMemo(
    () => (brandModelVariantData[formData.brand] || []).map((row) => row.model),
    [formData.brand],
  );

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
      default:
        options = currentStep.options || [];
    }
    const query = searchText.trim().toLowerCase();
    if (!query) return options;
    return options.filter((option) => String(option).toLowerCase().includes(query));
  }, [currentStep, modelOptions, searchText]);

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
    const isContinueField = currentStep.field === 'vehicleType' || currentStep.field === 'brand';
    if (isContinueField && !String(formData[currentStep.field] || '').trim()) {
      // Continue fields still auto-advance
    }
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

  const renderTypeStep = () => (
    <OptionGrid
      options={currentStep.options}
      field="vehicleType"
      formData={formData}
      singleCol
      onPick={onOptionPick}
    />
  );

  const renderBrandStep = () => (
    <>
      <SearchBox placeholder="Search manufacturer..." value={searchText} onChange={setSearchText} />
      <OptionGrid options={filteredBrands} field="brand" formData={formData} brandGrid onPick={onOptionPick} />
    </>
  );

  const renderModelStep = () => (
    <>
      <SearchBox placeholder="Search model..." value={searchText} onChange={setSearchText} />
      <OptionGrid options={filteredOptions} field="model" formData={formData} singleCol onPick={onOptionPick} />
    </>
  );

  const renderStep = () => {
    switch (currentStep.field) {
      case 'vehicleType':
        return renderTypeStep();
      case 'brand':
        return renderBrandStep();
      case 'model':
        return renderModelStep();
      case 'fuelType':
      case 'registrationYear':
      case 'city':
      case 'policyType':
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
    <section className={modalOverlayClass(motionClosing, 'nv-overlay')} role="dialog" aria-modal="true" aria-label="New three-wheeler details form">
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
          title="Your Three Wheeler Details"
          onEdit={(field) => {
            const index = threeWheelerSteps.findIndex((step) => step.field === field);
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
