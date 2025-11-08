import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Функция для генерации случайных цветов Мондриана
const generateRandomMondrianColor = () => {
  const colors = [
    'rgba(212, 9, 32, 0.15)',    // Красный
    'rgba(19, 86, 162, 0.15)',   // Синий  
    'rgba(247, 216, 66, 0.15)',  // Желтый
    'rgba(255, 255, 255, 0.08)', // Белый
    'rgba(212, 9, 32, 0.08)',    // Более прозрачный красный
    'rgba(19, 86, 162, 0.08)',   // Более прозрачный синий
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const BackgroundAnimation = () => {
  const [backgroundRects, setBackgroundRects] = useState([]);

  // Генерация фоновых прямоугольников
  useEffect(() => {
    const rects = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      width: 15 + Math.random() * 50,
      height: 15 + Math.random() * 50,
      color: generateRandomMondrianColor(),
      movementType: Math.floor(Math.random() * 8),
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 40,
      rotation: Math.random() * 360
    }));
    setBackgroundRects(rects);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 0,
    }}>
      {/* Анимированный градиентный фон */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle, rgba(212,9,32,0.1) 0%, transparent 70%)',
          backgroundSize: '400% 400%',
          zIndex: -1,
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {backgroundRects.map(rect => {
        let initial, animate;
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;

        switch (rect.movementType) {
          case 0: // Слева направо
            initial = { x: -rect.width, y: startY, opacity: 0, scale: 0.3, rotate: -20 };
            animate = { x: window.innerWidth + rect.width, y: startY + 100, opacity: [0, 0.7, 0], scale: [0.3, 0.8, 0.3], rotate: 20 };
            break;
          case 1: // Справа налево
            initial = { x: window.innerWidth + rect.width, y: startY, opacity: 0, scale: 0.3, rotate: 20 };
            animate = { x: -rect.width, y: startY - 80, opacity: [0, 0.7, 0], scale: [0.3, 0.8, 0.3], rotate: -20 };
            break;
          case 2: // Сверху вниз
            initial = { x: startX, y: -rect.height, opacity: 0, scale: 0.3, rotate: -15 };
            animate = { x: startX + 120, y: window.innerHeight + rect.height, opacity: [0, 0.7, 0], scale: [0.3, 0.8, 0.3], rotate: 15 };
            break;
          case 3: // Снизу вверх
            initial = { x: startX, y: window.innerHeight + rect.height, opacity: 0, scale: 0.3, rotate: 15 };
            animate = { x: startX - 90, y: -rect.height, opacity: [0, 0.7, 0], scale: [0.3, 0.8, 0.3], rotate: -15 };
            break;
          case 4: // Слева-сверху → справа-снизу
            initial = { x: -rect.width, y: -rect.height, opacity: 0, scale: 0.3, rotate: -30 };
            animate = { x: window.innerWidth + rect.width, y: window.innerHeight + rect.height, opacity: [0, 0.7, 0], scale: [0.3, 0.8, 0.3], rotate: 30 };
            break;
          case 5: // Справа-сверху → слева-снизу
            initial = { x: window.innerWidth + rect.width, y: -rect.height, opacity: 0, scale: 0.3, rotate: 30 };
            animate = { x: -rect.width, y: window.innerHeight + rect.height, opacity: [0, 0.7, 0], scale: [0.3, 0.8, 0.3], rotate: -30 };
            break;
          case 6: // Слева-снизу → справа-сверху
            initial = { x: -rect.width, y: window.innerHeight + rect.height, opacity: 0, scale: 0.3, rotate: -25 };
            animate = { x: window.innerWidth + rect.width, y: -rect.height, opacity: [0, 0.7, 0], scale: [0.3, 0.8, 0.3], rotate: 25 };
            break;
          case 7: // Справа-снизу → слева-сверху
            initial = { x: window.innerWidth + rect.width, y: window.innerHeight + rect.height, opacity: 0, scale: 0.3, rotate: 25 };
            animate = { x: -rect.width, y: -rect.height, opacity: [0, 0.7, 0], scale: [0.3, 0.8, 0.3], rotate: -25 };
            break;
          default:
            initial = { x: -rect.width, y: startY, opacity: 0, scale: 0.3 };
            animate = { x: window.innerWidth + rect.width, y: startY, opacity: [0, 0.7, 0], scale: [0.3, 0.8, 0.3] };
        }

        return (
          <motion.div
            key={rect.id}
            style={{
              position: 'absolute',
              width: `${rect.width}px`,
              height: `${rect.height}px`,
              backgroundColor: rect.color,
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '1px',
            }}
            initial={initial}
            animate={animate}
            transition={{
              duration: rect.duration,
              delay: rect.delay,
              repeat: Infinity,
              repeatDelay: Math.random() * 15,
              ease: "easeInOut"
            }}
          />
        );
      })}
    </div>
  );
};

export default BackgroundAnimation;