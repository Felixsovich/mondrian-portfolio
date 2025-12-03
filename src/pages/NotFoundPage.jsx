import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BackgroundAnimation from '../components/BackgroundAnimation';
import usePageTitle from '../hooks/usePageTitle';

const NotFoundPage = () => {
  usePageTitle('Страница не найдена');

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <BackgroundAnimation />
      
      <motion.div
        style={{
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
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          style={{
            background: 'rgba(0, 0, 0, 0.8)',
            padding: '60px 40px',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
            maxWidth: '500px',
            border: '1px solid rgba(212, 9, 32, 0.3)'
          }}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.h1 
            style={{ 
              fontSize: '120px', 
              marginBottom: '20px',
              background: 'linear-gradient(45deg, #D40920, #F7D842)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            404
          </motion.h1>
          
          <motion.h2 
            style={{ color: '#F7D842', marginBottom: '20px', fontSize: '28px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Страница не найдена
          </motion.h2>
          
          <motion.p 
            style={{ marginBottom: '30px', lineHeight: '1.6', fontSize: '18px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Извините, но страница которую вы ищете не существует или была перемещена.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Link to="/">
              <motion.button
                style={{
                  background: 'linear-gradient(45deg, #D40920, #1356A2)',
                  color: 'white',
                  border: 'none',
                  padding: '15px 30px',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🏠 Вернуться на главную
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;