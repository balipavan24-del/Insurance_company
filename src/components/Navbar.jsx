import { useState } from 'react';
import './Navbar.css'; // This links specifically to your Navbar.css

function Navbar() {
  const [openIndex, setOpenIndex] = useState(null);

  const menu = [
    { name: 'Health Insurance', sub: ['Family', 'Parents', 'Senior Citizen'] },
    { name: 'Motor Insurance', sub: ['Car', 'Bike', 'Commercial Vehicle'] },
    { name: 'Cargo', sub: ['Marine', 'Air', 'Inland (Road/Rail)'] },
    { name: 'Business', sub: ['Fire', 'Theft', 'Property'] },
    { name: 'Term', sub: ['Basic Term', 'Term + Rider', 'Premium Term'] },
    { name: 'Renewal Policy', sub: null },
    { name: 'Support', sub: null }
  ];

  return (
    <nav className="navbar-container">
      <div className="brand">InsureEase</div>
      <ul className="nav-menu">
        {menu.map((item, index) => (
          <li 
            key={index} 
            className="nav-link-item"
            onMouseEnter={() => item.sub && setOpenIndex(index)}
            onMouseLeave={() => setOpenIndex(null)}
          >
            <div className="nav-label">
              {item.name} {item.sub && <span className="chevron">▾</span>}
            </div>
            
            {item.sub && openIndex === index && (
              <ul className="nav-dropdown">
                {item.sub.map((subItem, i) => (
                  <li key={i} className="dropdown-link">{subItem}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <button className="nav-login-btn">Login</button>
    </nav>
  );
}

export default Navbar;