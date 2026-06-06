import { useEffect, useMemo, useRef, useState } from 'react';
import './Business-Home.css';
import Footer from '../../components/Footer/Footer';
import { modalOverlayClass, modalPanelClass, useAnimatedModal } from '../../components/AnimatedModal/AnimatedModal';
import DropdownChevron from '../../components/Dropdown/DropdownChevron';
import InsuranceDetailPanel from '../../components/DetailPanel/InsuranceDetailPanel';
import InsuranceFaqAccordion from '../../components/Faq/InsuranceFaqAccordion';
import { businessInsuranceFaqItems } from '../../data/productContent';
import { sanitizePhoneNumber, validateBusinessLeadDetails } from '../../utils/validations/leadValidation';
import businessDisasterIcon from '../../assets/icons/Business-Disaster.webp';
import businessEquipmentIcon from '../../assets/icons/Business-Equipment.webp';
import businessFireIcon from '../../assets/icons/Fire-Business.webp';
import businessTheftIcon from '../../assets/icons/Business-theft.webp';

const BUSINESS_COVERAGE_OPTIONS = [
  {
    id: 'fire-damage',
    title: 'Fire Damage',
    displayTitle: 'Fire Cover',
    subtitle: 'Property and stock damage',
    icon: '🔥',
    cardIcon: businessFireIcon,
    cardIconAlt: 'Fire cover',
    accentClass: 'is-fire',
  },
  {
    id: 'theft-protection',
    title: 'Theft Protection',
    subtitle: 'Break-in and stolen assets',
    icon: businessTheftIcon,
    iconAlt: 'Theft protection',
    isImageIcon: true,
    cardIcon: businessTheftIcon,
    cardIconAlt: 'Theft protection',
    accentClass: 'is-theft',
  },
  {
    id: 'natural-disaster',
    title: 'Natural Disaster Cover',
    displayTitle: 'Natural Disaster Cover',
    subtitle: 'Flood, storm and weather risks',
    icon: '🌧️',
    cardIcon: businessDisasterIcon,
    cardIconAlt: 'Natural disaster cover',
    accentClass: 'is-natural',
  },
  {
    id: 'equipment-breakdown',
    title: 'Equipment Breakdown',
    displayTitle: 'Equipment Breakdown',
    subtitle: 'Machinery and system failures',
    icon: '🛠️',
    cardIcon: businessEquipmentIcon,
    cardIconAlt: 'Equipment breakdown',
    accentClass: 'is-equipment',
  },
];

const BUSINESS_HOME_FIRE_DETAIL_ITEMS = [
  'Accidental fire incidents',
  'Explosion-related damage',
  'Stock and inventory loss',
  'Electrical short circuit damage',
  'Structural damage',
  'Smoke damage',
];

const businessHomeFireDetailImage = `${import.meta.env.BASE_URL}images/Business-fire.webp`;

const BUSINESS_HOME_THEFT_DETAIL_ITEMS = [
  'Break-in losses',
  'Cash and valuables',
  'Employee theft',
  'Stolen inventory',
  'Vandalism damage',
  'Property damage',
];

const businessHomeTheftDetailImage = `${import.meta.env.BASE_URL}images/Business-theft.webp`;
const businessHomeNaturalDetailImage = `${import.meta.env.BASE_URL}images/Business-Natural.webp`;
const businessHomeEquipmentDetailImage = `${import.meta.env.BASE_URL}images/Business-Equipment.webp`;

const BUSINESS_HOME_NATURAL_DETAIL_ITEMS = [
  'Flood damage',
  'Earthquake',
  'Storm and cyclone',
  'Lightning strikes',
  'Hailstorm',
  'Heavy rainfall',
];

const BUSINESS_HOME_EQUIPMENT_DETAIL_ITEMS = [
  'Mechanical failure',
  'Electronic breakdown',
  'Computer systems',
  'Server/storage issues',
  'Electrical failures',
  'Industrial machinery',
];

const BUSINESS_HOME_DETAIL_PANELS = [
  {
    id: 'fire',
    emoji: '🔥',
    title: 'Fire Damage Cover',
    intro:
      'Fire damage cover protects your business against losses caused by fire-related incidents. It ensures that damage to property, assets, and inventory is financially covered.',
    items: BUSINESS_HOME_FIRE_DETAIL_ITEMS,
    imageSrc: businessHomeFireDetailImage,
    imageAlt: 'Commercial building fire emergency with fire department response',
    tone: 'fire',
    reverse: false,
  },
  {
    id: 'theft',
    emoji: '🔒',
    title: 'Theft Protection',
    intro: 'Theft protection secures your business against losses caused by theft or unauthorized entry.',
    items: BUSINESS_HOME_THEFT_DETAIL_ITEMS,
    imageSrc: businessHomeTheftDetailImage,
    imageAlt: 'Break-in at a business premises with damaged glass door',
    tone: 'theft',
    reverse: true,
  },
  {
    id: 'natural',
    emoji: '🌩️',
    title: 'Natural Disaster Cover',
    intro: 'Natural disaster cover protects your business against environmental risks and large-scale disruptions.',
    items: BUSINESS_HOME_NATURAL_DETAIL_ITEMS,
    imageSrc: businessHomeNaturalDetailImage,
    imageAlt: 'Business property exposed to severe weather and lightning',
    tone: 'natural',
    reverse: false,
  },
  {
    id: 'equipment',
    emoji: '⚙️',
    title: 'Equipment Breakdown Cover',
    intro: 'Equipment breakdown cover protects your business from sudden machinery or system failures.',
    items: BUSINESS_HOME_EQUIPMENT_DETAIL_ITEMS,
    imageSrc: businessHomeEquipmentDetailImage,
    imageAlt: 'Industrial machinery in a factory representing equipment breakdown risk',
    tone: 'equipment',
    reverse: true,
  },
];

const BUSINESS_POPUP_COVERAGE_FIELD_CONFIG = {
  'fire-damage': {
    id: 'business-popup-safety',
    label: 'Fire Safety Measures',
    placeholder: 'Select',
    options: [
      { value: 'yes', label: 'Yes - Fire extinguishers / sprinklers installed' },
      { value: 'no', label: 'No' },
    ],
  },
  'theft-protection': {
    id: 'business-popup-storage',
    label: 'Storage Type',
    placeholder: 'Select storage type',
    options: [
      { value: 'shop', label: 'Shop' },
      { value: 'warehouse', label: 'Warehouse' },
      { value: 'office', label: 'Office' },
    ],
  },
  'natural-disaster': {
    id: 'business-popup-natural-need',
    label: 'What would you like to insure?',
    placeholder: 'Select',
    options: [
      { value: 'building', label: 'Building' },
      { value: 'stock-inventory', label: 'Stock / Inventory' },
      { value: 'equipment', label: 'Equipment' },
    ],
  },
  'equipment-breakdown': {
    id: 'business-popup-equipment-need',
    label: 'What would you like to insure?',
    placeholder: 'Select',
    options: [
      { value: 'building', label: 'Building' },
      { value: 'stock-inventory', label: 'Stock / Inventory' },
      { value: 'equipment', label: 'Equipment' },
    ],
  },
};

const BUSINESS_POPUP_THEFT_SECURITY_OPTIONS = [
  { value: 'cctv', label: 'CCTV' },
  { value: 'security', label: 'Security' },
  { value: 'none', label: 'None' },
];

const BUSINESS_POPUP_NATURAL_LOCATION_OPTIONS = [
  { value: 'ground', label: 'Ground floor' },
  { value: 'upper', label: 'Upper floor' },
];

const BUSINESS_POPUP_NATURAL_RISK_OPTIONS = [
  { value: 'flood-prone', label: 'Flood-prone' },
  { value: 'normal', label: 'Normal' },
];

const BUSINESS_POPUP_EQUIPMENT_TYPE_OPTIONS = [
  { value: 'machinery', label: 'Machinery' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'mixed', label: 'Mixed' },
];

const BUSINESS_POPUP_EQUIPMENT_USAGE_OPTIONS = [
  { value: 'heavy', label: 'Heavy Usage' },
  { value: 'occasional', label: 'Occasional Usage' },
];

function BusinessCoverageIcon({ option, className = 'business-option-icon' }) {
  if (option?.isImageIcon) {
    return (
      <span className={className} aria-hidden="true">
        <img src={option.icon} alt="" />
      </span>
    );
  }

  return (
    <span className={className} aria-hidden="true">
      {option?.icon}
    </span>
  );
}

function BusinessHome({
  onBackHome,
  onFireDamageSelect,
  onTheftProtectionSelect,
  onNaturalDisasterSelect,
  onEquipmentBreakdownSelect,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCoverageId, setSelectedCoverageId] = useState('');
  const [isQuotePopupOpen, setIsQuotePopupOpen] = useState(false);
  const quoteModalMotion = useAnimatedModal(isQuotePopupOpen);
  const dropdownRef = useRef(null);

  const coverageActionMap = useMemo(
    () => ({
      'fire-damage': onFireDamageSelect,
      'theft-protection': onTheftProtectionSelect,
      'natural-disaster': onNaturalDisasterSelect,
      'equipment-breakdown': onEquipmentBreakdownSelect,
    }),
    [onEquipmentBreakdownSelect, onFireDamageSelect, onNaturalDisasterSelect, onTheftProtectionSelect]
  );

  const selectedCoverage = BUSINESS_COVERAGE_OPTIONS.find((option) => option.id === selectedCoverageId);
  const selectedCoverageTitle = selectedCoverage?.title || 'Business';
  const selectedCoverageIconOption = selectedCoverage || { icon: '🧳' };
  const popupCoverageFieldConfig =
    BUSINESS_POPUP_COVERAGE_FIELD_CONFIG[selectedCoverageId] || BUSINESS_POPUP_COVERAGE_FIELD_CONFIG['fire-damage'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleSelectCoverage = (coverageId) => {
    setSelectedCoverageId(coverageId);
    setIsDropdownOpen(false);
  };

  const handleContinue = () => {
    if (!selectedCoverageId) return;
    setIsQuotePopupOpen(true);
  };

  const handleQuoteSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const validationErrors = validateBusinessLeadDetails({
      fullName: formData.get('fullName'),
      mobileNumber: formData.get('mobileNumber')
    });
    if (validationErrors.length > 0) {
      window.alert(validationErrors.join('\n'));
      return;
    }
    const action = coverageActionMap[selectedCoverageId];
    if (action) action();
  };

  return (
    <main className="business-page">
      <section className="business-wrap">
        <button type="button" className="business-back-link" onClick={onBackHome}>
          ← Back to Home
        </button>
        <section className="business-hero" aria-label="Business insurance quote section">
          <article className="business-hero-copy">
            <span className="business-chip">Business Insurance</span>
            <h1>
              Protect Your Business
              <br />
              from <span>Unexpected Risks</span>
            </h1>
            <p>
              Business insurance helps safeguard your company against
              <br />
              financial losses caused by unforeseen events. From property
              <br />
              damage to operational disruptions, it ensures your business
              <br />
              continues to run smoothly.
            </p>
            <ul className="business-trust-list" aria-label="Business insurance highlights">
              <li>Trusted Insurers</li>
              <li>Quick Claims</li>
              <li>Expert Guidance</li>
            </ul>
          </article>

          <article className="business-quote-card">
            <p className="business-quote-kicker">Get a Quote</p>
            <h2>What do you want to insure?</h2>
            <p className="business-quote-subtext">
              Choose your business coverage type to get started.
            </p>

            <label className="business-field-label" htmlFor="business-coverage-select">
              Insurance type
            </label>

            <div
              className={`business-custom-select${isDropdownOpen ? ' dropdown-open' : ''}`}
              ref={dropdownRef}
            >
              <button
                id="business-coverage-select"
                type="button"
                className={`business-select-trigger ${isDropdownOpen ? 'is-open' : ''}`}
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen}
                onClick={() => setIsDropdownOpen((current) => !current)}
              >
                <span className="business-trigger-value">
                  {selectedCoverage ? (
                    <>
                      <BusinessCoverageIcon option={selectedCoverage} />
                      {selectedCoverage.title}
                    </>
                  ) : (
                    'Select insurance type'
                  )}
                </span>
                <DropdownChevron className="dropdown-arrow--select" />
              </button>

              {isDropdownOpen && (
                <ul className="business-select-menu" role="listbox" aria-label="Business coverage options">
                  {BUSINESS_COVERAGE_OPTIONS.map((option) => (
                    <li key={option.id} role="option" aria-selected={selectedCoverageId === option.id}>
                      <button
                        type="button"
                        className={`business-select-option ${selectedCoverageId === option.id ? 'is-selected' : ''}`}
                        onClick={() => handleSelectCoverage(option.id)}
                      >
                        <BusinessCoverageIcon option={option} />
                        <span>{option.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              type="button"
              className="business-continue-btn"
              onClick={handleContinue}
              disabled={!selectedCoverageId}
            >
              Continue
            </button>

            <p className="business-note">No obligation - free expert guidance</p>
          </article>
        </section>
      </section>

      <section className="business-coverage-section" aria-label="Business coverage options">
        <div className="business-coverage-wrap">
          <section className="business-coverage">
            <h2>What coverage do you need?</h2>
            <div className="business-list">
              {BUSINESS_COVERAGE_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`business-list-item ${selectedCoverageId === option.id ? 'is-active' : ''}`}
                  onClick={() => {
                    setSelectedCoverageId(option.id);
                    const action = coverageActionMap[option.id];
                    if (action) action();
                  }}
                >
                  {option.badge && <span className="business-list-badge">{option.badge}</span>}
                  <div className={`business-list-banner ${option.accentClass}`}>
                    <span className={`business-list-icon ${option.accentClass}`} aria-hidden="true">
                      <img src={option.cardIcon} alt="" />
                    </span>
                  </div>
                  <div className="business-list-content">
                    <h3>{option.displayTitle || option.title}</h3>
                    <p>{option.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="business-home-whats-covered" aria-label="What's covered">
        <div className="business-coverage-wrap">
          <div
            className="business-home-detail-coverage"
            aria-labelledby="business-home-detail-coverage-heading"
          >
            <header className="business-home-detail-coverage__header">
              <p className="business-home-detail-coverage__eyebrow">Detailed coverage</p>
              <h2 id="business-home-detail-coverage-heading">What Each Cover Protects</h2>
              <p className="business-home-detail-coverage__lede">
                A closer look at every coverage type and what&apos;s included.
              </p>
            </header>

            {BUSINESS_HOME_DETAIL_PANELS.map((panel, index) => (
              <InsuranceDetailPanel
                key={panel.id}
                {...panel}
                imageLoading={index === 0 ? 'eager' : 'lazy'}
              />
            ))}
          </div>
        </div>
      </section>

      <InsuranceFaqAccordion
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about business insurance, coverage, and claims."
        items={businessInsuranceFaqItems}
      />

      <Footer />

      {quoteModalMotion.visible && (
        <div
          className={modalOverlayClass(quoteModalMotion.closing, 'business-popup-backdrop')}
          role="presentation"
          onClick={() => setIsQuotePopupOpen(false)}
        >
          <section
            className={modalPanelClass(quoteModalMotion.closing, 'business-popup-sheet')}
            role="dialog"
            aria-modal="true"
            aria-labelledby="business-popup-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="business-popup-close"
              aria-label="Close quote form"
              onClick={() => setIsQuotePopupOpen(false)}
            >
              ×
            </button>
            <h3 id="business-popup-title">
              <BusinessCoverageIcon option={selectedCoverageIconOption} className="business-popup-title-icon" />
              Get Your {selectedCoverageTitle} Insurance Quote
            </h3>
            <p className="business-popup-subtitle">Fill in the details and our expert will reach out to you.</p>

            <form className="business-popup-form" onSubmit={handleQuoteSubmit}>
              <label htmlFor="business-popup-type">Business Type</label>
              <select id="business-popup-type" defaultValue="">
                <option value="" disabled>Select business type</option>
                <option value="retail">Retail Shop</option>
                <option value="office">Office</option>
                <option value="warehouse">Warehouse</option>
                <option value="manufacturing">Manufacturing Unit</option>
              </select>

              <label htmlFor="business-popup-insure">What would you like to insure?</label>
              <div id="business-popup-insure" className="business-popup-readonly-value" aria-live="polite">
                <BusinessCoverageIcon option={selectedCoverageIconOption} className="business-popup-readonly-icon" />
                <span>{selectedCoverageTitle}</span>
              </div>

              <div className="business-popup-grid">
                <div>
                  <label htmlFor="business-popup-name">Business Name</label>
                  <input id="business-popup-name" type="text" placeholder="Business name" required />
                </div>
                <div>
                  <label htmlFor="business-popup-city">City</label>
                  <select id="business-popup-city" defaultValue="">
                    <option value="" disabled>Select city</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="delhi">Delhi</option>
                    <option value="hyderabad">Hyderabad</option>
                    <option value="bengaluru">Bengaluru</option>
                  </select>
                </div>
              </div>

              <label htmlFor={popupCoverageFieldConfig.id}>{popupCoverageFieldConfig.label}</label>
              <select id={popupCoverageFieldConfig.id} key={selectedCoverageId} defaultValue="">
                <option value="" disabled>{popupCoverageFieldConfig.placeholder}</option>
                {popupCoverageFieldConfig.options.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>

              {selectedCoverageId === 'theft-protection' && (
                <>
                  <label htmlFor="business-popup-theft-security">Security Measures</label>
                  <select id="business-popup-theft-security" defaultValue="">
                    <option value="" disabled>Select</option>
                    {BUSINESS_POPUP_THEFT_SECURITY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </>
              )}

              {selectedCoverageId === 'natural-disaster' && (
                <>
                  <label htmlFor="business-popup-natural-location">Property Location</label>
                  <select id="business-popup-natural-location" defaultValue="">
                    <option value="" disabled>Select floor</option>
                    {BUSINESS_POPUP_NATURAL_LOCATION_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>

                  <label htmlFor="business-popup-natural-risk">Area Risk</label>
                  <select id="business-popup-natural-risk" defaultValue="">
                    <option value="" disabled>Select risk level</option>
                    {BUSINESS_POPUP_NATURAL_RISK_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </>
              )}

              {selectedCoverageId === 'equipment-breakdown' && (
                <>
                  <label htmlFor="business-popup-equipment-type">Equipment Type</label>
                  <select id="business-popup-equipment-type" defaultValue="">
                    <option value="" disabled>Select type</option>
                    {BUSINESS_POPUP_EQUIPMENT_TYPE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>

                  <label htmlFor="business-popup-equipment-usage">Equipment Usage</label>
                  <select id="business-popup-equipment-usage" defaultValue="">
                    <option value="" disabled>Select usage</option>
                    {BUSINESS_POPUP_EQUIPMENT_USAGE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </>
              )}

              <div className="business-popup-grid">
                <div>
                  <label htmlFor="business-popup-full-name">Full Name</label>
                  <input id="business-popup-full-name" name="fullName" type="text" placeholder="Your full name" required />
                </div>
                <div>
                  <label htmlFor="business-popup-mobile">Mobile Number</label>
                  <input
                    id="business-popup-mobile"
                    name="mobileNumber"
                    type="tel"
                    placeholder="10-digit mobile"
                    onChange={(event) => {
                      event.currentTarget.value = sanitizePhoneNumber(event.currentTarget.value);
                    }}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="business-popup-submit">Get Details on WhatsApp</button>
              <p className="business-popup-note">By submitting, you agree to be contacted by our insurance experts.</p>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}

export default BusinessHome;
