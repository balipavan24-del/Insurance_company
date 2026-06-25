import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineShieldCheck,
  HiOutlineUser,
} from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import '../../Motor/Renew_Details/Renew.css';

const INSURERS = [
  'ICICI Lombard',
  'HDFC ERGO',
  'Bajaj Allianz',
  'Tata AIG',
  'Max Life',
  'HDFC Life',
  'LIC',
  'SBI Life',
];

function TermRenewModal({ open, onClose, policyRef }) {
  const navigate = useNavigate();
  const [flowStep, setFlowStep] = useState('policy');
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [city, setCity] = useState('');
  const [whatsappOptIn, setWhatsappOptIn] = useState(true);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setFlowStep('policy');
      setFullName('');
      setMobileNumber('');
      setCity('');
      setWhatsappOptIn(true);
    }
  }, [open]);

  const handleClose = () => {
    setFlowStep('policy');
    onClose();
  };

  const viewQuotes = () => {
    handleClose();
    navigate('/quotes');
  };

  if (!open) {
    return null;
  }

  return (
    <div className="renew-pop-bg" role="dialog" aria-modal="true" aria-label="Term renewal details">
      <div className="renew-pop" onClick={(event) => event.stopPropagation()}>
        {flowStep === 'policy' && (
          <div className="renew-pop-plans">
            <div className="renew-pop-plans__inner">
              <div className="renew-pop__head renew-pop__head--plans">
                <button
                  type="button"
                  className="renew-pop__back"
                  onClick={handleClose}
                  aria-label="Close policy details"
                >
                  <span aria-hidden="true">←</span>
                </button>
                <div className="renew-pop__left">
                  <h4>Policy Details</h4>
                </div>
                <div className="renew-pop__right">
                  <button type="button" className="renew-pop__close" onClick={handleClose} aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
              </div>

              <div className="renew-pop-plans__scroll">
                <div className="renew-pop-policy">
                  <p>Existing Insurance Provider</p>
                  <input type="text" placeholder="Search insurer..." />
                  <div className="renew-pop-policy-select">
                    {INSURERS.map((insurer) => (
                      <button key={insurer} type="button" className="policy-provider-btn">
                        {insurer}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="policy-state">
                  <p>Has your previous policy expired?</p>
                  <button type="button" className="policy-status-btn">Yes</button>
                  <button type="button" className="policy-status-btn">No</button>
                </div>

                <div className="policy-claim">
                  <p>Any claim made in the previous year?</p>
                  <button type="button" className="policy-claim-btn">Yes</button>
                  <button type="button" className="policy-claim-btn">No</button>
                </div>

                <div className="policy-type">
                  <p>Existing Policy Type</p>
                  <button type="button" className="policy-type-btn">Term Life</button>
                  <button type="button" className="policy-type-btn">Return of Premium</button>
                  <button type="button" className="policy-type-btn">Whole Life</button>
                </div>
              </div>

              <div className="renew-pop__footer renew-pop__footer--plans">
                <button type="button" className="view-plans-btn" onClick={() => setFlowStep('owner')}>
                  Continue →
                </button>
              </div>
            </div>
          </div>
        )}

        {flowStep === 'owner' && (
          <div className="renew-pop-owner">
            <header className="renew-pop-owner__head">
              <button
                type="button"
                className="renew-pop__back"
                onClick={() => setFlowStep('policy')}
                aria-label="Back to policy details"
              >
                <span aria-hidden="true">←</span>
              </button>
              <button type="button" className="renew-pop__close" onClick={handleClose} aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
              <div className="renew-pop-owner__title-wrap">
                <h4>Owner Details</h4>
              </div>
            </header>

            <form
              className="renew-pop-owner__form"
              onSubmit={(event) => {
                event.preventDefault();
                viewQuotes();
              }}
            >
              <label className="renew-pop-owner__field" htmlFor="term-renew-owner-name">
                <span className="renew-pop-owner__label">Full Name</span>
                <span className="renew-pop-owner__input-wrap">
                  <HiOutlineUser className="renew-pop-owner__input-icon" aria-hidden="true" />
                  <input
                    id="term-renew-owner-name"
                    type="text"
                    placeholder="Your name"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    autoComplete="name"
                  />
                </span>
              </label>

              <label className="renew-pop-owner__field" htmlFor="term-renew-owner-mobile">
                <span className="renew-pop-owner__label">Mobile Number</span>
                <span className="renew-pop-owner__input-wrap">
                  <HiOutlinePhone className="renew-pop-owner__input-icon" aria-hidden="true" />
                  <input
                    id="term-renew-owner-mobile"
                    type="tel"
                    placeholder="9876543210"
                    value={mobileNumber}
                    onChange={(event) => setMobileNumber(event.target.value)}
                    autoComplete="tel"
                  />
                </span>
              </label>

              <label className="renew-pop-owner__field" htmlFor="term-renew-owner-city">
                <span className="renew-pop-owner__label">City</span>
                <span className="renew-pop-owner__input-wrap">
                  <HiOutlineLocationMarker className="renew-pop-owner__input-icon" aria-hidden="true" />
                  <input
                    id="term-renew-owner-city"
                    type="text"
                    placeholder="Hyderabad"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    autoComplete="address-level2"
                  />
                </span>
              </label>

              <label className="renew-pop-owner__whatsapp" htmlFor="term-renew-owner-whatsapp">
                <input
                  id="term-renew-owner-whatsapp"
                  type="checkbox"
                  checked={whatsappOptIn}
                  onChange={(event) => setWhatsappOptIn(event.target.checked)}
                />
                <FaWhatsapp className="renew-pop-owner__whatsapp-icon" aria-hidden="true" />
                <span>Get policy updates on WhatsApp</span>
              </label>

              <div className="renew-pop-owner__footer">
                <button type="submit" className="view-plans-btn renew-pop-owner__submit">
                  <HiOutlineShieldCheck className="renew-pop-owner__submit-icon" aria-hidden="true" />
                  View Renewal Quotes
                </button>
                <p className="renew-pop-owner__terms">
                  By continuing, you agree to our terms &amp; privacy policy.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default TermRenewModal;
