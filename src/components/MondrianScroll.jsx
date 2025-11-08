import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Tone from 'tone';
import "../App.css";
import BackgroundAnimation from './BackgroundAnimation';

const MondrianScroll = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [expandedImage, setExpandedImage] = useState(null);
  const [expandedVideo, setExpandedVideo] = useState(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const containerRef = useRef(null);

  // Refs для Tone.js
  const synthRef = useRef(null);
  const reverbRef = useRef(null);
  const filterRef = useRef(null);

  // Анимационные варианты
  const blockVariants = {
    initial: { scale: 0.9, opacity: 0.8 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 }
    },
    hover: { // ← ДОБАВЬ ЭТОТ ВАРИАНТ
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      transition: { duration: 0.2 }
    }
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  // Инициализация аудио
  useEffect(() => {
    // Создаем синтезатор с ambient-звуком
    synthRef.current = new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: "sine"
      },
      envelope: {
        attack: 2,
        decay: 1,
        sustain: 0.5,
        release: 4
      }
    }).toDestination();

    // Добавляем реверберацию для атмосферности
    reverbRef.current = new Tone.Reverb({
      decay: 8,
      wet: 0.6
    }).toDestination();

    // Добавляем фильтр для плавности
    filterRef.current = new Tone.Filter({
      frequency: 400,
      type: "lowpass",
      Q: 1
    }).toDestination();

    // Соединяем цепочку: synth → filter → reverb
    synthRef.current.connect(filterRef.current);
    filterRef.current.connect(reverbRef.current);

    // Начинаем с очень тихого звука
    synthRef.current.volume.value = -30;

    return () => {
      synthRef.current?.dispose();
      reverbRef.current?.dispose();
      filterRef.current?.dispose();
    };
  }, []);

  // Функция для запуска/остановки аудио
  const toggleAudio = async () => {
    if (!isAudioEnabled) {
      // Запускаем аудио контекст при первом клике (требование браузеров)
      await Tone.start();
      console.log('Audio context started');

      // Запускаем ноты для ambient-падава
      playAmbientChord();
    } else {
      // Плавно останавливаем все ноты
      synthRef.current.releaseAll();
    }
    setIsAudioEnabled(!isAudioEnabled);
  };

  // Функция для воспроизведения ambient-аккорда
  const playAmbientChord = () => {
    if (!synthRef.current) return;

    // Красивый ambient-аккорд (D minor 9)
    const chord = ["D3", "F3", "A3", "C4", "E4"];

    chord.forEach((note, index) => {
      // Запускаем каждую ноту с небольшой задержкой для атмосферности
      synthRef.current.triggerAttack(note, Tone.now() + index * 0.1);
    });
  };

  // Обновляем звук при скролле
  useEffect(() => {
    if (!isAudioEnabled || !synthRef.current) return;

    // Меняем частоту фильтра в зависимости от прогресса скролла
    const filterFreq = 200 + (scrollProgress * 800); // от 200 до 1000 Hz
    filterRef.current.frequency.rampTo(filterFreq, 0.1);

    // Меняем громкость в зависимости от активности
    const volume = -25 + (Math.abs(scrollProgress) * 5); // от -25 до -20 dB
    synthRef.current.volume.rampTo(volume, 0.2);

  }, [scrollProgress, isAudioEnabled]);

  // Обновляем звук при смене страницы
  useEffect(() => {
    if (!isAudioEnabled || !synthRef.current) return;

    // Плавно меняем аккорд при смене страницы
    const chords = [
      ["D3", "F3", "A3", "C4", "E4"], // D minor 9
      ["C3", "E3", "G3", "B3", "D4"], // C major 9
      ["E3", "G3", "B3", "D4", "F#4"], // E minor 9
      ["F3", "A3", "C4", "E4", "G4"], // F major 9
      ["G3", "B3", "D4", "F4", "A4"], // G dominant 9
      ["A3", "C4", "E4", "G4", "B4"], // A minor 9
      ["B3", "D4", "F#4", "A4", "C5"]  // B minor 9
    ];

    // Плавно отпускаем старые ноты и запускаем новые
    synthRef.current.releaseAll();

    setTimeout(() => {
      const chord = chords[activeIndex % chords.length];
      chord.forEach((note, index) => {
        synthRef.current.triggerAttack(note, Tone.now() + index * 0.15);
      });
    }, 200);

  }, [activeIndex, isAudioEnabled]);

  const compositions = [
    {
      name: "Mikhail Starun, Designer",
      blocks: [
        {
          id: 'a1',
          row: 1,
          col: 1,
          rowSpan: 2,
          colSpan: 1,
          color: '#ffffff',
          content: `Art does not reproduce the visible; it makes visible.`,
          contentStyle: {
            fontSize: 'clamp(56px, 2vmin, 68px)',
            fontWeight: '600',
            lineHeight: '1.2',
            fontStyle: 'italic'
          }
        },
        {
          id: 'a2',
          row: 1,
          col: 2,
          rowSpan: 1,
          colSpan: 2,
          color: '#D40920',
          content: `Mikhail Starun is a visual designer passionate about motion graphics, digital art, and modern web aesthetics. He focuses on creating clean, dynamic visuals for social media, websites, and multimedia projects. Inspired by minimalism, technology, and music, Mikhail strives to build designs that are both functional and emotionally engaging. Based in Saint Petersburg, he continues to explore motion design, UI/UX, and creative storytelling through digital media.`,
          contentStyle: {
            fontSize: 'clamp(12px, 1.8vmin, 16px)',
            fontWeight: '400',
            lineHeight: '1.6',
            textAlign: 'left'
          }
        },
        {
          id: 'a3',
          row: 2,
          col: 2,
          rowSpan: 1,
          colSpan: 1,
          color: '#1356A2',
          image: 'me_01.JPG'
        },
        {
          id: 'a4',
          row: 2,
          col: 3,
          rowSpan: 1,
          colSpan: 1,
          color: '#F7D842',
          content: `Minimalism • Motion • Design`,
          contentStyle: {
            fontSize: 'clamp(14px, 2vmin, 20px)',
            fontWeight: '500',
            lineHeight: '1.3',
            textAlign: 'center'
          }
        },
        {
          id: 'a5',
          row: 3,
          col: 1,
          rowSpan: 1,
          colSpan: 3,
          color: '#ffffff',
          video: 'Principal Aberration_02.mp4',
          content: `Explore my work ↓`,
          contentStyle: {
            fontSize: 'clamp(16px, 2.2vmin, 22px)',
            fontWeight: '400',
            lineHeight: '1.4',
            textAlign: 'center',
            opacity: 0.8
          }
        },
      ]
    },
    {
      name: "Composition with Large Red Plane",
      blocks: [
        { id: 'b1', row: 1, col: 1, rowSpan: 2, colSpan: 2, color: '#D40920' },
        { id: 'b2', row: 1, col: 3, rowSpan: 1, colSpan: 1, color: '#1356A2' },
        { id: 'b3', row: 2, col: 3, rowSpan: 1, colSpan: 1, color: '#ffffff' },
        { id: 'b4', row: 3, col: 1, rowSpan: 1, colSpan: 1, color: '#F7D842' },
        { id: 'b5', row: 3, col: 2, rowSpan: 1, colSpan: 2, color: '#ffffff' }
      ]
    },
    {
      name: "Broadway Boogie Woogie Inspired",
      blocks: [
        { id: 'c1', row: 1, col: 1, rowSpan: 1, colSpan: 1, color: '#F7D842' },
        { id: 'c2', row: 1, col: 2, rowSpan: 1, colSpan: 1, color: '#D40920' },
        { id: 'c3', row: 1, col: 3, rowSpan: 1, colSpan: 1, color: '#1356A2' },
        { id: 'c4', row: 2, col: 1, rowSpan: 1, colSpan: 1, color: '#1356A2' },
        { id: 'c5', row: 2, col: 2, rowSpan: 1, colSpan: 1, color: '#ffffff' },
        { id: 'c6', row: 2, col: 3, rowSpan: 1, colSpan: 1, color: '#F7D842' },
        { id: 'c7', row: 3, col: 1, rowSpan: 1, colSpan: 1, color: '#D40920' },
        { id: 'c8', row: 3, col: 2, rowSpan: 1, colSpan: 1, color: '#F7D842' },
        { id: 'c9', row: 3, col: 3, rowSpan: 1, colSpan: 1, color: '#ffffff' }
      ]
    },
    {
      name: "Composition with Yellow",
      blocks: [
        { id: 'd1', row: 1, col: 1, rowSpan: 1, colSpan: 2, color: '#ffffff' },
        { id: 'd2', row: 1, col: 3, rowSpan: 2, colSpan: 1, color: '#F7D842' },
        { id: 'd3', row: 2, col: 1, rowSpan: 2, colSpan: 1, color: '#D40920' },
        { id: 'd4', row: 2, col: 2, rowSpan: 1, colSpan: 1, color: '#ffffff' },
        { id: 'd5', row: 3, col: 2, rowSpan: 1, colSpan: 2, color: '#1356A2' }
      ]
    },
    {
      name: "Composition No. III",
      blocks: [
        { id: 'e1', row: 1, col: 1, rowSpan: 2, colSpan: 1, color: '#1356A2' },
        { id: 'e2', row: 1, col: 2, rowSpan: 1, colSpan: 2, color: '#ffffff' },
        { id: 'e3', row: 2, col: 2, rowSpan: 1, colSpan: 1, color: '#D40920' },
        { id: 'e4', row: 2, col: 3, rowSpan: 2, colSpan: 1, color: '#F7D842' },
        { id: 'e5', row: 3, col: 1, rowSpan: 1, colSpan: 2, color: '#ffffff' }
      ]
    },
    {
      name: "Tableau I",
      blocks: [
        { id: 'f1', row: 1, col: 1, rowSpan: 1, colSpan: 1, color: '#ffffff' },
        { id: 'f2', row: 1, col: 2, rowSpan: 2, colSpan: 2, color: '#D40920' },
        { id: 'f3', row: 2, col: 1, rowSpan: 2, colSpan: 1, color: '#F7D842' },
        { id: 'f4', row: 3, col: 2, rowSpan: 1, colSpan: 1, color: '#1356A2' },
        { id: 'f5', row: 3, col: 3, rowSpan: 1, colSpan: 1, color: '#ffffff' }
      ]
    },
    {
      name: "Victory Boogie Woogie Inspired",
      blocks: [
        { id: 'g1', row: 1, col: 1, rowSpan: 1, colSpan: 2, color: '#F7D842' },
        { id: 'g2', row: 1, col: 3, rowSpan: 1, colSpan: 1, color: '#D40920' },
        { id: 'g3', row: 2, col: 1, rowSpan: 1, colSpan: 1, color: '#1356A2' },
        { id: 'g4', row: 2, col: 2, rowSpan: 1, colSpan: 2, color: '#F7D842' },
        { id: 'g5', row: 3, col: 1, rowSpan: 1, colSpan: 1, color: '#D40920' },
        { id: 'g6', row: 3, col: 2, rowSpan: 1, colSpan: 1, color: '#ffffff' },
        { id: 'g7', row: 3, col: 3, rowSpan: 1, colSpan: 1, color: '#1356A2' }
      ]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const scrollPosition = container.scrollTop;
      const sectionHeight = container.clientHeight;
      const totalScroll = sectionHeight * (compositions.length - 1);

      const exactIndex = scrollPosition / sectionHeight;
      const newIndex = Math.min(Math.floor(exactIndex), compositions.length - 1);
      const progress = exactIndex - newIndex;

      setActiveIndex(newIndex);
      setScrollProgress(progress);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
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

  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden', backgroundColor: '#1a1a1a' }}>

      {/* Кнопка включения/выключения звука */}
      <motion.button
        onClick={toggleAudio}
        style={{
          position: 'fixed',
          top: '32px',
          right: '32px',
          zIndex: 100,
          background: isAudioEnabled ? 'rgba(212, 9, 32, 0.8)' : 'rgba(255, 255, 255, 0.2)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          color: 'white',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          cursor: 'pointer',
          fontSize: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(10px)'
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        title={isAudioEnabled ? "Выключить звук" : "Включить ambient-звук"}
      >
        {isAudioEnabled ? '🔊' : '🔇'}
      </motion.button>

      {/* Анимированный фон */}
      <BackgroundAnimation />

      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          scrollBehavior: 'smooth'
        }}
      >
        {compositions.map((comp, index) => (
          <section
            key={index}
            style={{
              width: '100%',
              height: '100vh',
              scrollSnapAlign: 'start',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
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
        zIndex: 1
      }}>
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
            {['Me', 'Motion Design', 'Video editing', 'Video', 'Photo', 'Graphic design', 'Portfolio'][activeIndex]}
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

        <div style={{
          width: '90vmin',
          height: '90vmin',
          position: 'relative'
        }}>
          <motion.div
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              backgroundColor: '#000000',
              padding: '8px',
              border: '12px solid #000000'
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <AnimatePresence mode="wait">
              {currentBlocks.map((block, blockIndex) => (
                <motion.div
                  key={block.id}
                  style={{
                    position: 'absolute',
                    left: `${((block.col - 1) / 3) * 100}%`,
                    top: `${((block.row - 1) / 3) * 100}%`,
                    width: `${(block.colSpan / 3) * 100}%`,
                    height: `${(block.rowSpan / 3) * 100}%`,
                    backgroundColor: block.color,
                    border: '4px solid #000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'all'
                  }}
                  variants={blockVariants}
                  initial="initial"
                  animate="animate"
                  whileHover={{ // ← ДОБАВЬ ЗДЕСЬ
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                    transition: { duration: 0.2 }
                  }}
                  layout
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                >
                  {block.video ? (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      padding: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <motion.div
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                          cursor: 'pointer',
                          position: 'relative'
                        }}
                        onClick={() => setExpandedVideo(block.video)}
                        whileHover={{ scale: 1.08, boxShadow: '0 12px 40px rgba(212, 9, 32, 0.3)' }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <video
                          src={`/videos/${block.video}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            filter: 'brightness(0.9) contrast(1.1)'
                          }}
                          muted
                          loop
                          playsInline
                        />
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '60px',
                          height: '60px',
                          backgroundColor: 'rgba(212, 9, 32, 0.8)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '3px solid white',
                          pointerEvents: 'none'
                        }}>
                          <div style={{
                            width: 0,
                            height: 0,
                            borderLeft: '15px solid white',
                            borderTop: '10px solid transparent',
                            borderBottom: '10px solid transparent',
                            marginLeft: '4px',
                            pointerEvents: 'none'
                          }} />
                        </div>
                      </motion.div>
                    </div>
                  ) : block.image ? (
                    <motion.div
                      style={{
                        width: '100%',
                        height: '100%',
                        padding: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      whileHover={{ scale: 1.08 }}
                    >
                      <motion.img
                        src={`/images/${block.image}`}
                        alt="Mikhail Starun"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain',
                          cursor: 'pointer',
                          borderRadius: '8px',
                          border: '2px solid rgba(255,255,255,0.3)'
                        }}
                        onClick={() => setExpandedImage(block.image)}
                        whileHover={{ border: '2px solid rgba(255,255,255,0.6)', boxShadow: '0 8px 25px rgba(0,0,0,0.3)' }}
                      />
                    </motion.div>
                  ) : block.content ? (
                    <motion.div
                      style={{
                        width: '100%',
                        height: '100%',
                        padding: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: block.contentStyle?.fontSize || 'clamp(10px, 1.5vmin, 14px)',
                        fontWeight: block.contentStyle?.fontWeight || '300',
                        lineHeight: block.contentStyle?.lineHeight || '1.2',
                        fontStyle: block.contentStyle?.fontStyle || 'normal',
                        textAlign: block.contentStyle?.textAlign || 'left',
                        fontFamily: '"DM Mono", monospace',
                        overflow: 'hidden',
                        wordWrap: 'break-word',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      <div style={{
                        maxHeight: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {block.content}
                      </div>
                    </motion.div>
                  ) : (
                    <div style={{ opacity: 0 }}>
                      <span style={{ color: '#6b7280', fontSize: '12px' }}>Content</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Улучшенные точки навигации */}
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
                if (containerRef.current) {
                  const sectionHeight = containerRef.current.clientHeight;
                  containerRef.current.scrollTo({
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
          zIndex: 10,
          backdropFilter: 'blur(10px)'
        }}
        whileHover={{ backgroundColor: 'rgba(212, 9, 32, 0.7)' }}
        transition={{ duration: 0.3 }}
      >
        Scroll to explore • {activeIndex + 1} / {compositions.length}
      </motion.div>

      {/* Модальные окна */}
      <AnimatePresence>
        {expandedImage && (
          <motion.div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              cursor: 'pointer'
            }}
            onClick={() => setExpandedImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={`/images/${expandedImage}`}
              alt="Mikhail Starun"
              style={{
                maxWidth: '90%',
                maxHeight: '90%',
                objectFit: 'contain',
                borderRadius: '12px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.8)'
              }}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {expandedVideo && (
          <motion.div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.98)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1001,
              cursor: 'pointer'
            }}
            onClick={() => setExpandedVideo(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              style={{
                position: 'relative',
                width: '80%',
                maxWidth: '900px',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 25px 80px rgba(0,0,0,0.8)'
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <video
                src={`/videos/${expandedVideo}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block'
                }}
                controls
                autoPlay
                onClick={(e) => e.stopPropagation()}
              />
              <motion.button
                onClick={() => setExpandedVideo(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(212, 9, 32, 0.9)',
                  border: 'none',
                  color: 'white',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}
                whileHover={{ scale: 1.1, background: 'rgba(212, 9, 32, 1)' }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MondrianScroll;