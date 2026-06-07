const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_MM_DD_YYYY_REGEX = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;

export const sanitizePhoneNumber = (value) => String(value ?? '').replace(/\D/g, '').slice(0, 10);

export const isValidEmail = (value) => EMAIL_REGEX.test(String(value ?? '').trim());

export const isValidDateMmDdYyyy = (value) => DATE_MM_DD_YYYY_REGEX.test(String(value ?? '').trim());

export const validateHealthContactDetails = ({
  fullName,
  mobileNumber,
  city,
  pinCode,
  email
}) => {
  const validationErrors = [];
  const trimmedName = String(fullName ?? '').trim();
  const trimmedCity = String(city ?? '').trim();
  const trimmedEmail = String(email ?? '').trim();
  const mobileDigitsOnly = sanitizePhoneNumber(mobileNumber);
  const pinDigits = String(pinCode ?? '').replace(/\D/g, '');

  if (trimmedName.length < 2) {
    validationErrors.push('Please enter a valid full name.');
  }
  if (mobileDigitsOnly.length !== 10) {
    validationErrors.push('Please enter a valid 10-digit mobile number.');
  }
  if (trimmedCity.length < 2) {
    validationErrors.push('Please enter your city of residence.');
  }
  if (pinDigits.length > 0 && pinDigits.length !== 6) {
    validationErrors.push('PIN code must be exactly 6 digits, or leave it blank.');
  }
  if (trimmedEmail && !isValidEmail(trimmedEmail)) {
    validationErrors.push('Please enter a valid email address.');
  }

  return validationErrors;
};

export const validateTermLeadDetails = ({ fullName, dateOfBirth, mobileNumber }) => {
  const validationErrors = [];
  const trimmedName = String(fullName ?? '').trim();
  const trimmedDob = String(dateOfBirth ?? '').trim();
  const mobileDigitsOnly = sanitizePhoneNumber(mobileNumber);

  if (trimmedName.length < 2) {
    validationErrors.push('Please enter your full name.');
  }
  if (!trimmedDob) {
    validationErrors.push('Please enter your date of birth.');
  } else if (!isValidDateMmDdYyyy(trimmedDob)) {
    validationErrors.push('Date of birth must be in mm/dd/yyyy format.');
  }
  if (mobileDigitsOnly.length !== 10) {
    validationErrors.push('Please enter a valid 10-digit mobile number.');
  }

  return validationErrors;
};

export const validateBusinessLeadDetails = ({ fullName, mobileNumber }) => {
  const validationErrors = [];
  const trimmedName = String(fullName ?? '').trim();
  const mobileDigitsOnly = sanitizePhoneNumber(mobileNumber);

  if (trimmedName.length < 2) {
    validationErrors.push('Please enter your full name.');
  }
  if (mobileDigitsOnly.length !== 10) {
    validationErrors.push('Please enter a valid 10-digit mobile number.');
  }

  return validationErrors;
};

/** Signup password rules — shown in UI; backend team can mirror the same rules */
export const SIGNUP_PASSWORD_RULES = [
  {
    id: 'minLength',
    label: '8+ characters',
    test: (password) => String(password ?? '').length >= 8,
  },
  {
    id: 'uppercase',
    label: 'Uppercase A–Z',
    test: (password) => /[A-Z]/.test(String(password ?? '')),
  },
  {
    id: 'lowercase',
    label: 'Lowercase a–z',
    test: (password) => /[a-z]/.test(String(password ?? '')),
  },
  {
    id: 'digit',
    label: 'Number 0–9',
    test: (password) => /\d/.test(String(password ?? '')),
  },
  {
    id: 'special',
    label: 'Special @$!%*?&#',
    test: (password) => /[@$!%*?&#]/.test(String(password ?? '')),
  },
];

/** For signup UI password rule checklist */
export const getSignupPasswordRuleResults = (password) =>
  SIGNUP_PASSWORD_RULES.map((rule) => ({
    id: rule.id,
    label: rule.label,
    passed: rule.test(password),
  }));

export const validateSignupPassword = (password) => {
  const validationErrors = [];
  getSignupPasswordRuleResults(password).forEach((rule) => {
    if (!rule.passed) {
      validationErrors.push(`Password: ${rule.label}.`);
    }
  });
  return validationErrors;
};

export const validateSignupDetails = ({ fullName, mobileNumber, email, password }) => {
  const validationErrors = [];
  const trimmedName = String(fullName ?? '').trim();
  const trimmedEmail = String(email ?? '').trim();
  const mobileDigitsOnly = sanitizePhoneNumber(mobileNumber);
  const passwordValue = String(password ?? '');

  if (trimmedName.length < 2) {
    validationErrors.push('Please enter a valid full name (at least 2 characters).');
  }
  if (mobileDigitsOnly.length !== 10) {
    validationErrors.push('Please enter a valid 10-digit mobile number.');
  }
  if (!trimmedEmail) {
    validationErrors.push('Please enter your email address.');
  } else if (!isValidEmail(trimmedEmail)) {
    validationErrors.push('Please enter a valid email address.');
  }
  validationErrors.push(...validateSignupPassword(passwordValue));

  return validationErrors;
};

/** Demo login — remove when real auth API is connected */
export const DEMO_LOGIN_PASSWORD = 'password123';
export const DEMO_LOGIN_OTP = '1234';

export const validateOtpMobileNumber = (mobileNumber) => {
  const validationErrors = [];
  const mobileDigitsOnly = sanitizePhoneNumber(mobileNumber);

  if (mobileDigitsOnly.length !== 10) {
    validationErrors.push('Please enter a valid 10-digit mobile number.');
  }

  return validationErrors;
};

export const validateOtpVerificationDetails = ({ otpCode, otpSent }) => {
  const validationErrors = [];
  const otpDigitsOnly = String(otpCode ?? '').replace(/\D/g, '');

  if (!otpSent) {
    validationErrors.push('Please send OTP to your mobile number first.');
    return validationErrors;
  }

  if (otpDigitsOnly.length !== 4) {
    validationErrors.push('Please enter the 4-digit OTP.');
  }

  return validationErrors;
};

export const validateCargoLeadDetails = ({
  fullName,
  businessName,
  mobileNumber,
  email,
  requireEmail = false
}) => {
  const validationErrors = [];
  const trimmedName = String(fullName ?? '').trim();
  const trimmedBusinessName = String(businessName ?? '').trim();
  const trimmedEmail = String(email ?? '').trim();
  const mobileDigitsOnly = sanitizePhoneNumber(mobileNumber);

  if (trimmedName.length < 2) {
    validationErrors.push('Please enter your full name.');
  }
  if (trimmedBusinessName.length < 2) {
    validationErrors.push('Please enter your business name.');
  }
  if (mobileDigitsOnly.length !== 10) {
    validationErrors.push('Please enter a valid 10-digit mobile number.');
  }
  if (requireEmail && !trimmedEmail) {
    validationErrors.push('Please enter your email address.');
  } else if (trimmedEmail && !isValidEmail(trimmedEmail)) {
    validationErrors.push('Please enter a valid email address.');
  }

  return validationErrors;
};
