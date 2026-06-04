import { useEffect } from 'react';
import './ContactHumanModal.css';

function ContactHumanModal({ isOpen, onClose, title = 'Talk to a Real Human' }) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscClose = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleEscClose);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener('keydown', handleEscClose);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="contact-human-modal__overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-human-modal-title"
      onClick={onClose}
    >
      <section className="contact-human-modal__card" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="contact-human-modal__close"
          onClick={onClose}
          aria-label="Close contact form"
        >
          ×
        </button>

        <div className="contact-human-modal__grid">
          <article className="contact-human-modal__form-card">
            <h2 id="contact-human-modal-title" className="contact-human-modal__title">Send Us a Message</h2>
            <p className="contact-human-modal__subtitle">We&apos;ll get back to you as soon as possible.</p>

            <form className="contact-human-modal__form" onSubmit={(event) => event.preventDefault()}>
              <label className="contact-human-modal__label" htmlFor="human-fullName">Full Name</label>
              <input id="human-fullName" className="contact-human-modal__input" type="text" placeholder="Your full name" />

              <div className="contact-human-modal__row-two">
                <div>
                  <label className="contact-human-modal__label" htmlFor="human-mobileNumber">Mobile Number</label>
                  <input id="human-mobileNumber" className="contact-human-modal__input" type="tel" placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className="contact-human-modal__label" htmlFor="human-emailAddress">Email Address</label>
                  <input id="human-emailAddress" className="contact-human-modal__input" type="email" placeholder="your@email.com" />
                </div>
              </div>

              <label className="contact-human-modal__label" htmlFor="human-insuranceType">Insurance Type</label>
              <select id="human-insuranceType" className="contact-human-modal__input">
                <option>Select an insurance type</option>
                <option>Motor Insurance</option>
                <option>Health Insurance</option>
                <option>Term Insurance</option>
                <option>Business Insurance</option>
                <option>Cargo Insurance</option>
              </select>

              <label className="contact-human-modal__label" htmlFor="human-messageText">Message</label>
              <textarea id="human-messageText" className="contact-human-modal__input contact-human-modal__textarea" placeholder="How can we help?" />

              <label className="contact-human-modal__checkbox-row" htmlFor="human-whatsappUpdates">
                <input id="human-whatsappUpdates" type="checkbox" defaultChecked />
                Get updates on WhatsApp
              </label>

              <button type="button" className="contact-human-modal__submit">
                Request a Callback <span aria-hidden="true">→</span>
              </button>
            </form>
          </article>

          <aside className="contact-human-modal__side">
            <article className="contact-human-modal__info-card">
              <h3 className="contact-human-modal__info-title">{title}</h3>
              <p className="contact-human-modal__info-subtitle">
                Prefer a quick chat? Our advisors guide you through every step - no jargon, no pressure.
              </p>

              <div className="contact-human-modal__info-list">
                <div className="contact-human-modal__info-row">
                  <span className="contact-human-modal__info-label">Toll Free</span>
                  <p className="contact-human-modal__info-value">+91 1800-123-4567</p>
                </div>
                <div className="contact-human-modal__info-row">
                  <span className="contact-human-modal__info-label">WhatsApp</span>
                  <p className="contact-human-modal__info-value">Chat instantly</p>
                </div>
                <div className="contact-human-modal__info-row">
                  <span className="contact-human-modal__info-label">Working Hours</span>
                  <p className="contact-human-modal__info-value">Mon-Sat, 9 AM - 7 PM</p>
                </div>
              </div>
            </article>

            <article className="contact-human-modal__trust-card">
              <p className="contact-human-modal__trust-title">100% Secure & Confidential</p>
              <p className="contact-human-modal__trust-subtitle">Your details are never shared with third parties.</p>
            </article>
          </aside>
        </div>
      </section>
    </div>
  );
}

export default ContactHumanModal;
