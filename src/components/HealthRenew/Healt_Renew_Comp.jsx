import React, { useState } from 'react';
import './Healt_Renew_Comp.css';
import {
  HiOutlineShieldCheck,
  HiOutlineCheckCircle,
  HiOutlineThumbUp,
  HiOutlineClock,
  HiOutlineLockClosed,
  HiOutlineCurrencyRupee,
  HiOutlineClipboardCheck,
  HiOutlineCash,
  HiOutlineBeaker,
  HiOutlineHeart,
  HiOutlineTruck,
  HiOutlineHand,
  HiOutlinePhone,
} from 'react-icons/hi';
import { HiOutlineClipboardDocument } from 'react-icons/hi2';
import { TbStethoscope } from 'react-icons/tb';
import InsuranceFaqAccordion from '../Faq/InsuranceFaqAccordion';
import ContactHumanModal from '../ContactHumanModal/ContactHumanModal';

const DEFAULT_WHY_RENEW_CARDS = [
  {
    id: 1,
    icon: <HiOutlineShieldCheck />,
    title: 'Continuous Coverage',
    description: 'Avoid waiting periods restarting by renewing on time.',
  },
  {
    id: 2,
    icon: <HiOutlineCheckCircle />,
    title: 'Retain Benefits',
    description: 'Keep no-claim bonuses, cumulative bonus and tenure perks.',
  },
  {
    id: 3,
    icon: <HiOutlineThumbUp />,
    title: 'Family Peace of Mind',
    description: 'Stay protected against unexpected medical expenses.',
  },
  {
    id: 4,
    icon: <HiOutlineClock />,
    title: 'Skip Re-Underwriting',
    description: 'Avoid fresh medicals required for lapsed policies.',
  },
  {
    id: 5,
    icon: <HiOutlineCurrencyRupee />,
    title: 'Cost-Effective Renewal',
    description: 'Renew at a lower cost compared to new policy purchases.',
  },
  {
    id: 6,
    icon: <HiOutlineLockClosed />,
    title: 'Secure Payments',
    description: 'Bank-grade encryption on every transaction.',
  },
];

const DEFAULT_COVERAGE_CARDS = [
  {
    id: 1,
    icon: <HiOutlineClipboardCheck />,
    title: 'Pre-existing Diseases',
    description: 'Coverage for diabetes, BP, heart conditions after a short waiting period.',
  },
  {
    id: 2,
    icon: <HiOutlineCash />,
    title: 'Cashless Hospitalisation',
    description: 'Direct claim settlement across 10,000+ network hospitals.',
  },
  {
    id: 3,
    icon: <HiOutlineBeaker />,
    title: 'Pre & Post Hospitalisation',
    description: 'Medicines, diagnostics and follow-ups covered up to 60+90 days.',
  },
  {
    id: 4,
    icon: <HiOutlineHeart />,
    title: 'Annual Health Check-ups',
    description: 'Free preventive check-ups every policy year for early detection.',
  },
  {
    id: 5,
    icon: <HiOutlineTruck />,
    title: 'Road Ambulance Cover',
    description: 'Reimbursement for emergency ambulance charges to the hospital.',
  },
  {
    id: 6,
    icon: <HiOutlineHand />,
    title: 'Domiciliary Treatment',
    description: 'Treatment taken at home when hospitalisation isn t feasible.',
  },
  {
    id: 7,
    icon: <HiOutlineClock />,
    title: 'Day-Care Procedures',
    description: 'Cataract, dialysis, chemotherapy and 500+ day-care treatments.',
  },
  {
    id: 8,
    icon: <HiOutlineLockClosed />,
    title: 'Lifetime Renewability',
    description: 'Continue your cover for life with no upper exit age.',
  },
];

const RENEW_IN_SIMPLE_STEPS = [
  {
    id: 1,
    no: '1',
    icon: <HiOutlineClipboardCheck />,
    title: 'Verify Mobile Number',
    description: 'Secure OTP verification on your registered number.',
  },
  {
    id: 2,
    no: '2',
    icon: <HiOutlineClipboardDocument />,
    title: 'Choose Your Plan',
    description: 'Review insurer, sum insured and member details.',
  },
  {
    id: 3,
    no: '3',
    icon: <TbStethoscope />,
    title: 'Update Health Info',
    description: 'Pay securely and receive your policy instantly.',
  },
  {
    id: 4,
    no: '4',
    icon: <HiOutlineCheckCircle />,
    title: 'Pay & Renew',
    description: 'Secure online payment — policy delivered instantly.',
  },
];

// Reusable section: Why Renew On Time
export const WhyRenewOnTime = ({ cards = DEFAULT_WHY_RENEW_CARDS }) => {
  return (
    <section className="Why-Renew-on-Time">
      <div>
        <p className="Why-Renew-on-Time-eyebrow">
          <span className="Why-Renew-on-Time-eyebrow-line" aria-hidden="true" />
          Why Renew On Time
          <span className="Why-Renew-on-Time-eyebrow-line" aria-hidden="true" />
        </p>
        <h1 className="Why-Renew-on-Time-heading">
          Benefits of <span className="Why-Renew-on-Time-heading-accent">timely health renewal</span>
        </h1>
        <div className="Why-Renew-on-Time-cards-container">
          {cards.map((item) => (
            <div className="Why-Renew-on-Time-card" key={item.id}>
              <div className="Why-Renew-on-Time-card-icon">{item.icon}</div>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Reusable section: What's covered
export const WhatsCovered = ({
  eyebrow = 'Coverage Built for You',
  heading = 'What\'s covered in your health plan',
  headingAccent = 'health plan',
  description = 'Comprehensive protection designed for your everyday medical needs — from check-ups to critical hospitalisation.',
  cards = DEFAULT_COVERAGE_CARDS,
}) => {
  return (
    <section className="Coverage-Built-for-Seniors-container">
      <div className="Coverage-Built-for-Seniors">
        <p className="Coverage-senior-citizen-eyebrow">
          <span className="Coverage-senior-citizen-eyebrow-line" aria-hidden="true" />
          {eyebrow}
          <span className="Coverage-senior-citizen-eyebrow-line" aria-hidden="true" />
        </p>
        <h1 className="Coverage-Built-for-Seniors-heading">
          What&apos;s covered in a <span className="Coverage-Built-for-Seniors-heading-accent">{headingAccent}</span>
        </h1>
        <p className="Description">{description}</p>
      </div>
      <div className="Coverage-Built-for-Seniors-cards-container">
        {cards.map((item) => (
          <div className="Coverage-buitl-for-senior-citizen-card" key={item.id}>
            <div className="Coverage-buitl-for-senior-citizen-card-icon">{item.icon}</div>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// Reusable section: Process
export const RenewProcess = () => {
  return (
    <section className="senior-renew-process" aria-labelledby="senior-renew-process-heading">
      <div className="senior-renew-process__inner">
        <p className="senior-renew-process__eyebrow">
          <span className="senior-renew-process__eyebrow-line" aria-hidden="true" />
          Process
          <span className="senior-renew-process__eyebrow-line" aria-hidden="true" />
        </p>
        <h2 id="senior-renew-process-heading" className="senior-renew-process__title">
          Renew in <span className="senior-renew-process__title-accent">4 Simple Steps</span>
        </h2>

        <div className="senior-renew-process__steps-wrap">
          <div className="senior-renew-process__track" aria-hidden="true" />

          <ol className="senior-renew-process__grid">
            {RENEW_IN_SIMPLE_STEPS.map((item) => (
              <li key={item.id} className="senior-renew-process__item">
                <article className="senior-renew-process-card senior-renew-process-card--float">
                  <div className="senior-renew-process-card__icon-wrap">
                    <span className="senior-renew-process-card__icon" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span className="senior-renew-process-card__step">{item.no}</span>
                  </div>
                  <h3 className="senior-renew-process-card__title">{item.title}</h3>
                  <p className="senior-renew-process-card__text">{item.description}</p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

// Reusable section: Frequently Asked Questions
export const FaqSection = ({ title, subtitle, items, buttonLabel = 'View More FAQs →' }) => {
  return (
    <InsuranceFaqAccordion
      title={title}
      subtitle={subtitle}
      items={items}
      buttonLabel={buttonLabel}
    />
  );
};

// Reusable section: Need help renewing?
export const NeedHelpRenewing = ({ title, subtitle, primaryCta = 'Renew Your Policy', secondaryCta = 'Talk to an Expert' }) => {
  const [isTalkToHumanOpen, setIsTalkToHumanOpen] = useState(false);

  const scrollToRenewForm = () => {
    const input = document.getElementById('mobileNumber');
    if (input) {
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      window.setTimeout(() => input.focus(), 400);
    }
  };

  return (
    <>
      <section className="senior-renew-support" aria-labelledby="senior-renew-support-heading">
        <div className="senior-renew-support__inner">
          <div className="senior-renew-support__banner">
            <h2 id="senior-renew-support-heading" className="senior-renew-support__title">
              {title}
            </h2>
            <p className="senior-renew-support__subtitle">{subtitle}</p>
            <div className="senior-renew-support__actions">
              <button
                type="button"
                className="senior-renew-support__btn senior-renew-support__btn--primary"
                onClick={scrollToRenewForm}
              >
                {primaryCta}
                <span aria-hidden="true">→</span>
              </button>
              <button
                type="button"
                className="senior-renew-support__btn senior-renew-support__btn--ghost"
                onClick={() => setIsTalkToHumanOpen(true)}
              >
                <HiOutlinePhone aria-hidden="true" />
                {secondaryCta}
              </button>
            </div>
          </div>
        </div>
      </section>

      <ContactHumanModal
        isOpen={isTalkToHumanOpen}
        onClose={() => setIsTalkToHumanOpen(false)}
        title="Talk to a Real Human"
      />
    </>
  );
};

const Healt_Renew_Comp = ({
  whyRenewCards,
  coverageEyebrow,
  coverageHeadingAccent,
  coverageDescription,
  coverageCards,
  faqTitle,
  faqSubtitle,
  faqItems,
  faqButtonLabel,
  supportTitle,
  supportSubtitle,
  supportPrimaryCta,
  supportSecondaryCta,
}) => {
  return (
    <>
      <WhyRenewOnTime cards={whyRenewCards} />
      <WhatsCovered
        eyebrow={coverageEyebrow}
        headingAccent={coverageHeadingAccent}
        description={coverageDescription}
        cards={coverageCards}
      />
      <RenewProcess />
      <FaqSection
        title={faqTitle}
        subtitle={faqSubtitle}
        items={faqItems}
        buttonLabel={faqButtonLabel}
      />
      <NeedHelpRenewing
        title={supportTitle}
        subtitle={supportSubtitle}
        primaryCta={supportPrimaryCta}
        secondaryCta={supportSecondaryCta}
      />
    </>
  );
};

export default Healt_Renew_Comp;
