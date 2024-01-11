import React from "react";
import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import Client from "./pages/Clients";
import Motor from "./pages/Motor";
import EditClient from "./pages/ClientEdit";
import EditTransaction from "./pages/TransactionEdit";

function App() {
  return (
    <>
      <nav>
        <ul style={{ display: "flex", gap: "5%", listStyle: "none" }}>
          <li><Link to="/">Motor</Link></li>
          <li><Link to="/client">Client</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Motor />} />
        <Route path="/client" element={<Client />} />
        <Route path="/client/:id/" element={<EditClient />} /> 
        <Route path="/transaction/:id/" element={<EditTransaction />} /> 

      </Routes>
    </>
  );
}

export default App;
