import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import Login from '../pages/Login';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import PatientDashboard from './components/pages/PatientDashboard';
import InsurerDashboard from './components/pages/InsurerDashboard';
import NotFound from './components/pages/NotFound';
import ClaimForm from './components/claims/ClaimForm';
import ClaimsList from './components/claims/ClaimsList';
import ClaimDetails from './components/claims/ClaimDetails';
import Home from './components/pages/Home';

const App = () => {
  return (
    <Routes>

      <Route path="/" element={<Home />} /> {/* Default Page */}
      <Route path="login" element={<Login/>} /> {/* Default Page */}
      <Route path="register" element={<Register />} />
      <Route path="patient-dashboard" element={<PatientDashboard />} />
      <Route path="insurer-dashboard" element={<InsurerDashboard />} />
      <Route path="submit-claim" element={<ClaimForm />} />
      <Route path="view-claims" element={<ClaimsList />} />
      <Route path="claim/:id" element={<ClaimDetails />} />
      <Route path="*" element={<NotFound />} /> {/* Catch-all 404 Page */}
    </Routes>
  );
};

export default App;
