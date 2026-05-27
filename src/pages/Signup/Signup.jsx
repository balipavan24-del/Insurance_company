import { useState } from 'react';
import {
  buildSignupApiPayload,
  getSignupPasswordRuleResults,
  SIGNUP_PASSWORD_RULES,
  validateSignupDetails,
} from '../../utils/validations/leadValidation';
import BrandLogo from '../../components/BrandLogo/BrandLogo';
import './Signup.css';

function PasswordVisibilityToggle({ visible, onToggle }) {
  return (
    <button
      type="button"
      className="auth-password-toggle"
      onClick={onToggle}
      aria-label={visible ? 'Hide password' : 'Show password'}
      aria-pressed={visible}
    >
      {visible ? (
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12Z"
          />
          <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.75" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3l18 18M10.2 10.9a3 3 0 0 0 4.2 4.2M6.2 6.7C4.5 8 2.5 12 2.5 12s3.5 6.5 9.5 6.5c1.8 0 3.4-.6 4.7-1.5M9.9 5.1A10.8 10.8 0 0 1 12 4.5c6 0 9.5 6.5 9.5 6.5s-1.2 2.2-3.2 4.2"
          />
        </svg>
      )}
    </button>
  );
}

function Signup({ onClose, onAccountCreated }) {
  const [createdAccounts, setCreatedAccounts] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const passwordRuleResults = getSignupPasswordRuleResults(password);

  const handleCreateAccount = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = buildSignupApiPayload({
      fullName: formData.get('fullName'),
      mobileNumber: formData.get('mobileNumber'),
      email: formData.get('emailAddress'),
      password: formData.get('password'),
    });

    const validationErrors = validateSignupDetails(payload);

    // Demo for backend team: open DevTools → Console (F12), submit the form.
    console.group('[InsureEase Signup] JS validation (teaching example)');
    console.log('Step 1 — Form values (password hidden):', {
      fullName: payload.fullName,
      mobileNumber: payload.mobileNumber,
      email: payload.email,
      password: '[hidden]',
    });
    console.log(
      'Step 2 — Password constraints (each must be true):',
      getSignupPasswordRuleResults(payload.password),
    );
    console.log(
      'Step 2b — Rule definitions (copy to Spring Boot):',
      SIGNUP_PASSWORD_RULES.map(({ id, label }) => ({ id, label })),
    );
    console.log('Step 3 — validateSignupDetails() errors ([] = pass):', validationErrors);

    if (validationErrors.length > 0) {
      console.warn('Step 4 — Result: FAILED (do not call API)');
      console.groupEnd();
      window.alert(validationErrors.join('\n'));
      return;
    }

    console.log('Step 4 — Result: PASSED');
    console.log('Step 5 — JSON for Spring Boot POST /api/v1/auth/create-account:', {
      fullName: payload.fullName,
      mobileNumber: payload.mobileNumber,
      email: payload.email,
      password: '[send in body — do not log in production]',
    });
    console.groupEnd();

    // Dummy record storage until backend API is connected.
    const dummyUser = {
      id: `dummy-user-${createdAccounts.length + 1}`,
      ...payload,
      createdAt: new Date().toISOString(),
      source: 'create-account-form',
    };

    setCreatedAccounts((prev) => [...prev, dummyUser]);
    form.reset();
    setPassword('');
    setShowPassword(false);
    onAccountCreated();
  };

  return (
    <main className="auth-page page-section page-section--hero page-section-container">
      <div className="auth-brand-wrap">
        <BrandLogo className="brand-logo--auth" />
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

          <label htmlFor="emailAddress">
            Email <span className="required-star">*</span>
          </label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            placeholder="Enter email address"
            data-api-field="email"
            required
          />

          <label htmlFor="password">
            Password <span className="required-star">*</span>
          </label>
          <div className="auth-password-field">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="e.g. Secure@123"
              data-api-field="password"
              minLength={8}
              required
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-describedby="signup-password-rules"
            />
            <PasswordVisibilityToggle
              visible={showPassword}
              onToggle={() => setShowPassword((prev) => !prev)}
            />
          </div>
          <p id="signup-password-rules" className="auth-password-rules" aria-live="polite">
            {passwordRuleResults.map((rule, index) => (
              <span key={rule.id} className="auth-password-rules__group">
                {index > 0 ? (
                  <span className="auth-password-rules__sep" aria-hidden="true">
                    {' '}
                    ·{' '}
                  </span>
                ) : null}
                <span
                  className={`auth-password-rules__item${rule.passed ? ' is-passed' : ''}`}
                >
                  <span className="auth-password-rules__mark" aria-hidden="true">
                    {rule.passed ? '✓' : '○'}
                  </span>
                  {rule.label}
                </span>
              </span>
            ))}
          </p>

          <button type="submit" className="auth-submit-btn">Create Account</button>
        </form>

      </section>

    </main>
  );
}

export default Signup;
