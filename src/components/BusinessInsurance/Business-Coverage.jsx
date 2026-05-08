import './Business-Coverage.css';

function BusinessCoverage({ title, description, onBackToBusinessHome }) {
  return (
    <main className="business-coverage-page page-section page-section--hero">
      <section className="business-coverage-wrap page-section-container">
        <button
          type="button"
          className="business-coverage-back-link"
          onClick={onBackToBusinessHome}
        >
          ← Back to Business Insurance
        </button>

        <article className="business-coverage-card">
          <h1>{title}</h1>
          <p>{description}</p>
        </article>
      </section>
    </main>
  );
}

export default BusinessCoverage;
