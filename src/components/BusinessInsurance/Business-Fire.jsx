import './Business-Fire.css';
import Footer from '../../pages/Landing/Footer';

const FIRE_IMPORTANCE_POINTS = [
  'Fire can cause devastating financial losses that can shut down businesses permanently.',
  'Electrical faults and accidental fires are among the top causes of commercial property damage.',
  'Insurance ensures quick recovery and business continuity after a fire incident.',
  'Landlords and lease agreements often require fire insurance coverage.',
];

const FIRE_COVERED_ITEMS = [
  { id: 'accidental-fire', title: 'Accidental Fire', icon: 'fire' },
  { id: 'electrical-short-circuit', title: 'Electrical Short Circuit', icon: 'bolt' },
  { id: 'explosion-damage', title: 'Explosion Damage', icon: 'alert' },
  { id: 'structural-damage', title: 'Structural Damage', icon: 'building' },
  { id: 'stock-inventory-loss', title: 'Stock & Inventory Loss', icon: 'shield' },
  { id: 'smoke-damage', title: 'Smoke Damage', icon: 'fire' },
];

const FIRE_BENEFITS = [
  { id: 'financial-protection', title: 'Financial Protection', icon: 'shield' },
  { id: 'quick-claim-settlement', title: 'Quick Claim Settlement', icon: 'shield' },
  { id: 'business-continuity', title: 'Business Continuity', icon: 'shield' },
];

function BusinessFireIcon({ name }) {
  if (name === 'bolt') {
    return <svg viewBox="0 0 24 24" focusable="false"><path d="M13 3L5 14h6l-1 7 9-12h-6l1-6Z" /></svg>;
  }
  if (name === 'alert') {
    return <svg viewBox="0 0 24 24" focusable="false"><path d="M12 4 20 19H4L12 4Z" /><path d="M12 9v4M12 16h.01" /></svg>;
  }
  if (name === 'building') {
    return <svg viewBox="0 0 24 24" focusable="false"><path d="M6 20V7h9v13M15 20V11h3v9M8 10h2M11 10h2M8 13h2M11 13h2" /></svg>;
  }
  if (name === 'shield') {
    return <svg viewBox="0 0 24 24" focusable="false"><path d="M12 4 18 7v5c0 3.5-2.2 6.6-6 8-3.8-1.4-6-4.5-6-8V7l6-3Z" /></svg>;
  }
  return <svg viewBox="0 0 24 24" focusable="false"><path d="M12 3c2.8 2.1 4.5 4.6 4.5 7.2A4.5 4.5 0 1 1 7.5 10C7.5 7.7 8.9 5.4 12 3Z" /></svg>;
}

function BusinessFire({ onBackToBusinessHome }) {
  return (
    <>
      <main className="business-fire-page">
        <section className="business-fire-wrap">
        <div className="business-fire-hero">
          <button
            type="button"
            className="business-fire-back-link"
            onClick={onBackToBusinessHome}
          >
            ← Back to Business Insurance
          </button>

          <section className="business-fire-layout">
            <article className="business-fire-info business-fire-info-panel">
              <div className="business-fire-hero-group">
                <div className="business-fire-icon" aria-hidden="true">
                  <BusinessFireIcon name="fire" />
                </div>
                <div className="business-fire-content">
                  <h1>Fire Insurance for Your Business</h1>
                  <p>
                    Protect your business from fire-related losses including electrical fires,
                    accidental blazes, and explosion damage.
                  </p>

                  <div className="business-fire-tags" aria-label="Key highlights">
                    <span><i aria-hidden="true" /> Quick Response</span>
                    <span><i aria-hidden="true" /> Expert Guidance</span>
                    <span><i aria-hidden="true" /> Best Rates</span>
                  </div>
                </div>
              </div>
            </article>

            <aside className="business-fire-form-card" aria-label="Fire insurance quote form">
              <h2>Get Your Fire Insurance Quote</h2>
              <p className="business-fire-form-subtitle">
                Fill in the details and our expert will reach out to you.
              </p>

              <form className="business-fire-form">
                <label htmlFor="business-type">
                  <span className="business-fire-label-text">Business Type <em>*</em></span>
                  <select id="business-type" defaultValue="">
                    <option value="" disabled>Select business type</option>
                    <option value="shop">Retail Shop</option>
                    <option value="office">Office</option>
                    <option value="warehouse">Warehouse</option>
                    <option value="factory">Factory</option>
                  </select>
                </label>

                <label htmlFor="insurance-need">
                  <span className="business-fire-label-text">What would you like to insure? <em>*</em></span>
                  <select id="insurance-need" defaultValue="">
                    <option value="" disabled>Select</option>
                    <option value="building">Building</option>
                    <option value="stock">Stock</option>
                    <option value="machinery">Machinery</option>
                    <option value="all">All of the above</option>
                  </select>
                </label>

                <label htmlFor="business-name">
                  <span className="business-fire-label-text">Business Name <em>*</em></span>
                  <div className="business-fire-input-wrap">
                    <span className="business-fire-input-icon" aria-hidden="true">
                      <BusinessFireIcon name="building" />
                    </span>
                    <input id="business-name" type="text" placeholder="Business name" />
                  </div>
                </label>

                <label htmlFor="city">
                  <span className="business-fire-label-text">City <em>*</em></span>
                  <select id="city" defaultValue="">
                    <option value="" disabled>Select city</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="delhi">Delhi</option>
                    <option value="bengaluru">Bengaluru</option>
                    <option value="chennai">Chennai</option>
                  </select>
                </label>

                <label htmlFor="safety-measures">
                  <span className="business-fire-label-text">Fire Safety Measures</span>
                  <select id="safety-measures" defaultValue="">
                    <option value="" disabled>Select</option>
                    <option value="extinguishers">Fire extinguishers</option>
                    <option value="alarm-system">Alarm system</option>
                    <option value="sprinklers">Sprinklers</option>
                    <option value="all">All of the above</option>
                  </select>
                </label>

                <label htmlFor="full-name">
                  <span className="business-fire-label-text">Full Name <em>*</em></span>
                  <div className="business-fire-input-wrap">
                    <span className="business-fire-input-icon" aria-hidden="true">
                      <svg viewBox="0 0 20 20" focusable="false">
                        <circle cx="10" cy="6.2" r="2.8" />
                        <path d="M4.8 15.3C5.5 12.8 7.5 11.8 10 11.8C12.5 11.8 14.5 12.8 15.2 15.3" />
                      </svg>
                    </span>
                    <input id="full-name" type="text" placeholder="Your full name" />
                  </div>
                </label>

                <label htmlFor="mobile-number">
                  <span className="business-fire-label-text">Mobile Number <em>*</em></span>
                  <div className="business-fire-input-wrap">
                    <span className="business-fire-input-icon" aria-hidden="true">
                      <svg viewBox="0 0 20 20" focusable="false">
                        <path d="M6.7 4.8C7.2 4.2 8.1 4.2 8.7 4.8L9.7 5.8C10.2 6.3 10.3 7.1 9.8 7.7L9.2 8.4C9.8 9.6 10.7 10.6 11.9 11.2L12.6 10.6C13.2 10.1 14 10.2 14.5 10.7L15.5 11.7C16.1 12.3 16.1 13.2 15.5 13.7L14.8 14.4C14.2 15 13.3 15.2 12.4 14.9C9.8 14.1 7.4 11.8 6.6 9.1C6.3 8.2 6.5 7.3 7.1 6.7L7.8 6" />
                      </svg>
                    </span>
                    <input id="mobile-number" type="tel" placeholder="10-digit mobile" />
                  </div>
                </label>
              </form>

              <button type="button" className="business-fire-submit">
                Get Details on WhatsApp
              </button>
              <p className="business-fire-form-note">
                By submitting, you agree to be contacted by our insurance experts.
              </p>
            </aside>
          </section>
        </div>

        <section className="business-fire-about-section">
          <div className="business-fire-about-content">
            <h2>About Fire Insurance</h2>
            <p>
              Fire insurance covers financial losses caused by fire damage to your business
              property, stock, equipment, and structures. It ensures you can recover and rebuild
              without bearing the full financial burden.
            </p>
          </div>

          <div className="business-fire-importance">
            <h3>Why It&apos;s Important</h3>
            <div className="business-fire-importance-grid">
              {FIRE_IMPORTANCE_POINTS.map((point) => (
                <article key={point} className="business-fire-importance-card">
                  <i aria-hidden="true" />
                  <p>{point}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

          <section className="business-fire-covered-section">
          <div className="business-fire-covered-block">
            <h3>What&apos;s Covered</h3>
            <div className="business-fire-covered-grid">
              {FIRE_COVERED_ITEMS.map((item) => (
                <article key={item.id} className="business-fire-covered-card">
                  <span className="business-fire-covered-icon" aria-hidden="true">
                    <BusinessFireIcon name={item.icon} />
                  </span>
                  <p>{item.title}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="business-fire-benefits-block">
            <h3>Benefits</h3>
            <div className="business-fire-benefits-grid">
              {FIRE_BENEFITS.map((item) => (
                <article key={item.id} className="business-fire-covered-card business-fire-benefit-card">
                  <span className="business-fire-covered-icon" aria-hidden="true">
                    <BusinessFireIcon name={item.icon} />
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
export default BusinessFire;
