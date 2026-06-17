// Indian vehicle registration validation logic only (not wired yet)

const INDIAN_STATE_CODES = ['AP', 'TS', 'KA', 'TN', 'MH', 'DL', 'KL', 'GJ', 'BH'];

const Validnumber = (value) => {
  const rawValue = String(value ?? '');

  // Only capital letters and digits — no spaces, symbols, or lowercase (no replace/cleanup)
  if (!/^[A-Z0-9]+$/.test(rawValue)) {
    return false;
  }
else{
  const stateCode = rawValue.slice(0, 2);

  // Standard series — state code + RTO + series + 4 digits (e.g. AP09AB1234)
  const regularPattern = /^\d{1,2}[A-Z]{1,3}\d{4}$/;
  const isRegularSeriesPlate = INDIAN_STATE_CODES.includes(stateCode)
    && regularPattern.test(rawValue.slice(2));

  // Bharat (BH) series — e.g. 22BH1234AA (not a state prefix)
  const bharatSeriesPattern = /^\d{2}BH\d{4}[A-Z]{1,2}$/;
  const isBharatSeriesPlate = bharatSeriesPattern.test(rawValue);

  return isRegularSeriesPlate || isBharatSeriesPlate;
}
};

export { Validnumber };
