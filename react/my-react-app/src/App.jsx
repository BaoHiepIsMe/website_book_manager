import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Features from './pages/Features';
import Dashboard from './pages/Dashboard';
import Documents from './pages/Documents';
import ESignature from './pages/ESignature';
import Audit from './pages/Audit';
import Storage from './pages/Storage';
import Settings from './pages/Settings';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/features" element={<Layout><Features /></Layout>} />
        
        {/* Dashboard routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/esignature" element={<ESignature />} />
        <Route path="/audit" element={<Audit />} />
        <Route path="/storage" element={<Storage />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default App;