import { useMemo, useState } from 'react';
import { GUEST_DUMMY_DATA, getGuestCategoryDummyData } from '../GuestDummyData';
import './WithoutNumber.css';

function WithoutNumber({ selectedCategory = 'motor-car', onBackToVehicleCheck, onContinue }) {
  const requiredVehicleFields = ['brand', 'model', 'variant', 'registrationYear', 'registrationCity'];
  const withoutNumberSteps = GUEST_DUMMY_DATA.steps.filter((step) => step.id !== 3);
  const initialCategoryDummyData = useMemo(
    () => getGuestCategoryDummyData(selectedCategory),
    [selectedCategory]
  );
  const [planVehicleType, setPlanVehicleType] = useState(initialCategoryDummyData.vehicleTypeId);
  const categoryDummyData = useMemo(
    () => getGuestCategoryDummyData(planVehicleType),
    [planVehicleType]
  );
  const [planForm, setPlanForm] = useState(initialCategoryDummyData.defaultFormValues);
  const [currentStep, setCurrentStep] = useState(1);
  const [vehicleDetailsErrors, setVehicleDetailsErrors] = useState({});
  const [insuranceForm, setInsuranceForm] = useState({
    previousPolicyExpiryDate: GUEST_DUMMY_DATA.insuranceDetails.defaultPreviousPolicyExpiryDate,
    previousInsurer: GUEST_DUMMY_DATA.insuranceDetails.defaultPreviousInsurer,
    hadClaimLastYear: GUEST_DUMMY_DATA.insuranceDetails.defaultHadClaimLastYear,
    ownershipChangedLast12Months: GUEST_DUMMY_DATA.insuranceDetails.defaultOwnershipChangedLast12Months
  });

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
    const nextErrors = requiredVehicleFields.reduce((acc, field) => {
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
      className="motor-plans-view"
      data-motor-flow="without-vehicle-number"
      data-motor-selected-category={selectedCategory}
    >
      <button
        type="button"
        className="motor-plans-back-link"
        onClick={onBackToVehicleCheck}
      >
        ← Back to Vehicle Check
      </button>

      <header className="motor-plans-header">
        <h1>{GUEST_DUMMY_DATA.titles.heading}</h1>
        <p>{GUEST_DUMMY_DATA.titles.subtitle}</p>
      </header>

      <section className="motor-steps" aria-label="Form progress">
        {withoutNumberSteps.map((step, index) => (
          <div
            key={step.id}
            className={`motor-step-wrap${index < withoutNumberSteps.length - 1 ? ' has-line' : ''}`}
          >
            <div className={`motor-step${step.id === currentStep ? ' is-active' : ''}${step.id < currentStep ? ' is-done' : ''}`}>
              <span>{step.id < currentStep ? '✓' : step.id}</span>
              <p>{step.label}</p>
            </div>
            {index < withoutNumberSteps.length - 1 && (
              <div className={`motor-step-line${step.id < currentStep ? ' is-active' : ''}`} aria-hidden="true" />
            )}
          </div>
        ))}
      </section>

      <section className="motor-plan-card">
        {currentStep === 1 && (
          <div className="guest-screen guest-screen--vehicle-details">
            <h2>{GUEST_DUMMY_DATA.titles.cardHeading}</h2>
            <form className="motor-plan-form" onSubmit={(event) => event.preventDefault()}>
              <label htmlFor="planVehicleType" className="motor-plan-label">Vehicle Type</label>
              <select
                id="planVehicleType"
                name="vehicleType"
                value={planVehicleType}
                onChange={(event) => {
                  const nextType = event.target.value;
                  const nextCategoryData = getGuestCategoryDummyData(nextType);
                  setPlanVehicleType(nextType);
                  setPlanForm(nextCategoryData.defaultFormValues);
                  setVehicleDetailsErrors({});
                }}
              >
                {GUEST_DUMMY_DATA.vehicleTypeOptions.map((vehicleTypeOption) => (
                  <option key={vehicleTypeOption.id} value={vehicleTypeOption.id}>
                    {vehicleTypeOption.label}
                  </option>
                ))}
              </select>

              <label htmlFor="planBrand" className="motor-plan-label">Brand</label>
              <select
                id="planBrand"
                name="brand"
                value={planForm.brand}
                onChange={handlePlanFieldChange}
                className={vehicleDetailsErrors.brand ? 'motor-form-field-error' : ''}
              >
                <option value="">Select</option>
                {categoryDummyData.selectOptions.brand.map((brand) => (
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
                {categoryDummyData.selectOptions.model.map((model) => (
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
                {categoryDummyData.selectOptions.variant.map((variant) => (
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
                {categoryDummyData.selectOptions.registrationYear.map((registrationYear) => (
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
                {categoryDummyData.selectOptions.registrationCity.map((registrationCity) => (
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
              <h2>{GUEST_DUMMY_DATA.titles.insuranceCardHeading}</h2>
              <button type="button" className="motor-edit-vehicle-btn" onClick={() => setCurrentStep(1)}>
                Edit Vehicle
              </button>
            </div>

            <div className="motor-vehicle-summary">{vehicleSummary}</div>

            <form className="motor-plan-form motor-insurance-form">
              <label htmlFor="previousPolicyExpiryDate" className="motor-plan-label">Previous Policy Expiry Date</label>
              <input
                id="previousPolicyExpiryDate"
                name="previousPolicyExpiryDate"
                type="date"
                className="motor-date-input"
                value={insuranceForm.previousPolicyExpiryDate}
                onChange={handleInsuranceFieldChange}
              />

              <label htmlFor="previousInsurer" className="motor-plan-label">
                Previous Insurer <span className="motor-optional-text">(optional)</span>
              </label>
              <select
                id="previousInsurer"
                name="previousInsurer"
                value={insuranceForm.previousInsurer}
                onChange={handleInsuranceFieldChange}
              >
                {GUEST_DUMMY_DATA.insuranceDetails.previousInsurerOptions.map((insurer) => (
                  <option key={insurer}>{insurer}</option>
                ))}
              </select>

              <label className="motor-plan-label">Claim in Last Year?</label>
              <div className="motor-yes-no-row">
                <button
                  type="button"
                  className={`motor-yes-no-btn${insuranceForm.hadClaimLastYear === 'yes' ? ' is-active' : ''}`}
                  onClick={() => handleInsuranceToggleChange('hadClaimLastYear', 'yes')}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`motor-yes-no-btn${insuranceForm.hadClaimLastYear === 'no' ? ' is-active' : ''}`}
                  onClick={() => handleInsuranceToggleChange('hadClaimLastYear', 'no')}
                >
                  No
                </button>
              </div>

              <label className="motor-plan-label">Has ownership changed in last 12 months?</label>
              <div className="motor-yes-no-row">
                <button
                  type="button"
                  className={`motor-yes-no-btn${insuranceForm.ownershipChangedLast12Months === 'yes' ? ' is-active' : ''}`}
                  onClick={() => handleInsuranceToggleChange('ownershipChangedLast12Months', 'yes')}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`motor-yes-no-btn${insuranceForm.ownershipChangedLast12Months === 'no' ? ' is-active' : ''}`}
                  onClick={() => handleInsuranceToggleChange('ownershipChangedLast12Months', 'no')}
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
                    onContinue?.({ vehicle: planForm, insurance: insuranceForm });
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
