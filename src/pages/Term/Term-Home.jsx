import { useMemo, useState } from 'react';
import './Term-Home.css';
import Footer from '../../components/Footer/Footer';
import InsuranceFaqAccordion from '../../components/Faq/InsuranceFaqAccordion';
import { termInsuranceFaqItems } from '../../data/productContent';
import TermQuotePanel from './TermQuotePanel';
import { sanitizePhoneNumber, validateTermLeadDetails } from '../../utils/validations/leadValidation';

function formatINR(value) {
  return `₹${Math.round(value).toLocaleString('en-IN')}`;
}

function formatINRShort(value) {
  const abs = Math.abs(value);
  if (abs >= 1e7) {
    const cr = value / 1e7;
    const s = cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(1);
    return `₹${s} Cr`;
  }
  if (abs >= 1e5) {
    const l = value / 1e5;
    const s = l % 1 === 0 ? l.toFixed(0) : l.toFixed(1);
    return `₹${s} L`;
  }
  if (abs >= 1e3) {
    return `₹${(value / 1e3).toFixed(0)}K`;
  }
  return formatINR(value);
}

function CalculatorIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="term-cover-calc-icon-svg">
      <rect x="5.2" y="3.4" width="13.6" height="17.2" rx="2" fill="none" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M8.2 7.4h7.6M8.2 10.2h3.2M12.6 10.2h3.2M8.2 13h3.2M12.6 13h3.2M8.2 15.8h7.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function KeyBenefitIcon({ type }) {
  if (type === 'shield') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 3.6L18 5.9V11C18 14.7 15.9 17.9 12 19.8C8.1 17.9 6 14.7 6 11V5.9L12 3.6Z" />
      </svg>
    );
  }
  if (type === 'growth') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M5.2 16.2L10.3 11.1L13.6 14.4L18.8 9.2" />
        <path d="M14.5 9.2H18.8V13.5" />
      </svg>
    );
  }
  if (type === 'tax') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="6.2" y="4.4" width="11.6" height="15.2" rx="1.8" />
        <path d="M9.2 8.2H14.8M9.2 11.2H14.8M10.2 15.8H13.8M12 13.8V17.8" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 19.2C15.8 16.9 18.6 14.3 18.6 10.8C18.6 8.6 16.9 6.9 14.8 6.9C13.6 6.9 12.6 7.4 12 8.3C11.4 7.4 10.4 6.9 9.2 6.9C7.1 6.9 5.4 8.6 5.4 10.8C5.4 14.3 8.2 16.9 12 19.2Z" />
    </svg>
  );
}

function BuyAudienceIcon({ type }) {
  if (type === 'bag') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="4.8" y="7.8" width="14.4" height="11.2" rx="2" />
        <path d="M9 7.8V6.8C9 5.7 9.9 4.8 11 4.8H13C14.1 4.8 15 5.7 15 6.8V7.8" />
        <path d="M10.3 11.3H13.7M12 9.6V13" />
      </svg>
    );
  }
  if (type === 'parents') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="9" cy="8.8" r="2.2" />
        <circle cx="15.5" cy="9.1" r="2" />
        <path d="M5.8 17.2C6.4 14.9 7.9 13.7 9.9 13.7C11.9 13.7 13.4 14.9 14 17.2" />
        <path d="M13.3 16.8C13.8 15.1 15 14.1 16.6 14.1C18.1 14.1 19.3 15 19.9 16.7" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5.4 16.2L10.4 11.2L13.7 14.5L18.7 9.5" />
      <path d="M14.5 9.5H18.7V13.7" />
    </svg>
  );
}

function CoverCriteriaIcon({ type }) {
  if (type === 'heart') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 18.8C15.6 16.6 18.2 14.1 18.2 10.8C18.2 8.8 16.7 7.3 14.7 7.3C13.6 7.3 12.7 7.8 12 8.7C11.3 7.8 10.4 7.3 9.3 7.3C7.3 7.3 5.8 8.8 5.8 10.8C5.8 14.1 8.4 16.6 12 18.8Z" />
      </svg>
    );
  }
  if (type === 'bolt') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M13.5 4.8L7.9 12H12.2L10.5 19.2L16.1 12H11.8L13.5 4.8Z" />
      </svg>
    );
  }
  if (type === 'shield') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 3.6L18 5.9V11C18 14.7 15.9 17.9 12 19.8C8.1 17.9 6 14.7 6 11V5.9L12 3.6Z" />
      </svg>
    );
  }
  if (type === 'age') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="9" cy="8.7" r="2.2" />
        <path d="M6 17C6.5 14.8 7.9 13.7 9.8 13.7C11.7 13.7 13.1 14.8 13.6 17" />
        <circle cx="16.3" cy="9.1" r="1.8" />
      </svg>
    );
  }
  if (type === 'doc') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="7" y="4.6" width="10" height="14.8" rx="1.8" />
        <path d="M10 8.6H14M10 11.6H14M10.5 15H13.5" />
        <path d="M15.2 4.6V8H18.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 18.8C15.6 16.6 18.2 14.1 18.2 10.8C18.2 8.8 16.7 7.3 14.7 7.3C13.6 7.3 12.7 7.8 12 8.7C11.3 7.8 10.4 7.3 9.3 7.3C7.3 7.3 5.8 8.8 5.8 10.8C5.8 14.1 8.4 16.6 12 18.8Z" />
    </svg>
  );
}

function PromiseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 19.4C16.1 16.8 19.2 13.9 19.2 10.2C19.2 7.7 17.3 5.8 14.9 5.8C13.7 5.8 12.6 6.3 12 7.3C11.4 6.3 10.3 5.8 9.1 5.8C6.7 5.8 4.8 7.7 4.8 10.2C4.8 13.9 7.9 16.8 12 19.4Z" />
      <path d="M10 13.1L11.7 14.8L14.9 11.6" />
    </svg>
  );
}

function MatterIcon({ type }) {
  if (type === 'shield') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 3.4L18.3 5.8V11.1C18.3 15 15.9 18.5 12 20.2C8.1 18.5 5.7 15 5.7 11.1V5.8L12 3.4Z" />
      </svg>
    );
  }
  if (type === 'family') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="8.2" cy="8.6" r="2.2" />
        <circle cx="15.8" cy="8.6" r="2.2" />
        <path d="M4.8 16.8C5.3 14.6 6.8 13.4 8.8 13.4C10.8 13.4 12.3 14.6 12.8 16.8" />
        <path d="M11.2 16.8C11.7 14.6 13.2 13.4 15.2 13.4C17.2 13.4 18.7 14.6 19.2 16.8" />
      </svg>
    );
  }
  if (type === 'home') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4.8 10.6L12 5.2L19.2 10.6" />
        <path d="M6.8 9.9V18.2H17.2V9.9" />
        <path d="M10.2 18.2V13.8H13.8V18.2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="6.1" y="8.8" width="11.8" height="9.1" rx="1.5" />
      <path d="M12 6V18" />
      <path d="M8.6 12.8H15.4" />
      <path d="M9.2 8.8V7.3C9.2 6.4 9.9 5.7 10.8 5.7H13.2C14.1 5.7 14.8 6.4 14.8 7.3V8.8" />
    </svg>
  );
}

function TermPreFooterCtaIcon() {
  return (
    <svg viewBox="0 0 56 56" aria-hidden="true" focusable="false" className="term-footer-cta-icon-svg">
      <path
        fill="currentColor"
        d="M28 10l3.2 9.4h9.9l-8 5.8 3.1 9.6L28 33.6l-8.2 5.2 3.1-9.6-8-5.8h9.9L28 10z"
      />
      <path
        fill="currentColor"
        d="M42 8h2.8v2.8H48v2.8h-3.2V16.4h-2.8v-2.8H38V11h4V8z"
      />
    </svg>
  );
}

const MONTHLY_INCOME_MIN = 10_000;
const MONTHLY_INCOME_MAX = 500_000;
const LIABILITIES_MIN = 0;
const LIABILITIES_MAX = 20_000_000;

function TermHome() {
  const [isWhatsappEnabled, setIsWhatsappEnabled] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);
  const [isSmoker, setIsSmoker] = useState(null);
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [leadQueue, setLeadQueue] = useState([]);
  const [monthlyIncome, setMonthlyIncome] = useState(50_000);
  const [totalLiabilities, setTotalLiabilities] = useState(500_000);

  const { minCover, recommendedCover } = useMemo(() => {
    const annual = monthlyIncome * 12;
    return {
      minCover: annual * 10 + totalLiabilities,
      recommendedCover: annual * 15 + totalLiabilities
    };
  }, [monthlyIncome, totalLiabilities]);

  const scrollToQuotePanel = () => {
    const isMobileView = window.matchMedia('(max-width: 1080px)').matches;
    const targetId = isMobileView ? 'term-quote-panel-mobile' : 'term-quote-panel-desktop';
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleQuoteSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateTermLeadDetails({
      fullName,
      dateOfBirth,
      mobileNumber
    });
    if (validationErrors.length > 0) {
      window.alert(validationErrors.join('\n'));
      return;
    }

    const leadPayload = {
      fullName: fullName.trim(),
      dateOfBirth: dateOfBirth.trim(),
      mobileNumber: sanitizePhoneNumber(mobileNumber),
      gender: selectedGender,
      smoker: isSmoker,
      whatsappOptIn: isWhatsappEnabled,
      createdAt: new Date().toISOString()
    };

    // Backend-ready array queue until API integration is plugged in.
    setLeadQueue((previousQueue) => [...previousQueue, leadPayload]);

    if (isWhatsappEnabled) {
      const genderLine =
        leadPayload.gender === 'male' || leadPayload.gender === 'female'
          ? leadPayload.gender.charAt(0).toUpperCase() + leadPayload.gender.slice(1)
          : 'Not specified';
      const smokerLine =
        leadPayload.smoker === 'yes' || leadPayload.smoker === 'no'
          ? leadPayload.smoker.toUpperCase()
          : 'Not specified';
      const message = [
        'Hi, I need a Term Insurance quote.',
        `Name: ${leadPayload.fullName || '-'}`,
        `Gender: ${genderLine}`,
        `DOB: ${leadPayload.dateOfBirth || '-'}`,
        `Mobile: ${leadPayload.mobileNumber || '-'}`,
        `Smoker: ${smokerLine}`
      ].join('\n');
      const whatsappUrl = `https://wa.me/91${encodeURIComponent(leadPayload.mobileNumber || '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const quotePanelProps = {
    isWhatsappEnabled,
    onWhatsappToggle: () => setIsWhatsappEnabled((previous) => !previous),
    selectedGender,
    onGenderChange: setSelectedGender,
    fullName,
    onFullNameChange: setFullName,
    dateOfBirth,
    onDateOfBirthChange: setDateOfBirth,
    mobileNumber,
    onMobileNumberChange: setMobileNumber,
    isSmoker,
    onSmokerChange: setIsSmoker,
    leadQueueLength: leadQueue.length,
    onSubmit: handleQuoteSubmit
  };

  return (
    <main className="term-home-page page-section page-section--hero">
      <section className="term-home-layout page-section-container">
        <TermQuotePanel
          {...quotePanelProps}
          panelId="term-quote-panel-desktop"
          idSuffix="Desktop"
          extraClass="term-quote-panel--desktop"
        />

        <section className="term-content-panel">
          <h1>
            Term Insurance That <span>Protects What <em>Matters Most</em></span>
          </h1>
          <h3>Affordable protection for your family&apos;s future</h3>
          <p>
            Term insurance provides financial security to your loved ones in case of an unfortunate event.
            With high coverage at low premiums, it ensures your family&apos;s goals and lifestyle are protected.
          </p>
          <TermQuotePanel
            {...quotePanelProps}
            panelId="term-quote-panel-mobile"
            idSuffix="Mobile"
            extraClass="term-quote-panel--mobile"
          />

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

          <section className="term-insurance-matters" aria-labelledby="term-insurance-matters-title">
            <h2 id="term-insurance-matters-title">Why Term Insurance Matters</h2>
            <div className="term-matters-layout">
              <div className="term-matters-grid">
                <article className="term-matter-card">
                  <span aria-hidden="true"><MatterIcon type="shield" /></span>
                  <h3>Financial Shield</h3>
                  <p>Protects your family from financial uncertainty.</p>
                </article>
                <article className="term-matter-card">
                  <span aria-hidden="true"><MatterIcon type="family" /></span>
                  <h3>Family First</h3>
                  <p>Replaces your income for dependents.</p>
                </article>
                <article className="term-matter-card">
                  <span aria-hidden="true"><MatterIcon type="home" /></span>
                  <h3>Home & Loans</h3>
                  <p>Helps repay debts so family keeps the home.</p>
                </article>
                <article className="term-matter-card">
                  <span aria-hidden="true"><MatterIcon type="goals" /></span>
                  <h3>Goals Protected</h3>
                  <p>Education, marriage, retirement covered.</p>
                </article>
              </div>
              <aside className="term-matters-illustration" aria-hidden="true">
                <span>☂</span>
              </aside>
            </div>
          </section>

          <section className="term-real-scenarios" aria-labelledby="term-real-scenarios-title">
            <h2 id="term-real-scenarios-title">Real-Life Scenarios</h2>
            <div className="term-scenarios-grid">
              <article className="term-scenario-card term-scenario-card--primary">
                <p className="term-scenario-tag">SCENARIO 1</p>
                <h3>Young Professional, Age 32</h3>
                <p>
                  Earning 10L/year secures a 1 Cr cover for about 800/month,
                  enough to protect family expenses and children&apos;s education.
                </p>
              </article>
              <article className="term-scenario-card">
                <p className="term-scenario-tag">SCENARIO 2</p>
                <h3>Parent of Two, Age 38</h3>
                <p>
                  With 15L income and a home loan, a 2 Cr term plan helps ensure
                  education and EMI continuity for dependents.
                </p>
              </article>
            </div>
          </section>

          <section className="term-cover-calculator" aria-labelledby="term-cover-calculator-title">
            <div className="term-cover-calculator-card">
              <header className="term-cover-calculator-head">
                <span className="term-cover-calculator-icon" aria-hidden="true">
                  <CalculatorIcon />
                </span>
                <div>
                  <h2 id="term-cover-calculator-title">How Much Cover Do You Need?</h2>
                  <p className="term-cover-calculator-sub">
                    Rule of thumb: annual income × 10–15 + outstanding liabilities.
                  </p>
                </div>
              </header>

              <div className="term-cover-calculator-body">
                <div className="term-cover-calculator-inputs">
                  <div className="term-cover-slider">
                    <div className="term-cover-slider-top">
                      <label htmlFor="termMonthlyIncome">Monthly Income</label>
                      <span className="term-cover-slider-value">{formatINR(monthlyIncome)}</span>
                    </div>
                    <input
                      id="termMonthlyIncome"
                      type="range"
                      min={MONTHLY_INCOME_MIN}
                      max={MONTHLY_INCOME_MAX}
                      step={1000}
                      value={monthlyIncome}
                      onChange={(event) => setMonthlyIncome(Number(event.target.value))}
                    />
                    <div className="term-cover-slider-ends">
                      <span>{formatINRShort(MONTHLY_INCOME_MIN)}</span>
                      <span>{formatINRShort(MONTHLY_INCOME_MAX)}</span>
                    </div>
                  </div>

                  <div className="term-cover-slider">
                    <div className="term-cover-slider-top">
                      <label htmlFor="termLiabilities">Total Liabilities</label>
                      <span className="term-cover-slider-value">{formatINRShort(totalLiabilities)}</span>
                    </div>
                    <input
                      id="termLiabilities"
                      type="range"
                      min={LIABILITIES_MIN}
                      max={LIABILITIES_MAX}
                      step={50_000}
                      value={totalLiabilities}
                      onChange={(event) => setTotalLiabilities(Number(event.target.value))}
                    />
                    <div className="term-cover-slider-ends">
                      <span>₹0</span>
                      <span>{formatINRShort(LIABILITIES_MAX)}</span>
                    </div>
                  </div>
                </div>

                <div className="term-cover-calculator-results">
                  <div className="term-cover-result-box term-cover-result-box--plain">
                    <p className="term-cover-result-label">Minimum Cover (10×)</p>
                    <p className="term-cover-result-amount">{formatINRShort(minCover)}</p>
                  </div>
                  <div className="term-cover-result-box term-cover-result-box--highlight">
                    <p className="term-cover-result-label">Recommended Cover (15×)</p>
                    <p className="term-cover-result-amount">{formatINRShort(recommendedCover)}</p>
                  </div>
                  <button type="button" className="term-cover-calculator-cta" onClick={scrollToQuotePanel}>
                    Get My Quote →
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="term-key-benefits" aria-labelledby="term-key-benefits-title">
            <h2 id="term-key-benefits-title">Key Benefits</h2>
            <div className="term-key-benefits-grid">
              <article className="term-key-benefit-card">
                <span className="term-key-benefit-icon" aria-hidden="true"><KeyBenefitIcon type="shield" /></span>
                <h3>Financial Security</h3>
                <p>Lump sum payout for your family&apos;s needs.</p>
              </article>
              <article className="term-key-benefit-card">
                <span className="term-key-benefit-icon" aria-hidden="true"><KeyBenefitIcon type="growth" /></span>
                <h3>Income Replacement</h3>
                <p>Substitute your earnings for years to come.</p>
              </article>
              <article className="term-key-benefit-card">
                <span className="term-key-benefit-icon" aria-hidden="true"><KeyBenefitIcon type="tax" /></span>
                <h3>Tax Benefits</h3>
                <p>Save under Sec 80C and 10(10D) (as per law).</p>
              </article>
              <article className="term-key-benefit-card">
                <span className="term-key-benefit-icon" aria-hidden="true"><KeyBenefitIcon type="heart" /></span>
                <h3>Peace of Mind</h3>
                <p>Know your family is financially safe.</p>
              </article>
            </div>
          </section>

          <section className="term-buy-sections" aria-labelledby="term-buy-sections-title">
            <h2 id="term-buy-sections-title">Who Should Buy?</h2>
            <div className="term-buy-grid">
              <article className="term-buy-card">
                <span className="term-buy-card-icon" aria-hidden="true"><BuyAudienceIcon type="bag" /></span>
                <h3>Young Professionals</h3>
                <p>Lock in low premiums early in your career.</p>
              </article>
              <article className="term-buy-card">
                <span className="term-buy-card-icon" aria-hidden="true"><BuyAudienceIcon type="parents" /></span>
                <h3>Parents</h3>
                <p>Secure your children&apos;s future and education.</p>
              </article>
              <article className="term-buy-card">
                <span className="term-buy-card-icon" aria-hidden="true"><BuyAudienceIcon type="owners" /></span>
                <h3>Business Owners</h3>
                <p>Protect family from business liabilities.</p>
              </article>
            </div>

            <div className="term-buy-cta-band">
              <div>
                <h3>Secure your family today</h3>
                <p>Compare top-rated term plans in seconds.</p>
              </div>
              <button type="button" className="term-buy-cta-btn" onClick={scrollToQuotePanel}>
                Secure My Family →
              </button>
            </div>
          </section>

          <section className="term-buy-timeline" aria-labelledby="term-buy-timeline-title">
            <h2 id="term-buy-timeline-title">When is the Right Time to Buy?</h2>
            <div className="term-buy-timeline-line" aria-hidden="true" />
            <div className="term-buy-timeline-grid">
              <article>
                <span>20s</span>
                <p>Lowest premiums, longest cover</p>
              </article>
              <article>
                <span>30s</span>
                <p>Lock rates before responsibilities grow</p>
              </article>
              <article>
                <span>40s</span>
                <p>Cover loans & dependents</p>
              </article>
              <article>
                <span>50s+</span>
                <p>Limited options and higher premiums</p>
              </article>
            </div>
          </section>

          <section className="term-cover-details" aria-labelledby="term-cover-details-title">
            <h2 id="term-cover-details-title">What Does It Cover?</h2>
            <div className="term-cover-details-grid">
              <article className="term-cover-details-card">
                <span className="term-cover-details-icon" aria-hidden="true"><CoverCriteriaIcon type="heart" /></span>
                <h3>Natural Death</h3>
                <p>Full sum assured paid to nominee.</p>
              </article>
              <article className="term-cover-details-card">
                <span className="term-cover-details-icon" aria-hidden="true"><CoverCriteriaIcon type="bolt" /></span>
                <h3>Accidental Death</h3>
                <p>Higher payout with accidental rider.</p>
              </article>
              <article className="term-cover-details-card">
                <span className="term-cover-details-icon" aria-hidden="true"><CoverCriteriaIcon type="shield" /></span>
                <h3>Optional Riders</h3>
                <p>Critical illness, disability, waiver.</p>
              </article>
            </div>
          </section>

          <section className="term-eligibility" aria-labelledby="term-eligibility-title">
            <h2 id="term-eligibility-title">Eligibility Criteria</h2>
            <div className="term-cover-details-grid">
              <article className="term-cover-details-card term-cover-details-card--center">
                <span className="term-cover-details-icon" aria-hidden="true"><CoverCriteriaIcon type="age" /></span>
                <h3>Age</h3>
                <p>18-65 years</p>
              </article>
              <article className="term-cover-details-card term-cover-details-card--center">
                <span className="term-cover-details-icon" aria-hidden="true"><CoverCriteriaIcon type="doc" /></span>
                <h3>Income proof</h3>
                <p>ITR / salary slips</p>
              </article>
              <article className="term-cover-details-card term-cover-details-card--center">
                <span className="term-cover-details-icon" aria-hidden="true"><CoverCriteriaIcon type="heart" /></span>
                <h3>Health</h3>
                <p>Basic declaration</p>
              </article>
            </div>
          </section>

          <section className="term-emotional-cta" aria-labelledby="term-emotional-cta-title">
            <div className="term-emotional-cta-content">
              <h2 id="term-emotional-cta-title">Because Their Tomorrow Depends on Today</h2>
              <p>
                Life is unpredictable. The smile on your child&apos;s face, your spouse&apos;s dreams, your
                parents&apos; comfort — they all depend on the choices you make today.
              </p>
              <p className="term-emotional-cta-bold">
                A term plan is the smallest commitment with the biggest promise: that they&apos;ll be okay,
                no matter what.
              </p>
              <button type="button" className="term-emotional-cta-btn" onClick={scrollToQuotePanel}>
                Secure My Family →
              </button>
            </div>
            <aside className="term-emotional-cta-visual" aria-hidden="true">
              <span className="term-emotional-cta-icon"><PromiseIcon /></span>
            </aside>
          </section>

          <section className="term-footer-cta" aria-labelledby="term-footer-cta-heading">
            <div className="term-footer-cta-inner">
              <span className="term-footer-cta-icon-wrap" aria-hidden="true">
                <TermPreFooterCtaIcon />
              </span>
              <h2 id="term-footer-cta-heading" className="term-footer-cta-title">
                Still thinking? Get a personalized plan in seconds
              </h2>
              <p className="term-footer-cta-sub">
                Compare ₹1 Cr+ plans from top insurers. Zero spam, instant quotes.
              </p>
              <button type="button" className="term-footer-cta-btn" onClick={scrollToQuotePanel}>
                Get My Quote →
              </button>
            </div>
          </section>

        </section>
      </section>

      <div className="term-faq-section-wrapper">
        <InsuranceFaqAccordion
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about term insurance plans, coverage, and costs."
          items={termInsuranceFaqItems}
        />
      </div>

      <Footer />
    </main>
  );
}

export default TermHome;
