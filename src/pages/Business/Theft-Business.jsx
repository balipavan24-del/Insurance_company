import './Theft-Business.css';
import Footer from '../../components/Footer/Footer';

const THEFT_IMPORTANCE_POINTS = [
  {
    id: 'inventory-revenue',
    text: 'Business theft and burglary can lead to significant inventory and revenue losses.',
  },
  {
    id: 'small-business-target',
    text: 'Small businesses are often targeted due to less security infrastructure.',
  },
  {
    id: 'replacement-recovery',
    text: 'Insurance helps cover replacement costs and recovery expenses quickly.',
  },
  {
    id: 'peace-of-mind',
    text: 'Peace of mind allows you to focus on growing your business.',
  },
];

const THEFT_COVERED_ITEMS = [
  { id: 'break-in', title: 'Break-in Losses', icon: 'lock' },
  { id: 'stolen-inventory', title: 'Stolen Inventory', icon: 'box' },
  { id: 'cash-valuables', title: 'Cash & Valuables', icon: 'key' },
  { id: 'vandalism', title: 'Vandalism Damage', icon: 'alert' },
  { id: 'employee-theft', title: 'Employee Theft', icon: 'eye' },
  { id: 'property-damage', title: 'Property Damage', icon: 'shieldCheck' },
];

const THEFT_BENEFITS = [
  { id: 'asset-recovery', title: 'Asset Recovery', icon: 'shield' },
  { id: 'risk-mitigation', title: 'Risk Mitigation', icon: 'shield' },
  { id: 'continuity', title: 'Business Continuity', icon: 'shield' },
];

function TheftHeroShieldIcon() {
  return (
    <svg className="theft-business-hero-shield-svg" viewBox="0 0 24 24" focusable="false" aria-hidden>
      <path
        className="theft-business-hero-shield-shape"
        d="M12 4 18 7v5c0 3.5-2.2 6.6-6 8-3.8-1.4-6-4.5-6-8V7l6-3Z"
      />
      <path className="theft-business-hero-shield-check" d="M9 12l2.2 2.2L15.2 9" />
    </svg>
  );
}

function TheftBusinessIcon({ name }) {
  if (name === 'box') {
    return (
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M4 8.5 12 4.5l8 4v7l-8 4-8-4v-7Z" />
        <path d="M4 8.5 12 12.5l8-4M12 12.5V20.5" />
      </svg>
    );
  }
  if (name === 'key') {
    return (
      <svg viewBox="0 0 24 24" focusable="false">
        <circle cx="8.5" cy="15.5" r="3" />
        <path d="M11.2 12.8 17 7l2 2-5.8 5.8M17 7l2 2" />
      </svg>
    );
  }
  if (name === 'eye') {
    return (
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M2.5 12s4.2-6.5 9.5-6.5S21.5 12 21.5 12 17.3 18.5 12 18.5 2.5 12 2.5 12Z" />
        <circle cx="12" cy="12" r="2.8" />
      </svg>
    );
  }
  if (name === 'shieldCheck') {
    return (
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M12 4 18 7v5c0 3.5-2.2 6.6-6 8-3.8-1.4-6-4.5-6-8V7l6-3Z" />
        <path d="M9 12l2.2 2.2L15.2 9" />
      </svg>
    );
  }
  if (name === 'lock') {
    return (
      <svg viewBox="0 0 24 24" focusable="false">
        <rect x="6" y="10" width="12" height="10" rx="2" />
        <path d="M8 10V8a4 4 0 0 1 8 0v2" />
      </svg>
    );
  }
  if (name === 'door') {
    return (
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M7 4h10v16H7V4Z" />
        <circle cx="14" cy="12" r="1.2" />
      </svg>
    );
  }
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
  return <svg viewBox="0 0 24 24" focusable="false"><path d="M12 4 18 7v5c0 3.5-2.2 6.6-6 8-3.8-1.4-6-4.5-6-8V7l6-3Z" /></svg>;
}

function TheftBusiness({ onBackToBusinessHome }) {
  return (
    <>
      <main className="theft-business-page">
        <div className="theft-business-wrap">
          {/* —— Hero (matches Fire layout: back link, intro + quote form) —— */}
          <div className="theft-business-section theft-business-section--hero">
            <div className="theft-business-hero">
              <button
                type="button"
                className="theft-business-back-link"
                onClick={onBackToBusinessHome}
              >
                ← Back to Business Insurance
              </button>

              <section className="theft-business-layout">
                <article className="theft-business-info theft-business-info-panel">
                  <div className="theft-business-hero-group">
                    <div className="theft-business-icon" aria-hidden="true">
                      <TheftHeroShieldIcon />
                    </div>
                    <div className="theft-business-content">
                      <h1>Theft Protection for Your Business</h1>
                      <p>
                        Safeguard your business assets and inventory against burglary, theft, and
                        break-in losses.
                      </p>

                      <div className="theft-business-tags" aria-label="Key highlights">
                        <span><i aria-hidden="true" /> Quick Response</span>
                        <span><i aria-hidden="true" /> Expert Guidance</span>
                        <span><i aria-hidden="true" /> Best Rates</span>
                      </div>
                    </div>
                  </div>
                </article>

                <aside className="theft-business-form-card" aria-label="Theft protection quote form">
                  <h2>Get Your Theft Protection Quote</h2>
                  <p className="theft-business-form-subtitle">
                    Fill in the details and our expert will reach out to you.
                  </p>

                  <form className="theft-business-form">
                    <label htmlFor="theft-business-type">
                      <span className="theft-business-label-text">Business Type <em>*</em></span>
                      <select id="theft-business-type" defaultValue="">
                        <option value="" disabled>Select business type</option>
                        <option value="shop">Retail Shop</option>
                        <option value="office">Office</option>
                        <option value="warehouse">Warehouse</option>
                        <option value="manufacturing">Manufacturing Unit</option>
                      </select>
                    </label>

                    <label htmlFor="theft-insurance-need">
                      <span className="theft-business-label-text">What would you like to insure? <em>*</em></span>
                      <select id="theft-insurance-need" defaultValue="">
                        <option value="" disabled>Select</option>
                        <option value="building">Building</option>
                        <option value="stock">Stock</option>
                        <option value="machinery">Machinery</option>
                        <option value="all">All of the above</option>
                      </select>
                    </label>

                    <label htmlFor="theft-business-name">
                      <span className="theft-business-label-text">Business Name <em>*</em></span>
                      <div className="theft-business-input-wrap">
                        <span className="theft-business-input-icon" aria-hidden="true">
                          <TheftBusinessIcon name="building" />
                        </span>
                        <input id="theft-business-name" type="text" placeholder="Business name" />
                      </div>
                    </label>

                    <label htmlFor="theft-city">
                      <span className="theft-business-label-text">City <em>*</em></span>
                      <select id="theft-city" defaultValue="">
                        <option value="" disabled>Select city</option>
                        <option value="mumbai">Mumbai</option>
                        <option value="delhi">Delhi</option>
                        <option value="bengaluru">Bengaluru</option>
                        <option value="chennai">Chennai</option>
                      </select>
                    </label>

                    <label htmlFor="theft-storage-type">
                      <span className="theft-business-label-text">Storage Type <em>*</em></span>
                      <select id="theft-storage-type" defaultValue="">
                        <option value="" disabled>Select storage type</option>
                        <option value="shop">Shop</option>
                        <option value="warehouse">Warehouse</option>
                        <option value="office">Office</option>
                      </select>
                    </label>

                    <label htmlFor="theft-security">
                      <span className="theft-business-label-text">Security Measures <em>*</em></span>
                      <select id="theft-security" defaultValue="">
                        <option value="" disabled>Select</option>
                        <option value="cctv">CCTV</option>
                        <option value="security">Security</option>
                        <option value="none">None</option>
                      </select>
                    </label>

                    <label htmlFor="theft-full-name">
                      <span className="theft-business-label-text">Full Name <em>*</em></span>
                      <div className="theft-business-input-wrap">
                        <span className="theft-business-input-icon" aria-hidden="true">
                          <svg viewBox="0 0 20 20" focusable="false">
                            <circle cx="10" cy="6.2" r="2.8" />
                            <path d="M4.8 15.3C5.5 12.8 7.5 11.8 10 11.8C12.5 11.8 14.5 12.8 15.2 15.3" />
                          </svg>
                        </span>
                        <input id="theft-full-name" type="text" placeholder="Your full name" />
                      </div>
                    </label>

                    <label htmlFor="theft-mobile">
                      <span className="theft-business-label-text">Mobile Number <em>*</em></span>
                      <div className="theft-business-input-wrap">
                        <span className="theft-business-input-icon" aria-hidden="true">
                          <svg viewBox="0 0 20 20" focusable="false">
                            <path d="M6.7 4.8C7.2 4.2 8.1 4.2 8.7 4.8L9.7 5.8C10.2 6.3 10.3 7.1 9.8 7.7L9.2 8.4C9.8 9.6 10.7 10.6 11.9 11.2L12.6 10.6C13.2 10.1 14 10.2 14.5 10.7L15.5 11.7C16.1 12.3 16.1 13.2 15.5 13.7L14.8 14.4C14.2 15 13.3 15.2 12.4 14.9C9.8 14.1 7.4 11.8 6.6 9.1C6.3 8.2 6.5 7.3 7.1 6.7L7.8 6" />
                          </svg>
                        </span>
                        <input id="theft-mobile" type="tel" placeholder="10-digit mobile" />
                      </div>
                    </label>
                  </form>

                  <button type="button" className="theft-business-submit">
                    Get Details on WhatsApp
                  </button>
                  <p className="theft-business-form-note">
                    By submitting, you agree to be contacted by our insurance experts.
                  </p>
                </aside>
              </section>
            </div>
          </div>

          {/* —— What it covers (about, importance, covered grid, benefits) —— */}
          <div className="theft-business-section theft-business-section--covers">
            <div className="theft-business-about-band">
              <section className="theft-business-about-section">
                <div className="theft-business-about-content">
                  <h2>About Theft Protection</h2>
                  <p>
                    Theft protection insurance covers losses arising from burglary, robbery, or
                    break-ins at your business premises. It helps recover the value of stolen goods,
                    cash, and damaged property during the incident.
                  </p>
                </div>

                <div className="theft-business-importance">
                  <h3>Why It&apos;s Important</h3>
                  <div className="theft-business-importance-grid">
                    {THEFT_IMPORTANCE_POINTS.map((item) => (
                      <article key={item.id} className="theft-business-importance-card">
                        <i aria-hidden="true" />
                        <p>{item.text}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            <div className="theft-business-covered-band">
              <section className="theft-business-covered-section">
                <div className="theft-business-covered-block">
                  <h3>What&apos;s Covered</h3>
                  <div className="theft-business-covered-grid">
                    {THEFT_COVERED_ITEMS.map((item) => (
                      <article key={item.id} className="theft-business-covered-card">
                        <span className="theft-business-covered-icon" aria-hidden="true">
                          <TheftBusinessIcon name={item.icon} />
                        </span>
                        <p>{item.title}</p>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="theft-business-benefits-block">
                  <h3>Benefits</h3>
                  <div className="theft-business-benefits-grid">
                    {THEFT_BENEFITS.map((item) => (
                      <article key={item.id} className="theft-business-covered-card theft-business-benefit-card">
                        <span className="theft-business-covered-icon" aria-hidden="true">
                          <TheftBusinessIcon name={item.icon} />
                        </span>
                        <p>{item.title}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* —— Footer —— */}
      <div className="theft-business-section theft-business-section--footer">
        <Footer />
      </div>
    </>
  );
}

export default TheftBusiness;
