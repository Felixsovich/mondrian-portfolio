import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Импортируем наши страницы
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PortfolioPage from './pages/PortfolioPage';
import NotFoundPage from './pages/NotFoundPage'; // ← ДОБАВЬ ЭТУ СТРОЧКУ

// Компонент навигации
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Навигация будет на всех страницах */}
        <Navigation />

        {/* Определяем маршруты */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;