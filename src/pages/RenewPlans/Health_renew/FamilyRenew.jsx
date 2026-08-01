import React from 'react';
import './SeniorRenew.css';
import { useState } from 'react';
import { MobileNumberValidation } from '../../../validations/Validations';
import familyImage from '../../../assets/images/Health-family-renew.png';
import {
  WhyRenewOnTime,
  WhatsCovered,
  RenewProcess,
  FaqSection,
  NeedHelpRenewing,
} from '../../../components/HealthRenew/Healt_Renew_Comp';
import Footer from '../../../components/Footer/Footer';
import FamilyDetails from './FamilyDetails';

const FamilyRenew = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [isopen, setIsopen] = useState(false);

  const handleMobileChange = (event) => {
    const value = event.target.value.replace(/\D/g, '').slice(0, 10);
    setMobileNumber(value);
  };

  const handleContinue = (event) => {
    event.preventDefault();
    if (mobileNumber.length === 0) {
      window.alert('Please enter your mobile number');
      return;
    }
    if (!MobileNumberValidation.test(mobileNumber)) {
      window.alert('Please enter a valid 10-digit mobile number');
      return;
    }
    setIsopen(true);
  };

  return (
    <div className="renew-plans-page renew-plans-page--senior">
      <section className="car-renew-hero page-section page-section--regular page-section-container" aria-labelledby="family-renew-heading">
        <div className="car-renew-hero__layout">
          <div className="car-renew-hero__content">
            <span className="car-renew-hero__tag">Family Floater Renewal</span>
            <h1 id="family-renew-heading" className="car-renew-hero__title">
              <span className="car-renew-hero__title-line">Renew Family Health</span>
              <span className="car-renew-hero__title-line car-renew-hero__title-line--gradient"> Cover with Care</span>
            </h1>
            <div className="car-renew-hero__visual">
              <img
                src={familyImage}
                alt="Family Health Renewal"
                className="car-renew-hero__visual-img"
                loading="lazy"
              />
            </div>
          </div>

          <aside className="car-renew-form-card" aria-label="Family health renewal form">
            <span className="car-renew-form-card__chip">Verify in under 2 minutes</span>
            <div className="senior-renew-form-headder">
              <h2 className="car-renew-form-card__title">Verify Your Mobile Number</h2>
              <p className="car-renew-form-card__copy">
                Please verify your mobile number to continue with your family health insurance renewal journey.
              </p>
            </div>

            <form className="senior-renew-form" onSubmit={handleContinue} noValidate>
              <div>
                <label className="car-renew-form-card__label" htmlFor="mobileNumber">
                  Mobile Number
                </label>
                <input
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                  className="car-renew-form-card__input"
                  placeholder="Enter your mobile number"
                  aria-label="Mobile number"
                  inputMode="numeric"
                  maxLength={10}
                  value={mobileNumber}
                  onChange={handleMobileChange}
                />
                <button type="submit" className="car-renew-form-card__primary-btn">
                  Continue →
                </button>
                <FamilyDetails open={isopen} close={() => setIsopen(false)} mobileNumber={mobileNumber} />
              </div>
              <p className="car-renew-form-card__helper">
                By continuing you agree to receive a one-time SMS for verification. Your number is used only to secure your renewal.
              </p>
            </form>
          </aside>
        </div>
      </section>
      <WhyRenewOnTime />
      <WhatsCovered
        eyebrow="Coverage Built for Your Family"
        heading="What's covered in your family health plan"
        headingAccent="family health plan"
        description="Comprehensive protection designed for your family’s everyday medical needs — from check-ups to critical hospitalisation."
      />
      <RenewProcess />
      <FaqSection
        title="Frequently Asked Questions"
        subtitle="Quick answers to common family health renewal queries."
        items={[
          {
            id: '1',
            question: 'Can I add a new family member while renewing?',
            answer: 'Yes, you can add new members during renewal. Premium and terms may change based on age and health declarations.',
          },
          {
            id: '2',
            question: 'Will my no-claim bonus be retained?',
            answer: 'Yes, timely renewal helps you retain cumulative bonuses and waiting-period benefits.',
          },
          {
            id: '3',
            question: 'What happens if I miss the renewal due date?',
            answer: 'Most insurers offer a grace period of 15–30 days. Beyond that, the policy may lapse and you may lose continuity benefits.',
          },
          {
            id: '4',
            question: 'Can I upgrade my sum insured during renewal?',
            answer: 'Yes, renewal is the right time to enhance coverage. Additional premium and medical underwriting may apply.',
          },
          {
            id: '5',
            question: 'Are cashless hospitals the same for all plans?',
            answer: 'Network hospital lists vary by insurer. We recommend verifying your preferred hospitals before finalising renewal.',
          },
        ]}
      />
      <NeedHelpRenewing
        title="Need help renewing?"
        subtitle="Our experts are here to guide you through your family health renewal."
        primaryCta="Renew Your Policy"
        secondaryCta="Talk to an Expert"
      />
      <Footer />
    </div>
  )
}

export default FamilyRenew;