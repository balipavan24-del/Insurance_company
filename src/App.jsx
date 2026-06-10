import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import AppNavbar from './components/Navbar/AppNavbar';
import { useAppScrollEffects } from './hooks/useAppScrollEffects';
import AppRoutes from './routes/AppRoutes';
import { shouldShowNavbar } from './utils/navigation/showNavbar';

function App() {
  const location = useLocation();
  const appContentRef = useRef(null);

  useAppScrollEffects(location, appContentRef);

  return (
    <div className="main-wrapper">
      {shouldShowNavbar(location.pathname) && <AppNavbar />}

      <div ref={appContentRef} className="app-content-offset">
        <AppRoutes key={location.pathname} />
      </div>
    </div>
  );
}

export default App;
