import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { worker } from '../mocks/browser';
import App from './App';
import ModeContextProvider from './contexts/appContext';

if (import.meta.env.MODE === 'development') {
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <ModeContextProvider>
      <App />
    </ModeContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
