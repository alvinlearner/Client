import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Client from './pages/motor/Clients';
import Motor from './pages/motor/Motor';
import EditTransaction from './pages/motor//TransactionEdit';
import Login from './pages/Login';
import NavBar from './components/Navbar';
import Companies from './pages/motor/Companies';
import Dashboard from './pages/Dashboard';
import { useAuth } from './AuthContext';

import MedicalTable from './pages/medical/medical';

import EditCompany from './pages/motor/EditCompanies'
import EditClient from './pages/motor/ClientEdit';

const App = () => {
  const { admin } = useAuth();

  return (
    <>
      <NavBar />
      <Routes>
        {/* Redirect to Dashboard if authenticated */}
        {admin && <Route path="/" element={<Navigate to="/dashboard" />} />}

        {/* Authenticated routes */}
        {admin && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/motor" element={<Motor />} />
            <Route path="/client" element={<Client />} />
            <Route path="/client/:id/" element={<EditClient />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/transaction/:id/" element={<EditTransaction />} />
            <Route path="/companies/:id" element={<EditCompany />} />

            <Route path="/medical" element={<MedicalTable />} />
          </>
        )}

        {/* Unauthenticated route */}
        {!admin && <Route path="/*" element={<Login />} />}
      </Routes>
    </>
  );
};

export default App;
