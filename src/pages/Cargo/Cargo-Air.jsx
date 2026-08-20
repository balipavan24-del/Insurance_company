import { useEffect, useRef, useState } from 'react';
import './Cargo-Merain.css';
import cargoAirLogo from '../../assets/icons/cargo-air-logo.svg';
import Footer from '../../components/Footer/Footer';
import DropdownChevron from '../../components/Dropdown/DropdownChevron';
import airhero from '../../assets/icons/cargo-air1.png';
import cover1 from '../../assets/icons/cargo-cover1.png';
import cover2 from '../../assets/icons/cargo-cover2.png';
import cover3 from '../../assets/icons/cargo-cover3.png';
import cover4 from '../../assets/icons/cargo-cover4.png';
import cover5 from '../../assets/icons/cargo-cover5.png';
import cover6 from '../../assets/icons/cargo-cover6.png';
import benfit1 from '../../assets/icons/air-benfit1.png';
import benfit2 from '../../assets/icons/air-benfit2.png';
import benfit3 from '../../assets/icons/air-benfit3.png';

const AIR_SHIPMENT_OPTIONS = [
  { value: 'import', label: 'Import' },
  { value: 'export', label: 'Export' },
  { value: 'domestic', label: 'Domestic' },
];

function CargoSelect({ options, value, onChange, placeholder, name }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const selected = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div className={`cargo-custom-select${isOpen ? ' dropdown-open' : ''}`} ref={ref}>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        className={`cargo-select-trigger ${isOpen ? 'is-open' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className="cargo-trigger-value">{selected ? selected.label : placeholder}</span>
        <DropdownChevron className="dropdown-arrow--select" />
      </button>

      {isOpen && (
        <ul className="cargo-select-menu" role="listbox" aria-label="Shipment type options">
          {options.map((option) => (
            <li key={option.value} role="option" aria-selected={value === option.value}>
              <button
                type="button"
                className={`cargo-select-option ${value === option.value ? 'is-selected' : ''}`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CargoAir({ onBackToCargo }) {
  const [shipmentType, setShipmentType] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleQuoteSubmit = (event) => {
    event.preventDefault();
    if (!shipmentType) {
      window.alert('Please select a shipment type.');
      return;
    }
    setShowSuccess(true);
  };

  const handleBackToCargo = () => {
    setShowSuccess(false);
    setShipmentType('');
    if (onBackToCargo) onBackToCargo();
  };

  return (
    <main className="cargo-merain-page">
      <section className="cargo-merain-wrap">
        <div className="Hero">
          <button
            type="button"
            className="cargo-merain-back-link"
            onClick={onBackToCargo}
          >
            ← Back to Cargo Insurance
          </button>

          <section className="cargo-merain-layout">
            <article className="cargo-merain-info cargo-merain-info-panel">
              <div className="cargo-merain-hero-group">
                <div className="cargo-merain-badge" aria-hidden="true">
                  <img src={airhero} alt="Air cargo logo" decoding="async" />
                </div>

                <h1>Air Cargo Insurance</h1>
                <p>
                  Secure your air freight shipments with comprehensive coverage
                  against damage, loss, and delays during air transit.
                </p>

                <div className="cargo-merain-tags">
                  <span><i aria-hidden="true" /> Quick Response</span>
                  <span><i aria-hidden="true" /> Expert Guidance</span>
                  <span><i aria-hidden="true" /> Best Rates</span>
                </div>
              </div>
            </article>

            <article className="cargo-merain-form-card">
              <h2>Get Your Air Cargo Insurance Quote</h2>
              <p>Fill in the details and our expert will reach out to you.</p>

              <form className="cargo-merain-form" onSubmit={handleQuoteSubmit}>
                <label>
                  <span className="cargo-merain-label-text">Shipment Type <em>*</em></span>
                  <CargoSelect
                    name="shipmentType"
                    options={AIR_SHIPMENT_OPTIONS}
                    value={shipmentType}
                    onChange={setShipmentType}
                    placeholder="Select shipment type"
                  />
                </label>

                <label>
                  <span className="cargo-merain-label-text">Mode <em>*</em></span>
                  <input type="text" value="Air" readOnly />
                </label>

                <label>
                  <span className="cargo-merain-label-text">Full Name <em>*</em></span>
                  <div className="cargo-merain-input-wrap">
                    <span className="cargo-merain-input-icon" aria-hidden="true">
                      <svg viewBox="0 0 20 20" focusable="false">
                        <circle cx="10" cy="6.2" r="2.8" />
                        <path d="M4.8 15.3C5.5 12.8 7.5 11.8 10 11.8C12.5 11.8 14.5 12.8 15.2 15.3" />
                      </svg>
                    </span>
                    <input name="fullName" type="text" placeholder="Your full name" required />
                  </div>
                </label>

                <label>
                  <span className="cargo-merain-label-text">Business Name <em>*</em></span>
                  <div className="cargo-merain-input-wrap">
                    <span className="cargo-merain-input-icon" aria-hidden="true">
                      <svg viewBox="0 0 20 20" focusable="false">
                        <path d="M5.5 16V6.2H12.4V16" />
                        <path d="M12.4 16V8.8H15.8V16" />
                        <path d="M7.2 8.2H8.5M9.8 8.2H11.1M7.2 10.4H8.5M9.8 10.4H11.1" />
                      </svg>
                    </span>
                    <input name="businessName" type="text" placeholder="Company name" required />
                  </div>
                </label>

                <label>
                  <span className="cargo-merain-label-text">Mobile Number <em>*</em></span>
                  <div className="cargo-merain-input-wrap">
                    <span className="cargo-merain-input-icon" aria-hidden="true">
                      <svg viewBox="0 0 20 20" focusable="false">
                        <path d="M6.7 4.8C7.2 4.2 8.1 4.2 8.7 4.8L9.7 5.8C10.2 6.3 10.3 7.1 9.8 7.7L9.2 8.4C9.8 9.6 10.7 10.6 11.9 11.2L12.6 10.6C13.2 10.1 14 10.2 14.5 10.7L15.5 11.7C16.1 12.3 16.1 13.2 15.5 13.7L14.8 14.4C14.2 15 13.3 15.2 12.4 14.9C9.8 14.1 7.4 11.8 6.6 9.1C6.3 8.2 6.5 7.3 7.1 6.7L7.8 6" />
                      </svg>
                    </span>
                    <input
                      name="mobileNumber"
                      type="tel"
                      placeholder="10-digit mobile"
                      onChange={(event) => {
                        event.currentTarget.value = String(event.currentTarget.value ?? '')
                          .replace(/\D/g, '')
                          .slice(0, 10);
                      }}
                      required
                    />
                  </div>
                </label>

                <label>
                  <span className="cargo-merain-label-text">Email</span>
                  <div className="cargo-merain-input-wrap">
                    <span className="cargo-merain-input-icon" aria-hidden="true">
                      <svg viewBox="0 0 20 20" focusable="false">
                        <rect x="3.5" y="5.6" width="13" height="8.8" rx="1.5" />
                        <path d="M4.8 7.2L10 10.5L15.2 7.2" />
                      </svg>
                    </span>
                    <input name="email" type="email" placeholder="you@company.com" />
                  </div>
                </label>
                <button type="submit" className="cargo-merain-whatsapp-btn">
                  Get Details on WhatsApp
                </button>
              </form>
              <p className="cargo-merain-note">
                By submitting, you agree to be contacted by our insurance experts.
              </p>
            </article>
          </section>
        </div>

        <section className="cargo-merain-about">
          <div className="cargo-merain-about-content">
            <h2>What is Air Cargo Insurance?</h2>
            <p>
              Air cargo insurance protects goods shipped via aircraft against a wide range
              of risks including turbulence damage, handling mishaps, theft during transit,
              and atmospheric changes. It is ideal for high-value or time-sensitive shipments
              that travel by air freight domestically or internationally.
            </p>
          </div>
        </section>

        <section className="cargo-merain-importance">
          <h2>Why It&apos;s Important</h2>
          <div className="cargo-merain-importance-grid">
            <article className="cargo-merain-importance-card">
              <i aria-hidden="true" />
              <p>Air cargo is often high-value - even small losses can have a major financial impact.</p>
            </article>
            <article className="cargo-merain-importance-card">
              <i aria-hidden="true" />
              <p>Multiple handling points between origin and destination increase the risk of damage.</p>
            </article>
            <article className="cargo-merain-importance-card">
              <i aria-hidden="true" />
              <p>Temperature and pressure changes during flight can affect sensitive goods.</p>
            </article>
            <article className="cargo-merain-importance-card">
              <i aria-hidden="true" />
              <p>Quick transit doesn&apos;t eliminate risk - accidents and theft can occur at any stage.</p>
            </article>
          </div>
        </section>

        <section className="cargo-merain-covered">
          <h2>What&apos;s Covered</h2>
          <div className="cargo-merain-covered-grid">
            <article className="cargo-merain-covered-card">
              <span className="cargo-merain-covered-icon" aria-hidden="true">
                <img src={cover1} alt="In-Flight Damage" />
              </span>
              <p>In-Flight Damage</p>
            </article>

            <article className="cargo-merain-covered-card">
              <span className="cargo-merain-covered-icon" aria-hidden="true">
                <img src={cover2} alt="Handling & Loading Damage" />
              </span>
              <p>Handling &amp; Loading Damage</p>
            </article>

            <article className="cargo-merain-covered-card">
              <span className="cargo-merain-covered-icon" aria-hidden="true">
                <img src={cover3} alt="Theft & Pilferage" />
              </span>
              <p>Theft &amp; Pilferage</p>
            </article>

            <article className="cargo-merain-covered-card">
              <span className="cargo-merain-covered-icon" aria-hidden="true">
                <img src={cover4} alt="Weather & Atmospheric Damage" />
              </span>
              <p>Temperature Variation</p>
            </article>

            <article className="cargo-merain-covered-card">
              <span className="cargo-merain-covered-icon" aria-hidden="true">
                <img src={cover5} alt="Customs & Regulatory Loss" />
              </span>
              <p>Customs &amp; Regulatory Loss</p>
            </article>

            <article className="cargo-merain-covered-card">
              <span className="cargo-merain-covered-icon" aria-hidden="true">
                <img src={cover6} alt="Total Loss Coverage" />
              </span>
              <p>Total Loss Coverage</p>
            </article>
          </div>

          <h3>Benefits</h3>
          <div className="cargo-merain-benefits-grid">
            <article className="cargo-merain-covered-card cargo-merain-benefit-card">
              <span className="cargo-merain-covered-icon" aria-hidden="true">
                <img src={benfit1} alt="Rapid claim processing" />
              </span>
              <p>Rapid claim processing</p>
            </article>
            <article className="cargo-merain-covered-card cargo-merain-benefit-card">
              <span className="cargo-merain-covered-icon" aria-hidden="true">
                <img src={benfit2} alt="Coverage for high-value goods" />
              </span>
              <p>Coverage for high-value goods</p>
            </article>
            <article className="cargo-merain-covered-card cargo-merain-benefit-card">
              <span className="cargo-merain-covered-icon" aria-hidden="true">
                <img src={benfit3} alt="End-to-end transit protection" />
              </span>
              <p>End-to-end transit protection</p>
            </article>
          </div>
        </section>

      </section>
      <Footer />

      {showSuccess && (
        <div
          className="cargo-popup-backdrop"
          role="presentation"
          onClick={() => setShowSuccess(false)}
        >
          <section
            className="cargo-popup-sheet cargo-popup-sheet--success"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cargo-popup-success-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cargo-popup-success">
              <div className="cargo-popup-success__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="currentColor" fillOpacity="0.12" />
                  <path d="M7 12L10.5 15.5L17 9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 id="cargo-popup-success-title" className="cargo-popup-success__title">
                Request Received
              </h3>
              <p className="cargo-popup-success__text">
                Our insurance expert will contact you shortly with suitable plans for your cargo.
              </p>
              <button
                type="button"
                className="cargo-popup-success__button"
                onClick={handleBackToCargo}
              >
                Back to Cargo Home
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default CargoAir;
