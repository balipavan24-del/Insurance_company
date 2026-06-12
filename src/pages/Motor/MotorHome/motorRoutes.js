export const MOTOR_CATEGORY_SLUGS = {
  'motor-car': 'car',
  'motor-bike': 'bike',
  'motor-three-wheeler': 'three-wheeler',
  'motor-commercial-vehicle': 'commercial-vehicle',
};

const MOTOR_SLUG_TO_CATEGORY = Object.entries(MOTOR_CATEGORY_SLUGS).reduce((result, [category, slug]) => {
  result[slug] = category;
  return result;
}, {});

export const getMotorCategoryFromSlug = (slug) => {
  if (!slug) {
    return null;
  }
  return MOTOR_SLUG_TO_CATEGORY[slug] || null;
};

export const MOTOR_HOME_ROUTE = '/motor-insurance';

export const getMotorRouteFromCategory = (categoryId) => {
  if (!categoryId) {
    return MOTOR_HOME_ROUTE;
  }
  const slug = MOTOR_CATEGORY_SLUGS[categoryId];
  return slug ? `/motor-insurance/${slug}` : MOTOR_HOME_ROUTE;
};
