import { startTransition, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DropdownChevron from '../shared/DropdownChevron';
import BusinessInsuranceMegaMenu from './BusinessInsuranceMegaMenu';
import CargoInsuranceMegaMenu from './CargoInsuranceMegaMenu';
import HealthInsuranceMegaMenu from './HealthInsuranceMegaMenu';
import MotorInsuranceMegaMenu from './MotorInsuranceMegaMenu';
import RenewalPlansMegaMenu from './RenewalPlansMegaMenu';
import './Navbar.css';

const DROPDOWN_CLOSE_DELAY_MS = 350;

function Navbar({ onLoginClick, onMenuOptionSelect, onBrandClick }) {
  const location = useLocation();
  const navRef = useRef(null);
  const closeTimerRef = useRef(null);
  const scrollLockRef = useRef({ active: false, scrollY: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const isMobileView = () => window.matchMedia('(max-width: 1279px)').matches;

  const cancelCloseTimer = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openDropdownHover = (itemId) => {
    cancelCloseTimer();
    setOpenDropdown(itemId);
  };

  const scheduleCloseHover = (itemId) => {
    cancelCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setOpenDropdown((current) => (current === itemId ? null : current));
      closeTimerRef.current = null;
    }, DROPDOWN_CLOSE_DELAY_MS);
  };

  const MOTOR_INSURANCE_ID = 'motor-insurance';
  const HEALTH_INSURANCE_ID = 'health-insurance';
  const BUSINESS_INSURANCE_ID = 'business-insurance';
  const CARGO_INSURANCE_ID = 'cargo-insurance';
  const RENEWAL_PLANS_ID = 'renewal-plans';

  const menu = [
    {
      id: MOTOR_INSURANCE_ID,
      label: 'Motor Insurance',
      megaMenu: 'motor',
    },
    {
      id: HEALTH_INSURANCE_ID,
      label: 'Health Insurance',
      megaMenu: 'health',
    },
    {
      id: 'term-insurance',
      label: 'Term Insurance'
    },
    {
      id: BUSINESS_INSURANCE_ID,
      label: 'Business Insurance',
      megaMenu: 'business',
    },
    {
      id: CARGO_INSURANCE_ID,
      label: 'Cargo Insurance',
      megaMenu: 'cargo',
    },
    {
      id: RENEWAL_PLANS_ID,
      label: 'Renew Plans',
      megaMenu: 'renewal',
    },
    {
      id: 'support',
      label: 'Support'
    }
  ];

  const toggleDropdown = (itemId) => {
    setOpenDropdown((current) => (current === itemId ? null : itemId));
  };

  const handleNavParentClick = (item) => {
    if (isMobileView() && (item.dropdown || item.megaMenu)) {
      toggleDropdown(item.id);
      return;
    }

    handleOptionSelect(item.id);
  };

  const handleOptionSelect = (optionId) => {
    cancelCloseTimer();
    if (onMenuOptionSelect) {
      onMenuOptionSelect(optionId);
    }
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  useEffect(() => () => cancelCloseTimer(), []);

  useEffect(() => {
    cancelCloseTimer();
    startTransition(() => {
      setMobileMenuOpen(false);
      setOpenDropdown(null);
    });
    const activeElement = document.activeElement;
    if (navRef.current && activeElement instanceof HTMLElement && navRef.current.contains(activeElement)) {
      activeElement.blur();
    }
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 1279px)');

    const lockPageScroll = () => {
      if (scrollLockRef.current.active) return;

      const scrollY = window.scrollY || document.documentElement.scrollTop;
      scrollLockRef.current = { active: true, scrollY };

      document.documentElement.classList.add('navbar-scroll-lock');
      document.body.classList.add('navbar-scroll-lock');
      document.getElementById('root')?.classList.add('navbar-scroll-lock');

      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
    };

    const unlockPageScroll = () => {
      if (!scrollLockRef.current.active) return;

      const { scrollY } = scrollLockRef.current;
      scrollLockRef.current = { active: false, scrollY: 0 };

      document.documentElement.classList.remove('navbar-scroll-lock');
      document.body.classList.remove('navbar-scroll-lock');
      document.getElementById('root')?.classList.remove('navbar-scroll-lock');

      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';

      window.scrollTo(0, scrollY);
    };

    const isInsideNavOverlay = (target) => {
      if (!(target instanceof Node)) return false;
      if (navRef.current?.contains(target)) return true;
      if (!(target instanceof Element)) return false;
      return Boolean(
        target.closest(
          '.motor-mega-menu--desktop, .health-mega-menu--desktop, .business-mega-menu--desktop, .cargo-mega-menu--desktop, .renewal-mega-menu--desktop, .dropdown-menu'
        )
      );
    };

    const preventBackgroundScroll = (event) => {
      if (!scrollLockRef.current.active) return;
      if (isInsideNavOverlay(event.target)) return;
      event.preventDefault();
    };

    const preventWindowScroll = () => {
      if (!scrollLockRef.current.active) return;
      window.scrollTo(0, scrollLockRef.current.scrollY);
    };

    const syncScrollLock = () => {
      const isMobile = mobileQuery.matches;
      const shouldLock = isMobile && mobileMenuOpen;

      if (shouldLock) {
        lockPageScroll();
        document.addEventListener('touchmove', preventBackgroundScroll, { passive: false });
        document.addEventListener('wheel', preventBackgroundScroll, { passive: false });
        window.addEventListener('scroll', preventWindowScroll, { passive: false });
        return;
      }

      document.removeEventListener('touchmove', preventBackgroundScroll);
      document.removeEventListener('wheel', preventBackgroundScroll);
      window.removeEventListener('scroll', preventWindowScroll);
      unlockPageScroll();
    };

    syncScrollLock();
    mobileQuery.addEventListener('change', syncScrollLock);

    return () => {
      mobileQuery.removeEventListener('change', syncScrollLock);
      document.removeEventListener('touchmove', preventBackgroundScroll);
      document.removeEventListener('wheel', preventBackgroundScroll);
      window.removeEventListener('scroll', preventWindowScroll);
      unlockPageScroll();
    };
  }, [mobileMenuOpen, openDropdown]);

  const renderMegaMenu = (item) => {
    const isOpen = openDropdown === item.id;
    const commonProps = {
      isOpen,
      onSelect: handleOptionSelect,
    };

    if (item.megaMenu === 'motor') {
      return (
        <>
          <MotorInsuranceMegaMenu
            variant="desktop"
            {...commonProps}
            onMouseEnter={() => !isMobileView() && openDropdownHover(MOTOR_INSURANCE_ID)}
            onMouseLeave={() => !isMobileView() && scheduleCloseHover(MOTOR_INSURANCE_ID)}
          />
          <MotorInsuranceMegaMenu variant="mobile" {...commonProps} />
        </>
      );
    }

    if (item.megaMenu === 'health') {
      return (
        <>
          <HealthInsuranceMegaMenu
            variant="desktop"
            {...commonProps}
            onMouseEnter={() => !isMobileView() && openDropdownHover(HEALTH_INSURANCE_ID)}
            onMouseLeave={() => !isMobileView() && scheduleCloseHover(HEALTH_INSURANCE_ID)}
          />
          <HealthInsuranceMegaMenu variant="mobile" {...commonProps} />
        </>
      );
    }

    if (item.megaMenu === 'business') {
      return (
        <>
          <BusinessInsuranceMegaMenu
            variant="desktop"
            {...commonProps}
            onMouseEnter={() => !isMobileView() && openDropdownHover(BUSINESS_INSURANCE_ID)}
            onMouseLeave={() => !isMobileView() && scheduleCloseHover(BUSINESS_INSURANCE_ID)}
          />
          <BusinessInsuranceMegaMenu variant="mobile" {...commonProps} />
        </>
      );
    }

    if (item.megaMenu === 'cargo') {
      return (
        <>
          <CargoInsuranceMegaMenu
            variant="desktop"
            {...commonProps}
            onMouseEnter={() => !isMobileView() && openDropdownHover(CARGO_INSURANCE_ID)}
            onMouseLeave={() => !isMobileView() && scheduleCloseHover(CARGO_INSURANCE_ID)}
          />
          <CargoInsuranceMegaMenu variant="mobile" {...commonProps} />
        </>
      );
    }

    return (
      <>
        <RenewalPlansMegaMenu
          variant="desktop"
          {...commonProps}
          onMouseEnter={() => !isMobileView() && openDropdownHover(RENEWAL_PLANS_ID)}
          onMouseLeave={() => !isMobileView() && scheduleCloseHover(RENEWAL_PLANS_ID)}
        />
        <RenewalPlansMegaMenu variant="mobile" {...commonProps} />
      </>
    );
  };

  const handleNavMouseLeave = () => {
    if (!isMobileView() && openDropdown) {
      const openItem = menu.find((item) => item.id === openDropdown);
      if (openItem?.megaMenu) {
        scheduleCloseHover(openDropdown);
      }
    }
  };

  return (
    <nav
      ref={navRef}
      className="navbar-container"
      onMouseLeave={handleNavMouseLeave}
    >
      <button className="brand" type="button" onClick={onBrandClick}>
        <span className="brand-text">InsureEase</span>
      </button>
      <ul className={`nav-menu ${mobileMenuOpen ? 'is-open' : ''}`}>
        {menu.map((item) => (
          <li
            key={item.id}
            className={`nav-link-item${item.megaMenu ? ' nav-link-item--mega' : ''}${
              (item.dropdown || item.megaMenu) && openDropdown === item.id ? ' dropdown-open' : ''
            }`}
            onMouseEnter={() => {
              if (!isMobileView() && (item.dropdown || item.megaMenu)) {
                openDropdownHover(item.id);
              }
            }}
            onMouseLeave={() => {
              if (!isMobileView() && item.dropdown) {
                scheduleCloseHover(item.id);
              }
            }}
          >
            {item.megaMenu ? (
              <>
                <button
                  className="nav-label nav-dropdown-trigger"
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={openDropdown === item.id}
                  onClick={() => handleNavParentClick(item)}
                >
                  {item.label}
                  <DropdownChevron className="dropdown-arrow--nav" />
                </button>
                {renderMegaMenu(item)}
              </>
            ) : item.dropdown ? (
              <>
                <button
                  className="nav-label nav-dropdown-trigger"
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={openDropdown === item.id}
                  onClick={() => handleNavParentClick(item)}
                >
                  {item.label}
                  <DropdownChevron className="dropdown-arrow--nav" />
                </button>
                <ul
                  className={`dropdown-menu ${openDropdown === item.id ? 'is-open' : ''}`}
                  onMouseEnter={() => !isMobileView() && openDropdownHover(item.id)}
                  onMouseLeave={() => !isMobileView() && scheduleCloseHover(item.id)}
                >
                  {item.dropdown.map((option) => {
                    if (!option.children) {
                      return (
                        <li key={option.id}>
                          <button
                            className="dropdown-item"
                            type="button"
                            data-option-id={option.id}
                            onClick={() => handleOptionSelect(option.id)}
                          >
                            {option.label}
                          </button>
                        </li>
                      );
                    }

                    return (
                      <li key={option.id} className="dropdown-group">
                        <span className="dropdown-item dropdown-item-group">{option.label}</span>
                        <ul className="dropdown-submenu">
                          {(option.children ?? []).map((child) => (
                            <li key={child.id}>
                              <button
                                className="dropdown-item dropdown-subitem"
                                type="button"
                                data-option-id={child.id}
                                onClick={() => handleOptionSelect(child.id)}
                              >
                                {child.label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : (
              <button className="nav-label" type="button" onClick={() => handleOptionSelect(item.id)}>
                {item.label}
              </button>
            )}
          </li>
        ))}
        <li className="nav-link-item login-item mobile-only">
          <button className="nav-login-btn" type="button" onClick={onLoginClick}>Login</button>
        </li>
      </ul>
      <div className="nav-right desktop-only">
        <button className="nav-login-btn" type="button" onClick={onLoginClick}>Login</button>
      </div>
      <button
        className="mobile-more-btn"
        type="button"
        aria-label="Open navigation menu"
        aria-expanded={mobileMenuOpen}
        onClick={() => {
          cancelCloseTimer();
          setMobileMenuOpen((prev) => !prev);
          setOpenDropdown(null);
        }}
      >
        <span className="hamburger-icon" aria-hidden="true">☰</span>
      </button>
    </nav>
  );
}

export default Navbar;
