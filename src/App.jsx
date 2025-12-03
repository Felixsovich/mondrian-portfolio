import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="App">
        {/* LAYER 1 & 2: Shapes & Riso Gradient (Handled inside component) */}
        {/* z-index: -2 and -1 effectively */}
        <BackgroundAnimation />

        {/* LAYER 3: Reeded Glass Effect */}
        {/* z-index: 1 (Overlay) */}
        <ReededGlassOverlay />

        {/* LAYER 4: Navigation & Content */}
        {/* z-index: 10+ */}
        <Navigation />

        <div className="content-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
            {/* УДАЛИТЬ ЭТУ СТРОКУ: <Route path="/contact" element={<ContactPage />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;