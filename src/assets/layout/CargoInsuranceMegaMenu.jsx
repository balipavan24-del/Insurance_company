import './CargoInsuranceMegaMenu.css';

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

function CargoInsuranceMegaMenu({
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

export default CargoInsuranceMegaMenu;
