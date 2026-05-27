import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary.jsx';
import App from './App.jsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('InsureEase: missing #root element in index.html');
}

const baseUrl = import.meta.env.BASE_URL || '/';
const routerBasename = baseUrl.length > 1 ? baseUrl.replace(/\/$/, '') : baseUrl;

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter basename={routerBasename}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
);
