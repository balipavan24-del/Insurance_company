import { sanitizePhoneNumber } from '../../utils/leadValidation';

function TermQuotePanel({
  panelId,
  idSuffix = '',
  extraClass = '',
  isWhatsappEnabled,
  onWhatsappToggle,
  selectedGender,
  onGenderChange,
  fullName,
  onFullNameChange,
  dateOfBirth,
  onDateOfBirthChange,
  mobileNumber,
  onMobileNumberChange,
  isSmoker,
  onSmokerChange,
  leadQueueLength,
  onSubmit
}) {
  const rootClass = `term-quote-panel ${extraClass}`.trim();

  return (
    <aside className={rootClass} id={panelId}>
      <div className="term-quote-head">
        <p>Free Quote in 60 sec</p>
        <h2>Get Your Term Insurance Plan</h2>
        <span>Secure your family&apos;s future in minutes</span>
      </div>

      <div className="term-quote-whatsapp">
        <div>
          <strong>Get details on WhatsApp</strong>
          <p>{isWhatsappEnabled ? 'Plan details sent instantly' : 'WhatsApp updates are off'}</p>
        </div>
        <button
          type="button"
          className={`term-whatsapp-toggle${isWhatsappEnabled ? ' is-on' : ''}`}
          role="switch"
          aria-checked={isWhatsappEnabled}
          aria-label="Toggle WhatsApp details"
          onClick={onWhatsappToggle}
        />
      </div>

      <form className="term-quote-form" onSubmit={onSubmit}>
        <span className="term-form-group-heading" id={`termGenderHeading${idSuffix}`}>
          Gender (optional)
        </span>
        <div
          className="term-gender-row"
          role="group"
          aria-labelledby={`termGenderHeading${idSuffix}`}
        >
          <button
            type="button"
            className={selectedGender === 'male' ? 'is-active' : ''}
            aria-pressed={selectedGender === 'male'}
            onClick={() => onGenderChange(selectedGender === 'male' ? null : 'male')}
          >
            Male
          </button>
          <button
            type="button"
            className={selectedGender === 'female' ? 'is-active' : ''}
            aria-pressed={selectedGender === 'female'}
            onClick={() => onGenderChange(selectedGender === 'female' ? null : 'female')}
          >
            Female
          </button>
        </div>

        <label htmlFor={`termName${idSuffix}`}>Full Name *</label>
        <input
          id={`termName${idSuffix}`}
          type="text"
          placeholder="Enter your name"
          value={fullName}
          onChange={(event) => onFullNameChange(event.target.value)}
        />

        <label htmlFor={`termDob${idSuffix}`}>Date of Birth *</label>
        <input
          id={`termDob${idSuffix}`}
          type="text"
          placeholder="mm/dd/yyyy"
          value={dateOfBirth}
          onChange={(event) => onDateOfBirthChange(event.target.value)}
        />

        <label htmlFor={`termMobile${idSuffix}`}>Mobile Number *</label>
        <input
          id={`termMobile${idSuffix}`}
          type="tel"
          placeholder="10-digit mobile"
          value={mobileNumber}
          onChange={(event) => onMobileNumberChange(sanitizePhoneNumber(event.target.value))}
        />
        <p className="term-form-note">
          {isWhatsappEnabled
            ? 'We\'ll send plan details instantly on WhatsApp'
            : 'Enable WhatsApp to receive instant plan details'}
        </p>

        <span className="term-form-group-heading" id={`termSmokeHeading${idSuffix}`}>
          Do you smoke? (optional)
        </span>
        <div
          className="term-gender-row"
          role="group"
          aria-labelledby={`termSmokeHeading${idSuffix}`}
        >
          <button
            type="button"
            className={isSmoker === 'no' ? 'is-active' : ''}
            aria-pressed={isSmoker === 'no'}
            onClick={() => onSmokerChange(isSmoker === 'no' ? null : 'no')}
          >
            NO
          </button>
          <button
            type="button"
            className={isSmoker === 'yes' ? 'is-active' : ''}
            aria-pressed={isSmoker === 'yes'}
            onClick={() => onSmokerChange(isSmoker === 'yes' ? null : 'yes')}
          >
            YES
          </button>
        </div>

        <button type="submit" className="term-submit-btn">Get My Quote →</button>
      </form>
      {leadQueueLength > 0 && (
        <p className="term-form-note">Queued leads: {leadQueueLength}</p>
      )}
    </aside>
  );
}

export default TermQuotePanel;
