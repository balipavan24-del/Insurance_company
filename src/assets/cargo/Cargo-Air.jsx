import './Cargo-Merain.css';
import cargoAirLogo from '../icons/cargo-air-logo.svg';
import Footer from '../layout/Footer';
import { sanitizePhoneNumber, validateCargoLeadDetails } from '../../utils/leadValidation';

function CargoAir({ onBackToCargo }) {
  const handleQuoteSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const validationErrors = validateCargoLeadDetails({
      fullName: formData.get('fullName'),
      businessName: formData.get('businessName'),
      mobileNumber: formData.get('mobileNumber'),
      email: formData.get('email')
    });
    if (validationErrors.length > 0) {
      window.alert(validationErrors.join('\n'));
      return;
    }
    window.alert('Thanks! Air cargo quote details captured successfully.');
  };

  return (
    <main className="cargo-merain-page page-section page-section--hero">
      <section className="cargo-merain-wrap page-section-container">
        <div className="Hero">
          <button
            type="button"
            className="cargo-merain-back-link"
            onClick={onBackToCargo}
          >
            ← Back to Cargo Insurance
          </button>

          <section className="cargo-merain-layout">
            <article className="cargo-merain-info cargo-merain-info-panel">
              <div className="cargo-merain-hero-group">
                <div className="cargo-merain-badge" aria-hidden="true">
                  <img src={cargoAirLogo} alt="Air cargo logo" decoding="async" />
                </div>

                <h1>Air Cargo Insurance</h1>
                <p>
                  Secure your air freight shipments with comprehensive coverage
                  against damage, loss, and delays during air transit.
                </p>

                <div className="cargo-merain-tags">
                  <span><i aria-hidden="true" /> Quick Response</span>
                  <span><i aria-hidden="true" /> Expert Guidance</span>
                  <span><i aria-hidden="true" /> Best Rates</span>
                </div>
              </div>
            </article>

            <article className="cargo-merain-form-card">
              <h2>Get Your Air Cargo Insurance Quote</h2>
              <p>Fill in the details and our expert will reach out to you.</p>

              <form className="cargo-merain-form" onSubmit={handleQuoteSubmit}>
                <label>
                  <span className="cargo-merain-label-text">Shipment Type <em>*</em></span>
                  <select defaultValue="" disabled aria-disabled="true">
                    <option value="">Select</option>
                    <option value="general">General Cargo</option>
                    <option value="express">Express Freight</option>
                    <option value="high-value">High Value Goods</option>
                  </select>
                </label>

                <label>
                  <span className="cargo-merain-label-text">Mode <em>*</em></span>
                  <input type="text" value="Air" readOnly />
                </label>

                <label>
                  <span className="cargo-merain-label-text">Full Name <em>*</em></span>
                  <div className="cargo-merain-input-wrap">
                    <span className="cargo-merain-input-icon" aria-hidden="true">
                      <svg viewBox="0 0 20 20" focusable="false">
                        <circle cx="10" cy="6.2" r="2.8" />
                        <path d="M4.8 15.3C5.5 12.8 7.5 11.8 10 11.8C12.5 11.8 14.5 12.8 15.2 15.3" />
                      </svg>
                    </span>
                    <input name="fullName" type="text" placeholder="Your full name" required />
                  </div>
                </label>

                <label>
                  <span className="cargo-merain-label-text">Business Name <em>*</em></span>
                  <div className="cargo-merain-input-wrap">
                    <span className="cargo-merain-input-icon" aria-hidden="true">
                      <svg viewBox="0 0 20 20" focusable="false">
                        <path d="M5.5 16V6.2H12.4V16" />
                        <path d="M12.4 16V8.8H15.8V16" />
                        <path d="M7.2 8.2H8.5M9.8 8.2H11.1M7.2 10.4H8.5M9.8 10.4H11.1" />
                      </svg>
                    </span>
                    <input name="businessName" type="text" placeholder="Company name" required />
                  </div>
                </label>

                <label>
                  <span className="cargo-merain-label-text">Mobile Number <em>*</em></span>
                  <div className="cargo-merain-input-wrap">
                    <span className="cargo-merain-input-icon" aria-hidden="true">
                      <svg viewBox="0 0 20 20" focusable="false">
                        <path d="M6.7 4.8C7.2 4.2 8.1 4.2 8.7 4.8L9.7 5.8C10.2 6.3 10.3 7.1 9.8 7.7L9.2 8.4C9.8 9.6 10.7 10.6 11.9 11.2L12.6 10.6C13.2 10.1 14 10.2 14.5 10.7L15.5 11.7C16.1 12.3 16.1 13.2 15.5 13.7L14.8 14.4C14.2 15 13.3 15.2 12.4 14.9C9.8 14.1 7.4 11.8 6.6 9.1C6.3 8.2 6.5 7.3 7.1 6.7L7.8 6" />
                      </svg>
                    </span>
                    <input
                      name="mobileNumber"
                      type="tel"
                      placeholder="10-digit mobile"
                      onChange={(event) => {
                        event.currentTarget.value = sanitizePhoneNumber(event.currentTarget.value);
                      }}
                      required
                    />
                  </div>
                </label>

                <label>
                  <span className="cargo-merain-label-text">Email</span>
                  <div className="cargo-merain-input-wrap">
                    <span className="cargo-merain-input-icon" aria-hidden="true">
                      <svg viewBox="0 0 20 20" focusable="false">
                        <rect x="3.5" y="5.6" width="13" height="8.8" rx="1.5" />
                        <path d="M4.8 7.2L10 10.5L15.2 7.2" />
                      </svg>
                    </span>
                    <input name="email" type="email" placeholder="you@company.com" />
                  </div>
                </label>
                <button type="submit" className="cargo-merain-whatsapp-btn">
                  Get Details on WhatsApp
                </button>
              </form>
              <p className="cargo-merain-note">
                By submitting, you agree to be contacted by our insurance experts.
              </p>
            </article>
          </section>
        </div>

        <section className="cargo-merain-about">
          <div className="cargo-merain-about-content">
            <h2>What is Air Cargo Insurance?</h2>
            <p>
              Air cargo insurance protects goods shipped via aircraft against a wide range
              of risks including turbulence damage, handling mishaps, theft during transit,
              and atmospheric changes. It is ideal for high-value or time-sensitive shipments
              that travel by air freight domestically or internationally.
            </p>
          </div>
        </section>

        <section className="cargo-merain-importance">
          <h2>Why It&apos;s Important</h2>
          <div className="cargo-merain-importance-grid">
            <article className="cargo-merain-importance-card">
              <i aria-hidden="true" />
              <p>Air cargo is often high-value - even small losses can have a major financial impact.</p>
            </article>
            <article className="cargo-merain-importance-card">
              <i aria-hidden="true" />
              <p>Multiple handling points between origin and destination increase the risk of damage.</p>
            </article>
            <article className="cargo-merain-importance-card">
              <i aria-hidden="true" />
              <p>Temperature and pressure changes during flight can affect sensitive goods.</p>
            </article>
            <article className="cargo-merain-importance-card">
              <i aria-hidden="true" />
              <p>Quick transit doesn&apos;t eliminate risk - accidents and theft can occur at any stage.</p>
            </article>
          </div>
        </section>

        <section className="cargo-merain-covered">
          <h2>What&apos;s Covered</h2>
          <div className="cargo-merain-covered-grid">
            <article className="cargo-merain-covered-card">
              <span className="cargo-merain-covered-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M4 12L20 4L14 20L11 13L4 12Z" />
                </svg>
              </span>
              <p>In-Flight Damage</p>
            </article>

            <article className="cargo-merain-covered-card">
              <span className="cargo-merain-covered-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M8 8L12 6L16 8V12L12 14L8 12V8Z" />
                  <path d="M12 14V18M8 10L12 12L16 10" />
                </svg>
              </span>
              <p>Handling &amp; Loading Damage</p>
            </article>

            <article className="cargo-merain-covered-card">
              <span className="cargo-merain-covered-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M12 4L20 19H4L12 4Z" />
                  <path d="M12 9V13M12 16H12.01" />
                </svg>
              </span>
              <p>Theft &amp; Pilferage</p>
            </article>

            <article className="cargo-merain-covered-card">
              <span className="cargo-merain-covered-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M12 5V19M8 9L12 5L16 9M8 15L12 19L16 15" />
                </svg>
              </span>
              <p>Temperature Variation</p>
            </article>

            <article className="cargo-merain-covered-card">
              <span className="cargo-merain-covered-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M8 4H14L18 8V20H8V4Z" />
                  <path d="M14 4V8H18M10 12H16M10 16H16" />
                </svg>
              </span>
              <p>Customs &amp; Regulatory Loss</p>
            </article>

            <article className="cargo-merain-covered-card">
              <span className="cargo-merain-covered-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M12 4L18 7V12C18 15.5 15.8 18.6 12 20C8.2 18.6 6 15.5 6 12V7L12 4Z" />
                </svg>
              </span>
              <p>Total Loss Coverage</p>
            </article>
          </div>

          <h3>Benefits</h3>
          <div className="cargo-merain-benefits-grid">
            <article className="cargo-merain-covered-card cargo-merain-benefit-card">
              <span className="cargo-merain-covered-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M12 4L18 7V12C18 15.5 15.8 18.6 12 20C8.2 18.6 6 15.5 6 12V7L12 4Z" />
                </svg>
              </span>
              <p>Rapid claim processing</p>
            </article>
            <article className="cargo-merain-covered-card cargo-merain-benefit-card">
              <span className="cargo-merain-covered-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M12 4L18 7V12C18 15.5 15.8 18.6 12 20C8.2 18.6 6 15.5 6 12V7L12 4Z" />
                </svg>
              </span>
              <p>Coverage for high-value goods</p>
            </article>
            <article className="cargo-merain-covered-card cargo-merain-benefit-card">
              <span className="cargo-merain-covered-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M12 4L18 7V12C18 15.5 15.8 18.6 12 20C8.2 18.6 6 15.5 6 12V7L12 4Z" />
                </svg>
              </span>
              <p>End-to-end transit protection</p>
            </article>
          </div>
        </section>

      </section>
      <Footer />
    </main>
  );
}

export default CargoAir;
