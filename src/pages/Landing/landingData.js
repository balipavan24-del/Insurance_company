import iconLandingMotor from '../../assets/icons/landing-motor.png';
import iconLandingHealth from '../../assets/icons/landing-health.png';
import iconLandingTerm from '../../assets/icons/landing-term.png';
import iconLandingBusiness from '../../assets/icons/landing-business.png';
import iconLandingCargo from '../../assets/icons/landing-cargo.png';

export const INSURANCE_OPTIONS = [
  { id: 'motor-insurance', title: 'Motor Insurance', subtitle: '4 category motor coverage', iconSrc: iconLandingMotor, popular: true },
  { id: 'health-insurance', title: 'Health Insurance', subtitle: 'Medical & hospitalization', iconSrc: iconLandingHealth },
  { id: 'term-insurance', title: 'Term Insurance', subtitle: 'Life protection plans', iconSrc: iconLandingTerm },
  { id: 'business-insurance', title: 'Business Insurance', subtitle: 'Cover your business', iconSrc: iconLandingBusiness },
  { id: 'cargo-insurance', title: 'Cargo Insurance', subtitle: 'Goods in transit', iconSrc: iconLandingCargo },
];
