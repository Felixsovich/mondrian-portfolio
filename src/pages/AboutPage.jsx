import React from 'react';
import BackgroundAnimation from '../components/BackgroundAnimation';
import usePageTitle from '../hooks/usePageTitle';

const AboutPage = () => {
  usePageTitle('Обо мне');
  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <BackgroundAnimation />

      <div style={{
        position: 'relative',
        zIndex: 10,
        color: '#1a1a1a',
        textAlign: 'center',
        padding: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
      }}>
        <h1 style={{ fontSize: '88px', marginBottom: '20px' }}>О проекте</h1>
        <p style={{ fontSize: '18px', maxWidth: '600px', lineHeight: '1.6' }}>
          Этот интерактивный сайт вдохновлен искусством Пита Мондриана.
          Сочетание современных веб-технологий и классического искусства
          создает уникальный пользовательский опыт.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;