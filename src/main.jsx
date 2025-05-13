import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { DataProvider } from './pages/DataContext'; // <- Make sure this path is correct
import { HelmetProvider } from 'react-helmet-async';
const helmetContext={};
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider context={helmetContext}>
    <DataProvider>
      <App />
    </DataProvider>

    </HelmetProvider>
  </StrictMode>
);
