import React from 'react';
import './SeniorRenew.css';
import { useNavigate } from 'react-router-dom';
import seniorImage from '../../../assets/images/Health-senior-renew.png';
import { useState } from 'react';
import { MobileNumberValidation } from '../../../validations/Validations';
import { Senior_details } from './Senior_details';
import Footer from '../../../components/Footer/Footer';
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
} from 'react-icons/hi';
import { HiOutlineClipboardDocument } from 'react-icons/hi2';
import { TbStethoscope } from 'react-icons/tb';


const WHY_RENEW_ON_TIME =
  [
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
    }
  ]

const COVERAGE_BUILT_FOR_SENIORS =
  [
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
    }
  ]

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
    description: 'Secure online payment — policy delivered instantly.'
  }
]


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
      <section className='Why-Renew-on-Time'>
        <div>
          <p className='Why-Renew-on-Time-eyebrow'>
            <span className='Why-Renew-on-Time-eyebrow-line' aria-hidden='true' />
            Why Renew On Time
            <span className='Why-Renew-on-Time-eyebrow-line' aria-hidden='true' />
          </p>
          <h1 className='Why-Renew-on-Time-heading'>
            Benefits of <span className='Why-Renew-on-Time-heading-accent'>timely health renewal</span>
          </h1>
          <div className='Why-Renew-on-Time-cards-container'>
            {WHY_RENEW_ON_TIME.map((item) =>
              <div className='Why-Renew-on-Time-card' key={item.id}>
                <div className='Why-Renew-on-Time-card-icon'>{item.icon}</div>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className='Coverage-Built-for-Seniors-container'>
        <div className='Coverage-Built-for-Seniors'>
          <p className='Coverage-senior-citizen-eyebrow'>
            <span className='Coverage-senior-citizen-eyebrow-line' aria-hidden='true' />
            Coverage Built for Seniors
            <span className='Coverage-senior-citizen-eyebrow-line' aria-hidden='true' />
          </p>
          <h1 className='Coverage-Built-for-Seniors-heading'>
            What's covered in a <span className='Coverage-Built-for-Seniors-heading-accent'>senior citizen plan</span>
          </h1>
          <p className='Description'>
            Comprehensive protection designed around the realities of ageing — from daily medication to critical hospitalisation.
          </p>
        </div>
        <div className='Coverage-Built-for-Seniors-cards-container'>
          {COVERAGE_BUILT_FOR_SENIORS.map((item) =>
            <div className='Coverage-buitl-for-senior-citizen-card' key={item.id}>
              <div className='Coverage-buitl-for-senior-citizen-card-icon'>{item.icon}</div>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          )}
        </div>
      </section>
      <section className='senior-renew-process' aria-labelledby='senior-renew-process-heading'>
        <div className='senior-renew-process__inner'>
          <p className='senior-renew-process__eyebrow'>
            <span className='senior-renew-process__eyebrow-line' aria-hidden='true' />
            Process
            <span className='senior-renew-process__eyebrow-line' aria-hidden='true' />
          </p>
          <h2 id='senior-renew-process-heading' className='senior-renew-process__title'>
            Renew in <span className='senior-renew-process__title-accent'>4 Simple Steps</span>
          </h2>

          <div className='senior-renew-process__steps-wrap'>
            <div className='senior-renew-process__track' aria-hidden='true' />

            <ol className='senior-renew-process__grid'>
              {RENEW_IN_SIMPLE_STEPS.map((item) =>
                <li key={item.id} className='senior-renew-process__item'>
                  <article className='senior-renew-process-card senior-renew-process-card--float'>
                    <div className='senior-renew-process-card__icon-wrap'>
                      <span className='senior-renew-process-card__icon' aria-hidden='true'>
                        {item.icon}
                      </span>
                      <span className='senior-renew-process-card__step'>{item.no}</span>
                    </div>
                    <h3 className='senior-renew-process-card__title'>{item.title}</h3>
                    <p className='senior-renew-process-card__text'>{item.description}</p>
                  </article>
                </li>
              )}
            </ol>
          </div>
        </div>
      </section>

      <Senior_details open={isopen} close={() => setIsopen(false)} mobileNumber={mobileNumber} />
      <Footer />
    </div>
  )
}