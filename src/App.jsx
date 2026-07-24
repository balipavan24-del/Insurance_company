import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { useAppScrollEffects } from './hooks/useAppScrollEffects';
import AppRoutes from './routes/AppRoutes';
import { shouldShowNavbar } from './utils/navigation/showNavbar';

function App() {
  const location = useLocation();
  const appContentRef = useRef(null);

  useAppScrollEffects(location, appContentRef);

  return (
    <div className="main-wrapper">
      <Toaster position="bottom-center" offset="24px" richColors closeButton />
      {shouldShowNavbar(location.pathname) && <Navbar />}

      <div ref={appContentRef} className="app-content-offset">
        <AppRoutes key={location.pathname} />
      </div>
    </div>
  );
}

export default App;
