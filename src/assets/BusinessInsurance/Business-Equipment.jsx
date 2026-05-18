import './Business-Equipment.css';
import Footer from '../layout/Footer';

const EQUIPMENT_IMPORTANCE_POINTS = [
  'Equipment failure can halt production and cause significant revenue loss.',
  'Repair or replacement of heavy machinery is extremely expensive.',
  'Covers both mechanical and electrical breakdowns comprehensively.',
  'Reduces financial impact of unexpected equipment downtime.',
];

const EQUIPMENT_COVERED_ITEMS = [
  { id: 'mechanical-failure', title: 'Mechanical Failure', icon: 'gear' },
  { id: 'electronic-breakdown', title: 'Electronic Breakdown', icon: 'chip' },
  { id: 'computer-systems', title: 'Computer Systems', icon: 'monitor' },
  { id: 'server-storage', title: 'Server & Storage', icon: 'server' },
  { id: 'electrical-systems', title: 'Electrical Systems', icon: 'bolt' },
  { id: 'industrial-machinery', title: 'Industrial Machinery', icon: 'tool' },
];

const EQUIPMENT_BENEFITS = [
  { id: 'financial-protection', title: 'Financial Protection', icon: 'shield' },
  { id: 'minimal-downtime', title: 'Minimal Downtime', icon: 'shield' },
  { id: 'business-continuity', title: 'Business Continuity', icon: 'shield' },
];

function EquipmentIcon({ name }) {
  if (name === 'gear') {
    return <svg viewBox="0 0 24 24" focusable="false"><path d="M12 8.8A3.2 3.2 0 1 0 12 15.2A3.2 3.2 0 1 0 12 8.8z" /><path d="M19 12l1.8 1-1 1.8-2-.3a6.9 6.9 0 0 1-1.2 1.2l.3 2-1.8 1-1-1.8a6.9 6.9 0 0 1-2 0l-1 1.8-1.8-1 .3-2a6.9 6.9 0 0 1-1.2-1.2l-2 .3-1-1.8L5 12l-1.8-1 1-1.8 2 .3c.3-.4.7-.8 1.2-1.2l-.3-2 1.8-1 1 1.8c.7-.1 1.3-.1 2 0l1-1.8 1.8 1-.3 2c.4.3.8.7 1.2 1.2l2-.3 1 1.8L19 12Z" /></svg>;
  }
  if (name === 'chip') {
    return <svg viewBox="0 0 24 24" focusable="false"><rect x="8" y="8" width="8" height="8" rx="1.5" /><path d="M10 4v2M14 4v2M10 18v2M14 18v2M4 10h2M4 14h2M18 10h2M18 14h2" /></svg>;
  }
  if (name === 'monitor') {
    return <svg viewBox="0 0 24 24" focusable="false"><rect x="4" y="6" width="16" height="10" rx="2" /><path d="M10 20h4M12 16v4" /></svg>;
  }
  if (name === 'server') {
    return <svg viewBox="0 0 24 24" focusable="false"><rect x="5" y="6" width="14" height="5" rx="1.5" /><rect x="5" y="13" width="14" height="5" rx="1.5" /><path d="M8 8.5h.01M8 15.5h.01" /></svg>;
  }
  if (name === 'bolt') {
    return <svg viewBox="0 0 24 24" focusable="false"><path d="M13 3L5 14h6l-1 7 9-12h-6l1-6Z" /></svg>;
  }
  if (name === 'tool') {
    return <svg viewBox="0 0 24 24" focusable="false"><path d="M14 7a4 4 0 0 0-5 5L4 17l3 3 5-5a4 4 0 0 0 5-5l-3 2-2-2 2-3Z" /></svg>;
  }
  if (name === 'building') {
    return <svg viewBox="0 0 24 24" focusable="false"><path d="M6 20V7h9v13M15 20V11h3v9M8 10h2M11 10h2M8 13h2M11 13h2" /></svg>;
  }
  if (name === 'user') {
    return <svg viewBox="0 0 20 20" focusable="false"><circle cx="10" cy="6.2" r="2.8" /><path d="M4.8 15.3C5.5 12.8 7.5 11.8 10 11.8C12.5 11.8 14.5 12.8 15.2 15.3" /></svg>;
  }
  if (name === 'phone') {
    return <svg viewBox="0 0 20 20" focusable="false"><path d="M6.7 4.8C7.2 4.2 8.1 4.2 8.7 4.8L9.7 5.8C10.2 6.3 10.3 7.1 9.8 7.7L9.2 8.4C9.8 9.6 10.7 10.6 11.9 11.2L12.6 10.6C13.2 10.1 14 10.2 14.5 10.7L15.5 11.7C16.1 12.3 16.1 13.2 15.5 13.7L14.8 14.4C14.2 15 13.3 15.2 12.4 14.9C9.8 14.1 7.4 11.8 6.6 9.1C6.3 8.2 6.5 7.3 7.1 6.7L7.8 6" /></svg>;
  }
  if (name === 'shield') {
    return <svg viewBox="0 0 24 24" focusable="false"><path d="M12 4 18 7v5c0 3.5-2.2 6.6-6 8-3.8-1.4-6-4.5-6-8V7l6-3Z" /></svg>;
  }
  return <svg viewBox="0 0 24 24" focusable="false"><circle cx="12" cy="12" r="8" /></svg>;
}

function BusinessEquipment({ onBackToBusinessHome }) {
  return (
    <>
      <main className="business-equipment-page page-section page-section--hero">
        <section className="business-equipment-wrap page-section-container">
          <section className="business-equipment-hero">
            <div className="business-equipment-shell">
              <button
                type="button"
                className="business-equipment-back-link"
                onClick={onBackToBusinessHome}
              >
                ← Back to Business Insurance
              </button>

              <section className="business-equipment-layout">
                <article className="business-equipment-info business-equipment-info-panel">
                  <div className="business-equipment-hero-group">
                    <div className="business-equipment-icon" aria-hidden="true">
                      <EquipmentIcon name="tool" />
                    </div>
                    <div className="business-equipment-content">
                      <h1>Equipment Protection for Your Business</h1>
                      <p>
                        Coverage for machinery failure, electronic equipment damage,
                        and operational breakdowns.
                      </p>

                      <div className="business-equipment-tags" aria-label="Key highlights">
                        <span><i aria-hidden="true" /> Quick Response</span>
                        <span><i aria-hidden="true" /> Expert Guidance</span>
                        <span><i aria-hidden="true" /> Best Rates</span>
                      </div>
                    </div>
                  </div>
                </article>

                <aside className="business-equipment-form-card" aria-label="Equipment insurance quote form">
                  <h2>Get Your Equipment Protection Quote</h2>
                  <p className="business-equipment-form-subtitle">
                    Fill in the details and our expert will reach out to you.
                  </p>

                  <form className="business-equipment-form">
                  <label htmlFor="business-type">
                    <span className="business-equipment-label-text">Business Type <em>*</em></span>
                    <select id="business-type" defaultValue="">
                      <option value="" disabled>Select business type</option>
                      <option value="shop">Retail Shop</option>
                      <option value="office">Office</option>
                      <option value="warehouse">Warehouse</option>
                      <option value="manufacturing">Manufacturing Unit</option>
                    </select>
                  </label>

                  <label htmlFor="insurance-need">
                    <span className="business-equipment-label-text">What would you like to insure? <em>*</em></span>
                    <select id="insurance-need" defaultValue="">
                      <option value="" disabled>Select</option>
                      <option value="building">Building</option>
                      <option value="stock-inventory">Stock / Inventory</option>
                      <option value="equipment">Equipment</option>
                    </select>
                  </label>

                  <label htmlFor="business-name">
                    <span className="business-equipment-label-text">Business Name <em>*</em></span>
                    <div className="business-equipment-input-wrap">
                      <span className="business-equipment-input-icon" aria-hidden="true">
                        <EquipmentIcon name="building" />
                      </span>
                      <input id="business-name" type="text" placeholder="Business name" />
                    </div>
                  </label>

                  <label htmlFor="city">
                    <span className="business-equipment-label-text">City <em>*</em></span>
                    <select id="city" defaultValue="">
                      <option value="" disabled>Select city</option>
                      <option value="mumbai">Mumbai</option>
                      <option value="delhi">Delhi</option>
                      <option value="bengaluru">Bengaluru</option>
                      <option value="chennai">Chennai</option>
                    </select>
                  </label>

                  <label htmlFor="equipment-type">
                    <span className="business-equipment-label-text">Equipment Type <em>*</em></span>
                    <select id="equipment-type" defaultValue="">
                      <option value="" disabled>Select type</option>
                      <option value="machinery">Machinery</option>
                      <option value="electronics">Electronics</option>
                      <option value="mixed">Mixed</option>
                    </select>
                  </label>

                  <label htmlFor="equipment-usage">
                    <span className="business-equipment-label-text">Equipment Usage <em>*</em></span>
                    <select id="equipment-usage" defaultValue="">
                      <option value="" disabled>Select usage</option>
                      <option value="heavy">Heavy Usage</option>
                      <option value="occasional">Occasional Usage</option>
                    </select>
                  </label>

                  <label htmlFor="full-name">
                    <span className="business-equipment-label-text">Full Name <em>*</em></span>
                    <div className="business-equipment-input-wrap">
                      <span className="business-equipment-input-icon" aria-hidden="true">
                        <EquipmentIcon name="user" />
                      </span>
                      <input id="full-name" type="text" placeholder="Your full name" />
                    </div>
                  </label>

                  <label htmlFor="mobile-number">
                    <span className="business-equipment-label-text">Mobile Number <em>*</em></span>
                    <div className="business-equipment-input-wrap">
                      <span className="business-equipment-input-icon" aria-hidden="true">
                        <EquipmentIcon name="phone" />
                      </span>
                      <input id="mobile-number" type="tel" placeholder="10-digit mobile" />
                    </div>
                  </label>
                  </form>

                  <button type="button" className="business-equipment-submit">
                    Get Details on WhatsApp
                  </button>
                  <p className="business-equipment-form-note">
                    By submitting, you agree to be contacted by our insurance experts.
                  </p>
                </aside>
              </section>
            </div>
          </section>

          <div className="about">
            <section className="business-equipment-about-section">
              <div className="business-equipment-about-content">
                <h2>About Equipment Insurance</h2>
                <p>
                  Equipment breakdown insurance covers losses from sudden and unexpected failure of
                  machinery, electronic systems, and other business equipment. It helps cover repair or
                  replacement costs and minimizes downtime.
                </p>
              </div>

              <div className="business-equipment-importance">
                <h3>Why It&apos;s Important</h3>
                <div className="business-equipment-importance-grid">
                  {EQUIPMENT_IMPORTANCE_POINTS.map((point) => (
                    <article key={point} className="business-equipment-importance-card">
                      <i aria-hidden="true" />
                      <p>{point}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <section className="business-equipment-covered-section">
            <div className="business-equipment-covered-block">
              <h3>What&apos;s Covered</h3>
              <div className="business-equipment-covered-grid">
                {EQUIPMENT_COVERED_ITEMS.map((item) => (
                  <article key={item.id} className="business-equipment-covered-card">
                    <span className="business-equipment-covered-icon" aria-hidden="true">
                      <EquipmentIcon name={item.icon} />
                    </span>
                    <p>{item.title}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="business-equipment-benefits-block">
              <h3>Benefits</h3>
              <div className="business-equipment-benefits-grid">
                {EQUIPMENT_BENEFITS.map((item) => (
                  <article key={item.id} className="business-equipment-covered-card business-equipment-benefit-card">
                    <span className="business-equipment-covered-icon" aria-hidden="true">
                      <EquipmentIcon name={item.icon} />
                    </span>
                    <p>{item.title}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default BusinessEquipment;

