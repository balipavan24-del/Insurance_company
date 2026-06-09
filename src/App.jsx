import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import MotorHome from './pages/Motor/MotorInsurance';
import HealthHome from './pages/Health/Health-Home';
import CargoHome from './pages/Cargo/Cargo-Home';
import CargoMerain from './pages/Cargo/Cargo-Merain';
import CargoAir from './pages/Cargo/Cargo-Air';
import CargoInland from './pages/Cargo/Cargo-Inland';
import TermHome from './pages/Term/Term-Home';
import BusinessHome from './pages/Business/Business-Home';
import BusinessFire from './pages/Business/Business-Fire';
import BusinessNatural from './pages/Business/Business-Natural';
import TheftBusiness from './pages/Business/Theft-Business';
import BusinessEquipment from './pages/Business/Business-Equipment';
import LandingPage from './pages/Landing/Landing-Page';
import ContactUs from './pages/Contact/ContactUs';
import InsuranceBasics from './pages/InsuranceBasics/InsuranceBasics';
import CarRenew from './pages/RenewPlans/Car-Renew';
import BikeRenew from './pages/RenewPlans/Bike-Renew';
import ThreeWheelerRenew from './pages/RenewPlans/Three-Wheeler-Renew';
import iconLandingMotor from './assets/icons/landing-motor.png';
import iconLandingHealth from './assets/icons/landing-health.png';
import iconLandingTerm from './assets/icons/landing-term.png';
import iconLandingBusiness from './assets/icons/landing-business.png';
import iconLandingCargo from './assets/icons/landing-cargo.png';

const INSURANCE_OPTIONS = [
  { id: 'motor-insurance', title: 'Motor Insurance', subtitle: '4 category motor coverage', iconSrc: iconLandingMotor, popular: true },
  { id: 'health-insurance', title: 'Health Insurance', subtitle: 'Medical & hospitalization', iconSrc: iconLandingHealth },
  { id: 'term-insurance', title: 'Term Insurance', subtitle: 'Life protection plans', iconSrc: iconLandingTerm },
  { id: 'business-insurance', title: 'Business Insurance', subtitle: 'Cover your business', iconSrc: iconLandingBusiness },
  { id: 'cargo-insurance', title: 'Cargo Insurance', subtitle: 'Goods in transit', iconSrc: iconLandingCargo },
];

const MOTOR_CATEGORY_SLUGS = {
  'motor-car': 'car',
  'motor-bike': 'bike',
  'motor-three-wheeler': 'three-wheeler',
  'motor-commercial-vehicle': 'commercial-vehicle',
};

const MOTOR_SLUG_TO_CATEGORY = Object.entries(MOTOR_CATEGORY_SLUGS).reduce((result, [category, slug]) => {
  result[slug] = category;
  return result;
}, {});

const getMotorCategoryFromSlug = (slug) => {
  if (!slug) {
    return null;
  }
  return MOTOR_SLUG_TO_CATEGORY[slug] || null;
};

function MotorInsuranceRoute({ onBackHome }) {
  const { category } = useParams();
  const selectedCategory = getMotorCategoryFromSlug(category);

  if (!selectedCategory) {
    return <Navigate to="/motor-insurance/car" replace />;
  }

  return (
    <MotorHome
      onBackHome={onBackHome}
      selectedCategory={selectedCategory}
    />
  );
}

const getMotorRouteFromCategory = (categoryId = 'motor-car') => {
  const slug = MOTOR_CATEGORY_SLUGS[categoryId] || MOTOR_CATEGORY_SLUGS['motor-car'];
  return `/motor-insurance/${slug}`;
};

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const appContentRef = useRef(null);
  const [showHomeSnackbar, setShowHomeSnackbar] = useState(false);

  const handleAccountCreated = () => {
    setShowHomeSnackbar(true);
    navigate('/');
  };

  useEffect(() => {
    if (!showHomeSnackbar) {
      return undefined;
    }
    const timerId = window.setTimeout(() => setShowHomeSnackbar(false), 3000);
    return () => window.clearTimeout(timerId);
  }, [showHomeSnackbar]);

  useEffect(() => {
    if (!('scrollRestoration' in window.history)) {
      return undefined;
    }

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const appContent = appContentRef.current;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const previousHtmlBehavior = html.style.scrollBehavior;
    const previousBodyBehavior = body.style.scrollBehavior;
    const previousAppContentBehavior = appContent?.style.scrollBehavior;

    html.style.scrollBehavior = 'auto';
    body.style.scrollBehavior = 'auto';
    if (appContent) {
      appContent.style.scrollBehavior = 'auto';
    }

    window.scrollTo(0, 0);
    html.scrollTop = 0;
    body.scrollTop = 0;
    if (appContent?.scrollTo) {
      appContent.scrollTo(0, 0);
    }

    const rafId = window.requestAnimationFrame(() => {
      const nextBehavior = prefersReducedMotion ? 'auto' : 'smooth';
      html.style.scrollBehavior = nextBehavior;
      body.style.scrollBehavior = nextBehavior;
      if (appContent) {
        appContent.style.scrollBehavior = nextBehavior;
      }
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      html.style.scrollBehavior = previousHtmlBehavior;
      body.style.scrollBehavior = previousBodyBehavior;
      if (appContent) {
        appContent.style.scrollBehavior = previousAppContentBehavior || '';
      }
    };
  }, [location.pathname, location.key]);

  const handleMenuItemSelect = (optionId) => {
    if (optionId === 'renewal-plans') {
      navigate('/?menu=renewal-plans');
      return;
    }

    if (optionId === 'renewal-motor-car') {
      navigate('/renew-plans/car');
      return;
    }

    if (optionId === 'renewal-motor-bike') {
      navigate('/renew-plans/bike');
      return;
    }

    if (optionId === 'renewal-motor-commercial') {
      navigate('/motor-insurance/commercial-vehicle?flow=renewal');
      return;
    }

    if (optionId === 'renewal-motor-three-wheeler') {
      navigate('/renew-plans/three-wheeler');
      return;
    }

    if (optionId === 'renewal-health-individual') {
      navigate('/health-insurance?flow=renewal&plan=individual');
      return;
    }

    if (optionId === 'renewal-health-family') {
      navigate('/health-insurance?flow=renewal&plan=family');
      return;
    }

    if (optionId === 'renewal-health-senior') {
      navigate('/health-insurance?flow=renewal&plan=senior');
      return;
    }

    if (optionId === 'renewal-term') {
      navigate('/term-insurance?flow=renewal');
      return;
    }

    if (optionId === 'renewal-track-policy') {
      navigate('/contact-us?topic=track-policy');
      return;
    }

    if (optionId === 'renewal-download-copy') {
      navigate('/contact-us?topic=policy-copy');
      return;
    }

    if (optionId === 'renewal-claim-assistance') {
      navigate('/contact-us?topic=claim-assistance');
      return;
    }

    if (optionId.startsWith('motor-addon-')) {
      const addonParam = {
        'motor-addon-zero-depreciation': 'zero-depreciation',
        'motor-addon-roadside': 'roadside-assistance',
        'motor-addon-engine': 'engine-protection',
      }[optionId];
      if (addonParam) {
        navigate(`/motor-insurance/car?addon=${addonParam}`);
        return;
      }
    }

    if (optionId === 'motor-tool-premium-calculator') {
      navigate('/motor-insurance/car?tool=premium-calculator');
      return;
    }

    if (optionId === 'motor-tool-browse-plans') {
      navigate('/motor-insurance/car');
      return;
    }

    if (optionId === 'motor-tool-claim-support') {
      navigate('/contact-us');
      return;
    }

    if (optionId === 'motor-insurance') {
      navigate(getMotorRouteFromCategory('motor-car'));
      return;
    }

    if (optionId.startsWith('motor-')) {
      navigate(getMotorRouteFromCategory(optionId));
      return;
    }

    if (optionId === 'health-premium-calculator') {
      navigate('/health-insurance?tool=premium-calculator');
      return;
    }

    if (optionId === 'health-claim-support') {
      navigate('/contact-us');
      return;
    }

    if (optionId === 'health-all-plans' || optionId === 'health-insurance') {
      navigate('/health-insurance');
      return;
    }

    if (optionId.startsWith('health-')) {
      const healthPlanParam = {
        'health-individual': 'individual',
        'health-family-floater': 'family',
        'health-senior-citizen': 'senior',
        'health-critical-illness': 'critical',
        'health-top-up': 'top-up',
      }[optionId];

      if (healthPlanParam) {
        navigate(`/health-insurance?plan=${healthPlanParam}`);
        return;
      }

      navigate('/health-insurance');
      return;
    }

    if (optionId === 'cargo-claim-support' || optionId === 'cargo-track-request') {
      navigate('/contact-us');
      return;
    }

    if (optionId === 'cargo-request-quote') {
      navigate('/cargo-insurance/marine');
      return;
    }

    if (optionId === 'cargo-single-transit') {
      navigate('/cargo-insurance?coverage=single-transit');
      return;
    }

    if (optionId === 'cargo-open-cover') {
      navigate('/cargo-insurance?coverage=open-cover');
      return;
    }

    if (optionId === 'cargo-annual-policy') {
      navigate('/cargo-insurance?coverage=annual-policy');
      return;
    }

    if (optionId === 'cargo-insurance' || optionId.startsWith('cargo-')) {
      if (optionId === 'cargo-marine') {
        navigate('/cargo-insurance/marine');
        return;
      }
      if (optionId === 'cargo-air') {
        navigate('/cargo-insurance/air');
        return;
      }
      if (optionId === 'cargo-inland' || optionId === 'cargo-inland-road' || optionId === 'cargo-inland-rail') {
        navigate('/cargo-insurance/inland');
        return;
      }
      navigate('/cargo-insurance');
      return;
    }

    if (optionId === 'business-premium-calculator') {
      navigate('/business-insurance?tool=premium-calculator');
      return;
    }

    if (optionId === 'business-claim-support') {
      navigate('/contact-us');
      return;
    }

    if (optionId === 'business-all-plans' || optionId === 'business-insurance') {
      navigate('/business-insurance');
      return;
    }

    if (optionId === 'business-fire-damage') {
      navigate('/business/fire');
      return;
    }
    if (optionId === 'business-theft-protection') {
      navigate('/business-insurance/theft-protection');
      return;
    }
    if (optionId === 'business-natural-disaster') {
      navigate('/business-insurance/natural-disaster');
      return;
    }
    if (optionId === 'business-equipment-breakdown') {
      navigate('/business-insurance/equipment-breakdown');
      return;
    }
    if (optionId.startsWith('property-')) {
      navigate('/business-insurance');
      return;
    }

    if (optionId === 'term-insurance' || optionId.startsWith('term-')) {
      navigate('/term-insurance');
      return;
    }

    if (optionId === 'support') {
      navigate('/contact-us');
      return;
    }

    navigate(`/?menu=${optionId}`);
  };

  const handleInsuranceCardClick = (optionId) => {
    if (optionId === 'motor-insurance') {
      navigate(getMotorRouteFromCategory('motor-car'));
      return;
    }

    if (optionId === 'health-insurance') {
      navigate('/health-insurance');
      return;
    }

    if (optionId === 'cargo-insurance') {
      navigate('/cargo-insurance');
      return;
    }

    if (optionId === 'business-insurance') {
      navigate('/business-insurance');
      return;
    }

    if (optionId === 'term-insurance') {
      navigate('/term-insurance');
    }
  };

  const showNavbar =
    location.pathname === '/'
    || location.pathname.startsWith('/motor-insurance')
    || location.pathname.startsWith('/health-insurance')
    || location.pathname.startsWith('/term-insurance')
    || location.pathname.startsWith('/cargo-insurance')
    || location.pathname.startsWith('/business-insurance')
    || location.pathname.startsWith('/business')
    || location.pathname.startsWith('/contact-us')
    || location.pathname.startsWith('/insurance-basics')
    || location.pathname.startsWith('/renew-plans');

  return (
    <div className="main-wrapper">
      {showNavbar && (
        <Navbar
          onLoginClick={() => navigate('/login')}
          onMenuOptionSelect={handleMenuItemSelect}
          onBrandClick={() => navigate('/')}
        />
      )}

      <div ref={appContentRef} className="app-content-offset">
        <Routes key={location.pathname}>
          <Route
            path="/"
            element={(
              <LandingPage
                insuranceOptions={INSURANCE_OPTIONS}
                onInsuranceCardClick={handleInsuranceCardClick}
                showHomeSnackbar={showHomeSnackbar}
              />
            )}
          />
          <Route
            path="/login"
            element={(
              <div className="app-screen app-screen--login">
                <Login
                  onClose={() => navigate('/')}
                  onGuestLogin={() => navigate('/')}
                  onSignupClick={() => navigate('/signup')}
                />
              </div>
            )}
          />
          <Route
            path="/signup"
            element={(
              <div className="app-screen app-screen--signup">
                <Signup
                  onClose={() => navigate('/login')}
                  onAccountCreated={handleAccountCreated}
                />
              </div>
            )}
          />
          <Route path="/motor-insurance" element={<Navigate to="/motor-insurance/car" replace />} />
          <Route
            path="/motor-insurance/:category"
            element={(
              <div className="app-screen app-screen--motor-insurance">
                <MotorInsuranceRoute onBackHome={() => navigate('/')} />
              </div>
            )}
          />
          <Route
            path="/health-insurance"
            element={(
              <div className="app-screen app-screen--health-insurance">
                <HealthHome onBackHome={() => navigate('/')} />
              </div>
            )}
          />
          <Route
            path="/cargo-insurance"
            element={(
              <div className="app-screen app-screen--cargo-insurance">
                <CargoHome
                  onBackHome={() => navigate('/')}
                  onMarineCargoSelect={() => navigate('/cargo-insurance/marine')}
                  onAirCargoSelect={() => navigate('/cargo-insurance/air')}
                  onInlandCargoSelect={() => navigate('/cargo-insurance/inland')}
                />
              </div>
            )}
          />
          <Route
            path="/cargo-insurance/marine"
            element={(
              <div className="app-screen app-screen--cargo-insurance">
                <CargoMerain onBackToCargo={() => navigate('/cargo-insurance')} />
              </div>
            )}
          />
          <Route
            path="/cargo-insurance/air"
            element={(
              <div className="app-screen app-screen--cargo-insurance">
                <CargoAir onBackToCargo={() => navigate('/cargo-insurance')} />
              </div>
            )}
          />
          <Route
            path="/cargo-insurance/inland"
            element={(
              <div className="app-screen app-screen--cargo-insurance">
                <CargoInland onBackToCargo={() => navigate('/cargo-insurance')} />
              </div>
            )}
          />
          <Route
            path="/term-insurance"
            element={(
              <div className="app-screen app-screen--term-insurance">
                <TermHome />
              </div>
            )}
          />
          <Route
            path="/business-insurance"
            element={(
              <div className="app-screen app-screen--business-insurance">
                <BusinessHome
                  onBackHome={() => navigate('/')}
                  onFireDamageSelect={() => navigate('/business/fire')}
                  onTheftProtectionSelect={() => navigate('/business-insurance/theft-protection')}
                  onNaturalDisasterSelect={() => navigate('/business-insurance/natural-disaster')}
                  onEquipmentBreakdownSelect={() => navigate('/business-insurance/equipment-breakdown')}
                />
              </div>
            )}
          />
          <Route
            path="/business/fire"
            element={(
              <div className="app-screen app-screen--business-insurance">
                <BusinessFire
                  onBackToBusinessHome={() => navigate('/business-insurance')}
                />
              </div>
            )}
          />
          <Route
            path="/business-insurance/theft-protection"
            element={(
              <div className="app-screen app-screen--business-insurance">
                <TheftBusiness
                  onBackToBusinessHome={() => navigate('/business-insurance')}
                />
              </div>
            )}
          />
          <Route
            path="/business-insurance/natural-disaster"
            element={(
              <div className="app-screen app-screen--business-insurance">
                <BusinessNatural
                  onBackToBusinessHome={() => navigate('/business-insurance')}
                />
              </div>
            )}
          />
          <Route
            path="/business-insurance/equipment-breakdown"
            element={(
              <div className="app-screen app-screen--business-insurance">
                <BusinessEquipment
                  onBackToBusinessHome={() => navigate('/business-insurance')}
                />
              </div>
            )}
          />
          <Route
            path="/contact-us"
            element={(
              <div className="app-screen app-screen--contact-us">
                <ContactUs />
              </div>
            )}
          />
          <Route
            path="/insurance-basics"
            element={(
              <div className="app-screen app-screen--insurance-basics">
                <InsuranceBasics />
              </div>
            )}
          />
          <Route
            path="/renew-plans/car"
            element={(
              <div className="app-screen app-screen--renew-plans">
                <CarRenew />
              </div>
            )}
          />
          <Route
            path="/renew-plans/bike"
            element={(
              <div className="app-screen app-screen--renew-plans">
                <BikeRenew />
              </div>
            )}
          />
          <Route
            path="/renew-plans/three-wheeler"
            element={(
              <div className="app-screen app-screen--renew-plans">
                <ThreeWheelerRenew />
              </div>
            )}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
