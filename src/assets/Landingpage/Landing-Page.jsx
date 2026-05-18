import './Landing-Page.css';
import { INSURANCE_VIDEO_01 } from '../../media';
import Footer from '../layout/Footer';

const shouldShowPromoVideo = Boolean(INSURANCE_VIDEO_01);

const CHOOSE_FEATURES = [
  {
    id: 'compare',
    title: 'Compare plans instantly',
    description: 'Side-by-side comparison of top insurers in seconds.',
    iconBg: '#38bdf8',
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
        <path fill="currentColor" d="M5 18h2V9H5v9zm4 0h2V5H9v13zm4 0h2V11h-2v7zm4 0h2V7h-2v11z" />
      </svg>
    ),
  },
  {
    id: 'price',
    title: 'Best prices guaranteed',
    description: 'We partner with leading insurers to offer the lowest premiums.',
    iconBg: '#2dd4bf',
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.75" />
        <text
          x="12"
          y="16.5"
          textAnchor="middle"
          fill="currentColor"
          fontSize="12"
          fontWeight="700"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          $
        </text>
      </svg>
    ),
  },
  {
    id: 'renewal',
    title: 'Easy and fast renewal',
    description: 'Renew your policy in under 2 minutes — no paperwork.',
    iconBg: '#fb923c',
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 4V1L7 6l5 5V7c2.76 0 5 2.24 5 5 0 1.64-.8 3.09-2.03 4l1.46 1.46A6.96 6.96 0 0019 12c0-3.87-3.13-7-7-7zm0 14c-2.76 0-5-2.24-5-5 0-1.64.8-3.09 2.03-4L7.51 7.54A6.96 6.96 0 005 12c0 3.87 3.13 7 7 7v3l5-5-5-5v3z"
        />
      </svg>
    ),
  },
  {
    id: 'secure',
    title: 'Secure checkout',
    description: 'Bank-grade encryption protects every transaction.',
    iconBg: '#a855f7',
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 16l-4-4 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z"
        />
      </svg>
    ),
  },
];

function SearchStepIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M10.5 4.5a6 6 0 1 1 0 12 6 6 0 0 1 0-12Zm0 1.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm8.03 11.47 1.97 1.97a.75.75 0 0 1-1.06 1.06l-1.97-1.97a.75.75 0 0 1 1.06-1.06Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CompareStepIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 18.25A.75.75 0 0 1 4.25 17.5v-3.25a.75.75 0 0 1 1.5 0v3.25a.75.75 0 0 1-.75.75Zm7 0a.75.75 0 0 1-.75-.75v-11a.75.75 0 0 1 1.5 0v11a.75.75 0 0 1-.75.75Zm7 0a.75.75 0 0 1-.75-.75v-6.5a.75.75 0 0 1 1.5 0v6.5a.75.75 0 0 1-.75.75ZM2.75 20a.75.75 0 0 1 0-1.5h18.5a.75.75 0 0 1 0 1.5H2.75Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ShieldStepIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3.75a.75.75 0 0 1 .3.06l6 2.58a.75.75 0 0 1 .45.69v3.61c0 4.05-2.42 7.76-6.16 9.44a1.47 1.47 0 0 1-1.18 0c-3.74-1.68-6.16-5.39-6.16-9.44V7.08a.75.75 0 0 1 .45-.69l6-2.58a.75.75 0 0 1 .3-.06Zm0 1.56L6.75 7.57v3.12c0 3.45 2.05 6.62 5.27 8.07 3.22-1.45 5.23-4.62 5.23-8.07V7.57L12 5.31Zm-1.03 8.8 3.7-3.7a.75.75 0 1 1 1.06 1.06l-4.23 4.23a.75.75 0 0 1-1.06 0L8.3 13.56a.75.75 0 1 1 1.06-1.06l1.61 1.61Z"
        fill="currentColor"
      />
    </svg>
  );
}

const HOW_IT_WORKS_STEPS = [
  {
    id: 'enter-details',
    step: '1',
    title: 'Enter Details',
    description: 'Enter your vehicle number or basic details',
    icon: SearchStepIcon,
    iconClass: 'is-search',
  },
  {
    id: 'compare-plans',
    step: '2',
    title: 'Compare Plans',
    description: 'Compare plans from multiple insurers instantly',
    icon: CompareStepIcon,
    iconClass: 'is-compare',
  },
  {
    id: 'buy-and-get-covered',
    step: '3',
    title: 'Buy & Get Covered',
    description: 'Choose a plan and get insured in minutes',
    icon: ShieldStepIcon,
    iconClass: 'is-shield',
  },
];

function LandingPage({ insuranceOptions = [], onInsuranceCardClick, showHomeSnackbar }) {
  const cards = Array.isArray(insuranceOptions) ? insuranceOptions : [];

  return (
    <div className="landing-page">
      <main className="hero-page page-section page-section--hero page-section-container">
        {/* —— Hero —— */}
        <section className="hero-section">
          <span className="hero-chip">Simple. Fast. Reliable</span>
          <h1 className="hero-title">
            Insurance made <span>simple</span>
          </h1>
          <p className="hero-subtitle">
            Compare, choose, and get insured in minutes - without confusion.
          </p>
        </section>

        {/* —— Insurance categories —— */}
        <section className="insurance-panel">
          <h2>What would you like to insure?</h2>
          <div className="insurance-grid">
            {cards.map((item) => {
              const isClickableInsuranceCard =
                item.id === 'motor-insurance'
                || item.id === 'health-insurance'
                || item.id === 'term-insurance'
                || item.id === 'cargo-insurance'
                || item.id === 'business-insurance';
              return (
                <article
                  key={item.id}
                  className={`insurance-card${item.popular ? ' is-popular' : ''}${isClickableInsuranceCard ? ' insurance-card--clickable' : ''}`}
                  data-insurance-id={item.id}
                  onClick={isClickableInsuranceCard ? () => onInsuranceCardClick?.(item.id) : undefined}
                  onKeyDown={
                    isClickableInsuranceCard
                      ? (event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            onInsuranceCardClick?.(item.id);
                          }
                        }
                      : undefined
                  }
                  role={isClickableInsuranceCard ? 'button' : undefined}
                  tabIndex={isClickableInsuranceCard ? 0 : undefined}
                >
                  {item.popular && <span className="popular-badge">Most Popular</span>}
                  {item.iconSrc ? (
                    <img
                      className="insurance-card-icon"
                      src={item.iconSrc}
                      alt=""
                      decoding="async"
                      aria-hidden="true"
                    />
                  ) : null}
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </article>
              );
            })}
          </div>
        </section>

        {/* —— Why Choose Us —— */}
        <section className="choose-section page-section page-section--regular" aria-labelledby="choose-heading">
          <h2 id="choose-heading" className="choose-title">
            Why Choose <span className="choose-title-accent">Us</span>
          </h2>
          <p className="choose-subtitle">We make insurance simple, affordable, and trustworthy.</p>
          <div className="choose-grid">
            {CHOOSE_FEATURES.map((item) => (
              <article key={item.id} className="choose-card">
                <div className="choose-card-icon" style={{ background: item.iconBg }}>
                  {item.icon}
                </div>
                <h3 className="choose-card-title">{item.title}</h3>
                <p className="choose-card-text">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* —— Promo video —— */}
        {shouldShowPromoVideo && (
          <section className="promo-video-section" aria-labelledby="promo-video-heading">
            <div className="promo-video-inner">
              <h2 id="promo-video-heading" className="promo-video-title">
                Insurance in <span className="promo-video-title-accent">60 seconds</span>
              </h2>
              <p className="promo-video-subtitle">
                See how quick and straightforward getting covered can be.
              </p>
              <div className="promo-video-shell">
                <video
                  className="promo-video"
                  controls
                  playsInline
                  preload="metadata"
                  src={INSURANCE_VIDEO_01}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </section>
        )}

        {/* —— How It Works —— */}
        <section className="it-works-section page-section page-section--regular" aria-labelledby="it-works-heading">
          <p className="it-works-kicker">Simple Process</p>
          <h2 id="it-works-heading" className="it-works-title">
            How It Works
          </h2>
          <p className="it-works-subtitle">Get insured in just a few simple steps</p>
          <ol className="it-works-grid">
            {HOW_IT_WORKS_STEPS.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id} className="it-works-card">
                  <span className="it-works-step" aria-hidden="true">
                    {item.step}
                  </span>
                  <div className={`it-works-icon ${item.iconClass}`} aria-hidden="true">
                    <Icon />
                  </div>
                  <h3 className="it-works-card-title">{item.title}</h3>
                  <p className="it-works-card-text">{item.description}</p>
                </li>
              );
            })}
          </ol>
        </section>

        {showHomeSnackbar && (
          <div className="home-snackbar" role="status" aria-live="polite">
            Account created successfully. Welcome to InsureEase!
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
