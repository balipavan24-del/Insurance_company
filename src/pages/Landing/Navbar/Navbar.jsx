import { useState } from 'react';
import '../Navbar.css';

function Navbar({ onLoginClick, onMenuOptionSelect, onBrandClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const isMobileView = () => window.matchMedia('(max-width: 1279px)').matches;

  const menu = [
    {
      id: 'health-insurance',
      label: 'Health Insurance',
      dropdown: [
        { id: 'health-family', label: 'Health Insurance for family' },
        { id: 'health-parents', label: 'Health insurance for parents' },
        { id: 'health-senior-citizens', label: 'Health Insurance for senior citizens' }
      ]
    },
    {
      id: 'motor-insurance',
      label: 'Motor Insurance',
      dropdown: [
        { id: 'motor-car', label: 'Car' },
        { id: 'motor-bike', label: 'Bike' },
        { id: 'motor-three-wheeler', label: 'Three Wheeler' },
        { id: 'motor-commercial-vehicle', label: 'Commercial Vehicle' }
      ]
    },
    {
      id: 'cargo-insurance',
      label: 'Cargo Insurance',
      dropdown: [
        { id: 'cargo-marine', label: 'Marine' },
        { id: 'cargo-air', label: 'Air' },
        {
          id: 'cargo-inland',
          label: 'Inland',
          children: [
            { id: 'cargo-inland-road', label: 'Road' },
            { id: 'cargo-inland-rail', label: 'Rail' }
          ]
        }
      ]
    },
    {
      id: 'property-insurance',
      label: 'Business Insurance',
      dropdown: [{ id: 'property-personal', label: 'Personal' }]
    },
    {
      id: 'term-insurance',
      label: 'Term Insurance'
    },
    {
      id: 'renewal-policy',
      label: 'Renewal Policy'
    },
    {
      id: 'support',
      label: 'Support'
    }
  ];

  const toggleDropdown = (itemId) => {
    setOpenDropdown((current) => (current === itemId ? null : itemId));
  };

  const handleDropdownClick = (itemId) => {
    if (isMobileView()) {
      toggleDropdown(itemId);
    }
  };

  const handleOptionSelect = (optionId) => {
    if (onMenuOptionSelect) {
      onMenuOptionSelect(optionId);
    }
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <nav className="navbar-container">
      <button className="brand" type="button" onClick={onBrandClick}>InsureEase</button>
      <ul className={`nav-menu ${mobileMenuOpen ? 'is-open' : ''}`}>
        {menu.map((item) => (
          <li
            key={item.id}
            className="nav-link-item"
            onMouseEnter={() => !isMobileView() && item.dropdown && setOpenDropdown(item.id)}
            onMouseLeave={() => !isMobileView() && setOpenDropdown(null)}
          >
            {item.dropdown ? (
              <>
                <button
                  className="nav-label nav-dropdown-trigger"
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={openDropdown === item.id}
                  onClick={() => {
                    if (item.id === 'health-insurance' || item.id === 'cargo-insurance' || item.id === 'property-insurance') {
                      handleOptionSelect(item.id);
                      return;
                    }
                    handleDropdownClick(item.id);
                  }}
                >
                  {item.label}
                  <span className={`dropdown-caret ${openDropdown === item.id ? 'is-open' : ''}`}>▾</span>
                </button>
                <ul className={`dropdown-menu ${openDropdown === item.id ? 'is-open' : ''}`}>
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
                          {option.children.map((child) => (
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
          setMobileMenuOpen((prev) => !prev);
          setOpenDropdown(null);
        }}
      >
        ⋯
      </button>
    </nav>
  );
}

export default Navbar;
