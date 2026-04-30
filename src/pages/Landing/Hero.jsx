import './Landing.css';
import './Hero.css';
import './Features.css';
import './PromoVideo.css';
import { INSURANCE_VIDEO_01 } from '../../media';
import Choose from './choose';
import ItWorks from './itWorks';
import Footer from './Footer';

const shouldShowPromoVideo = Boolean(INSURANCE_VIDEO_01);

function Hero({ insuranceOptions, onInsuranceCardClick, showHomeSnackbar }) {
  return (
    <div className="landing-page">
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
            {insuranceOptions.map((item) => {
              const isClickableInsuranceCard = item.id === 'motor-insurance'
                || item.id === 'health-insurance'
                || item.id === 'cargo-insurance'
                || item.id === 'business-insurance';
              return (
                <article
                  key={item.id}
                  className={`insurance-card${item.popular ? ' is-popular' : ''}${isClickableInsuranceCard ? ' insurance-card--clickable' : ''}`}
                  data-insurance-id={item.id}
                  onClick={isClickableInsuranceCard ? () => onInsuranceCardClick(item.id) : undefined}
                  onKeyDown={
                    isClickableInsuranceCard
                      ? (event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            onInsuranceCardClick(item.id);
                          }
                        }
                      : undefined
                  }
                  role={isClickableInsuranceCard ? 'button' : undefined}
                  tabIndex={isClickableInsuranceCard ? 0 : undefined}
                >
                  {item.popular && <span className="popular-badge">Most Popular</span>}
                  <div className="card-icon" aria-hidden="true">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </article>
              );
            })}
          </div>
        </section>

        <Choose />

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

        <ItWorks />

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

export default Hero;
