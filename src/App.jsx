import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import NovaFicha from './pages/NovaFicha';
import VisualizarFicha from './pages/VisualizarFicha';
import Consultas from './pages/Consultas';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/Dashboard" replace />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/NovaFicha" element={<NovaFicha />} />
          <Route path="/VisualizarFicha" element={<VisualizarFicha />} />
          <Route path="/Consultas" element={<Consultas />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;