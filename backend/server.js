const express = require('express');
const cors = require('cors');

const PORT = Number(process.env.PORT) || 4591;
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

const formatDate = (dateValue) => dateValue.toLocaleDateString('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

const getPolicyDates = (statusType) => {
  const today = new Date();
  const startDate = new Date(today);
  const endDate = new Date(today);

  if (statusType === 'expired') {
    startDate.setFullYear(today.getFullYear() - 1);
    endDate.setDate(today.getDate() - 12);
  } else if (statusType === 'expiringSoon') {
    startDate.setFullYear(today.getFullYear() - 1);
    endDate.setDate(today.getDate() + 20);
  } else {
    startDate.setFullYear(today.getFullYear() - 1);
    endDate.setFullYear(today.getFullYear() + 1);
  }

  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
  };
};

// —— Term renew dummy policies (replace with DB later) ——
const termPolicies = {
  TERM2026001: {
    PolicyNumber: 'TERM2026001',
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
  },
  TERM2026002: {
    PolicyNumber: 'TERM2026002',
    Policyholder: 'Rahul Sharma',
    Insurer: 'Life Secure Co.',
    SumAssured: 5000000,
    PolicyTerm: 20,
    Premium: 9200,
    RenewalDue: '28 July 2026',
    Status: 'Active — Due for Renewal',
    Nominee: 'Priya Sharma',
    MobileNumber: '9123456780',
    Email: 'rahul.sharma@example.com',
    ResidentialAddress: '45, MG Road, Bengaluru',
  },
};

const normalizePolicyNumber = (value) => String(value ?? '').trim().toUpperCase();
const normalizeMobile = (value) => String(value ?? '').replace(/\D/g, '');
const normalizeEmail = (value) => String(value ?? '').trim().toLowerCase();

const getTermPolicyByNumber = (policyNumber) => termPolicies[normalizePolicyNumber(policyNumber)] ?? null;

const getTermPolicyByMobile = (mobileNumber) => {
  const mobile = normalizeMobile(mobileNumber);
  return Object.values(termPolicies).find((policy) => policy.MobileNumber === mobile) ?? null;
};

const getTermPolicyByEmail = (email) => {
  const normalizedEmail = normalizeEmail(email);
  return Object.values(termPolicies).find((policy) => normalizeEmail(policy.Email) === normalizedEmail) ?? null;
};

const UPDATABLE_TERM_FIELDS = ['Nominee', 'MobileNumber', 'Email', 'ResidentialAddress'];

const updateTermPolicyDetails = (policyNumber, updates = {}) => {
  const key = normalizePolicyNumber(policyNumber);
  const policy = termPolicies[key];

  if (!policy) {
    return null;
  }

  UPDATABLE_TERM_FIELDS.forEach((field) => {
    const value = updates[field];
    if (typeof value === 'string' && value.trim()) {
      policy[field] = value.trim();
    }
  });

  return { ...policy };
};

// Lookup by vehicle number only (replace with DB later)
const vehiclenumber = {
  AP09AB1234: {
    vehicleNumber: 'AP09AB1234',
    title: 'Insurance Found',
    status: 'active',
    statusLabel: 'Active',
    iconSymbol: '✓',
    ctaLabel: 'Compare Plans',
    note: 'Renew early to save more.',
    ...getPolicyDates('active'),
  },
  AP09EX1234: {
    vehicleNumber: 'AP09EX1234',
    title: 'Insurance Expired',
    status: 'expired',
    statusLabel: 'Expired',
    iconSymbol: '✕',
    ctaLabel: 'Renew Now',
    note: 'Renew today to avoid penalties and claim rejection risk.',
    ...getPolicyDates('expired'),
  },
  AP09SO1234: {
    vehicleNumber: 'AP09SO1234',
    title: 'Insurance Expiring Soon',
    status: 'expiringSoon',
    statusLabel: 'Expiring Soon',
    iconSymbol: '!',
    ctaLabel: 'Renew Early',
    note: 'Renew early to keep your no-claim benefits protected.',
    ...getPolicyDates('expiringSoon'),
  },
};

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'insureease-api', motor: true, term: true });
});

// GET /term/policies/TERM2026001 — lookup by policy number
app.get('/term/policies/:policyNumber', (req, res) => {
  const policyNumber = normalizePolicyNumber(req.params.policyNumber);

  if (!policyNumber) {
    return res.status(400).json({ message: 'Policy number is required.' });
  }

  const policy = getTermPolicyByNumber(policyNumber);

  if (!policy) {
    return res.status(404).json({
      message: 'No term policy found for this policy number.',
      policyNumber,
    });
  }

  return res.json(policy);
});

// GET /term/policies/mobile/9876543210 — lookup by mobile number
app.get('/term/policies/mobile/:mobileNumber', (req, res) => {
  const mobileNumber = normalizeMobile(req.params.mobileNumber);

  if (!mobileNumber) {
    return res.status(400).json({ message: 'Mobile number is required.' });
  }

  const policy = getTermPolicyByMobile(mobileNumber);

  if (!policy) {
    return res.status(404).json({
      message: 'No term policy found for this mobile number.',
      mobileNumber,
    });
  }

  return res.json(policy);
});

// GET /term/policies/email/balipavan@gmail.com — lookup by email
app.get('/term/policies/email/:email', (req, res) => {
  const email = normalizeEmail(req.params.email);

  if (!email) {
    return res.status(400).json({ message: 'Email address is required.' });
  }

  const policy = getTermPolicyByEmail(email);

  if (!policy) {
    return res.status(404).json({
      message: 'No term policy found for this email address.',
      email,
    });
  }

  return res.json(policy);
});

// PATCH /term/policies/TERM2026001 — update optional details (Nominee, MobileNumber, Email, ResidentialAddress)
app.patch('/term/policies/:policyNumber', (req, res) => {
  const policyNumber = normalizePolicyNumber(req.params.policyNumber);

  if (!policyNumber) {
    return res.status(400).json({ message: 'Policy number is required.' });
  }

  const updatedPolicy = updateTermPolicyDetails(policyNumber, req.body);

  if (!updatedPolicy) {
    return res.status(404).json({
      message: 'No term policy found for this policy number.',
      policyNumber,
    });
  }

  return res.json({
    message: 'Policy details updated successfully.',
    policy: updatedPolicy,
  });
});

// GET /motor/vehicles/AP09AB1234 — lookup by vehicle number only
app.get('/motor/vehicles/:vehicleNumber', (req, res) => {
  const vehicleNumber = String(req.params.vehicleNumber ?? '').toUpperCase();

  if (!vehicleNumber) {
    return res.status(400).json({ message: 'Vehicle number is required.' });
  }

  const policyCard = vehiclenumber[vehicleNumber];

  if (!policyCard) {
    return res.status(404).json({
      message: 'No policy found for this vehicle number.',
      vehicleNumber,
    });
  }

  return res.json(policyCard);
});

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
  console.log('Motor demo numbers: AP09AB1234, AP09EX1234, AP09SO1234');
  console.log('Term demo policies: TERM2026001, TERM2026002');
  console.log('Term demo mobile: 9876543210, 9123456780');
  console.log('Term demo email: balipavan@gmail.com, rahul.sharma@example.com');
});
