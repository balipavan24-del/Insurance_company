import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './components/index.css';
import { ErrorBoundary } from './components/ErrorBoundary.jsx';
import App from './components/App.jsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('InsureEase: missing #root element in index.html');
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
