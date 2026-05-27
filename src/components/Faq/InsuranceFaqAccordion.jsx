import { useState } from 'react';
import DropdownChevron from '../Dropdown/DropdownChevron';
import './InsuranceFaqAccordion.css';
function InsuranceFaqAccordion({ title, subtitle, items, buttonLabel = 'View More FAQs →' }) {
  const [openFaqId, setOpenFaqId] = useState('');

  return (
    <section id="insurance-faqs" className="business-home-faqs" aria-label="Frequently asked questions">
      <div className="business-coverage-wrap page-section-container">
        <div className="business-home-faqs__card">
          <header className="business-home-faqs__header">
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </header>

          <div className="business-home-faqs__list" role="list" aria-label="Insurance FAQ items">
            {items.map((item) => (
              <article
                key={item.id}
                className={`business-home-faqs__item business-home-faqs__item--accordion ${openFaqId === item.id ? 'is-open dropdown-open' : ''}`}
                role="listitem"
              >
                <button
                  type="button"
                  className="business-home-faqs__question"
                  onClick={() => setOpenFaqId((current) => (current === item.id ? '' : item.id))}
                  aria-expanded={openFaqId === item.id}
                  aria-controls={`business-faq-answer-${item.id}`}
                >
                  <span>{item.question}</span>
                  <DropdownChevron className="dropdown-arrow--faq" />                </button>
                <div
                  id={`business-faq-answer-${item.id}`}
                  className={`business-home-faqs__answer-wrap ${openFaqId === item.id ? 'is-open' : ''}`}
                  aria-hidden={openFaqId !== item.id}
                >
                  <p className="business-home-faqs__answer">
                    {item.answer}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <button type="button" className="business-home-faqs__more-btn">{buttonLabel}</button>
        </div>
      </div>
    </section>
  );
}

export default InsuranceFaqAccordion;
