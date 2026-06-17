import { useMemo, useState } from 'react';
import './WithoutNumber.css';

// Guest flow data — move to API when backend is live
const CATEGORY_OPTIONS = {
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

const REGISTRATION_YEARS = ['2014', '2016', '2018', '2020', '2022'];
const CITIES = ['Jaipur', 'Hyderabad', 'Bengaluru', 'Chennai'];
const INSURERS = ['Oriental Insurance', 'HDFC Ergo', 'ICICI Lombard', 'Bajaj Allianz'];

const getGuestCategoryData = (categoryId) => {
  const categoryData = CATEGORY_OPTIONS[categoryId] || CATEGORY_OPTIONS['motor-car'];
  const vehicleTypeId = categoryId in CATEGORY_OPTIONS ? categoryId : 'motor-car';

  return {
    vehicleType: vehicleTypeId,
    vehicleTypeLabel: categoryData.vehicleTypeLabel,
    selectOptions: {
      brand: categoryData.brands,
      model: categoryData.models,
      variant: categoryData.variants,
      registrationYear: REGISTRATION_YEARS,
      registrationCity: CITIES,
    },
    defaultFormValues: {
      brand: '',
      model: '',
      variant: '',
      registrationYear: '',
      registrationCity: '',
    },
    insurers: INSURERS,
    titles: {
      heading: 'Browse Insurance Plans',
      subtitle: 'Complete the details below to find the best plans for you.',
      cardHeading: 'Vehicle Details',
      insuranceCardHeading: 'Insurance Details',
    },
    steps: [
      { id: 1, label: 'Vehicle Details', isActive: true },
      { id: 2, label: 'Insurance Details', isActive: false },
    ],
    vehicleRequiredFields: ['brand', 'model', 'variant', 'registrationYear', 'registrationCity'],
    defaultInsuranceFormValues: {
      previousPolicyExpiryDate: '',
      previousInsurer: '',
      hadClaimLastYear: '',
    },
  };
};

function WithoutNumber({ selectedCategory = 'motor-car', onBackToVehicleCheck, onContinue, isModal = false }) {
  const defaultVehicleType = selectedCategory || 'motor-car';

  const guestData = useMemo(
    () => getGuestCategoryData(defaultVehicleType),
    [defaultVehicleType]
  );
  const [planForm, setPlanForm] = useState(guestData.defaultFormValues);
  const [currentStep, setCurrentStep] = useState(1);
  const [vehicleDetailsErrors, setVehicleDetailsErrors] = useState({});
  const [insuranceForm, setInsuranceForm] = useState({ ...guestData.defaultInsuranceFormValues });

  const closeActiveDropdown = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    document.body.classList.add('motor-disable-hover');
    window.setTimeout(() => {
      document.body.classList.remove('motor-disable-hover');
    }, 120);
  };

  const handlePlanFieldChange = (event) => {
    const { name, value } = event.target;
    setPlanForm((prev) => ({
      ...prev,
      [name]: value
    }));
    if (value && vehicleDetailsErrors[name]) {
      setVehicleDetailsErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleVehicleDetailsContinue = () => {
    const nextErrors = guestData.vehicleRequiredFields.reduce((acc, field) => {
      if (!String(planForm[field] || '').trim()) {
        acc[field] = 'Please fill this field.';
      }
      return acc;
    }, {});
    if (Object.keys(nextErrors).length > 0) {
      setVehicleDetailsErrors(nextErrors);
      return;
    }
    setVehicleDetailsErrors({});
    closeActiveDropdown();
    setCurrentStep(2);
  };

  const handleInsuranceFieldChange = (event) => {
    const { name, value } = event.target;
    setInsuranceForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInsuranceToggleChange = (field, value) => {
    setInsuranceForm((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const vehicleSummary = `${planForm.brand} ${planForm.model} ${planForm.variant} • ${planForm.registrationYear} • ${planForm.registrationCity}`;

  return (
    <section
      className={`motor-plans-view${isModal ? ' motor-plans-view--modal' : ''}`}
      data-motor-flow="without-vehicle-number"
      data-motor-selected-category={defaultVehicleType}
    >
      {!isModal && (
        <button
          type="button"
          className="motor-plans-back-link"
          onClick={onBackToVehicleCheck}
        >
          ← Back to Vehicle Check
        </button>
      )}

      <header className="motor-plans-header">
        <h1>{guestData.titles.heading}</h1>
        <p>{guestData.titles.subtitle}</p>
      </header>

      <section className="motor-steps" aria-label="Form progress">
        {guestData.steps.map((step, index) => (
          <div
            key={step.id}
            className={`motor-step-wrap${index < guestData.steps.length - 1 ? ' has-line' : ''}`}
          >
            <div className={`motor-step${step.id === currentStep ? ' is-active' : ''}${step.id < currentStep ? ' is-done' : ''}`}>
              <span>{step.id < currentStep ? '✓' : step.id}</span>
              <p>{step.label}</p>
            </div>
            {index < guestData.steps.length - 1 && (
              <div className={`motor-step-line${step.id < currentStep ? ' is-active' : ''}`} aria-hidden="true" />
            )}
          </div>
        ))}
      </section>

      <section className="motor-plan-card">
        {currentStep === 1 && (
          <div className="guest-screen guest-screen--vehicle-details">
            <h2>{guestData.titles.cardHeading}</h2>
            <form className="motor-plan-form" onSubmit={(event) => event.preventDefault()}>
              <p className="motor-plan-label">Vehicle Type</p>
              <p className="motor-plan-vehicle-type-fixed" aria-live="polite">
                {guestData.vehicleTypeLabel}
              </p>

              <label htmlFor="planBrand" className="motor-plan-label">Brand</label>
              <select
                id="planBrand"
                name="brand"
                value={planForm.brand}
                onChange={handlePlanFieldChange}
                className={vehicleDetailsErrors.brand ? 'motor-form-field-error' : ''}
              >
                <option value="">Select</option>
                {guestData.selectOptions.brand.map((brand) => (
                  <option key={brand}>{brand}</option>
                ))}
              </select>
              {vehicleDetailsErrors.brand && <p className="motor-form-error">{vehicleDetailsErrors.brand}</p>}

              <label htmlFor="planModel" className="motor-plan-label">Model</label>
              <select
                id="planModel"
                name="model"
                value={planForm.model}
                onChange={handlePlanFieldChange}
                className={vehicleDetailsErrors.model ? 'motor-form-field-error' : ''}
              >
                <option value="">Select</option>
                {guestData.selectOptions.model.map((model) => (
                  <option key={model}>{model}</option>
                ))}
              </select>
              {vehicleDetailsErrors.model && <p className="motor-form-error">{vehicleDetailsErrors.model}</p>}

              <label htmlFor="planVariant" className="motor-plan-label">Variant</label>
              <select
                id="planVariant"
                name="variant"
                value={planForm.variant}
                onChange={handlePlanFieldChange}
                className={vehicleDetailsErrors.variant ? 'motor-form-field-error' : ''}
              >
                <option value="">Select</option>
                {guestData.selectOptions.variant.map((variant) => (
                  <option key={variant}>{variant}</option>
                ))}
              </select>
              {vehicleDetailsErrors.variant && <p className="motor-form-error">{vehicleDetailsErrors.variant}</p>}

              <label htmlFor="planRegistrationYear" className="motor-plan-label">Registration Year</label>
              <select
                id="planRegistrationYear"
                name="registrationYear"
                value={planForm.registrationYear}
                onChange={handlePlanFieldChange}
                className={vehicleDetailsErrors.registrationYear ? 'motor-form-field-error' : ''}
              >
                <option value="">Select</option>
                {guestData.selectOptions.registrationYear.map((registrationYear) => (
                  <option key={registrationYear}>{registrationYear}</option>
                ))}
              </select>
              {vehicleDetailsErrors.registrationYear && <p className="motor-form-error">{vehicleDetailsErrors.registrationYear}</p>}

              <label htmlFor="planRegistrationCity" className="motor-plan-label">Registration City</label>
              <select
                id="planRegistrationCity"
                name="registrationCity"
                value={planForm.registrationCity}
                onChange={handlePlanFieldChange}
                className={vehicleDetailsErrors.registrationCity ? 'motor-form-field-error' : ''}
              >
                <option value="">Select</option>
                {guestData.selectOptions.registrationCity.map((registrationCity) => (
                  <option key={registrationCity}>{registrationCity}</option>
                ))}
              </select>
              {vehicleDetailsErrors.registrationCity && <p className="motor-form-error">{vehicleDetailsErrors.registrationCity}</p>}

              <button type="button" className="motor-plan-continue-btn" onClick={handleVehicleDetailsContinue}>
                Continue <span aria-hidden="true">→</span>
              </button>
            </form>
          </div>
        )}

        {currentStep === 2 && (
          <div className="guest-screen guest-screen--insurance-details">
            <div className="motor-plan-card-header">
              <h2>{guestData.titles.insuranceCardHeading}</h2>
              <button type="button" className="motor-edit-vehicle-btn" onClick={() => setCurrentStep(1)}>
                Edit Vehicle
              </button>
            </div>

            <div className="motor-vehicle-summary" aria-label="Selected vehicle">
              <span className="motor-vehicle-summary__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" focusable="false">
                  <path
                    d="M5 11h14M7 16h2M15 16h2M6.5 11 7.8 8.5h8.4L17.5 11"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="8.5" cy="16" r="1.2" fill="currentColor" />
                  <circle cx="15.5" cy="16" r="1.2" fill="currentColor" />
                </svg>
              </span>
              <span className="motor-vehicle-summary__text">{vehicleSummary}</span>
            </div>

            <form className="motor-plan-form motor-insurance-form">
              <label htmlFor="previousPolicyExpiryDate" className="motor-plan-label">Previous Policy Expiry Date</label>
              <div className="motor-date-field-wrap">
                <input
                  id="previousPolicyExpiryDate"
                  name="previousPolicyExpiryDate"
                  type="date"
                  className={`motor-date-input${insuranceForm.previousPolicyExpiryDate ? '' : ' is-empty'}`}
                  value={insuranceForm.previousPolicyExpiryDate}
                  onChange={handleInsuranceFieldChange}
                />
                {!insuranceForm.previousPolicyExpiryDate && (
                  <span className="motor-date-placeholder" aria-hidden="true">Select date</span>
                )}
              </div>

              <label htmlFor="previousInsurer" className="motor-plan-label">
                Previous Insurer <span className="motor-optional-text">(optional)</span>
              </label>
              <select
                id="previousInsurer"
                name="previousInsurer"
                className={insuranceForm.previousInsurer ? '' : 'motor-select--placeholder'}
                value={insuranceForm.previousInsurer}
                onChange={handleInsuranceFieldChange}
              >
                <option value="">Select insurer</option>
                {guestData.insurers.map((insurer) => (
                  <option key={insurer} value={insurer}>{insurer}</option>
                ))}
              </select>

              <label className="motor-plan-label" id="motor-guest-claim-label">Claim in Last Year?</label>
              <div className="motor-yes-no-row" role="group" aria-labelledby="motor-guest-claim-label">
                <button
                  type="button"
                  className={`motor-yes-no-btn${insuranceForm.hadClaimLastYear === 'yes' ? ' is-active' : ''}`}
                  aria-pressed={insuranceForm.hadClaimLastYear === 'yes'}
                  aria-label="Claim in last year: Yes"
                  onClick={() => handleInsuranceToggleChange('hadClaimLastYear', 'yes')}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`motor-yes-no-btn${insuranceForm.hadClaimLastYear === 'no' ? ' is-active' : ''}`}
                  aria-pressed={insuranceForm.hadClaimLastYear === 'no'}
                  aria-label="Claim in last year: No"
                  onClick={() => handleInsuranceToggleChange('hadClaimLastYear', 'no')}
                >
                  No
                </button>
              </div>

              <div className="motor-insurance-action-row">
                <button type="button" className="motor-back-step-btn" onClick={() => setCurrentStep(1)}>
                  ← Back
                </button>
                <button
                  type="button"
                  className="motor-plan-continue-btn"
                  onClick={() => {
                    closeActiveDropdown();
                    onContinue?.({
                      vehicle: {
                        ...planForm,
                        vehicleType: defaultVehicleType,
                        vehicleTypeLabel: guestData.vehicleTypeLabel,
                      },
                      insurance: insuranceForm,
                    });
                  }}
                >
                  View Plans <span aria-hidden="true">→</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </section>
    </section>
  );
}

export default WithoutNumber;
