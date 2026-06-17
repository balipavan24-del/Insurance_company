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
//Main menu araay for navbar
const NAV_ITEMS = [
  {
    id: 'motor-insurance',
    label: 'Motor Insurance',
    path: '/motor-insurance',
    //drop downs for motor insurance
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
      //second left coloumn
      columns: [
        {
          id: 'vehicles',
          title: 'Vehicle Types',
          tone: 'vehicles',
          links: [
            { id: 'motor-bike', label: 'Bike Insurance', path: '/motor-insurance/bike' },/* path for the bike insurance page */
            { id: 'motor-car', label: 'Car Insurance', path: '/motor-insurance/car' },/* path for the car insurance page */
            { id: 'motor-three-wheeler', label: 'Three Wheeler', path: '/motor-insurance/three-wheeler' },/* path for the three wheeler insurance page */
            { id: 'motor-commercial-vehicle', label: 'Commercial Vehicle', path: '/motor-insurance/commercial-vehicle' },/* path for the commercial vehicle insurance page */
          ],
        },
        //third left coloumn
        {
          id: 'addons',
          title: 'Popular Add-ons',
          tone: 'addons',
          links: [
            { id: 'motor-addon-zero-depreciation', label: 'Zero Depreciation', path: '/motor-insurance/car?addon=zero-depreciation' },/* path for the zero depreciation insurance page */
            { id: 'motor-addon-roadside', label: 'Roadside Assistance', path: '/motor-insurance/car?addon=roadside-assistance' }, /* path for the roadside assistance insurance page */
            { id: 'motor-addon-engine', label: 'Engine Protection', path: '/motor-insurance/car?addon=engine-protection' }, /* path for the engine protection insurance page */
          ],
        },
        //fourth left coloumn
        {
          id: 'tools',
          title: 'Quick Tools',
          tone: 'tools',
          links: [
            { id: 'motor-tool-premium-calculator', label: 'Premium Calculator', path: '/motor-insurance/car?tool=premium-calculator' },/* path for the premium calculator tool */
            { id: 'motor-tool-browse-plans', label: 'Browse Plans', path: '/motor-insurance/car' },/* path for the browse plans tool */ 
            { id: 'motor-tool-claim-support', label: 'Claim Support', path: '/contact-us' },/* path for the claim support tool */
          ],
        },
      ],
    },
  },
  {
    id: 'health-insurance',
    label: 'Health Insurance',
    path: '/health-insurance',
    //drop downs for health insurance
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
            { id: 'health-individual', label: 'Individual Health', path: '/health-insurance?plan=individual' }, /* path for the individual health insurance page */
            { id: 'health-family-floater', label: 'Family Floater', path: '/health-insurance?plan=family' }, /* path for the family floater insurance page */
            { id: 'health-senior-citizen', label: 'Senior Citizen', path: '/health-insurance?plan=senior' }, /* path for the senior citizen insurance page */
          ],
        },
        //second left coloumn
        {
          id: 'specialised',
          title: 'Specialised Plans',
          tone: 'specialised',
          links: [
            { id: 'health-critical-illness', label: 'Critical Illness', path: '/health-insurance?plan=critical' }, /* path for the critical illness insurance page */
            { id: 'health-top-up', label: 'Top-Up Plans', path: '/health-insurance?plan=top-up' }, /* path for the top-up insurance page */
          ],
        },
        //third left coloumn
        {
          id: 'browse',
          title: 'Browse & Compare',
          tone: 'browse',
          links: [
            { id: 'health-all-plans', label: 'All Health Plans', path: '/health-insurance' }, /* path for the all health plans page */
            { id: 'health-premium-calculator', label: 'Premium Calculator', path: '/health-insurance?tool=premium-calculator' }, /* path for the premium calculator tool */
            { id: 'health-claim-support', label: 'Claim Support', path: '/contact-us' }, /* path for the claim support tool */
          ],
        },
      ],
    },
  },
  {
    id: 'business-insurance',
    label: 'Business Insurance',
    path: '/business-insurance',
    //drop downs for business insurance
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

          //first left coloumn
          id: 'property',
          title: 'Property Protection',
          tone: 'property',
          links: [
            { id: 'business-fire-damage', label: 'Fire Damage', path: '/business/fire' },/* path for the fire damage insurance page */
            { id: 'business-natural-disaster', label: 'Natural Disaster Cover', path: '/business-insurance/natural-disaster' },/* path for the natural disaster insurance page */
          ],
        },
        {
          //second left coloumn
          id: 'assets',
          title: 'Asset Security',
          tone: 'assets',
          links: [
            { id: 'business-theft-protection', label: 'Theft Protection', path: '/business-insurance/theft-protection' },/* path for the theft protection insurance page */
            { id: 'business-equipment-breakdown', label: 'Equipment Breakdown', path: '/business-insurance/equipment-breakdown' },/* path for the equipment breakdown insurance page */
          ],
        },
        {
          //third left coloumn
          id: 'tools',
          title: 'Quick Tools',
          tone: 'tools',
          links: [
            { id: 'business-all-plans', label: 'All Business Plans', path: '/business-insurance' },/* path for the all business plans page */
            { id: 'business-premium-calculator', label: 'Premium Calculator', path: '/business-insurance?tool=premium-calculator' },/* path for the premium calculator tool */
            { id: 'business-claim-support', label: 'Claim Support', path: '/contact-us' },/* path for the claim support tool */
          ],
        },
      ],
    },
  },
  {
    id: 'cargo-insurance',
    label: 'Cargo Insurance',
    path: '/cargo-insurance',
    //drop downs for cargo insurance
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
          //first left coloumn
          id: 'mode',
          title: 'By Mode',
          tone: 'mode',
          links: [
            { id: 'cargo-marine', label: 'Marine Insurance', path: '/cargo-insurance/marine' },/* path for the marine insurance page */
            { id: 'cargo-air', label: 'Air Cargo Insurance', path: '/cargo-insurance/air' },/* path for the air cargo insurance page */
            { id: 'cargo-inland', label: 'Inland Transit (Road/Rail)', path: '/cargo-insurance/inland' },/* path for the inland transit insurance page */
          ],
        },
        {
          //second left coloumn
          id: 'coverage',
          title: 'Coverage Types',
          tone: 'coverage',
          links: [
            { id: 'cargo-single-transit', label: 'Single Transit', path: '/cargo-insurance?coverage=single-transit' },/* path for the single transit insurance page */
            { id: 'cargo-open-cover', label: 'Open Cover', path: '/cargo-insurance?coverage=open-cover' },/* path for the open cover insurance page */
            { id: 'cargo-annual-policy', label: 'Annual Policy', path: '/cargo-insurance?coverage=annual-policy' },/* path for the annual policy insurance page */
          ],
        },
        {
          //third left coloumn
          id: 'started',
          title: 'Get Started',
          tone: 'started',
          links: [
            { id: 'cargo-request-quote', label: 'Request a Quote', path: '/cargo-insurance/marine' },/* path for the request a quote insurance page */
            { id: 'cargo-claim-support', label: 'Claim Support', path: '/contact-us' },/* path for the claim support tool */
            { id: 'cargo-track-request', label: 'Track Request', path: '/contact-us' },/* path for the track request tool */
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
      //drop downs for renewal plans
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
          //first left coloumn
          id: 'motor',
          title: 'Motor Insurance',
          tone: 'motor',
          links: [
            { id: 'renewal-motor-bike', label: 'Bike Insurance', path: '/renew-plans/bike' },/* path for the bike insurance page */
            { id: 'renewal-motor-car', label: 'Car Insurance', path: '/renew-plans/car' },/* path for the car insurance page */
            { id: 'renewal-motor-three-wheeler', label: 'Three Wheeler', path: '/renew-plans/three-wheeler' },/* path for the three wheeler insurance page */
            { id: 'renewal-motor-commercial', label: 'Commercial Vehicle', path: '/renew-plans/commercial-vehicle' },/* path for the commercial vehicle insurance page */
          ],
        },
        {
          //second left coloumn
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
          //third left coloumn  
          id: 'life',
          title: 'Life Insurance',
          tone: 'life',
          links: [{ id: 'renewal-term', label: 'Term Insurance', path: '/term-insurance?flow=renewal' }],
        },
      ],
      footerActions: [
        { id: 'renewal-track-policy', label: 'Track Existing Policy', path: '/contact-us?topic=track-policy' },/* path for the track existing policy tool */
        { id: 'renewal-download-copy', label: 'Download Policy Copy', path: '/contact-us?topic=policy-copy' },/* path for the download policy copy tool */
        { id: 'renewal-claim-assistance', label: 'Claim Assistance', path: '/contact-us?topic=claim-assistance' },/* path for the claim assistance tool */
      ],
    },
  },
  { id: 'support', label: 'Support', path: '/contact-us' },
];
//hear is the ending point for navitems list

const CLOSE_DELAY = 350;

/** Builds menu list class — adds is-open when mobile drawer is open */
function navMenuClassName(isMobileMenuOpen) {
  if (isMobileMenuOpen) {
    return 'nav-menu is-open';
  }
  return 'nav-menu';
}

/** Builds one menu item class string */
function navItemClassName(item, isOpen) {
  const classes = ['nav-item'];

  if (item.dropdown) {
    classes.push('nav-item--mega');
  }
  if (isOpen) {
    classes.push('is-open');
  }

  return classes.join(' ');
}

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
    if (item.id === RENEW_PLANS_ID) {
      setOpenMenuId((current) => (current === item.id ? null : item.id));
      return;
    }
    if (item.path) {
      navigate(item.path);
      closeMenus();
    }
  }

  function handleNavMouseLeave() {
    if (!isMobile() && openMenuId) {
      hideMenuSoon(openMenuId);
    }
  }

  function handleItemMouseEnter(item) {
    if (!isMobile() && item.dropdown) {
      showMenu(item.id);
    }
  }

  function toggleMobileMenu() {
    setMobileOpen((open) => !open);
    setOpenMenuId(null);
  }

  /** One NAV_ITEMS object → one <li> on screen */
  function renderNavItem(item) {
    const isOpen = openMenuId === item.id;
    const itemClass = navItemClassName(item, isOpen);

    if (item.dropdown) {
      return (
        <li
          key={item.id}
          className={itemClass}
          onMouseEnter={() => handleItemMouseEnter(item)}
        >
          {/* Desktop: label + dropdown panel */}
          <button
            className="nav-text nav-btn desk"
            type="button"
            aria-expanded={isOpen}
            onClick={() => onLabelClick(item)}
          >
            {item.label}
            <DropdownChevron className="dropdown-arrow--nav" />
          </button>
{/* here is the props for the NavDropdown component the prop variant is desktop and items is 
menu,isOpen,variant,onNavigate,onMouseEnter,onMouseLeave menu is the parent prop for dropdown component*/ }
          <NavDropdown
            menu={item.dropdown}
            isOpen={isOpen}
            variant="desktop"
            onNavigate={closeMenus}
            onMouseEnter={() => showMenu(item.id)}
            onMouseLeave={() => hideMenuSoon(item.id)}
          />

          {/* Mobile: go straight to home page */}
          <Link className="nav-text mob" to={item.path} onClick={closeMenus}>
            {item.label}
          </Link>
        </li>
      );
    }

    return (
      <li key={item.id} className={itemClass}>
        <Link className="nav-text" to={item.path} onClick={closeMenus}>
          {item.label}
        </Link>
      </li>
    );
  }

  useEffect(() => {
    closeMenus();
  }, [location.pathname]);

  return (
    <nav className="navbar-container" onMouseLeave={handleNavMouseLeave}>
      {/* Logo */}
      <Link to="/" className="brand" aria-label="InsureEase home">
        <BrandLogo className="brand-logo--navbar" />
      </Link>

      {/* Menu list — one li per NAV_ITEMS object */}
      <ul className={navMenuClassName(mobileOpen)}>
        {NAV_ITEMS.map(renderNavItem)}

        <li className="nav-item nav-login mob">
          <Link className="login-btn" to="/login" onClick={closeMenus}>
            Login
          </Link>
        </li>
      </ul>

      {/* Desktop login */}
      <div className="nav-end desk">
        <Link className="login-btn" to="/login">
          Login
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button
        className="menu-btn"
        type="button"
        aria-expanded={mobileOpen}
        onClick={toggleMobileMenu}
      >
        <span className="menu-icon" aria-hidden="true">☰</span>
      </button>
    </nav>
  );
}

export default Navbar;
