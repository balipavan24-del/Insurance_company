import { useState } from 'react';
import {
  HiOutlineDocumentText,
  HiOutlineLockClosed,
  HiOutlineMail,
  HiOutlinePhone,
} from 'react-icons/hi';
import './Term-Renew.css';
import TermRenewModal from './TermRenewModal';
import termRenewHeroImage from '../../../assets/images/term-renew-hero.png';

const LOOKUP_METHODS = [
  {
    id: 'policy',
    label: 'Policy Number',
    icon: HiOutlineDocumentText,
    fieldLabel: 'Policy Number',
    placeholder: 'Enter your policy number',
  },
  {
    id: 'mobile',
    label: 'Mobile Number',
    icon: HiOutlinePhone,
    fieldLabel: 'Mobile Number',
    placeholder: 'Enter your mobile number',
  },
  {
    id: 'email',
    label: 'Email Address',
    icon: HiOutlineMail,
    fieldLabel: 'Email Address',
    placeholder: 'Enter your email address',
  },
];

const TermRenew = () => {
  const [lookupMethod, setLookupMethod] = useState('policy');
  const [lookupValue, setLookupValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeMethod =
    LOOKUP_METHODS.find((method) => method.id === lookupMethod) ?? LOOKUP_METHODS[0];

  const handleContinue = () => {
    const value = lookupValue.trim();
    if (!value) {
      window.alert(`Please enter your ${activeMethod.fieldLabel.toLowerCase()}.`);
      return;
    }
    setIsModalOpen(true);
  };

  const policyRef = lookupValue.trim().toUpperCase() || 'TERM-POLICY';

  return (
    <div className="term-renew-page">
      <TermRenewModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        policyRef={policyRef}
      />

      <section className="Hero-Section term-renew-hero" aria-labelledby="term-renew-heading">
        <div className="Hero-Section-Left">
          <span className="Term-renew-badge">Term Insurance Renewal</span>
          <h1 id="term-renew-heading" className="Hero-Section-Title">
            <span className="Hero-Section-Title-Line">Keep Your Family&apos;s</span>
            <span className="Hero-Section-Title-Line Headding-Active">Protection Active</span>
          </h1>
          <div className="Hero-Section-Visual">
            <img
              src={termRenewHeroImage}
              alt="Term insurance renewal protection"
              className="Hero-Section-Image"
              loading="lazy"
              width={785}
              height={476}
            />
          </div>
        </div>

        <div className="Hero-section-right">
          <div className="policy-retrieve-card">
            <h2 className="policy-retrieve-card__title">Retrieve Your Policy</h2>
            <p className="policy-retrieve-card__subtitle">
              Choose any one method to securely locate your policy.
            </p>

            <div className="Retrieve-Your-Policy-Options" role="tablist" aria-label="Policy lookup method">
              {LOOKUP_METHODS.map((method) => {
                const Icon = method.icon;
                const isActive = lookupMethod === method.id;

                return (
                  <button
                    key={method.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`policy-number${isActive ? ' is-active' : ''}`}
                    onClick={() => setLookupMethod(method.id)}
                  >
                    <Icon className="policy-number__icon" aria-hidden="true" />
                    <span>{method.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="policy-input">
              <label className="policy-input__label" htmlFor="term-policy-lookup-value">
                {activeMethod.fieldLabel}
              </label>
              <input
                id="term-policy-lookup-value"
                type="text"
                placeholder={activeMethod.placeholder}
                autoComplete="off"
                value={lookupValue}
                onChange={(event) => setLookupValue(event.target.value)}
              />
              <button type="button" className="policy-continue-button" onClick={handleContinue}>
                <HiOutlineLockClosed className="policy-continue-button__icon" aria-hidden="true" />
                Continue Securely
              </button>
            </div>

            <p className="policy-secure-note">
              <HiOutlineLockClosed className="policy-secure-note__icon" aria-hidden="true" />
              Your information is encrypted and never shared.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermRenew;
