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

const commercialSteps = [
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
  sharedSteps.registrationYear,
  sharedSteps.city,
  { ...sharedSteps.deliveryTimeline, stepTitle: 'When will you start using the commercial vehicle?' },
  sharedSteps.policyType,
  sharedSteps.contactDetails,
];

const brandModelVariantData = {
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
};

const summarySequence = commercialSteps
  .filter((step) => step.summaryLabel)
  .map((step) => ({ field: step.field, summaryLabel: step.summaryLabel }));

const emptyForm = {
  vehicleCategory: '',
  brand: '',
  model: '',
  payloadCapacity: '',
  registrationYear: '',
  city: '',
  deliveryTimeline: '',
  policyType: '',
  name: '',
  mobile: '',
};

function mergeForm(prev, field, value) {
  const next = { ...prev, [field]: value };
  if (field === 'vehicleCategory') {
    next.brand = '';
    next.model = '';
  }
  if (field === 'brand') {
    next.model = '';
  }
  return next;
}

export function Newcommercial({ motionClosing = false, onBackToVehicleCheck, onContinue }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({ ...emptyForm });

  const brands = useMemo(() => Object.keys(brandModelVariantData), []);
  const currentStep = commercialSteps[stepIndex];
  const lastIndex = commercialSteps.length - 1;

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

  const renderCategoryStep = () => (
    <OptionGrid
      options={currentStep.options}
      field="vehicleCategory"
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
      case 'vehicleCategory':
        return renderCategoryStep();
      case 'brand':
        return renderBrandStep();
      case 'model':
        return renderModelStep();
      case 'payloadCapacity':
      case 'registrationYear':
      case 'city':
      case 'policyType':
        return (
          <OptionGrid
            options={currentStep.options || []}
            field={currentStep.field}
            formData={formData}
            brandGrid={currentStep.field === 'payloadCapacity'}
            singleCol={currentStep.field !== 'payloadCapacity'}
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
    <section className={modalOverlayClass(motionClosing, 'nv-overlay')} role="dialog" aria-modal="true" aria-label="New commercial vehicle details form">
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
          title="Your Commercial Vehicle Details"
          onEdit={(field) => {
            const index = commercialSteps.findIndex((step) => step.field === field);
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
