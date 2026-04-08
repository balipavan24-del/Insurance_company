import './App.css'; 
import Navbar from './Navbar'; 

function App() {
  const insuranceOptions = [
    { title: 'Motor Insurance', subtitle: 'Car & Bike coverage', icon: '🚗', popular: true },
    { title: 'Health Insurance', subtitle: 'Medical & hospitalization', icon: '💗' },
    { title: 'Term Insurance', subtitle: 'Life protection plans', icon: '🛡️' },
    { title: 'Business Insurance', subtitle: 'Cover your business', icon: '🏢' },
    { title: 'Cargo Insurance', subtitle: 'Goods in transit', icon: '📦' }
  ];

  return (
    <div className="main-wrapper">
      <Navbar />
      <main className="hero-page">
        <section className="hero-section">
          <span className="hero-chip">Simple. Fast. Reliable</span>
          <h1 className="hero-title">
            Insurance made <span>simple</span>
          </h1>
          <p className="hero-subtitle">
            Compare, choose, and get insured in minutes - without confusion.
          </p>

          <div className="hero-points">
            <span>50,000+ customers</span>
            <span>Instant policy issuance</span>
            <span>24/7 claim support</span>
          </div>
        </section>

        <section className="insurance-panel">
          <h2>What would you like to insure?</h2>
          <div className="insurance-grid">
            {insuranceOptions.map((item) => (
              <article
                key={item.title}
                className={`insurance-card${item.popular ? ' is-popular' : ''}`}
              >
                {item.popular && <span className="popular-badge">Most Popular</span>}
                <div className="card-icon" aria-hidden="true">{item.icon}</div>
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