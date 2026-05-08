import { useState } from 'react';
import './Login.css';

function Login({ onClose, onGuestLogin, onSignupClick }) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [authStep, setAuthStep] = useState('mobile');
  const [showOtpError, setShowOtpError] = useState(false);

  const sanitizedMobile = mobileNumber.replace(/\D/g, '').slice(0, 10);
  const sanitizedOtp = otpCode.replace(/\D/g, '').slice(0, 4);
  const canSendOtp = sanitizedMobile.length === 10;
  const canVerifyOtp = sanitizedOtp.length === 4;
  const maskedMobile = sanitizedMobile ? `+91 ${sanitizedMobile}` : '';

  const handleSendOtp = (event) => {
    event.preventDefault();
    if (!canSendOtp) {
      return;
    }
    setAuthStep('otp');
    setShowOtpError(false);
    setOtpCode('');
  };

  const handleVerifyOtp = (event) => {
    event.preventDefault();
    if (!canVerifyOtp) {
      return;
    }

    if (sanitizedOtp === '1234') {
      onClose();
      return;
    }

    setShowOtpError(true);
  };

  return (
    <main className="login-page page-section page-section--hero page-section-container">
      <header className="login-header">
        <div className="login-brand">
          <span className="login-brand-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path
                d="M12 3.75a.75.75 0 0 1 .3.06l6 2.58a.75.75 0 0 1 .45.69v3.61c0 4.05-2.42 7.76-6.16 9.44a1.47 1.47 0 0 1-1.18 0c-3.74-1.68-6.16-5.39-6.16-9.44V7.08a.75.75 0 0 1 .45-.69l6-2.58a.75.75 0 0 1 .3-.06Zm0 1.56L6.75 7.57v3.12c0 3.45 2.05 6.62 5.27 8.07 3.22-1.45 5.23-4.62 5.23-8.07V7.57L12 5.31Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="login-brand-text">InsureEase</span>
        </div>
        <h1>Welcome back</h1>
        <p>Login with your mobile number</p>
      </header>

      <section className="login-card" aria-labelledby="login-page-title">
        <button
          type="button"
          className="login-close-btn"
          aria-label="Back to home"
          onClick={onClose}
        >
          x
        </button>
        {authStep === 'mobile' ? (
          <>
            <h2 id="login-page-title">Mobile Number</h2>

            <form className="login-form" onSubmit={handleSendOtp}>
              <div className="mobile-input-wrap">
                <span className="mobile-input-icon" aria-hidden="true" />
                <input
                  id="mobileNumber"
                  name="mobileNumber"
                  type="tel"
                  placeholder="Enter your mobile number"
                  inputMode="numeric"
                  autoComplete="tel"
                  value={mobileNumber}
                  onChange={(event) => setMobileNumber(event.target.value)}
                  required
                />
              </div>

              <button type="submit" className="otp-btn" disabled={!canSendOtp}>
                Send OTP
              </button>
            </form>
          </>
        ) : (
          <form className="login-form otp-form" onSubmit={handleVerifyOtp}>
            <button
              type="button"
              className="change-number-btn"
              onClick={() => {
                setAuthStep('mobile');
                setShowOtpError(false);
                setOtpCode('');
              }}
            >
              &larr; Change number
            </button>

            <p className="otp-sent-text">OTP sent to {maskedMobile}</p>

            <label htmlFor="otpCode" className="otp-label">Enter OTP</label>
            <div className="mobile-input-wrap otp-input-wrap">
              <span className="otp-input-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path
                    d="M10.59 13.41a.75.75 0 0 1 0-1.06l2.82-2.82a2.25 2.25 0 0 0-3.18-3.18L7.41 9.17a2.25 2.25 0 0 0 3.18 3.18.75.75 0 1 1 1.06 1.06 3.75 3.75 0 0 1-5.3-5.3l2.82-2.82a3.75 3.75 0 0 1 5.3 5.3l-2.82 2.82a.75.75 0 0 1-1.06 0Zm2.76-2.82a.75.75 0 0 1 1.06-1.06 3.75 3.75 0 0 1 0 5.3l-2.82 2.82a3.75 3.75 0 0 1-5.3-5.3l2.82-2.82a.75.75 0 1 1 1.06 1.06l-2.82 2.82a2.25 2.25 0 0 0 3.18 3.18l2.82-2.82a2.25 2.25 0 0 0 0-3.18Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <input
                id="otpCode"
                name="otpCode"
                type="text"
                placeholder="Enter 4 digit OTP"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={otpCode}
                onChange={(event) => {
                  setOtpCode(event.target.value.replace(/\D/g, '').slice(0, 4));
                  if (showOtpError) {
                    setShowOtpError(false);
                  }
                }}
                required
              />
            </div>
            <p className={`otp-hint${showOtpError ? ' is-error' : ''}`}>
              {showOtpError ? 'Invalid OTP. Use 1234 for demo' : 'Use OTP: 1234 for demo'}
            </p>

            <button type="submit" className="otp-btn" disabled={!canVerifyOtp}>
              Verify &amp; Login
            </button>
          </form>
        )}

        <button type="button" className="text-link-btn guest-link" onClick={onGuestLogin}>
          Continue as Guest
        </button>

        <p className="signup-hint">
          Don&apos;t have an account?{' '}
          <button type="button" className="text-link-btn signup-link" onClick={onSignupClick}>
            Sign up
          </button>
        </p>
      </section>
    </main>
  );
}

export default Login;
