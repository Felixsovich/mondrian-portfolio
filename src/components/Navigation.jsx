import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Определяем мобильное устройство
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Прячем навигацию при скролле вниз
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Закрыть меню при изменении маршрута
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navItems = [
    { path: '/', label: 'Home', color: '#D40920' },
    { path: '/about', label: 'About', color: '#FFFFFF' },
    { path: '/portfolio', label: 'Portfolio', color: '#1356A2' },
    { path: '/contact', label: 'Contact', color: '#F7D842' }
  ];

  // Десктопная навигация в стиле Google
  const DesktopNav = () => (
    <motion.nav
      style={{
        position: 'fixed',
        top: '32px',
        right: '32px',
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.7)',
        padding: '16px 24px',
        borderRadius: '16px',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        overflow: 'hidden' // Для анимации границы
      }}
      initial={{ opacity: 0, y: -50 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : -50
      }}
      transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
    >
      {/* Анимированная граница в стиле Google */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '200%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, #D40920 20%, #FFFFFF 40%, #1356A2 60%, #F7D842 80%, transparent 100%)',
          transform: 'rotate(0deg)'
        }}
        animate={{
          x: ['-100%', '0%']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div style={{
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        {navItems.map(item => {
          const isActive = location.pathname === item.path;

          return (
            <div key={item.path} style={{ position: 'relative' }}>
              {/* Анимированный фон для активного элемента */}
              {isActive && (
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: '-4px',
                    background: `linear-gradient(90deg, ${item.color}40, ${item.color}20, ${item.color}40)`,
                    borderRadius: '10px',
                    zIndex: 0
                  }}
                  animate={{
                    background: [
                      `linear-gradient(90deg, ${item.color}40, ${item.color}20, ${item.color}40)`,
                      `linear-gradient(90deg, ${item.color}20, ${item.color}40, ${item.color}20)`,
                      `linear-gradient(90deg, ${item.color}40, ${item.color}20, ${item.color}40)`
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              )}

              {/* Светящийся эффект для активного элемента */}
              {isActive && (
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: '-2px',
                    background: `radial-gradient(circle at center, ${item.color}30, transparent 70%)`,
                    borderRadius: '10px',
                    zIndex: 0,
                    filter: 'blur(8px)'
                  }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}

              <motion.div
                whileHover={{
                  scale: 1.05,
                  y: -1
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  to={item.path}
                  style={{
                    color: isActive ? item.color : 'rgba(255, 255, 255, 0.9)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: isActive ? '500' : '400',
                    display: 'block',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    background: isActive ?
                      `rgba(${item.color === '#FFFFFF' ? '255, 255, 255' : parseInt(item.color.slice(1, 3), 16) + ', ' + parseInt(item.color.slice(3, 5), 16) + ', ' + parseInt(item.color.slice(5, 7), 16)}, 0.1)` :
                      'transparent',
                    border: isActive ?
                      `1px solid ${item.color}40` :
                      '1px solid transparent',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    letterSpacing: '0.3px',
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                    position: 'relative',
                    zIndex: 1,
                    backdropFilter: isActive ? 'blur(4px)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.target.style.color = item.color;
                      e.target.style.background = `rgba(${item.color === '#FFFFFF' ? '255, 255, 255' : parseInt(item.color.slice(1, 3), 16) + ', ' + parseInt(item.color.slice(3, 5), 16) + ', ' + parseInt(item.color.slice(5, 7), 16)}, 0.05)`;
                      e.target.style.border = `1px solid ${item.color}30`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                      e.target.style.background = 'transparent';
                      e.target.style.border = '1px solid transparent';
                    }
                  }}
                >
                  {item.label}

                  {/* Подчеркивание для активного элемента */}
                  {isActive && (
                    <motion.div
                      style={{
                        position: 'absolute',
                        bottom: '-2px',
                        left: '20%',
                        right: '20%',
                        height: '2px',
                        background: item.color,
                        borderRadius: '1px'
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Анимированная граница снизу */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '200%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, #F7D842 20%, #1356A2 40%, #FFFFFF 60%, #D40920 80%, transparent 100%)'
        }}
        animate={{
          x: ['0%', '-100%']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.nav>
  );

  // Мобильная навигация в стиле Google
  const MobileNav = () => (
    <>
      {/* Бургер кнопка в стиле Material Design */}
      <motion.button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 1001,
          background: 'rgba(0, 0, 0, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          color: 'white',
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          padding: '14px',
          overflow: 'hidden'
        }}
        whileHover={{
          scale: 1.05,
          background: 'rgba(0, 0, 0, 0.8)'
        }}
        whileTap={{ scale: 0.95 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : -20
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Анимированный градиент на кнопке */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '200%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent 0%, #D40920 25%, #FFFFFF 50%, #1356A2 75%, transparent 100%)',
            opacity: 0.3
          }}
          animate={{
            x: ['-100%', '0%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <motion.div
          style={{
            width: '24px',
            height: '2px',
            background: 'white',
            borderRadius: '1px'
          }}
          animate={{
            rotate: isMenuOpen ? 45 : 0,
            y: isMenuOpen ? 7 : 0,
            background: isMenuOpen ? '#D40920' : 'white'
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          style={{
            width: '24px',
            height: '2px',
            background: 'white',
            borderRadius: '1px',
            opacity: isMenuOpen ? 0 : 1
          }}
          animate={{
            opacity: isMenuOpen ? 0 : 1
          }}
        />
        <motion.div
          style={{
            width: '24px',
            height: '2px',
            background: 'white',
            borderRadius: '1px'
          }}
          animate={{
            rotate: isMenuOpen ? -45 : 0,
            y: isMenuOpen ? -7 : 0,
            background: isMenuOpen ? '#F7D842' : 'white'
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* Мобильное меню в стиле Google */}
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
              backdropFilter: 'blur(30px)',
              padding: '20px'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Анимированный градиентный фон */}
            <motion.div
              style={{
                position: 'absolute',
                width: '200%',
                height: '200%',
                background: 'linear-gradient(45deg, rgba(212, 9, 32, 0.1) 0%, rgba(255, 255, 255, 0.05) 25%, rgba(19, 86, 162, 0.1) 50%, rgba(247, 216, 66, 0.05) 75%, rgba(212, 9, 32, 0.1) 100%)',
                opacity: 0.5
              }}
              animate={{
                x: ['0%', '-50%'],
                y: ['0%', '-50%']
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Навигационные элементы */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              alignItems: 'center',
              width: '100%',
              maxWidth: '300px'
            }}>
              {navItems.map((item, index) => {
                const isActive = location.pathname === item.path;

                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 20
                    }}
                    style={{ width: '100%' }}
                  >
                    {/* Анимированный фон для активного элемента */}
                    {isActive && (
                      <motion.div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: `linear-gradient(90deg, ${item.color}20, ${item.color}10, ${item.color}20)`,
                          borderRadius: '12px',
                          zIndex: 0
                        }}
                        animate={{
                          backgroundPosition: ['0%', '200%']
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    )}

                    <Link
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      style={{
                        color: isActive ? item.color : 'rgba(255, 255, 255, 0.9)',
                        textDecoration: 'none',
                        fontSize: '24px',
                        fontWeight: isActive ? '500' : '400',
                        display: 'block',
                        padding: '20px 30px',
                        textAlign: 'center',
                        background: isActive ?
                          `rgba(${item.color === '#FFFFFF' ? '255, 255, 255' : parseInt(item.color.slice(1, 3), 16) + ', ' + parseInt(item.color.slice(3, 5), 16) + ', ' + parseInt(item.color.slice(5, 7), 16)}, 0.1)` :
                          'rgba(255, 255, 255, 0.05)',
                        borderRadius: '12px',
                        border: isActive ?
                          `1px solid ${item.color}40` :
                          '1px solid rgba(255, 255, 255, 0.1)',
                        transition: 'all 0.2s ease',
                        fontFamily: '"Inter", sans-serif',
                        letterSpacing: '0.5px',
                        backdropFilter: 'blur(10px)',
                        width: '100%',
                        position: 'relative',
                        zIndex: 1
                      }}
                    >
                      {item.label}

                      {/* Индикатор активной страницы */}
                      {isActive && (
                        <motion.div
                          style={{
                            position: 'absolute',
                            right: '20px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '8px',
                            height: '8px',
                            background: item.color,
                            borderRadius: '50%',
                            boxShadow: `0 0 12px ${item.color}`
                          }}
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Кнопка закрытия в стиле Material */}
              <motion.button
                onClick={() => setIsMenuOpen(false)}
                style={{
                  marginTop: '40px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'rgba(255, 255, 255, 0.9)',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  fontFamily: '"Inter", sans-serif',
                  letterSpacing: '0.5px',
                  width: '100%',
                  maxWidth: '200px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                whileHover={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  scale: 1.02
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span style={{ position: 'relative', zIndex: 1 }}>Close</span>

                {/* Эффект ripple при наведении */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '0px',
                    height: '0px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                  whileHover={{
                    width: '200px',
                    height: '200px',
                    transition: { duration: 0.6 }
                  }}
                />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return isMobile ? <MobileNav /> : <DesktopNav />;
};

export default Navigation;