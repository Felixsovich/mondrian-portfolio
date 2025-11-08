import React from 'react';
import BackgroundAnimation from '../components/BackgroundAnimation';
import usePageTitle from '../hooks/usePageTitle';

const PortfolioPage = () => {
  usePageTitle('Портфолио');
  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <BackgroundAnimation />

      <div style={{
        position: 'relative',
        zIndex: 10,
        color: 'white',
        textAlign: 'center',
        padding: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
      }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>Портфолио</h1>
        <p style={{ fontSize: '18px', maxWidth: '600px', lineHeight: '1.6' }}>
          Здесь будут представлены мои работы и проекты.
        </p>
      </div>
    </div>
  );
};

export default PortfolioPage;