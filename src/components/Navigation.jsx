import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Определяем мобильное устройство
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Закрыть меню при изменении маршрута
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navItems = [
    { path: '/', label: 'Главная' },
    { path: '/about', label: 'О нас' },
    { path: '/portfolio', label: 'Портфолио' },
    { path: '/contact', label: 'Контакты' }
  ];

  // Десктопная навигация - красивое окошко
  const DesktopNav = () => (
    <motion.nav
      style={{
        position: 'fixed',
        top: '120px',
        left: '20px',
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.7)',
        padding: '20px',
        borderRadius: '15px',
        backdropFilter: 'blur(10px)',
        border: '10px solid rgba(240, 229, 229, 0.1)'
      }}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'flex-start'
      }}>
        {navItems.map(item => (
          <motion.div
            key={item.path}
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Link
              to={item.path}
              style={{
                color: location.pathname === item.path ? '#F7D842' : 'white',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                display: 'block',
                padding: '8px 16px',
                borderRadius: '8px',
                background: location.pathname === item.path ? 'rgba(247, 216, 66, 0.1)' : 'transparent',
                border: location.pathname === item.path ? '1px solid rgba(247, 216, 66, 0.3)' : '1px solid transparent',
                transition: 'all 0.3s ease'
              }}
            >
              {item.label}
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.nav>
  );

  // Мобильная навигация
  const MobileNav = () => (
    <>
      {/* Бургер кнопка */}
      <motion.button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={{
          position: 'fixed',
          top: '120px',
          left: '20px',
          zIndex: 1001,
          background: 'rgba(0, 0, 0, 0.7)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          color: 'white',
          width: '50px',
          height: '50px',
          borderRadius: '12px',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          backdropFilter: 'blur(10px)'
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          style={{
            width: '20px',
            height: '2px',
            background: 'white',
            borderRadius: '1px'
          }}
          animate={{
            rotate: isMenuOpen ? 45 : 0,
            y: isMenuOpen ? 6 : 0
          }}
        />
        <motion.span
          style={{
            width: '20px',
            height: '2px',
            background: 'white',
            borderRadius: '1px',
            opacity: isMenuOpen ? 0 : 1
          }}
        />
        <motion.span
          style={{
            width: '20px',
            height: '2px',
            background: 'white',
            borderRadius: '1px'
          }}
          animate={{
            rotate: isMenuOpen ? -45 : 0,
            y: isMenuOpen ? -6 : 0
          }}
        />
      </motion.button>

      {/* Мобильное меню */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0, 0, 0, 0.95)',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                style={{ marginBottom: '25px' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    color: location.pathname === item.path ? '#F7D842' : 'white',
                    textDecoration: 'none',
                    fontSize: '28px',
                    fontWeight: '600',
                    display: 'block',
                    padding: '15px 30px',
                    textAlign: 'center',
                    background: location.pathname === item.path ? 'rgba(247, 216, 66, 0.1)' : 'transparent',
                    borderRadius: '12px',
                    border: location.pathname === item.path ? '2px solid rgba(247, 216, 66, 0.3)' : '2px solid transparent'
                  }}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return isMobile ? <MobileNav /> : <DesktopNav />;
};

export default Navigation;