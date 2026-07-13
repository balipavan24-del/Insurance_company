import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Landing-Page.css';
import iconLandingMotor from '../../assets/icons/landing-motor.png';
import iconLandingHealth from '../../assets/icons/landing-health.png';
import iconLandingTerm from '../../assets/icons/landing-term.png';
import iconLandingBusiness from '../../assets/icons/landing-business.png';
import iconLandingCargo from '../../assets/icons/landing-cargo.png';
import chooseCompareIcon from '../../assets/icons/choose-compare.png';
import choosePriceIcon from '../../assets/icons/choose-price.png';
import chooseRenewalIcon from '../../assets/icons/choose-renewal.png';
import chooseSecureIcon from '../../assets/icons/choose-secure.png';
import howEnterDetailsIcon from '../../assets/icons/how-enter-details.png';
import howComparePlansIcon from '../../assets/icons/how-compare-plans.png';
import howBuyCoveredIcon from '../../assets/icons/how-buy-covered.png';
import ScrollReveal from '../../components/Animations/ScrollReveal';
import Footer from '../../components/Footer/Footer';
import { PARTNERS } from '../../data/productContent/partners';

function LandingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showHomeSnackbar, setShowHomeSnackbar] = useState(false);

  useEffect(() => {
    if (!location.state?.accountCreated) {
      return;
    }

    setShowHomeSnackbar(true);
    navigate(location.pathname, { replace: true, state: {} });
  }, [location.state?.accountCreated, location.pathname, navigate]);

  useEffect(() => {
    if (!showHomeSnackbar) {
      return undefined;
    }

    const timerId = window.setTimeout(() => setShowHomeSnackbar(false), 3000);
    return () => window.clearTimeout(timerId);
  }, [showHomeSnackbar]);

  const INSURANCE_OPTIONS = [
    {
      id: 'motor-insurance',
      title: 'Motor Insurance',
      subtitle: '4 category motor coverage',
      iconSrc: iconLandingMotor,
      popular: true,
      path: '/motor-insurance',//path for the motor insurance page
    },
    {
      id: 'health-insurance',
      title: 'Health Insurance',
      subtitle: 'Medical & hospitalization',
      iconSrc: iconLandingHealth,
      path: '/health-insurance',
    },
    {
      id: 'term-insurance',
      title: 'Term Insurance',
      subtitle: 'Life protection plans',
      iconSrc: iconLandingTerm,
      path: '/term-insurance',
    },
    {
      id: 'business-insurance',
      title: 'Business Insurance',
      subtitle: 'Cover your business',
      iconSrc: iconLandingBusiness,
      path: '/business-insurance',
    },
    {
      id: 'cargo-insurance',
      title: 'Cargo Insurance',
      subtitle: 'Goods in transit',
      iconSrc: iconLandingCargo,
      path: '/cargo-insurance',
    },
  ];

  const CHOOSE_FEATURES = [
    {
      id: 'compare',
      title: 'Compare Plans Instantly',
      description: 'Compare top insurers side-by-side in seconds.',
      iconBg: '#bfdbfe',
      logoSrc: chooseCompareIcon,
    },
    {
      id: 'price',
      title: 'Best Prices Guaranteed',
      description: 'Get competitive premiums from trusted insurance partners.',
      iconBg: '#bbf7d0',
      logoSrc: choosePriceIcon,
    },
    {
      id: 'renewal',
      title: 'Quick Policy Renewal',
      description: 'Renew your insurance effortlessly with minimal paperwork.',
      iconBg: '#ddd6fe',
      logoSrc: chooseRenewalIcon,
    },
    {
      id: 'secure',
      title: 'Secure Checkout',
      description: 'Bank-grade encryption keeps every transaction protected.',
      iconBg: '#c7d2fe',
      logoSrc: chooseSecureIcon,
    },
  ];

  const HOW_IT_WORKS_STEPS = [
    {
      id: 'enter-details',
      step: '01',
      title: 'Enter Your Details',
      description:
        'Provide your vehicle or personal details to begin exploring tailored insurance plans.',
      logoSrc: howEnterDetailsIcon,
    },
    {
      id: 'compare-plans',
      step: '02',
      title: 'Compare Top Plans',
      description:
        'Instantly compare coverage, premiums, and benefits from trusted insurers.',
      logoSrc: howComparePlansIcon,
    },
    {
      id: 'buy-and-get-covered',
      step: '03',
      title: 'Buy & Stay Protected',
      description:
        'Choose the best plan and receive instant policy confirmation with secure checkout.',
      logoSrc: howBuyCoveredIcon,
    },
  ];

  return (
    <div className="landing-page">
      <main className="hero-page page-section page-section--hero page-section-container">
        <section className="hero" aria-labelledby="hero-title">
          <ScrollReveal mode="hero" className="hero-intro">
            <span className="hero-chip">Simple. Fast. Reliable</span>
            <h1 id="hero-title" className="hero-title">
              Insurance made <span>simple</span>
            </h1>
            <p className="hero-subtitle">
              Compare, choose, and get insured in minutes - without confusion.
            </p>
          </ScrollReveal>

          <ScrollReveal mode="section" className="hero-insurance insurance-panel" delay={180}>
            <h2>What would you like to insure?</h2>
            <div className="insurance-grid">
              {INSURANCE_OPTIONS.map((option) => {
                const cardClassName = [
                  'insurance-card',
                  option.popular ? 'is-popular' : '',
                  option.path ? 'insurance-card--clickable' : '',
                ]
                  .filter(Boolean)
                  .join(' ');

                const cardContent = (
                  <>
                    {option.popular ? <span className="popular-badge">Most Popular</span> : null}
                    {option.iconSrc ? (
                      <img
                        className="insurance-card-icon"
                        src={option.iconSrc}
                        alt=""
                        decoding="async"
                        aria-hidden="true"
                      />
                    ) : null}
                    <h3>{option.title}</h3>
                    <p>{option.subtitle}</p>
                  </>
                );

                if (option.path) {
                  return (
                    <Link
                      key={option.id}
                      to={option.path}
                      className={cardClassName}
                      data-insurance-id={option.id}
                    >
                      {cardContent}
                    </Link>
                  );
                }

                return (
                  <article key={option.id} className={cardClassName} data-insurance-id={option.id}>
                    {cardContent}
                  </article>
                );
              })}
            </div>
          </ScrollReveal>
        </section>

        <ScrollReveal
          as="section"
          mode="section"
          className="choose-section page-section page-section--regular"
          aria-labelledby="choose-heading"
        >
          <div className="choose-header">
            <p className="choose-kicker">Why customers trust us</p>
            <h2 id="choose-heading" className="choose-title">
              Why Customers <span className="choose-title-accent">Choose Us</span>
            </h2>
            <p className="choose-subtitle">
              From comparing plans to instant renewals, we make insurance effortless,
              transparent, and reliable for every customer.
            </p>
          </div>
          <div className="choose-grid">
            {CHOOSE_FEATURES.map((item, index) => (
              <article
                key={item.id}
                className="choose-card choose-card--float"
                style={{
                  '--choose-pop-delay': `${120 + index * 220}ms`,
                  '--choose-wave-offset': `${index * 280}ms`,
                }}
              >
                <div className="choose-card-icon" style={{ background: item.iconBg }}>
                  {item.logoSrc ? (
                    <img
                      src={item.logoSrc}
                      alt=""
                      className="choose-card-icon-img"
                      loading="lazy"
                      decoding="async"
                      aria-hidden="true"
                    />
                  ) : null}
                </div>
                <h3 className="choose-card-title">{item.title}</h3>
                <p className="choose-card-text">{item.description}</p>
                <span className="choose-card-accent" aria-hidden="true" />
              </article>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal
          as="section"
          mode="section"
          className="partners-section page-section page-section--regular"
          aria-labelledby="partners-heading"
        >
          <h2 id="partners-heading" className="partners-title">
            Our <span className="partners-title-accent">Partners</span>
          </h2>
          <p className="partners-subtitle">
            Trusted insurance companies we work with to bring you the best plans.
          </p>
          <ul className="partners-grid">
            {PARTNERS.map((partner) => (
              <li key={partner.id} className="partners-logo-card">
                {partner.logoSrc ? (
                  <img
                    className="partners-logo"
                    src={partner.logoSrc}
                    alt={partner.name}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <span className="partners-logo-placeholder">{partner.name}</span>
                )}
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <ScrollReveal
          as="section"
          mode="section"
          className="it-works-section page-section page-section--regular"
          aria-labelledby="it-works-heading"
        >
          <div className="it-works-header">
            <p className="it-works-kicker">Simple process</p>
            <h2 id="it-works-heading" className="it-works-title">
              How It <span className="it-works-title-accent">Works</span>
            </h2>
            <p className="it-works-subtitle">
              Get insured quickly through a smooth and hassle-free process designed for
              simplicity and convenience.
            </p>
          </div>
          <ol className="it-works-grid">
            {HOW_IT_WORKS_STEPS.map((item) => (
              <li key={item.id} className="it-works-card">
                <span className="it-works-step" aria-hidden="true">
                  {item.step}
                </span>
                <div className="it-works-card-icon" aria-hidden="true">
                  <img
                    src={item.logoSrc}
                    alt=""
                    className="it-works-card-icon-img"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 className="it-works-card-title">{item.title}</h3>
                <p className="it-works-card-text">{item.description}</p>
                <span className="it-works-card-accent" aria-hidden="true" />
              </li>
            ))}
          </ol>
        </ScrollReveal>

        {showHomeSnackbar && (
          <div className="home-snackbar" role="status" aria-live="polite">
            Account created successfully. Welcome to InsureEase!
          </div>
        )}
      </main>

      <ScrollReveal mode="section" className="landing-footer-reveal">
        <Footer />
      </ScrollReveal>
    </div>
  );
}

export default LandingPage;
