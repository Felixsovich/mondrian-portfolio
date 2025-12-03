import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

// --- Constants ---
const MIN_BASE_SIZE = 17;
const MAX_SIZE_RANDOM = 60;
const SHAPE_TYPES = ['rect', 'circle', 'rounded', 'pill'];
const MOVEMENT_TYPES = 8; // Увеличили с 4 до 8 направлений

// --- Helper Functions ---
const randomRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateRisoFill = () => {
  const r = randomRange(233, 244);
  const g = randomRange(50, 255);
  const b = randomRange(50, 256);
  return `rgba(${r}, ${g}, ${b}, 0.6)`;
};

const generateMondrianColor = () => {
  const colors = [
    'rgba(212, 9, 32, 0.4)',
    'rgba(19, 86, 162, 0.4)',
    'rgba(247, 216, 66, 0.4)',
    'rgba(255, 255, 255, 0.2)',
    'rgba(0, 0, 0, 0.3)',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const generateRandomRects = (count) => {
  return Array.from({ length: count }, (_, i) => {
    const isSquare = Math.random() < 0.2;
    const baseSize = MIN_BASE_SIZE + Math.random() * MAX_SIZE_RANDOM;
    let width = baseSize;
    let height = isSquare ? baseSize : MIN_BASE_SIZE + Math.random() * MAX_SIZE_RANDOM;
    const shapeType = SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)];

    if (shapeType === 'circle') {
      width = height = MIN_BASE_SIZE + Math.random() * MAX_SIZE_RANDOM;
    } else if (shapeType === 'pill') {
      if (width < height) [width, height] = [height, width];
      width = Math.max(width, height * (1.5 + Math.random() * 1.5));
    }

    return {
      id: i,
      width,
      height,
      color: generateMondrianColor(),
      movementType: Math.floor(Math.random() * MOVEMENT_TYPES),
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 40,
      shapeType: shapeType,
    };
  });
};

const getShapeStyle = (shapeType, width, height) => {
  switch (shapeType) {
    case 'circle': return { borderRadius: '50%' };
    case 'rounded': return { borderRadius: '8px' };
    case 'pill': return { borderRadius: `${Math.min(width, height) / 2}px` };
    default: return { borderRadius: '1px' };
  }
};

// Улучшенная функция движения - 8 направлений
const getMovementPath = (movementType, dimensions) => {
  const off = 150;
  const startX = Math.random() * dimensions.width;
  const startY = Math.random() * dimensions.height;

  // 8 направлений движения для лучшего покрытия экрана
  switch (movementType) {
    case 0: // Слева направо (горизонтально)
      return {
        initial: { x: -off, y: startY, opacity: 0 },
        animate: { x: dimensions.width + off, y: startY + (Math.random() * 100 - 50), opacity: [0, 0.8, 0] }
      };
    case 1: // Справа налево (горизонтально)
      return {
        initial: { x: dimensions.width + off, y: startY, opacity: 0 },
        animate: { x: -off, y: startY + (Math.random() * 100 - 50), opacity: [0, 0.8, 0] }
      };
    case 2: // Снизу вверх (вертикально)
      return {
        initial: { x: startX, y: dimensions.height + off, opacity: 0 },
        animate: { x: startX + (Math.random() * 100 - 50), y: -off, opacity: [0, 0.8, 0] }
      };
    case 3: // Сверху вниз (вертикально)
      return {
        initial: { x: startX, y: -off, opacity: 0 },
        animate: { x: startX + (Math.random() * 100 - 50), y: dimensions.height + off, opacity: [0, 0.8, 0] }
      };
    case 4: // Диагональ: левый верх → правый низ
      return {
        initial: { x: -off, y: -off, opacity: 0 },
        animate: { x: dimensions.width + off, y: dimensions.height + off, opacity: [0, 0.8, 0] }
      };
    case 5: // Диагональ: правый верх → левый низ
      return {
        initial: { x: dimensions.width + off, y: -off, opacity: 0 },
        animate: { x: -off, y: dimensions.height + off, opacity: [0, 0.8, 0] }
      };
    case 6: // Диагональ: левый низ → правый верх
      return {
        initial: { x: -off, y: dimensions.height + off, opacity: 0 },
        animate: { x: dimensions.width + off, y: -off, opacity: [0, 0.8, 0] }
      };
    case 7: // Диагональ: правый низ → левый верх
      return {
        initial: { x: dimensions.width + off, y: dimensions.height + off, opacity: 0 },
        animate: { x: -off, y: -off, opacity: [0, 0.8, 0] }
      };
    default:
      return {
        initial: { x: -off, y: -off, opacity: 0 },
        animate: { x: dimensions.width + off, y: dimensions.height + off, opacity: [0, 0.8, 0] }
      };
  }
};

const BackgroundAnimation = () => {
  const [backgroundRects, setBackgroundRects] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [risoColor, setRisoColor] = useState(generateRisoFill());

  // Инициализация и ресайз
  useEffect(() => {
    const updateDimensionsAndRects = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (backgroundRects.length === 0 || dimensions.width !== width) {
        setBackgroundRects(generateRandomRects(35));
      }
      setDimensions({ width, height });
    };

    updateDimensionsAndRects();
    window.addEventListener('resize', updateDimensionsAndRects);
    return () => window.removeEventListener('resize', updateDimensionsAndRects);
  }, [backgroundRects.length, dimensions.width]);

  // Изменение цвета градиента
  useEffect(() => {
    const intervalId = setInterval(() => {
      setRisoColor(generateRisoFill());
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  // Мемоизация рендера фигур для оптимизации
  const renderedShapes = useMemo(() => {
    if (dimensions.width === 0) return null;

    return backgroundRects.map(rect => {
      const { initial, animate } = getMovementPath(rect.movementType, dimensions);

      return (
        <motion.div
          key={rect.id}
          style={{
            position: 'absolute',
            width: rect.width,
            height: rect.height,
            backgroundColor: rect.color,
            ...getShapeStyle(rect.shapeType, rect.width, rect.height)
          }}
          initial={initial}
          animate={animate}
          transition={{
            duration: rect.duration,
            delay: rect.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      );
    });
  }, [backgroundRects, dimensions]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: -1,
      overflow: 'hidden',
      backgroundColor: '#1a1a1a',
    }}>
      {/* LAYER 1: Летающие фигуры */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
      }}>
        {renderedShapes}
      </div>

      {/* LAYER 2: Riso Gradient */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          mixBlendMode: 'screen',
          background: `radial-gradient(circle at 50% 50%, ${risoColor}, transparent 80%)`,
        }}
        animate={{
          background: `radial-gradient(circle at 50% 50%, ${risoColor}, transparent 80%)`
        }}
        transition={{ duration: 3, ease: "easeInOut" }}
      />

      {/* LAYER 3: Вращающийся градиент */}
      <motion.div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          zIndex: 2,
          opacity: 0.4,
          background: `conic-gradient(from 0deg at 50% 50%, transparent, ${risoColor}, transparent)`,
          filter: 'blur(80px)',
        }}
        animate={{
          rotate: 360,
          background: `conic-gradient(from 0deg at 50% 50%, transparent, ${risoColor}, transparent)`
        }}
        transition={{
          rotate: { duration: 60, repeat: Infinity, ease: "linear" },
          background: { duration: 3, ease: "easeInOut" }
        }}
      />
    </div>
  );
};

export default BackgroundAnimation;