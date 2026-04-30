const formatDate = (dateValue) => {
  return dateValue.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

const createPolicyCardByStatus = (statusType) => {
  const today = new Date();
  const startDate = new Date(today);
  const endDate = new Date(today);

  if (statusType === 'expired') {
    startDate.setFullYear(today.getFullYear() - 1);
    endDate.setDate(today.getDate() - 12);
    return {
      title: 'Insurance Expired',
      statusLabel: 'Expired',
      iconSymbol: '✕',
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      ctaLabel: 'Renew Now',
      note: 'Renew today to avoid penalties and claim rejection risk.'
    };
  }

  if (statusType === 'expiringSoon') {
    startDate.setFullYear(today.getFullYear() - 1);
    endDate.setDate(today.getDate() + 20);
    return {
      title: 'Insurance Expiring Soon',
      statusLabel: 'Expiring Soon',
      iconSymbol: '!',
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      ctaLabel: 'Renew Early',
      note: 'Renew early to keep your no-claim benefits protected.'
    };
  }

  startDate.setFullYear(today.getFullYear() - 1);
  endDate.setFullYear(today.getFullYear() + 1);
  return {
    title: 'Insurance Found',
    statusLabel: 'Active',
    iconSymbol: '✓',
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
    ctaLabel: 'Compare Plans',
    note: 'Renew early to save more.'
  };
};

const getPolicyStatusFromNumber = (vehicleId) => {
  if (/(EX|BX|TE|CE)/.test(vehicleId)) {
    return 'expired';
  }
  if (/(SO|BS|TS|CS)/.test(vehicleId)) {
    return 'expiringSoon';
  }
  return 'active';
};

const getPolicyCardFromVehicleNumber = (vehicleId) => {
  return createPolicyCardByStatus(getPolicyStatusFromNumber(vehicleId));
};

export const MOTOR_POLICY_DUMMY_EXAMPLES = {
  active: 'AP09AB1234',
  expired: 'AP09EX1234',
  expiringSoon: 'AP09SO1234'
};

export { getPolicyCardFromVehicleNumber };
