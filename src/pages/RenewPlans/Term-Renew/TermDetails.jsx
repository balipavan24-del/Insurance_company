import { createPortal } from 'react-dom';
import { HiOutlineXMark } from 'react-icons/hi2';
import {
    HiOutlineClock, HiOutlineLockClosed,
    HiOutlineCheckCircle, HiOutlinePhone,
    HiOutlineMail, HiOutlineUser,
    HiOutlineLocationMarker,
} from 'react-icons/hi';
import './Term-Renew.css';
import { useEffect, useState } from 'react';

const RESEND_COOLDOWN_SECONDS = 30;

const STEPS = {
    otp: 1,
    summary: 2,
    update: 3,
    edit: 4,
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
    MobileNumber: '9876543210',
    Email: 'balipavan@gmail.com',
    ResidentialAddress: '123, Kphh 9th phase,sriram resindency',
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
    const [NewDetails, setNewDetails] = useState({
        Nominee: '',
        MobileNumber: '',
        Email: '',
        ResidentialAddress: '',
    });
    const [policyData, setPolicyData] = useState(policy_summary);

    const {Nominee, MobileNumber, Email, ResidentialAddress} = NewDetails;

    const handleSave = (event) => {
        event.preventDefault();
        setPolicyData({
            ...policyData,
            Nominee: Nominee || policyData.Nominee,
            MobileNumber: MobileNumber || policyData.MobileNumber,
            Email: Email || policyData.Email,
            ResidentialAddress: ResidentialAddress || policyData.ResidentialAddress,
        });
        setNewDetails({
            Nominee: '',
            MobileNumber: '',
            Email: '',
            ResidentialAddress: '',
        });
        setStep(STEPS.update);
    };

    const handleNewDetails = (event) => {
        setNewDetails({
            ...NewDetails,
            [event.target.name]: event.target.value,
        });
    };

    const handleEdit = () => {
        setStep(STEPS.edit);
    };

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
                                        <p className="details">{policyData.Policyholder}</p>
                                    </div>
                                    <div className="summary-card">
                                        <h6>Insurer</h6>
                                        <p className="details">{policyData.Insurer}</p>
                                    </div>
                                </div>
                                <div className="summary-body-columns">
                                    <div className="summary-card">
                                        <h6>Sum Assured</h6>
                                        <p className="details">₹ {policyData.SumAssured.toLocaleString('en-IN')}</p>
                                    </div>
                                    <div className="summary-card">
                                        <h6>Policy Term</h6>
                                        <p className="details">{policyData.PolicyTerm} Years</p>
                                    </div>
                                </div>
                                <div className="summary-body-columns">
                                    <div className="summary-card">
                                        <h6>Premium</h6>
                                        <p className="details">₹ {policyData.Premium.toLocaleString('en-IN')} / year</p>
                                    </div>
                                    <div className="summary-card">
                                        <h6>Renewal Due</h6>
                                        <p className="details">{policyData.RenewalDue}</p>
                                    </div>
                                </div>
                                <div className="summary-body-columns">
                                    <div className="summary-card">
                                        <h6>Status</h6>
                                        <p className="details">{policyData.Status}</p>
                                    </div>
                                    <div className="summary-card">
                                        <h6>Nominee</h6>
                                        <p className="details">{policyData.Nominee}</p>
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
                                    Details you can update them.
                                </p>
                            </div>
                            <div className="term-Updates-body">
                                <div className="term-Updates-fields">
                                    <div className="term-Updates-field">
                                        <div className="term-Updates-field-label">
                                            <HiOutlineUser aria-hidden="true" />
                                            <span>Nominee:</span>
                                        </div>
                                        <p className="term-Updates-field-value">{policyData.Nominee}</p>
                                    </div>
                                    <div className="term-Updates-field">
                                        <div className="term-Updates-field-label">
                                            <HiOutlinePhone aria-hidden="true" />
                                            <span>Mobile Number:</span>
                                        </div>
                                        <p className="term-Updates-field-value">{policyData.MobileNumber}</p>
                                    </div>
                                    <div className="term-Updates-field">
                                        <div className="term-Updates-field-label">
                                            <HiOutlineMail aria-hidden="true" />
                                            <span>Email:</span>
                                        </div>
                                        <p className="term-Updates-field-value">{policyData.Email}</p>
                                    </div>
                                    <div className="term-Updates-field">
                                        <div className="term-Updates-field-label">
                                            <HiOutlineLocationMarker aria-hidden="true" />
                                            <span>Address:</span>
                                        </div>
                                        <p className="term-Updates-field-value">{policyData.ResidentialAddress}</p>
                                    </div>
                                </div>
                                <div className="term-Updates-buttons">
                                    <button type="button" className="term-Updates-button term-Updates-button--edit"
                                        onClick={handleEdit}
                                    >
                                        Edit
                                    </button>
                                    <span className="term-Updates-buttons-divider">or</span>
                                    <button type="button" className="term-Updates-button term-Updates-button--continue">
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                );

            case STEPS.edit:
                return (
                    <form className="term-Updates-form" onSubmit={handleSave}>
                        <div className="term-Updates-content">
                            <div className="term-Updates-header">
                                <h2 className="term-Updates-title">Edit Details</h2>
                                <p className="term-Updates-subtitle">
                                    Update only the fields you want to change.
                                </p>
                            </div>
                            <div className="term-Updates-body">
                                <div className="term-Updates-form-fields">
                                    <div className="term-Updates-form-field">
                                        <label className="term-Updates-form-label" htmlFor="edit-nominee">
                                            <HiOutlineUser aria-hidden="true" />
                                            <span>Nominee</span>
                                        </label>
                                        <p className="term-Updates-form-current">
                                            Current: {policyData.Nominee}
                                        </p>
                                        <input
                                            id="edit-nominee"
                                            type="text"
                                            className="term-Updates-form-input"
                                            placeholder="Enter new nominee"
                                            name="Nominee"
                                            value={Nominee}
                                            onChange={handleNewDetails}
                                        />
                                    </div>
                                    <div className="term-Updates-form-field">
                                        <label className="term-Updates-form-label" htmlFor="edit-mobile">
                                            <HiOutlinePhone aria-hidden="true" />
                                            <span>Mobile Number</span>
                                        </label>
                                        <p className="term-Updates-form-current">
                                            Current: {policyData.MobileNumber}
                                        </p>
                                        <input
                                            id="edit-mobile"
                                            type="tel"
                                            className="term-Updates-form-input"
                                            placeholder="Enter new mobile number"
                                            name="MobileNumber"
                                            value={MobileNumber}
                                            onChange={handleNewDetails}
                                        />
                                    </div>
                                    <div className="term-Updates-form-field">
                                        <label className="term-Updates-form-label" htmlFor="edit-email">
                                            <HiOutlineMail aria-hidden="true" />
                                            <span>Email</span>
                                        </label>
                                        <p className="term-Updates-form-current">
                                            Current: {policyData.Email}
                                        </p>
                                        <input
                                            id="edit-email"
                                            type="email"
                                            className="term-Updates-form-input"
                                            placeholder="Enter new email"
                                            name="Email"
                                            value={Email}
                                            onChange={handleNewDetails}
                                        />
                                    </div>
                                    <div className="term-Updates-form-field">
                                        <label className="term-Updates-form-label" htmlFor="edit-address">
                                            <HiOutlineLocationMarker aria-hidden="true" />
                                            <span>Address</span>
                                        </label>
                                        <p className="term-Updates-form-current">
                                            Current: {policyData.ResidentialAddress}
                                        </p>
                                        <input
                                            id="edit-address"
                                            type="text"
                                            className="term-Updates-form-input"
                                            placeholder="Enter new address"
                                            name="ResidentialAddress"
                                            value={ResidentialAddress}
                                            onChange={handleNewDetails}
                                        />
                                    </div>
                                </div>
                                <div className="term-Updates-buttons"> 
                                    <button
                                        type="submit"
                                        className="term-Updates-button term-Updates-button--continue"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
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
