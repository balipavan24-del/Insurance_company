import { useNavigate } from 'react-router-dom';
import { navigateMenuOption } from '../../utils/navigation/menuNavigation';
import Navbar from './Navbar';

function AppNavbar() {
  const navigate = useNavigate();

  return (
    <Navbar
      onLoginClick={() => navigate('/login')}
      onMenuOptionSelect={(optionId) => navigateMenuOption(navigate, optionId)}
      onBrandClick={() => navigate('/')}
    />
  );
}

export default AppNavbar;
