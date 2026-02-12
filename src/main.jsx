import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { CheckoutProvider } from './context/CheckoutContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CheckoutProvider>
        <App />
      </CheckoutProvider>
    </BrowserRouter>
  </StrictMode>,
);
