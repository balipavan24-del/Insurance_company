import './Cargo-Home.css';
import cargoHomeImage from '../../assets/images/CargoHome.webp';
import Footer from '../../components/Footer/Footer';
import InsuranceFaqAccordion from '../../components/Faq/InsuranceFaqAccordion';
import { cargoInsuranceFaqItems } from '../../data/productContent';

const CARGO_OPTIONS = [
  {
    id: 'cargo-marine',
    title: 'Marine Insurance',
    subtitle: 'Sea shipments — imports & exports',
    icon: '🚢',
  },
  {
    id: 'cargo-air',
    title: 'Air Cargo Insurance',
    subtitle: 'Air freight cargo coverage',
    icon: '✈️',
  },
  {
    id: 'cargo-inland',
    title: 'Inland Transit (Road / Rail)',
    subtitle: 'Domestic road & rail movements',
    icon: '🚚',
  },
];

const HERO_HIGHLIGHTS = [
  'Comprehensive Protection',
  'Financial Security',
  'On-Time Support',
  'Hassle-Free Claims',
];

const COVERAGE_ITEMS = [
  {
    id: 'loss-damage',
    title: 'Loss or Damage During Transit',
    description: 'Covers physical damage or complete loss of goods while being transported.',
    icon: 'box',
  },
  {
    id: 'theft-missing',
    title: 'Theft and Missing Shipments',
    description: 'Protects against theft, pilferage, or missing goods.',
    icon: 'shield',
  },
  {
    id: 'accidental-damage',
    title: 'Accidental Damage',
    description: 'Covers damage due to accidents, collisions, or mishandling.',
    icon: 'warning',
  },
  {
    id: 'natural-events',
    title: 'Natural Events',
    description: 'Protection against storms, floods, earthquakes, and natural calamities.',
    icon: 'cloud',
  },
  {
    id: 'storage-risks',
    title: 'Handling and Storage Risks',
    description: 'Covers damage during temporary storage or handling.',
    icon: 'warehouse',
  },
  {
    id: 'fire-explosion',
    title: 'Fire and Explosion',
    description: 'Protection against fire or explosion during transit.',
    icon: 'flame',
  },
];

const CoverageIcon = ({ type }) => {
  if (type === 'shield') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 4 18 6.5V11c0 4.1-2.6 6.8-6 8-3.4-1.2-6-3.9-6-8V6.5L12 4Z" />
        <path d="M12 8v4" />
      </svg>
    );
  }

  if (type === 'warning') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 5 19 18H5L12 5Z" />
        <path d="M12 10v4" />
        <circle cx="12" cy="16.8" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (type === 'cloud') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M7.5 17.5a3.5 3.5 0 1 1 .7-6.9A4.5 4.5 0 0 1 16.8 9a3.2 3.2 0 0 1 .7 6.3H7.5Z" />
        <path d="M9.2 17.5h6.1" />
      </svg>
    );
  }

  if (type === 'warehouse') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 10.5 12 6l8 4.5V18H4v-7.5Z" />
        <path d="M9 18v-4h6v4" />
        <path d="M8.5 11.2h7" />
        <path d="M8.5 13.7h7" />
      </svg>
    );
  }

  if (type === 'flame') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12.5 4.5c1.5 2 3.5 3 3.5 6a4.5 4.5 0 0 1-9 0c0-1.8.9-3.2 2.3-4.5.4 1.3 1.1 2.2 2.2 2.9.1-1.4.4-2.8 1-4.4Z" />
        <path d="M12 13.5c.8.8 1.2 1.5 1.2 2.5a1.7 1.7 0 0 1-3.4 0c0-.8.4-1.4 1-2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7 8.5 12 6l5 2.5V15l-5 2.5L7 15V8.5Z" />
      <path d="M7 8.5 12 11l5-2.5M12 11v6.5" />
    </svg>
  );
};

function CargoHome({ onBackHome, onMarineCargoSelect, onAirCargoSelect, onInlandCargoSelect }) {
  const handleMarineCargoClick = () => {
    onMarineCargoSelect?.();
  };

  const handleAirCargoClick = () => {
    onAirCargoSelect?.();
  };

  const handleInlandTransitClick = () => {
    onInlandCargoSelect?.();
  };

  const getCardClickHandler = (optionId) => {
    if (optionId === 'cargo-marine') return handleMarineCargoClick;
    if (optionId === 'cargo-air') return handleAirCargoClick;
    return handleInlandTransitClick;
  };

  const handleCardKeyDown = (event, onCardClick) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onCardClick();
    }
  };

  return (
    <main className="cargo-page">
      <section className="cargo-wrap">
        {onBackHome ? (
          <button
            type="button"
            className="cargo-back-link"
            onClick={onBackHome}
          >
            ← Back to Home
          </button>
        ) : null}

        <section className="cargo-hero" aria-labelledby="cargo-hero-title">
          <div className="cargo-hero-content">
            <p className="cargo-hero-breadcrumb">Cargo & Transit Coverage</p>
            <h1 id="cargo-hero-title">Cargo Insurance</h1>
            <p className="cargo-hero-tagline">Protect Your Goods, Wherever They Go</p>
            <p className="cargo-hero-copy">
              Cargo insurance ensures your goods are protected against loss or damage during transit -
              whether by road, rail, air, or sea. From small shipments to large consignments, it
              safeguards your business from unexpected financial risks.
            </p>
            <section className="cargo-pill-list" aria-label="Cargo insurance highlights">
              {HERO_HIGHLIGHTS.map((item) => (
                <span key={item} className="cargo-pill">
                  {item}
                </span>
              ))}
            </section>
          </div>
          <div className="cargo-hero-media" aria-hidden="true">
            <img src={cargoHomeImage} alt="Cargo insurance" />
          </div>
        </section>

        <section className="cargo-types" aria-label="Types of cargo insurance">
          <section className="cargo-grid">
              {CARGO_OPTIONS.map((item) => {
                const onCardClick = getCardClickHandler(item.id);

                return (
                  <article
                    key={item.id}
                    className="cargo-card"
                    role="button"
                    tabIndex={0}
                    onClick={onCardClick}
                    onKeyDown={(event) => handleCardKeyDown(event, onCardClick)}
                  >
                    <div className="cargo-card-icon" aria-hidden="true">
                      {item.icon}
                    </div>
                    <div className="cargo-content">
                      <h3>{item.title}</h3>
                      <p>{item.subtitle}</p>
                      <button
                        type="button"
                        className="cargo-quote-btn"
                        onClick={(event) => {
                          event.stopPropagation();
                          onCardClick();
                        }}
                      >
                        Get a Quote
                      </button>
                    </div>
                  </article>
                );
              })}
          </section>
        </section>

        <section className="cargo-coverage" aria-labelledby="cargo-coverage-title">
          <header className="cargo-coverage-header">
            <h2 id="cargo-coverage-title">What Does Cargo Insurance Cover?</h2>
            <p>
              Cargo insurance is designed to protect your goods against a wide range of risks during transit.
              It ensures that your business is financially safeguarded from unexpected losses.
            </p>
          </header>

          <div className="cargo-coverage-grid">
            {COVERAGE_ITEMS.map((item) => (
              <article key={item.id} className="cargo-coverage-card">
                <div className={`cargo-coverage-icon cargo-coverage-icon--${item.icon}`} aria-hidden="true">
                  <CoverageIcon type={item.icon} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <InsuranceFaqAccordion
          title="Cargo Insurance FAQs"
          subtitle="Answers to common questions about coverage, eligibility, and policy options."
          items={cargoInsuranceFaqItems}
          buttonLabel="View More Cargo FAQs →"
        />
      </section>

      <Footer />
    </main>
  );
}

export default CargoHome;
