import { getMotorRouteFromCategory } from '../../pages/Motor/motorRoutes';

export const navigateMenuOption = (navigate, optionId) => {
  if (optionId === 'renewal-plans') {
    navigate('/?menu=renewal-plans');
    return;
  }

  if (optionId === 'renewal-motor-car') {
    navigate('/renew-plans/car');
    return;
  }

  if (optionId === 'renewal-motor-bike') {
    navigate('/renew-plans/bike');
    return;
  }

  if (optionId === 'renewal-motor-commercial') {
    navigate('/renew-plans/commercial-vehicle');
    return;
  }

  if (optionId === 'renewal-motor-three-wheeler') {
    navigate('/renew-plans/three-wheeler');
    return;
  }

  if (optionId === 'renewal-health-individual') {
    navigate('/health-insurance?flow=renewal&plan=individual');
    return;
  }

  if (optionId === 'renewal-health-family') {
    navigate('/health-insurance?flow=renewal&plan=family');
    return;
  }

  if (optionId === 'renewal-health-senior') {
    navigate('/health-insurance?flow=renewal&plan=senior');
    return;
  }

  if (optionId === 'renewal-term') {
    navigate('/term-insurance?flow=renewal');
    return;
  }

  if (optionId === 'renewal-track-policy') {
    navigate('/contact-us?topic=track-policy');
    return;
  }

  if (optionId === 'renewal-download-copy') {
    navigate('/contact-us?topic=policy-copy');
    return;
  }

  if (optionId === 'renewal-claim-assistance') {
    navigate('/contact-us?topic=claim-assistance');
    return;
  }

  if (optionId.startsWith('motor-addon-')) {
    const addonParam = {
      'motor-addon-zero-depreciation': 'zero-depreciation',
      'motor-addon-roadside': 'roadside-assistance',
      'motor-addon-engine': 'engine-protection',
    }[optionId];
    if (addonParam) {
      navigate(`/motor-insurance/car?addon=${addonParam}`);
      return;
    }
  }

  if (optionId === 'motor-tool-premium-calculator') {
    navigate('/motor-insurance/car?tool=premium-calculator');
    return;
  }

  if (optionId === 'motor-tool-browse-plans') {
    navigate('/motor-insurance/car');
    return;
  }

  if (optionId === 'motor-tool-claim-support') {
    navigate('/contact-us');
    return;
  }

  if (optionId === 'motor-insurance') {
    navigate(getMotorRouteFromCategory('motor-car'));
    return;
  }

  if (optionId.startsWith('motor-')) {
    navigate(getMotorRouteFromCategory(optionId));
    return;
  }

  if (optionId === 'health-premium-calculator') {
    navigate('/health-insurance?tool=premium-calculator');
    return;
  }

  if (optionId === 'health-claim-support') {
    navigate('/contact-us');
    return;
  }

  if (optionId === 'health-all-plans' || optionId === 'health-insurance') {
    navigate('/health-insurance');
    return;
  }

  if (optionId.startsWith('health-')) {
    const healthPlanParam = {
      'health-individual': 'individual',
      'health-family-floater': 'family',
      'health-senior-citizen': 'senior',
      'health-critical-illness': 'critical',
      'health-top-up': 'top-up',
    }[optionId];

    if (healthPlanParam) {
      navigate(`/health-insurance?plan=${healthPlanParam}`);
      return;
    }

    navigate('/health-insurance');
    return;
  }

  if (optionId === 'cargo-claim-support' || optionId === 'cargo-track-request') {
    navigate('/contact-us');
    return;
  }

  if (optionId === 'cargo-request-quote') {
    navigate('/cargo-insurance/marine');
    return;
  }

  if (optionId === 'cargo-single-transit') {
    navigate('/cargo-insurance?coverage=single-transit');
    return;
  }

  if (optionId === 'cargo-open-cover') {
    navigate('/cargo-insurance?coverage=open-cover');
    return;
  }

  if (optionId === 'cargo-annual-policy') {
    navigate('/cargo-insurance?coverage=annual-policy');
    return;
  }

  if (optionId === 'cargo-insurance' || optionId.startsWith('cargo-')) {
    if (optionId === 'cargo-marine') {
      navigate('/cargo-insurance/marine');
      return;
    }
    if (optionId === 'cargo-air') {
      navigate('/cargo-insurance/air');
      return;
    }
    if (optionId === 'cargo-inland' || optionId === 'cargo-inland-road' || optionId === 'cargo-inland-rail') {
      navigate('/cargo-insurance/inland');
      return;
    }
    navigate('/cargo-insurance');
    return;
  }

  if (optionId === 'business-premium-calculator') {
    navigate('/business-insurance?tool=premium-calculator');
    return;
  }

  if (optionId === 'business-claim-support') {
    navigate('/contact-us');
    return;
  }

  if (optionId === 'business-all-plans' || optionId === 'business-insurance') {
    navigate('/business-insurance');
    return;
  }

  if (optionId === 'business-fire-damage') {
    navigate('/business/fire');
    return;
  }
  if (optionId === 'business-theft-protection') {
    navigate('/business-insurance/theft-protection');
    return;
  }
  if (optionId === 'business-natural-disaster') {
    navigate('/business-insurance/natural-disaster');
    return;
  }
  if (optionId === 'business-equipment-breakdown') {
    navigate('/business-insurance/equipment-breakdown');
    return;
  }
  if (optionId.startsWith('property-')) {
    navigate('/business-insurance');
    return;
  }

  if (optionId === 'term-insurance' || optionId.startsWith('term-')) {
    navigate('/term-insurance');
    return;
  }

  if (optionId === 'support') {
    navigate('/contact-us');
    return;
  }

  navigate(`/?menu=${optionId}`);
};
