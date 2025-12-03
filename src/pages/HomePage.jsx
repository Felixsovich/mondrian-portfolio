import React from 'react';
import MondrianScroll from '../components/MondrianScroll';
import usePageTitle from '../hooks/usePageTitle';

const HomePage = () => {
  usePageTitle('Главная - Digital Artist & Motion Designer');
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* BackgroundAnimation и ReededGlassOverlay теперь в App.jsx */}
      <MondrianScroll />
    </div>
  );
};

export default HomePage;