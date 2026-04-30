import { useMemo, useState } from 'react';
import './HealthInsurance.css';

const GENDER_OPTIONS = ['Male', 'Female', 'Other'];

const createMember = (id, label, relation, icon, colorClass) => ({
  id,
  label,
  relation,
  icon,
  colorClass,
});

const FAMILY_MEMBERS = {
  self: createMember('self', 'Self', 'Primary insured member', '👤', 'is-blue'),
  spouse: createMember('spouse', 'Spouse', 'Husband or wife', '💗', 'is-pink'),
  children: createMember('children', 'Children', 'Add dependent children', '🧒', 'is-purple'),
  parents: createMember('parents', 'Parents', 'Add dependent parents', '👪', 'is-orange'),
};

function HealthInsurance({ onBackHome }) {
  const [activeStep, setActiveStep] = useState(1);
  const [selfGender, setSelfGender] = useState('Male');
  const [selfAge, setSelfAge] = useState('0');
  const [spouseEnabled, setSpouseEnabled] = useState(true);
  const [spouseGender, setSpouseGender] = useState('Female');
  const [spouseAge, setSpouseAge] = useState('0');
  const [children, setChildren] = useState([
    { id: 'child-son-1', label: 'Son', age: '0' },
    { id: 'child-daughter-1', label: 'Daughter', age: '0' },
  ]);
  const [parents, setParents] = useState([{ id: 'parent-father-1', label: 'Father', age: '0' }]);
  const [fullName, setFullName] = useState('vicky');
  const [mobileNumber, setMobileNumber] = useState('6304305534');
  const [city, setCity] = useState('Hyderabad');
  const [email, setEmail] = useState('you@example.com');
  const [medicalConditions, setMedicalConditions] = useState({
    diabetes: false,
    highBloodPressure: false,
    asthma: false,
    heartDisease: false,
    thyroid: false,
    pastSurgeries: false,
  });
  const [otherMedicalNotes, setOtherMedicalNotes] = useState('');

  const childrenCountLabel = useMemo(
    () => `${children.length} added`,
    [children.length]
  );
  const parentsCountLabel = useMemo(
    () => `${parents.length} added`,
    [parents.length]
  );

  const clampAgeInput = (value) => {
    if (value === '') {
      return '';
    }
    const parsed = Number.parseInt(value, 10);
    if (Number.isNaN(parsed)) {
      return '';
    }
    return String(Math.min(100, Math.max(0, parsed)));
  };

  const handleDependentAgeUpdate = (members, setMembers, memberId, nextAge) => {
    setMembers(
      members.map((member) => (member.id === memberId ? { ...member, age: clampAgeInput(nextAge) } : member))
    );
  };

  const addChild = (label) => {
    const key = label.toLowerCase();
    const nextIndex = children.filter((member) => member.label.toLowerCase() === key).length + 1;
    setChildren((prev) => [...prev, { id: `child-${key}-${nextIndex}`, label, age: '0' }]);
  };

  const addParent = (label) => {
    const key = label.toLowerCase();
    const nextIndex = parents.filter((member) => member.label.toLowerCase() === key).length + 1;
    setParents((prev) => [...prev, { id: `parent-${key}-${nextIndex}`, label, age: '0' }]);
  };

  const removeMember = (members, setMembers, memberId) => {
    setMembers(members.filter((member) => member.id !== memberId));
  };

  const handleAgeStep = (currentAge, delta, applyAge) => {
    const parsed = Number.parseInt(currentAge, 10);
    const baseAge = Number.isNaN(parsed) ? 0 : parsed;
    applyAge(clampAgeInput(String(baseAge + delta)));
  };

  const renderAgeInput = (value, applyAge, ariaLabel, isCompact = false) => (
    <div className={`health-number-input${isCompact ? ' is-compact' : ''}`}>
      <input
        type="number"
        min="0"
        max="100"
        step="1"
        value={value}
        onChange={(event) => applyAge(clampAgeInput(event.target.value))}
        aria-label={ariaLabel}
      />
      <div className="health-stepper" role="group" aria-label={`${ariaLabel} controls`}>
        <button
          type="button"
          className="health-step-btn"
          onClick={() => handleAgeStep(value, 1, applyAge)}
          aria-label={`Increase ${ariaLabel}`}
        >
          ▲
        </button>
        <button
          type="button"
          className="health-step-btn"
          onClick={() => handleAgeStep(value, -1, applyAge)}
          aria-label={`Decrease ${ariaLabel}`}
        >
          ▼
        </button>
      </div>
    </div>
  );

  const renderContactField = (
    id,
    label,
    value,
    setValue,
    iconClass,
    icon,
    type = 'text',
    helperText = ''
  ) => (
    <label className="health-contact-field" htmlFor={id}>
      <span>
        {label}
      </span>
      <div className="health-contact-input-wrap">
        <span className={`health-contact-icon ${iconClass}`} aria-hidden="true">
          {icon}
        </span>
        <input id={id} type={type} value={value} onChange={(event) => setValue(event.target.value)} />
      </div>
      {helperText && <small>{helperText}</small>}
    </label>
  );

  const handleContactContinue = () => {
    const validationErrors = [];
    const trimmedName = fullName.trim();
    const trimmedCity = city.trim();
    const trimmedEmail = email.trim();
    const mobileDigitsOnly = mobileNumber.replace(/\D/g, '');

    if (trimmedName.length < 2) {
      validationErrors.push('Please enter a valid full name.');
    }

    if (mobileDigitsOnly.length !== 10) {
      validationErrors.push('Please enter a valid 10-digit mobile number.');
    }

    if (trimmedCity.length < 2) {
      validationErrors.push('Please enter your city of residence.');
    }

    if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      validationErrors.push('Please enter a valid email address.');
    }

    if (validationErrors.length > 0) {
      window.alert(validationErrors.join('\n'));
      return;
    }

    setActiveStep(3);
  };

  const toggleMedicalCondition = (key) => {
    setMedicalConditions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleViewHealthPlans = () => {
    window.alert('Thanks! Matching health plans would load here next.');
  };

  return (
    <main className="health-page">
      <section className="health-wrap">
        <button
          type="button"
          className="health-back-link"
          onClick={onBackHome}
        >
          ← Back to Home
        </button>

        <header className="health-header">
          <h1>Health Insurance</h1>
          <p>Get the right health plan for you and your family.</p>
        </header>

        {activeStep === 1 && (
          <section className="health-form-card" aria-label="Health insurance members form">
            <h2>Who do you want to insure?</h2>

          <article className="health-member-card">
            <div className="health-member-head">
              <div className={`health-member-icon ${FAMILY_MEMBERS.self.colorClass}`} aria-hidden="true">
                {FAMILY_MEMBERS.self.icon}
              </div>
              <div className="health-member-content">
                <h3>{FAMILY_MEMBERS.self.label}</h3>
                <p>{FAMILY_MEMBERS.self.relation}</p>
              </div>
              <span className="health-toggle is-on" aria-hidden="true" />
            </div>

            <div className="health-member-meta">
              <div className="health-meta-group">
                <span className="health-meta-title">Gender</span>
                <div className="health-chip-row">
                  {GENDER_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`health-chip${selfGender === option ? ' is-active' : ''}`}
                      onClick={() => setSelfGender(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <label className="health-age-field">
                <span>Age</span>
                {renderAgeInput(selfAge, setSelfAge, 'self age')}
              </label>
            </div>
          </article>

          <article className="health-member-card">
            <div className="health-member-head">
              <div className={`health-member-icon ${FAMILY_MEMBERS.spouse.colorClass}`} aria-hidden="true">
                {FAMILY_MEMBERS.spouse.icon}
              </div>
              <div className="health-member-content">
                <h3>{FAMILY_MEMBERS.spouse.label}</h3>
                <p>{FAMILY_MEMBERS.spouse.relation}</p>
              </div>
              <button
                type="button"
                className={`health-toggle${spouseEnabled ? ' is-on' : ''}`}
                onClick={() => setSpouseEnabled((prev) => !prev)}
                aria-label="Toggle spouse coverage"
                aria-pressed={spouseEnabled}
              />
            </div>

            {spouseEnabled && (
              <div className="health-member-meta">
                <div className="health-meta-group">
                  <span className="health-meta-title">Gender</span>
                  <div className="health-chip-row">
                    {GENDER_OPTIONS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`health-chip${spouseGender === option ? ' is-active' : ''}`}
                        onClick={() => setSpouseGender(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="health-age-field">
                  <span>Age</span>
                  {renderAgeInput(spouseAge, setSpouseAge, 'spouse age')}
                </label>
              </div>
            )}
          </article>

          <article className="health-member-card">
            <div className="health-member-head">
              <div className={`health-member-icon ${FAMILY_MEMBERS.children.colorClass}`} aria-hidden="true">
                {FAMILY_MEMBERS.children.icon}
              </div>
              <div className="health-member-content">
                <h3>{FAMILY_MEMBERS.children.label}</h3>
                <p>{childrenCountLabel}</p>
              </div>
              <div className="health-action-row">
                <button type="button" className="health-add-btn" onClick={() => addChild('Son')}>+ Son</button>
                <button type="button" className="health-add-btn" onClick={() => addChild('Daughter')}>+ Daughter</button>
              </div>
            </div>

            <div className="health-dependent-list">
              {children.map((child) => (
                <div key={child.id} className="health-dependent-item">
                  <span>{child.label}</span>
                  {renderAgeInput(
                    child.age,
                    (nextAge) => handleDependentAgeUpdate(children, setChildren, child.id, nextAge),
                    `${child.label} age`,
                    true
                  )}
                  <button
                    type="button"
                    className="health-remove-btn"
                    onClick={() => removeMember(children, setChildren, child.id)}
                    aria-label={`Remove ${child.label}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </article>

          <article className="health-member-card">
            <div className="health-member-head">
              <div className={`health-member-icon ${FAMILY_MEMBERS.parents.colorClass}`} aria-hidden="true">
                {FAMILY_MEMBERS.parents.icon}
              </div>
              <div className="health-member-content">
                <h3>{FAMILY_MEMBERS.parents.label}</h3>
                <p>{parentsCountLabel}</p>
              </div>
              <div className="health-action-row">
                <button type="button" className="health-add-btn" onClick={() => addParent('Father')}>+ Father</button>
                <button type="button" className="health-add-btn" onClick={() => addParent('Mother')}>+ Mother</button>
              </div>
            </div>

            <div className="health-dependent-list">
              {parents.map((parent) => (
                <div key={parent.id} className="health-dependent-item">
                  <span>{parent.label}</span>
                  {renderAgeInput(
                    parent.age,
                    (nextAge) => handleDependentAgeUpdate(parents, setParents, parent.id, nextAge),
                    `${parent.label} age`,
                    true
                  )}
                  <button
                    type="button"
                    className="health-remove-btn"
                    onClick={() => removeMember(parents, setParents, parent.id)}
                    aria-label={`Remove ${parent.label}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </article>

            <button type="button" className="health-continue-btn" onClick={() => setActiveStep(2)}>
              Continue <span aria-hidden="true">→</span>
            </button>
          </section>
        )}

        {activeStep === 2 && (
          <section className="health-contact-card" aria-label="Health insurance contact details form">
            <div className="health-contact-header">
              <h2>Tell us about yourself</h2>
              <p>We&apos;ll use this to share your plan details</p>
            </div>

            {renderContactField('health-full-name', 'Full Name *', fullName, setFullName, 'is-blue', '👤')}
            {renderContactField(
              'health-mobile',
              'Mobile Number *',
              mobileNumber,
              setMobileNumber,
              'is-teal',
              '📞',
              'tel'
            )}
            {renderContactField(
              'health-city',
              'City of Residence *',
              city,
              setCity,
              'is-mint',
              '📍',
              'text',
              'Used to show accurate plans and pricing'
            )}
            {renderContactField(
              'health-email',
              'Email Address (optional)',
              email,
              setEmail,
              'is-violet',
              '✉',
              'email'
            )}

            <div className="health-contact-actions">
              <button
                type="button"
                className="health-secondary-btn"
                onClick={() => setActiveStep(1)}
              >
                <span aria-hidden="true">‹</span> Back
              </button>
              <button type="button" className="health-continue-btn is-contact" onClick={handleContactContinue}>
                Continue <span aria-hidden="true">→</span>
              </button>
            </div>
          </section>
        )}

        {activeStep === 3 && (
          <section className="health-info-card" aria-label="Health information">
            <div className="health-info-header">
              <h2>Health Information</h2>
              <p>This helps us show accurate plans and pricing</p>
            </div>

            <ul className="health-condition-list">
              <li className="health-condition-row">
                <span className="health-condition-icon is-pink" aria-hidden="true">
                  🩺
                </span>
                <span className="health-condition-name">Diabetes</span>
                <button
                  type="button"
                  className={`health-toggle${medicalConditions.diabetes ? ' is-on' : ''}`}
                  onClick={() => toggleMedicalCondition('diabetes')}
                  aria-label="Diabetes"
                  aria-pressed={medicalConditions.diabetes}
                />
              </li>
              <li className="health-condition-row">
                <span className="health-condition-icon is-red" aria-hidden="true">
                  📈
                </span>
                <span className="health-condition-name">High Blood Pressure</span>
                <button
                  type="button"
                  className={`health-toggle${medicalConditions.highBloodPressure ? ' is-on' : ''}`}
                  onClick={() => toggleMedicalCondition('highBloodPressure')}
                  aria-label="High Blood Pressure"
                  aria-pressed={medicalConditions.highBloodPressure}
                />
              </li>
              <li className="health-condition-row">
                <span className="health-condition-icon is-sky" aria-hidden="true">
                  🫁
                </span>
                <span className="health-condition-name">Asthma</span>
                <button
                  type="button"
                  className={`health-toggle${medicalConditions.asthma ? ' is-on' : ''}`}
                  onClick={() => toggleMedicalCondition('asthma')}
                  aria-label="Asthma"
                  aria-pressed={medicalConditions.asthma}
                />
              </li>
              <li className="health-condition-row">
                <span className="health-condition-icon is-rose" aria-hidden="true">
                  ❤️
                </span>
                <span className="health-condition-name">Heart Disease</span>
                <button
                  type="button"
                  className={`health-toggle${medicalConditions.heartDisease ? ' is-on' : ''}`}
                  onClick={() => toggleMedicalCondition('heartDisease')}
                  aria-label="Heart Disease"
                  aria-pressed={medicalConditions.heartDisease}
                />
              </li>
              <li className="health-condition-row">
                <span className="health-condition-icon is-violet" aria-hidden="true">
                  💊
                </span>
                <span className="health-condition-name">Thyroid</span>
                <button
                  type="button"
                  className={`health-toggle${medicalConditions.thyroid ? ' is-on' : ''}`}
                  onClick={() => toggleMedicalCondition('thyroid')}
                  aria-label="Thyroid"
                  aria-pressed={medicalConditions.thyroid}
                />
              </li>
              <li className="health-condition-row">
                <span className="health-condition-icon is-orange" aria-hidden="true">
                  ✂️
                </span>
                <span className="health-condition-name">Any past surgeries</span>
                <button
                  type="button"
                  className={`health-toggle${medicalConditions.pastSurgeries ? ' is-on' : ''}`}
                  onClick={() => toggleMedicalCondition('pastSurgeries')}
                  aria-label="Any past surgeries"
                  aria-pressed={medicalConditions.pastSurgeries}
                />
              </li>
            </ul>

            <label className="health-other-condition" htmlFor="health-other-notes">
              <span>Any other medical condition (optional)</span>
              <div className="health-other-condition-wrap">
                <span className="health-other-condition-icon" aria-hidden="true">
                  📄
                </span>
                <textarea
                  id="health-other-notes"
                  rows={4}
                  placeholder="Mention any other conditions..."
                  value={otherMedicalNotes}
                  onChange={(e) => setOtherMedicalNotes(e.target.value)}
                />
              </div>
            </label>

            <div className="health-privacy-note" role="status">
              <span className="health-privacy-icon" aria-hidden="true">
                🔒
              </span>
              <p>Your information is secure and used only to personalize plans</p>
            </div>

            <div className="health-contact-actions health-info-actions">
              <button type="button" className="health-secondary-btn" onClick={() => setActiveStep(2)}>
                <span aria-hidden="true">‹</span> Back
              </button>
              <button type="button" className="health-view-plans-btn" onClick={handleViewHealthPlans}>
                <span className="health-view-plans-icon" aria-hidden="true">
                  🛡️
                </span>
                View Health Plans
              </button>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

export default HealthInsurance;
