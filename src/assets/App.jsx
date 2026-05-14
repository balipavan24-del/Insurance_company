import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import './App.css';
import Navbar from '../pages/Landing/Navbar/Navbar';
import Login from '../components/Login/Login';
import Signup from '../components/Signup/Signup';
import MotorInsurance from '../components/MotorInsurance/MotorInsurance';
import HealthHome from '../components/HealthInsurance/Health-Home';
import CargoHome from '../components/cargo/Cargo-Home';
import CargoMerain from '../components/cargo/Cargo-Merain';
import CargoAir from '../components/cargo/Cargo-Air';
import CargoInland from '../components/cargo/Cargo-Inland';
import TermHome from '../components/Term/Term-Home';
import BusinessHome from '../components/BusinessInsurance/Business-Home';
import BusinessFire from '../components/BusinessInsurance/Business-Fire';
import BusinessNatural from '../components/BusinessInsurance/Business-Natural';
import TheftBusiness from '../components/BusinessInsurance/Theft-Business';
import BusinessEquipment from '../components/BusinessInsurance/Business-Equipment';
import Hero from '../pages/Landing/Hero';
import ContactUs from '../pages/Contact/ContactUs';

const INSURANCE_OPTIONS = [
  { id: 'motor-insurance', title: 'Motor Insurance', subtitle: '4 category motor coverage', icon: '🚗', popular: true },
  { id: 'health-insurance', title: 'Health Insurance', subtitle: 'Medical & hospitalization', icon: '💗' },
  { id: 'term-insurance', title: 'Term Insurance', subtitle: 'Life protection plans', icon: '🛡️' },
  { id: 'business-insurance', title: 'Business Insurance', subtitle: 'Cover your business', icon: '🏢' },
  { id: 'cargo-insurance', title: 'Cargo Insurance', subtitle: 'Goods in transit', icon: '📦' }
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
    <MotorInsurance
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
    if (optionId.startsWith('motor-')) {
      navigate(getMotorRouteFromCategory(optionId));
      return;
    }

    if (optionId === 'health-insurance' || optionId.startsWith('health-')) {
      navigate('/health-insurance');
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
    if (optionId === 'business-insurance' || optionId.startsWith('property-')) {
      navigate('/business-insurance');
      return;
    }

    if (optionId === 'term-insurance' || optionId.startsWith('term-')) {
      navigate('/term-insurance');
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
    || location.pathname.startsWith('/contact-us');

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
              <Hero
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
