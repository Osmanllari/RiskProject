import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import CreateAccount from './CreateAccount';
import CreateAProject from './CreateAProject';
import Dashboard from './Dashboard';
import HomePage from './HomePage';
import RiskIdentification from './Dashboard';
import ProjectDefinition from './ProjectDefinition';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/create-a-project" element={<CreateAProject />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Dodajte dinamički segment :username */}
        <Route path="/homepage/:username" element={<HomePage />} />
        <Route path="/risk-identification" element={<RiskIdentification />} />
        <Route path="/project-definition" element={<ProjectDefinition />} />
        {/* Ostale rute */}
      </Routes>
    </Router>
  );
}

export default App;
