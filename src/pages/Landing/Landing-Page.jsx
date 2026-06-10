import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Landing-Page.css';
import { INSURANCE_VIDEO_01 } from '../../utils/media';
import { INSURANCE_OPTIONS } from './landingData';
import { navigateInsuranceCard } from './landingNavigation';
import ScrollReveal, { revealInView, revealOnScroll } from '../../components/Animations/ScrollReveal';
import Footer from '../../components/Footer/Footer';
import ProductCard from '../../components/ProductCard/ProductCard';
import { PARTNERS } from '../../data/partners';
import chooseCompareIcon from '../../assets/icons/choose-compare.png';
import choosePriceIcon from '../../assets/icons/choose-price.png';
import chooseRenewalIcon from '../../assets/icons/choose-renewal.png';
import chooseSecureIcon from '../../assets/icons/choose-secure.png';
import howEnterDetailsIcon from '../../assets/icons/how-enter-details.png';
import howComparePlansIcon from '../../assets/icons/how-compare-plans.png';
import howBuyCoveredIcon from '../../assets/icons/how-buy-covered.png';

const shouldShowPromoVideo = Boolean(INSURANCE_VIDEO_01);

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

  const handleInsuranceCardClick = (optionId) => {
    navigateInsuranceCard(navigate, optionId);
  };

  return (
    <div className="landing-page">
      <main className="hero-page page-section page-section--hero page-section-container">
        {/* —— Hero: headline + insurance categories —— */}
        <section className="hero" aria-labelledby="hero-title">
          <ScrollReveal className="hero-intro" {...revealInView}>
            <span className="hero-chip">Simple. Fast. Reliable</span>
            <h1 id="hero-title" className="hero-title">
              Insurance made <span>simple</span>
            </h1>
            <p className="hero-subtitle">
              Compare, choose, and get insured in minutes - without confusion.
            </p>
          </ScrollReveal>

          <ScrollReveal
            className="hero-insurance insurance-panel"
            delay={180}
            {...revealOnScroll}
          >
            <h2>What would you like to insure?</h2>
            <div className="insurance-grid">
              {INSURANCE_OPTIONS.map((item) => (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  subtitle={item.subtitle}
                  iconSrc={item.iconSrc}
                  popular={item.popular}
                  onCardClick={handleInsuranceCardClick}
                />
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* —— Why Choose Us —— */}
        <ScrollReveal
          as="section"
          className="choose-section page-section page-section--regular"
          aria-labelledby="choose-heading"
          {...revealOnScroll}
          threshold={0.05}
          rootMargin="0px 0px -4% 0px"
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

        {/* —— Our Partners —— */}
        <ScrollReveal
          as="section"
          className="partners-section page-section page-section--regular"
          aria-labelledby="partners-heading"
          {...revealOnScroll}
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

        {/* —— Promo video —— */}
        {shouldShowPromoVideo && (
          <ScrollReveal
            as="section"
            className="promo-video-section"
            aria-labelledby="promo-video-heading"
            {...revealOnScroll}
          >
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
          </ScrollReveal>
        )}

        {/* —— How It Works —— */}
        <ScrollReveal
          as="section"
          className="it-works-section page-section page-section--regular"
          aria-labelledby="it-works-heading"
          {...revealOnScroll}
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
      <ScrollReveal className="landing-footer-reveal" {...revealOnScroll}>
        <Footer />
      </ScrollReveal>
    </div>
  );
}

export default LandingPage;
