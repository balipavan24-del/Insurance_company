import './RenewalPlansMegaMenu.css';

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

function RenewalPlansMegaMenu({
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
      aria-label="Renewal plans"
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

export default RenewalPlansMegaMenu;
