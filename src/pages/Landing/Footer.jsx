import { Link } from 'react-router-dom';
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
  const footerRouteMap = {
    'Motor Insurance': '/motor-insurance/car',
    'Health Insurance': '/health-insurance',
    'Term Insurance': '/?footer=term-insurance',
    'Business Insurance': '/?footer=business-insurance',
    'Cargo Insurance': '/?footer=cargo-insurance',
    'Help Center': '/?footer=help-center',
    FAQs: '/?footer=faqs',
    'Contact Us': '/contact-us',
    'Claim Support': '/?footer=claim-support',
    'Track Request': '/?footer=track-request',
    'Check Insurance Status': '/?footer=check-insurance-status',
    'Compare Plans': '/?footer=compare-plans',
    'Premium Calculator': '/?footer=premium-calculator',
    'Renewal Guide': '/?footer=renewal-guide',
    'Insurance Basics': '/?footer=insurance-basics',
    'About Us': '/?footer=about-us',
    Careers: '/?footer=careers',
    Blog: '/?footer=blog',
    'Press / News': '/?footer=press-news',
    Partners: '/?footer=partners',
    'Privacy Policy': '/?footer=privacy-policy',
    'Terms & Conditions': '/?footer=terms-and-conditions',
    Disclaimer: '/?footer=disclaimer',
    'Cancellation & Refund Policy': '/?footer=cancellation-and-refund-policy',
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

        <div className="footer-bottom">
          <div className="footer-brand">
            <span className="footer-brand-icon" aria-hidden="true">I</span>
            <span className="footer-brand-name">InsureEase</span>
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
