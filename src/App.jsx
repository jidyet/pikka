// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Welcome from './pages/Welcome';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import ForgotPassword from './ForgotPassword';
import VerifyAccount from './VerifyAccount';
import NotFound from './NotFound';
import Account from './pages/Account';
import PlanSelector from './pages/PlanSelector';
import PlanConfirm from './pages/PlanConfirm';
import FakeCheckout from './pages/FakeCheckout';
import Usage from './pages/Usage';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import LinkedAccounts from './components/LinkedAccounts';
import Upgrade from './components/Upgrade'; // ✅ (corrected here)


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-account" element={<VerifyAccount />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
        <Route path="/linked" element={<ProtectedRoute><LinkedAccounts /></ProtectedRoute>} /> {/* ✅ corrected */}
        <Route path="/usage" element={<ProtectedRoute><Usage /></ProtectedRoute>} />
        <Route path="/upgrade" element={<ProtectedRoute><Upgrade /></ProtectedRoute>} />
        <Route path="/select-plan" element={<ProtectedRoute><PlanSelector /></ProtectedRoute>} />
        <Route path="/confirm-plan" element={<ProtectedRoute><PlanConfirm /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><FakeCheckout /></ProtectedRoute>} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
