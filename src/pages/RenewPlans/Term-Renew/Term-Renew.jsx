import {
  HiOutlineBadgeCheck,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineCreditCard,
  HiOutlineDocumentText,
  HiOutlineEmojiHappy,
  HiOutlineExclamation,
  HiOutlineLockClosed,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineRefresh,
  HiOutlineShieldCheck,
  HiOutlineCalendar,
  HiOutlineSearch,
  HiOutlineKey,
  HiOutlinePaperClip,
  HiOutlineClipboardCheck,
  HiOutlineLightningBolt,
  HiOutlineBell,
  HiOutlineSupport,
  HiOutlineSparkles,
} from 'react-icons/hi';
import { useState } from 'react';
import './Term-Renew.css';
import termRenewHeroImage from '../../../assets/images/term-renew-hero.png';
import {
  MobileNumberValidation,
  EmailValidation,
  PolicyNumberValidation,
} from '../../../validations/Validations';
import TermDetails from './TermDetails';
import InsuranceFaqAccordion from '../../../components/Faq/InsuranceFaqAccordion';
import Footer from '../../../components/Footer/Footer';

const LOOKUP_METHODS = [
  {
    id: 'policy',
    label: 'Policy Number',
    icon: HiOutlineDocumentText,
    fieldLabel: 'Policy Number',
    placeholder: 'Enter your policy number',
  },
  {
    id: 'mobile',
    label: 'Mobile Number',
    icon: HiOutlinePhone,
    fieldLabel: 'Mobile Number',
    placeholder: 'Enter your mobile number',
  },
  {
    id: 'email',
    label: 'Email Address',
    icon: HiOutlineMail,
    fieldLabel: 'Email Address',
    placeholder: 'Enter your email address',
  },
];

const RENEW_MATTERS = [
  {
    id: 'financial-shield',
    icon: HiOutlineShieldCheck,
    title: 'Continuous Financial Protection',
    description: 'Keep your family financially secure without any coverage gaps.',
  },
  {
    id: 'avoid-policy',
    icon: HiOutlineExclamation,
    title: 'Avoid Policy Lapse',
    description: 'Timely renewal prevents your policy from lapsing or becoming inactive.',
  },
  {
    id: 'benefits',
    icon: HiOutlineBadgeCheck,
    title: 'Keep Existing Benefits',
    description: 'Retain your original premium rates, riders and accumulated benefits.',
  },
  {
    id: 'peace-of-mind',
    icon: HiOutlineEmojiHappy,
    title: 'Peace of Mind',
    description: 'Live worry-free knowing your loved ones remain protected.',
  },
];

const MISS_RENEW = [
  {
    id: 'lapse',
    icon: HiOutlineExclamation,
    title: 'Policy May Lapse',
    description: 'Missing the due date can deactivate your coverage entirely.',
  },
  {
    id: 'coverage-stop',
    icon: HiOutlineShieldCheck,
    title: 'Coverage May Stop',
    description: 'Your nominees may lose the financial safety net you intended.',
  },
  {
    id: 'revival',
    icon: HiOutlineRefresh,
    title: 'Revival May Be Required',
    description: 'You may need to formally revive the policy with the insurer.',
  },
  {
    id: 'verification',
    icon: HiOutlineClipboardCheck,
    title: 'Additional Verification',
    description: 'Health declarations or fresh KYC may be requested again.',
  },
];

const TERM_REVIVAL_PROCESS = [
  {
    id: 'step-1',
    no: 1,
    icon: HiOutlineClock,
    title: 'Grace Period',
    description: 'Most insurers allow 15–30 days to renew without losing benefits.',
  },
  {
    id: 'step-2',
    no: 2,
    icon: HiOutlineCheckCircle,
    title: 'Revival Eligibility',
    description: 'Policies can usually be revived within 2–5 years of lapse.',
  },
  {
    id: 'step-3',
    no: 3,
    icon: HiOutlineClipboardCheck,
    title: 'Health Declaration',
    description: 'A fresh declaration of good health may be required.',
  },
  {
    id: 'step-4',
    no: 4,
    icon: HiOutlineCreditCard,
    title: 'Outstanding Premium',
    description: 'Pay the pending premium with applicable interest to reinstate cover.',
  },
];

const Payment_Frequency = [
  {
    id: 'monthly',
    icon: HiOutlineCalendar,
    label: 'Monthly',
    subtitle: 'Small, manageable monthly instalments.',
  },
  {
    id: 'quarterly',
    icon: HiOutlineCalendar,
    label: 'Quarterly',
    subtitle: 'Pay once every three months.',

  },
  {
    id: 'Half-yearly',
    icon: HiOutlineCalendar,
    label: 'Half-Yearly',
    subtitle: 'Two payments per year.',
  },
  {
    id: 'Yearly',
    icon: HiOutlineCalendar,
    label: 'Yearly',
    subtitle: 'One-time annual premium, often discounted.'
  },
];

const Renewal_Works = [
  {
    id: 1,
    icon: HiOutlineSearch,
    title: 'Find Your Policy',
    description: 'Look up using policy number, mobile, email or DOB.',
  },
  {
    id: 2,
    icon: HiOutlineKey,
    title: 'Verify Identity',
    description: 'Quick OTP verification on your registered mobile.',
  },
  {
    id: 3,
    icon: HiOutlinePaperClip,
    title: 'Upload Documents',
    description: 'Upload your policy documents for verification.',
  },
  {
    id: 4,
    icon: HiOutlineCreditCard,
    title: 'Make Secure Payment',
    description: 'Pay your premium securely using your preferred method.',
  },
  {
    id: 5,
    icon: HiOutlineCheckCircle,
    title: 'Receive Confirmation',
    description: 'Renewed policy delivered instantly to your inbox.',
  },
  
];

const WHY_US = [
  {
    id: 'secure-transactions',
    icon: HiOutlineLockClosed,
    title: 'Secure Transactions',
    description: 'Bank-grade encryption on every payment.',
  },
  {
    id: 'instant-policy-access',
    icon: HiOutlineLightningBolt,
    title: 'Instant Policy Access',
    description: 'Retrieve and renew in under two minutes.',
  },
  {
    id: 'renewal-reminders',
    icon: HiOutlineBell,
    title: 'Renewal Reminders',
    description: 'Smart alerts so you never miss a due date.',
  },
  {
    id: 'dedicated-support',
    icon: HiOutlineSupport,
    title: 'Dedicated Support',
    description: 'Insurance experts ready to help any time.',
  },
  {
    id: 'otp-verification',
    icon: HiOutlineKey,
    title: 'OTP Verification',
    description: 'Multi-factor security on every renewal.',
  },
  {
    id: 'fast-policy-retrieval',
    icon: HiOutlineSparkles,
    title: 'Fast Policy Retrieval',
    description: 'Smart lookup across all major insurers.',
  },
];

const TERM_RENEW_FAQ = [
  {
    id: 'miss-due-date',
    question: 'What happens if I miss my premium due date?',
    answer:
      'Your policy enters a grace period. If premium is not paid within that window, the policy may lapse and your coverage can stop until it is renewed or revived.',
  },
  {
    id: 'grace-period',
    question: 'Is there a grace period?',
    answer:
      'Yes. Most insurers offer a grace period of 15–30 days after the due date, during which you can pay the premium without losing policy benefits.',
  },
  {
    id: 'revive-lapsed-policy',
    question: 'Can a lapsed policy be revived?',
    answer:
      'Yes, in most cases. Lapsed term policies can usually be revived within 2–5 years by paying outstanding premiums, applicable interest, and completing any required declarations.',
  },
  {
    id: 'change-nominee',
    question: 'Can nominee details be changed during renewal?',
    answer:
      'Yes. You can update nominee name, relationship, and share details during renewal, subject to insurer verification and policy terms.',
  },
  {
    id: 'medical-verification',
    question: 'Is medical verification required again?',
    answer:
      'Usually not for timely renewals. For lapsed policies or revival, the insurer may ask for a fresh health declaration or additional medical checks.',
  },
  {
    id: 'premium-change',
    question: 'Will my premium amount change?',
    answer:
      'For standard renewals, your existing premium typically continues as per your policy terms. Changes may apply if you alter riders, sum assured, or payment frequency.',
  },
  {
    id: 'renewed-policy-delivery',
    question: 'How will I receive my renewed policy?',
    answer:
      'After successful payment, your renewed policy document is sent instantly to your registered email. You can also download it from your policy dashboard.',
  },
  {
    id: 'auto-renewal',
    question: 'Can I enable auto-renewal?',
    answer:
      'Yes. You can opt in for auto-renewal using saved payment details so your premium is collected automatically before each due date.',
  },
];

const TermRenew = () => {
  const [currentMethod, setCurrentMethod] = useState(LOOKUP_METHODS[0]);
  const [policyNumber, setPolicyNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isopen, setIsopen] = useState(false);
  const inputhandler = (event) => {
    const value = event.target.value;
    if (currentMethod.id === 'policy') {
      setPolicyNumber(value);
    } else if (currentMethod.id === 'mobile') {
      setMobileNumber(value);
    } else {
      setEmail(value);
    }
  };

  const handleContinue = (event) => {
    event.preventDefault();

    if (currentMethod.id === 'policy') {
      if (policyNumber.length === 0) {
        window.alert('Please enter your policy number');
        return;
      }
      if (!PolicyNumberValidation.test(policyNumber)) {
        window.alert('Please enter a valid policy number');
        return;
      }
      setIsopen(true);
    } else if (currentMethod.id === 'mobile') {
      if (mobileNumber.length === 0) {
        window.alert('Please enter your mobile number');
        return;
      }
      if (!MobileNumberValidation.test(mobileNumber)) {
        window.alert('Please enter a valid mobile number');
        return;
      }
      setIsopen(true);
    } else if (currentMethod.id === 'email') {
      if (email.length === 0) {
        window.alert('Please enter your email address');
        return;
      }
      if (!EmailValidation.test(email)) {
        window.alert('Please enter a valid email address');
        return;
      }
      setIsopen(true);
    }
  };

  const methodhandler = (index) => {
    setCurrentMethod(LOOKUP_METHODS[index]);
  };

  const scrollToRenewForm = () => {
    const formCard = document.getElementById('term-renew-form');
    formCard?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const input = document.getElementById('term-policy-lookup-value');
    if (input instanceof HTMLInputElement) {
      window.setTimeout(() => input.focus(), 400);
    }
  };

  return (
    <div className="term-renew-page">
      <section className="Hero-Section term-renew-hero" aria-labelledby="term-renew-heading">
        <div className="Hero-Section-Left">
          <span className="Term-renew-badge">Term Insurance Renewal</span>
          <h1 id="term-renew-heading" className="Hero-Section-Title">
            <span className="Hero-Section-Title-Line">Keep Your Family&apos;s</span>
            <span className="Hero-Section-Title-Line Headding-Active">Protection Active</span>
          </h1>
          <div className="Hero-Section-Visual">
            <img
              src={termRenewHeroImage}
              alt="Term insurance renewal protection"
              className="Hero-Section-Image"
              loading="lazy"
              width={785}
              height={476}
            />
          </div>
        </div>

        <div className="Hero-section-right">
          <div id="term-renew-form" className="policy-retrieve-card">
            <h2 className="policy-retrieve-card__title">Retrieve Your Policy</h2>
            <p className="policy-retrieve-card__subtitle">
              Choose any one method to securely locate your policy.
            </p>

            <div className="Retrieve-Your-Policy-Options" role="tablist" aria-label="Policy lookup method">
              {LOOKUP_METHODS.map((method, index) => {
                const Icon = method.icon;
                const isActive = currentMethod.id === method.id;

                return (
                  <button
                    key={method.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => methodhandler(index)}
                    className={`policy-number${isActive ? ' is-active' : ''}`}
                  >
                    <Icon className="policy-number__icon" aria-hidden="true" />
                    <span>{method.label}</span>
                  </button>
                );
              })}
            </div>

            <form className="policy-input" onSubmit={handleContinue} noValidate>
              <label className="policy-input__label" htmlFor="term-policy-lookup-value">
                {currentMethod.fieldLabel}
              </label>
              <input
                id="term-policy-lookup-value"
                type="text"
                placeholder={currentMethod.placeholder}
                autoComplete="off"
                value={
                  currentMethod.id === 'policy'
                    ? policyNumber
                    : currentMethod.id === 'mobile'
                      ? mobileNumber
                      : email
                }
                onChange={inputhandler}
              />
              <button type="submit" className="policy-continue-button">
                <HiOutlineLockClosed className="policy-continue-button__icon" aria-hidden="true" />
                Continue Securely
              </button>
            </form>
            <TermDetails open={isopen} close={() => setIsopen(false)} />
            <p className="policy-secure-note">
              <HiOutlineLockClosed className="policy-secure-note__icon" aria-hidden="true" />
              Your information is encrypted and never shared.
            </p>
          </div>
        </div>
      </section>

      <section className="what-is-term">
        <span className="Term-renew-badge Term-renew-badge--animated">Understanding Renewal</span>
        <h2 className="what-is-term__title">What is Term Insurance Renewal?</h2>
        <p className="what-is-term__text">
          Term insurance renewal is the process of continuing your existing life insurance policy
          by paying the due premium before the policy lapses. Timely renewal helps maintain
          uninterrupted coverage and ensures your loved ones remain financially protected
          throughout the policy term.
        </p>
      </section>
      {/*Why Timely Renewal Matters*/}
      <section className="why-renew-your-term-insurance">
        <h2 className="term-renew-section__title">
          Why Timely Renewal Matters
        </h2>
        <p className="term-renew-section__subtitle">
          Every benefit of staying continuously protected.
        </p>
        <ul className="term-renew-card-grid">
          {RENEW_MATTERS.map((matter) => {
            const Icon = matter.icon;

            return (
              <li key={matter.id} className="term-renew-card">
                <div className="term-renew-card__icon">
                  <Icon aria-hidden="true" />
                </div>
                <h3 className="term-renew-card__title">
                  {matter.title}
                </h3>
                <p className="term-renew-card__text">
                  {matter.description}
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="term-renew-miss">
        <span className="term-renew-miss__badge">
          <HiOutlineExclamation aria-hidden="true" className="term-renew-miss__badge-icon" />
          Important
        </span>
        <h2 className="term-renew-section__title term-renew-section__title--wide">
          What Happens If You Miss a Renewal?
        </h2>
        <ul className="term-renew-card-grid">
          {MISS_RENEW.map((matter) => {
            const Icon = matter.icon;

            return (
              <li key={matter.id} className="term-renew-miss__card">
                <div className="term-renew-miss__icon">
                  <Icon aria-hidden="true" />
                </div>
                <h3 className="term-renew-card__title">
                  {matter.title}
                </h3>
                <p className="term-renew-card__text">
                  {matter.description}
                </p>
              </li>
            );
          })}
        </ul>
      </section>
      {/* Term Revival process */}
      <section className="term-revival-process">
        <h2 className="term-renew-section__title">
          Term Revival Process
        </h2>
        <p className="term-renew-section__subtitle">
          Reinstate a lapsed policy in a few simple steps.
        </p>
        <ul className="term-renew-card-grid">
          {TERM_REVIVAL_PROCESS.map((step) => {
            const Icon = step.icon;

            return (
              <li key={step.id} className="term-revival-process__card">
                <span className="term-revival-process__step-no">
                  {step.no}
                </span>
                <div className="term-renew-card__icon">
                  <Icon aria-hidden="true" />
                </div>
                <h3 className="term-renew-card__title">
                  {step.title}
                </h3>
                <p className="term-renew-card__text">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ul>
      </section>
      {/* Payment Frequency */}
      <section className="payment-frequency">
        <div className="payment-frequency-content">
          <h2 className="term-renew-section__title">Choose Your Payment Frequency</h2>
          <p className="term-renew-section__subtitle">Flexible options to suit your cash flow.</p>
        </div>
        <div className="payment-frequency-options">
          <ul className="payment-frequency-options-list">
            {Payment_Frequency.map((frequency) => {
              const Icon = frequency.icon;

              return (
                <li key={frequency.id} className="payment-frequency-cards">
                  <div className="payment-frequency-cards-icon">
                    <Icon aria-hidden="true" />
                  </div>
                  <span>{frequency.label}</span>
                  <p>{frequency.subtitle}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* How Renewal Works */}
      <section className="how-it-works">
        <h2 className="term-renew-section__title">How Renewal Works</h2>
        <p className="term-renew-section__subtitle">A premium, guided experience end-to-end.</p>
        <ol className="how-it-works__list">
          {Renewal_Works.map((works) => {
            const Icon = works.icon;

            return (
              <li key={works.id} className="how-it-works__card">
                <span className="how-it-works__step">{works.id}</span>
                <div className="term-renew-card__icon">
                  <Icon aria-hidden="true" />
                </div>
                <h3 className="term-renew-card__title">{works.title}</h3>
                <p className="term-renew-card__text">{works.description}</p>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Why Renew Through Us */}
      <section className="term-renew-why-us">
        <h2 className="term-renew-section__title">Why Renew Through Us</h2>
        <p className="term-renew-section__subtitle">
          Trusted by families. Built for security and speed.
        </p>
        <ul className="term-renew-card-grid term-renew-why-us__grid">
          {WHY_US.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.id} className="term-renew-card term-renew-why-us__card">
                <div className="term-renew-card__icon">
                  <Icon aria-hidden="true" />
                </div>
                <h3 className="term-renew-card__title">{item.title}</h3>
                <p className="term-renew-card__text">{item.description}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <InsuranceFaqAccordion
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about renewing your term plan."
        items={TERM_RENEW_FAQ}
        buttonLabel="View More FAQs →"
      />

      <section className="term-renew-cta" aria-labelledby="term-renew-cta-heading">
        <div className="term-renew-cta__inner">
          <div className="term-renew-cta__banner">
            <HiOutlineShieldCheck className="term-renew-cta__icon" aria-hidden="true" />
            <h2 id="term-renew-cta-heading" className="term-renew-cta__title">
              Keep Your Family Protected Without Interruption
            </h2>
            <p className="term-renew-cta__subtitle">
              Renew your term insurance policy in minutes and continue the protection your loved ones rely on.
            </p>
            <div className="term-renew-cta__actions">
              <button
                type="button"
                className="term-renew-cta__btn term-renew-cta__btn--primary"
                onClick={scrollToRenewForm}
              >
                <HiOutlineLockClosed aria-hidden="true" />
                Renew Policy Now
              </button>
              <a href="/contact-us" className="term-renew-cta__btn term-renew-cta__btn--ghost">
                <HiOutlinePhone aria-hidden="true" />
                Talk to an Advisor
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default TermRenew;
