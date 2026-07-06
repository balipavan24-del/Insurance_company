import React from 'react';
import './SeniorRenew.css';
import { useNavigate } from 'react-router-dom';
import seniorImage from '../../../assets/images/Health-senior-renew.png';
import { useState } from 'react';
import { MobileNumberValidation } from '../../../validations/Validations';
import { Senior_details } from './Senior_details';

export const SeniorRenew = () => {

  const navigate = useNavigate();
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
      <section className="car-renew-hero page-section page-section--regular page-section-container" aria-labelledby="bike-renew-heading">
        <div className="car-renew-hero__layout">
          <div className="car-renew-hero__content">
            <span className="car-renew-hero__tag">Senior Citizen Renewal</span>
            <h1 id="bike-renew-heading" className="car-renew-hero__title">
              <span className="car-renew-hero__title-line">Renew Senior Citizen</span>
              <span className="car-renew-hero__title-line car-renew-hero__title-line--gradient"> Cover with Care</span>
            </h1>
            <div className="car-renew-hero__visual">
              <img
                src={seniorImage}
                alt="Senior Citizen Renewal"
                className="car-renew-hero__visual-img"
                loading="lazy"
              />
            </div>
          </div>

          <aside className="car-renew-form-card" aria-label="Senior citizen renewal form">
            <span className="car-renew-form-card__chip">Verify in under 2 minutes</span>
            <div className="senior-renew-form-headder">
              <h2 className="car-renew-form-card__title">Verify Your Mobile Number</h2>
              <p className="car-renew-form-card__copy">
                Please verify your mobile number to continue with your health insurance renewal journey.
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
              </div>

              <p className="car-renew-form-card__helper">
                  By continuing you agree to receive a one-time SMS for verification. Your number is used only to secure your renewal.
                </p>
            </form>
          </aside>
        </div>
      </section>

      <Senior_details open={isopen} close={() => setIsopen(false)} mobileNumber={mobileNumber} />
    </div>
  )
}