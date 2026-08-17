import { useEffect, useMemo, useRef, useState } from 'react';
import Footer from '../../components/Footer/Footer';
import InsuranceFaqAccordion from '../../components/Faq/InsuranceFaqAccordion';
import { healthInsuranceFaqItems } from '../../data/productContent';
import { modalOverlayClass, modalPanelClass, useAnimatedModal } from '../../components/AnimatedModal/AnimatedModal';
import './Health-Home.css';

// Static health page images
import healthHeroImage from '/images/health/hero.webp';
import healthAboutImage from '/images/health/About-Health.webp';

// What's Covered icons (PNG illustrations)
import coveredHospitalizationIcon from '/images/health/covered-hospitalization-expenses.png';
import coveredPrePostIcon from '/images/health/covered-pre-post-hospitalization.png';
import coveredDayCareIcon from '/images/health/covered-day-care.png';
import coveredAmbulanceIcon from '/images/health/covered-ambulance-charges.png';
import coveredSurgeriesIcon from '/images/health/covered-surgeries.png';
import coveredCriticalIcon from '/images/health/covered-critical-illness.png';
import coveredDiagnosticIcon from '/images/health/covered-diagnostic-tests.png';
import coveredCashlessIcon from '/images/health/covered-cashless-treatment.png';

// What's Not Covered icons (PNG illustrations)
import exclusionPreExistingIcon from '/images/health/exclusion-pre-existing-diseases.png';
import exclusionNonMedicalIcon from '/images/health/exclusion-non-medical-expenses.png';
import exclusionCosmeticIcon from '/images/health/exclusion-cosmetic-treatments.png';
import exclusionSelfInflictedIcon from '/images/health/exclusion-self-inflicted-injuries.png';
import exclusionExperimentalIcon from '/images/health/exclusion-experimental-treatments.png';
import exclusionDentalVisionIcon from '/images/health/exclusion-dental-vision.png';
import exclusionMaternityIcon from '/images/health/exclusion-maternity.png';
import exclusionSubstanceIcon from '/images/health/exclusion-substance-abuse.png';

// Hero feature card icons (PNG illustrations)
import comprehensiveCoverageIcon from '/images/health/comprehensive-coverage.png';
import cashlessHospitalsIcon from '/images/health/cashless-hospitals.png';
import quickClaimSupportIcon from '/images/health/quick-claim-support.png';
import familyProtectionIcon from '/images/health/family-protection.png';

// Why insurance benefit icons (PNG illustrations)
import risingMedicalCostsIcon from '/images/health/rising-medical-costs.png';
import emergencyProtectionIcon from '/images/health/emergency-protection.png';
import peaceOfMindIcon from '/images/health/peace-of-mind.png';
import financialSecurityIcon from '/images/health/financial-security.png';

// Health insurance plan type icons
import selfPlanIcon from '/images/health/health-plan-self.png';
import spousePlanIcon from '/images/health/health-plan-spouse.png';
import childrenPlanIcon from '/images/health/health-plan-children.png';
import parentsPlanIcon from '/images/health/health-plan-parents.png';

const GENDER_OPTIONS = ['Male', 'Female'];

// Cities offered in the "City of Residence" dropdown (step 2). Sourced from the
// requested list with corrected spellings.
const CITY_OPTIONS = [
  'Hyderabad',
  'Delhi',
  'Mumbai',
  'Chennai',
  'Kolkata',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Lucknow',
  'Chandigarh',
  'Indore',
  'Kochi',
  'Coimbatore',
  'Nagpur',
  'Surat',
  'Vadodara',
  'Bhopal',
  'Visakhapatnam',
  'Thiruvananthapuram',
];

/**
 * Custom city dropdown. Renders inline (not absolutely positioned) so it can
 * never be clipped by the modal/panel scroll containers. Closes on outside
 * click, Escape, or selection; supports arrow-key + Enter navigation.
 */
function CitySelect({ value, onChange, id }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef(null);
  const listRef = useRef(null);

  // Close on outside click.
  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    window.addEventListener('pointerdown', onPointerDown);
    return () => window.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  // Close on Escape + keep the active option scrolled into view.
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, CITY_OPTIONS.length - 1));
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      } else if (event.key === 'Enter' && activeIndex >= 0) {
        event.preventDefault();
        onChange(CITY_OPTIONS[activeIndex]);
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, activeIndex, onChange]);

  useEffect(() => {
    if (!open || activeIndex < 0 || !listRef.current) return;
    const item = listRef.current.children[activeIndex];
    if (item) item.scrollIntoView({ block: 'nearest' });
  }, [open, activeIndex]);

  const handleToggle = () => {
    setOpen((prev) => {
      if (!prev) {
        // Pre-highlight the currently selected city when opening.
        const idx = CITY_OPTIONS.indexOf(value);
        setActiveIndex(idx >= 0 ? idx : 0);
      }
      return !prev;
    });
  };

  const handleSelect = (cityName) => {
    onChange(cityName);
    setOpen(false);
  };

  return (
    <div className="health-city-select" ref={rootRef} data-open={open}>
      <button
        type="button"
        id={id}
        className={`health-city-select-trigger${value ? ' has-value' : ''}`}
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select your city of residence"
      >
        <span className="health-contact-icon is-mint" aria-hidden="true">
          📍
        </span>
        <span className="health-city-select-value">{value || 'Select your city'}</span>
        <span className="health-city-select-caret" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      {open && (
        <ul className="health-city-select-menu" role="listbox" ref={listRef} aria-label="City of residence">
          {CITY_OPTIONS.map((cityName, index) => (
            <li
              key={cityName}
              role="option"
              aria-selected={cityName === value}
              className={`health-city-select-option${cityName === value ? ' is-selected' : ''}${
                index === activeIndex ? ' is-active' : ''
              }`}
              onPointerDown={(event) => {
                // Prevent the button trigger / outside-click handler from
                // stealing focus and racing the selection.
                event.preventDefault();
                handleSelect(cityName);
              }}
              onMouseEnter={() => setActiveIndex(index)}
            >
              {cityName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Maximum number of members allowed per dependent label. Children are capped
// at 2 boys and 2 girls; parents (father/mother) are capped at 1 each — you can
// only add one father and one mother to a plan.
const MEMBER_MAX_COUNT = {
  son: 2,
  daughter: 2,
  father: 1,
  mother: 1,
};

const createMember = (id, label, relation, icon, colorClass) => ({
  id,
  label,
  relation,
  icon,
  colorClass,
});

const FAMILY_MEMBERS = {
  self: createMember('self', 'Self', 'Primary insured member', '👤', 'is-blue'),
  spouse: createMember('spouse', 'Spouse', 'Husband or wife', '💗', 'is-pink'),
  children: createMember('children', 'Children', 'Add dependent children', '🧒', 'is-purple'),
  parents: createMember('parents', 'Parents', 'Add dependent parents', '👪', 'is-orange'),
};

function HeroFeatureIcon({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      className="health-hero-feature-icon"
      width="28"
      height="28"
      loading="lazy"
      decoding="async"
    />
  );
}

function IconBadgeShield() {
  return (
    <svg className="health-hero-badge-svg" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 2.2 4.5 5.4v5.4c0 4.4 3 8.5 7.5 10.3l.2.1.2-.1C16.5 19.3 19.5 15.2 19.5 10.8V5.4L12 2.2zm-.5 5.3h1v2.2h2.2v1H12.5v2.2h-1v-2.2H9.3v-1h2.2V7.5z"
      />
    </svg>
  );
}

const HEALTH_PLAN_TYPES = [
  {
    id: 'family',
    title: 'Family Health Insurance',
    description: 'Single policy covering your entire family with shared sum insured.',
    iconTone: 'health-types-card-icon is-type-family',
    iconSrc: childrenPlanIcon,
    iconAlt: 'Family health insurance icon',
  },
  {
    id: 'senior',
    title: 'Senior Citizen Health Insurance',
    description: 'Specialized coverage designed for parents and older adults.',
    iconTone: 'health-types-card-icon is-type-senior',
    iconSrc: parentsPlanIcon,
    iconAlt: 'Senior citizen health insurance icon',
  },
  {
    id: 'individual',
    title: 'Individual Health Insurance',
    description: 'Personal coverage with your own dedicated sum insured.',
    iconTone: 'health-types-card-icon is-type-individual',
    iconSrc: selfPlanIcon,
    iconAlt: 'Individual health insurance icon',
  },
  {
    id: 'spouse',
    title: 'Spouse Health Insurance',
    description: 'Affordable extra cover above your existing health policy.',
    iconTone: 'health-types-card-icon is-type-spouse',
    iconSrc: spousePlanIcon,
    iconAlt: 'Spouse health insurance icon',
  },
];

const WHY_INSURANCE_BENEFITS = [
  {
    id: 'costs',
    title: 'Rising Medical Costs',
    description: 'Stay ahead of inflation in healthcare expenses.',
    iconWrapClass: 'health-benefits-icon-wrap is-benefit-blue',
    iconSrc: risingMedicalCostsIcon,
    iconAlt: 'Rising medical costs icon',
  },
  {
    id: 'emergency',
    title: 'Emergency Protection',
    description: 'Be ready for any unexpected medical event.',
    iconWrapClass: 'health-benefits-icon-wrap is-benefit-rose',
    iconSrc: emergencyProtectionIcon,
    iconAlt: 'Emergency protection icon',
  },
  {
    id: 'peace',
    title: 'Peace of Mind',
    description: 'Focus on recovery, not bills, when it matters.',
    iconWrapClass: 'health-benefits-icon-wrap is-benefit-purple',
    iconSrc: peaceOfMindIcon,
    iconAlt: 'Peace of mind icon',
  },
  {
    id: 'security',
    title: 'Financial Security',
    description: 'Protect your savings from medical emergencies.',
    iconWrapClass: 'health-benefits-icon-wrap is-benefit-fuchsia',
    iconSrc: financialSecurityIcon,
    iconAlt: 'Financial security icon',
  },
];

const HERO_FEATURE_CARDS = [
  {
    id: 'coverage',
    title: 'Comprehensive Coverage',
    iconWrapClass: 'health-hero-feature-icon-wrap is-sky',
    iconSrc: comprehensiveCoverageIcon,
    iconAlt: 'Comprehensive coverage icon',
  },
  {
    id: 'cashless',
    title: 'Cashless Hospitals',
    iconWrapClass: 'health-hero-feature-icon-wrap is-violet',
    iconSrc: cashlessHospitalsIcon,
    iconAlt: 'Cashless hospitals icon',
  },
  {
    id: 'claims',
    title: 'Quick Claim Support',
    iconWrapClass: 'health-hero-feature-icon-wrap is-rose',
    iconSrc: quickClaimSupportIcon,
    iconAlt: 'Quick claim support icon',
  },
  {
    id: 'family',
    title: 'Family Protection',
    iconWrapClass: 'health-hero-feature-icon-wrap is-lilac',
    iconSrc: familyProtectionIcon,
    iconAlt: 'Family protection icon',
  },
];

const HEALTH_COVERAGE_ITEMS = [
  { id: 'hospital', title: 'Hospitalization Expenses', iconSrc: coveredHospitalizationIcon, iconAlt: 'Hospitalization expenses icon' },
  { id: 'prepost', title: 'Pre & Post Hospitalization', iconSrc: coveredPrePostIcon, iconAlt: 'Pre and post hospitalization icon' },
  { id: 'daycare', title: 'Day-Care Procedures', iconSrc: coveredDayCareIcon, iconAlt: 'Day-care procedures icon' },
  { id: 'ambulance', title: 'Ambulance Charges', iconSrc: coveredAmbulanceIcon, iconAlt: 'Ambulance charges icon' },
  { id: 'surgery', title: 'Surgeries & Treatments', iconSrc: coveredSurgeriesIcon, iconAlt: 'Surgeries and treatments icon' },
  { id: 'critical', title: 'Critical Illness Coverage', iconSrc: coveredCriticalIcon, iconAlt: 'Critical illness coverage icon' },
  { id: 'diagnostic', title: 'Diagnostic Tests', iconSrc: coveredDiagnosticIcon, iconAlt: 'Diagnostic tests icon' },
  { id: 'cashless', title: 'Cashless Treatment', iconSrc: coveredCashlessIcon, iconAlt: 'Cashless treatment icon' },
];

const HEALTH_EXCLUSION_ITEMS = [
  { id: 'preexisting', title: 'Pre-existing diseases (waiting period)', iconSrc: exclusionPreExistingIcon, iconAlt: 'Pre-existing diseases exclusion icon' },
  { id: 'nonmedical', title: 'Non-medical expenses', iconSrc: exclusionNonMedicalIcon, iconAlt: 'Non-medical expenses exclusion icon' },
  { id: 'cosmetic', title: 'Cosmetic treatments', iconSrc: exclusionCosmeticIcon, iconAlt: 'Cosmetic treatments exclusion icon' },
  { id: 'selfharm', title: 'Self-inflicted injuries', iconSrc: exclusionSelfInflictedIcon, iconAlt: 'Self-inflicted injuries exclusion icon' },
  { id: 'experimental', title: 'Experimental treatments', iconSrc: exclusionExperimentalIcon, iconAlt: 'Experimental treatments exclusion icon' },
  { id: 'dentalvision', title: 'Dental/vision (non-accidental)', iconSrc: exclusionDentalVisionIcon, iconAlt: 'Dental and vision exclusion icon' },
  { id: 'maternity', title: 'Maternity (waiting period)', iconSrc: exclusionMaternityIcon, iconAlt: 'Maternity exclusion icon' },
  { id: 'substance', title: 'Substance abuse', iconSrc: exclusionSubstanceIcon, iconAlt: 'Substance abuse exclusion icon' },
];

function HealthHome({ onBackHome }) {
  const [healthQuotePopupOpen, setHealthQuotePopupOpen] = useState(false);
  const healthQuoteModalMotion = useAnimatedModal(healthQuotePopupOpen);
  const [activeStep, setActiveStep] = useState(1);
  const [selfEnabled, setSelfEnabled] = useState(false);
  const [selfGender, setSelfGender] = useState('Male');
  const [selfAge, setSelfAge] = useState('0');
  const [spouseEnabled, setSpouseEnabled] = useState(false);
  const [spouseGender, setSpouseGender] = useState('Female');
  const [spouseAge, setSpouseAge] = useState('0');
  const [children, setChildren] = useState([]);
  const [parents, setParents] = useState([]);
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [city, setCity] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [email, setEmail] = useState('');
  const [medicalConditions, setMedicalConditions] = useState({
    diabetes: false,
    highBloodPressure: false,
    asthma: false,
    heartDisease: false,
    thyroid: false,
    pastSurgeries: false,
  });
  const [otherMedicalNotes, setOtherMedicalNotes] = useState('');

  useEffect(() => {
    if (!healthQuoteModalMotion.visible) {
      return undefined;
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setHealthQuotePopupOpen(false);
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [healthQuoteModalMotion.visible]);

  const childrenCountLabel = useMemo(
    () => `${children.length} added`,
    [children.length]
  );
  const parentsCountLabel = useMemo(
    () => `${parents.length} added`,
    [parents.length]
  );

  const clampAgeInput = (value) => {
    if (value === '') {
      return '';
    }
    const parsed = Number.parseInt(value, 10);
    if (Number.isNaN(parsed)) {
      return '';
    }
    return String(Math.min(100, Math.max(0, parsed)));
  };

  const handleDependentAgeUpdate = (members, setMembers, memberId, nextAge) => {
    setMembers(
      members.map((member) => (member.id === memberId ? { ...member, age: clampAgeInput(nextAge) } : member))
    );
  };

  const addChild = (label) => {
    const key = label.toLowerCase();
    const max = MEMBER_MAX_COUNT[key] ?? Infinity;
    const currentCount = children.filter((member) => member.label.toLowerCase() === key).length;
    if (currentCount >= max) return;
    setChildren((prev) => [...prev, { id: `child-${key}-${currentCount + 1}`, label, age: '0' }]);
  };

  const addParent = (label) => {
    const key = label.toLowerCase();
    const max = MEMBER_MAX_COUNT[key] ?? Infinity;
    const currentCount = parents.filter((member) => member.label.toLowerCase() === key).length;
    if (currentCount >= max) return;
    setParents((prev) => [...prev, { id: `parent-${key}-${currentCount + 1}`, label, age: '0' }]);
  };

  const isDependentAtMax = (members, label) => {
    const key = label.toLowerCase();
    const max = MEMBER_MAX_COUNT[key] ?? Infinity;
    return members.filter((member) => member.label.toLowerCase() === key).length >= max;
  };

  const removeMember = (members, setMembers, memberId) => {
    setMembers(members.filter((member) => member.id !== memberId));
  };

  const handleAgeStep = (currentAge, delta, applyAge) => {
    const parsed = Number.parseInt(currentAge, 10);
    const baseAge = Number.isNaN(parsed) ? 0 : parsed;
    applyAge(clampAgeInput(String(baseAge + delta)));
  };

  const renderAgeInput = (value, applyAge, ariaLabel, isCompact = false) => (
    <div className={`health-number-input${isCompact ? ' is-compact' : ''}`}>
      <input
        type="number"
        min="0"
        max="100"
        step="1"
        value={value}
        onChange={(event) => applyAge(clampAgeInput(event.target.value))}
        aria-label={ariaLabel}
      />
      <div className="health-stepper" role="group" aria-label={`${ariaLabel} controls`}>
        <button
          type="button"
          className="health-step-btn"
          onClick={() => handleAgeStep(value, 1, applyAge)}
          aria-label={`Increase ${ariaLabel}`}
        >
          ▲
        </button>
        <button
          type="button"
          className="health-step-btn"
          onClick={() => handleAgeStep(value, -1, applyAge)}
          aria-label={`Decrease ${ariaLabel}`}
        >
          ▼
        </button>
      </div>
    </div>
  );

  const renderContactField = (
    id,
    label,
    value,
    setValue,
    iconClass,
    icon,
    type = 'text',
    helperText = '',
    placeholder = ''
  ) => (
    <label className="health-contact-field" htmlFor={id}>
      <span>
        {label}
      </span>
      <div className="health-contact-input-wrap">
        <span className={`health-contact-icon ${iconClass}`} aria-hidden="true">
          {icon}
        </span>
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
      {helperText && <small>{helperText}</small>}
    </label>
  );

  const scrollToDetailsPanel = () => {
    document.getElementById('health-quote-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollQuoteIntoView = () => {
    if (healthQuotePopupOpen) {
      return;
    }
    scrollToDetailsPanel();
  };

  const handleContactContinue = () => {
    setActiveStep(3);
    requestAnimationFrame(() => scrollQuoteIntoView());
  };

  const toggleMedicalCondition = (key) => {
    setMedicalConditions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleViewHealthPlans = () => {
    window.alert('Thanks! Matching health plans would load here next.');
  };

  /** Fixed CTA: open the same quote flow as the details panel, in a modal. */
  const handleViewPlansCta = () => {
    setActiveStep(1);
    setHealthQuotePopupOpen(true);
  };

  const closeHealthQuotePopup = () => {
    setHealthQuotePopupOpen(false);
  };

  const renderMemberSelectionBody = () => (
    <>
      <article className="health-member-card">
        <div className="health-member-head">
          <div className={`health-member-icon ${FAMILY_MEMBERS.self.colorClass}`} aria-hidden="true">
            {FAMILY_MEMBERS.self.icon}
          </div>
          <div className="health-member-content">
            <h3>{FAMILY_MEMBERS.self.label}</h3>
            <p>{FAMILY_MEMBERS.self.relation}</p>
          </div>
          <button
            type="button"
            className={`health-toggle${selfEnabled ? ' is-on' : ''}`}
            onClick={() => setSelfEnabled((prev) => !prev)}
            aria-label="Toggle self coverage"
            aria-pressed={selfEnabled}
          />
        </div>

        {selfEnabled && (
          <div className="health-member-meta">
            <div className="health-meta-group">
              <span className="health-meta-title">Gender</span>
              <div className="health-chip-row">
                {GENDER_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`health-chip${selfGender === option ? ' is-active' : ''}`}
                    onClick={() => setSelfGender(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <label className="health-age-field">
              <span>Age</span>
              {renderAgeInput(selfAge, setSelfAge, 'self age')}
            </label>
          </div>
        )}
      </article>

      <article className="health-member-card">
        <div className="health-member-head">
          <div className={`health-member-icon ${FAMILY_MEMBERS.spouse.colorClass}`} aria-hidden="true">
            {FAMILY_MEMBERS.spouse.icon}
          </div>
          <div className="health-member-content">
            <h3>{FAMILY_MEMBERS.spouse.label}</h3>
            <p>{FAMILY_MEMBERS.spouse.relation}</p>
          </div>
          <button
            type="button"
            className={`health-toggle${spouseEnabled ? ' is-on' : ''}`}
            onClick={() => setSpouseEnabled((prev) => !prev)}
            aria-label="Toggle spouse coverage"
            aria-pressed={spouseEnabled}
          />
        </div>

        {spouseEnabled && (
          <div className="health-member-meta">
            <div className="health-meta-group">
              <span className="health-meta-title">Gender</span>
              <div className="health-chip-row">
                {GENDER_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`health-chip${spouseGender === option ? ' is-active' : ''}`}
                    onClick={() => setSpouseGender(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <label className="health-age-field">
              <span>Age</span>
              {renderAgeInput(spouseAge, setSpouseAge, 'spouse age')}
            </label>
          </div>
        )}
      </article>

      <article className="health-member-card">
        <div className="health-member-head">
          <div className={`health-member-icon ${FAMILY_MEMBERS.children.colorClass}`} aria-hidden="true">
            {FAMILY_MEMBERS.children.icon}
          </div>
          <div className="health-member-content">
            <h3>{FAMILY_MEMBERS.children.label}</h3>
            <p>{childrenCountLabel}</p>
          </div>
          <div className="health-action-row">
            <button
              type="button"
              className={`health-add-btn${isDependentAtMax(children, 'Son') ? ' is-disabled' : ''}`}
              onClick={() => addChild('Son')}
              disabled={isDependentAtMax(children, 'Son')}
              title={isDependentAtMax(children, 'Son') ? 'Only 2 Sons allowed' : undefined}
            >
              + Son
            </button>
            <button
              type="button"
              className={`health-add-btn${isDependentAtMax(children, 'Daughter') ? ' is-disabled' : ''}`}
              onClick={() => addChild('Daughter')}
              disabled={isDependentAtMax(children, 'Daughter')}
              title={isDependentAtMax(children, 'Daughter') ? 'Only 2 Daughters allowed' : undefined}
            >
              + Daughter
            </button>
          </div>
        </div>

        {children.length > 0 && (
          <div className="health-dependent-list">
            {children.map((child) => (
              <div key={child.id} className="health-dependent-item">
                <span>{child.label}</span>
                <div className="health-dependent-age">
                  <span className="health-dependent-age-label">Age</span>
                  {renderAgeInput(
                    child.age,
                    (nextAge) => handleDependentAgeUpdate(children, setChildren, child.id, nextAge),
                    `${child.label} age`,
                    true
                  )}
                </div>
                <button
                  type="button"
                  className="health-remove-btn"
                  onClick={() => removeMember(children, setChildren, child.id)}
                  aria-label={`Remove ${child.label}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </article>

      <article className="health-member-card">
        <div className="health-member-head">
          <div className={`health-member-icon ${FAMILY_MEMBERS.parents.colorClass}`} aria-hidden="true">
            {FAMILY_MEMBERS.parents.icon}
          </div>
          <div className="health-member-content">
            <h3>{FAMILY_MEMBERS.parents.label}</h3>
            <p>{parentsCountLabel}</p>
          </div>
          <div className="health-action-row">
            <button
              type="button"
              className={`health-add-btn${isDependentAtMax(parents, 'Father') ? ' is-disabled' : ''}`}
              onClick={() => addParent('Father')}
              disabled={isDependentAtMax(parents, 'Father')}
              title={isDependentAtMax(parents, 'Father') ? 'Only 1 Father allowed' : undefined}
            >
              + Father
            </button>
            <button
              type="button"
              className={`health-add-btn${isDependentAtMax(parents, 'Mother') ? ' is-disabled' : ''}`}
              onClick={() => addParent('Mother')}
              disabled={isDependentAtMax(parents, 'Mother')}
              title={isDependentAtMax(parents, 'Mother') ? 'Only 1 Mother allowed' : undefined}
            >
              + Mother
            </button>
          </div>
        </div>

        {parents.length > 0 && (
          <div className="health-dependent-list">
            {parents.map((parent) => (
              <div key={parent.id} className="health-dependent-item">
                <span>{parent.label}</span>
                <div className="health-dependent-age">
                  <span className="health-dependent-age-label">Age</span>
                  {renderAgeInput(
                    parent.age,
                    (nextAge) => handleDependentAgeUpdate(parents, setParents, parent.id, nextAge),
                    `${parent.label} age`,
                    true
                  )}
                </div>
                <button
                  type="button"
                  className="health-remove-btn"
                  onClick={() => removeMember(parents, setParents, parent.id)}
                  aria-label={`Remove ${parent.label}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </article>
    </>
  );

  const renderQuoteSteps = (layout = 'page') => {
    const isModal = layout === 'modal';
    return (
    <>
      {activeStep === 1 && (
        <section
          className={`health-form-card${isModal ? ' health-form-card--modal-members' : ''}`}
          aria-label="Health insurance members form"
        >
          {!isModal && <h2>Who do you want to insure?</h2>}
          {isModal ? (
            <div className="health-modal-member-rows">{renderMemberSelectionBody()}</div>
          ) : (
            renderMemberSelectionBody()
          )}
          <button
            type="button"
            className={`health-continue-btn${isModal ? ' health-continue-btn--modal-primary' : ''}`}
            onClick={() => {
              setActiveStep(2);
              requestAnimationFrame(() => scrollQuoteIntoView());
            }}
          >
            Continue <span aria-hidden="true">→</span>
          </button>
        </section>
      )}

      {activeStep === 2 && (
        <section
          className={`health-contact-card${isModal ? ' health-surface--modal-no-heading' : ''}`}
          aria-label="Health insurance contact details form"
        >
          <div className="health-contact-header">
            <h2>Tell us about yourself</h2>
            <p>We&apos;ll use this to share your plan details</p>
          </div>

          {renderContactField('health-full-name', 'Full Name *', fullName, setFullName, 'is-blue', '👤', 'text', '', 'e.g. Ravi Kumar')}
          {renderContactField(
            'health-mobile',
            'Mobile Number *',
            mobileNumber,
            (value) => setMobileNumber(String(value ?? '').replace(/\D/g, '').slice(0, 10)),
            'is-teal',
            '📞',
            'tel',
            '',
            'e.g. 9876543210'
          )}
          <label className="health-contact-field" htmlFor="health-city">
            <span>City of Residence *</span>
            <CitySelect id="health-city" value={city} onChange={setCity} />
            <small>Used to show accurate plans and pricing</small>
          </label>
          <label className="health-contact-field" htmlFor="health-pin">
            <span>PIN code (optional)</span>
            <div className="health-contact-input-wrap">
              <span className="health-contact-icon is-sand" aria-hidden="true">
                #
              </span>
              <input
                id="health-pin"
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={6}
                placeholder="e.g. 500001"
                value={pinCode}
                onChange={(event) => setPinCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
              />
            </div>
            <small>Helps match nearby cashless hospitals and zone-specific pricing when available.</small>
          </label>
          {renderContactField(
            'health-email',
            'Email Address (optional)',
            email,
            setEmail,
            'is-violet',
            '✉',
            'email',
            '',
            'e.g. ravi.kumar@email.com'
          )}

          <div className="health-contact-actions">
            <button type="button" className="health-secondary-btn" onClick={() => setActiveStep(1)}>
              <span aria-hidden="true">‹</span> Back
            </button>
            <button type="button" className="health-continue-btn is-contact" onClick={handleContactContinue}>
              Continue <span aria-hidden="true">→</span>
            </button>
          </div>
        </section>
      )}

      {activeStep === 3 && (
        <section
          className={`health-info-card${isModal ? ' health-surface--modal-no-heading' : ''}`}
          aria-label="Health information"
        >
          <div className="health-info-header">
            <h2>Health Information</h2>
            <p>This helps us show accurate plans and pricing</p>
          </div>

          <ul className="health-condition-list">
            <li className="health-condition-row">
              <span className="health-condition-icon is-pink" aria-hidden="true">
                🩺
              </span>
              <span className="health-condition-name">Diabetes</span>
              <button
                type="button"
                className={`health-toggle${medicalConditions.diabetes ? ' is-on' : ''}`}
                onClick={() => toggleMedicalCondition('diabetes')}
                aria-label="Diabetes"
                aria-pressed={medicalConditions.diabetes}
              />
            </li>
            <li className="health-condition-row">
              <span className="health-condition-icon is-red" aria-hidden="true">
                📈
              </span>
              <span className="health-condition-name">High Blood Pressure</span>
              <button
                type="button"
                className={`health-toggle${medicalConditions.highBloodPressure ? ' is-on' : ''}`}
                onClick={() => toggleMedicalCondition('highBloodPressure')}
                aria-label="High Blood Pressure"
                aria-pressed={medicalConditions.highBloodPressure}
              />
            </li>
            <li className="health-condition-row">
              <span className="health-condition-icon is-sky" aria-hidden="true">
                🫁
              </span>
              <span className="health-condition-name">Asthma</span>
              <button
                type="button"
                className={`health-toggle${medicalConditions.asthma ? ' is-on' : ''}`}
                onClick={() => toggleMedicalCondition('asthma')}
                aria-label="Asthma"
                aria-pressed={medicalConditions.asthma}
              />
            </li>
            <li className="health-condition-row">
              <span className="health-condition-icon is-rose" aria-hidden="true">
                ❤️
              </span>
              <span className="health-condition-name">Heart Disease</span>
              <button
                type="button"
                className={`health-toggle${medicalConditions.heartDisease ? ' is-on' : ''}`}
                onClick={() => toggleMedicalCondition('heartDisease')}
                aria-label="Heart Disease"
                aria-pressed={medicalConditions.heartDisease}
              />
            </li>
            <li className="health-condition-row">
              <span className="health-condition-icon is-violet" aria-hidden="true">
                💊
              </span>
              <span className="health-condition-name">Thyroid</span>
              <button
                type="button"
                className={`health-toggle${medicalConditions.thyroid ? ' is-on' : ''}`}
                onClick={() => toggleMedicalCondition('thyroid')}
                aria-label="Thyroid"
                aria-pressed={medicalConditions.thyroid}
              />
            </li>
            <li className="health-condition-row">
              <span className="health-condition-icon is-orange" aria-hidden="true">
                ✂️
              </span>
              <span className="health-condition-name">Any past surgeries</span>
              <button
                type="button"
                className={`health-toggle${medicalConditions.pastSurgeries ? ' is-on' : ''}`}
                onClick={() => toggleMedicalCondition('pastSurgeries')}
                aria-label="Any past surgeries"
                aria-pressed={medicalConditions.pastSurgeries}
              />
            </li>
          </ul>

          <label className="health-other-condition" htmlFor="health-other-notes">
            <span>Any other medical condition (optional)</span>
            <div className="health-other-condition-wrap">
              <span className="health-other-condition-icon" aria-hidden="true">
                📄
              </span>
              <textarea
                id="health-other-notes"
                rows={4}
                placeholder="Mention any other conditions..."
                value={otherMedicalNotes}
                onChange={(e) => setOtherMedicalNotes(e.target.value)}
              />
            </div>
          </label>

          <div className="health-privacy-note" role="status">
            <span className="health-privacy-icon" aria-hidden="true">
              🔒
            </span>
            <p>Your information is secure and used only to personalize plans</p>
          </div>

          <div className="health-contact-actions health-info-actions">
            <button type="button" className="health-secondary-btn" onClick={() => setActiveStep(2)}>
              <span aria-hidden="true">‹</span> Back
            </button>
            <button type="button" className="health-view-plans-btn" onClick={handleViewHealthPlans}>
              <span className="health-view-plans-icon" aria-hidden="true">
                🛡️
              </span>
              View Health Plans
            </button>
          </div>
        </section>
      )}
    </>
    );
  };

  return (
    <main className="health-page page-section page-section--hero">
      <div className="health-split-layout">
        <aside className="health-hero-column" aria-label="Health insurance overview">
          <div className="health-hero-inner">
            <button type="button" className="health-hero-back" onClick={onBackHome}>
              ← Back to Home
            </button>

            <section
              id="health-section-hero"
              className="health-hero-block"
              data-page-section="hero"
              aria-labelledby="health-hero-heading"
            >
              <div className="health-hero-badge">
                <IconBadgeShield />
                Health Insurance
              </div>

              <h1 id="health-hero-heading" className="health-hero-heading">
                <span className="health-hero-heading-line">Protect Your Health,</span>
                <span className="health-hero-heading-line health-hero-heading-line--gradient">Protect Your Future</span>
              </h1>

              <div className="health-hero-figure">
                <img
                  src={healthHeroImage}
                  alt="Illustration of family health insurance coverage"
                  className="health-hero-image"
                  decoding="async"
                />
              </div>

              <p className="health-hero-tagline">Family health and insurance protection</p>

              <p className="health-hero-lede">
                Health insurance ensures you and your family are financially protected during medical emergencies. From
                hospitalization to treatments, it helps you focus on recovery instead of expenses.
              </p>

              <ul className="health-hero-feature-grid">
                {HERO_FEATURE_CARDS.map(({ id, title, iconWrapClass, iconSrc, iconAlt }) => (
                  <li key={id} className="health-hero-feature-card">
                    <span className={iconWrapClass} aria-hidden="true">
                      <HeroFeatureIcon src={iconSrc} alt={iconAlt} />
                    </span>
                    <span className="health-hero-feature-title">{title}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </aside>

        <div className="health-details-panel" id="health-quote-anchor">
          {!healthQuotePopupOpen ? (
            <section className="health-wrap">{renderQuoteSteps('page')}</section>
          ) : (
            <div className="health-details-panel-placeholder" aria-hidden="true" />
          )}
        </div>
      </div>

      <section className="health-about-section" aria-labelledby="health-about-heading">
        <div className="health-about-inner">
          <div className="health-about-copy">
            <span className="health-about-label">About</span>
            <h2 id="health-about-heading" className="health-about-title">
              What is Health Insurance?
            </h2>
            <p className="health-about-body">
              Health insurance is a policy that covers medical expenses such as hospitalization, treatments, and
              related healthcare costs. It provides financial support so you can access quality healthcare without
              worrying about high expenses.
            </p>
          </div>
          <div className="health-about-visual">
            <img
              src={healthAboutImage}
              alt="Doctor with clipboard representing quality healthcare coverage"
              className="health-about-image"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <section className="health-matters-section" aria-labelledby="health-matters-heading">
        <div className="health-matters-inner">
          <div className="health-matters-copy">
            <span className="health-about-label">Why It Matters</span>
            <h2 id="health-matters-heading" className="health-about-title">
              Why Do You Need Health Insurance?
            </h2>
            <p className="health-about-body">
              Medical costs can be unpredictable and expensive. Health insurance helps you manage these costs and
              ensures timely access to proper medical care when needed.
            </p>
          </div>
        </div>
      </section>

      <section className="health-benefits-section" aria-labelledby="health-benefits-heading">
        <h2 id="health-benefits-heading" className="health-visually-hidden">
          Key reasons to choose health insurance
        </h2>
        <div className="health-benefits-inner">
          <ul className="health-benefits-grid">
            {WHY_INSURANCE_BENEFITS.map(({ id, title, description, iconWrapClass, iconSrc, iconAlt }) => (
              <li key={id} className="health-benefits-card">
                <span className={iconWrapClass} aria-hidden="true">
                  <HeroFeatureIcon src={iconSrc} alt={iconAlt} />
                </span>
                <h3 className="health-benefits-title">{title}</h3>
                <p className="health-benefits-desc">{description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="health-types-section" aria-labelledby="health-types-heading">
        <div className="health-types-inner">
          <span className="health-types-kicker">Plans</span>
          <h2 id="health-types-heading" className="health-types-title">
            Types of Health Insurance
          </h2>
          <p className="health-types-subtitle">Choose a plan tailored to your needs.</p>
          <ul className="health-types-grid">
            {HEALTH_PLAN_TYPES.map(({ id, title, description, iconTone, iconSrc, iconAlt }) => (
              <li key={id} className="health-types-card">
                <div className={iconTone} aria-hidden="true">
                  <img src={iconSrc} alt={iconAlt} className="health-types-card-img" />
                </div>
                <div className="health-types-card-body">
                  <h3 className="health-types-card-title">{title}</h3>
                  <p className="health-types-card-desc">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="health-covered-section" aria-labelledby="health-covered-heading">
        <div className="health-covered-inner">
          <span className="health-covered-kicker">Inclusions</span>
          <h2 id="health-covered-heading" className="health-covered-title">
            {"What's Covered"}
          </h2>
          <p className="health-covered-subtitle">
            Comprehensive benefits across every step of your medical care.
          </p>
          <ul className="health-covered-grid">
            {HEALTH_COVERAGE_ITEMS.map(({ id, title, iconSrc, iconAlt }) => (
              <li key={id} className="health-covered-card">
                <span className="health-covered-card-icon" aria-hidden="true">
                  <img
                    src={iconSrc}
                    alt={iconAlt}
                    className="health-covered-icon-img"
                    width="32"
                    height="32"
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <span className="health-covered-card-title">{title}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="health-exclusions-section" aria-labelledby="health-exclusions-heading">
        <div className="health-exclusions-inner">
          <span className="health-exclusions-kicker">Exclusions</span>
          <h2 id="health-exclusions-heading" className="health-exclusions-title">
            {"What's Not Covered"}
          </h2>
          <p className="health-exclusions-subtitle">
            Common exclusions to be aware of before purchasing a plan.
          </p>
          <ul className="health-exclusions-grid">
            {HEALTH_EXCLUSION_ITEMS.map(({ id, title, iconSrc, iconAlt }) => (
              <li key={id} className="health-exclusions-card">
                <span className="health-exclusions-card-icon" aria-hidden="true">
                  <img
                    src={iconSrc}
                    alt={iconAlt}
                    className="health-exclusions-icon-img"
                    width="28"
                    height="28"
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <span className="health-exclusions-card-title">{title}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <InsuranceFaqAccordion
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about health insurance plans, coverage, and exclusions."
        items={healthInsuranceFaqItems}
      />

      <div className="health-fixed-cta" role="region" aria-label="Get health plan quotes">
        <div className="health-fixed-cta-inner">
          <div className="health-fixed-cta-copy">
            <span className="health-fixed-cta-icon-wrap" aria-hidden="true">
              <IconBadgeShield />
            </span>
            <div className="health-fixed-cta-text">
              <p className="health-fixed-cta-title">Get personalized health plans in just a few steps</p>
              <p className="health-fixed-cta-sub">
                Compare top insurers, cashless hospitals &amp; instant quotes
              </p>
            </div>
          </div>
          <button type="button" className="health-fixed-cta-btn" onClick={handleViewPlansCta}>
            View Plans <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      {healthQuoteModalMotion.visible ? (
        <div
          className={modalOverlayClass(healthQuoteModalMotion.closing, 'health-quote-popup-overlay')}
          role="dialog"
          aria-modal="true"
          aria-labelledby="health-quote-popup-title"
          onClick={closeHealthQuotePopup}
        >
          <div
            className={modalPanelClass(healthQuoteModalMotion.closing, 'health-quote-popup-shell')}
            onClick={(event) => event.stopPropagation()}
          >
            <header
              className={`health-quote-popup-header${
                activeStep === 1 ? ' health-quote-popup-header--step1' : ''
              }`}
            >
              {activeStep === 1 ? (
                <>
                  <h2 id="health-quote-popup-title" className="health-quote-popup-step-title">
                    Who do you want to insure?
                  </h2>
                  <button
                    type="button"
                    className="health-quote-popup-close"
                    onClick={closeHealthQuotePopup}
                    aria-label="Close quote form"
                  >
                    ×
                  </button>
                </>
              ) : (
                <>
                  <div className="health-quote-popup-heading-block">
                    {activeStep === 2 ? (
                      <>
                        <h2 id="health-quote-popup-title" className="health-quote-popup-title">
                          Tell us about yourself
                        </h2>
                        <p className="health-quote-popup-sub">We&apos;ll use this to share your plan details</p>
                      </>
                    ) : (
                      <>
                        <h2 id="health-quote-popup-title" className="health-quote-popup-title">
                          Health Information
                        </h2>
                        <p className="health-quote-popup-sub">This helps us show accurate plans and pricing</p>
                      </>
                    )}
                  </div>
                  <button
                    type="button"
                    className="health-quote-popup-close"
                    onClick={closeHealthQuotePopup}
                    aria-label="Close quote form"
                  >
                    ×
                  </button>
                </>
              )}
            </header>
            <div
              className={`health-quote-popup-body${activeStep === 1 ? ' health-quote-popup-body--step1' : ''}`}
            >
              <div className="health-details-panel health-details-panel--modal">
                <section className="health-wrap">{renderQuoteSteps('modal')}</section>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <Footer />
    </main>
  );
}

export default HealthHome;
