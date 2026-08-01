import { createPortal } from 'react-dom';
import { useCallback, useEffect, useState } from 'react';
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
  HiOutlineHeart,
  HiOutlineUserGroup,
  HiOutlineUsers,
  HiOutlineCheckCircle,
  HiArrowRight,
} from 'react-icons/hi';
import './Senior-details.css';
import './Family-details.css';
import { toast } from 'sonner';

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
  label: 'City',
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

const FAMILY_MEMBER_CONFIG = {
  self: { label: 'Self', subLabel: 'Primary insured', icon: HiOutlineUser },
  spouse: { label: 'Spouse', subLabel: 'Husband or wife', icon: HiOutlineHeart },
  children: { label: 'Children', subLabel: 'Add members', icon: HiOutlineUserGroup },
  parents: { label: 'Parents (Optional)', subLabel: 'Add members', icon: HiOutlineUsers },
};

const FAMILY_CATEGORIES = {
  self: false,
  spouse: false,
  son: 0,
  daughter: 0,
  father: 0,
  mother: 0,
};

const getFamilySummaryLabel = (categories) => {
  const enabled = [];
  if (categories.self) enabled.push('Self');
  if (categories.spouse) enabled.push('Spouse');
  const children = (categories.son || 0) + (categories.daughter || 0);
  if (children > 0) enabled.push(`${children} Child${children > 1 ? 'ren' : ''}`);
  const parents = (categories.father || 0) + (categories.mother || 0);
  if (parents > 0) enabled.push(`${parents} Parent${parents > 1 ? 's' : ''}`);
  return enabled.length ? enabled.join(', ') : '';
};

const HEALTH_INFO = {
  heading: 'Health Information',
  label1: 'Existing Health Conditions',
  label2: 'Past Surgeries',
  label3: 'Any claims made in the previous year?',
  healthConditions: ['Diabetes', 'Hypertension', 'Asthma', 'Heart Disease', 'Thyroid'],
  claimStatus: ['Yes', 'No'],
};

// Formats a remaining-seconds value as MM:SS for the resend timer.
const formatResendTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};


const FamilyDetails = ({ open, close, mobileNumber = '' }) => {
  const [otp, setOtp] = useState('');
  const [resendSeconds, setResendSeconds] = useState(RESEND_COOLDOWN_SECONDS);
  const [step, setStep] = useState(Step.EnterOtp);
  const [isPayment, setIsPayment] = useState(false);

  // data-step attribute for the panel — used in browser Inspect.
  const dataStep =
    step === Step.EnterOtp
      ? 'otp'
      : step === Step.PolicyInfo
        ? 'policy'
        : step === Step.InsuranceDetails
          ? 'insurance'
          : step === Step.HealthInfo
            ? 'health'
            : step === Step.Review
              ? isPayment
                ? 'payment'
                : 'review'
              : 'otp';

  // Health Information form state — committed to `details` on Continue.
  const [healthInfo, setHealthInfo] = useState({
    healthConditions: [],
    pastSurgeries: '',
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

  const handleHealthInfoChange = (event) => {
    const { name, value } = event.target;
    setHealthInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleClaimPick = (value) => {
    setHealthInfo((prev) => ({
      ...prev,
      claimStatus: prev.claimStatus === value ? '' : value,
    }));
  };

  // Collected details — summary panel reads from this.
  const [details, setDetails] = useState({
    policyType: 'Family Floater Health',
    mobileNumber,
    existingInsurer: '',
    policyNumber: '',
    policyExpiryDate: '',
    sumInsured: '',
    city: '',
    familyCategories: { ...FAMILY_CATEGORIES },
    healthConditions: [],
    pastSurgeries: '',
    claimStatus: '',
  });

  // Form state for the current input step — committed to `details` on Continue.
  const [form, setForm] = useState({
    existingInsurer: '',
    sumInsured: '',
    policyNumber: '',
    policyExpiryDate: '',
    city: '',
  });

  // Family category selection state for the Insurance Details step.
  const [familyCategories, setFamilyCategories] = useState(() => ({ ...FAMILY_CATEGORIES }));

  // Per-member details (name, gender, age) for toggle-enabled members.
  const [memberDetails, setMemberDetails] = useState({
    self: { name: '', gender: '', age: '' },
    spouse: { name: '', gender: '', age: '' },
    son: [],
    daughter: [],
    father: [],
    mother: [],
  });

  const resetCollected = useCallback(() => {
    const freshCategories = { ...FAMILY_CATEGORIES };
    setDetails({
      policyType: 'Family Floater Health',
      mobileNumber,
      existingInsurer: '',
      policyNumber: '',
      policyExpiryDate: '',
      sumInsured: '',
      city: '',
      familyCategories: freshCategories,
      healthConditions: [],
      pastSurgeries: '',
      tobaccoUsage: '',
    });
    setForm({
      existingInsurer: '',
      sumInsured: '',
      policyNumber: '',
      policyExpiryDate: '',
      city: '',
    });
    setFamilyCategories(freshCategories);
    setHealthInfo({
      healthConditions: [],
      pastSurgeries: '',
      claimStatus: '',
    });
    setMemberDetails({
      self: { name: '', gender: '', age: '' },
      spouse: { name: '', gender: '', age: '' },
      son: [],
      daughter: [],
      father: [],
      mother: [],
    });
  }, [mobileNumber]);

  const handleOtpChange = (event) => {
    const value = event.target.value.replace(/\D/g, '').slice(0, OTP_LENGTH);
    setOtp(value);
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
    toast.success('OTP resent successfully');
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

  const handleCityPick = (value) => {
    setForm((prev) => ({
      ...prev,
      city: prev.city === value ? '' : value,
    }));
  };

  // Family category helpers.
  const toggleCategory = (key) => {
    setFamilyCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const adjustCount = (key, delta) => {
    setFamilyCategories((prev) => {
      const nextCount = Math.max(0, (prev[key] || 0) + delta);
      setMemberDetails((mdPrev) => {
        const list = Array.isArray(mdPrev[key]) ? [...mdPrev[key]] : [];
        if (delta > 0) {
          list.push({ name: '', gender: '', age: '' });
        } else if (delta < 0) {
          list.pop();
        }
        return { ...mdPrev, [key]: list };
      });
      return { ...prev, [key]: nextCount };
    });
  };

  const removeMemberAt = (key, index) => {
    setFamilyCategories((prev) => {
      const nextCount = Math.max(0, (prev[key] || 0) - 1);
      setMemberDetails((mdPrev) => {
        const list = Array.isArray(mdPrev[key]) ? [...mdPrev[key]] : [];
        list.splice(index, 1);
        return { ...mdPrev, [key]: list };
      });
      return { ...prev, [key]: nextCount };
    });
  };

  const handleMemberDetailChange = (key, index, field, value) => {
    setMemberDetails((prev) => {
      const list = Array.isArray(prev[key]) ? [...prev[key]] : [];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, [key]: list };
    });
  };

  const handleToggleMemberDetailChange = (key, field, value) => {
    setMemberDetails((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }));
  };

  const goBack = () => {
    if (step === Step.InsuranceDetails) {
      setFamilyCategories({ ...details.familyCategories });
      setForm((prev) => ({ ...prev, city: details.city }));
      setStep(Step.PolicyInfo);
    } else if (step === Step.HealthInfo) {
      setHealthInfo({
        healthConditions: details.healthConditions,
        pastSurgeries: details.pastSurgeries,
        claimStatus: details.claimStatus,
      });
      setStep(Step.InsuranceDetails);
    } else if (step === Step.Review) {
      setIsPayment(false);
      setHealthInfo({
        healthConditions: details.healthConditions,
        pastSurgeries: details.pastSurgeries,
        claimStatus: details.claimStatus,
      });
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
    setStep(Step.InsuranceDetails);
  };

  const handleSubmitInsuranceDetails = () => {
    const city = (form.city || '').trim();

    if (!city) {
      window.alert('Please select your city');
      return;
    }

    const enabledToggleKeys = ['self', 'spouse'].filter((k) => familyCategories[k]);
    const invalidToggle = enabledToggleKeys.find((key) => {
      const { name, gender, age } = memberDetails[key] || {};
      return !name?.trim() || !gender || !age;
    });

    if (invalidToggle) {
      const label = FAMILY_MEMBER_CONFIG[invalidToggle].label;
      window.alert(`Please enter name, gender and age for ${label}`);
      return;
    }

    const countKeys = ['son', 'daughter', 'father', 'mother'];
    const invalidCountKey = countKeys.find((key) => {
      const count = familyCategories[key] || 0;
      if (count === 0) return false;
      const list = memberDetails[key] || [];
      return list.slice(0, count).some((m) => !m.name?.trim() || !m.gender || !m.age);
    });

    if (invalidCountKey) {
      const label = FAMILY_MEMBER_CONFIG[invalidCountKey === 'son' || invalidCountKey === 'daughter' ? 'children' : 'parents'].label;
      window.alert(`Please enter name, gender and age for every added ${label.toLowerCase()}`);
      return;
    }

    // Future: POST /api/renewal/step-2
    setDetails((prev) => ({
      ...prev,
      city,
      familyCategories: { ...familyCategories },
      memberDetails: { ...memberDetails },
    }));
    setStep(Step.HealthInfo);
  };

  const handleSubmitHealthInfo = () => {
    const healthConditions = healthInfo.healthConditions || [];
    const pastSurgeries = (healthInfo.pastSurgeries || '').trim();
    const claimStatus = (healthInfo.claimStatus || '').trim();

    if (healthConditions.length === 0) {
      window.alert('Please select any existing health conditions');
      return;
    }

    if (!claimStatus) {
      window.alert('Please select your claim status for the previous year');
      return;
    }

    // Future: POST /api/renewal/step-3
    setDetails((prev) => ({
      ...prev,
      healthConditions,
      pastSurgeries,
      claimStatus,
    }));
    setStep(Step.Review);
  };

  const handleSubmitReview = () => {
    // Future: POST /api/renewal/submit  { ...details }
    // For now, flip to the payment / success screen
    setIsPayment(true);
  };

  useEffect(() => {
    if (!open) {
      // Reset modal state when it closes so the next open starts fresh.
      /* eslint-disable react-hooks/set-state-in-effect */
      setStep(Step.EnterOtp);
      setOtp('');
      setIsPayment(false);
      resetCollected();
      /* eslint-enable react-hooks/set-state-in-effect */
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
    toast.success(`OTP sent to ${mobileNumber}`);

    const intervalId = window.setInterval(() => {
      setResendSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [open, mobileNumber, resetCollected]);

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
    {
      key: 'policyType',
      label: 'Policy Type',
      value: details.policyType,
      icon: HiOutlineShieldCheck,
      editable: false,
    },
    {
      key: 'mobileNumber',
      label: 'Mobile Number',
      value: details.mobileNumber,
      icon: HiOutlinePhone,
      editable: false,
    },
    {
      key: 'existingInsurer',
      label: 'Existing Insurer',
      value: details.existingInsurer,
      icon: HiOutlineOfficeBuilding,
      editable: true,
      step: Step.PolicyInfo,
    },
    {
      key: 'sumInsured',
      label: 'Sum Insured',
      value: details.sumInsured,
      icon: HiOutlineCurrencyRupee,
      editable: true,
      step: Step.PolicyInfo,
    },
    {
      key: 'city',
      label: 'City',
      value: details.city,
      icon: HiOutlineLocationMarker,
      editable: true,
      step: Step.InsuranceDetails,
    },
    {
      key: 'insuredCount',
      label: 'Insured Members',
      value: getFamilySummaryLabel(details.familyCategories),
      icon: HiOutlineUser,
      editable: true,
      step: Step.InsuranceDetails,
    },
    {
      key: 'claimStatus',
      label: 'Previous Year Claim',
      value: details.claimStatus,
      icon: HiOutlineClipboardCheck,
      editable: true,
      step: Step.HealthInfo,
    },
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
      setFamilyCategories({ ...details.familyCategories });
      setMemberDetails(
        details.memberDetails
          ? { ...details.memberDetails }
          : {
              self: { name: '', gender: '', age: '' },
              spouse: { name: '', gender: '', age: '' },
              son: [],
              daughter: [],
              father: [],
              mother: [],
            },
      );
      setForm((prev) => ({ ...prev, city: details.city }));
    } else if (field.step === Step.HealthInfo) {
      setHealthInfo((prev) => ({
        ...prev,
        healthConditions: details.healthConditions,
        pastSurgeries: details.pastSurgeries,
        claimStatus: details.claimStatus,
      }));
    }
    setStep(field.step);
  };

  /* ============================================================
     Step components — conditionally rendered below.
     ============================================================ */

  const OtpStep = () => (
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

  const StepIndicator = () => (
    <ol className="sr-steps" aria-label="Progress">
      {STEP_LABELS.map((label, i) => {
        const idx = i + 1; // 1-based step index
        const state = step === idx + 1 ? 'current' : step > idx + 1 ? 'done' : 'todo';
        return (
          <li key={label} className={`sr-steps__item is-${state}`}>
            <span className="sr-steps__dot">{idx}</span>
            <span className="sr-steps__label">{label}</span>
          </li>
        );
      })}
    </ol>
  );

  const SummaryPanel = () => (
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
          let liveValue = '';
          if (field.editable && field.step === step) {
            if (field.key === 'city') liveValue = form.city;
            else if (field.key === 'insuredCount') {
              liveValue = getFamilySummaryLabel(familyCategories);
            } else if (field.key === 'existingInsurer') {
              liveValue = form.existingInsurer;
            } else if (field.key === 'sumInsured') {
              liveValue = form.sumInsured;
            } else if (field.key === 'claimStatus') {
              liveValue = healthInfo.claimStatus;
            }
          }
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
                <span className="sr-summary__value">{filled ? value : '—'}</span>
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

  const PolicyInfoStep = () => (
    <section className="sr-form sr-step sr-step--policy" data-step="policy">
      <header className="sr-form__head">
        <h2 className="sr-form__title">{ExistingInsurers.heading}</h2>
      </header>

      <StepIndicator />

      <div className="sr-form__body">
        {/* DIV 1 — Existing Insurer */}
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

        {/* DIV 2 — Policy Number + Policy Expiry Date side-by-side */}
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

        {/* DIV 3 — Sum Insured */}
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

  const InsuranceDetailsStep = () => {
    const GENDERS = ['Male', 'Female', 'Other'];

    const renderToggleCard = (key) => {
      const config = FAMILY_MEMBER_CONFIG[key];
      const Icon = config.icon;
      const isOn = familyCategories[key];
      const member = memberDetails[key] || { name: '', gender: '', age: '' };

      return (
        <div key={key} className={`sr-member${isOn ? '' : ' sr-member--disabled'}`}>
          <div className="sr-member__head">
            <span className="sr-member__icon">
              <Icon aria-hidden="true" />
            </span>
            <span className="sr-member__meta">
              <span className="sr-member__label">{config.label}</span>
              <span className="sr-member__sub">{config.subLabel}</span>
            </span>
            <button
              type="button"
              className={`sr-member__toggle${isOn ? ' is-on' : ''}`}
              onClick={() => toggleCategory(key)}
              aria-pressed={isOn}
              aria-label={`${isOn ? 'Disable' : 'Enable'} ${config.label}`}
            >
              <span className="sr-member__toggle-knob" />
            </button>
          </div>

          {isOn && (
            <div className="sr-member__fields">
              <input
                type="text"
                className="sr-member__input"
                placeholder="Full name"
                value={member.name}
                onChange={(event) => handleToggleMemberDetailChange(key, 'name', event.target.value)}
                aria-label={`${config.label} full name`}
              />
              <div className="sr-member__gender">
                {GENDERS.map((gender) => {
                  const selected = member.gender === gender;
                  return (
                    <button
                      type="button"
                      key={gender}
                      className={`sr-member__gender-btn${selected ? ' is-selected' : ''}`}
                      onClick={() => handleToggleMemberDetailChange(key, 'gender', selected ? '' : gender)}
                      aria-pressed={selected}
                    >
                      {gender}
                    </button>
                  );
                })}
              </div>
              <input
                type="text"
                inputMode="numeric"
                maxLength={3}
                className="sr-member__input sr-member__input--age"
                placeholder="Age"
                value={member.age}
                onChange={(event) => {
                  const value = event.target.value.replace(/\D/g, '').slice(0, 3);
                  handleToggleMemberDetailChange(key, 'age', value);
                }}
                aria-label={`${config.label} age`}
              />
            </div>
          )}
        </div>
      );
    };

    const renderCountMember = (key, index) => {
      const member = (memberDetails[key] || [])[index] || { name: '', gender: '', age: '' };
      const label = key === 'son' || key === 'daughter'
        ? `${key.charAt(0).toUpperCase() + key.slice(1)} ${index + 1}`
        : key === 'father'
          ? 'Father'
          : 'Mother';

      return (
        <div key={`${key}-${index}`} className="sr-member sr-member--count">
          <div className="sr-member__fields sr-member__fields--count">
            <input
              type="text"
              className="sr-member__input"
              placeholder="Full name"
              value={member.name}
              onChange={(event) => handleMemberDetailChange(key, index, 'name', event.target.value)}
              aria-label={`${label} full name`}
            />
            <div className="sr-member__gender">
              {GENDERS.map((gender) => {
                const selected = member.gender === gender;
                return (
                  <button
                    type="button"
                    key={gender}
                    className={`sr-member__gender-btn${selected ? ' is-selected' : ''}`}
                    onClick={() => handleMemberDetailChange(key, index, 'gender', selected ? '' : gender)}
                    aria-pressed={selected}
                  >
                    {gender}
                  </button>
                );
              })}
            </div>
            <input
              type="text"
              inputMode="numeric"
              maxLength={3}
              className="sr-member__input sr-member__input--age"
              placeholder="Age"
              value={member.age}
              onChange={(event) => {
                const value = event.target.value.replace(/\D/g, '').slice(0, 3);
                handleMemberDetailChange(key, index, 'age', value);
              }}
              aria-label={`${label} age`}
            />
          </div>
          <button
            type="button"
            className="sr-member__remove"
            onClick={() => removeMemberAt(key, index)}
            aria-label={`Remove ${label}`}
          >
            &minus; Remove
          </button>
        </div>
      );
    };

    const renderAddGroup = (groupKey, options) => {
      const config = FAMILY_MEMBER_CONFIG[groupKey];
      const Icon = config.icon;
      const counts = options.map((option) => ({
        ...option,
        count: familyCategories[option.key] || 0,
      }));
      const total = counts.reduce((sum, option) => sum + option.count, 0);

      return (
        <div className="sr-member sr-member--add-group">
          <div className="sr-member__head">
            <span className="sr-member__icon">
              <Icon aria-hidden="true" />
            </span>
            <span className="sr-member__meta">
              <span className="sr-member__label">{config.label}</span>
              <span className="sr-member__sub">{config.subLabel}</span>
            </span>
            <span className="sr-member__add-actions">
              {options.map((option) => {
                const count = familyCategories[option.key] || 0;
                return (
                  <button
                    type="button"
                    key={option.key}
                    className="sr-member__add-btn"
                    onClick={() => adjustCount(option.key, 1)}
                  >
                    + {option.label}{count > 0 && <span className="sr-member__count-badge">{count}</span>}
                  </button>
                );
              })}
            </span>
          </div>
          {total > 0 && (
            <div className="sr-member__count-list">
              {options.map((option) =>
                Array.from({ length: familyCategories[option.key] || 0 }, (_, index) =>
                  renderCountMember(option.key, index),
                ),
              )}
            </div>
          )}
        </div>
      );
    };

    return (
      <section className="sr-form sr-step sr-step--insurance" data-step="insurance">
        <header className="sr-form__head">
          <h2 className="sr-form__title">{Insurance_Details.heading}</h2>
        </header>

        <StepIndicator />

        <div className="sr-form__body sr-form__body--family">
          {/* Self toggle card */}
          {renderToggleCard('self')}

          {/* Spouse toggle card */}
          {renderToggleCard('spouse')}

          {/* Children add-group */}
          {renderAddGroup('children', [
            { key: 'son', label: 'Son' },
            { key: 'daughter', label: 'Daughter' },
          ])}

          {/* Parents add-group */}
          {renderAddGroup('parents', [
            { key: 'father', label: 'Father' },
            { key: 'mother', label: 'Mother' },
          ])}

          {/* City */}
          <div className="sr-block sr-block--city">
            <h3 className="sr-block__heading">
              <HiOutlineLocationMarker aria-hidden="true" />
              {Insurance_Details.label}
            </h3>
            <div className="sr-chips sr-chips--col4">
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
  };

  const HealthInfoStep = () => (
    <section className="sr-form sr-step sr-step--health" data-step="health">
      <header className="sr-form__head">
        <h2 className="sr-form__title">{HEALTH_INFO.heading}</h2>
      </header>

      <StepIndicator />

      <div className="sr-form__body">
        {/* DIV 1 — Existing Health Conditions (multi-select chips) */}
        <div className="sr-block">
          <h3 className="sr-block__heading">
            <HiOutlineClipboardCheck aria-hidden="true" />
            {HEALTH_INFO.label1}
          </h3>
          <div className="sr-chips sr-chips--col3">
            {HEALTH_INFO.healthConditions.map((value) => {
              const selected = healthInfo.healthConditions.includes(value);
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

        {/* DIV 2 — Past Surgeries (text input) */}
        <div className="sr-block">
          <h3 className="sr-block__heading">
            <HiOutlineClipboardCheck aria-hidden="true" />
            {HEALTH_INFO.label2}
          </h3>
          <input
            id="pastSurgeries"
            name="pastSurgeries"
            type="text"
            className="sr-field__input"
            placeholder="Mention any past surgeries (optional)"
            value={healthInfo.pastSurgeries}
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
              const selected = healthInfo.claimStatus === value;
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

  const ReviewStep = () => (
    <section className="sr-form sr-step sr-step--review" data-step="review">
      <header className="sr-form__head">
        <h2 className="sr-form__title">Review Your Details</h2>
      </header>

      <StepIndicator />

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
          <h3 className="sr-review__heading">Insured Members</h3>
          <ul className="sr-review__list">
            <li className="sr-review__item">
              <span className="sr-review__label">Selected members</span>
              <span className="sr-review__value">
                {getFamilySummaryLabel(details.familyCategories) || '--'}
              </span>
            </li>
            {['self', 'spouse'].map((key) => {
              const member = details.memberDetails?.[key];
              if (!member?.name) return null;
              return (
                <li key={key} className="sr-review__item">
                  <span className="sr-review__label">{FAMILY_MEMBER_CONFIG[key].label}</span>
                  <span className="sr-review__value">
                    {member.name}, {member.gender}, {member.age} yrs
                  </span>
                </li>
              );
            })}
            {['son', 'daughter', 'father', 'mother'].map((key) => {
              const list = details.memberDetails?.[key] || [];
              return list.map((member, index) => {
                if (!member?.name) return null;
                const label = key === 'son' || key === 'daughter'
                  ? `${key.charAt(0).toUpperCase() + key.slice(1)} ${index + 1}`
                  : key === 'father'
                    ? 'Father'
                    : 'Mother';
                return (
                  <li key={`${key}-${index}`} className="sr-review__item">
                    <span className="sr-review__label">{label}</span>
                    <span className="sr-review__value">
                      {member.name}, {member.gender}, {member.age} yrs
                    </span>
                  </li>
                );
              });
            })}
          </ul>
        </div>

        <div className="sr-review">
          <h3 className="sr-review__heading">Location</h3>
          <ul className="sr-review__list">
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
              <span className="sr-review__label">Past Surgeries</span>
              <span className="sr-review__value">{details.pastSurgeries || '--'}</span>
            </li>
            <li className="sr-review__item">
              <span className="sr-review__label">Previous Year Claim</span>
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

  const PaymentStep = () => (
    <section className="sr-form sr-step sr-step--payment" data-step="payment">
      <header className="sr-form__head">
        <h2 className="sr-form__title">Ready for Payment</h2>
      </header>
      <div className="sr-form__body sr-form__body--centered">
        <div className="sr-success">
          <HiOutlineCheckCircle className="sr-success__icon" />
          <h3 className="sr-success__heading">Thank you!</h3>
          <p className="sr-success__text">
            Your renewal details have been saved. You will be redirected to the payment gateway
            shortly.
          </p>
        </div>
      </div>
      <div className="sr-form__actions sr-form__actions--center">
        <button
          type="button"
          className="sr-form__next sr-success__cta"
          onClick={() => window.alert('Proceeding to payment gateway...')}
        >
          View Plans
          <HiArrowRight className="sr-success__cta-icon" aria-hidden="true" />
        </button>
      </div>
    </section>
  );

  // Main step switcher — conditional rendering based on current step.
  // The step renderers are invoked as functions (not JSX components) so React
  // does not treat them as component boundaries. This prevents inputs from
  // losing focus when the parent re-renders while the user is typing.
  const renderStep = () => {
    switch (step) {
      case Step.EnterOtp:
        return OtpStep();
      case Step.PolicyInfo:
        return (
          <div className="sr-split">
            {PolicyInfoStep()}
            {SummaryPanel()}
          </div>
        );
      case Step.InsuranceDetails:
        return (
          <div className="sr-split">
            {InsuranceDetailsStep()}
            {SummaryPanel()}
          </div>
        );
      case Step.HealthInfo:
        return (
          <div className="sr-split">
            {HealthInfoStep()}
            {SummaryPanel()}
          </div>
        );
      case Step.Review:
        return isPayment ? (
          <div className="sr-split">
            {PaymentStep()}
            {SummaryPanel()}
          </div>
        ) : (
          <div className="sr-split">
            {ReviewStep()}
            {SummaryPanel()}
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
        className={`sr-panel${step === Step.EnterOtp ? '' : ' sr-panel--wide'}`}
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
      </div>
    </div>,
    document.body,
  );
};

export default FamilyDetails;
