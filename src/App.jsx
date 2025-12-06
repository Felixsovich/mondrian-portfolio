import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PortfolioPage from './pages/PortfolioPage';
import NotFoundPage from './pages/NotFoundPage';

// Components
import Navigation from './components/Navigation';
import BackgroundAnimation from './components/BackgroundAnimation';
import ReededGlassOverlay from './components/ReededGlassOverlay';

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className={`App ${isHomePage ? 'home-page' : ''}`}>
      {/* LAYER 1 & 2: Shapes & Riso Gradient */}
      <BackgroundAnimation />

      {/* LAYER 3: Reeded Glass Effect - только на главной */}
      <ReededGlassOverlay />

      {/* LAYER 4: Navigation & Content */}
      <Navigation />

      <div className="content-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;