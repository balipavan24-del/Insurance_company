import { useEffect, useMemo, useState } from 'react';
import { modalOverlayClass, modalPanelClass } from '../../../components/AnimatedModal/AnimatedModal';
import './NewVehicle.css';

// ---------------------------------------------------------------------------
// Card label on motor page (used by MotorInsurance.jsx)
// ---------------------------------------------------------------------------

export function getNewVehicleCategoryLabel(categoryId) {
  switch (categoryId) {
    case 'motor-bike':
      return 'Bike';
    case 'motor-three-wheeler':
      return 'Auto';
    case 'motor-commercial-vehicle':
      return 'Commercial Vehicle';
    case 'motor-car':
    default:
      return 'Car';
  }
}

// ---------------------------------------------------------------------------
// Dummy wizard config per category — switch by icon user clicked
// API keys: vehicleType, manufacturer, model, registrationYear, policyType
// ---------------------------------------------------------------------------

const POLICY_TYPE_OPTIONS = ['New Insurance', 'Renewal'];
const YEAR_OPTIONS = ['2025', '2024', '2023', '2022', '2021', 'Older'];

function getNewVehicleWizardConfig(categoryId) {
  switch (categoryId) {
    case 'motor-bike':
      return {
        flowTitle: 'Bike Insurance',
        steps: [
          { field: 'vehicleType', stepLabel: 'Select Bike Type', heading: 'Select Bike Type', subtitle: 'Choose your two-wheeler category', layout: 'list' },
          { field: 'manufacturer', stepLabel: 'Select Manufacturer', heading: 'Select Manufacturer', subtitle: 'Pick your bike brand', layout: 'grid' },
          { field: 'model', stepLabel: 'Select Model', heading: 'Select Model', subtitle: 'Popular models for your bike', layout: 'grid' },
          { field: 'registrationYear', stepLabel: 'Registration Year', heading: 'Registration Year', subtitle: 'When was your bike registered?', layout: 'grid-3' },
          { field: 'policyType', stepLabel: 'Policy Type', heading: 'Policy Type', subtitle: 'How would you like to proceed?', hint: 'Select an option to view tailored plans', layout: 'list' },
        ],
        options: {
          vehicleType: ['Scooter', 'Motorcycle', 'Electric Bike'],
          manufacturer: ['Hero', 'Honda', 'Bajaj', 'TVS', 'Yamaha'],
          model: ['Splendor Plus', 'Shine 125', 'Pulsar 150', 'Apache RTR 160', 'FZ-S Fi'],
          registrationYear: YEAR_OPTIONS,
          policyType: POLICY_TYPE_OPTIONS,
        },
      };

    case 'motor-three-wheeler':
      return {
        flowTitle: 'Three Wheeler Insurance',
        steps: [
          { field: 'vehicleType', stepLabel: 'Select Vehicle Type', heading: 'Select Vehicle Type', subtitle: 'Choose your three-wheeler category', layout: 'list' },
          { field: 'manufacturer', stepLabel: 'Select Manufacturer', heading: 'Select Manufacturer', subtitle: 'Pick your three-wheeler brand', layout: 'grid' },
          { field: 'model', stepLabel: 'Select Model', heading: 'Select Model', subtitle: 'Popular models for your vehicle', layout: 'grid' },
          { field: 'registrationYear', stepLabel: 'Registration Year', heading: 'Registration Year', subtitle: 'When was your vehicle registered?', layout: 'grid-3' },
          { field: 'policyType', stepLabel: 'Policy Type', heading: 'Policy Type', subtitle: 'How would you like to proceed?', hint: 'Select an option to view tailored plans', layout: 'list' },
        ],
        options: {
          vehicleType: ['Passenger Auto', 'Cargo Auto', 'Electric Auto'],
          manufacturer: ['Bajaj', 'Piaggio', 'Mahindra', 'Atul', 'TVS'],
          model: ['RE Compact', 'Maxima Z', 'Treo', 'Gem Paxx', 'King Deluxe'],
          registrationYear: YEAR_OPTIONS,
          policyType: POLICY_TYPE_OPTIONS,
        },
      };

    case 'motor-commercial-vehicle':
      return {
        flowTitle: 'Commercial Vehicle Insurance',
        steps: [
          { field: 'vehicleType', stepLabel: 'Select Vehicle Type', heading: 'Select Vehicle Type', subtitle: 'Choose your commercial vehicle type', layout: 'list' },
          { field: 'manufacturer', stepLabel: 'Select Manufacturer', heading: 'Select Manufacturer', subtitle: 'Pick your commercial vehicle brand', layout: 'grid' },
          { field: 'model', stepLabel: 'Select Model', heading: 'Select Model', subtitle: 'Popular models for your fleet', layout: 'grid' },
          { field: 'registrationYear', stepLabel: 'Registration Year', heading: 'Registration Year', subtitle: 'When was your vehicle registered?', layout: 'grid-3' },
          { field: 'policyType', stepLabel: 'Policy Type', heading: 'Policy Type', subtitle: 'How would you like to proceed?', hint: 'Select an option to view tailored plans', layout: 'list' },
        ],
        options: {
          vehicleType: ['Mini Truck', 'Pickup', 'LCV', 'Bus'],
          manufacturer: ['Tata', 'Ashok Leyland', 'Eicher', 'Mahindra', 'Force'],
          model: ['Ace Gold', 'Dost Plus', 'Pro 2049', 'Bolero Pickup', 'Traveller'],
          registrationYear: YEAR_OPTIONS,
          policyType: POLICY_TYPE_OPTIONS,
        },
      };

    case 'motor-car':
    default:
      return {
        flowTitle: 'Car Insurance',
        steps: [
          { field: 'vehicleType', stepLabel: 'Select Body Type', heading: 'Select Body Type', subtitle: 'Choose your car category', layout: 'list' },
          { field: 'manufacturer', stepLabel: 'Select Manufacturer', heading: 'Select Manufacturer', subtitle: 'Pick your car brand', layout: 'grid' },
          { field: 'model', stepLabel: 'Select Model', heading: 'Select Model', subtitle: 'Popular models for your car', layout: 'grid' },
          { field: 'registrationYear', stepLabel: 'Registration Year', heading: 'Registration Year', subtitle: 'When was your car registered?', layout: 'grid-3' },
          { field: 'policyType', stepLabel: 'Policy Type', heading: 'Policy Type', subtitle: 'How would you like to proceed?', hint: 'Select an option to view tailored plans', layout: 'list' },
        ],
        options: {
          vehicleType: ['Hatchback', 'Sedan', 'SUV', 'MUV'],
          manufacturer: ['Maruti Suzuki', 'Hyundai', 'Tata', 'Honda', 'Mahindra'],
          model: ['Swift', 'i20', 'Nexon', 'City', 'XUV700'],
          registrationYear: YEAR_OPTIONS,
          policyType: POLICY_TYPE_OPTIONS,
        },
      };
  }
}

const EMPTY_FORM = {
  vehicleType: '',
  manufacturer: '',
  model: '',
  registrationYear: '',
  policyType: '',
};

function CheckBadgeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
      <path
        d="M8 12.2l2.2 2.2L16 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NewVehicle({
  selectedCategory = 'motor-car',
  motionClosing = false,
  onBackToVehicleCheck,
  onContinue,
}) {
  const categoryId = selectedCategory || 'motor-car';
  const config = useMemo(() => getNewVehicleWizardConfig(categoryId), [categoryId]);
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState({ ...EMPTY_FORM });

  useEffect(() => {
    setStepIndex(0);
    setFormData({ ...EMPTY_FORM });
  }, [categoryId]);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousBodyOverflow;
    };
  }, []);

  const { flowTitle, steps, options } = config;
  const currentStep = steps[stepIndex];
  const currentField = currentStep.field;
  const currentValue = formData[currentField];
  const stepOptions = options[currentField] || [];
  const isLastStep = stepIndex === steps.length - 1;
  const canContinue = Boolean(String(currentValue || '').trim());

  const layoutClass = currentStep.layout === 'grid-3'
    ? 'new-vehicle__options--grid-3'
    : currentStep.layout === 'grid'
      ? 'new-vehicle__options--grid'
      : 'new-vehicle__options--list';

  const handleSelect = (value) => {
    const nextFormData = { ...formData, [currentField]: value };
    setFormData(nextFormData);

    if (isLastStep) {
      onContinue?.({ ...nextFormData, vehicleCategory: categoryId });
      return;
    }
    setStepIndex((prev) => prev + 1);
  };

  const handleBack = () => {
    if (stepIndex === 0) {
      onBackToVehicleCheck?.();
      return;
    }
    setStepIndex((prev) => prev - 1);
  };

  const handleContinue = () => {
    if (!canContinue) {
      return;
    }
    if (isLastStep) {
      onContinue?.({ ...formData, vehicleCategory: categoryId });
      return;
    }
    setStepIndex((prev) => prev + 1);
  };

  return (
    <section
      className={modalOverlayClass(motionClosing, 'new-vehicle-overlay')}
      role="dialog"
      aria-modal="true"
      aria-label={flowTitle}
      data-motor-flow="brand-new-vehicle"
      data-motor-selected-category={categoryId}
    >
      <div className={modalPanelClass(motionClosing, 'new-vehicle')}>
        <header className="new-vehicle__header">
          <div className="new-vehicle__header-start">
            {stepIndex === 0 ? (
              <span className="new-vehicle__badge" aria-hidden="true">
                <CheckBadgeIcon />
              </span>
            ) : (
              <button type="button" className="new-vehicle__back" onClick={handleBack} aria-label="Go back">
                ←
              </button>
            )}
          </div>
          <div className="new-vehicle__header-text">
            <h2>{flowTitle}</h2>
            <p>
              Step {stepIndex + 1} of {steps.length} · {currentStep.stepLabel}
            </p>
          </div>
          <button type="button" className="new-vehicle__close" onClick={onBackToVehicleCheck} aria-label="Close">
            ×
          </button>
        </header>

        <div className="new-vehicle__progress" aria-hidden="true">
          {steps.map((step, index) => (
            <span
              key={step.field}
              className={`new-vehicle__progress-segment${index <= stepIndex ? ' is-filled' : ''}`}
            />
          ))}
        </div>

        <div className="new-vehicle__body">
          <h3>{currentStep.heading}</h3>
          <p className="new-vehicle__subtitle">{currentStep.subtitle}</p>

          <div className={`new-vehicle__options ${layoutClass}`} role="listbox" aria-label={currentStep.heading}>
            {stepOptions.map((option) => (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={currentValue === option}
                className={`new-vehicle__option${currentValue === option ? ' is-selected' : ''}`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>

          {currentStep.hint && <p className="new-vehicle__hint">{currentStep.hint}</p>}
        </div>

        <footer className="new-vehicle__footer">
          <span className="new-vehicle__step-count">
            {stepIndex + 1} / {steps.length}
          </span>
          <button
            type="button"
            className={`new-vehicle__continue${canContinue ? '' : ' is-disabled'}`}
            onClick={handleContinue}
            disabled={!canContinue}
          >
            Tap to continue <span aria-hidden="true">→</span>
          </button>
        </footer>
      </div>
    </section>
  );
}

export default NewVehicle;
