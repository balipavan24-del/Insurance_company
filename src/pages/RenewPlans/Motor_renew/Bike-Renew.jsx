import { useState } from 'react';
import { Link } from 'react-router-dom';
import DropdownChevron from '../../../components/Dropdown/DropdownChevron';
import InsuranceFaqAccordion from '../../../components/Faq/InsuranceFaqAccordion';
import ContactHumanModal from '../../../components/ContactHumanModal/ContactHumanModal';
import AnimatedModal from '../../../components/AnimatedModal/AnimatedModal';
import Footer from '../../../components/Footer/Footer';
import WithoutNumber from '../../Motor/Withoutnumber/WithoutNumber';
import { bikeRenewFaqItems, bikeRenewFaqSection, bikeRenewSupportCard } from '../../../data/productContent';
import bikeRenewHeroImage from '../../../assets/images/bike-renew-hero.png';
import renewStepEnterDetails from '../../../assets/images/renew-process/enter-vehicle-details.png';
import renewStepComparePlans from '../../../assets/images/renew-process/compare-renewal-plans.png';
import renewStepSelectAddons from '../../../assets/images/renew-process/select-addons.png';
import renewStepSecurePayment from '../../../assets/images/renew-process/make-secure-payment.png';
import renewStepReceivePolicy from '../../../assets/images/renew-process/receive-policy-instantly.png';
import renewWhyUsInstantRenewal from '../../../assets/images/renew-why-us/instant-policy-renewal.png';
import renewWhyUsBestPrice from '../../../assets/images/renew-why-us/best-price-comparison.png';
import renewWhyUsTrustedPartners from '../../../assets/images/renew-why-us/trusted-insurance-partners.png';
import renewWhyUsClaimSupport from '../../../assets/images/renew-why-us/claim-assistance-support.png';
import renewWhyUsSecurePayments from '../../../assets/images/renew-why-us/secure-payments.png';
import renewWhyUsExpertGuidance from '../../../assets/images/renew-why-us/expert-guidance.png';
import renewPlanTypeComprehensive from '../../../assets/images/renew-plan-types/comprehensive-insurance.png';
import renewPlanTypeThirdParty from '../../../assets/images/renew-plan-types/third-party-insurance.png';
import renewPlanTypeOwnDamage from '../../../assets/images/renew-plan-types/own-damage-cover.png';
import continuousCoverage from '../../../assets/images/renew-benefits/continuous-coverage.png';
import retainNcb from '../../../assets/images/renew-benefits/retain-ncb.png';
import avoidInspectionDelays from '../../../assets/images/renew-benefits/avoid-inspection-delays.png';
import legalCompliance from '../../../assets/images/renew-benefits/legal-compliance.png';
import saveMoney from '../../../assets/images/renew-benefits/save-money.png';
import peaceOfMind from '../../../assets/images/renew-benefits/peace-of-mind.png';
import { Validnumber } from '../../Motor/MotorHome/vehicleNumberValidation';
import Renew from './Renew_Details/Renew';
import coverageAccidentalDamage from '../../../assets/images/renew-coverage/accidental-damage.png';
import coverageTheftProtection from '../../../assets/images/renew-coverage/theft-protection.png';
import coverageFireDamage from '../../../assets/images/renew-coverage/fire-damage.png';
import coverageNaturalDisasters from '../../../assets/images/renew-coverage/natural-disasters.png';
import coverageThirdParty from '../../../assets/images/renew-coverage/third-party-liability.png';
import coveragePersonalAccident from '../../../assets/images/renew-coverage/personal-accident-cover.png';
import addonZeroDepreciation from '../../../assets/images/renew-addons/zero-depreciation.png';
import addonPersonalAccident from '../../../assets/images/renew-addons/personal-accident-cover.png';
import addonRoadsideAssistance from '../../../assets/images/renew-addons/roadside-assistance.png';
import addonReturnToInvoice from '../../../assets/images/renew-addons/return-to-invoice.png';
import addonConsumables from '../../../assets/images/renew-addons/consumables-cover.png';
import './Car-Renew.css';

const RENEW_HIGHLIGHTS = [
  { id: 'instant-renewal', label: 'Instant Renewal', icon: 'bolt' },
  { id: 'network-garages', label: 'Network Garages', icon: 'wrench' },
  { id: 'quick-claims', label: 'Quick Claims', icon: 'clipboard' },
  { id: 'zero-paperwork', label: 'Zero Paperwork', icon: 'sparkle' },
];

const RENEW_BENEFITS = [
  {
    id: 'continuous-coverage',
    title: 'Continuous Coverage',
    description: 'Avoid coverage gaps and stay financially protected on every ride.',
    image: continuousCoverage,
  },
  {
    id: 'retain-ncb',
    title: 'Retain No Claim Bonus',
    description: 'Keep your accumulated NCB discounts during timely renewals.',
    image: retainNcb,
  },
  {
    id: 'inspection-delays',
    title: 'Avoid Inspection Delays',
    description: 'Expired policies may require bike inspections before activation.',
    image: avoidInspectionDelays,
  },
  {
    id: 'legal-compliance',
    title: 'Legal Compliance',
    description: 'Third-party insurance is mandatory for two-wheeler owners.',
    image: legalCompliance,
  },
  {
    id: 'save-money',
    title: 'Save Money',
    description: 'Timely renewals help avoid penalties and higher premiums.',
    image: saveMoney,
  },
  {
    id: 'peace-of-mind',
    title: 'Peace of Mind',
    description: 'Ride confidently knowing your bike remains protected.',
    image: peaceOfMind,
  },
];

const RENEW_COVERED_ITEMS = [
  { id: 'accidental-damage', title: 'Accidental Damage', image: coverageAccidentalDamage },
  { id: 'theft-protection', title: 'Theft Protection', image: coverageTheftProtection },
  { id: 'fire-damage', title: 'Fire Damage', image: coverageFireDamage },
  { id: 'natural-disasters', title: 'Natural Disasters', image: coverageNaturalDisasters },
  { id: 'third-party', title: 'Third Party Liability', image: coverageThirdParty },
  { id: 'personal-accident', title: 'Personal Accident Cover', image: coveragePersonalAccident },
];

const RENEW_EXCLUSION_ITEMS = [
  {
    id: 'drunk-driving',
    title: 'Drunk driving',
    description: 'Claims arising while driving under the influence of alcohol or drugs are not covered.',
  },
  {
    id: 'invalid-license',
    title: 'Driving without valid license',
    description: 'Incidents where the driver does not hold a valid licence at the time of the accident are excluded.',
  },
  {
    id: 'wear-tear',
    title: 'Mechanical wear and tear',
    description: 'Normal ageing, rust, corrosion, and mechanical breakdown from regular use are not covered.',
  },
  {
    id: 'consequential',
    title: 'Consequential damages',
    description: 'Indirect or follow-on losses that result from an already excluded event are not payable.',
  },
  {
    id: 'illegal-racing',
    title: 'Illegal racing',
    description: 'Damage from speed contests, racing, stunts, or reckless driving is excluded from cover.',
  },
];

const RENEW_ADDONS = [
  {
    id: 'zero-depreciation',
    title: 'Zero Depreciation Cover',
    description: 'Get full claim value without depreciation cuts on parts.',
    image: addonZeroDepreciation,
  },
  {
    id: 'personal-accident',
    title: 'Personal Accident Cover',
    description: 'Financial protection for the owner-driver against accidental injury or death.',
    image: addonPersonalAccident,
  },
  {
    id: 'roadside-assistance',
    title: 'Roadside Assistance',
    description: '24x7 on-road help for breakdowns, towing and more.',
    image: addonRoadsideAssistance,
  },
  {
    id: 'return-to-invoice',
    title: 'Return to Invoice',
    description: 'Get the original invoice value in case of total loss or theft.',
    image: addonReturnToInvoice,
  },
  {
    id: 'consumables',
    title: 'Consumables Cover',
    description: 'Reimbursement for nuts, bolts, oils and other consumables.',
    image: addonConsumables,
  },
];

const RENEW_WHY_US = [
  {
    id: 'instant-renewal',
    title: 'Instant Policy Renewal',
    description: 'Renew in minutes with zero hassle.',
    image: renewWhyUsInstantRenewal,
    imageAlt: 'Instant policy renewal',
  },
  {
    id: 'price-comparison',
    title: 'Best Price Comparison',
    description: 'Compare quotes from top insurers side by side.',
    image: renewWhyUsBestPrice,
    imageAlt: 'Best price comparison',
  },
  {
    id: 'trusted-partners',
    title: 'Trusted Insurance Partners',
    description: "Tie-ups with India's most reliable insurers.",
    image: renewWhyUsTrustedPartners,
    imageAlt: 'Trusted insurance partners',
  },
  {
    id: 'claim-support',
    title: 'Claim Assistance Support',
    description: 'Dedicated support from filing to settlement.',
    image: renewWhyUsClaimSupport,
    imageAlt: 'Claim assistance support',
  },
  {
    id: 'secure-payments',
    title: 'Secure Payments',
    description: 'Bank-grade encryption on every transaction.',
    image: renewWhyUsSecurePayments,
    imageAlt: 'Secure payments',
  },
  {
    id: 'expert-guidance',
    title: 'Expert Guidance',
    description: 'Talk to certified advisors anytime you need.',
    image: renewWhyUsExpertGuidance,
    imageAlt: 'Expert guidance',
  },
];

const RENEW_STEPS = [
  {
    id: 'enter-details',
    step: 1,
    title: 'Enter Vehicle Details',
    description: 'Share your bike number and basic info.',
    image: renewStepEnterDetails,
    imageAlt: 'Enter vehicle details',
  },
  {
    id: 'compare-plans',
    step: 2,
    title: 'Compare Renewal Plans',
    description: 'Browse plans from top trusted insurers.',
    image: renewStepComparePlans,
    imageAlt: 'Compare renewal plans',
  },
  {
    id: 'select-addons',
    step: 3,
    title: 'Select Add-ons',
    description: 'Pick the right cover and customise add-ons.',
    image: renewStepSelectAddons,
    imageAlt: 'Select add-ons',
  },
  {
    id: 'secure-payment',
    step: 4,
    title: 'Make Secure Payment',
    description: 'Pay securely using your preferred method.',
    image: renewStepSecurePayment,
    imageAlt: 'Make secure payment',
  },
  {
    id: 'receive-policy',
    step: 5,
    title: 'Receive Policy Instantly',
    description: 'Get your renewed policy in your inbox.',
    image: renewStepReceivePolicy,
    imageAlt: 'Receive policy instantly',
  },
];

const RENEW_PRICING_FACTORS = [
  { id: 'vehicle-age', label: 'Vehicle age', icon: 'calendar' },
  { id: 'bike-model', label: 'Bike model', icon: 'car' },
  { id: 'city-location', label: 'City / location', icon: 'location' },
  { id: 'claim-history', label: 'Claim history', icon: 'history' },
  { id: 'addons-selected', label: 'Add-ons selected', icon: 'layers' },
  { id: 'idv-value', label: 'IDV value', icon: 'rupee' },
];

const RENEW_PLAN_TYPES = [
  {
    id: 'comprehensive',
    title: 'Comprehensive Insurance',
    description: 'Covers own damage and third-party liabilities.',
    tone: 'blue',
    image: renewPlanTypeComprehensive,
    imageAlt: 'Comprehensive insurance',
  },
  {
    id: 'third-party',
    title: 'Third Party Insurance',
    description: 'Mandatory legal liability coverage.',
    tone: 'pink',
    image: renewPlanTypeThirdParty,
    imageAlt: 'Third party insurance',
  },
  {
    id: 'own-damage',
    title: 'Own Damage Cover',
    description: 'Protects your own bike against damages.',
    tone: 'amber',
    image: renewPlanTypeOwnDamage,
    imageAlt: 'Own damage cover',
  },
];

function RenewHighlightIcon({ name }) {
  if (name === 'wrench') {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
        <path d="m14.7 7.9 1.4-1.4a3 3 0 1 0-4.2-4.2l-1.4 1.4 4.2 4.2ZM3.2 20.8l5.6-1.4 7.4-7.4-4.2-4.2-7.4 7.4-1.4 5.6Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === 'clipboard') {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
        <path d="M9 4h6M10 2h4v3h-4zM7 5h10a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === 'sparkle') {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
        <path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Zm6.5 9.5.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
      <path d="M11 2 5.3 12H11l-1 10 8.7-12H13l1-8Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RenewBenefitIcon({ name }) {
  const icons = {
    award: (
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <circle cx="12" cy="8.5" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8.8 12.3 7 21l5-2.6 5 2.6-1.8-8.7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    clock: (
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 8v4l2.8 2.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    scale: (
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path d="M12 4v14M7 7h10M6 20h12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="m7 7-2.3 4h4.6L7 7Zm10 0-2.3 4h4.6L17 7Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
    wallet: (
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H19v14H6.5A2.5 2.5 0 0 1 4 16.5v-9Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M19 10h-4a1.5 1.5 0 0 0 0 3h4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
    smile: (
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="9" cy="10" r="1" fill="currentColor" />
        <circle cx="15" cy="10" r="1" fill="currentColor" />
        <path d="M8.5 14c.8 1.2 2 1.8 3.5 1.8s2.7-.6 3.5-1.8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  };

  const defaultIcon = (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path d="M12 3 5 6.5v5c0 4.1 2.8 7.3 7 8.5 4.2-1.2 7-4.4 7-8.5v-5L12 3Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="m9.2 11.8 1.9 1.9 3.6-3.8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return icons[name] || defaultIcon;
}

function RenewPricingIcon({ name }) {
  const props = { viewBox: '0 0 24 24', width: 22, height: 22, 'aria-hidden': true, focusable: 'false' };
  if (name === 'calendar') {
    return (
      <svg {...props}>
        <rect x="4" y="5.5" width="16" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.75" />
        <path d="M8 4v3M16 4v3M4 10h16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === 'location') {
    return (
      <svg {...props}>
        <path
          d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="11" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.75" />
      </svg>
    );
  }
  if (name === 'history') {
    return (
      <svg {...props}>
        <path d="M12 8v4l2.5 2" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M7.5 7.5A6.5 6.5 0 1 1 12 18.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <path d="M7 4.5V7.5H10" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === 'layers') {
    return (
      <svg {...props}>
        <path d="M12 4 4 8l8 4 8-4-8-4Z" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
        <path d="M4 12l8 4 8-4M4 16l8 4 8-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === 'rupee') {
    return (
      <svg {...props}>
        <path
          d="M9 5h8M9 9h6.5a3.5 3.5 0 0 1 0 7H8M8 19V5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <path
        d="M5 16l2-5h10l2 5M7 11l1.2-3h7.6L17 11"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="17" r="1.4" fill="currentColor" />
      <circle cx="16" cy="17" r="1.4" fill="currentColor" />
    </svg>
  );
}

function RenewCoverageIcon({ name }) {
  const props = { viewBox: '0 0 24 24', width: 22, height: 22, 'aria-hidden': true, focusable: 'false' };
  if (name === 'lock') {
    return (
      <svg {...props}>
        <rect x="5" y="11" width="14" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.75" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === 'flame') {
    return (
      <svg {...props}>
        <path
          d="M12 3c1.2 2.4 3.8 3.4 3.8 6.6 0 1.6-.7 2.9-1.8 3.8 1.4.5 2.5 1.9 2.5 3.6 0 2.2-1.8 4-4 4s-4-1.8-4-4c0-1.7 1.1-3.1 2.5-3.6-1.1-.9-1.8-2.2-1.8-3.8C8.2 6.4 10.8 5.4 12 3Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (name === 'storm') {
    return (
      <svg {...props}>
        <path d="M7 14h8l-1.5 3H9.5L7 14Z" fill="currentColor" opacity="0.9" />
        <path
          d="M6.5 12.5A4.5 4.5 0 0 1 11 8h1.2a3.8 3.8 0 0 1 3.6 2.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <path d="M13 6l-1 2.5M17 7l-1.2 2.2" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === 'person-shield') {
    return (
      <svg {...props}>
        <circle cx="9.5" cy="8.5" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.75" />
        <path d="M5 19c0-2.8 2-4.5 4.5-4.5S14 16.2 14 19" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        <path d="M16 6.5v4.8c0 2.2 1.6 3.8 3 4.7V6.5l-3-1.5-3 1.5Z" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === 'heart-pulse') {
    return (
      <svg {...props}>
        <path
          d="M12 20s-6.2-3.8-6.2-8.2C5.8 9 7.6 7 9.8 7c1.3 0 2.2.7 2.2.7s.9-.7 2.2-.7c2.2 0 4 2 4 4.8C18.2 16.2 12 20 12 20Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path d="M8 12h2l1-2 2 4 1-2h2" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <path
        d="M5 16l2-5h10l2 5M7 11l1.2-3h7.6L17 11"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="17" r="1.4" fill="currentColor" />
      <circle cx="16" cy="17" r="1.4" fill="currentColor" />
    </svg>
  );
}

function BikeRenew() {
  const [openExclusionId, setOpenExclusionId] = useState('');
  const [isWithoutBikeNumberOpen, setIsWithoutBikeNumberOpen] = useState(false);
  const [isTalkToHumanOpen, setIsTalkToHumanOpen] = useState(false);
  const [vechileNumber, setVechileNumber] = useState('');
  const [isRenewOpen, setIsRenewOpen] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);

  const scrollToRenewForm = () => {
    const formCard = document.getElementById('bike-renew-form');
    formCard?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const input = document.getElementById('bike-reg-no');
    if (input instanceof HTMLInputElement) {
      window.setTimeout(() => input.focus(), 400);
    }
  };
  const inputHandler = (event) => {
    setVechileNumber(event.target.value.toUpperCase());
  };
  const continueHandler = (event) => {
    event.preventDefault();
    const entered = vechileNumber.trim().toUpperCase();

    if (!Validnumber(entered)) {
      setVechileNumber(entered);
      setIsRenewOpen(false);
      console.log(`Invalid vehicle number:${entered}`);
      window.alert(`Invalid vehicle number: ${entered}`);
      return;
    }

    setIsFormLoading(true);
    window.setTimeout(() => {
      setVechileNumber(entered);
      console.log(`Valid vehicle number:${entered}`);
      setIsRenewOpen(true);
      setIsFormLoading(false);
    }, 700);
  };

  return (
    <div className="renew-page renew-page--bike">
      <div className="renew-pop-content">
        <Renew
          open={isRenewOpen}
          onClose={() => setIsRenewOpen(false)}
          vechileNumber={vechileNumber}
        />
      </div>
      <section className="car-renew-hero page-section page-section--regular page-section-container" aria-labelledby="bike-renew-heading">
        <div className="car-renew-hero__layout">
          <div className="car-renew-hero__content">
            <Link className="car-renew-hero__back-link" to="/">
              ← Back to Home
            </Link>
            <span className="car-renew-hero__tag">Bike Insurance Renewal</span>
            <h1 id="bike-renew-heading" className="car-renew-hero__title">
              <span className="car-renew-hero__title-line">Renew Your Bike Insurance</span>
              <span className="car-renew-hero__title-line car-renew-hero__title-line--gradient">in Minutes</span>
            </h1>
            <div className="car-renew-hero__visual">
              <img
                src={bikeRenewHeroImage}
                alt="Bike insurance protection overview"
                className="car-renew-hero__visual-img"
                loading="lazy"
              />
            </div>

          </div>

          <aside id="bike-renew-form" className="car-renew-form-card" aria-label="Bike renewal form">
            <span className="car-renew-form-card__chip">Renew in under 2 minutes</span>
            <h2 className="car-renew-form-card__title">Renew Your Bike Insurance</h2>
            <p className="car-renew-form-card__copy">
              Enter your registration number to get instant renewal quotes.
            </p>

            <form onSubmit={continueHandler}>
              <label className="car-renew-form-card__label" htmlFor="bike-reg-no">
                Bike Registration Number
              </label>
              <input
                id="bike-reg-no"
                className="car-renew-form-card__input"
                type="text"
                placeholder="e.g. MH12AB1234"
                aria-label="Bike registration number"
                name="VechileNumber"
                value={vechileNumber}
                onChange={inputHandler}
              />

              <button
                type="submit"
                className="car-renew-form-card__primary-btn"
                disabled={isFormLoading}
              >
                {isFormLoading ? 'Looking up...' : 'Continue →'}
              </button>
              <p
                style={{ fontSize: '0.800rem', color: '#666', marginTop: '0.5rem', gap: '2px', display: 'flex', alignItems: 'center', padding: '5px' }}
              >
                try: AP09AB1234, AP09AB1235, AP09AB1236
              </p>
            </form>
            <p className="car-renew-form-card__divider">OR</p>

            <button
              type="button"
              className="car-renew-form-card__secondary-btn"
              onClick={() => setIsWithoutBikeNumberOpen(true)}
            >
              Continue Without Bike Number
            </button>

            <ul className="car-renew-form-card__stats" aria-label="Renewal speed and trust indicators">
              <li>
                <strong>2 min</strong>
                <span>Quick</span>
              </li>
              <li>
                <strong>20+</strong>
                <span>Insurers</span>
              </li>
              <li>
                <strong>100%</strong>
                <span>Secure</span>
              </li>
            </ul>

            <ul className="car-renew-form-card__highlights" aria-label="Bike renewal highlights">
              {RENEW_HIGHLIGHTS.map((item) => (
                <li key={item.id}>
                  <span className="car-renew-form-card__highlight-icon" aria-hidden="true">
                    <RenewHighlightIcon name={item.icon} />
                  </span>
                  {item.label}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="car-renew-overview page-section page-section--regular page-section-container" aria-labelledby="car-renew-overview-heading">
        <div className="car-renew-overview__layout">
          <div className="car-renew-overview__content">
            <p className="car-renew-overview__eyebrow">
              <span aria-hidden="true" className="car-renew-overview__eyebrow-line" />
              Overview
            </p>
            <h2 id="car-renew-overview-heading" className="car-renew-overview__title">
              <span className="car-renew-overview__title-line">
                What is Bike <span className="car-renew-overview__title-accent">Insurance</span>
              </span>
              <span className="car-renew-overview__title-line">
                <span className="car-renew-overview__title-accent">Renewal?</span>
              </span>
            </h2>
          </div>
          <article className="car-renew-overview__card">
            Bike insurance renewal is the process of extending your existing two-wheeler insurance policy
            before or after its expiry date to maintain uninterrupted financial protection for your bike.
            Renewing your policy on time helps you continue enjoying coverage against accidents, theft,
            damages, third-party liabilities, and unexpected repair expenses.
          </article>
        </div>
      </section>

      <section className="car-renew-benefits page-section page-section--regular page-section-container" aria-labelledby="car-renew-benefits-heading">
        <div className="car-renew-benefits__inner">
          <p className="car-renew-benefits__eyebrow">
            <span className="car-renew-benefits__eyebrow-line" aria-hidden="true" />
            Benefits
            <span className="car-renew-benefits__eyebrow-line" aria-hidden="true" />
          </p>
          <h2 id="car-renew-benefits-heading" className="car-renew-benefits__title">
            <span className="car-renew-benefits__title-line">
              Why Should You Renew Your Bike
            </span>
            <span className="car-renew-benefits__title-line">
              <span className="car-renew-benefits__title-accent">Insurance on Time?</span>
            </span>
          </h2>
          <p className="car-renew-benefits__subtitle">
            Timely renewal protects your wallet, your bike, and your peace of mind.
          </p>

          <ul className="car-renew-benefits__grid">
            {RENEW_BENEFITS.map((item, index) => (
              <li key={item.id}>
                <article className="car-renew-benefit-card">
                  <span className="car-renew-benefit-card__blob" aria-hidden="true" />
                  <span className="car-renew-benefit-card__icon car-renew-benefit-card__icon--image" aria-hidden="true">
                    <img
                      src={item.image}
                      alt=""
                      className="car-renew-benefit-card__icon-img"
                      loading="lazy"
                      width={53}
                      height={53}
                    />
                  </span>
                  <span className="car-renew-benefit-card__index">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="car-renew-benefit-card__title">{item.title}</h3>
                  <p className="car-renew-benefit-card__text">{item.description}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="car-renew-plan-types page-section page-section--regular page-section-container" aria-labelledby="car-renew-plan-types-heading">
        <div className="car-renew-plan-types__inner">
          <p className="car-renew-plan-types__eyebrow">
            <span className="car-renew-plan-types__eyebrow-line" aria-hidden="true" />
            Plan Types
            <span className="car-renew-plan-types__eyebrow-line" aria-hidden="true" />
          </p>
          <h2 id="car-renew-plan-types-heading" className="car-renew-plan-types__title">
            Types of <span className="car-renew-plan-types__title-accent">Bike Insurance</span>
          </h2>
          <p className="car-renew-plan-types__subtitle">
            Pick the right level of cover for your needs and budget.
          </p>

          <ul className="car-renew-plan-types__grid">
            {RENEW_PLAN_TYPES.map((plan) => (
              <li key={plan.id}>
                <article className={`car-renew-plan-card car-renew-plan-card--${plan.tone}`}>
                  <span className="car-renew-plan-card__icon car-renew-plan-card__icon--image" aria-hidden="true">
                    <img
                      src={plan.image}
                      alt=""
                      className="car-renew-plan-card__icon-img"
                      loading="lazy"
                      width={57}
                      height={57}
                    />
                  </span>
                  <h3 className="car-renew-plan-card__title">{plan.title}</h3>
                  <p className="car-renew-plan-card__text">{plan.description}</p>
                  <button type="button" className="car-renew-plan-card__cta">
                    Explore plans <span aria-hidden="true">→</span>
                  </button>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="car-renew-coverage page-section page-section--regular page-section-container" aria-label="Coverage and exclusions">
        <div className="car-renew-coverage__inner">
          <div className="car-renew-coverage__layout">
            <div className="car-renew-coverage__column">
              <span className="car-renew-coverage__badge">
                <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false">
                  <path
                    d="M9 12.2 10.8 14 15 9.8M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Inclusions
              </span>
              <h2 id="car-renew-covered-heading" className="car-renew-coverage__title">
                What&apos;s Covered
              </h2>
              <ul className="car-renew-covered__grid" aria-labelledby="car-renew-covered-heading">
                {RENEW_COVERED_ITEMS.map((item) => (
                  <li key={item.id}>
                    <article className="car-renew-covered-card">
                      <span className="car-renew-covered-card__icon car-renew-covered-card__icon--image" aria-hidden="true">
                        <img
                          src={item.image}
                          alt=""
                          className="car-renew-covered-card__icon-img"
                          loading="lazy"
                          width={46}
                          height={46}
                        />
                      </span>
                      <h3 className="car-renew-covered-card__title">{item.title}</h3>
                    </article>
                  </li>
                ))}
              </ul>
            </div>

            <div className="car-renew-coverage__column">
              <span className="car-renew-coverage__badge">
                <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false">
                  <path
                    d="M12 9v4m0 4h.01M10.3 4.1 2.5 18a1.5 1.5 0 0 0 1.3 2.2h16.4a1.5 1.5 0 0 0 1.3-2.2L13.7 4.1a1.5 1.5 0 0 0-2.6 0Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Exclusions
              </span>
              <h2 id="car-renew-exclusions-heading" className="car-renew-coverage__title">
                What&apos;s Not Covered
              </h2>
              <div className="car-renew-exclusions__panel" role="list" aria-labelledby="car-renew-exclusions-heading">
                {RENEW_EXCLUSION_ITEMS.map((item, index) => {
                  const isOpen = openExclusionId === item.id;
                  const itemNumber = String(index + 1).padStart(2, '0');

                  return (
                    <article
                      key={item.id}
                      role="listitem"
                      className={`car-renew-exclusion-item ${isOpen ? 'is-open' : ''}`}
                    >
                      <button
                        type="button"
                        className="car-renew-exclusion-item__trigger"
                        onClick={() => setOpenExclusionId((current) => (current === item.id ? '' : item.id))}
                        aria-expanded={isOpen}
                        aria-controls={`car-renew-exclusion-${item.id}`}
                      >
                        <span className="car-renew-exclusion-item__num">{itemNumber}</span>
                        <span className="car-renew-exclusion-item__label">{item.title}</span>
                        <DropdownChevron className="car-renew-exclusion-item__chevron" />
                      </button>
                      <div
                        id={`car-renew-exclusion-${item.id}`}
                        className={`car-renew-exclusion-item__body ${isOpen ? 'is-open' : ''}`}
                        aria-hidden={!isOpen}
                      >
                        <p className="car-renew-exclusion-item__text">{item.description}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="car-renew-addons page-section page-section--regular page-section-container" aria-labelledby="car-renew-addons-heading">
        <div className="car-renew-addons__inner">
          <p className="car-renew-addons__eyebrow">
            <span className="car-renew-addons__eyebrow-line" aria-hidden="true" />
            Add-ons
            <span className="car-renew-addons__eyebrow-line" aria-hidden="true" />
          </p>
          <h2 id="car-renew-addons-heading" className="car-renew-addons__title">
            Boost Your Renewal With <span className="car-renew-addons__title-accent">Add-ons</span>
          </h2>
          <p className="car-renew-addons__subtitle">
            Customise your policy with extra protection that fits your riding habits.
          </p>

          <ul className="car-renew-addons__grid">
            {RENEW_ADDONS.map((addon) => (
              <li key={addon.id}>
                <article className="car-renew-addon-card">
                  <span className="car-renew-addon-card__icon" aria-hidden="true">
                    <img src={addon.image} alt="" loading="lazy" />
                  </span>
                  <div className="car-renew-addon-card__copy">
                    <h3 className="car-renew-addon-card__title">{addon.title}</h3>
                    <p className="car-renew-addon-card__text">{addon.description}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="car-renew-pricing page-section page-section--regular page-section-container" aria-labelledby="car-renew-pricing-heading">
        <div className="car-renew-pricing__inner">
          <p className="car-renew-pricing__eyebrow">
            <span className="car-renew-pricing__eyebrow-line" aria-hidden="true" />
            Pricing
            <span className="car-renew-pricing__eyebrow-line" aria-hidden="true" />
          </p>
          <h2 id="car-renew-pricing-heading" className="car-renew-pricing__title">
            <span className="car-renew-pricing__title-line">Factors That Affect Your</span>
            <span className="car-renew-pricing__title-line">
              <span className="car-renew-pricing__title-accent">Renewal Premium</span>
            </span>
          </h2>

          <ul className="car-renew-pricing__grid">
            {RENEW_PRICING_FACTORS.map((factor) => (
              <li key={factor.id}>
                <article className="car-renew-pricing-card">
                  <span className="car-renew-pricing-card__icon" aria-hidden="true">
                    <RenewPricingIcon name={factor.icon} />
                  </span>
                  <h3 className="car-renew-pricing-card__label">{factor.label}</h3>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="car-renew-process page-section page-section--regular page-section-container" aria-labelledby="car-renew-process-heading">
        <div className="car-renew-process__inner">
          <p className="car-renew-process__eyebrow">
            <span className="car-renew-process__eyebrow-line" aria-hidden="true" />
            Process
            <span className="car-renew-process__eyebrow-line" aria-hidden="true" />
          </p>
          <h2 id="car-renew-process-heading" className="car-renew-process__title">
            How to Renew in <span className="car-renew-process__title-accent">5 Easy Steps</span>
          </h2>

          <div className="car-renew-process__steps-wrap">
            <div className="car-renew-process__track" aria-hidden="true" />

            <ol className="car-renew-process__grid">
              {RENEW_STEPS.map((step) => (
                <li key={step.id} className="car-renew-process__item">
                  <article className="car-renew-process-card car-renew-process-card--float">
                    <div className="car-renew-process-card__icon-wrap">
                      <span className="car-renew-process-card__icon" aria-hidden="true">
                        <img
                          src={step.image}
                          alt=""
                          className="car-renew-process-card__icon-img"
                          loading="lazy"
                        />
                      </span>
                      <span className="car-renew-process-card__step">{step.step}</span>
                    </div>
                    <h3 className="car-renew-process-card__title">{step.title}</h3>
                    <p className="car-renew-process-card__text">{step.description}</p>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="car-renew-why-us page-section page-section--regular page-section-container" aria-labelledby="car-renew-why-us-heading">
        <div className="car-renew-why-us__inner">
          <p className="car-renew-why-us__eyebrow">
            <span className="car-renew-why-us__eyebrow-line" aria-hidden="true" />
            Why Us
            <span className="car-renew-why-us__eyebrow-line" aria-hidden="true" />
          </p>
          <h2 id="car-renew-why-us-heading" className="car-renew-why-us__title">
            Why Choose Us for <span className="car-renew-why-us__title-accent">Your Renewal</span>
          </h2>

          <ul className="car-renew-why-us__grid">
            {RENEW_WHY_US.map((item) => (
              <li key={item.id}>
                <article className="car-renew-why-us-card">
                  <span
                    className={`car-renew-why-us-card__icon${item.image ? ' car-renew-why-us-card__icon--image' : ' car-renew-why-us-card__icon--svg'}`}
                    aria-hidden="true"
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="car-renew-why-us-card__icon-img"
                      loading="lazy"
                    />
                  </span>
                  <h3 className="car-renew-why-us-card__title">{item.title}</h3>
                  <p className="car-renew-why-us-card__text">{item.description}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <InsuranceFaqAccordion
        title={bikeRenewFaqSection.title}
        subtitle={bikeRenewFaqSection.subtitle}
        items={bikeRenewFaqItems}
        buttonLabel={bikeRenewFaqSection.buttonLabel}
      />

      <section className="car-renew-support page-section page-section--regular page-section-container" aria-labelledby="car-renew-support-heading">
        <div className="car-renew-support__inner">
          <div className="car-renew-support__banner">
            <h2 id="car-renew-support-heading" className="car-renew-support__title">
              {bikeRenewSupportCard.title}
            </h2>
            <p className="car-renew-support__subtitle">{bikeRenewSupportCard.subtitle}</p>
            <div className="car-renew-support__actions">
              <button type="button" className="car-renew-support__btn car-renew-support__btn--primary" onClick={scrollToRenewForm}>
                {bikeRenewSupportCard.primaryCta}
                <span aria-hidden="true">→</span>
              </button>
              <button
                type="button"
                className="car-renew-support__btn car-renew-support__btn--ghost"
                onClick={() => setIsTalkToHumanOpen(true)}
              >
                {bikeRenewSupportCard.secondaryCta}
              </button>
            </div>
          </div>
        </div>
      </section>

      <AnimatedModal
        isOpen={isWithoutBikeNumberOpen}
        onClose={() => setIsWithoutBikeNumberOpen(false)}
        overlayClassName="car-renew-without-number-overlay"
        panelClassName="car-renew-without-number-modal"
        ariaLabelledby="bike-renew-without-number-title"
      >
        {({ requestClose }) => (
          <>
            <header className="car-renew-without-number-modal__header">
              <div>
                <h3 id="bike-renew-without-number-title">Continue without bike number</h3>
                <p>Enter your vehicle details to compare renewal plans</p>
              </div>
              <button
                type="button"
                className="car-renew-without-number-modal__close"
                onClick={requestClose}
                aria-label="Close"
              >
                ×
              </button>
            </header>
            <div className="car-renew-without-number-modal__body">
              <WithoutNumber
                isModal
                selectedCategory="motor-bike"
                onBackToVehicleCheck={requestClose}
                onContinue={requestClose}
              />
            </div>
          </>
        )}
      </AnimatedModal>

      <ContactHumanModal
        isOpen={isTalkToHumanOpen}
        onClose={() => setIsTalkToHumanOpen(false)}
        title="Talk to a Real Human"
      />

      <Footer />
    </div>
  );
}

export default BikeRenew;
