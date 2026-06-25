import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import HealthHome from '../pages/Health/Health-Home';
import CargoHome from '../pages/Cargo/Cargo-Home';
import CargoMerain from '../pages/Cargo/Cargo-Merain';
import CargoAir from '../pages/Cargo/Cargo-Air';
import CargoInland from '../pages/Cargo/Cargo-Inland';
import BusinessHome from '../pages/Business/Business-Home';
import BusinessFire from '../pages/Business/Business-Fire';
import BusinessNatural from '../pages/Business/Business-Natural';
import TheftBusiness from '../pages/Business/Theft-Business';
import BusinessEquipment from '../pages/Business/Business-Equipment';
import LandingPage from '../pages/Landing/Landing-Page';
import ContactUs from '../pages/Contact/ContactUs';
import InsuranceBasics from '../pages/InsuranceBasics/InsuranceBasics';
import CarRenew from '../pages/RenewPlans/Car-Renew';
import BikeRenew from '../pages/RenewPlans/Bike-Renew';
import ThreeWheelerRenew from '../pages/RenewPlans/Three-Wheeler-Renew';
import CommercialVehicleRenew from '../pages/RenewPlans/Commercial-Vehicle-Renew';
import MotorInsurance from '../pages/Motor/MotorHome/MotorInsurance';
import Qoutes from '../Qoutes/Qoutes';
import TermRenew from '../pages/RenewPlans/Term-Renew/Term-Renew';
import TermHome from '../pages/Term/Term-Home';

function AppRoutes() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
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
            <Signup onClose={() => navigate('/login')} />
          </div>
        )}
      />
      <Route
        path="/motor-insurance"
        element={(
          <div className="app-screen app-screen--motor-insurance">
            <MotorInsurance onBackHome={() => navigate('/')} />
          </div>
        )}
      />
      <Route
        path="/motor-insurance/:category"
        element={(
          <div className="app-screen app-screen--motor-insurance">
            <MotorInsurance onBackHome={() => navigate('/')} />
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
            <BusinessFire onBackToBusinessHome={() => navigate('/business-insurance')} />
          </div>
        )}
      />
      <Route
        path="/business-insurance/theft-protection"
        element={(
          <div className="app-screen app-screen--business-insurance">
            <TheftBusiness onBackToBusinessHome={() => navigate('/business-insurance')} />
          </div>
        )}
      />
      <Route
        path="/business-insurance/natural-disaster"
        element={(
          <div className="app-screen app-screen--business-insurance">
            <BusinessNatural onBackToBusinessHome={() => navigate('/business-insurance')} />
          </div>
        )}
      />
      <Route
        path="/business-insurance/equipment-breakdown"
        element={(
          <div className="app-screen app-screen--business-insurance">
            <BusinessEquipment onBackToBusinessHome={() => navigate('/business-insurance')} />
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
      <Route
        path="/renew-plans/commercial-vehicle"
        element={(
          <div className="app-screen app-screen--renew-plans">
            <CommercialVehicleRenew />
          </div>
        )}
      />
      <Route
        path="/quotes"
        element={(
          <div className="app-screen app-screen--renew-plans">
            <Qoutes />
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
        path="/renew-plans/term"
        element={(
          <div className="app-screen app-screen--renew-plans">
            <TermRenew />
          </div>
        )}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
