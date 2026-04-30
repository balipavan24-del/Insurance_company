import './choose.css';

const FEATURES = [
  {
    id: 'compare',
    title: 'Compare plans instantly',
    description: 'Side-by-side comparison of top insurers in seconds.',
    iconBg: '#38bdf8',
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
        <path
          fill="currentColor"
          d="M5 18h2V9H5v9zm4 0h2V5H9v13zm4 0h2V11h-2v7zm4 0h2V7h-2v11z"
        />
      </svg>
    ),
  },
  {
    id: 'price',
    title: 'Best prices guaranteed',
    description: 'We partner with leading insurers to offer the lowest premiums.',
    iconBg: '#2dd4bf',
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.75" />
        <text
          x="12"
          y="16.5"
          textAnchor="middle"
          fill="currentColor"
          fontSize="12"
          fontWeight="700"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          $
        </text>
      </svg>
    ),
  },
  {
    id: 'renewal',
    title: 'Easy and fast renewal',
    description: 'Renew your policy in under 2 minutes — no paperwork.',
    iconBg: '#fb923c',
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 4V1L7 6l5 5V7c2.76 0 5 2.24 5 5 0 1.64-.8 3.09-2.03 4l1.46 1.46A6.96 6.96 0 0019 12c0-3.87-3.13-7-7-7zm0 14c-2.76 0-5-2.24-5-5 0-1.64.8-3.09 2.03-4L7.51 7.54A6.96 6.96 0 005 12c0 3.87 3.13 7 7 7v3l5-5-5-5v3z"
        />
      </svg>
    ),
  },
  {
    id: 'secure',
    title: 'Secure checkout',
    description: 'Bank-grade encryption protects every transaction.',
    iconBg: '#a855f7',
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 16l-4-4 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z"
        />
      </svg>
    ),
  },
];

function Choose() {
  return (
    <section className="choose-section" aria-labelledby="choose-heading">
      <h2 id="choose-heading" className="choose-title">
        Why Choose <span className="choose-title-accent">Us</span>
      </h2>
      <p className="choose-subtitle">
        We make insurance simple, affordable, and trustworthy.
      </p>

      <div className="choose-grid">
        {FEATURES.map((item) => (
          <article key={item.id} className="choose-card">
            <div
              className="choose-card-icon"
              style={{ background: item.iconBg }}
            >
              {item.icon}
            </div>
            <h3 className="choose-card-title">{item.title}</h3>
            <p className="choose-card-text">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Choose;
