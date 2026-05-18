import './Cargo-Merain.css';
import cargoInlandLogo from '../icons/cargo-inland-logo.svg';
import Footer from '../layout/Footer';
import { sanitizePhoneNumber, validateCargoLeadDetails } from '../../utils/leadValidation';

function CargoInland({ onBackToCargo }) {
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
    window.alert('Thanks! Inland transit quote details captured successfully.');
  };

  return (
    <main className="cargo-merain-page cargo-inland-theme page-section page-section--hero">
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
                  <img src={cargoInlandLogo} alt="Inland cargo logo" decoding="async" />
                </div>

                <h1>Inland Transit Insurance</h1>
                <p>
                  Comprehensive coverage for goods transported by road and rail
                  within the country. Protect your domestic shipments from origin
                  to destination.
                </p>

                <div className="cargo-merain-tags">
                  <span><i aria-hidden="true" /> Quick Response</span>
                  <span><i aria-hidden="true" /> Expert Guidance</span>
                  <span><i aria-hidden="true" /> Best Rates</span>
                </div>
              </div>
            </article>

            <article className="cargo-merain-form-card">
              <h2>Get Your Inland Transit Insurance Quote</h2>
              <p>Fill in the details and our expert will reach out to you.</p>

              <form className="cargo-merain-form" onSubmit={handleQuoteSubmit}>
                <label>
                  <span className="cargo-merain-label-text">Shipment Type <em>*</em></span>
                  <select defaultValue="" disabled aria-disabled="true">
                    <option value="">Select</option>
                    <option value="road">Road Transit</option>
                    <option value="rail">Rail Transit</option>
                    <option value="mixed">Mixed Movement</option>
                  </select>
                </label>

                <label>
                  <span className="cargo-merain-label-text">Mode <em>*</em></span>
                  <input type="text" value="Road / Rail" readOnly />
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
            <h2>What is Inland Transit Insurance?</h2>
            <p>
              Inland transit insurance covers goods during domestic transportation by
              road or rail. It protects against risks such as accidents, overturning,
              theft, fire, and natural calamities that can occur during land-based
              movement of cargo across cities and states.
            </p>
          </div>
        </section>

        <section className="cargo-merain-importance">
          <h2>Why It&apos;s Important</h2>
          <div className="cargo-merain-importance-grid">
            <article className="cargo-merain-importance-card">
              <i aria-hidden="true" />
              <p>Road accidents and vehicle breakdowns are common risks in domestic freight movement.</p>
            </article>
            <article className="cargo-merain-importance-card">
              <i aria-hidden="true" />
              <p>Goods are exposed to theft and pilferage at multiple stops and transit points.</p>
            </article>
            <article className="cargo-merain-importance-card">
              <i aria-hidden="true" />
              <p>Natural calamities like floods and landslides can damage cargo during land transit.</p>
            </article>
            <article className="cargo-merain-importance-card">
              <i aria-hidden="true" />
              <p>Without coverage, the transporter&apos;s liability is limited - the shipper bears the loss.</p>
            </article>
          </div>
        </section>

        <section className="cargo-merain-covered">
          <h2>What&apos;s Covered</h2>
          <div className="cargo-merain-covered-grid">
            <article className="cargo-merain-covered-card">
              <span className="cargo-merain-covered-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M4 14H10V9H14L20 14V18H18.5C18.2 19.1 17.2 20 16 20C14.8 20 13.8 19.1 13.5 18H10.5C10.2 19.1 9.2 20 8 20C6.8 20 5.8 19.1 5.5 18H4V14Z" />
                  <path d="M7 17H9M15 17H17" />
                </svg>
              </span>
              <p>Road Accident &amp; Overturning</p>
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
                  <path d="M8 8L12 6L16 8V12L12 14L8 12V8Z" />
                  <path d="M12 14V18M8 10L12 12L16 10" />
                </svg>
              </span>
              <p>Loading &amp; Unloading Damage</p>
            </article>
            <article className="cargo-merain-covered-card">
              <span className="cargo-merain-covered-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M12 3C9 7 7 9.7 7 13C7 15.8 9.2 18 12 18C14.8 18 17 15.8 17 13C17 9.7 15 7 12 3Z" />
                </svg>
              </span>
              <p>Fire &amp; Explosion</p>
            </article>
            <article className="cargo-merain-covered-card">
              <span className="cargo-merain-covered-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M8 4H14L18 8V20H8V4Z" />
                  <path d="M14 4V8H18M10 12H16M10 16H16" />
                </svg>
              </span>
              <p>Natural Calamity Damage</p>
            </article>
            <article className="cargo-merain-covered-card">
              <span className="cargo-merain-covered-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M12 4L18 7V12C18 15.5 15.8 18.6 12 20C8.2 18.6 6 15.5 6 12V7L12 4Z" />
                </svg>
              </span>
              <p>Total Loss Protection</p>
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
              <p>Faster claim support</p>
            </article>
            <article className="cargo-merain-covered-card cargo-merain-benefit-card">
              <span className="cargo-merain-covered-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M12 4L18 7V12C18 15.5 15.8 18.6 12 20C8.2 18.6 6 15.5 6 12V7L12 4Z" />
                </svg>
              </span>
              <p>Wider domestic movement protection</p>
            </article>
            <article className="cargo-merain-covered-card cargo-merain-benefit-card">
              <span className="cargo-merain-covered-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M12 4L18 7V12C18 15.5 15.8 18.6 12 20C8.2 18.6 6 15.5 6 12V7L12 4Z" />
                </svg>
              </span>
              <p>Peace of mind for every dispatch</p>
            </article>
          </div>
        </section>
      </section>
      <Footer />
    </main>
  );
}

export default CargoInland;
