import { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import InsuranceFaqAccordion from '../shared/InsuranceFaqAccordion';
import Footer from '../layout/Footer';
import { contactSupportFaqItems } from '../../productContent';
import './ContactUs.css';

const IconSpark = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M17.7 6.3l-2.8 2.8M9.1 14.9l-2.8 2.8" />
  </svg>
);

const IconBolt = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M13 2 5 13h6l-1 9 8-11h-6l1-9Z" />
  </svg>
);

const IconChat = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20 11.5c0 4.4-3.8 8-8.5 8a9 9 0 0 1-3.7-.8L3.5 20l1.4-3.6A7.5 7.5 0 0 1 3 11.5c0-4.1 3.8-7.5 8.5-7.5S20 7.4 20 11.5Z" />
  </svg>
);

const IconShield = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 3 5 6v6c0 5 3.5 8.8 7 10 3.5-1.2 7-5 7-10V6l-7-3Zm0 5.4a3.6 3.6 0 1 1 0 7.2 3.6 3.6 0 0 1 0-7.2Z" />
  </svg>
);

const IconHeadset = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 13a8 8 0 0 1 16 0v5a3 3 0 0 1-3 3h-1v-7h4M4 14h4v7H7a3 3 0 0 1-3-3v-4Z" />
  </svg>
);

const IconArrowRight = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const IconPhone = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M15.8 14.6c-1.7 1.7-3.8 3-5.2 1.6-2-2-3.2-3.7-5.2-1.7C3.3 16.5 5.4 20 7.4 22c2 2 5.6 4.2 7.6 2.2 2-2-0.3-3.2-2.3-5.2-1.4-1.4-0.1-3.5 1.6-5.2 0.3-0.3 0.7-0.3 1 0l1.9 1.9c0.6 0.6 1.6 0.6 2.1 0l2.1-2.1c0.6-0.6 0.6-1.6 0-2.1L17.4 7c-0.3-0.3-0.7-0.3-1 0-1.7 1.7-3.8 3-5.2 1.6-2-2-3.2-3.7-5.2-1.7" />
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm0 2 8 5 8-5" />
  </svg>
);

const IconPin = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 22c4-4.7 6-8.4 6-11a6 6 0 1 0-12 0c0 2.6 2 6.3 6 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
  </svg>
);

const IconClock = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v6l4 2" />
  </svg>
);

const IconWhatsApp = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
    />
  </svg>
);

const IconGuidance = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
    <path d="M4 20a8 8 0 0 1 16 0" />
    <path d="M18 8h3M19.5 6.5v3" />
  </svg>
);

const IconClaimSupport = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8 12.5 10.5 15 16 9.5" />
    <path d="M12 3 6 6v6c0 4.5 2.9 7.8 6 9 3.1-1.2 6-4.5 6-9V6l-6-3Z" />
  </svg>
);

const IconPlanCompare = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 4v14" />
    <path d="M8 8h8" />
    <path d="M5 8 3 11h4L5 8Zm14 0-2 3h4l-2-3Z" />
    <path d="M7 11a2 2 0 0 1-4 0M21 11a2 2 0 0 1-4 0" />
    <path d="M9 18h6" />
  </svg>
);

const IconRenewal = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20 7v5h-5" />
    <path d="M4 17v-5h5" />
    <path d="M6.5 9.5A7 7 0 0 1 18 7" />
    <path d="M17.5 14.5A7 7 0 0 1 6 17" />
  </svg>
);

const supportHighlights = [
  { label: 'Fast Response', icon: IconBolt },
  { label: 'WhatsApp Support', icon: IconChat },
  { label: 'Expert Guidance', icon: IconShield },
  { label: 'Claim Assistance', icon: IconHeadset },
];

const connectCards = [
  {
    title: 'Call Us',
    primary: '+91 1800-123-4567',
    secondary: 'Mon-Sat, 9 AM - 7 PM',
    action: 'Call Now',
    icon: IconPhone,
    tintClass: 'contact-connect__icon-shell--blue',
  },
  {
    title: 'WhatsApp Support',
    primary: 'Quick assistance, anytime',
    secondary: 'Avg. reply in 5 mins',
    action: 'Chat on WhatsApp',
    icon: IconChat,
    tintClass: 'contact-connect__icon-shell--green',
  },
  {
    title: 'Email Support',
    primary: 'support@insureease.com',
    secondary: 'Response within 24 hours',
    action: 'Send Email',
    icon: IconMail,
    tintClass: 'contact-connect__icon-shell--indigo',
  },
  {
    title: 'Office Address',
    primary: 'Hitec City, Hyderabad',
    secondary: 'Visit us during work hours',
    action: 'View Location',
    icon: IconPin,
    tintClass: 'contact-connect__icon-shell--purple',
  },
];

const whyReachOutCards = [
  {
    id: 'personalized-guidance',
    title: 'Personalized Guidance',
    description: 'Plans tailored to your needs and budget.',
    icon: IconGuidance,
    tintClass: 'contact-why__icon-shell--blue',
  },
  {
    id: 'quick-claim-assistance',
    title: 'Quick Claim Assistance',
    description: 'Step-by-step support during claims.',
    icon: IconClaimSupport,
    tintClass: 'contact-why__icon-shell--purple',
  },
  {
    id: 'plan-comparison-support',
    title: 'Plan Comparison Support',
    description: 'Compare top insurers side by side.',
    icon: IconPlanCompare,
    tintClass: 'contact-why__icon-shell--amber',
  },
  {
    id: 'renewal-help',
    title: 'Renewal Help',
    description: 'Never miss a renewal - we remind and assist.',
    icon: IconRenewal,
    tintClass: 'contact-why__icon-shell--green',
  },
];

function ContactInfoRow({
  icon: Icon,
  label,
  value,
  tintClass,
}) {
  return (
    <div className="contact-message__info-row">
      <span className={`contact-connect__icon-shell ${tintClass}`} aria-hidden="true">
        <Icon />
      </span>
      <div>
        <p className="contact-message__info-label">{label}</p>
        <p className="contact-message__info-value">{value}</p>
      </div>
    </div>
  );
}

const OFFICE_MAP_EMBED =
  'https://www.google.com/maps?q=HITEC+City%2C+Hyderabad%2C+Telangana%2C+India&z=14&output=embed';
const OFFICE_DIRECTIONS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=' +
  encodeURIComponent('InsureEase HQ, Hitec City, Hyderabad, Telangana 500081');

function OfficeInfoBlock({ icon: Icon, title, children }) {
  return (
    <div className="contact-office__block">
      <span className="contact-office__block-icon contact-connect__icon-shell contact-connect__icon-shell--blue" aria-hidden="true">
        <Icon />
      </span>
      <div className="contact-office__block-body">
        <h3 className="contact-office__block-title">{title}</h3>
        <div className="contact-office__block-text">{children}</div>
      </div>
    </div>
  );
}

function ContactUs() {
  useLayoutEffect(() => {
    // Ensure Contact Us always starts from the hero section on mount.
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const scrollToMessageForm = () => {
    document.getElementById('contact-message-title')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const infoRows = [
    { icon: IconPhone, label: 'Toll Free', value: '+91 1800-123-4567', tintClass: 'contact-connect__icon-shell--blue' },
    { icon: IconChat, label: 'WhatsApp', value: 'Chat instantly', tintClass: 'contact-connect__icon-shell--green' },
    { icon: IconShield, label: 'Working Hours', value: 'Mon-Sat, 9 AM - 7 PM', tintClass: 'contact-connect__icon-shell--indigo' },
  ];

  return (
    <>
    <main className="contact-page page-section page-section-container" aria-labelledby="contact-hero-title">
      <section className="contact-hero">
        <div className="contact-hero__intro">
          <span className="contact-hero__chip">
            <span className="contact-hero__icon" aria-hidden="true"><IconSpark /></span>
            Contact Us
          </span>

          <h1 id="contact-hero-title" className="contact-hero__title">
            <span className="contact-hero__title-line">
              We&apos;re <span className="contact-hero__title-accent">Here to</span>
            </span>
            <span className="contact-hero__title-line contact-hero__title-accent">Help</span>
          </h1>
        </div>

        <div className="contact-hero__image-shell" aria-label="Contact support illustration">
          <img
            className="contact-hero__image"
            src={`${import.meta.env.BASE_URL}images/Contact-Us.webp`}
            alt="Customer support executive helping with insurance queries"
          />
        </div>

        <div className="contact-hero__content">
          <div className="contact-hero__heading-desktop">
            <span className="contact-hero__chip">
              <span className="contact-hero__icon" aria-hidden="true"><IconSpark /></span>
              Contact Us
            </span>

            <h1 id="contact-hero-title" className="contact-hero__title">
              <span className="contact-hero__title-line">
                We&apos;re <span className="contact-hero__title-accent">Here to</span>
              </span>
              <span className="contact-hero__title-line contact-hero__title-accent">Help</span>
            </h1>
          </div>

          <p className="contact-hero__description">
            Whether you need help choosing a plan, filing a claim, or understanding coverage, our
            insurance experts are ready to assist you.
          </p>

          <div className="contact-hero__badges" aria-label="Support highlights">
            {supportHighlights.map((item) => (
              <span key={item.label} className="contact-hero__badge">
                <span className="contact-hero__icon" aria-hidden="true"><item.icon /></span>
                {item.label}
              </span>
            ))}
          </div>

          <div className="contact-hero__actions">
            <button type="button" className="contact-hero__btn contact-hero__btn--primary">
              Request a Callback
              <span className="contact-hero__icon contact-hero__icon--arrow" aria-hidden="true"><IconArrowRight /></span>
            </button>
            <Link to="/?contact=whatsapp" className="contact-hero__btn contact-hero__btn--ghost">
              <span className="contact-hero__icon" aria-hidden="true"><IconChat /></span>
              WhatsApp Us
            </Link>
          </div>
        </div>
      </section>

      <section className="contact-connect" aria-labelledby="contact-connect-title">
        <div className="contact-connect__inner">
          <header className="contact-connect__header">
            <h2 id="contact-connect-title" className="contact-connect__title">
              How Would You Like to <span>Connect?</span>
            </h2>
            <p className="contact-connect__subtitle">Choose the most convenient way to reach our team.</p>
          </header>

          <div className="contact-connect__grid">
            {connectCards.map((card) => (
              <article key={card.title} className="contact-connect__card">
                <span className={`contact-connect__icon-shell ${card.tintClass}`} aria-hidden="true">
                  <card.icon />
                </span>
                <h3 className="contact-connect__card-title">{card.title}</h3>
                <p className="contact-connect__card-primary">{card.primary}</p>
                <p className="contact-connect__card-secondary">{card.secondary}</p>
                <button type="button" className="contact-connect__action">
                  {card.action}
                  <span className="contact-hero__icon" aria-hidden="true"><IconArrowRight /></span>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-message" aria-labelledby="contact-message-title">
        <div className="contact-message__grid">
          <article className="contact-message__form-card">
            <h2 id="contact-message-title" className="contact-message__title">Send Us a Message</h2>
            <p className="contact-message__subtitle">We&apos;ll get back to you as soon as possible.</p>

            <form className="contact-message__form">
              <label className="contact-message__label" htmlFor="fullName">Full Name</label>
              <input id="fullName" className="contact-message__input" type="text" placeholder="Your full name" />

              <div className="contact-message__row-two">
                <div>
                  <label className="contact-message__label" htmlFor="mobileNumber">Mobile Number</label>
                  <input id="mobileNumber" className="contact-message__input" type="tel" placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className="contact-message__label" htmlFor="emailAddress">Email Address</label>
                  <input id="emailAddress" className="contact-message__input" type="email" placeholder="your@email.com" />
                </div>
              </div>

              <label className="contact-message__label" htmlFor="insuranceType">Insurance Type</label>
              <select id="insuranceType" className="contact-message__input">
                <option>Select an insurance type</option>
                <option>Motor Insurance</option>
                <option>Health Insurance</option>
                <option>Term Insurance</option>
                <option>Business Insurance</option>
                <option>Cargo Insurance</option>
              </select>

              <label className="contact-message__label" htmlFor="messageText">Message</label>
              <textarea id="messageText" className="contact-message__input contact-message__textarea" placeholder="How can we help?" />

              <label className="contact-message__checkbox-row" htmlFor="whatsappUpdates">
                <input id="whatsappUpdates" type="checkbox" defaultChecked />
                Get updates on WhatsApp
              </label>

              <button type="button" className="contact-hero__btn contact-hero__btn--primary contact-message__submit">
                Request a Callback
                <span className="contact-hero__icon contact-hero__icon--arrow" aria-hidden="true"><IconArrowRight /></span>
              </button>
            </form>
          </article>

          <aside className="contact-message__side">
            <article className="contact-message__info-card">
              <h3 className="contact-message__info-title">Talk to a Real Human</h3>
              <p className="contact-message__info-subtitle">
                Prefer a quick chat? Our advisors guide you through every step - no jargon, no pressure.
              </p>
              <div className="contact-message__info-list">
                {infoRows.map((item) => (
                  <ContactInfoRow
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    value={item.value}
                    tintClass={item.tintClass}
                  />
                ))}
              </div>
            </article>

            <article className="contact-message__trust-card">
              <span className="contact-connect__icon-shell contact-connect__icon-shell--blue" aria-hidden="true">
                <IconShield />
              </span>
              <p className="contact-message__trust-title">100% Secure & Confidential</p>
              <p className="contact-message__trust-subtitle">Your details are never shared with third parties.</p>
            </article>
          </aside>
        </div>
      </section>

      <section className="contact-why" aria-labelledby="contact-why-title">
        <div className="contact-why__inner">
          <header className="contact-why__header">
            <h2 id="contact-why-title" className="contact-why__title">
              Why <span>Reach Out</span> to Us?
            </h2>
            <p className="contact-why__subtitle">Real experts, real answers - every time.</p>
          </header>

          <div className="contact-why__grid">
            {whyReachOutCards.map((item) => (
              <article key={item.id} className="contact-why__card">
                <span className={`contact-why__icon-shell ${item.tintClass}`} aria-hidden="true">
                  <item.icon />
                </span>
                <h3 className="contact-why__card-title">{item.title}</h3>
                <p className="contact-why__card-description">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <InsuranceFaqAccordion
        title="Frequently Asked Questions"
        subtitle="Quick answers to common support and claim assistance questions."
        items={contactSupportFaqItems}
      />

      <section className="contact-office" aria-labelledby="contact-office-title">
        <div className="contact-office__inner">
          <header className="contact-office__header">
            <h2 id="contact-office-title" className="contact-office__title">
              Visit Our <span>Office</span>
            </h2>
            <p className="contact-office__subtitle">Drop by â€” we&apos;d love to meet you in person.</p>
          </header>

          <div className="contact-office__grid">
            <div className="contact-office__map-shell">
              <iframe
                className="contact-office__map"
                title="Map of HITEC City, Hyderabad â€” InsureEase office area"
                src={OFFICE_MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <article className="contact-office__card">
              <OfficeInfoBlock icon={IconPin} title="Office Address">
                <p>InsureEase HQ, Hitec City, Hyderabad, Telangana 500081</p>
              </OfficeInfoBlock>

              <OfficeInfoBlock icon={IconClock} title="Working Hours">
                <p>Monday â€“ Saturday: 9 AM â€“ 7 PM</p>
                <p>Sunday: WhatsApp &amp; Email only</p>
              </OfficeInfoBlock>

              <OfficeInfoBlock icon={IconPhone} title="Contact Details">
                <p>
                  <a href="tel:+9118001234567">+91 1800-123-4567</a>
                </p>
                <p>
                  <a href="mailto:support@insureease.com">support@insureease.com</a>
                </p>
              </OfficeInfoBlock>

              <a
                href={OFFICE_DIRECTIONS_URL}
                className="contact-office__directions"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-office__directions-icon" aria-hidden="true">
                  <IconPin />
                </span>
                Get Directions
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className="contact-choose" aria-labelledby="contact-choose-title">
        <div className="contact-choose__inner">
          <div className="contact-choose__banner">
            <h2 id="contact-choose-title" className="contact-choose__title">
              Need Help Choosing the Right Insurance Plan?
            </h2>
            <p className="contact-choose__subtitle">
              Talk to our experts and get personalized guidance in minutes.
            </p>
            <div className="contact-choose__actions">
              <button
                type="button"
                className="contact-choose__btn contact-choose__btn--expert"
                onClick={scrollToMessageForm}
              >
                Talk to an Expert
                <span className="contact-choose__btn-arrow" aria-hidden="true">
                  <IconArrowRight />
                </span>
              </button>
              <Link to="/?contact=whatsapp" className="contact-choose__btn contact-choose__btn--whatsapp">
                <span className="contact-choose__btn-wa-icon" aria-hidden="true">
                  <IconWhatsApp />
                </span>
                WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}

export default ContactUs;

