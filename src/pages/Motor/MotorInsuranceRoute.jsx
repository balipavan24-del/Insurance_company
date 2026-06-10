import { Navigate, useParams } from 'react-router-dom';
import MotorHome from './MotorInsurance';
import { getMotorCategoryFromSlug } from './motorRoutes';

function MotorInsuranceRoute({ onBackHome }) {
  const { category } = useParams();
  const selectedCategory = getMotorCategoryFromSlug(category);

  if (!selectedCategory) {
    return <Navigate to="/motor-insurance/car" replace />;
  }

  return (
    <MotorHome
      onBackHome={onBackHome}
      selectedCategory={selectedCategory}
    />
  );
}

export default MotorInsuranceRoute;
