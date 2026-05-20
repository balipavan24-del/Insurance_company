import './BusinessInsuranceMegaMenu.css';

const BUSINESS_COLUMNS = [
  {
    id: 'property',
    title: 'Property Protection',
    tone: 'property',
    links: [
      { id: 'business-fire-damage', label: 'Fire Damage' },
      { id: 'business-natural-disaster', label: 'Natural Disaster Cover' },
    ],
  },
  {
    id: 'assets',
    title: 'Asset Security',
    tone: 'assets',
    links: [
      { id: 'business-theft-protection', label: 'Theft Protection' },
      { id: 'business-equipment-breakdown', label: 'Equipment Breakdown' },
    ],
  },
  {
    id: 'tools',
    title: 'Quick Tools',
    tone: 'tools',
    links: [
      { id: 'business-all-plans', label: 'All Business Plans' },
      { id: 'business-premium-calculator', label: 'Premium Calculator' },
      { id: 'business-claim-support', label: 'Claim Support' },
    ],
  },
];

function BusinessColumnIcon({ tone }) {
  if (tone === 'property') {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
        <path
          d="M12 3c-2.2 3.2-4 6.4-4 9.5a4 4 0 0 0 8 0c0-3.1-1.8-6.3-4-9.5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 14.5h5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (tone === 'assets') {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
        <path
          d="M12 3.5 4.5 7v5.5c0 4.2 3.2 7.4 7.5 8.5 4.3-1.1 7.5-4.3 7.5-8.5V7L12 3.5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="m9.2 12.2 2.1 2.1 3.5-3.8"
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
        d="M13 2 4 14h7l-1 8 10-14h-7l1-6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BusinessInsuranceMegaMenu({
  isOpen,
  onSelect,
  variant = 'desktop',
  onMouseEnter,
  onMouseLeave,
}) {
  return (
    <div
      className={`business-mega-menu business-mega-menu--${variant} ${isOpen ? 'is-open' : ''}`}
      role="menu"
      aria-label="Business insurance plans"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="business-mega-menu__body">
        <aside className="business-mega-menu__promo">
          <span className="business-mega-menu__tag">
            <span className="business-mega-menu__tag-icon" aria-hidden="true">⚡</span>
            Business Shield
          </span>
          <h3 className="business-mega-menu__promo-title">Business Insurance Plans</h3>
          <p className="business-mega-menu__promo-text">
            Safeguard your business assets, premises and operations against unforeseen risks.
          </p>
          <div className="business-mega-menu__instant-card" aria-hidden="true">
            <span className="business-mega-menu__instant-icon">✦</span>
            <span>
              <strong>Tailored coverage</strong>
              <small>Plans built for every business size.</small>
            </span>
          </div>
        </aside>

        <div className="business-mega-menu__columns">
          {BUSINESS_COLUMNS.map((column) => (
            <div
              key={column.id}
              className={`business-mega-menu__column business-mega-menu__column--${column.tone}`}
            >
              <p className="business-mega-menu__column-title">
                <span className={`business-mega-menu__column-icon business-mega-menu__column-icon--${column.tone}`}>
                  <BusinessColumnIcon tone={column.tone} />
                </span>
                {column.title}
              </p>
              <ul className="business-mega-menu__links">
                {column.links.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      className="business-mega-menu__link"
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

export default BusinessInsuranceMegaMenu;
