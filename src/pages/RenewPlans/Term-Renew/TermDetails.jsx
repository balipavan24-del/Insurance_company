import { createPortal } from 'react-dom';
import { HiOutlineXMark } from 'react-icons/hi2';
import {
    HiOutlineClock, HiOutlineLockClosed,
    HiOutlineCheckCircle, HiOutlinePhone,
    HiOutlineMail, HiOutlineUser,
    HiOutlineLocationMarker, HiOutlineChevronRight,
} from 'react-icons/hi';
import './Term-Renew.css';
import { useEffect, useState } from 'react';
const RESEND_COOLDOWN_SECONDS = 30;

const STEPS = {
    otp: 1,
    summary: 2,
    update: 3,
};
const policy_summary = {
    Policyholder: 'Pavan bali',
    Insurer: 'Insure Agies.',
    SumAssured: 10000000,
    PolicyTerm: 30,
    Premium: 14820,
    RenewalDue: '12 June 2026',
    Status: 'Active — Due for Renewal',
    Nominee: 'Katyayani',
};
const formatResendTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

function TermDetails({ open, close, children }) {
    const [otp, setOtp] = useState('');
    const [resendSeconds, setResendSeconds] = useState(RESEND_COOLDOWN_SECONDS);
    const [step, setStep] = useState(STEPS.otp);

    useEffect(() => {
        if (!open) {
            setStep(STEPS.otp);
            setOtp('');
            return undefined;
        }

        setResendSeconds(RESEND_COOLDOWN_SECONDS);

        const intervalId = window.setInterval(() => {
            setResendSeconds((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => window.clearInterval(intervalId);
    }, [open]);

    const handleResend = () => {
        if (resendSeconds > 0) {
            return;
        }
        setResendSeconds(RESEND_COOLDOWN_SECONDS);
    };

    const handleOtpChange = (event) => {
        setOtp(event.target.value);
    };

    const handleVerify = () => {
        if (otp.length !== 6) {
            window.alert('Please enter a valid OTP');
            return;
        }
        setStep(STEPS.summary);
    };

    const goNext = () => {
        setStep((prev) => Math.min(prev + 1, STEPS.update));
    };

    const goBack = () => {
        setStep((prev) => Math.max(prev - 1, STEPS.otp));
    };

    const renderStep = () => {
        switch (step) {
            case STEPS.otp:
                return (
                    <div className="term-details-otp">
                        <div className="term-details-content">
                            <h2 id="term-details-title" className="term-details-title">
                                Verify Your Identity
                            </h2>
                        </div>
                        <p className="term-details-text">
                            We&apos;ve sent a 6-digit OTP to your registered mobile number.
                        </p>
                        <input
                            type="text"
                            className="term-details-input"
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            maxLength={6}
                            placeholder="Enter 6-digit OTP"
                            value={otp}
                            onChange={handleOtpChange}
                        />
                        <button type="button" className="term-details-button" onClick={handleVerify}>
                            Verify & Continue
                        </button>
                        <div className="term-details-footer">
                            <div className="term-details-footer__row">
                                {resendSeconds > 0 ? (
                                    <p className="term-details-footer__timer">
                                        <HiOutlineClock className="term-details-footer__icon" aria-hidden="true" />
                                        Resend in {formatResendTime(resendSeconds)}
                                    </p>
                                ) : (
                                    <span className="term-details-footer__timer-placeholder" aria-hidden="true" />
                                )}
                                <button
                                    type="button"
                                    className="term-details-footer__resend"
                                    onClick={handleResend}
                                    disabled={resendSeconds > 0}
                                >
                                    Resend OTP
                                </button>
                            </div>
                            <p className="term-details-footer__secure">
                                <HiOutlineLockClosed className="term-details-footer__icon" aria-hidden="true" />
                                Secured with 256-bit encryption
                            </p>
                        </div>
                    </div>
                );
            case STEPS.summary:
                return (
                    <>
                        <div className="term-details-content term-details-summary">
                            <div className="summary-header">
                                <div className="summary-header-left">
                                    <h2 className="summary-title">Policy Summary</h2>
                                    <p className="summary-subtitle">
                                        Please review your existing policy details.
                                    </p>
                                </div>
                                <div className="summary-header-right">
                                    <p className="verified">
                                        <HiOutlineCheckCircle aria-hidden="true" />
                                        Verified
                                    </p>
                                </div>
                            </div>
                            <div className="summary-body">
                                <div className="summary-body-columns">
                                    <div className="summary-card">
                                        <h6>Policyholder</h6>
                                        <p className="details">{policy_summary.Policyholder}</p>
                                    </div>
                                    <div className="summary-card">
                                        <h6>Insurer</h6>
                                        <p className="details">{policy_summary.Insurer}</p>
                                    </div>
                                </div>
                                <div className="summary-body-columns">
                                    <div className="summary-card">
                                        <h6>Sum Assured</h6>
                                        <p className="details">₹ {policy_summary.SumAssured.toLocaleString('en-IN')}</p>
                                    </div>
                                    <div className="summary-card">
                                        <h6>Policy Term</h6>
                                        <p className="details">{policy_summary.PolicyTerm} Years</p>
                                    </div>
                                </div>
                                <div className="summary-body-columns">
                                    <div className="summary-card">
                                        <h6>Premium</h6>
                                        <p className="details">₹ {policy_summary.Premium.toLocaleString('en-IN')} / year</p>
                                    </div>
                                    <div className="summary-card">
                                        <h6>Renewal Due</h6>
                                        <p className="details">{policy_summary.RenewalDue}</p>
                                    </div>
                                </div>
                                <div className="summary-body-columns">
                                    <div className="summary-card">
                                        <h6>Status</h6>
                                        <p className="details">{policy_summary.Status}</p>
                                    </div>
                                    <div className="summary-card">
                                        <h6>Nominee</h6>
                                        <p className="details">{policy_summary.Nominee}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="summary-actions">
                                <button type="button" className="summary-back-btn" onClick={goBack}>
                                    Back
                                </button>
                                <button type="button" className="summary-continue-btn" onClick={goNext}>
                                    Continue
                                </button>
                            </div>
                        </div>
                    </>
                );

            case STEPS.update:
                return (
                    <>
                        <div className="term-Updates-content">
                            <div className="term-Updates-header">
                                <h2 className="term-Updates-title">Optional Updates</h2>
                                <p className="term-Updates-subtitle">
                                    Update any details before continuing to payment.
                                </p>
                            </div>
                            <div className="term-Updates-body">
                                <div className="term-Updates-card-container">
                                    <div className="term-Updates-card">
                                        <h6>
                                            <span className="term-Updates-card-label">
                                                <HiOutlinePhone aria-hidden="true" />
                                                Mobile Number
                                            </span>
                                            <HiOutlineChevronRight className="term-Updates-card-icon" aria-hidden="true" />
                                        </h6>
                                    </div>
                                    <div className="term-Updates-card">
                                        <h6>
                                            <span className="term-Updates-card-label">
                                                <HiOutlineMail aria-hidden="true" />
                                                Email Address
                                            </span>
                                            <HiOutlineChevronRight className="term-Updates-card-icon" aria-hidden="true" />
                                        </h6>
                                    </div>
                                </div>
                                <div className="term-Updates-card-container">
                                    <div className="term-Updates-card">
                                        <h6>
                                            <span className="term-Updates-card-label">
                                                <HiOutlineUser aria-hidden="true" />
                                                Nominee Details
                                            </span>
                                            <HiOutlineChevronRight className="term-Updates-card-icon" aria-hidden="true" />
                                        </h6>
                                    </div>
                                    <div className="term-Updates-card">
                                        <h6>
                                            <span className="term-Updates-card-label">
                                                <HiOutlineLocationMarker aria-hidden="true" />
                                                Residential Address
                                            </span>
                                            <HiOutlineChevronRight className="term-Updates-card-icon" aria-hidden="true" />
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <div className="summary-actions">
                                <button type="button" className="summary-back-btn" onClick={goBack}>
                                    Back
                                </button>
                                <button type="button" className="summary-continue-btn" onClick={close}>
                                    Continue
                                </button>
                            </div>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    if (!open) {
        return null;
    }

    return createPortal(
        <div className="term-details-overlay" onClick={close} role="presentation">
            <div
                className="term-details-panel"
                onClick={(event) => event.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="term-details-title"
            >
                <button type="button" className="term-details-close" onClick={close} aria-label="Close">
                    <HiOutlineXMark aria-hidden="true" />
                </button>
                {renderStep()}
                {children}
            </div>
        </div>,
        document.body,
    );
}
export default TermDetails;
