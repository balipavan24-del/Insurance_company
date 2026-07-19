import { modalOverlayClass, modalPanelClass } from '../../components/AnimatedModal/AnimatedModal';

const sel = (active) => (active ? ' is-selected' : '');

export function SearchBox({ placeholder, value, onChange, isCity = false }) {
  return (
    <div className={`nv-search-wrap${isCity ? ' nv-search-wrap--city' : ' nv-search-wrap--brand'}`}>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="nv-search-input"
        aria-label={placeholder}
      />
    </div>
  );
}

export function OptionGrid({ options, field, formData, brandGrid = false, singleCol = false, city = false, engine = false, onPick }) {
  return (
    <div className={`nv-options-grid${brandGrid ? ' is-brand-grid' : ''}${singleCol ? ' is-single-column' : ''}${city ? ' is-city-list' : ''}${engine ? ' is-engine-grid' : ''}`}>
      {options.map((option) => {
        const value = engine ? option.value : option;
        const label = engine ? option.value : option;
        return (
          <button
            key={label}
            type="button"
            className={`nv-option-item${sel(formData[field] === value)}${engine ? ' is-engine' : ''}${city ? ' is-city-item' : ''}`}
            onClick={() => onPick(value)}
          >
            {engine ? (
              <span className="nv-engine-option-content">
                <span className="nv-engine-title">{option.value}</span>
                {option.subtitle ? <span className="nv-engine-subtitle">{option.subtitle}</span> : null}
              </span>
            ) : value}
          </button>
        );
      })}
      {options.length === 0 && <p className="nv-empty-state">No results found.</p>}
    </div>
  );
}

export function FuelCards({ options, selectedValue, onPick }) {
  return (
    <div className="nv-fuel-wrap">
      <div className="nv-fuel-grid">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`nv-fuel-item${sel(selectedValue === option.value)}`}
            onClick={() => onPick(option.value)}
          >
            <span className={`nv-fuel-icon ${option.tone}`} aria-hidden="true">●</span>
            <span className="nv-fuel-label">{option.value}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function DeliveryCards({ options, selectedValue, onPick }) {
  return (
    <div className="nv-delivery-wrap">
      <p className="nv-delivery-help">Helps us tailor accurate plans and pricing.</p>
      <div className="nv-delivery-grid">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`nv-delivery-item${sel(selectedValue === option.value)}`}
            onClick={() => onPick(option.value)}
          >
            <span className={`nv-delivery-icon ${option.tone}`} aria-hidden="true">{option.icon}</span>
            <span className="nv-delivery-label">{option.value}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function ContactForm({ formData, onChange, onSubmit }) {
  return (
    <div className="nv-contact-form">
      <label htmlFor="newVehicleName" className="nv-contact-label">Full Name</label>
      <input
        id="newVehicleName"
        type="text"
        value={formData.name}
        onChange={(e) => onChange('name', e.target.value)}
        placeholder="Enter your full name"
        className="nv-text-input"
      />
      <label htmlFor="newVehicleMobile" className="nv-contact-label">Mobile Number</label>
      <input
        id="newVehicleMobile"
        type="tel"
        value={formData.mobile}
        onChange={(e) => onChange('mobile', e.target.value)}
        placeholder="10-digit mobile number"
        maxLength={10}
        className="nv-text-input"
      />
      <button type="button" className="nv-view-plans-btn" onClick={onSubmit}>View Plans</button>
    </div>
  );
}

export function SummaryPanel({ summarySequence, formData, title, onEdit, onClose }) {
  return (
    <aside className="nv-summary-pane">
      <div className="nv-summary-header">
        <h3>{title}</h3>
        <button type="button" className="nv-close-icon" onClick={onClose} aria-label="Close">×</button>
      </div>
      <div className="nv-summary-scroll">
        <div className="nv-summary-list">
          {summarySequence.map(({ field, summaryLabel }) => {
            const value = String(formData[field] || '').trim() || '-';
            const filled = value !== '-';
            return (
              <div key={field} className={`nv-summary-item${filled ? ' is-filled' : ' is-empty'}`}>
                <span className="nv-summary-item-icon" aria-hidden="true">•</span>
                <div className="nv-summary-item-content">
                  <p>{summaryLabel}</p>
                  <span>{value}</span>
                </div>
                {filled && (
                  <button
                    type="button"
                    className="nv-summary-edit-btn"
                    aria-label={`Edit ${summaryLabel}`}
                    onClick={() => onEdit(field)}
                  >
                    <span aria-hidden="true">✎</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <footer className="nv-summary-footer">
        <div className="nv-summary-item is-filled nv-summary-item--no-plate">
          <div className="nv-summary-item-content">
            <p>Vehicle number</p>
            <span>Not assigned — continue without registration number</span>
          </div>
        </div>
      </footer>
    </aside>
  );
}

export function ModalShell({ motionClosing, ariaLabel, children }) {
  return (
    <section className={modalOverlayClass(motionClosing, 'nv-overlay')} role="dialog" aria-modal="true" aria-label={ariaLabel}>
      <section className={modalPanelClass(motionClosing, 'nv-modal')}>
        {children}
      </section>
    </section>
  );
}
