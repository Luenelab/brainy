import React from 'react';
import ReactDOM from 'react-dom'; // Correct import for ReactDOM
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root')); // Use ReactDOM.createRoot() for React 18+
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
