import './HealthInsuranceMegaMenu.css';

const HEALTH_COLUMNS = [
  {
    id: 'family',
    title: 'For You & Family',
    tone: 'family',
    links: [
      { id: 'health-individual', label: 'Individual Health' },
      { id: 'health-family-floater', label: 'Family Floater' },
      { id: 'health-senior-citizen', label: 'Senior Citizen' },
    ],
  },
  {
    id: 'specialised',
    title: 'Specialised Plans',
    tone: 'specialised',
    links: [
      { id: 'health-critical-illness', label: 'Critical Illness' },
      { id: 'health-top-up', label: 'Top-Up Plans' },
    ],
  },
  {
    id: 'browse',
    title: 'Browse & Compare',
    tone: 'browse',
    links: [
      { id: 'health-all-plans', label: 'All Health Plans' },
      { id: 'health-premium-calculator', label: 'Premium Calculator' },
      { id: 'health-claim-support', label: 'Claim Support' },
    ],
  },
];

function HealthColumnIcon({ tone }) {
  if (tone === 'family') {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
        <path
          d="M12 20.5s-6.5-4.35-6.5-9.2a4.25 4.25 0 0 1 7.5-2.6 4.25 4.25 0 0 1 7.5 2.6c0 4.85-6.5 9.2-6.5 9.2Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M6.5 14.5h11"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (tone === 'specialised') {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
        <path
          d="M4 12h2l1.5-3 2.5 6 2-4 1.5 3H20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path
        d="M8.5 11.5c0-1.25 1-2.25 2.25-2.25h2.5c1.25 0 2.25 1 2.25 2.25v1.25c0 .55-.45 1-1 1h-5c-.55 0-1-.45-1-1v-1.25Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M7 13.75c-1.1.75-1.75 1.75-1.75 3v1.25h13.5V16.75c0-1.25-.65-2.25-1.75-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.25 9.25 10.75 7.5M14.75 9.25 13.25 7.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HealthInsuranceMegaMenu({
  isOpen,
  onSelect,
  variant = 'desktop',
  onMouseEnter,
  onMouseLeave,
}) {
  return (
    <div
      className={`health-mega-menu health-mega-menu--${variant} ${isOpen ? 'is-open' : ''}`}
      role="menu"
      aria-label="Health insurance plans"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="health-mega-menu__body">
        <aside className="health-mega-menu__promo">
          <span className="health-mega-menu__tag">
            <span className="health-mega-menu__tag-icon" aria-hidden="true">⚡</span>
            Care Without Worry
          </span>
          <h3 className="health-mega-menu__promo-title">Health Insurance Plans</h3>
          <p className="health-mega-menu__promo-text">
            Protect yourself and your family with cashless hospitalisation across 10,000+ hospitals.
          </p>
          <div className="health-mega-menu__instant-card" aria-hidden="true">
            <span className="health-mega-menu__instant-icon">✦</span>
            <span>
              <strong>Cashless network</strong>
              <small>Pan-India hospital tie-ups.</small>
            </span>
          </div>
        </aside>

        <div className="health-mega-menu__columns">
          {HEALTH_COLUMNS.map((column) => (
            <div
              key={column.id}
              className={`health-mega-menu__column health-mega-menu__column--${column.tone}`}
            >
              <p className="health-mega-menu__column-title">
                <span className={`health-mega-menu__column-icon health-mega-menu__column-icon--${column.tone}`}>
                  <HealthColumnIcon tone={column.tone} />
                </span>
                {column.title}
              </p>
              <ul className="health-mega-menu__links">
                {column.links.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      className="health-mega-menu__link"
                      role="menuitem"
                      onClick={() => onSelect(link.id)}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HealthInsuranceMegaMenu;
