import './App.css'; 
import Navbar from './Navbar'; 

const insuranceItems = [
  { title: 'Motor Insurance', subtitle: 'Car & Bike coverage', popular: true },
  { title: 'Health Insurance', subtitle: 'Medical & hospitalization' },
  { title: 'Term Insurance', subtitle: 'Life protection plans' },
  { title: 'Business Insurance', subtitle: 'Cover your business' },
  { title: 'Cargo Insurance', subtitle: 'Goods in transit' }
];

function App() {
  return (
    <div className="main-wrapper">
      <Navbar />
      <main className="hero-page">
        <section className="hero-section">
          <div className="hero-badge">Simple. Fast. Reliable.</div>
          <h1 className="hero-title">
            Insurance made <span>simple</span>
          </h1>
          <p className="hero-subtitle">
            Compare, choose, and get insured in minutes - without confusion.
          </p>
          <div className="hero-actions">
            <button className="btn-primary">Get Started</button>
            <button className="btn-secondary">Explore Plans</button>
          </div>
          <div className="hero-stats">
            <span>50,000+ customers</span>
            <span>Instant policy issuance</span>
            <span>24/7 claim support</span>
          </div>
        </section>

        <section className="insurance-panel">
          <h2>What would you like to insure?</h2>
          <div className="insurance-grid">
            {insuranceItems.map((item) => (
              <article
                key={item.title}
                className={`insurance-card ${item.popular ? 'popular' : ''}`}
              >
                {item.popular && <div className="popular-pill">Most Popular</div>}
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;