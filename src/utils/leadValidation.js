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
