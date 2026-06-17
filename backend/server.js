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
  res.json({ ok: true, service: 'insureease-motor-api' });
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
  console.log(`Motor API running at http://localhost:${PORT}`);
  console.log('Demo numbers: AP09AB1234, AP09EX1234, AP09SO1234');
  console.log('Any other valid number returns 404 — no data');
});
