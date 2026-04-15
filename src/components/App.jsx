import { lazy, Suspense, useState } from 'react';
import './App.css';
import Navbar from './Navbar';

const Login = lazy(() => import('./Login'));

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [showHomeSnackbar, setShowHomeSnackbar] = useState(false);
  const insuranceOptions = [
    { id: 'motor-insurance', title: 'Motor Insurance', subtitle: 'Car & Bike coverage', icon: '🚗', popular: true },
    { id: 'health-insurance', title: 'Health Insurance', subtitle: 'Medical & hospitalization', icon: '💗' },
    { id: 'term-insurance', title: 'Term Insurance', subtitle: 'Life protection plans', icon: '🛡️' },
    { id: 'business-insurance', title: 'Business Insurance', subtitle: 'Cover your business', icon: '🏢' },
    { id: 'cargo-insurance', title: 'Cargo Insurance', subtitle: 'Goods in transit', icon: '📦' }
  ];

  const handleAccountCreated = () => {
    setCurrentView('home');
    setShowHomeSnackbar(true);
    window.setTimeout(() => setShowHomeSnackbar(false), 3000);
  };

  return (
    <div className="main-wrapper">
      {currentView === 'home' && <Navbar onLoginClick={() => setCurrentView('login')} />}

      {currentView === 'home' ? (
        <main className="hero-page">
          <section className="hero-section">
            <span className="hero-chip">Simple. Fast. Reliable</span>
            <h1 className="hero-title">
              Insurance made <span>simple</span>
            </h1>
            <p className="hero-subtitle">
              Compare, choose, and get insured in minutes - without confusion.
            </p>

            <div className="hero-points">
              <span>50,000+ customers</span>
              <span>Instant policy issuance</span>
              <span>24/7 claim support</span>
            </div>
          </section>

          <section className="insurance-panel">
            <h2>What would you like to insure?</h2>
            <div className="insurance-grid">
              {insuranceOptions.map((item) => (
                <article
                  key={item.id}
                  className={`insurance-card${item.popular ? ' is-popular' : ''}`}
                  data-insurance-id={item.id}
                >
                  {item.popular && <span className="popular-badge">Most Popular</span>}
                  <div className="card-icon" aria-hidden="true">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </article>
              ))}
            </div>
          </section>

          {showHomeSnackbar && (
            <div className="home-snackbar" role="status" aria-live="polite">
              Account created successfully. Welcome to InsureEase!
            </div>
          )}
        </main>
      ) : (
        <Suspense fallback={<div className="route-fallback" role="status" aria-live="polite" />}>
          <Login
            onClose={() => setCurrentView('home')}
            onAccountCreated={handleAccountCreated}
          />
        </Suspense>
      )}
    </div>
  );
}

export default App;