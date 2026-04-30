import './Business-Home.css';

const BUSINESS_COVERAGE_OPTIONS = [
  {
    id: 'fire-damage',
    title: 'Fire Damage',
    subtitle: 'Comprehensive protection against fire-related losses including electrical fires, accidental blazes, and explosion damage.',
    icon: '🔥',
    tintClass: 'is-fire',
  },
  {
    id: 'theft-protection',
    title: 'Theft Protection',
    subtitle: 'Coverage for burglary, theft, and break-in losses to safeguard your business assets and inventory.',
    icon: '🛡️',
    tintClass: 'is-theft',
  },
  {
    id: 'natural-disaster',
    title: 'Natural Disaster Cover',
    subtitle: 'Protection from floods, earthquakes, storms, and other natural calamities that could impact your business.',
    icon: '🌧️',
    tintClass: 'is-natural',
  },
  {
    id: 'equipment-breakdown',
    title: 'Equipment Breakdown',
    subtitle: 'Coverage for machinery failure, electronic equipment damage, and operational breakdowns.',
    icon: '🛠️',
    tintClass: 'is-equipment',
  },
];

function BusinessHome({
  onBackHome,
  onFireDamageSelect,
  onTheftProtectionSelect,
  onNaturalDisasterSelect,
  onEquipmentBreakdownSelect,
}) {
  const handleFireDamageClick = () => {
    if (onFireDamageSelect) onFireDamageSelect();
  };

  const handleTheftProtectionClick = () => {
    if (onTheftProtectionSelect) onTheftProtectionSelect();
  };

  const handleNaturalDisasterClick = () => {
    if (onNaturalDisasterSelect) onNaturalDisasterSelect();
  };

  const handleEquipmentBreakdownClick = () => {
    if (onEquipmentBreakdownSelect) onEquipmentBreakdownSelect();
  };

  const getCardClickHandler = (coverageId) => {
    if (coverageId === 'fire-damage') return handleFireDamageClick;
    if (coverageId === 'theft-protection') return handleTheftProtectionClick;
    if (coverageId === 'natural-disaster') return handleNaturalDisasterClick;
    return handleEquipmentBreakdownClick;
  };

  const handleCardKeyDown = (event, onCardClick) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (onCardClick) {
        onCardClick();
      }
    }
  };

  return (
    <main className="business-page">
      <section className="business-wrap">
        <button type="button" className="business-back-link" onClick={onBackHome}>
          ← Back to Home
        </button>
        <header className="business-header">
          <span className="business-header-icon" aria-hidden="true">🏢</span>
          <h1>Business Property Insurance</h1>
          <p>Select the coverage you need. Our experts will assist you with the best plan.</p>
        </header>

        <section className="business-coverage" aria-label="Business insurance coverage options">
          <h2>What coverage do you need?</h2>
          <div className="business-list">
            {BUSINESS_COVERAGE_OPTIONS.map((item) => {
              const onCardClick = getCardClickHandler(item.id);

              return (
                <article
                  key={item.id}
                  className="business-list-item"
                  role="button"
                  tabIndex={0}
                  onClick={onCardClick}
                  onKeyDown={(event) => handleCardKeyDown(event, onCardClick)}
                >
                  <div className={`business-list-banner ${item.tintClass}`}>
                    <span className="business-list-icon" aria-hidden="true">{item.icon}</span>
                  </div>
                  <div className="business-list-content">
                    <h3>{item.title}</h3>
                    <p>{item.subtitle}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
}

export default BusinessHome;
