import { useState } from 'react';
import './Signup.css';

function Signup({ onClose, onAccountCreated }) {
  const [createdAccounts, setCreatedAccounts] = useState([]);

  const handleCreateAccount = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Dummy record storage until backend API is connected.
    const dummyUser = {
      id: `dummy-user-${createdAccounts.length + 1}`,
      fullName: String(formData.get('fullName') || '').trim(),
      mobileNumber: String(formData.get('mobileNumber') || '').trim(),
      email: String(formData.get('emailAddress') || '').trim() || null,
      password: String(formData.get('password') || ''),
      createdAt: new Date().toISOString(),
      source: 'create-account-form',
    };

    setCreatedAccounts((prev) => [...prev, dummyUser]);
    form.reset();
    onAccountCreated();
  };

  return (
    <main className="auth-page page-section page-section--hero page-section-container">
      <div className="auth-brand-wrap" aria-hidden="true">
        <div className="auth-brand-text">InsureEase</div>
      </div>

      <header className="auth-header">
        <>
          <h1 id="signup-title">Create your signup account</h1>
          <p>Get started with InsureEase</p>
        </>
      </header>

      <section
        className="auth-card"
        aria-labelledby="signup-title"
        data-form-id="signup-form"
        data-login-enabled="false"
        data-created-count={createdAccounts.length}
      >
        <button type="button" className="auth-close-btn" aria-label="Back to home" onClick={onClose}>
          x
        </button>

        <form className="auth-form" onSubmit={handleCreateAccount} data-api-endpoint="/api/v1/auth/create-account">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Enter your name"
            data-api-field="fullName"
            required
          />

          <label htmlFor="mobileNumber">Mobile Number <span className="required-star">*</span></label>
          <input
            id="mobileNumber"
            name="mobileNumber"
            type="tel"
            placeholder="Enter mobile number"
            data-api-field="mobileNumber"
            required
            pattern="[0-9]{10}"
            title="Please enter a valid 10-digit mobile number"
          />

          <label htmlFor="emailAddress">Email <span className="optional-text">(optional)</span></label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            placeholder="Enter email address"
            data-api-field="email"
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Create a password (min 6 chars)"
            data-api-field="password"
            minLength={6}
            required
          />

          <button type="submit" className="auth-submit-btn">Create Account</button>
        </form>

      </section>

    </main>
  );
}

export default Signup;
