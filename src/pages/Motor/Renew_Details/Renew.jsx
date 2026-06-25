import './Renew.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineShieldCheck,
  HiOutlineUser,
} from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

const INSURERS = [
  'ICICI Lombard',
  'HDFC ERGO',
  'Bajaj Allianz',
  'Tata AIG',
  'Reliance General',
  'SBI General',
  'Acko',
  'Digit',
  'National Insurance',
  'Future Generali',
  'New India Assurance',
  'Oriental Insurance',
  'United India',
];

const vechile_details = {
  AP09AB1234: {
    brand: 'Hero',
    model: 'Splendor Plus',
    variant: 'Drum',
    fuel: 'Petrol',
    year: '2020',
    city: 'Jaipur',
  },
  AP09AB1235: {
    brand: 'bajaj',
    model: 'pulsar 150',
    variant: 'Single Disc',
    fuel: 'Petrol',
    year: '2022',
    city: 'Jurgon',
  },
  AP09AB1236: {
    brand: 'Royal Enfield',
    model: 'Hunter 350',
    variant: 'Retro',
    fuel: 'Petrol',
    year: '2024',
    city: 'Jurgon',
  },
  AP09AB1237: {
    brand: 'TATA',
    model: 'Commercial Vehicle',
    variant: 'Drum',
    fuel: 'desiel',
    year: '2021',
    city: 'Jurgon',
  },
  AP09AB1238: {
    brand: 'Mahindra',
    model: 'Thar',
    variant: 'Drum',
    fuel: 'Petrol',
    year: '2023',
    city: 'Jurgon',
  },
  AP09AB1239: {
    brand: 'Maruti Suzuki',
    model: 'Swift',
    variant: 'Drum',
    fuel: 'Petrol',
    year: '2020',
    city: 'Jurgon',
  },
  AP09AB1240: {
    brand: 'Mahindra',
    model: 'Alto',
    variant: 'Drum',
    fuel: 'Diesel',
    year: '2022',
    city: 'Jurgon',
  },
  AP09AB1241: {
    brand: 'Mahindra',
    model: 'Ape',
    variant: 'Drum',
    fuel: 'Diesel',
    year: '2023',
    city: 'Jurgon',
  },
};

function Renew({ open, onClose, vechileNumber }) {
  const navigate = useNavigate();
  const [flowStep, setFlowStep] = useState('vehicle');
  const [isLookupLoading, setIsLookupLoading] = useState(false);
  const [isPlansLoading, setIsPlansLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [city, setCity] = useState('');
  const [whatsappOptIn, setWhatsappOptIn] = useState(true);
  const [providerSearch, setProviderSearch] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [policyExpired, setPolicyExpired] = useState('');
  const [previousClaim, setPreviousClaim] = useState('');
  const [existingPolicyType, setExistingPolicyType] = useState('');

  const normalizedNumber = String(vechileNumber ?? '').trim().toUpperCase();
  const vehicleDetails = vechile_details[normalizedNumber];

  const resetFlow = () => {
    setFlowStep('vehicle');
    setIsLookupLoading(false);
    setIsPlansLoading(false);
    setFullName('');
    setMobileNumber('');
    setCity('');
    setWhatsappOptIn(true);
    setProviderSearch('');
    setSelectedProvider('');
    setPolicyExpired('');
    setPreviousClaim('');
    setExistingPolicyType('');
  };

  const handleClose = () => {
    resetFlow();
    onClose();
  };

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      resetFlow();
      return undefined;
    }

    setIsLookupLoading(true);
    const timer = window.setTimeout(() => {
      const details = vechile_details[normalizedNumber] ?? null;
      console.log({
        type: 'renew.details',
        vechileNumber: normalizedNumber,
        success: Boolean(details),
        vehicleDetails: details,
        message: details
          ? 'Vehicle details retrieved successfully.'
          : 'Vehicle lookup failed. No details found.',
      });
      setIsLookupLoading(false);
    }, 700);

    return () => window.clearTimeout(timer);
  }, [open, normalizedNumber]);

  function continueToPolicy() {
    setIsPlansLoading(true);
    window.setTimeout(() => {
      setFlowStep('policy');
      setIsPlansLoading(false);
    }, 700);
  }

  function continueToOwner() {
    console.log({
      type: 'renew.details',
      step: 'policy',
      vechileNumber: normalizedNumber,
      vehicleDetails: vehicleDetails ?? null,
      insuranceProvider: selectedProvider || null,
      policyExpired: policyExpired || null,
      claimMade: previousClaim || null,
      policyType: existingPolicyType || null,
      message: 'Policy details captured.',
    });
    setFlowStep('owner');
  }

  function viewQuotes() {
    console.log({
      type: 'renew.details',
      step: 'owner',
      vechileNumber: normalizedNumber,
      vehicleDetails: vehicleDetails ?? null,
      insuranceProvider: selectedProvider || null,
      policyExpired: policyExpired || null,
      claimMade: previousClaim || null,
      policyType: existingPolicyType || null,
      owner: {
        fullName,
        mobileNumber,
        city,
        whatsappOptIn,
      },
      message: 'Renewal flow completed. Navigating to quotes.',
    });
    handleClose();
    navigate('/quotes');
  }

  if (!open) {
    return null;
  }

  const filteredInsurers = INSURERS.filter((insurer) =>
    insurer.toLowerCase().includes(providerSearch.trim().toLowerCase()),
  );

  return (
    <div
      className="renew-pop-bg"
      role="dialog"
      aria-modal="true"
      aria-label="Renew details"
      onClick={handleClose}
    >
      <div
        className="renew-pop"
        onClick={(event) => event.stopPropagation()}
      >
        {(isLookupLoading || isPlansLoading) && (
          <div className="renew-pop__loader" aria-live="polite" aria-busy="true">
            <span className="renew-pop__loader-spinner" aria-hidden="true" />
            <p>{isPlansLoading ? 'Loading plans...' : 'Looking up vehicle...'}</p>
          </div>
        )}

        {!isLookupLoading && !isPlansLoading && (
          <>
            {vehicleDetails ? (
              <>
                {flowStep === 'vehicle' && (
                  <>
                    <div className="renew-pop__head">
                      <div className="renew-pop__left">
                        <h3>Vehicle lookup</h3>
                        <h4>Vehicle details found</h4>
                      </div>
                      <div className="renew-pop__right">
                        <button type="button" className="renew-pop__close" onClick={handleClose} aria-label="Close">
                          <span aria-hidden="true">×</span>
                        </button>
                        <p className="renew-pop__plate">{normalizedNumber}</p>
                      </div>
                    </div>
                    <p>We found your vehicle details. Continue to view renewal plans.</p>
                    <div className="renew-pop__body">
                      <div className="vechile-details-">
                        <p>Registration Number</p>
                        <p>{normalizedNumber}</p>
                      </div>
                      <div className="vechile-details-">
                        <p>BRAND</p>
                        <p>{vehicleDetails.brand || '-'}</p>
                      </div>
                      <div className="vechile-details-">
                        <p>MODEL</p>
                        <p>{vehicleDetails.model || '-'}</p>
                      </div>
                      <div className="vechile-details-">
                        <p>VARIENT</p>
                        <p>{vehicleDetails.variant || '-'}</p>
                      </div>
                      <div className="vechile-details-">
                        <p>FUEL TYPE</p>
                        <p>{vehicleDetails.fuel || '-'}</p>
                      </div>
                      <div className="vechile-details-">
                        <p>Registration Year</p>
                        <p>{vehicleDetails.year || '-'}</p>
                      </div>
                      <div className="vechile-details-">
                        <p>Registration City</p>
                        <p>{vehicleDetails.city || '-'}</p>
                      </div>
                    </div>
                    <div className="renew-pop__footer">
                      <button
                        type="button"
                        className="view-plans-btn"
                        onClick={continueToPolicy}
                        disabled={isPlansLoading}
                      >
                        Continue to View Plans →
                      </button>
                      <p>Details auto-fetched from your registration number.</p>
                    </div>
                  </>
                )}

                {flowStep === 'policy' && (
                  <div className="renew-pop-plans">
                    <div className="renew-pop-plans__inner">
                      <div className="renew-pop__head renew-pop__head--plans">
                        <button
                          type="button"
                          className="renew-pop__back"
                          onClick={() => setFlowStep('vehicle')}
                          aria-label="Back to vehicle details"
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
                          <input
                            type="text"
                            placeholder="Search insurer..."
                            value={providerSearch}
                            onChange={(event) => setProviderSearch(event.target.value)}
                          />
                          <div className="renew-pop-policy-select">
                            {filteredInsurers.map((insurer) => (
                              <button
                                key={insurer}
                                type="button"
                                className={`policy-provider-btn${selectedProvider === insurer ? ' policy-provider-btn--active' : ''}`}
                                onClick={() => setSelectedProvider(insurer)}
                              >
                                {insurer}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="policy-state">
                          <p>Has your previous policy expired?</p>
                          <button
                            type="button"
                            className={`policy-status-btn${policyExpired === 'yes' ? ' policy-status-btn--active' : ''}`}
                            onClick={() => setPolicyExpired('yes')}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            className={`policy-status-btn${policyExpired === 'no' ? ' policy-status-btn--active' : ''}`}
                            onClick={() => setPolicyExpired('no')}
                          >
                            No
                          </button>
                        </div>

                        <div className="policy-claim">
                          <p>Any claim made in the previous year?</p>
                          <button
                            type="button"
                            className={`policy-claim-btn${previousClaim === 'yes' ? ' policy-claim-btn--active' : ''}`}
                            onClick={() => setPreviousClaim('yes')}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            className={`policy-claim-btn${previousClaim === 'no' ? ' policy-claim-btn--active' : ''}`}
                            onClick={() => setPreviousClaim('no')}
                          >
                            No
                          </button>
                        </div>

                        <div className="policy-type">
                          <p>Existing Policy Type</p>
                          <button
                            type="button"
                            className={`policy-type-btn${existingPolicyType === 'comprehensive' ? ' policy-type-btn--active' : ''}`}
                            onClick={() => setExistingPolicyType('comprehensive')}
                          >
                            Comprehensive
                          </button>
                          <button
                            type="button"
                            className={`policy-type-btn${existingPolicyType === 'third-party' ? ' policy-type-btn--active' : ''}`}
                            onClick={() => setExistingPolicyType('third-party')}
                          >
                            Third Party
                          </button>
                          <button
                            type="button"
                            className={`policy-type-btn${existingPolicyType === 'own-damage' ? ' policy-type-btn--active' : ''}`}
                            onClick={() => setExistingPolicyType('own-damage')}
                          >
                            Own Damage
                          </button>
                        </div>
                      </div>

                      <div className="renew-pop__footer renew-pop__footer--plans">
                        <button type="button" className="view-plans-btn" onClick={continueToOwner}>
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
                      <label className="renew-pop-owner__field" htmlFor="renew-owner-name">
                        <span className="renew-pop-owner__label">Full Name</span>
                        <span className="renew-pop-owner__input-wrap">
                          <HiOutlineUser className="renew-pop-owner__input-icon" aria-hidden="true" />
                          <input
                            id="renew-owner-name"
                            type="text"
                            placeholder="Your name"
                            value={fullName}
                            onChange={(event) => setFullName(event.target.value)}
                            autoComplete="name"
                          />
                        </span>
                      </label>

                      <label className="renew-pop-owner__field" htmlFor="renew-owner-mobile">
                        <span className="renew-pop-owner__label">Mobile Number</span>
                        <span className="renew-pop-owner__input-wrap">
                          <HiOutlinePhone className="renew-pop-owner__input-icon" aria-hidden="true" />
                          <input
                            id="renew-owner-mobile"
                            type="tel"
                            placeholder="9876543210"
                            value={mobileNumber}
                            onChange={(event) => setMobileNumber(event.target.value)}
                            autoComplete="tel"
                          />
                        </span>
                      </label>

                      <label className="renew-pop-owner__field" htmlFor="renew-owner-city">
                        <span className="renew-pop-owner__label">City</span>
                        <span className="renew-pop-owner__input-wrap">
                          <HiOutlineLocationMarker className="renew-pop-owner__input-icon" aria-hidden="true" />
                          <input
                            id="renew-owner-city"
                            type="text"
                            placeholder="Hyderabad"
                            value={city}
                            onChange={(event) => setCity(event.target.value)}
                            autoComplete="address-level2"
                          />
                        </span>
                      </label>

                      <label className="renew-pop-owner__whatsapp" htmlFor="renew-owner-whatsapp">
                        <input
                          id="renew-owner-whatsapp"
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
              </>
            ) : (
              <>
                <div className="renew-pop__head">
                  <div className="renew-pop__left">
                    <h3>Vehicle lookup</h3>
                    <h4>Details not found</h4>
                  </div>
                  <div className="renew-pop__right">
                    <button type="button" className="renew-pop__close" onClick={handleClose} aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                    <p className="renew-pop__plate">{normalizedNumber}</p>
                  </div>
                </div>
                <div className="renew-pop__body">
                  <p>No vehicle details found for this registration number.</p>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Renew;
