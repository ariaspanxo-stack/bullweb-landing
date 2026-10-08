import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/inter/900.css';
import './index.css';
import App from './App';
// #228 — FASE 3: medición ARMADA SIN ACTIVAR (placeholders PENDING en
// src/lib/measurement.ts; GATE de privacidad documentado en el ADN #228).
import MeasurementScripts from './components/MeasurementScripts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MeasurementScripts />
    <App />
  </StrictMode>
);
