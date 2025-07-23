// client/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'; // We will update this file next

// Import your components
import HomePage from './components/HomePage';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        



        <nav className="navbar">
          <Link to="/" className="nav-brand">InsightHub</Link>
          <div className="nav-links">
            <Link to="/">Home</Link>
            {/* THIS IS THE FIX! Change "/admin" to "/login" */}
            <Link to="/login">Admin</Link>
          </div>
        </nav>



        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} /> 
            {/* For now, /admin is public. We'd protect it later. */}
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;