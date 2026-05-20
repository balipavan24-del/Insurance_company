import './MotorInsuranceMegaMenu.css';

const MOTOR_COLUMNS = [
  {
    id: 'vehicles',
    title: 'Vehicle Types',
    tone: 'vehicles',
    links: [
      { id: 'motor-car', label: 'Car Insurance' },
      { id: 'motor-bike', label: 'Bike Insurance' },
      { id: 'motor-three-wheeler', label: 'Three Wheeler' },
      { id: 'motor-commercial-vehicle', label: 'Commercial Vehicle' },
    ],
  },
  {
    id: 'addons',
    title: 'Popular Add-ons',
    tone: 'addons',
    links: [
      { id: 'motor-addon-zero-depreciation', label: 'Zero Depreciation' },
      { id: 'motor-addon-roadside', label: 'Roadside Assistance' },
      { id: 'motor-addon-engine', label: 'Engine Protection' },
    ],
  },
  {
    id: 'tools',
    title: 'Quick Tools',
    tone: 'tools',
    links: [
      { id: 'motor-tool-premium-calculator', label: 'Premium Calculator' },
      { id: 'motor-tool-browse-plans', label: 'Browse Plans' },
      { id: 'motor-tool-claim-support', label: 'Claim Support' },
    ],
  },
];

function MotorColumnIcon({ tone }) {
  if (tone === 'vehicles') {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
        <path
          d="M5 11h14M7 16h2M15 16h2M6.5 11 7.8 8.5h8.4L17.5 11"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="8.5" cy="16" r="1.2" fill="currentColor" />
        <circle cx="15.5" cy="16" r="1.2" fill="currentColor" />
      </svg>
    );
  }
  if (tone === 'addons') {
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

function MotorInsuranceMegaMenu({
  isOpen,
  onSelect,
  variant = 'desktop',
  onMouseEnter,
  onMouseLeave,
}) {
  return (
    <div
      className={`motor-mega-menu motor-mega-menu--${variant} ${isOpen ? 'is-open' : ''}`}
      role="menu"
      aria-label="Motor insurance plans"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="motor-mega-menu__body">
        <aside className="motor-mega-menu__promo">
          <span className="motor-mega-menu__tag">
            <span className="motor-mega-menu__tag-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="14" height="14" focusable="false">
                <path
                  d="M5 11h14M7 16h2M15 16h2M6.5 11 7.8 8.5h8.4L17.5 11"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Drive Protected
          </span>
          <h3 className="motor-mega-menu__promo-title">Motor Insurance Plans</h3>
          <p className="motor-mega-menu__promo-text">
            Comprehensive coverage for every vehicle you own — quick quotes, instant policy issuance.
          </p>
          <div className="motor-mega-menu__instant-card" aria-hidden="true">
            <span className="motor-mega-menu__instant-icon">✦</span>
            <span>
              <strong>Compare in seconds</strong>
              <small>Best premiums from top insurers.</small>
            </span>
          </div>
        </aside>

        <div className="motor-mega-menu__columns">
          {MOTOR_COLUMNS.map((column) => (
            <div
              key={column.id}
              className={`motor-mega-menu__column motor-mega-menu__column--${column.tone}`}
            >
              <p className="motor-mega-menu__column-title">
                <span className={`motor-mega-menu__column-icon motor-mega-menu__column-icon--${column.tone}`}>
                  <MotorColumnIcon tone={column.tone} />
                </span>
                {column.title}
              </p>
              <ul className="motor-mega-menu__links">
                {column.links.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      className="motor-mega-menu__link"
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

export default MotorInsuranceMegaMenu;
