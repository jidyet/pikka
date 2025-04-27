// src/main.jsx
import './index.css'; // 👈 Tailwind CSS
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext'; // 👈 Your Auth Context
import { LanguageProvider } from './contexts/LanguageProvider'; // 👈 Your Language Context

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* ✅ Auth first */}
      <LanguageProvider> {/* ✅ Language inside */}
        <App />
      </LanguageProvider>
    </AuthProvider>
  </React.StrictMode>
);
