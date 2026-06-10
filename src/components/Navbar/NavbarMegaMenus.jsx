/**
 * NavbarMegaMenus.jsx
 * All navbar dropdown (mega menu) panels in one place.
 *
 * Each menu has:
 *   - COLUMN data  → link groups shown in the dropdown
 *   - Icon helpers → small SVG icons per column
 *   - Component    → desktop + mobile panel (variant prop)
 *
 * Styling lives in separate CSS files (one per product theme).
 * Navigation after click is handled by Navbar → menuNavigation.js
 */

import './NavbarMegaMenus.css';

// =============================================================================
// MOTOR INSURANCE MEGA MENU
// Dropdown for: Navbar → "Motor Insurance"
// =============================================================================

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

export function MotorInsuranceMegaMenu({
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

// =============================================================================
// HEALTH INSURANCE MEGA MENU
// Dropdown for: Navbar → "Health Insurance"
// =============================================================================

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

export function HealthInsuranceMegaMenu({
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

// =============================================================================
// BUSINESS INSURANCE MEGA MENU
// Dropdown for: Navbar → "Business Insurance"
// =============================================================================

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

export function BusinessInsuranceMegaMenu({
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

// =============================================================================
// CARGO INSURANCE MEGA MENU
// Dropdown for: Navbar → "Cargo Insurance"
// =============================================================================

const CARGO_COLUMNS = [
  {
    id: 'mode',
    title: 'By Mode',
    tone: 'mode',
    links: [
      { id: 'cargo-marine', label: 'Marine Insurance' },
      { id: 'cargo-air', label: 'Air Cargo Insurance' },
      { id: 'cargo-inland', label: 'Inland Transit (Road/Rail)' },
    ],
  },
  {
    id: 'coverage',
    title: 'Coverage Types',
    tone: 'coverage',
    links: [
      { id: 'cargo-single-transit', label: 'Single Transit' },
      { id: 'cargo-open-cover', label: 'Open Cover' },
      { id: 'cargo-annual-policy', label: 'Annual Policy' },
    ],
  },
  {
    id: 'started',
    title: 'Get Started',
    tone: 'started',
    links: [
      { id: 'cargo-request-quote', label: 'Request a Quote' },
      { id: 'cargo-claim-support', label: 'Claim Support' },
      { id: 'cargo-track-request', label: 'Track Request' },
    ],
  },
];

function CargoColumnIcon({ tone }) {
  if (tone === 'mode') {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
        <path
          d="M4 14h16M6 14V9l3-4h6l3 4v5M7 17h2M15 17h2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 9h8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (tone === 'coverage') {
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

export function CargoInsuranceMegaMenu({
  isOpen,
  onSelect,
  variant = 'desktop',
  onMouseEnter,
  onMouseLeave,
}) {
  return (
    <div
      className={`cargo-mega-menu cargo-mega-menu--${variant} ${isOpen ? 'is-open' : ''}`}
      role="menu"
      aria-label="Cargo insurance solutions"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="cargo-mega-menu__body">
        <aside className="cargo-mega-menu__promo">
          <span className="cargo-mega-menu__tag">
            <span className="cargo-mega-menu__tag-icon" aria-hidden="true">⚡</span>
            Goods in Transit
          </span>
          <h3 className="cargo-mega-menu__promo-title">Cargo Insurance Solutions</h3>
          <p className="cargo-mega-menu__promo-text">
            End-to-end protection for shipments by sea, air, road and rail across borders.
          </p>
          <div className="cargo-mega-menu__instant-card" aria-hidden="true">
            <span className="cargo-mega-menu__instant-icon">✦</span>
            <span>
              <strong>Global coverage</strong>
              <small>Door-to-door cargo protection.</small>
            </span>
          </div>
        </aside>

        <div className="cargo-mega-menu__columns">
          {CARGO_COLUMNS.map((column) => (
            <div
              key={column.id}
              className={`cargo-mega-menu__column cargo-mega-menu__column--${column.tone}`}
            >
              <p className="cargo-mega-menu__column-title">
                <span className={`cargo-mega-menu__column-icon cargo-mega-menu__column-icon--${column.tone}`}>
                  <CargoColumnIcon tone={column.tone} />
                </span>
                {column.title}
              </p>
              <ul className="cargo-mega-menu__links">
                {column.links.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      className="cargo-mega-menu__link"
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

// =============================================================================
// RENEWAL PLANS MEGA MENU
// Dropdown for: Navbar → "Renew Plans"
// (includes extra Quick Actions footer — unique to this menu)
// =============================================================================

const RENEWAL_COLUMNS = [
  {
    id: 'motor',
    title: 'Motor Insurance',
    tone: 'motor',
    links: [
      { id: 'renewal-motor-car', label: 'Car Insurance' },
      { id: 'renewal-motor-bike', label: 'Bike Insurance' },
      { id: 'renewal-motor-commercial', label: 'Commercial Vehicle' },
      { id: 'renewal-motor-three-wheeler', label: 'Three Wheeler' },
    ],
  },
  {
    id: 'health',
    title: 'Health Insurance',
    tone: 'health',
    links: [
      { id: 'renewal-health-individual', label: 'Individual Health' },
      { id: 'renewal-health-family', label: 'Family Floater' },
      { id: 'renewal-health-senior', label: 'Senior Citizen' },
    ],
  },
  {
    id: 'life',
    title: 'Life Insurance',
    tone: 'life',
    links: [{ id: 'renewal-term', label: 'Term Insurance' }],
  },
];

const QUICK_ACTIONS = [
  { id: 'renewal-track-policy', label: 'Track Existing Policy', icon: 'track' },
  { id: 'renewal-download-copy', label: 'Download Policy Copy', icon: 'download' },
  { id: 'renewal-claim-assistance', label: 'Claim Assistance', icon: 'claim' },
];

function RenewalColumnIcon({ tone }) {
  if (tone === 'motor') {
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
  if (tone === 'health') {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
        <path
          d="M12 20.5s-6.5-4.2-6.5-9.2a4.5 4.5 0 0 1 8.2-2.6 4.5 4.5 0 0 1 8.2 2.6c0 5-6.5 9.2-6.5 9.2Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M12 8v5M9.5 10.5h5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }
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

function QuickActionIcon({ name }) {
  if (name === 'track') {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
        <path
          d="M8 6h11M8 12h11M8 18h11M5 6h.5M5 12h.5M5 18h.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (name === 'download') {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
        <path
          d="M12 4v10M8.5 10.5 12 14l3.5-3.5M5 18h14"
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
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
      <path
        d="M4 14.5a8 8 0 0 1 16 0M12 17v3M9.5 20h5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RenewalPlansMegaMenu({
  isOpen,
  onSelect,
  variant = 'desktop',
  onMouseEnter,
  onMouseLeave,
}) {
  return (
    <div
      className={`renewal-mega-menu renewal-mega-menu--${variant} ${isOpen ? 'is-open' : ''}`}
      role="menu"
      aria-label="Renew plans"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="renewal-mega-menu__body">
        <aside className="renewal-mega-menu__promo">
          <span className="renewal-mega-menu__tag">
            <span className="renewal-mega-menu__tag-icon" aria-hidden="true">⚡</span>
            Renew in Minutes
          </span>
          <h3 className="renewal-mega-menu__promo-title">Renew Your Insurance Easily</h3>
          <p className="renewal-mega-menu__promo-text">
            Quickly renew your existing policies with uninterrupted coverage and hassle-free support.
          </p>
          <div className="renewal-mega-menu__instant-card" aria-hidden="true">
            <span className="renewal-mega-menu__instant-icon">✦</span>
            <span>
              <strong>Instant renewal</strong>
              <small>No paperwork, Zero downtime</small>
            </span>
          </div>
        </aside>

        <div className="renewal-mega-menu__columns">
          {RENEWAL_COLUMNS.map((column) => (
            <div
              key={column.id}
              className={`renewal-mega-menu__column renewal-mega-menu__column--${column.tone}`}
            >
              <p className="renewal-mega-menu__column-title">
                <span className={`renewal-mega-menu__column-icon renewal-mega-menu__column-icon--${column.tone}`}>
                  <RenewalColumnIcon tone={column.tone} />
                </span>
                {column.title}
              </p>
              <ul className="renewal-mega-menu__links">
                {column.links.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      className="renewal-mega-menu__link"
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

      <footer className="renewal-mega-menu__footer">
        <p className="renewal-mega-menu__footer-label">Quick Actions</p>
        <ul className="renewal-mega-menu__actions">
          {QUICK_ACTIONS.map((action) => (
            <li key={action.id}>
              <button
                type="button"
                className="renewal-mega-menu__action"
                role="menuitem"
                onClick={() => onSelect(action.id)}
              >
                <span className="renewal-mega-menu__action-icon" aria-hidden="true">
                  <QuickActionIcon name={action.icon} />
                </span>
                {action.label}
              </button>
            </li>
          ))}
        </ul>
      </footer>
    </div>
  );
}
