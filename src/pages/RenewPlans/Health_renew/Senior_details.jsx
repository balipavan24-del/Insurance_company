import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { HiOutlineXMark } from 'react-icons/hi2';
import {
  HiOutlineClock,
  HiOutlineLockClosed,
  HiOutlineOfficeBuilding,
  HiOutlineCurrencyRupee,
  HiOutlineCalendar,
  HiOutlineLocationMarker,
  HiOutlineClipboardCheck,
  HiOutlinePhone,
  HiOutlineShieldCheck,
  HiOutlinePencil,
  HiOutlineUser,
  HiOutlineCheckCircle,
} from 'react-icons/hi';
import './Senior-details.css';

const OTP_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 30;

const Step = {
  EnterOtp: 1,
  PolicyInfo: 2,
  InsuranceDetails: 3,
  HealthInfo: 4,
  Review: 5,
};

// Step labels for the progress indicator.
const STEP_LABELS = ['Policy Info', 'Insurance Details', 'Health Info', 'Review'];

const ExistingInsurers = {
  heading: 'Policy Information',
  label1: 'Existing Insurer',
  label2: 'Policy Number',
  label3: 'Policy Expiry Date',
  label4: 'Sum Insured',
  list: [
    'Star Health',
    'HDFC ERGO',
    'ICICI Lombard',
    'Bajaj Allianz',
    'Niva Bupa',
    'Care Health',
    'TATA',
    'Aditya Birla',
    'Manipal Cigna',
    'New India Assurance',
    'Reliance General',
    'SBI General',
    'Kotak Mahindra',
  ],
  sumList: [
    '₹ 3 Lakh',
    '₹ 5 Lakh',
    '₹ 10 Lakh',
    '₹ 15 Lakh',
    '₹ 25 Lakh',
    '₹ 50 Lakh',
    '₹ 1 Crore',
  ],
};

const Insurance_Details = {
  heading: 'Insurance Details',
  label1: 'Full Name',
  label2: 'Date of Birth',
  label3: 'Gender',
  label4: 'City',
  genderList: ['Male', 'Female', 'Other'],
  cityList: [
    'Hyderabad',
    'Bengaluru',
    'Mumbai',
    'Delhi',
    'Chennai',
    'Kolkata',
    'Pune',
    'Ahmedabad',
    'Jaipur',
    'Lucknow',
    'Kochi',
    'Indore',
  ],
};

const HEALTH_INFO = {
  heading: 'Health Information',
  label1: 'Existing Health Conditions',
  label2: 'Other Existing Diseases',
  label3: 'Any claims made in the previous year?',
  healthConditions: ['Diabetes', 'Hypertension', 'Heart Conditions'],
  claimStatus: ['Yes', 'No'],
};
const formatResendTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

// `dateOfBirth` is an ISO YYYY-MM-DD string from the native date input.
// Returns the completed-age in years (e.g. "62") or '' if it can't be parsed.
const calculateAge = (dateOfBirth) => {
  if (!dateOfBirth) return '';
  const parts = dateOfBirth.split('-');
  if (parts.length !== 3) return '';
  const year = Number(parts[0]);
  const month = Number(parts[1]);
  const day = Number(parts[2]);
  if (!year || !month || !day) return '';
  const today = new Date();
  let age = today.getFullYear() - year;
  const hasHadBirthdayThisYear =
    today.getMonth() + 1 > month ||
    (today.getMonth() + 1 === month && today.getDate() >= day);
  if (!hasHadBirthdayThisYear) {
    age -= 1;
  }
  return Number.isNaN(age) ? '' : String(age);
};

export const Senior_details = ({ children, open, close, mobileNumber = '' }) => {
  const [otp, setOtp] = useState('');
  const [resendSeconds, setResendSeconds] = useState(RESEND_COOLDOWN_SECONDS);
  const [step, setStep] = useState(Step.EnterOtp);
  const [isPayment, setIsPayment] = useState(false);
  const [isPolicyInfoSubmitted, setIsPolicyInfoSubmitted] = useState(false);
  const [isInsuranceDetailsSubmitted, setIsInsuranceDetailsSubmitted] = useState(false);
  const [isHealthInfoSubmitted, setIsHealthInfoSubmitted] = useState(false);

  // data-step attribute for the panel — used in browser Inspect.
  const dataStep =
    step === Step.EnterOtp ? 'otp'
    : step === Step.PolicyInfo ? 'policy'
    : step === Step.InsuranceDetails ? 'insurance'
    : step === Step.HealthInfo ? 'health'
    : step === Step.Review ? (isPayment ? 'payment' : 'review')
    : 'otp';

  // Health Information form state — committed to `details` on Continue.
  const [HealthInfo, setHealthInfo] = useState({
    healthConditions: [],
    otherDiseases: '',
    claimStatus: '',
  });

  // Multi-select toggle for existing health conditions.
  const handleConditionPick = (value) => {
    setHealthInfo((prev) => ({
      ...prev,
      healthConditions: prev.healthConditions.includes(value)
        ? prev.healthConditions.filter((item) => item !== value)
        : [...prev.healthConditions, value],
    }));
  };

  // Single-select toggle for "claims made in the previous year?".
  const handleClaimPick = (value) => {
    setHealthInfo((prev) => ({
      ...prev,
      claimStatus: prev.claimStatus === value ? '' : value,
    }));
  };

  const handleHealthInfoChange = (event) => {
    const { name, value } = event.target;
    setHealthInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Collected details — summary panel reads from this.
  const [details, setDetails] = useState({
    policyType: 'Senior Citizen Health',
    mobileNumber,
    existingInsurer: '',
    policyNumber: '',
    policyExpiryDate: '',
    sumInsured: '',
    fullName: '',
    dateOfBirth: '',
    gender: '',
    age: '',
    city: '',
    healthConditions: [],
    otherDiseases: '',
    claimStatus: '',
  });

  // Form state for the current input step — committed to `details` on Continue.
  const [form, setForm] = useState({
    existingInsurer: '',
    sumInsured: '',
    policyNumber: '',
    policyExpiryDate: '',
    fullName: '',
    dateOfBirth: '',
    gender: '',
    city: '',
  });

  const resetCollected = () => {
    setDetails({
      policyType: 'Senior Citizen Health',
      mobileNumber,
      existingInsurer: '',
      policyNumber: '',
      policyExpiryDate: '',
      sumInsured: '',
      fullName: '',
      dateOfBirth: '',
      gender: '',
      age: '',
      city: '',
      healthConditions: [],
      otherDiseases: '',
      claimStatus: '',
    });
    setForm({
      existingInsurer: '',
      sumInsured: '',
      policyNumber: '',
      policyExpiryDate: '',
      fullName: '',
      dateOfBirth: '',
      gender: '',
      city: '',
    });
    setHealthInfo({
      healthConditions: [],
      otherDiseases: '',
      claimStatus: '',
    });
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleVerifyOtp = () => {
    if (otp.length !== OTP_LENGTH) {
      window.alert('Please enter a valid 6-digit OTP');
      return;
    }
    // Future: POST /api/otp/verify  { mobileNumber, otp }
    setStep(Step.PolicyInfo);
  };

  const handleResendOtp = () => {
    if (resendSeconds > 0) return;
    // Future: POST /api/otp/resend  { mobileNumber }
    setResendSeconds(RESEND_COOLDOWN_SECONDS);
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleInsurerPick = (name) => {
    setForm((prev) => ({
      ...prev,
      existingInsurer: prev.existingInsurer === name ? '' : name,
    }));
  };

  const handleSumPick = (value) => {
    setForm((prev) => ({
      ...prev,
      sumInsured: prev.sumInsured === value ? '' : value,
    }));
  };

  const handleGenderPick = (value) => {
    setForm((prev) => ({
      ...prev,
      gender: prev.gender === value ? '' : value,
    }));
  };

  const handleCityPick = (value) => {
    setForm((prev) => ({
      ...prev,
      city: prev.city === value ? '' : value,
    }));
  };

  const goBack = () => {
    if (step === Step.InsuranceDetails) {
      setForm((prev) => ({
        ...prev,
        fullName: details.fullName,
        dateOfBirth: details.dateOfBirth || '',
        gender: details.gender,
        city: details.city,
      }));
      setStep(Step.PolicyInfo);
    } else if (step === Step.HealthInfo) {
      setHealthInfo({
        healthConditions: details.healthConditions,
        otherDiseases: details.otherDiseases,
        claimStatus: details.claimStatus,
      });
      setForm((prev) => ({
        ...prev,
        fullName: details.fullName,
        dateOfBirth: details.dateOfBirth || '',
        gender: details.gender,
        city: details.city,
      }));
      setStep(Step.InsuranceDetails);
    } else if (step === Step.Review) {
      // Coming from Review or Payment screen → go back to Health Info.
      setIsPayment(false);
      setHealthInfo({
        healthConditions: details.healthConditions,
        otherDiseases: details.otherDiseases,
        claimStatus: details.claimStatus,
      });
      setForm((prev) => ({
        ...prev,
        fullName: details.fullName,
        dateOfBirth: details.dateOfBirth || '',
        gender: details.gender,
        city: details.city,
      }));
      setStep(Step.HealthInfo);
    }
  };

  /* ---------- API-ready submit handlers ----------
     Each one: validate → (future: POST to API) → advance UI state.
     For now they only do local validation + setState.                */

  const handleSubmitPolicyInfo = () => {
    const insurer = (form.existingInsurer || '').trim();
    const sumInsured = (form.sumInsured || '').trim();
    if (!insurer || !sumInsured) {
      window.alert('Please select your existing insurer and sum insured');
      return;
    }
    // Future: POST /api/renewal/step-1
    setDetails((prev) => ({
      ...prev,
      existingInsurer: insurer,
      policyNumber: (form.policyNumber || '').trim(),
      policyExpiryDate: form.policyExpiryDate,
      sumInsured,
    }));
    setIsPolicyInfoSubmitted(true);
    setStep(Step.InsuranceDetails);
  };

  const handleSubmitInsuranceDetails = () => {
    const fullName = (form.fullName || '').trim();
    const dateOfBirth = (form.dateOfBirth || '').trim();
    const gender = (form.gender || '').trim();
    const city = (form.city || '').trim();

    if (!fullName) { window.alert('Please enter your full name'); return; }
    if (!dateOfBirth) { window.alert('Please enter your date of birth'); return; }
    if (!gender) { window.alert('Please select your gender'); return; }
    if (!city) { window.alert('Please select your city'); return; }

    // Future: POST /api/renewal/step-2
    setDetails((prev) => ({
      ...prev,
      fullName,
      dateOfBirth,
      age: calculateAge(dateOfBirth),
      gender,
      city,
    }));
    setIsInsuranceDetailsSubmitted(true);
    setStep(Step.HealthInfo);
  };

  const handleSubmitHealthInfo = () => {
    const healthConditions = HealthInfo.healthConditions || [];
    const otherDiseases = (HealthInfo.otherDiseases || '').trim();
    const claimStatus = (HealthInfo.claimStatus || '').trim();

    if (healthConditions.length === 0) {
      window.alert('Please select any existing health conditions');
      return;
    }
    if (!claimStatus) {
      window.alert('Please confirm if any claims were made in the previous year');
      return;
    }

    // Future: POST /api/renewal/step-3
    setDetails((prev) => ({
      ...prev,
      healthConditions,
      otherDiseases,
      claimStatus,
    }));
    setIsHealthInfoSubmitted(true);
    setStep(Step.Review);
  };

  const handleSubmitReview = () => {
    // Future: POST /api/renewal/submit  { ...details }
    // For now, flip to the payment / success screen
    setIsPayment(true);
  };

  useEffect(() => {
    if (!open) {
      setStep(Step.EnterOtp);
      setOtp('');
      setIsPayment(false);
      setIsPolicyInfoSubmitted(false);
      setIsInsuranceDetailsSubmitted(false);
      setIsHealthInfoSubmitted(false);
      resetCollected();
      // Restore the parent page scroll when the popup closes.
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      return undefined;
    }

    // Lock BOTH html and body — the document scrolls on <html> here, so locking
    // only <body> leaves the background page free to scroll behind the popup.
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // Keep the prefilled mobile number in sync when reopened.
    setDetails((prev) => ({ ...prev, mobileNumber }));
    setResendSeconds(RESEND_COOLDOWN_SECONDS);

    const intervalId = window.setInterval(() => {
      setResendSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [open, mobileNumber]);

  // Close on Escape for keyboard users / better modal behaviour.
  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') close?.();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, close]);

  const summaryFields = [
    { key: 'policyType', label: 'Policy Type', value: details.policyType, icon: HiOutlineShieldCheck, editable: false },
    { key: 'mobileNumber', label: 'Mobile Number', value: details.mobileNumber, icon: HiOutlinePhone, editable: false },
    { key: 'existingInsurer', label: 'Existing Insurer', value: details.existingInsurer, icon: HiOutlineOfficeBuilding, editable: true, step: Step.PolicyInfo },
    { key: 'sumInsured', label: 'Sum Insured', value: details.sumInsured, icon: HiOutlineCurrencyRupee, editable: true, step: Step.PolicyInfo },
    { key: 'age', label: 'Age', value: details.age, icon: HiOutlineCalendar, editable: true, step: Step.InsuranceDetails },
    { key: 'city', label: 'City', value: details.city, icon: HiOutlineLocationMarker, editable: true, step: Step.InsuranceDetails },
    { key: 'claimStatus', label: 'Claim Status', value: details.claimStatus, icon: HiOutlineClipboardCheck, editable: true, step: Step.HealthInfo },
  ];

  // Jump to the step that collects this field, pre-filling the form so the
  // user can edit the existing value instead of retyping it.
  const handleEditField = (field) => {
    if (!field.editable || !field.step) return;
    if (field.step === Step.PolicyInfo) {
      setForm((prev) => ({
        ...prev,
        existingInsurer: details.existingInsurer,
        policyNumber: details.policyNumber,
        policyExpiryDate: details.policyExpiryDate,
        sumInsured: details.sumInsured,
      }));
    } else if (field.step === Step.InsuranceDetails) {
      setForm((prev) => ({
        ...prev,
        fullName: details.fullName,
        dateOfBirth: details.dateOfBirth || '',
        gender: details.gender,
        city: details.city,
      }));
    } else if (field.step === Step.HealthInfo) {
      setHealthInfo((prev) => ({
        ...prev,
        healthConditions: details.healthConditions,
        otherDiseases: details.otherDiseases,
        claimStatus: details.claimStatus,
      }));
      // Also restore Insurance Details form values so step 2 summary items show.
      setForm((prev) => ({
        ...prev,
        fullName: details.fullName,
        dateOfBirth: details.dateOfBirth || '',
        gender: details.gender,
        city: details.city,
      }));
    }
    setStep(field.step);
  };

  const renderOtpStep = () => (
    <div className="sr-otp sr-step sr-step--otp" data-step="otp">
      <div className="sr-content">
        <h2 id="sr-title" className="sr-title">
          Verify Your Identity
        </h2>
      </div>
      <p className="sr-text">
        We&apos;ve sent a 6-digit OTP to your registered mobile number.
      </p>
      <input
        type="text"
        className="sr-input"
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={OTP_LENGTH}
        placeholder="Enter 6-digit OTP"
        value={otp}
        onChange={handleOtpChange}
      />
      <button type="button" className="sr-button" onClick={handleVerifyOtp}>
        Verify &amp; Continue
      </button>
      <div className="sr-footer">
        <div className="sr-footer__row">
          {resendSeconds > 0 ? (
            <p className="sr-footer__timer">
              <HiOutlineClock className="sr-footer__icon" aria-hidden="true" />
              Resend in {formatResendTime(resendSeconds)}
            </p>
          ) : (
            <span className="sr-footer__timer-placeholder" aria-hidden="true" />
          )}
          <button
            type="button"
            className="sr-footer__resend"
            onClick={handleResendOtp}
            disabled={resendSeconds > 0}
          >
            Resend OTP
          </button>
        </div>
        <p className="sr-footer__secure">
          <HiOutlineLockClosed className="sr-footer__icon" aria-hidden="true" />
          Secured with 256-bit encryption
        </p>
      </div>
    </div>
  );

  const renderSummaryPanel = () => (
    <aside className="sr-summary" aria-label="Renewal summary">
      <div className="sr-summary__head">
        <h3 className="sr-summary__title">Renewal Summary</h3>
        <p className="sr-summary__sub">Details fill in as you progress.</p>
      </div>
      <ul className="sr-summary__list">
        {summaryFields.map((field) => {
          const Icon = field.icon;
          // Show the live, in-progress selection (from form) when the user is
          // actively picking on this field's step; otherwise show the committed
          // value (from details). This makes the summary fill as they click.
          const liveValue =
            field.editable && field.step === step ? form[field.key] : '';
          const value = liveValue || field.value || '';
          const filled = Boolean(value);
          // "Pending" = actively changed on the current step but not yet saved,
          // i.e. the live value differs from the committed one.
          const isPending =
            field.step === step &&
            Boolean(liveValue) &&
            String(liveValue).trim() !== String(field.value || '').trim();
          return (
            <li
              key={field.key}
              className={`sr-summary__item${filled ? ' is-filled' : ''}${
                isPending ? ' is-pending' : ''
              }`}
            >
              <span className="sr-summary__icon">
                <Icon aria-hidden="true" />
              </span>
              <span className="sr-summary__meta">
                <span className="sr-summary__label">{field.label}</span>
                <span className="sr-summary__value">
                  {filled ? value : '—'}
                </span>
              </span>
              {filled && field.editable && (
                <button
                  type="button"
                  className="sr-summary__edit"
                  onClick={() => handleEditField(field)}
                  aria-label={`Edit ${field.label}`}
                  title={`Edit ${field.label}`}
                >
                  <HiOutlinePencil aria-hidden="true" />
                </button>
              )}
              {filled && !field.editable && (
                <HiOutlineLockClosed
                  className="sr-summary__lock"
                  aria-hidden="true"
                  title="Prefilled — not editable"
                />
              )}
            </li>
          );
        })}
      </ul>
      <p className="sr-summary__secure">
        <HiOutlineLockClosed className="sr-summary__secure-icon" aria-hidden="true" />
        Your information is encrypted and used only to fetch the best renewal quotes.
      </p>
    </aside>
  );

  const renderStepIndicator = () => (
    <ol className="sr-steps" aria-label="Progress">
      {STEP_LABELS.map((label, i) => {
        const idx = i + 1; // 1-based step index
        const state =
          step === idx + 1 ? 'current'
          : step > idx + 1 ? 'done'
          : 'todo';
        return (
          <li key={label} className={`sr-steps__item is-${state}`}>
            <span className="sr-steps__dot">{idx}</span>
            <span className="sr-steps__label">{label}</span>
          </li>
        );
      })}
    </ol>
  );

  const renderPolicyInfo = () => (
    <section className="sr-form sr-step sr-step--policy" data-step="policy">
      {/* Heading BEFORE the step line */}
      <header className="sr-form__head">
        <h2 className="sr-form__title">{ExistingInsurers.heading}</h2>
      </header>

      {/* Step line */}
      {renderStepIndicator()}

      <div className="sr-form__body">
        {/* DIV 1 — Existing Insurer (label1 as heading, list as boxes, 3 per row) */}
        <div className="sr-block">
          <h3 className="sr-block__heading">
            <HiOutlineOfficeBuilding aria-hidden="true" />
            {ExistingInsurers.label1}
          </h3>
          <div className="sr-chips sr-chips--col3">
            {ExistingInsurers.list.map((name) => {
              const selected = form.existingInsurer === name;
              return (
                <button
                  type="button"
                  key={name}
                  className={`sr-chip${selected ? ' is-selected' : ''}`}
                  onClick={() => handleInsurerPick(name)}
                  aria-pressed={selected}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </div>

        {/* DIV 2 — Policy Number (optional) + Policy Expiry Date side-by-side */}
        <div className="sr-row sr-row--2">
          <div className="sr-block">
            <h3 className="sr-block__heading">
              {ExistingInsurers.label2}
              <span className="sr-block__optional">(optional)</span>
            </h3>
            <input
              id="policyNumber"
              name="policyNumber"
              type="text"
              className="sr-field__input"
              placeholder="Enter policy number"
              value={form.policyNumber}
              onChange={handleFieldChange}
            />
          </div>

          <div className="sr-block">
            <h3 className="sr-block__heading">
              <HiOutlineCalendar aria-hidden="true" />
              {ExistingInsurers.label3}
            </h3>
            <label className="sr-date">
              <input
                type="date"
                name="policyExpiryDate"
                className={`sr-date__input${form.policyExpiryDate ? ' has-value' : ''}`}
                aria-label={ExistingInsurers.label3}
                value={form.policyExpiryDate}
                onChange={handleFieldChange}
              />
              {!form.policyExpiryDate && (
                <span className="sr-date__placeholder">DD / MM / YYYY</span>
              )}
              <span className="sr-date__icon">
                <HiOutlineCalendar aria-hidden="true" />
              </span>
            </label>
          </div>
        </div>

        {/* DIV 3 — Sum Insured (label4 as heading, sumList as boxes) */}
        <div className="sr-block">
          <h3 className="sr-block__heading">
            <HiOutlineCurrencyRupee aria-hidden="true" />
            {ExistingInsurers.label4}
          </h3>
          <div className="sr-chips sr-chips--col3">
            {ExistingInsurers.sumList.map((value) => {
              const selected = form.sumInsured === value;
              return (
                <button
                  type="button"
                  key={value}
                  className={`sr-chip${selected ? ' is-selected' : ''}`}
                  onClick={() => handleSumPick(value)}
                  aria-pressed={selected}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="sr-form__actions sr-form__actions--end">
        <button type="button" className="sr-form__next" onClick={handleSubmitPolicyInfo}>
          Continue
        </button>
      </div>
    </section>
  );

  const renderInsuranceDetails = () => (
    <section className="sr-form sr-step sr-step--insurance" data-step="insurance">
      {/* Heading BEFORE the step line */}
      <header className="sr-form__head">
        <h2 className="sr-form__title">{Insurance_Details.heading}</h2>
      </header>

      {/* Step line */}
      {renderStepIndicator()}

      <div className="sr-form__body">
        {/* DIV 1 — Full Name (label1, single column input) */}
        <div className="sr-block">
          <h3 className="sr-block__heading">
            <HiOutlineUser aria-hidden="true" />
            {Insurance_Details.label1}
          </h3>
          <input
            id="fullName"
            name="fullName"
            type="text"
            className="sr-field__input"
            placeholder="Enter full name"
            value={form.fullName}
            onChange={handleFieldChange}
          />
        </div>

        {/* DIV 2 — Date of Birth (label2) + Gender (label3) side-by-side */}
        <div className="sr-row sr-row--2">
          <div className="sr-block">
            <h3 className="sr-block__heading">
              <HiOutlineCalendar aria-hidden="true" />
              {Insurance_Details.label2}
            </h3>
            <label className="sr-date">
              <input
                type="date"
                name="dateOfBirth"
                className={`sr-date__input${form.dateOfBirth ? ' has-value' : ''}`}
                aria-label={Insurance_Details.label2}
                value={form.dateOfBirth}
                onChange={handleFieldChange}
              />
              {!form.dateOfBirth && (
                <span className="sr-date__placeholder">DD / MM / YYYY</span>
              )}
              <span className="sr-date__icon">
                <HiOutlineCalendar aria-hidden="true" />
              </span>
            </label>
          </div>

          <div className="sr-block">
            <h3 className="sr-block__heading">
              <HiOutlineUser aria-hidden="true" />
              {Insurance_Details.label3}
            </h3>
            <div className="sr-chips sr-chips--col3">
              {Insurance_Details.genderList.map((value) => {
                const selected = form.gender === value;
                return (
                  <button
                    type="button"
                    key={value}
                    className={`sr-chip${selected ? ' is-selected' : ''}`}
                    onClick={() => handleGenderPick(value)}
                    aria-pressed={selected}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* DIV 3 — City (label4, cityList as boxes via map, 3 per row) */}
        <div className="sr-block">
          <h3 className="sr-block__heading">
            <HiOutlineLocationMarker aria-hidden="true" />
            {Insurance_Details.label4}
          </h3>
          <div className="sr-chips sr-chips--col3">
            {Insurance_Details.cityList.map((value) => {
              const selected = form.city === value;
              return (
                <button
                  type="button"
                  key={value}
                  className={`sr-chip${selected ? ' is-selected' : ''}`}
                  onClick={() => handleCityPick(value)}
                  aria-pressed={selected}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="sr-form__actions">
        <button type="button" className="sr-form__back" onClick={goBack}>
          Back
        </button>
        <button type="button" className="sr-form__next" onClick={handleSubmitInsuranceDetails}>
          Continue
        </button>
      </div>
    </section>
  );

  const renderHealthInfo = () => (
    <section className="sr-form sr-step sr-step--health" data-step="health">
      {/* Heading BEFORE the step line */}
      <header className="sr-form__head">
        <h2 className="sr-form__title">{HEALTH_INFO.heading}</h2>
      </header>

      {/* Step line */}
      {renderStepIndicator()}

      <div className="sr-form__body">
        {/* DIV 1 — Existing Health Conditions (multi-select chips) */}
        <div className="sr-block">
          <h3 className="sr-block__heading">
            <HiOutlineClipboardCheck aria-hidden="true" />
            {HEALTH_INFO.label1}
          </h3>
          <div className="sr-chips sr-chips--col3">
            {HEALTH_INFO.healthConditions.map((value) => {
              const selected = HealthInfo.healthConditions.includes(value);
              return (
                <button
                  type="button"
                  key={value}
                  className={`sr-chip${selected ? ' is-selected' : ''}`}
                  onClick={() => handleConditionPick(value)}
                  aria-pressed={selected}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>

        {/* DIV 2 — Other Existing Diseases (text input) */}
        <div className="sr-block">
          <h3 className="sr-block__heading">
            <HiOutlineClipboardCheck aria-hidden="true" />
            {HEALTH_INFO.label2}
          </h3>
          <input
            id="otherDiseases"
            name="otherDiseases"
            type="text"
            className="sr-field__input"
            placeholder="Enter other existing diseases (optional)"
            value={HealthInfo.otherDiseases}
            onChange={handleHealthInfoChange}
          />
        </div>

        {/* DIV 3 — Any claims made in the previous year? (Yes/No single-select) */}
        <div className="sr-block">
          <h3 className="sr-block__heading">
            <HiOutlineClipboardCheck aria-hidden="true" />
            {HEALTH_INFO.label3}
          </h3>
          <div className="sr-chips sr-chips--col3">
            {HEALTH_INFO.claimStatus.map((value) => {
              const selected = HealthInfo.claimStatus === value;
              return (
                <button
                  type="button"
                  key={value}
                  className={`sr-chip${selected ? ' is-selected' : ''}`}
                  onClick={() => handleClaimPick(value)}
                  aria-pressed={selected}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="sr-form__actions">
        <button type="button" className="sr-form__back" onClick={goBack}>
          Back
        </button>
        <button type="button" className="sr-form__next" onClick={handleSubmitHealthInfo}>
          Continue
        </button>
      </div>
    </section>
  );

  const renderReview = () => (
    <section className="sr-form sr-step sr-step--review" data-step="review">
      {/* Heading BEFORE the step line */}
      <header className="sr-form__head">
        <h2 className="sr-form__title">Review Your Details</h2>
      </header>
      {/* Step line */}
      {renderStepIndicator()}

      <div className="sr-form__body">
      <div className="sr-review">
        <h3 className="sr-review__heading">Policy Information</h3>
        <ul className="sr-review__list">
          <li className="sr-review__item">
            <span className="sr-review__label">Plan Type</span>
            <span className="sr-review__value">{details.policyType || '--'}</span>
          </li>
          <li className="sr-review__item">
            <span className="sr-review__label">Existing Insurer</span>
            <span className="sr-review__value">{details.existingInsurer || '--'}</span>
          </li>
          <li className="sr-review__item">
            <span className="sr-review__label">Policy Number</span>
            <span className="sr-review__value">{details.policyNumber || '--'}</span>
          </li>
          <li className="sr-review__item">
            <span className="sr-review__label">Policy Expiry Date</span>
            <span className="sr-review__value">{details.policyExpiryDate || '--'}</span>
          </li>
          <li className="sr-review__item">
            <span className="sr-review__label">Sum Insured</span>
            <span className="sr-review__value">{details.sumInsured || '--'}</span>
          </li>
        </ul>
      </div>

      <div className="sr-review">
        <h3 className="sr-review__heading">Insured Details</h3>
        <ul className="sr-review__list">
          <li className="sr-review__item">
            <span className="sr-review__label">Full Name</span>
            <span className="sr-review__value">{details.fullName || '--'}</span>
          </li>
          <li className="sr-review__item">
            <span className="sr-review__label">Date of Birth</span>
            <span className="sr-review__value">{details.dateOfBirth || '--'}</span>
          </li>
          <li className="sr-review__item">
            <span className="sr-review__label">Gender</span>
            <span className="sr-review__value">{details.gender || '--'}</span>
          </li>
          <li className="sr-review__item">
            <span className="sr-review__label">City</span>
            <span className="sr-review__value">{details.city || '--'}</span>
          </li>
        </ul>
      </div>

      <div className="sr-review">
        <h3 className="sr-review__heading">Health Information</h3>
        <ul className="sr-review__list">
          <li className="sr-review__item">
            <span className="sr-review__label">Health Conditions</span>
            <span className="sr-review__value">
              {details.healthConditions.length ? details.healthConditions.join(', ') : '--'}
            </span>
          </li>
          <li className="sr-review__item">
            <span className="sr-review__label">Other Diseases</span>
            <span className="sr-review__value">{details.otherDiseases || '--'}</span>
          </li>
          <li className="sr-review__item">
            <span className="sr-review__label">Previous Claims</span>
            <span className="sr-review__value">{details.claimStatus || '--'}</span>
          </li>
        </ul>
      </div>
      </div>
      <div className="sr-form__actions">
        <button type="button" className="sr-form__back" onClick={goBack}>
          Back
        </button>
        <button type="button" className="sr-form__next" onClick={handleSubmitReview}>
          Submit
        </button>
      </div>
    </section>
  );

  const renderContinuePayment = () => {
    const ref = `SR-${Date.now().toString(36).toUpperCase()}`;
    return (
      <section className="sr-form sr-step sr-step--payment" data-step="payment">
        <header className="sr-form__head">
          <h2 className="sr-form__title">Ready for Payment</h2>
        </header>
        <div className="sr-form__body sr-form__body--centered">
          <div className="sr-success">
            <HiOutlineCheckCircle className="sr-success__icon" />
            <p className="sr-success__title">Thank you!</p>
            <p className="sr-success__text">
              Your renewal details have been saved.
            </p>
            <p className="sr-success__text">
              You will be redirected to the payment gateway shortly.
            </p>
            <div className="sr-success__ref">
              <span>Reference</span>
              <strong>{ref}</strong>
            </div>
          </div>
        </div>
        <div className="sr-form__actions">
          <button
            type="button"
            className="sr-form__back"
            onClick={() => setIsPayment(false)}
          >
            Back
          </button>
          <button
            type="button"
            className="sr-form__next"
            onClick={() => window.alert('Proceeding to payment gateway...')}
          >
            Proceed to Payment
          </button>
        </div>
      </section>
    );
  };

  const renderStep = () => {
    switch (step) {
      case Step.EnterOtp:
        return renderOtpStep();
      case Step.PolicyInfo:
        return (
          <div className="sr-split">
            {renderPolicyInfo()}
            {renderSummaryPanel()}
          </div>
        );
      case Step.InsuranceDetails:
        return (
          <div className="sr-split">
            {renderInsuranceDetails()}
            {renderSummaryPanel()}
          </div>
        );
      case Step.HealthInfo:
        return (
          <div className="sr-split">
            {renderHealthInfo()}
            {renderSummaryPanel()}
          </div>
        );
      case Step.Review:
        if (isPayment) {
          return (
            <div className="sr-split">
              {renderContinuePayment()}
              {renderSummaryPanel()}
            </div>
          );
        }
        return (
          <div className="sr-split">
            {renderReview()}
            {renderSummaryPanel()}
          </div>
        );
      default:
        return null;
    }
  };

  if (!open) return null;

  return createPortal(
    <div className="sr-overlay" onClick={close} role="presentation">
      <div
        className={`sr-panel${
          step === Step.EnterOtp ? '' : ' sr-panel--wide'
        }`}
        data-step={dataStep}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sr-title"
      >
        <button type="button" className="sr-close" onClick={close} aria-label="Close">
          <HiOutlineXMark aria-hidden="true" />
        </button>
        {renderStep()}
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Senior_details;