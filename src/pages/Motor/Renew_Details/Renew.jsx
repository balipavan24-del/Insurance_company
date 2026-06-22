import './Renew.css';
import { useEffect, useState } from 'react';

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
};

function Renew({ open, onClose, vechileNumber }) {
  const [isContinue, setIsContinue] = useState(false);
  const [isLookupLoading, setIsLookupLoading] = useState(false);
  const [isPlansLoading, setIsPlansLoading] = useState(false);

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
      return undefined;
    }

    setIsLookupLoading(true);
    const timer = window.setTimeout(() => {
      setIsLookupLoading(false);
    }, 700);

    return () => window.clearTimeout(timer);
  }, [open, vechileNumber]);

  function continueHandler() {
    setIsPlansLoading(true);
    window.setTimeout(() => {
      setIsContinue(true);
      setIsPlansLoading(false);
    }, 700);
  }

  const handleClose = () => {
    setIsContinue(false);
    setIsLookupLoading(false);
    setIsPlansLoading(false);
    onClose();
  };

  if (!open) {
    return null;
  }

  const bikeDetails = vechile_details[vechileNumber];

  return (
    <div
      className="renew-pop-bg"
      role="dialog"
      aria-modal="true"
      aria-label="Renew details"
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
        {bikeDetails ? (
          <>
            {!isContinue && (
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
                <p className="renew-pop__plate">{vechileNumber}</p>
              </div>
            </div>
            <p>We found your vehicle details. Continue to view renewal plans.</p>
            <div className="renew-pop__body">
              <div className="vechile-details-">
                <p>Registration Number</p>
                <p>{vechileNumber}</p>
              </div>
              <div className="vechile-details-">
                <p>BRAND</p>
                <p>{bikeDetails?.brand || '-'}</p>
              </div>
              <div className="vechile-details-">
                <p>MODEL</p>
                <p>{bikeDetails?.model || '-'}</p>
              </div>
              <div className="vechile-details-">
                <p>VARIENT</p>
                <p>{bikeDetails?.variant || '-'}</p>
              </div>
              <div className="vechile-details-">
                <p>FUEL TYPE</p>
                <p>{bikeDetails?.fuel || '-'}</p>
              </div>
              <div className="vechile-details-">
                <p>Registration Year</p>
                <p>{bikeDetails?.year || '-'}</p>
              </div>
              <div className="vechile-details-">
                <p>Registration City</p>
                <p>{bikeDetails?.city || '-'}</p>
              </div>
            </div>
            <div className="renew-pop__footer">
              <button
                type="button"
                className="view-plans-btn"
                onClick={continueHandler}
                disabled={isPlansLoading}
              >
                Continue to View Plans →
              </button>
              <p>Details auto-fetched from your registration number.</p>
            </div>
            </>
            )}

            {isContinue && (
            <div className="renew-pop-plans">
              <div className="renew-pop-plans__inner">
                <div className="renew-pop__head renew-pop__head--plans">
                  <button
                    type="button"
                    className="renew-pop__back"
                    onClick={() => setIsContinue(false)}
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
                    <input type="text" placeholder="Search Insurure......" />
                    <div className="renew-pop-policy-select">
                      <button type="button" className="policy-provider-btn">ICICI Lombard</button>
                      <button type="button" className="policy-provider-btn">HDFC ERGO</button>
                      <button type="button" className="policy-provider-btn">Bajaj Allianz</button>
                      <button type="button" className="policy-provider-btn">Tata AIG</button>
                      <button type="button" className="policy-provider-btn">Reliance General</button>
                      <button type="button" className="policy-provider-btn">SBI General</button>
                      <button type="button" className="policy-provider-btn">Acko</button>
                      <button type="button" className="policy-provider-btn">Digit</button>
                      <button type="button" className="policy-provider-btn">National Insurance</button>
                      <button type="button" className="policy-provider-btn">Future Generali</button>
                      <button type="button" className="policy-provider-btn">New India Assurance</button>
                      <button type="button" className="policy-provider-btn">Oriental Insurance</button>
                      <button type="button" className="policy-provider-btn">United India</button>
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
                    <button type="button" className="policy-type-btn">Comprehensive</button>
                    <button type="button" className="policy-type-btn">Third Party</button>
                    <button type="button" className="policy-type-btn">Own Damage</button>
                  </div>
                </div>

                <div className="renew-pop__footer renew-pop__footer--plans">
                  <button type="button" className="view-plans-btn">
                    Continue →
                  </button>
                </div>
              </div>
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
                <p className="renew-pop__plate">{vechileNumber}</p>
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
