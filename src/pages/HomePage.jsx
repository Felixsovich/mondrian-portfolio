import React from 'react';
import BackgroundAnimation from '../components/BackgroundAnimation';
import MondrianScroll from '../components/MondrianScroll';
import usePageTitle from '../hooks/usePageTitle';

const HomePage = () => {
  usePageTitle('Главная - Digital Artist & Motion Designer');
  return (
    <div style={{ position: 'relative' }}>
      <BackgroundAnimation />
      <MondrianScroll />
    </div>
  );
};

export default HomePage;
