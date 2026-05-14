import './Cargo-Merain.css';
import cargoMarineLogo from '../../assets/icons/cargo-marine-logo.svg';
import Footer from '../../pages/Landing/Footer';
import { sanitizePhoneNumber, validateCargoLeadDetails } from '../../utils/leadValidation';

function CargoMerain({ onBackToCargo }) {
  const handleQuoteSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const validationErrors = validateCargoLeadDetails({
      fullName: formData.get('fullName'),
      businessName: formData.get('businessName'),
      mobileNumber: formData.get('mobileNumber'),
      email: formData.get('email'),
      requireEmail: true
    });
    if (validationErrors.length > 0) {
      window.alert(validationErrors.join('\n'));
      return;
    }
    window.alert('Thanks! Marine cargo quote details captured successfully.');
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
                  <img src={cargoMarineLogo} alt="Marine cargo logo" loading="lazy" />
                </div>

                <h1>Marine Cargo Insurance</h1>
                <p>
                  Protect your sea shipments against loss or damage during transit.
                  Comprehensive coverage for imports and exports across international waters.
                </p>

                <div className="cargo-merain-tags">
                  <span><i aria-hidden="true" /> Quick Response</span>
                  <span><i aria-hidden="true" /> Expert Guidance</span>
                  <span><i aria-hidden="true" /> Best Rates</span>
                </div>
              </div>
            </article>

            <article className="cargo-merain-form-card">
              <h2>Get Your Marine Cargo Insurance Quote</h2>
              <p>Fill in the details and our expert will reach out to you.</p>

              <form className="cargo-merain-form" onSubmit={handleQuoteSubmit}>
                <label>
                  <span className="cargo-merain-label-text">Shipment Type <em>*</em></span>
                  <select defaultValue="" disabled aria-disabled="true">
                    <option value="">Coming soon</option>
                    <option value="fcl">FCL Container</option>
                    <option value="lcl">LCL Cargo</option>
                    <option value="bulk">Bulk Cargo</option>
                  </select>
                </label>

                <label>
                  <span className="cargo-merain-label-text">Mode <em>*</em></span>
                  <input type="text" value="Sea" readOnly />
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
                  <span className="cargo-merain-label-text">Email <em>*</em></span>
                  <div className="cargo-merain-input-wrap">
                    <span className="cargo-merain-input-icon" aria-hidden="true">
                      <svg viewBox="0 0 20 20" focusable="false">
                        <rect x="3.5" y="5.6" width="13" height="8.8" rx="1.5" />
                        <path d="M4.8 7.2L10 10.5L15.2 7.2" />
                      </svg>
                    </span>
                    <input name="email" type="email" placeholder="you@company.com" required />
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
            <h2>What is Marine Cargo Insurance?</h2>
            <p>
              Marine cargo insurance covers goods transported by sea against risks such as sinking,
              collision, piracy, weather damage, and other perils during ocean transit. Whether
              you&apos;re importing raw materials or exporting finished products, this policy ensures
              your cargo is financially protected from port to port.
            </p>
          </div>
        </section>

        <section className="cargo-merain-importance">
          <h2>Why It&apos;s Important</h2>
          <div className="cargo-merain-importance-grid">
            <article className="cargo-merain-importance-card">
              <i aria-hidden="true" />
              <p>Sea freight carries the highest volume of global trade - losses can be significant without coverage.</p>
            </article>
            <article className="cargo-merain-importance-card">
              <i aria-hidden="true" />
              <p>Unpredictable weather, rough seas, and port delays make marine transit inherently risky.</p>
            </article>
            <article className="cargo-merain-importance-card">
              <i aria-hidden="true" />
              <p>Buyer and seller contracts often require proof of marine cargo insurance.</p>
            </article>
            <article className="cargo-merain-importance-card">
              <i aria-hidden="true" />
              <p>Protects your cash flow by covering the full invoice value of goods in transit.</p>
            </article>
          </div>
        </section>

        <section className="cargo-merain-covered">
          <h2>What&apos;s Covered</h2>
          <div className="cargo-merain-covered-grid">
            <article className="cargo-merain-covered-card">
              <span className="cargo-merain-covered-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M5 14.5V9.5L12 6L19 9.5V14.5M4 16.5H20M6.5 12.5H17.5M7 16.5C7.3 18 8.2 19 9.5 19C10.8 19 11.7 18 12 16.5C12.3 18 13.2 19 14.5 19C15.8 19 16.7 18 17 16.5" />
                </svg>
              </span>
              <p>Vessel Sinking &amp; Collision</p>
            </article>

            <article className="cargo-merain-covered-card">
              <span className="cargo-merain-covered-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M8 8H16V16H8V8Z" />
                  <path d="M8 12H16M12 8V16" />
                </svg>
              </span>
              <p>Cargo Damage &amp; Breakage</p>
            </article>

            <article className="cargo-merain-covered-card">
              <span className="cargo-merain-covered-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M12 4V20M4 12H20" />
                  <path d="M6.7 6.7C8.1 8.1 10 9 12 9C14 9 15.9 8.1 17.3 6.7M6.7 17.3C8.1 15.9 10 15 12 15C14 15 15.9 15.9 17.3 17.3" />
                </svg>
              </span>
              <p>Piracy &amp; Theft at Sea</p>
            </article>

            <article className="cargo-merain-covered-card">
              <span className="cargo-merain-covered-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M12 3V15" />
                  <path d="M8 8H16" />
                  <path d="M7 19C8 20 9.5 21 12 21C14.5 21 16 20 17 19" />
                </svg>
              </span>
              <p>Port &amp; Handling Risks</p>
            </article>

            <article className="cargo-merain-covered-card">
              <span className="cargo-merain-covered-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M8 3H16L20 7V20H4V3H8Z" />
                  <path d="M8 9H16M8 13H16M8 17H13" />
                </svg>
              </span>
              <p>General Average Contribution</p>
            </article>

            <article className="cargo-merain-covered-card">
              <span className="cargo-merain-covered-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M12 4L18 7V12C18 15.5 15.8 18.6 12 20C8.2 18.6 6 15.5 6 12V7L12 4Z" />
                </svg>
              </span>
              <p>Weather &amp; Natural Perils</p>
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
              <p>Full invoice value protection</p>
            </article>
            <article className="cargo-merain-covered-card cargo-merain-benefit-card">
              <span className="cargo-merain-covered-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M12 4L18 7V12C18 15.5 15.8 18.6 12 20C8.2 18.6 6 15.5 6 12V7L12 4Z" />
                </svg>
              </span>
              <p>Seamless claim settlement</p>
            </article>
            <article className="cargo-merain-covered-card cargo-merain-benefit-card">
              <span className="cargo-merain-covered-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M12 4L18 7V12C18 15.5 15.8 18.6 12 20C8.2 18.6 6 15.5 6 12V7L12 4Z" />
                </svg>
              </span>
              <p>Peace of mind for global trade</p>
            </article>
          </div>
        </section>
      </section>
      <Footer />
    </main>
  );
}

export default CargoMerain;
