import { useState } from 'react';
import './Navbar.css'; 

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const isMobileView = () => window.matchMedia('(max-width: 980px)').matches;

  const menu = [
    {
      label: 'Health',
      dropdown: ['Family', 'Parents', 'Senior Citizen']
    },
    {
      label: 'Motor Insurance',
      dropdown: ['Car', 'Bike', 'Three Wheeler', '4 Wheeler', 'Commercial Vehicle']
    },
    {
      label: 'Cargo',
      dropdown: ['Marine', 'Air', 'Inland (Road/Rail)']
    },
    {
      label: 'Business',
      dropdown: ['Personal Insurance']
    },
    {
      label: 'Term'
    },
    {
      label: 'Renewal Policy'
    },
    {
      label: 'Support'
    }
  ];

  const toggleDropdown = (itemLabel) => {
    setOpenDropdown((current) => (current === itemLabel ? null : itemLabel));
  };

  const handleDropdownClick = (itemLabel) => {
    if (isMobileView()) {
      toggleDropdown(itemLabel);
    }
  };

  return (
    <nav className="navbar-container">
      <div className="brand">InsureEase</div>
      <div className="nav-right desktop-only">
        <button className="nav-login-btn">Login</button>
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
      <ul className={`nav-menu ${mobileMenuOpen ? 'is-open' : ''}`}>
        {menu.map((item) => (
          <li
            key={item.label}
            className="nav-link-item"
            onMouseEnter={() => !isMobileView() && item.dropdown && setOpenDropdown(item.label)}
            onMouseLeave={() => !isMobileView() && setOpenDropdown(null)}
          >
            {item.dropdown ? (
              <>
                <button
                  className="nav-label nav-dropdown-trigger"
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={openDropdown === item.label}
                  onClick={() => handleDropdownClick(item.label)}
                >
                  {item.label}
                  <span className={`dropdown-caret ${openDropdown === item.label ? 'is-open' : ''}`}>▾</span>
                </button>
                <ul className={`dropdown-menu ${openDropdown === item.label ? 'is-open' : ''}`}>
                  {item.dropdown.map((option) => (
                    <li key={option}>
                      <button className="dropdown-item" type="button">
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <button className="nav-label" type="button">
                {item.label}
              </button>
            )}
          </li>
        ))}
        <li className="nav-link-item login-item mobile-only">
          <button className="nav-login-btn">Login</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;