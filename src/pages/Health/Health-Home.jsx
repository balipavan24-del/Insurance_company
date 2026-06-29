import { useEffect, useMemo, useState } from 'react';
import Footer from '../../components/Footer/Footer';
import InsuranceFaqAccordion from '../../components/Faq/InsuranceFaqAccordion';
import { healthInsuranceFaqItems } from '../../data/productContent';
import { modalOverlayClass, modalPanelClass, useAnimatedModal } from '../../components/AnimatedModal/AnimatedModal';
import './Health-Home.css';

const healthImage = (name) => `${import.meta.env.BASE_URL}images/health/${name}`;
const healthHeroImage = healthImage('hero.webp');
const healthAboutImage = healthImage('About-Health.webp');
const healthMattersImage = healthImage('matters.webp');

const GENDER_OPTIONS = ['Male', 'Female'];

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

function IconTypeFamilyHouse() {
  return (
    <svg className="health-types-svg" viewBox="0 0 24 24" width="28" height="28" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M4.5 10.5 12 5l7.5 5.5"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 10.25V19a1 1 0 0 0 1 1h4v-6.25h2V20h4a1 1 0 0 0 1-1v-8.75"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 20v-5.25h4V20"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.75 12.5h2.5v2h-2.5z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconTypeSeniorPeople() {
  return (
    <svg className="health-types-svg" viewBox="0 0 24 24" width="28" height="28" fill="none" aria-hidden="true" focusable="false">
      <circle cx="8.5" cy="7.5" r="2.75" stroke="currentColor" strokeWidth="1.65" />
      <path
        d="M3.5 19.25v-.35c0-2.35 1.9-4.25 4.25-4.25h.5c1.35 0 2.55.65 3.3 1.65"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
      />
      <circle cx="16.5" cy="7.5" r="2.75" stroke="currentColor" strokeWidth="1.65" />
      <path
        d="M12.95 19.25v-.35c0-2.35 1.9-4.25 4.25-4.25h.8"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconTypeIndividualPlus() {
  return (
    <svg className="health-types-svg" viewBox="0 0 24 24" width="28" height="28" fill="none" aria-hidden="true" focusable="false">
      <circle cx="9.75" cy="8.25" r="3.15" stroke="currentColor" strokeWidth="1.65" />
      <path
        d="M4 20.25v-.6c0-2.65 2.15-4.8 4.8-4.8h.35c1.35 0 2.55.55 3.45 1.45"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
      />
      <rect x="13.75" y="4.75" width="7.5" height="7.5" rx="2" stroke="currentColor" strokeWidth="1.65" />
      <path d="M17.5 6.75v3.5M15.75 8.5h3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconTypeTopUpLayers() {
  return (
    <svg className="health-types-svg" viewBox="0 0 24 24" width="28" height="28" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M12 3.25 4.25 6.75 12 10.25l7.75-3.5L12 3.25z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <path
        d="M4.25 11.25 12 14.75l7.75-3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.25 15.25 12 18.75l7.75-3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.25 19.25 12 22.75l7.75-3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconTrendChart() {
  return (
    <svg
      className="health-benefits-svg health-benefits-svg--stroke"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 19V5" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" />
      <path d="M4 19h16" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" />
      <rect x="6" y="14" width="3.5" height="5" rx="0.75" stroke="currentColor" strokeWidth="1.65" />
      <rect x="11.25" y="11" width="3.5" height="8" rx="0.75" stroke="currentColor" strokeWidth="1.65" />
      <rect x="16.5" y="7" width="3.5" height="12" rx="0.75" stroke="currentColor" strokeWidth="1.65" />
      <path
        d="M5.5 16.5 10 13l3.5 2.5L20.5 8"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 8h3.5v3.5"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconEmergencySiren() {
  return (
    <svg
      className="health-benefits-svg health-benefits-svg--stroke"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2z" stroke="currentColor" strokeWidth="1.65" strokeLinejoin="round" />
      <path
        d="M6 9.5a6 6 0 0 1 12 0v4.75l2 2.25H4l2-2.25V9.5z"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinejoin="round"
      />
      <path d="M12 3v2M17.5 5l1.4-1.4M6.5 5 5.1 3.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 9v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconSmileCalm() {
  return (
    <svg
      className="health-benefits-svg health-benefits-svg--stroke"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.65" />
      <path
        d="M9 10.25h.01M15 10.25h.01"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <path
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        d="M8.25 14.5c1.15 2 3.15 3.25 5.35 3.25 2.2 0 4.2-1.25 5.35-3.25"
      />
    </svg>
  );
}

function IconWalletShield() {
  return (
    <svg
      className="health-benefits-svg health-benefits-svg--stroke"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 22s8-3.75 8-9.5V6.5l-8-3.25L4 6.5V12.5C4 18.25 12 22 12 22z"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinejoin="round"
      />
      <path
        d="M12 8.5v5M9.25 11.25h5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect x="3.5" y="12" width="7" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4" opacity="0.85" />
      <path d="M5.25 14.25h3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}

function IconShieldPlus() {
  return (
    <svg className="health-hero-feature-svg" viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M12 3 5 6v5.5c0 4.25 2.95 8.25 7 10l.35.15.35-.15c4.05-1.75 7-5.75 7-10V6l-7-3z"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinejoin="round"
      />
      <path d="M12 8.25v7.5M8.25 12h7.5" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" />
    </svg>
  );
}

function IconHospitalPlus() {
  return (
    <svg className="health-hero-feature-svg" viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M8.25 19.75V11h1.5V9h4.5v2h1.5v8.75h-7.5z"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinejoin="round"
      />
      <path d="M10.5 17.5v-2.25h3v2.25M10.5 13v-2h3v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11.5 5.5h1v2.5h-1V5.5zM16 7h1.75v1.5H16V7z" fill="currentColor" opacity="0.88" />
      <path d="M12 12.75v2.75M10.75 14.25h2.5" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  );
}

function IconHeadset() {
  return (
    <svg className="health-hero-feature-svg" viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M5.5 11.5v4.75a1.75 1.75 0 0 0 1.75 1.75H8"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
      />
      <path
        d="M18.5 11.5v4.75a1.75 1.75 0 0 1-1.75 1.75H16"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
      />
      <path
        d="M5.5 14.25h-1.5a1 1 0 0 1-1-1v-1a7.5 7.5 0 0 1 15 0v1a1 1 0 0 1-1 1H16"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8 14.5a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0zm10.5 0a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0z" fill="currentColor" />
    </svg>
  );
}

function IconFamilyHeart() {
  return (
    <svg className="health-hero-feature-svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 18.6c-.2 0-.45-.1-.65-.25C8.1 16.05 5.25 13.55 5.25 10.6c0-2.05 1.55-3.65 3.5-3.65 1.15 0 2.2.55 2.85 1.45.7-.9 1.75-1.45 2.9-1.45 1.95 0 3.5 1.6 3.5 3.65 0 2.95-2.85 5.45-5.9 7.75-.2.15-.45.25-.65.25z"
      />
    </svg>
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

function IconCovHospital() {
  return (
    <svg className="health-covered-svg" viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M5.5 20.25V6.75L12 3.75l6.5 3v13.5H5.5z"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinejoin="round"
      />
      <path d="M9.25 20.25v-5.5h5.5v5.5" stroke="currentColor" strokeWidth="1.65" strokeLinejoin="round" />
      <path d="M12 8.25v3.25M10.375 9.875h3.25" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" />
    </svg>
  );
}

function IconCovPrePost() {
  return (
    <svg className="health-covered-svg" viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M12 4.75v4.5c0 2.35 1.9 4.25 4.25 4.25h.5a2 2 0 0 1 0 4H15"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 10.5c1.1 0 2 .9 2 2v1.25c0 1.65 1.35 3 3 3h.75"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="18.75" r="2.25" stroke="currentColor" strokeWidth="1.65" />
      <path d="M16.5 6.5h2.25M17.625 5.375v2.25" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" />
    </svg>
  );
}

function IconCovDayCare() {
  return (
    <svg className="health-covered-svg" viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M3.5 12h3.25l2.1-5.25 3.35 10.5 2.15-5.25H20.5"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCovAmbulance() {
  return (
    <svg className="health-covered-svg" viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M4.5 16.25h14.75M4.5 16.25v-6.5h7.75l1.85 2.85H18.5v3.65"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8.25" cy="16.25" r="1.35" stroke="currentColor" strokeWidth="1.65" />
      <circle cx="16.75" cy="16.25" r="1.35" stroke="currentColor" strokeWidth="1.65" />
      <path d="M11.25 12.5h2.25v-2.1h-2.25v2.1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function IconCovSurgery() {
  return (
    <svg className="health-covered-svg" viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true" focusable="false">
      <circle cx="8" cy="7" r="2.35" stroke="currentColor" strokeWidth="1.65" />
      <circle cx="16" cy="7" r="2.35" stroke="currentColor" strokeWidth="1.65" />
      <path
        d="M9.35 8.85 12 12l2.65-3.15M9.35 15.15 12 12l2.65 3.15"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7.25 17.75h3.75M13 17.75h3.75" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" />
    </svg>
  );
}

function IconCovCritical() {
  return (
    <svg className="health-covered-svg" viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M12 20.35c-4.85-3.05-8.15-5.95-8.15-10.2a4.85 4.85 0 0 1 4.5-4.85 4.85 4.85 0 0 1 3.65 1.7 4.85 4.85 0 0 1 3.65-1.7 4.85 4.85 0 0 1 4.5 4.85c0 4.25-3.3 7.15-8.15 10.2z"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCovDiagnostic() {
  return (
    <svg className="health-covered-svg" viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true" focusable="false">
      <path d="M9.25 4.75h5.5l1.25 3.25h-8l1.25-3.25z" stroke="currentColor" strokeWidth="1.65" strokeLinejoin="round" />
      <path d="M12 8v2.75" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" />
      <path d="M8.5 13.5h7l-1.75 6.75h-3.5L8.5 13.5z" stroke="currentColor" strokeWidth="1.65" strokeLinejoin="round" />
      <circle cx="12" cy="11.75" r="1.5" stroke="currentColor" strokeWidth="1.65" />
      <path d="M10.25 17.5h3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function IconCovCashless() {
  return (
    <svg className="health-covered-svg" viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true" focusable="false">
      <rect x="3.5" y="6.5" width="17" height="11" rx="2" stroke="currentColor" strokeWidth="1.65" />
      <path d="M3.5 10.25h17" stroke="currentColor" strokeWidth="1.65" />
      <path d="M7 14.25h4.5M7 16h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}

function IconExclusionBan() {
  return (
    <svg className="health-exclusions-svg" viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.65" />
      <path d="M7.75 7.75l8.5 8.5" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" />
    </svg>
  );
}

const HEALTH_PLAN_TYPES = [
  {
    id: 'family',
    title: 'Family Health Insurance',
    description: 'Single policy covering your entire family with shared sum insured.',
    iconTone: 'health-types-card-icon is-type-family',
    Icon: IconTypeFamilyHouse,
  },
  {
    id: 'senior',
    title: 'Senior Citizen Health Insurance',
    description: 'Specialized coverage designed for parents and older adults.',
    iconTone: 'health-types-card-icon is-type-senior',
    Icon: IconTypeSeniorPeople,
  },
  {
    id: 'individual',
    title: 'Individual Health Insurance',
    description: 'Personal coverage with your own dedicated sum insured.',
    iconTone: 'health-types-card-icon is-type-individual',
    Icon: IconTypeIndividualPlus,
  },
  {
    id: 'topup',
    title: 'Top-Up Health Insurance',
    description: 'Affordable extra cover above your existing health policy.',
    iconTone: 'health-types-card-icon is-type-topup',
    Icon: IconTypeTopUpLayers,
  },
];

const WHY_INSURANCE_BENEFITS = [
  {
    id: 'costs',
    title: 'Rising Medical Costs',
    description: 'Stay ahead of inflation in healthcare expenses.',
    iconWrapClass: 'health-benefits-icon-wrap is-benefit-blue',
    Icon: IconTrendChart,
  },
  {
    id: 'emergency',
    title: 'Emergency Protection',
    description: 'Be ready for any unexpected medical event.',
    iconWrapClass: 'health-benefits-icon-wrap is-benefit-rose',
    Icon: IconEmergencySiren,
  },
  {
    id: 'peace',
    title: 'Peace of Mind',
    description: 'Focus on recovery, not bills, when it matters.',
    iconWrapClass: 'health-benefits-icon-wrap is-benefit-purple',
    Icon: IconSmileCalm,
  },
  {
    id: 'security',
    title: 'Financial Security',
    description: 'Protect your savings from medical emergencies.',
    iconWrapClass: 'health-benefits-icon-wrap is-benefit-fuchsia',
    Icon: IconWalletShield,
  },
];

const HERO_FEATURE_CARDS = [
  {
    id: 'coverage',
    title: 'Comprehensive Coverage',
    iconWrapClass: 'health-hero-feature-icon-wrap is-sky',
    Icon: IconShieldPlus,
  },
  {
    id: 'cashless',
    title: 'Cashless Hospitals',
    iconWrapClass: 'health-hero-feature-icon-wrap is-violet',
    Icon: IconHospitalPlus,
  },
  {
    id: 'claims',
    title: 'Quick Claim Support',
    iconWrapClass: 'health-hero-feature-icon-wrap is-rose',
    Icon: IconHeadset,
  },
  {
    id: 'family',
    title: 'Family Protection',
    iconWrapClass: 'health-hero-feature-icon-wrap is-lilac',
    Icon: IconFamilyHeart,
  },
];

const HEALTH_COVERAGE_ITEMS = [
  { id: 'hospital', title: 'Hospitalization Expenses', Icon: IconCovHospital },
  { id: 'prepost', title: 'Pre & Post Hospitalization', Icon: IconCovPrePost },
  { id: 'daycare', title: 'Day-Care Procedures', Icon: IconCovDayCare },
  { id: 'ambulance', title: 'Ambulance Charges', Icon: IconCovAmbulance },
  { id: 'surgery', title: 'Surgeries & Treatments', Icon: IconCovSurgery },
  { id: 'critical', title: 'Critical Illness Coverage', Icon: IconCovCritical },
  { id: 'diagnostic', title: 'Diagnostic Tests', Icon: IconCovDiagnostic },
  { id: 'cashless', title: 'Cashless Treatment', Icon: IconCovCashless },
];

const HEALTH_EXCLUSION_ITEMS = [
  { id: 'preexisting', title: 'Pre-existing diseases (waiting period)', Icon: IconExclusionBan },
  { id: 'nonmedical', title: 'Non-medical expenses', Icon: IconExclusionBan },
  { id: 'cosmetic', title: 'Cosmetic treatments', Icon: IconExclusionBan },
  { id: 'selfharm', title: 'Self-inflicted injuries', Icon: IconExclusionBan },
  { id: 'experimental', title: 'Experimental treatments', Icon: IconExclusionBan },
  { id: 'dentalvision', title: 'Dental/vision (non-accidental)', Icon: IconExclusionBan },
  { id: 'maternity', title: 'Maternity (waiting period)', Icon: IconExclusionBan },
  { id: 'substance', title: 'Substance abuse', Icon: IconExclusionBan },
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
  const [fullName, setFullName] = useState('vicky');
  const [mobileNumber, setMobileNumber] = useState('6304305534');
  const [city, setCity] = useState('Hyderabad');
  const [pinCode, setPinCode] = useState('');
  const [email, setEmail] = useState('you@example.com');
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
    const nextIndex = children.filter((member) => member.label.toLowerCase() === key).length + 1;
    setChildren((prev) => [...prev, { id: `child-${key}-${nextIndex}`, label, age: '0' }]);
  };

  const addParent = (label) => {
    const key = label.toLowerCase();
    const nextIndex = parents.filter((member) => member.label.toLowerCase() === key).length + 1;
    setParents((prev) => [...prev, { id: `parent-${key}-${nextIndex}`, label, age: '0' }]);
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
    helperText = ''
  ) => (
    <label className="health-contact-field" htmlFor={id}>
      <span>
        {label}
      </span>
      <div className="health-contact-input-wrap">
        <span className={`health-contact-icon ${iconClass}`} aria-hidden="true">
          {icon}
        </span>
        <input id={id} type={type} value={value} onChange={(event) => setValue(event.target.value)} />
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
            <button type="button" className="health-add-btn" onClick={() => addChild('Son')}>+ Son</button>
            <button type="button" className="health-add-btn" onClick={() => addChild('Daughter')}>+ Daughter</button>
          </div>
        </div>

        {children.length > 0 && (
          <div className="health-dependent-list">
            {children.map((child) => (
              <div key={child.id} className="health-dependent-item">
                <span>{child.label}</span>
                {renderAgeInput(
                  child.age,
                  (nextAge) => handleDependentAgeUpdate(children, setChildren, child.id, nextAge),
                  `${child.label} age`,
                  true
                )}
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
            <button type="button" className="health-add-btn" onClick={() => addParent('Father')}>+ Father</button>
            <button type="button" className="health-add-btn" onClick={() => addParent('Mother')}>+ Mother</button>
          </div>
        </div>

        {parents.length > 0 && (
          <div className="health-dependent-list">
            {parents.map((parent) => (
              <div key={parent.id} className="health-dependent-item">
                <span>{parent.label}</span>
                {renderAgeInput(
                  parent.age,
                  (nextAge) => handleDependentAgeUpdate(parents, setParents, parent.id, nextAge),
                  `${parent.label} age`,
                  true
                )}
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

          {renderContactField('health-full-name', 'Full Name *', fullName, setFullName, 'is-blue', '👤')}
          {renderContactField(
            'health-mobile',
            'Mobile Number *',
            mobileNumber,
            (value) => setMobileNumber(String(value ?? '').replace(/\D/g, '').slice(0, 10)),
            'is-teal',
            '📞',
            'tel'
          )}
          {renderContactField(
            'health-city',
            'City of Residence *',
            city,
            setCity,
            'is-mint',
            '📍',
            'text',
            'Used to show accurate plans and pricing'
          )}
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
            'email'
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
                {HERO_FEATURE_CARDS.map(({ id, title, iconWrapClass, Icon }) => (
                  <li key={id} className="health-hero-feature-card">
                    <span className={iconWrapClass} aria-hidden="true">
                      <Icon />
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
          <div className="health-matters-visual">
            <img
              src={healthMattersImage}
              alt="Healthcare professional supporting a patient in a hospital setting"
              className="health-matters-image"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <section className="health-benefits-section" aria-labelledby="health-benefits-heading">
        <h2 id="health-benefits-heading" className="health-visually-hidden">
          Key reasons to choose health insurance
        </h2>
        <div className="health-benefits-inner">
          <ul className="health-benefits-grid">
            {WHY_INSURANCE_BENEFITS.map(({ id, title, description, iconWrapClass, Icon }) => (
              <li key={id} className="health-benefits-card">
                <span className={iconWrapClass} aria-hidden="true">
                  <Icon />
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
            {HEALTH_PLAN_TYPES.map(({ id, title, description, iconTone, Icon }) => (
              <li key={id} className="health-types-card">
                <div className={iconTone} aria-hidden="true">
                  <Icon />
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
            {HEALTH_COVERAGE_ITEMS.map(({ id, title, Icon }) => (
              <li key={id} className="health-covered-card">
                <span className="health-covered-card-icon" aria-hidden="true">
                  <Icon />
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
            {HEALTH_EXCLUSION_ITEMS.map(({ id, title, Icon }) => (
              <li key={id} className="health-exclusions-card">
                <span className="health-exclusions-card-icon" aria-hidden="true">
                  <Icon />
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
