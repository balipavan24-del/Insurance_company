import { Link } from 'react-router-dom';
import insuranceBasicsHeroImg from '../icons/Insurance-Basics.png';
import './InsuranceBasicsHero.css';

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

function BasicsHeroVisual() {
  return (
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
  );
}

function InsuranceBasicsHero() {
  return (
    <section className="insurance-basics insurance-basics--page-hero" aria-labelledby="insurance-basics-heading">
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

        <BasicsHeroVisual />
      </div>
    </section>
  );
}

export default InsuranceBasicsHero;
