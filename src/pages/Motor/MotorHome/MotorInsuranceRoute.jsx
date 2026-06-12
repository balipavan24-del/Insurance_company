import { Navigate, useParams } from 'react-router-dom';
import MotorHome from './MotorInsurance';
import { getMotorCategoryFromSlug, MOTOR_HOME_ROUTE } from './motorRoutes';

function MotorInsuranceRoute({ onBackHome }) {
  const { category } = useParams();
  const selectedCategory = getMotorCategoryFromSlug(category);

  if (!selectedCategory) {
    return <Navigate to={MOTOR_HOME_ROUTE} replace />;
  }

  return (
    <MotorHome
      onBackHome={onBackHome}
      selectedCategory={selectedCategory}
    />
  );
}

export default MotorInsuranceRoute;
