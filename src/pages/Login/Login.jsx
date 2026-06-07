import { useState } from 'react';
import BrandLogo from '../../components/BrandLogo/BrandLogo';
import {
  DEMO_LOGIN_OTP,
  DEMO_LOGIN_PASSWORD,
  validateOtpMobileNumber,
  validateOtpVerificationDetails,
} from '../../utils/validations/leadValidation';
import './Login.css';

function Login({ onClose, onGuestLogin, onSignupClick }) {
  const [loginMode, setLoginMode] = useState('password');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpErrorMessage, setOtpErrorMessage] = useState('');

  const sanitizedUsername = username.trim();
  const sanitizedMobile = mobileNumber.replace(/\D/g, '').slice(0, 10);
  const canLoginWithPassword = sanitizedUsername.length > 0 && password.length >= 6;
  const canSendOtp = sanitizedMobile.length === 10;
  const maskedMobile = sanitizedMobile ? `+91 ${sanitizedMobile}` : '';

  const handlePasswordLogin = (event) => {
    event.preventDefault();
    if (!canLoginWithPassword) {
      return;
    }

    if (password === DEMO_LOGIN_PASSWORD) {
      onClose();
      return;
    }

    setPasswordError(true);
  };

  const handleSendOtp = () => {
    const mobileErrors = validateOtpMobileNumber(mobileNumber);
    if (mobileErrors.length > 0) {
      setOtpErrorMessage(mobileErrors[0]);
      return;
    }

    setOtpSent(true);
    setOtpErrorMessage('');
    setOtpCode('');
  };

  const handleMobileChange = (event) => {
    setMobileNumber(event.target.value);
    if (otpSent) {
      setOtpSent(false);
      setOtpCode('');
    }
    if (otpErrorMessage) {
      setOtpErrorMessage('');
    }
  };

  const handleVerifyOtp = (event) => {
    event.preventDefault();

    const validationErrors = validateOtpVerificationDetails({ otpCode, otpSent });
    if (validationErrors.length > 0) {
      window.alert('Enter OTP');
      return;
    }

    const otpDigits = otpCode.replace(/\D/g, '').slice(0, 4);

    if (otpDigits !== DEMO_LOGIN_OTP) {
      setOtpErrorMessage('Invalid OTP. Please try again.');
      return;
    }

    setOtpErrorMessage('');
    onClose();
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
        <div className="login-card__top">
          <button type="button" className="login-close-btn" aria-label="Back to home" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="login-mode-switch" role="tablist" aria-label="Login methods">
          <button
            type="button"
            role="tab"
            aria-selected={loginMode === 'password'}
            className={`login-mode-btn${loginMode === 'password' ? ' is-active' : ''}`}
            onClick={() => {
              setLoginMode('password');
              setPasswordError(false);
            }}
          >
            Username + Password
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={loginMode === 'otp'}
            className={`login-mode-btn${loginMode === 'otp' ? ' is-active' : ''}`}
            onClick={() => {
              setLoginMode('otp');
              setOtpSent(false);
              setOtpErrorMessage('');
              setOtpCode('');
            }}
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
                  onClick={() => setIsPasswordVisible((visible) => !visible)}
                  aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                >
                  {isPasswordVisible ? 'Hide' : 'Show'}
                </button>
              </div>

              {passwordError && (
                <p className="otp-hint is-error">Invalid password. Please try again.</p>
              )}

              <button type="submit" className="otp-btn" disabled={!canLoginWithPassword}>
                Login
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 id="login-page-title">Login with Mobile OTP</h2>
            <form className="login-form otp-form" onSubmit={handleVerifyOtp}>
              <div className="login-mobile-otp-row">
                <div className="mobile-input-wrap login-mobile-otp-row__input">
                  <span className="mobile-input-icon" aria-hidden="true" />
                  <input
                    id="mobileNumber"
                    name="mobileNumber"
                    type="tel"
                    placeholder="Enter your mobile number"
                    inputMode="numeric"
                    autoComplete="tel"
                    aria-label="Mobile number"
                    value={mobileNumber}
                    onChange={handleMobileChange}
                    required
                  />
                </div>

                {!otpSent && (
                  <button
                    type="button"
                    className="otp-send-btn login-mobile-otp-row__btn"
                    onClick={handleSendOtp}
                    disabled={!canSendOtp}
                  >
                    Send OTP
                  </button>
                )}
              </div>

              {otpSent && <p className="otp-sent-text">OTP sent to {maskedMobile}</p>}

              <div className="login-mobile-otp-row">
                <div className="mobile-input-wrap otp-input-wrap login-mobile-otp-row__input">
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
                    aria-label="Enter OTP"
                    value={otpCode}
                    onChange={(event) => {
                      setOtpCode(event.target.value.replace(/\D/g, '').slice(0, 4));
                      if (otpErrorMessage) {
                        setOtpErrorMessage('');
                      }
                    }}
                    required
                  />
                </div>

                {otpSent && (
                  <button
                    type="button"
                    className="otp-send-btn login-mobile-otp-row__btn"
                    onClick={handleSendOtp}
                    disabled={!canSendOtp}
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              {otpErrorMessage && <p className="otp-hint is-error">{otpErrorMessage}</p>}

              <button type="submit" className="otp-btn otp-verify-btn">
                Verify &amp; Login
              </button>
            </form>
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
