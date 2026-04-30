import { useState } from 'react';
import './Term-Home.css';

function TermHome() {
  const [isWhatsappEnabled, setIsWhatsappEnabled] = useState(true);

  return (
    <main className="term-home-page">
      <section className="term-home-layout">
        <aside className="term-quote-panel">
          <div className="term-quote-head">
            <p>Free Quote in 60 sec</p>
            <h2>Get Your Term Insurance Plan</h2>
            <span>Secure your family&apos;s future in minutes</span>
          </div>

          <div className="term-quote-whatsapp">
            <div>
              <strong>Get details on WhatsApp</strong>
              <p>{isWhatsappEnabled ? 'Plan details sent instantly' : 'WhatsApp updates are off'}</p>
            </div>
            <button
              type="button"
              className={`term-whatsapp-toggle${isWhatsappEnabled ? ' is-on' : ''}`}
              role="switch"
              aria-checked={isWhatsappEnabled}
              aria-label="Toggle WhatsApp details"
              onClick={() => setIsWhatsappEnabled((previous) => !previous)}
            />
          </div>

          <form className="term-quote-form">
            <label htmlFor="termGender">Gender *</label>
            <div className="term-gender-row" id="termGender">
              <button type="button">Male</button>
              <button type="button">Female</button>
            </div>

            <label htmlFor="termName">Full Name *</label>
            <input id="termName" type="text" placeholder="Enter your name" />

            <label htmlFor="termDob">Date of Birth *</label>
            <input id="termDob" type="text" placeholder="mm/dd/yyyy" />

            <label htmlFor="termMobile">Mobile Number *</label>
            <input id="termMobile" type="tel" placeholder="10-digit mobile" />
            <p className="term-form-note">
              {isWhatsappEnabled
                ? 'We\'ll send plan details instantly on WhatsApp'
                : 'Enable WhatsApp to receive instant plan details'}
            </p>

            <label htmlFor="termSmoke">Do you smoke? *</label>
            <div className="term-gender-row" id="termSmoke">
              <button type="button">NO</button>
              <button type="button">YES</button>
            </div>

            <button type="button" className="term-submit-btn">Get My Quote →</button>
          </form>
        </aside>

        <section className="term-content-panel">
          <h1>
            Term Insurance That <span>Protects What <em>Matters Most</em></span>
          </h1>
          <h3>Affordable protection for your family&apos;s future</h3>
          <p>
            Term insurance provides financial security to your loved ones in case of an unfortunate event.
            With high coverage at low premiums, it ensures your family&apos;s goals and lifestyle are protected.
          </p>

          <div className="term-benefits-grid">
            <article><span>↗</span> High Coverage at Low Cost</article>
            <article><span>₹</span> Tax Benefits</article>
            <article><span>◉</span> Instant Policy Issuance</article>
            <article><span>◡</span> 24/7 Claim Support</article>
          </div>

          <div className="term-feature-strip">
            <div>
              <span>⌂</span>
              <p>Family</p>
            </div>
            <div className="is-active">
              <span>🛡</span>
              <p>Protection</p>
            </div>
            <div>
              <span>♡</span>
              <p>Future</p>
            </div>
          </div>

          <div className="term-cta-row">
            <button type="button" className="term-primary-cta">Get My Quote →</button>
            <button type="button" className="term-secondary-cta">Check Plans Now</button>
          </div>
        </section>
      </section>
    </main>
  );
}

export default TermHome;
