import { Link } from 'react-router-dom';
import footerLogoWhite from '../../assets/images/footer-logo-white.png';
import './Footer.css';

function Footer() {
  const footerSections = [
    {
      title: 'Insurance Products',
      links: ['Motor Insurance', 'Health Insurance', 'Term Insurance', 'Business Insurance', 'Cargo Insurance'],
    },
    {
      title: 'Support',
      links: ['Help Center', 'FAQs', 'Contact Us', 'Claim Support', 'Track Request'],
    },
    {
      title: 'Tools & Resources',
      links: ['Check Insurance Status', 'Compare Plans', 'Premium Calculator', 'Renewal Guide', 'Insurance Basics'],
    },
    {
      title: 'Company',
      links: ['About Us', 'Careers', 'Blog', 'Press / News', 'Partners'],
    },
    {
      title: 'Legal',
      links: ['Privacy Policy', 'Terms & Conditions', 'Disclaimer', 'Cancellation & Refund Policy'],
    },
  ];

  const socialLinks = ['x', 'in', 'fb', 'yt'];
  const popularSearches = [
    'Car Insurance Renewal',
    'Bike Insurance Renewal',
    'Term Insurance',
    'Best Insurance Plans',
    'Cheapest Insurance',
  ];
  const footerRouteMap = {
    'Motor Insurance': '/motor-insurance',
    'Health Insurance': '/health-insurance',
    'Term Insurance': '/term-insurance',
    'Business Insurance': '/business-insurance',
    'Cargo Insurance': '/cargo-insurance',
    'Help Center': '/?footer=help-center',
    FAQs: '/?footer=faqs',
    'Contact Us': '/contact-us',
    'Claim Support': '/?footer=claim-support',
    'Track Request': '/?footer=track-request',
    'Check Insurance Status': '/?footer=check-insurance-status',
    'Compare Plans': '/?footer=compare-plans',
    'Premium Calculator': '/?footer=premium-calculator',
    'Renewal Guide': '/?footer=renewal-guide',
    'Insurance Basics': '/insurance-basics',
    'About Us': '/?footer=about-us',
    Careers: '/?footer=careers',
    Blog: '/?footer=blog',
    'Press / News': '/?footer=press-news',
    Partners: '/?footer=partners',
    'Privacy Policy': '/?footer=privacy-policy',
    'Terms & Conditions': '/?footer=terms-and-conditions',
    Disclaimer: '/?footer=disclaimer',
    'Cancellation & Refund Policy': '/?footer=cancellation-and-refund-policy',
    'Car Insurance Renewal': '/renew-plans/car',
    'Bike Insurance Renewal': '/renew-plans/bike',
    'Best Insurance Plans': '/?search=best-insurance-plans',
    'Cheapest Insurance': '/?search=cheapest-insurance',
  };

  return (
    <footer className="landing-footer">
      <div className="footer-inner">
        <h2 className="footer-heading">Quick Links</h2>

        <div className="footer-grid">
          {footerSections.map((section) => (
            <div key={section.title} className="footer-column">
              <h3>{section.title}</h3>
              <ul>
                {section.links.map((item) => (
                  <li key={item}>
                    <Link to={footerRouteMap[item] || '/'}>{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-popular-searches" aria-label="Popular searches">
          <h3 className="footer-popular-searches-title">Popular Searches</h3>
          <div className="footer-popular-searches-list">
            {popularSearches.map((searchItem) => (
              <Link key={searchItem} to={footerRouteMap[searchItem] || '/'}>
                {searchItem}
              </Link>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-brand">
            <img
              src={footerLogoWhite}
              alt="InsureEase"
              className="footer-logo-image"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="footer-social-links" aria-label="Social links">
            {socialLinks.map((link) => (
              <Link key={link} to={`/?social=${link}`} aria-label={link.toUpperCase()}>
                {link}
              </Link>
            ))}
          </div>

          <p className="footer-copyright">© 2026 InsureEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
