import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { compositions } from '../data/compositions';
import AudioControl from './mondrian/AudioControl';
import CompositionGrid from './mondrian/CompositionGrid';
import MediaModal from './mondrian/MediaModal';
import "../App.css";

const MondrianScroll = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [expandedImage, setExpandedImage] = useState(null);
  const [expandedVideo, setExpandedVideo] = useState(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Обработчик скролла
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;

      const container = scrollContainerRef.current;
      const scrollPosition = container.scrollTop;
      const sectionHeight = container.clientHeight;

      const exactIndex = scrollPosition / sectionHeight;
      const newIndex = Math.min(Math.floor(exactIndex), compositions.length - 1);
      const progress = exactIndex - newIndex;

      setActiveIndex(newIndex);
      setScrollProgress(progress);
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Функция для интерполяции между двумя композициями
  const interpolateBlocks = (fromBlocks, toBlocks, progress) => {
    const maxBlocks = Math.max(fromBlocks.length, toBlocks.length);
    const result = [];

    for (let i = 0; i < maxBlocks; i++) {
      const fromBlock = fromBlocks[i] || fromBlocks[fromBlocks.length - 1];
      const toBlock = toBlocks[i] || toBlocks[toBlocks.length - 1];

      if (!fromBlock || !toBlock) continue;

      result.push({
        id: `${fromBlock.id}-${toBlock.id}`,
        row: fromBlock.row + (toBlock.row - fromBlock.row) * progress,
        col: fromBlock.col + (toBlock.col - fromBlock.col) * progress,
        rowSpan: fromBlock.rowSpan + (toBlock.rowSpan - fromBlock.rowSpan) * progress,
        colSpan: fromBlock.colSpan + (toBlock.colSpan - fromBlock.colSpan) * progress,
        color: toBlock.color,
        opacity: 1,
        content: fromBlock.content,
        image: fromBlock.image,
        video: fromBlock.video,
        contentStyle: fromBlock.contentStyle
      });
    }

    return result;
  };

  // Получаем текущие блоки с интерполяцией
  const getCurrentBlocks = () => {
    if (activeIndex >= compositions.length - 1) {
      return compositions[compositions.length - 1].blocks;
    }

    const currentComp = compositions[activeIndex];
    const nextComp = compositions[activeIndex + 1];
    return interpolateBlocks(currentComp.blocks, nextComp.blocks, scrollProgress);
  };

  const currentBlocks = getCurrentBlocks();
  const currentName = compositions[activeIndex].name;

  // Названия секций для отображения
  const sectionTitles = [
    'Me',
    'Digital Art',
    'Photography',
    'Video',
    'Motion Design',
    'Graphic design',
    'Creative Coding'
  ];

  return (
    <div
      className="mondrian-scroll-container"
      style={{
        overscrollBehavior: 'none',
      }}
    >
      {/* Кнопка управления звуком */}
      <AudioControl
        isAudioEnabled={isAudioEnabled}
        setIsAudioEnabled={setIsAudioEnabled}
        activeIndex={activeIndex}
        scrollProgress={scrollProgress}
      />

      {/* Контейнер для скролла */}
      <div
        ref={scrollContainerRef}
        style={{
          width: '100%',
          height: '100vh',
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          scrollBehavior: 'smooth',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          overscrollBehavior: 'contain',
          WebkitOverflowScrolling: 'touch',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        <style>
          {`
      .mondrian-scroll-container div::-webkit-scrollbar {
        display: none;
      }
    `}
        </style>
        {compositions.map((comp, index) => (
          <div
            key={index}
            className="scroll-section"
            style={{
              width: '100%',
              height: '100vh',
              minHeight: '100vh',
              maxHeight: '100vh',
              scrollSnapAlign: 'start',
              scrollSnapStop: 'always'
            }}
          />
        ))}
      </div>

      {/* Фиксированный контейнер для морфинга */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 2
      }}>
        {/* Заголовок секции */}
        <motion.div
          style={{
            position: 'absolute',
            top: '32px',
            left: '32px',
            zIndex: 10,
            pointerEvents: 'auto'
          }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            style={{
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '8px'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {sectionTitles[activeIndex]}
          </motion.h2>
          <motion.p
            style={{
              color: '#d1d5db',
              fontSize: '14px',
              maxWidth: '400px'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {currentName}
          </motion.p>
        </motion.div>

        {/* Главная сетка композиции */}
        <div style={{
          width: '90vmin',
          height: '90vmin',
          position: 'relative'
        }}>
          <CompositionGrid
            blocks={currentBlocks}
            onImageClick={setExpandedImage}
            onVideoClick={setExpandedVideo}
          />
        </div>

        {/* Точки навигации */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '32px',
            right: '32px',
            display: 'flex',
            gap: '8px',
            pointerEvents: 'auto'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {compositions.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => {
                setActiveIndex(i);
                if (scrollContainerRef.current) {
                  const sectionHeight = scrollContainerRef.current.clientHeight;
                  scrollContainerRef.current.scrollTo({
                    top: i * sectionHeight,
                    behavior: 'smooth'
                  });
                }
              }}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: i === activeIndex ? '#D40920' : '#ffffff',
                opacity: i === activeIndex ? 1 : 0.3,
                border: 'none',
                cursor: 'pointer',
                padding: 0
              }}
              whileHover={{ scale: 1.4, opacity: 1 }}
              whileTap={{ scale: 0.9 }}
              animate={{ scale: i === activeIndex ? 1.2 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            />
          ))}
        </motion.div>
      </div>

      {/* Индикатор скролла внизу */}
      <motion.div
        style={{
          position: 'fixed',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'white',
          fontSize: '14px',
          backgroundColor: 'rgba(0,0,0,0.5)',
          padding: '8px 16px',
          borderRadius: '9999px',
          zIndex: 30,
          backdropFilter: 'blur(10px)',
          pointerEvents: 'none'
        }}
        whileHover={{ backgroundColor: 'rgba(212, 9, 32, 0.7)' }}
        transition={{ duration: 0.3 }}
      >
        Scroll to explore • {activeIndex + 1} / {compositions.length}
      </motion.div>

      {/* Модальные окна для медиа */}
      <MediaModal
        expandedImage={expandedImage}
        expandedVideo={expandedVideo}
        onClose={() => {
          setExpandedImage(null);
          setExpandedVideo(null);
        }}
      />
    </div>
  );
};

export default MondrianScroll;