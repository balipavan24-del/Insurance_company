import './Business-Natural.css';
import Footer from '../../pages/Landing/Footer';

const NATURAL_IMPORTANCE_POINTS = [
  {
    id: 'india-frequent-disasters',
    text: 'India faces frequent floods, cyclones, and earthquakes causing massive business disruptions.',
  },
  {
    id: 'recovery-without-insurance',
    text: 'Recovery from natural disasters without insurance can take months or years.',
  },
  {
    id: 'physical-assets-income',
    text: 'Protects both physical assets and business income during downtime.',
  },
  {
    id: 'ground-floor-risk',
    text: 'Ground-floor and flood-prone businesses face significantly higher risk.',
  },
];

const NATURAL_COVERED_ITEMS = [
  { id: 'flood-damage', title: 'Flood Damage', icon: 'flood' },
  { id: 'earthquake', title: 'Earthquake', icon: 'earthquake' },
  { id: 'storm-cyclone', title: 'Storm & Cyclone', icon: 'wind' },
  { id: 'lightning', title: 'Lightning Strike', icon: 'lightning' },
  { id: 'hailstorm', title: 'Hailstorm', icon: 'hail' },
  { id: 'heavy-rainfall', title: 'Heavy Rainfall', icon: 'rain' },
];

const NATURAL_BENEFITS = [
  { id: 'financial-protection', title: 'Financial Protection', icon: 'shield' },
  { id: 'rapid-recovery', title: 'Rapid Recovery', icon: 'shield' },
  { id: 'business-continuity', title: 'Business Continuity', icon: 'shield' },
];

function BusinessNaturalIcon({ name }) {
  if (name === 'flood') {
    return <svg viewBox="0 0 24 24" focusable="false"><path d="M4 9c1.4 1.3 2.6 1.3 4 0 1.4-1.3 2.6-1.3 4 0 1.4 1.3 2.6 1.3 4 0 1.4-1.3 2.6-1.3 4 0M4 13c1.4 1.3 2.6 1.3 4 0 1.4-1.3 2.6-1.3 4 0 1.4 1.3 2.6 1.3 4 0 1.4-1.3 2.6-1.3 4 0" /></svg>;
  }
  if (name === 'earthquake') {
    return <svg viewBox="0 0 24 24" focusable="false"><path d="M6 18h12L16 7l-4 4-4-4-2 11Z" /></svg>;
  }
  if (name === 'wind') {
    return <svg viewBox="0 0 24 24" focusable="false"><path d="M4 8h10M4 12h14M4 16h9" /><path d="M14 8h3l-1.8-1.8M14 8l1.8 1.8" /></svg>;
  }
  if (name === 'lightning') {
    return <svg viewBox="0 0 24 24" focusable="false"><path d="M7 14a4.5 4.5 0 0 1 .8-8.9 5.5 5.5 0 0 1 10.4 2.4A3.5 3.5 0 1 1 17 14H7Z" /><path d="M12.8 10.3 10.9 13h1.9l-1 2.8 2.8-3.9h-1.8l1-1.6Z" /></svg>;
  }
  if (name === 'hail') {
    return <svg viewBox="0 0 24 24" focusable="false"><path d="M12 6v12M6 12h12M8 8l8 8M16 8l-8 8" /></svg>;
  }
  if (name === 'rain') {
    return <svg viewBox="0 0 24 24" focusable="false"><path d="M6 12.5a6 6 0 0 1 11.2-3A4.1 4.1 0 1 1 18 17.5H8a4 4 0 0 1-2-7.5Z" /><path d="M9 14.5v2.6M12 14.5v3.2M15 14.5v2.6" /></svg>;
  }
  if (name === 'shield') {
    return <svg viewBox="0 0 24 24" focusable="false"><path d="M12 4 18 7v5c0 3.5-2.2 6.6-6 8-3.8-1.4-6-4.5-6-8V7l6-3Z" /></svg>;
  }
  if (name === 'building') {
    return <svg viewBox="0 0 24 24" focusable="false"><path d="M6 20V7h9v13M15 20V11h3v9M8 10h2M11 10h2M8 13h2M11 13h2" /></svg>;
  }
  return (
    <svg viewBox="0 0 24 24" focusable="false">
      <path d="M6 12.5a6 6 0 0 1 11.2-3A4.1 4.1 0 1 1 18 17.5H8a4 4 0 0 1-2-7.5Z" />
      <path d="M12 10v6M9.8 12.2 12 10l2.2 2.2" />
    </svg>
  );
}

function BusinessNatural({ onBackToBusinessHome }) {
  return (
    <>
      <main className="business-natural-page page-section page-section--hero">
        <section className="business-natural-wrap page-section-container">
          <div className="business-natural-hero">
            <button
              type="button"
              className="business-natural-back-link"
              onClick={onBackToBusinessHome}
            >
              ← Back to Business Insurance
            </button>

            <section className="business-natural-layout">
              <article className="business-natural-info business-natural-info-panel">
                <div className="business-natural-hero-group">
                  <div className="business-natural-icon" aria-hidden="true">
                    <BusinessNaturalIcon name="natural" />
                  </div>
                  <div className="business-natural-content">
                    <h1>Natural Disaster Cover for Your Business</h1>
                    <p>
                      Protect your business from floods, earthquakes, storms, and other natural
                      calamities.
                    </p>

                    <div className="business-natural-tags" aria-label="Key highlights">
                      <span><i aria-hidden="true" /> Quick Response</span>
                      <span><i aria-hidden="true" /> Expert Guidance</span>
                      <span><i aria-hidden="true" /> Best Rates</span>
                    </div>
                  </div>
                </div>
              </article>

              <aside className="business-natural-form-card" aria-label="Natural disaster insurance quote form">
                <h2>Get Your Natural Disaster Cover Quote</h2>
                <p className="business-natural-form-subtitle">
                  Fill in the details and our expert will reach out to you.
                </p>

                <form className="business-natural-form">
                  <label htmlFor="business-natural-type">
                    <span className="business-natural-label-text">Business Type <em>*</em></span>
                    <select id="business-natural-type" defaultValue="">
                      <option value="" disabled>Select business type</option>
                      <option value="shop">Retail Shop</option>
                      <option value="office">Office</option>
                      <option value="warehouse">Warehouse</option>
                      <option value="manufacturing">Manufacturing Unit</option>
                    </select>
                  </label>

                  <label htmlFor="business-natural-need">
                    <span className="business-natural-label-text">What would you like to insure? <em>*</em></span>
                    <select id="business-natural-need" defaultValue="">
                      <option value="" disabled>Select</option>
                      <option value="building">Building</option>
                      <option value="stock-inventory">Stock / Inventory</option>
                      <option value="equipment">Equipment</option>
                    </select>
                  </label>

                  <label htmlFor="business-natural-name">
                    <span className="business-natural-label-text">Business Name <em>*</em></span>
                    <div className="business-natural-input-wrap">
                      <span className="business-natural-input-icon" aria-hidden="true">
                        <BusinessNaturalIcon name="building" />
                      </span>
                      <input id="business-natural-name" type="text" placeholder="Business name" />
                    </div>
                  </label>

                  <label htmlFor="business-natural-city">
                    <span className="business-natural-label-text">City <em>*</em></span>
                    <select id="business-natural-city" defaultValue="">
                      <option value="" disabled>Select city</option>
                      <option value="mumbai">Mumbai</option>
                      <option value="delhi">Delhi</option>
                      <option value="bengaluru">Bengaluru</option>
                      <option value="chennai">Chennai</option>
                    </select>
                  </label>

                  <label htmlFor="business-natural-location">
                    <span className="business-natural-label-text">Property Location <em>*</em></span>
                    <select id="business-natural-location" defaultValue="">
                      <option value="" disabled>Select floor</option>
                      <option value="ground">Ground floor</option>
                      <option value="upper">Upper floor</option>
                    </select>
                  </label>

                  <label htmlFor="business-natural-risk">
                    <span className="business-natural-label-text">Area Risk <em>*</em></span>
                    <select id="business-natural-risk" defaultValue="">
                      <option value="" disabled>Select risk level</option>
                      <option value="flood-prone">Flood-prone</option>
                      <option value="normal">Normal</option>
                    </select>
                  </label>

                  <label htmlFor="business-natural-full-name">
                    <span className="business-natural-label-text">Full Name <em>*</em></span>
                    <div className="business-natural-input-wrap">
                      <span className="business-natural-input-icon" aria-hidden="true">
                        <svg viewBox="0 0 20 20" focusable="false">
                          <circle cx="10" cy="6.2" r="2.8" />
                          <path d="M4.8 15.3C5.5 12.8 7.5 11.8 10 11.8C12.5 11.8 14.5 12.8 15.2 15.3" />
                        </svg>
                      </span>
                      <input id="business-natural-full-name" type="text" placeholder="Your full name" />
                    </div>
                  </label>

                  <label htmlFor="business-natural-mobile">
                    <span className="business-natural-label-text">Mobile Number <em>*</em></span>
                    <div className="business-natural-input-wrap">
                      <span className="business-natural-input-icon" aria-hidden="true">
                        <svg viewBox="0 0 20 20" focusable="false">
                          <path d="M6.7 4.8C7.2 4.2 8.1 4.2 8.7 4.8L9.7 5.8C10.2 6.3 10.3 7.1 9.8 7.7L9.2 8.4C9.8 9.6 10.7 10.6 11.9 11.2L12.6 10.6C13.2 10.1 14 10.2 14.5 10.7L15.5 11.7C16.1 12.3 16.1 13.2 15.5 13.7L14.8 14.4C14.2 15 13.3 15.2 12.4 14.9C9.8 14.1 7.4 11.8 6.6 9.1C6.3 8.2 6.5 7.3 7.1 6.7L7.8 6" />
                        </svg>
                      </span>
                      <input id="business-natural-mobile" type="tel" placeholder="10-digit mobile" />
                    </div>
                  </label>
                </form>

                <button type="button" className="business-natural-submit">
                  Get Details on WhatsApp
                </button>
                <p className="business-natural-form-note">
                  By submitting, you agree to be contacted by our insurance experts.
                </p>
              </aside>
            </section>
          </div>

          <div className="business-natural-about-band">
            <section className="business-natural-about-section">
              <div className="business-natural-about-content">
                <h2>About Natural Disaster Insurance</h2>
                <p>
                  Natural disaster insurance protects your business property and assets from damage
                  caused by events like floods, earthquakes, cyclones, and storms. It covers
                  repair, replacement, and recovery costs so you can get back on track quickly.
                </p>
              </div>

              <div className="business-natural-importance">
                <h3>Why It&apos;s Important</h3>
                <div className="business-natural-importance-grid">
                  {NATURAL_IMPORTANCE_POINTS.map((item) => (
                    <article key={item.id} className="business-natural-importance-card">
                      <i aria-hidden="true" />
                      <p>{item.text}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <div className="business-natural-covered-band">
            <section className="business-natural-covered-section">
              <div className="business-natural-covered-block">
                <h3>What&apos;s Covered</h3>
                <div className="business-natural-covered-grid">
                  {NATURAL_COVERED_ITEMS.map((item) => (
                    <article key={item.id} className="business-natural-covered-card">
                      <span className="business-natural-covered-icon" aria-hidden="true">
                        <BusinessNaturalIcon name={item.icon} />
                      </span>
                      <p>{item.title}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="business-natural-benefits-block">
                <h3>Benefits</h3>
                <div className="business-natural-benefits-grid">
                  {NATURAL_BENEFITS.map((item) => (
                    <article key={item.id} className="business-natural-covered-card business-natural-benefit-card">
                      <span className="business-natural-covered-icon" aria-hidden="true">
                        <BusinessNaturalIcon name={item.icon} />
                      </span>
                      <p>{item.title}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default BusinessNatural;
