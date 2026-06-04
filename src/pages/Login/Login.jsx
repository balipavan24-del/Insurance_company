import { useState } from 'react';
import BrandLogo from '../../components/BrandLogo/BrandLogo';
import './Login.css';

function Login({ onClose, onGuestLogin, onSignupClick }) {
  const [loginMode, setLoginMode] = useState('password');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [authStep, setAuthStep] = useState('mobile');
  const [showOtpError, setShowOtpError] = useState(false);

  const sanitizedUsername = username.trim();
  const sanitizedMobile = mobileNumber.replace(/\D/g, '').slice(0, 10);
  const sanitizedOtp = otpCode.replace(/\D/g, '').slice(0, 4);
  const canLoginWithPassword = sanitizedUsername.length > 0 && password.length >= 6;
  const canSendOtp = sanitizedMobile.length === 10;
  const canVerifyOtp = sanitizedOtp.length === 4;
  const maskedMobile = sanitizedMobile ? `+91 ${sanitizedMobile}` : '';

  const switchToPasswordMode = () => {
    setLoginMode('password');
    setPasswordError(false);
  };

  const switchToOtpMode = () => {
    setLoginMode('otp');
    setAuthStep('mobile');
    setShowOtpError(false);
  };

  const handlePasswordLogin = (event) => {
    event.preventDefault();
    if (!canLoginWithPassword) {
      return;
    }

    const isDemoPasswordValid = password === 'password123';
    if (isDemoPasswordValid) {
      onClose();
      return;
    }

    setPasswordError(true);
  };

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
          <BrandLogo className="brand-logo--auth" />
        </div>
        <h1>Welcome back</h1>
        <p>Choose your preferred login method</p>
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
        <div className="login-mode-switch" role="tablist" aria-label="Login methods">
          <button
            type="button"
            role="tab"
            aria-selected={loginMode === 'password'}
            className={`login-mode-btn${loginMode === 'password' ? ' is-active' : ''}`}
            onClick={switchToPasswordMode}
          >
            Username + Password
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={loginMode === 'otp'}
            className={`login-mode-btn${loginMode === 'otp' ? ' is-active' : ''}`}
            onClick={switchToOtpMode}
          >
            Mobile + OTP
          </button>
        </div>

        {loginMode === 'password' ? (
          <>
            <h2 id="login-page-title">Login with Email/Mobile</h2>
            <form className="login-form" onSubmit={handlePasswordLogin}>
              <div className="mobile-input-wrap">
                <span className="login-user-icon" aria-hidden="true">
                  @
                </span>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter email id or mobile number"
                  autoComplete="username"
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                    if (passwordError) {
                      setPasswordError(false);
                    }
                  }}
                  required
                />
              </div>

              <div className="mobile-input-wrap">
                <span className="login-user-icon" aria-hidden="true">
                  *
                </span>
                <input
                  id="password"
                  name="password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    if (passwordError) {
                      setPasswordError(false);
                    }
                  }}
                  required
                />
                <button
                  type="button"
                  className="password-visibility-btn"
                  onClick={() => setIsPasswordVisible((prevState) => !prevState)}
                  aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                >
                  {isPasswordVisible ? 'Hide' : 'Show'}
                </button>
              </div>

              <p className={`otp-hint${passwordError ? ' is-error' : ''}`}>
                {passwordError ? 'Invalid password. Use password123 for demo' : 'Use password: password123 for demo'}
              </p>

              <button type="submit" className="otp-btn" disabled={!canLoginWithPassword}>
                Login
              </button>
            </form>
          </>
        ) : (
          <>
            {authStep === 'mobile' ? (
              <>
                <h2 id="login-page-title">Login with Mobile OTP</h2>

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
          </>
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
