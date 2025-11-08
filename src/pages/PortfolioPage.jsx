import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import BackgroundAnimation from '../components/BackgroundAnimation';
import usePageTitle from '../hooks/usePageTitle';

const PortfolioPage = () => {
  usePageTitle('Портфолио');

  // Refs для каждой секции
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const section5Ref = useRef(null);
  const containerRef = useRef(null);

  const [activeSection, setActiveSection] = useState(0);

  // Настройка скролла для контейнера
  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end end"]
  });

  // Отслеживание видимости секций
  const section1InView = useInView(section1Ref, { threshold: 0.5 });
  const section2InView = useInView(section2Ref, { threshold: 0.5 });
  const section3InView = useInView(section3Ref, { threshold: 0.5 });
  const section4InView = useInView(section4Ref, { threshold: 0.5 });
  const section5InView = useInView(section5Ref, { threshold: 0.5 });

  // Обновление активной секции
  useEffect(() => {
    if (section1InView) setActiveSection(0);
    else if (section2InView) setActiveSection(1);
    else if (section3InView) setActiveSection(2);
    else if (section4InView) setActiveSection(3);
    else if (section5InView) setActiveSection(4);
  }, [section1InView, section2InView, section3InView, section4InView, section5InView]);

  // Анимации на основе скролла
  const opacity1 = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale1 = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const opacity2 = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.4], [100, 0]);

  const opacity3 = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const scale3 = useTransform(scrollYProgress, [0.4, 0.6], [0.5, 1]);

  const splitProgress = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const leftX = useTransform(splitProgress, [0, 1], [0, -50]);
  const rightX = useTransform(splitProgress, [0, 1], [0, 50]);

  const opacity5 = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
  const rotate5 = useTransform(scrollYProgress, [0.8, 1], [-10, 0]);

  // Функция для скролла к секции
  const scrollToSection = (sectionIndex) => {
    const sections = [section1Ref, section2Ref, section3Ref, section4Ref, section5Ref];
    sections[sectionIndex]?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        height: '100vh',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory'
      }}
    >
      <BackgroundAnimation />

      {/* Секция 1: Fullscreen видео */}
      <motion.section
        ref={section1Ref}
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          opacity: opacity1,
          scale: scale1,
          scrollSnapAlign: 'start'
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(45deg, #1a1a1a, #2d2d2d)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '80%',
            height: '60%',
            background: 'rgba(212, 9, 32, 0.1)',
            border: '2px solid rgba(212, 9, 32, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '24px'
          }}>
            🎬 Video Showreel
          </div>
        </div>

        <motion.div
          style={{
            position: 'relative',
            zIndex: 10,
            color: 'white',
            textAlign: 'center'
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 style={{ fontSize: '72px', marginBottom: '20px' }}>Motion Design</h1>
          <p style={{ fontSize: '24px', opacity: 0.8 }}>Cinematic animations that captivate</p>
        </motion.div>
      </motion.section>

      {/* Секция 2: Текстовая */}
      <motion.section
        ref={section2Ref}
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#D40920',
          opacity: opacity2,
          y: y2,
          scrollSnapAlign: 'start'
        }}
      >
        <motion.div
          style={{
            color: 'white',
            textAlign: 'center',
            maxWidth: '800px',
            padding: '0 20px'
          }}
        >
          <h2 style={{ fontSize: '48px', marginBottom: '30px' }}>Creative Vision</h2>
          <p style={{ fontSize: '20px', lineHeight: '1.6', opacity: 0.9 }}>
            We transform abstract ideas into compelling visual experiences
          </p>
        </motion.div>
      </motion.section>

      {/* Секция 3: Zoom изображение */}
      <motion.section
        ref={section3Ref}
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1356A2',
          opacity: opacity3,
          scale: scale3,
          scrollSnapAlign: 'start'
        }}
      >
        <div style={{
          width: '80%',
          height: '80%',
          background: 'rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '24px',
          border: '2px solid rgba(255,255,255,0.2)'
        }}>
          📸 Featured Project
        </div>
      </motion.section>

      {/* Секция 4: Split screen */}
      <motion.section
        ref={section4Ref}
        style={{
          height: '100vh',
          display: 'flex',
          background: '#2d2d2d',
          scrollSnapAlign: 'start'
        }}
      >
        <motion.div
          style={{
            flex: 1,
            background: 'rgba(212, 9, 32, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            x: leftX
          }}
        >
          <div style={{ color: 'white', textAlign: 'center' }}>
            <h3 style={{ fontSize: '32px', marginBottom: '15px' }}>Brand Identity</h3>
            <p>Video content here</p>
          </div>
        </motion.div>

        <motion.div
          style={{
            flex: 1,
            background: 'rgba(19, 86, 162, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            x: rightX
          }}
        >
          <div style={{ color: 'white', textAlign: 'center' }}>
            <h3 style={{ fontSize: '32px', marginBottom: '15px' }}>Digital Campaigns</h3>
            <p>Video content here</p>
          </div>
        </motion.div>
      </motion.section>

      {/* Секция 5: Текст + изображение */}
      <motion.section
        ref={section5Ref}
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F7D842',
          opacity: opacity5,
          rotate: rotate5,
          scrollSnapAlign: 'start'
        }}
      >
        <div style={{
          color: '#1a1a1a',
          textAlign: 'center',
          maxWidth: '600px'
        }}>
          <h2 style={{ fontSize: '48px', marginBottom: '20px' }}>Innovation</h2>
          <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
            Pushing creative boundaries with technology
          </p>
        </div>
      </motion.section>

      {/* Индикатор прогресса */}
      <motion.div
        style={{
          position: 'fixed',
          right: '40px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <motion.div
            key={index}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: activeSection === index ? '#F7D842' : 'rgba(255,255,255,0.3)',
              cursor: 'pointer',
              border: '2px solid white'
            }}
            whileHover={{ scale: 1.5 }}
            onClick={() => scrollToSection(index)}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default PortfolioPage;