import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './components/index.css' // Added /components/
import App from './components/App.jsx' // Added /components/

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
