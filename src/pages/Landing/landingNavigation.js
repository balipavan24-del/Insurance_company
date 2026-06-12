import { getMotorRouteFromCategory } from '../Motor/MotorHome/motorRoutes';

export const navigateInsuranceCard = (navigate, optionId) => {
  if (optionId === 'motor-insurance') {
    navigate(getMotorRouteFromCategory());
    return;
  }

  if (optionId === 'health-insurance') {
    navigate('/health-insurance');
    return;
  }

  if (optionId === 'cargo-insurance') {
    navigate('/cargo-insurance');
    return;
  }

  if (optionId === 'business-insurance') {
    navigate('/business-insurance');
    return;
  }

  if (optionId === 'term-insurance') {
    navigate('/term-insurance');
  }
};
