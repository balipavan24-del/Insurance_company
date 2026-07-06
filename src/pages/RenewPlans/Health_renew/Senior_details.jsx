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
} from 'react-icons/hi';
import './Senior-details.css';

const OTP_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 30;

const Step = {
  EnterOtp: 1,
  PolicyInfo: 2,
};

const STEP_META = {
  [Step.PolicyInfo]: { index: 1, label: 'Policy Info' },
};

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

const formatResendTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const Senior_details = ({ children, open, close, mobileNumber = '' }) => {
  const [otp, setOtp] = useState('');
  const [resendSeconds, setResendSeconds] = useState(RESEND_COOLDOWN_SECONDS);
  const [step, setStep] = useState(Step.EnterOtp);

  // Collected details — summary panel reads from this.
  const [details, setDetails] = useState({
    policyType: 'Senior Citizen Health',
    mobileNumber,
    existingInsurer: '',
    sumInsured: '',
    age: '',
    city: '',
    claimStatus: '',
  });

  // Form state for the current input step — committed to `details` on Continue.
  const [form, setForm] = useState({
    existingInsurer: '',
    sumInsured: '',
    policyNumber: '',
    policyExpiryDay: '',
    policyExpiryMonth: '',
    policyExpiryYear: '',
  });

  const resetCollected = () => {
    setDetails({
      policyType: 'Senior Citizen Health',
      mobileNumber,
      existingInsurer: '',
      sumInsured: '',
      age: '',
      city: '',
      claimStatus: '',
    });
    setForm({
      existingInsurer: '',
      sumInsured: '',
      policyNumber: '',
      policyExpiryDay: '',
      policyExpiryMonth: '',
      policyExpiryYear: '',
    });
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleVerify = () => {
    if (otp.length !== OTP_LENGTH) {
      window.alert('Please enter a valid 6-digit OTP');
      return;
    }
    setStep(Step.PolicyInfo);
  };

  const handleResend = () => {
    if (resendSeconds > 0) return;
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

  // Commit current step's form values into the summary, then advance.
  const goNext = () => {
    if (step === Step.PolicyInfo) {
      const insurer = (form.existingInsurer || '').trim();
      const sumInsured = (form.sumInsured || '').trim();
      if (!insurer || !sumInsured) {
        window.alert('Please select your existing insurer and sum insured');
        return;
      }
      setDetails((prev) => ({
        ...prev,
        existingInsurer: insurer,
        sumInsured,
      }));
      // Next step will be added here.
      window.alert('Policy Info saved. Next steps coming soon.');
    }
  };

  useEffect(() => {
    if (!open) {
      setStep(Step.EnterOtp);
      setOtp('');
      resetCollected();
      return undefined;
    }

    // Keep the prefilled mobile number in sync when reopened.
    setDetails((prev) => ({ ...prev, mobileNumber }));
    setResendSeconds(RESEND_COOLDOWN_SECONDS);

    const intervalId = window.setInterval(() => {
      setResendSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [open, mobileNumber]);

  const summaryFields = [
    { key: 'policyType', label: 'Policy Type', value: details.policyType, icon: HiOutlineShieldCheck, editable: false },
    { key: 'mobileNumber', label: 'Mobile Number', value: details.mobileNumber, icon: HiOutlinePhone, editable: false },
    { key: 'existingInsurer', label: 'Existing Insurer', value: details.existingInsurer, icon: HiOutlineOfficeBuilding, editable: true, step: Step.PolicyInfo },
    { key: 'sumInsured', label: 'Sum Insured', value: details.sumInsured, icon: HiOutlineCurrencyRupee, editable: true, step: Step.PolicyInfo },
    { key: 'age', label: 'Age', value: details.age, icon: HiOutlineCalendar, editable: false },
    { key: 'city', label: 'City', value: details.city, icon: HiOutlineLocationMarker, editable: false },
    { key: 'claimStatus', label: 'Claim Status', value: details.claimStatus, icon: HiOutlineClipboardCheck, editable: false },
  ];

  // Jump to the step that collects this field, pre-filling the form so the
  // user can edit the existing value instead of retyping it.
  const handleEditField = (field) => {
    if (!field.editable || !field.step) return;
    setForm((prev) => ({
      ...prev,
      existingInsurer: details.existingInsurer,
      sumInsured: details.sumInsured,
    }));
    setStep(field.step);
  };

  const renderOtpStep = () => (
    <div className="senior-details-otp">
      <div className="senior-details-content">
        <h2 id="senior-details-title" className="senior-details-title">
          Verify Your Identity
        </h2>
      </div>
      <p className="senior-details-text">
        We&apos;ve sent a 6-digit OTP to your registered mobile number.
      </p>
      <input
        type="text"
        className="senior-details-input"
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={OTP_LENGTH}
        placeholder="Enter 6-digit OTP"
        value={otp}
        onChange={handleOtpChange}
      />
      <button type="button" className="senior-details-button" onClick={handleVerify}>
        Verify &amp; Continue
      </button>
      <div className="senior-details-footer">
        <div className="senior-details-footer__row">
          {resendSeconds > 0 ? (
            <p className="senior-details-footer__timer">
              <HiOutlineClock className="senior-details-footer__icon" aria-hidden="true" />
              Resend in {formatResendTime(resendSeconds)}
            </p>
          ) : (
            <span className="senior-details-footer__timer-placeholder" aria-hidden="true" />
          )}
          <button
            type="button"
            className="senior-details-footer__resend"
            onClick={handleResend}
            disabled={resendSeconds > 0}
          >
            Resend OTP
          </button>
        </div>
        <p className="senior-details-footer__secure">
          <HiOutlineLockClosed className="senior-details-footer__icon" aria-hidden="true" />
          Secured with 256-bit encryption
        </p>
      </div>
    </div>
  );

  const renderSummaryPanel = () => (
    <aside className="senior-details-summary" aria-label="Renewal summary">
      <div className="senior-details-summary__head">
        <h3 className="senior-details-summary__title">Renewal Summary</h3>
        <p className="senior-details-summary__sub">Details fill in as you progress.</p>
      </div>
      <ul className="senior-details-summary__list">
        {summaryFields.map((field) => {
          const Icon = field.icon;
          // Show the live, in-progress selection (from form) when the user is
          // actively picking on this field's step; otherwise show the committed
          // value (from details). This makes the summary fill as they click.
          const liveValue =
            field.editable && field.step === step ? form[field.key] : '';
          const value = liveValue || field.value || '';
          const filled = Boolean(value);
          const isPending = Boolean(liveValue) && field.step === step;
          return (
            <li
              key={field.key}
              className={`senior-details-summary__item${filled ? ' is-filled' : ''}${
                isPending ? ' is-pending' : ''
              }`}
            >
              <span className="senior-details-summary__icon">
                <Icon aria-hidden="true" />
              </span>
              <span className="senior-details-summary__meta">
                <span className="senior-details-summary__label">{field.label}</span>
                <span className="senior-details-summary__value">
                  {filled ? value : '—'}
                </span>
              </span>
              {filled && field.editable && !isPending && (
                <button
                  type="button"
                  className="senior-details-summary__edit"
                  onClick={() => handleEditField(field)}
                  aria-label={`Edit ${field.label}`}
                  title={`Edit ${field.label}`}
                >
                  <HiOutlinePencil aria-hidden="true" />
                </button>
              )}
              {filled && !field.editable && (
                <HiOutlineLockClosed
                  className="senior-details-summary__lock"
                  aria-hidden="true"
                  title="Prefilled — not editable"
                />
              )}
            </li>
          );
        })}
      </ul>
      <p className="senior-details-summary__secure">
        <HiOutlineLockClosed className="senior-details-summary__secure-icon" aria-hidden="true" />
        Your information is encrypted and used only to fetch the best renewal quotes.
      </p>
    </aside>
  );

  const renderStepIndicator = () => {
    const steps = [Step.PolicyInfo];
    return (
      <ol className="senior-details-steps" aria-label="Progress">
        {steps.map((s) => {
          const meta = STEP_META[s];
          const state = step === s ? 'current' : step > s ? 'done' : 'todo';
          return (
            <li key={s} className={`senior-details-steps__item is-${state}`}>
              <span className="senior-details-steps__dot">{meta.index}</span>
              <span className="senior-details-steps__label">{meta.label}</span>
            </li>
          );
        })}
      </ol>
    );
  };

  const renderPolicyInfo = () => (
    <section className="senior-details-form">
      {/* Heading BEFORE the step line */}
      <header className="senior-details-form__head">
        <h2 className="senior-details-form__title">{ExistingInsurers.heading}</h2>
      </header>

      {/* Step line */}
      {renderStepIndicator()}

      <div className="senior-details-form__body">
        {/* DIV 1 — Existing Insurer (label1 as heading, list as boxes, 3 per row) */}
        <div className="senior-details-block">
          <h3 className="senior-details-block__heading">
            <HiOutlineOfficeBuilding aria-hidden="true" />
            {ExistingInsurers.label1}
          </h3>
          <div className="senior-details-chips senior-details-chips--col3">
            {ExistingInsurers.list.map((name) => {
              const selected = form.existingInsurer === name;
              return (
                <button
                  type="button"
                  key={name}
                  className={`senior-details-chip${selected ? ' is-selected' : ''}`}
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
        <div className="senior-details-row senior-details-row--2">
          <div className="senior-details-block">
            <h3 className="senior-details-block__heading">
              {ExistingInsurers.label2}
              <span className="senior-details-block__optional">(optional)</span>
            </h3>
            <input
              id="policyNumber"
              name="policyNumber"
              type="text"
              className="senior-details-field__input"
              placeholder="Enter policy number"
              value={form.policyNumber}
              onChange={handleFieldChange}
            />
          </div>

          <div className="senior-details-block">
            <h3 className="senior-details-block__heading">
              <HiOutlineCalendar aria-hidden="true" />
              {ExistingInsurers.label3}
            </h3>
            <div className="senior-details-date">
              <input
                type="text"
                name="policyExpiryDay"
                className="senior-details-date__part"
                inputMode="numeric"
                maxLength={2}
                placeholder="DD"
                aria-label="Day"
                value={form.policyExpiryDay}
                onChange={handleFieldChange}
              />
              <span className="senior-details-date__sep">/</span>
              <input
                type="text"
                name="policyExpiryMonth"
                className="senior-details-date__part"
                inputMode="numeric"
                maxLength={2}
                placeholder="MM"
                aria-label="Month"
                value={form.policyExpiryMonth}
                onChange={handleFieldChange}
              />
              <span className="senior-details-date__sep">/</span>
              <input
                type="text"
                name="policyExpiryYear"
                className="senior-details-date__part senior-details-date__part--year"
                inputMode="numeric"
                maxLength={4}
                placeholder="YYYY"
                aria-label="Year"
                value={form.policyExpiryYear}
                onChange={handleFieldChange}
              />
            </div>
          </div>
        </div>

        {/* DIV 3 — Sum Insured (label4 as heading, sumList as boxes) */}
        <div className="senior-details-block">
          <h3 className="senior-details-block__heading">
            <HiOutlineCurrencyRupee aria-hidden="true" />
            {ExistingInsurers.label4}
          </h3>
          <div className="senior-details-chips senior-details-chips--col3">
            {ExistingInsurers.sumList.map((value) => {
              const selected = form.sumInsured === value;
              return (
                <button
                  type="button"
                  key={value}
                  className={`senior-details-chip${selected ? ' is-selected' : ''}`}
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

      <div className="senior-details-form__actions senior-details-form__actions--end">
        <button type="button" className="senior-details-form__next" onClick={goNext}>
          Continue
        </button>
      </div>
    </section>
  );

  const renderStep = () => {
    switch (step) {
      case Step.EnterOtp:
        return renderOtpStep();
      case Step.PolicyInfo:
        return (
          <div className="senior-details-split">
            {renderPolicyInfo()}
            {renderSummaryPanel()}
          </div>
        );
      default:
        return null;
    }
  };

  if (!open) return null;

  return createPortal(
    <div className="senior-details-overlay" onClick={close} role="presentation">
      <div
        className={`senior-details-panel${
          step === Step.EnterOtp ? '' : ' senior-details-panel--wide'
        }`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="senior-details-title"
      >
        <button type="button" className="senior-details-close" onClick={close} aria-label="Close">
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