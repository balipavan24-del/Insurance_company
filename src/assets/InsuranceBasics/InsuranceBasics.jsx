import { Link } from 'react-router-dom';
import Footer from '../layout/Footer';
import insuranceBasicsHeroImg from '../icons/Insurance-Basics.png';
import {
  insuranceBasicsQuickCards,
  insuranceBasicsQuickSection,
  insuranceBasicsTypesCards,
  insuranceBasicsTypesSection,
} from '../../productContent';
import './InsuranceBasics.css';

function TypesInsuranceCardIcon({ name }) {
  switch (name) {
    case 'motor':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path
            fill="currentColor"
            d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"
          />
        </svg>
      );
    case 'term':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18 7 3.12v5.7c0 4.54-3.07 8.83-7 9.93-3.93-1.1-7-5.39-7-9.93V6.3l7-3.12zM11 7v6h2V7h-2zm0 8v2h2v-2h-2z"
          />
        </svg>
      );
    case 'cargo':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path
            fill="currentColor"
            d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm13-1c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM17 8V6h2.5l1.96 2H17z"
          />
        </svg>
      );
    case 'business':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V9h2v2zm0-4H6V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"
          />
        </svg>
      );
    case 'health':
    default:
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      );
  }
}

function QuickBasicsCardIcon({ name }) {
  switch (name) {
    case 'card':
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4V8h16v10zm-8-2c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"
          />
        </svg>
      );
    case 'document':
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"
          />
        </svg>
      );
    case 'gift':
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.96 1.66C13.1 4.54 12.05 4 11 4c-1.66 0-3 1.34-3 3 0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-7 8h-2v-2h2v2zm0-4h-2V8h2v2z"
          />
        </svg>
      );
    case 'wallet':
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M18 4H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm1 14H7c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1zm0-4H7c-.55 0-1-.45-1-1s.45-1 1-1h5c.55 0 1 .45 1 1s-.45 1-1 1h-1.5c-.83 0-1.5.67-1.5 1.5S10.67 14 11.5 14H13c.55 0 1 .45 1 1s-.45 1-1 1H7c-.55 0-1-.45-1-1s.45-1 1-1h1.5c.83 0 1.5-.67 1.5-1.5S9.33 11 8.5 11H7c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1z"
          />
        </svg>
      );
    case 'book':
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 4h2v5l-1-.75L9 9V4zm9 16H6V4h1v9l4 3 4-3V4h1v16z"
          />
        </svg>
      );
    case 'shield':
    default:
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2 4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1.1 13.2-3.2-3.15 1.4-1.43 1.8 1.77 4.3-4.22 1.4 1.42-5.7 5.61z"
          />
        </svg>
      );
  }
}

const BASICS_TAGS = [
  {
    id: 'beginner',
    label: 'Beginner Friendly',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 3 1 9l4 2.18V17c0 3.31 2.69 6.5 7 8 4.31-1.5 7-4.69 7-8V11.18L23 9 12 3zm0 2.84L18.53 9 12 12.16 5.47 9 12 5.84zM5 12.73l7 3.8 7-3.8V17c0 2.37-1.79 4.74-7 6.74-5.21-2-7-4.37-7-6.74v-4.27z"
        />
      </svg>
    ),
  },
  {
    id: 'explanations',
    label: 'Simple Explanations',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          fill="currentColor"
          d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4zm6 16H6v-2h6v2zm6 0h-4V4h4v16z"
        />
      </svg>
    ),
  },
  {
    id: 'guidance',
    label: 'Expert Guidance',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
        />
      </svg>
    ),
  },
  {
    id: 'tips',
    label: 'Smart Insurance Tips',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          fill="currentColor"
          d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"
        />
      </svg>
    ),
  },
];

function InsuranceBasics() {
  return (
    <div className="insurance-basics-page">
      <section
        className="insurance-basics insurance-basics--page-hero"
        aria-labelledby="insurance-basics-heading"
      >
        <div className="insurance-basics__blobs" aria-hidden="true">
          <span className="insurance-basics__blob insurance-basics__blob--left" />
          <span className="insurance-basics__blob insurance-basics__blob--right" />
        </div>

        <div className="insurance-basics__inner">
          <div className="insurance-basics__content">
            <span className="insurance-basics__badge">
              <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"
                />
              </svg>
              Insurance Learning Hub
            </span>

            <h1 id="insurance-basics-heading" className="insurance-basics__title">
              Insurance Made <span className="insurance-basics__title-accent">Simple</span> for Everyone
            </h1>

            <p className="insurance-basics__lead">
              Learn the fundamentals of insurance, understand important terms, and make smarter
              coverage decisions with confidence.
            </p>

            <ul className="insurance-basics__tags">
              {BASICS_TAGS.map((tag) => (
                <li key={tag.id}>
                  <span className="insurance-basics__tag">
                    {tag.icon}
                    {tag.label}
                  </span>
                </li>
              ))}
            </ul>

            <Link className="insurance-basics__cta" to="/">
              Explore insurance products
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41L13.17 12z"
                />
              </svg>
            </Link>
          </div>

          <div className="insurance-basics__visual">
            <div className="insurance-basics__visual-glow" aria-hidden="true" />
            <img
              className="insurance-basics__hero-image"
              src={insuranceBasicsHeroImg}
              alt="Shield protecting families with financial security"
              width={495}
              height={495}
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <section className="insurance-basics-quick" aria-labelledby="quick-basics-heading">
        <div className="insurance-basics-quick__inner">
          <p className="insurance-basics-quick__eyebrow">
            <span className="insurance-basics-quick__eyebrow-line" aria-hidden="true" />
            {insuranceBasicsQuickSection.eyebrow}
          </p>
          <h2 id="quick-basics-heading" className="insurance-basics-quick__title">
            {insuranceBasicsQuickSection.title}{' '}
            <span className="insurance-basics-quick__title-accent">{insuranceBasicsQuickSection.titleAccent}</span>
          </h2>
          <p className="insurance-basics-quick__subtitle">{insuranceBasicsQuickSection.subtitle}</p>

          <ul className="insurance-basics-quick__grid">
            {insuranceBasicsQuickCards.map((card) => (
              <li key={card.id}>
                <article className={`insurance-basics-quick-card insurance-basics-quick-card--${card.tone}`}>
                  <span className="insurance-basics-quick-card__blob" aria-hidden="true" />
                  <div className="insurance-basics-quick-card__index">
                    <span>{card.index}</span>
                    <span className="insurance-basics-quick-card__index-line" aria-hidden="true" />
                  </div>
                  <div className="insurance-basics-quick-card__body">
                    <div
                      className={`insurance-basics-quick-card__icon insurance-basics-quick-card__icon--${card.tone}`}
                    >
                      <QuickBasicsCardIcon name={card.icon} />
                    </div>
                    <div className="insurance-basics-quick-card__copy">
                      <h3 className="insurance-basics-quick-card__title">{card.title}</h3>
                      <p className="insurance-basics-quick-card__text">{card.description}</p>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="insurance-basics-types" aria-labelledby="types-insurance-heading">
        <div className="insurance-basics-types__inner">
          <header className="insurance-basics-types__header">
            <p className="insurance-basics-types__eyebrow">
              <span className="insurance-basics-types__eyebrow-line" aria-hidden="true" />
              {insuranceBasicsTypesSection.eyebrow}
              <span className="insurance-basics-types__eyebrow-line" aria-hidden="true" />
            </p>
            <h2 id="types-insurance-heading" className="insurance-basics-types__title">
              {insuranceBasicsTypesSection.title}{' '}
              <span className="insurance-basics-types__title-accent">
                {insuranceBasicsTypesSection.titleAccent}
              </span>
            </h2>
            <p className="insurance-basics-types__subtitle">{insuranceBasicsTypesSection.subtitle}</p>
          </header>

          <ul className="insurance-basics-types__grid">
            {insuranceBasicsTypesCards.map((card) => (
              <li key={card.id}>
                <Link
                  to={card.href}
                  className={`insurance-basics-types-card insurance-basics-types-card--${card.tone}`}
                >
                  <span className="insurance-basics-types-card__blob" aria-hidden="true" />
                  <div className="insurance-basics-types-card__head">
                    <span className={`insurance-basics-types-card__icon insurance-basics-types-card__icon--${card.tone}`}>
                      <TypesInsuranceCardIcon name={card.icon} />
                    </span>
                    <h3 className="insurance-basics-types-card__title">{card.title}</h3>
                  </div>
                  <p className="insurance-basics-types-card__text">{card.description}</p>
                  <footer className="insurance-basics-types-card__footer">
                    <span className="insurance-basics-types-card__cta">
                      <span className="insurance-basics-types-card__cta-dot" aria-hidden="true" />
                      {card.cta}
                    </span>
                    <span className="insurance-basics-types-card__arrow" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="18" height="18">
                        <path fill="currentColor" d="M13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41L13.17 12z" />
                      </svg>
                    </span>
                  </footer>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default InsuranceBasics;
