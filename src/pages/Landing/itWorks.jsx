import './itWorks.css';

function SearchStepIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M10.5 4.5a6 6 0 1 1 0 12 6 6 0 0 1 0-12Zm0 1.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm8.03 11.47 1.97 1.97a.75.75 0 0 1-1.06 1.06l-1.97-1.97a.75.75 0 0 1 1.06-1.06Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CompareStepIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 18.25A.75.75 0 0 1 4.25 17.5v-3.25a.75.75 0 0 1 1.5 0v3.25a.75.75 0 0 1-.75.75Zm7 0a.75.75 0 0 1-.75-.75v-11a.75.75 0 0 1 1.5 0v11a.75.75 0 0 1-.75.75Zm7 0a.75.75 0 0 1-.75-.75v-6.5a.75.75 0 0 1 1.5 0v6.5a.75.75 0 0 1-.75.75ZM2.75 20a.75.75 0 0 1 0-1.5h18.5a.75.75 0 0 1 0 1.5H2.75Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ShieldStepIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3.75a.75.75 0 0 1 .3.06l6 2.58a.75.75 0 0 1 .45.69v3.61c0 4.05-2.42 7.76-6.16 9.44a1.47 1.47 0 0 1-1.18 0c-3.74-1.68-6.16-5.39-6.16-9.44V7.08a.75.75 0 0 1 .45-.69l6-2.58a.75.75 0 0 1 .3-.06Zm0 1.56L6.75 7.57v3.12c0 3.45 2.05 6.62 5.27 8.07 3.22-1.45 5.23-4.62 5.23-8.07V7.57L12 5.31Zm-1.03 8.8 3.7-3.7a.75.75 0 1 1 1.06 1.06l-4.23 4.23a.75.75 0 0 1-1.06 0L8.3 13.56a.75.75 0 1 1 1.06-1.06l1.61 1.61Z"
        fill="currentColor"
      />
    </svg>
  );
}

const STEPS = [
  {
    id: 'enter-details',
    step: '1',
    title: 'Enter Details',
    description: 'Enter your vehicle number or basic details',
    icon: SearchStepIcon,
    iconClass: 'is-search',
  },
  {
    id: 'compare-plans',
    step: '2',
    title: 'Compare Plans',
    description: 'Compare plans from multiple insurers instantly',
    icon: CompareStepIcon,
    iconClass: 'is-compare',
  },
  {
    id: 'buy-and-get-covered',
    step: '3',
    title: 'Buy & Get Covered',
    description: 'Choose a plan and get insured in minutes',
    icon: ShieldStepIcon,
    iconClass: 'is-shield',
  },
];

function ItWorks() {
  return (
    <section className="it-works-section page-section page-section--regular" aria-labelledby="it-works-heading">
      <p className="it-works-kicker">Simple Process</p>
      <h2 id="it-works-heading" className="it-works-title">
        How It Works
      </h2>
      <p className="it-works-subtitle">
        Get insured in just a few simple steps
      </p>

      <ol className="it-works-grid">
        {STEPS.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id} className="it-works-card">
              <span className="it-works-step" aria-hidden="true">
                {item.step}
              </span>
              <div className={`it-works-icon ${item.iconClass}`} aria-hidden="true">
                <Icon />
              </div>
              <h3 className="it-works-card-title">{item.title}</h3>
              <p className="it-works-card-text">{item.description}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export default ItWorks;
