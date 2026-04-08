import { useState } from 'react';
import './Navbar.css'; 

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menu = [
    'Health Insurance',
    'Motor Insurance',
    'Cargo',
    'Business',
    'Term',
    'Renewal Policy',
    'Support'
  ];

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
        onClick={() => setMobileMenuOpen((prev) => !prev)}
      >
        ⋯
      </button>
      <ul className={`nav-menu ${mobileMenuOpen ? 'is-open' : ''}`}>
        {menu.map((item) => (
          <li key={item} className="nav-link-item">
            <button className="nav-label" type="button">
              {item}
            </button>
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