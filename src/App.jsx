import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Client from './pages/Clients';
import Motor from './pages/Motor';
import EditClient from './pages/ClientEdit';
import EditTransaction from './pages/TransactionEdit';
import Login from './pages/Login';
import NavBar from './components/Navbar';
import Companies from './pages/Companies';
import Dashboard from './pages/Dashboard';
import { useAuth } from './AuthContext';
import EditCompany from './pages/EditCompanies';

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
          </>
        )}

        {/* Unauthenticated route */}
        {!admin && <Route path="/*" element={<Login />} />}
      </Routes>
    </>
  );
};

export default App;
