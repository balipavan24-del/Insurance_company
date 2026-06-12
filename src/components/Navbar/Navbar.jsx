/**
 * NAVBAR — routes wired directly on each menu item (path: "/...")
 *
 *   Navbar.jsx       → nav bar + menu data + paths
 *   NavDropdown.jsx  → dropdown links use <Link to={path}>
 */

import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DropdownChevron from '../Dropdown/DropdownChevron';
import BrandLogo from '../BrandLogo/BrandLogo';
import NavDropdown from './NavDropdown';
import './Navbar.css';

const RENEW_PLANS_ID = 'renewal-plans';

const NAV_ITEMS = [
  {
    id: 'motor-insurance',
    label: 'Motor Insurance',
    path: '/motor-insurance',
    dropdown: {
      theme: 'motor',
      ariaLabel: 'Motor insurance plans',
      promo: {
        tag: 'Drive Protected',
        title: 'Motor Insurance Plans',
        text: 'Comprehensive coverage for every vehicle you own — quick quotes, instant policy issuance.',
        cardTitle: 'Compare in seconds',
        cardSub: 'Best premiums from top insurers.',
      },
      columns: [
        {
          id: 'vehicles',
          title: 'Vehicle Types',
          tone: 'vehicles',
          links: [
            { id: 'motor-bike', label: 'Bike Insurance', path: '/motor-insurance/bike' },
            { id: 'motor-car', label: 'Car Insurance', path: '/motor-insurance/car' },
            { id: 'motor-three-wheeler', label: 'Three Wheeler', path: '/motor-insurance/three-wheeler' },
            { id: 'motor-commercial-vehicle', label: 'Commercial Vehicle', path: '/motor-insurance/commercial-vehicle' },
          ],
        },
        {
          id: 'addons',
          title: 'Popular Add-ons',
          tone: 'addons',
          links: [
            { id: 'motor-addon-zero-depreciation', label: 'Zero Depreciation', path: '/motor-insurance/car?addon=zero-depreciation' },
            { id: 'motor-addon-roadside', label: 'Roadside Assistance', path: '/motor-insurance/car?addon=roadside-assistance' },
            { id: 'motor-addon-engine', label: 'Engine Protection', path: '/motor-insurance/car?addon=engine-protection' },
          ],
        },
        {
          id: 'tools',
          title: 'Quick Tools',
          tone: 'tools',
          links: [
            { id: 'motor-tool-premium-calculator', label: 'Premium Calculator', path: '/motor-insurance/car?tool=premium-calculator' },
            { id: 'motor-tool-browse-plans', label: 'Browse Plans', path: '/motor-insurance/car' },
            { id: 'motor-tool-claim-support', label: 'Claim Support', path: '/contact-us' },
          ],
        },
      ],
    },
  },
  {
    id: 'health-insurance',
    label: 'Health Insurance',
    path: '/health-insurance',
    dropdown: {
      theme: 'health',
      ariaLabel: 'Health insurance plans',
      promo: {
        tag: 'Care Without Worry',
        title: 'Health Insurance Plans',
        text: 'Protect yourself and your family with cashless hospitalisation across 10,000+ hospitals.',
        cardTitle: 'Cashless network',
        cardSub: 'Pan-India hospital tie-ups.',
      },
      columns: [
        {
          id: 'family',
          title: 'For You & Family',
          tone: 'family',
          links: [
            { id: 'health-individual', label: 'Individual Health', path: '/health-insurance?plan=individual' },
            { id: 'health-family-floater', label: 'Family Floater', path: '/health-insurance?plan=family' },
            { id: 'health-senior-citizen', label: 'Senior Citizen', path: '/health-insurance?plan=senior' },
          ],
        },
        {
          id: 'specialised',
          title: 'Specialised Plans',
          tone: 'specialised',
          links: [
            { id: 'health-critical-illness', label: 'Critical Illness', path: '/health-insurance?plan=critical' },
            { id: 'health-top-up', label: 'Top-Up Plans', path: '/health-insurance?plan=top-up' },
          ],
        },
        {
          id: 'browse',
          title: 'Browse & Compare',
          tone: 'browse',
          links: [
            { id: 'health-all-plans', label: 'All Health Plans', path: '/health-insurance' },
            { id: 'health-premium-calculator', label: 'Premium Calculator', path: '/health-insurance?tool=premium-calculator' },
            { id: 'health-claim-support', label: 'Claim Support', path: '/contact-us' },
          ],
        },
      ],
    },
  },
  {
    id: 'business-insurance',
    label: 'Business Insurance',
    path: '/business-insurance',
    dropdown: {
      theme: 'business',
      ariaLabel: 'Business insurance plans',
      promo: {
        tag: 'Business Shield',
        title: 'Business Insurance Plans',
        text: 'Safeguard your business assets, premises and operations against unforeseen risks.',
        cardTitle: 'Tailored coverage',
        cardSub: 'Plans built for every business size.',
      },
      columns: [
        {
          id: 'property',
          title: 'Property Protection',
          tone: 'property',
          links: [
            { id: 'business-fire-damage', label: 'Fire Damage', path: '/business/fire' },
            { id: 'business-natural-disaster', label: 'Natural Disaster Cover', path: '/business-insurance/natural-disaster' },
          ],
        },
        {
          id: 'assets',
          title: 'Asset Security',
          tone: 'assets',
          links: [
            { id: 'business-theft-protection', label: 'Theft Protection', path: '/business-insurance/theft-protection' },
            { id: 'business-equipment-breakdown', label: 'Equipment Breakdown', path: '/business-insurance/equipment-breakdown' },
          ],
        },
        {
          id: 'tools',
          title: 'Quick Tools',
          tone: 'tools',
          links: [
            { id: 'business-all-plans', label: 'All Business Plans', path: '/business-insurance' },
            { id: 'business-premium-calculator', label: 'Premium Calculator', path: '/business-insurance?tool=premium-calculator' },
            { id: 'business-claim-support', label: 'Claim Support', path: '/contact-us' },
          ],
        },
      ],
    },
  },
  {
    id: 'cargo-insurance',
    label: 'Cargo Insurance',
    path: '/cargo-insurance',
    dropdown: {
      theme: 'cargo',
      ariaLabel: 'Cargo insurance solutions',
      promo: {
        tag: 'Goods in Transit',
        title: 'Cargo Insurance Solutions',
        text: 'End-to-end protection for shipments by sea, air, road and rail across borders.',
        cardTitle: 'Global coverage',
        cardSub: 'Door-to-door cargo protection.',
      },
      columns: [
        {
          id: 'mode',
          title: 'By Mode',
          tone: 'mode',
          links: [
            { id: 'cargo-marine', label: 'Marine Insurance', path: '/cargo-insurance/marine' },
            { id: 'cargo-air', label: 'Air Cargo Insurance', path: '/cargo-insurance/air' },
            { id: 'cargo-inland', label: 'Inland Transit (Road/Rail)', path: '/cargo-insurance/inland' },
          ],
        },
        {
          id: 'coverage',
          title: 'Coverage Types',
          tone: 'coverage',
          links: [
            { id: 'cargo-single-transit', label: 'Single Transit', path: '/cargo-insurance?coverage=single-transit' },
            { id: 'cargo-open-cover', label: 'Open Cover', path: '/cargo-insurance?coverage=open-cover' },
            { id: 'cargo-annual-policy', label: 'Annual Policy', path: '/cargo-insurance?coverage=annual-policy' },
          ],
        },
        {
          id: 'started',
          title: 'Get Started',
          tone: 'started',
          links: [
            { id: 'cargo-request-quote', label: 'Request a Quote', path: '/cargo-insurance/marine' },
            { id: 'cargo-claim-support', label: 'Claim Support', path: '/contact-us' },
            { id: 'cargo-track-request', label: 'Track Request', path: '/contact-us' },
          ],
        },
      ],
    },
  },
  {
    id: RENEW_PLANS_ID,
    label: 'Renew Plans',
    path: '/renew-plans/car',
    dropdown: {
      theme: 'renewal',
      ariaLabel: 'Renew plans',
      promo: {
        tag: 'Renew in Minutes',
        title: 'Renew Your Insurance Easily',
        text: 'Quickly renew your existing policies with uninterrupted coverage and hassle-free support.',
        cardTitle: 'Instant renewal',
        cardSub: 'No paperwork, Zero downtime',
      },
      columns: [
        {
          id: 'motor',
          title: 'Motor Insurance',
          tone: 'motor',
          links: [
            { id: 'renewal-motor-bike', label: 'Bike Insurance', path: '/renew-plans/bike' },
            { id: 'renewal-motor-car', label: 'Car Insurance', path: '/renew-plans/car' },
            { id: 'renewal-motor-three-wheeler', label: 'Three Wheeler', path: '/renew-plans/three-wheeler' },
            { id: 'renewal-motor-commercial', label: 'Commercial Vehicle', path: '/renew-plans/commercial-vehicle' },
          ],
        },
        {
          id: 'health',
          title: 'Health Insurance',
          tone: 'health',
          links: [
            { id: 'renewal-health-individual', label: 'Individual Health', path: '/health-insurance?flow=renewal&plan=individual' },
            { id: 'renewal-health-family', label: 'Family Floater', path: '/health-insurance?flow=renewal&plan=family' },
            { id: 'renewal-health-senior', label: 'Senior Citizen', path: '/health-insurance?flow=renewal&plan=senior' },
          ],
        },
        {
          id: 'life',
          title: 'Life Insurance',
          tone: 'life',
          links: [{ id: 'renewal-term', label: 'Term Insurance', path: '/term-insurance?flow=renewal' }],
        },
      ],
      footerActions: [
        { id: 'renewal-track-policy', label: 'Track Existing Policy', path: '/contact-us?topic=track-policy' },
        { id: 'renewal-download-copy', label: 'Download Policy Copy', path: '/contact-us?topic=policy-copy' },
        { id: 'renewal-claim-assistance', label: 'Claim Assistance', path: '/contact-us?topic=claim-assistance' },
      ],
    },
  },
  { id: 'support', label: 'Support', path: '/contact-us' },
];

const CLOSE_DELAY = 350;

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const closeTimer = useRef(null);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);

  const isMobile = () => window.matchMedia('(max-width: 1279px)').matches;

  function closeMenus() {
    setMobileOpen(false);
    setOpenMenuId(null);
  }

  function showMenu(menuId) {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }
    setOpenMenuId(menuId);
  }

  function hideMenuSoon(menuId) {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }
    closeTimer.current = setTimeout(() => {
      setOpenMenuId((current) => (current === menuId ? null : current));
    }, CLOSE_DELAY);
  }

  function onLabelClick(item) {
    if (item.id === RENEW_PLANS_ID || (isMobile() && item.dropdown)) {
      setOpenMenuId((current) => (current === item.id ? null : item.id));
      return;
    }
    if (item.path) {
      navigate(item.path);
      closeMenus();
    }
  }

  useEffect(() => {
    closeMenus();
  }, [location.pathname]);

  return (
    <nav
      className="navbar-container"
      onMouseLeave={() => {
        if (!isMobile() && openMenuId) {
          hideMenuSoon(openMenuId);
        }
      }}
    >
      <Link to="/" className="brand" aria-label="InsureEase home">
        <BrandLogo className="brand-logo--navbar" />
      </Link>

      <ul className={`nav-menu ${mobileOpen ? 'is-open' : ''}`}>
        {NAV_ITEMS.map((item) => {
          const isOpen = openMenuId === item.id;

          return (
            <li
              key={item.id}
              className={`nav-link-item${item.dropdown ? ' nav-link-item--mega' : ''}${isOpen ? ' dropdown-open' : ''}`}
              onMouseEnter={() => {
                if (!isMobile() && item.dropdown) {
                  showMenu(item.id);
                }
              }}
            >
              {item.dropdown ? (
                <>
                  <button
                    className="nav-label nav-dropdown-trigger"
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => onLabelClick(item)}
                  >
                    {item.label}
                    <DropdownChevron className="dropdown-arrow--nav" />
                  </button>

                  <NavDropdown
                    menu={item.dropdown}
                    isOpen={isOpen}
                    variant="desktop"
                    onNavigate={closeMenus}
                    onMouseEnter={() => !isMobile() && showMenu(item.id)}
                    onMouseLeave={() => !isMobile() && hideMenuSoon(item.id)}
                  />
                  <NavDropdown
                    menu={item.dropdown}
                    isOpen={isOpen}
                    variant="mobile"
                    onNavigate={closeMenus}
                  />
                </>
              ) : (
                <Link className="nav-label" to={item.path} onClick={closeMenus}>
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}

        <li className="nav-link-item login-item mobile-only">
          <Link className="nav-login-btn" to="/login" onClick={closeMenus}>
            Login
          </Link>
        </li>
      </ul>

      <div className="nav-right desktop-only">
        <Link className="nav-login-btn" to="/login">
          Login
        </Link>
      </div>

      <button
        className="mobile-more-btn"
        type="button"
        aria-expanded={mobileOpen}
        onClick={() => {
          setMobileOpen((open) => !open);
          setOpenMenuId(null);
        }}
      >
        <span className="hamburger-icon" aria-hidden="true">☰</span>
      </button>
    </nav>
  );
}

export default Navbar;
