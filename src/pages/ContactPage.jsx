import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import BackgroundAnimation from '../components/BackgroundAnimation';
import emailjs from '@emailjs/browser';
import usePageTitle from '../hooks/usePageTitle';

// Конфигурация EmailJS
const EMAILJS_CONFIG = {
  serviceId: 'service_z6qoxbe',
  templateId: 'template_2k8d329',
  publicKey: '0Qw4lKRjhpcuey78S'
};

// Схема валидации
const contactSchema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Minimum 2 characters'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  message: yup.string().required('Message is required').min(10, 'Minimum 10 characters'),
  budget: yup.string().required('Please select a budget')
});

// Градиенты с WebGradients
const GRADIENTS = {
  primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  success: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  glass: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
  darkGlass: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)',
  neon: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  sunset: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  deepBlue: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
};

const ContactPage = () => {
  usePageTitle('Contact');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredField, setHoveredField] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(contactSchema)
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const result = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          name: data.name,
          email: data.email,
          budget: data.budget,
          message: data.message,
          title: 'New message from website'
        },
        EMAILJS_CONFIG.publicKey
      );
      console.log('Email sent successfully:', result);
      setIsLoading(false);
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('Error sending email:', error);
      setIsLoading(false);
      alert('Error sending message. Please try again.');
    }
  };

  if (isSubmitted) {
    return (
      <div style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <BackgroundAnimation />

        {/* Анимированный градиентный фон */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: GRADIENTS.deepBlue,
            opacity: 0.1
          }}
          animate={{
            background: [
              GRADIENTS.deepBlue,
              GRADIENTS.sunset,
              GRADIENTS.neon,
              GRADIENTS.deepBlue
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <motion.div
          style={{
            position: 'relative',
            zIndex: 10,
            color: 'white',
            textAlign: 'center',
            maxWidth: '500px',
            width: '100%'
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            style={{
              background: 'rgba(0, 0, 0, 0.7)',
              padding: '60px 40px',
              borderRadius: '24px',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
              position: 'relative',
              overflow: 'hidden'
            }}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Анимированная граница */}
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '200%',
                height: '3px',
                background: GRADIENTS.neon
              }}
              animate={{
                x: ['-100%', '0%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            <motion.div
              style={{
                fontSize: '80px',
                marginBottom: '20px',
                display: 'inline-block'
              }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              ✨
            </motion.div>

            <motion.h2
              style={{
                fontSize: 'clamp(32px, 5vw, 42px)',
                marginBottom: '20px',
                background: GRADIENTS.neon,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontWeight: '700'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Message Sent!
            </motion.h2>

            <motion.p
              style={{
                marginBottom: '30px',
                lineHeight: '1.6',
                fontSize: '18px',
                color: 'rgba(255, 255, 255, 0.8)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Thank you for your message! I'll get back to you as soon as possible.
            </motion.p>

            <motion.button
              onClick={() => setIsSubmitted(false)}
              style={{
                background: GRADIENTS.primary,
                color: 'white',
                border: 'none',
                padding: '16px 40px',
                borderRadius: '50px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 15px 40px rgba(102, 126, 234, 0.5)'
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Send Another Message
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#1a1a1a',
      overflowY: 'auto',
      overflowX: 'hidden',
    }}>
      <BackgroundAnimation />

      {/* Контейнер для контента с скроллом */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 20px 120px',
      }}>

        {/* Анимированные градиентные элементы на фоне */}
        <motion.div
          style={{
            position: 'fixed',
            top: '10%',
            left: '10%',
            width: '300px',
            height: '300px',
            background: GRADIENTS.sunset,
            borderRadius: '50%',
            filter: 'blur(80px)',
            opacity: 0.1,
            zIndex: 1
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <motion.div
          style={{
            position: 'fixed',
            bottom: '10%',
            right: '10%',
            width: '400px',
            height: '400px',
            background: GRADIENTS.deepBlue,
            borderRadius: '50%',
            filter: 'blur(100px)',
            opacity: 0.1,
            zIndex: 1
          }}
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Основной контент */}
        <motion.div
          style={{
            position: 'relative',
            zIndex: 20,
            color: 'white',
            maxWidth: '800px',
            width: '100%',
            margin: '0 auto'
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Заголовок с градиентом и свечением */}
          <div style={{
            position: 'relative',
            padding: '40px 0',
            marginBottom: '60px',
            overflow: 'visible',
            textAlign: 'center'
          }}>
            <motion.h1
              style={{
                fontSize: 'clamp(42px, 8vw, 64px)',
                background: GRADIENTS.neon,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontWeight: '800',
                letterSpacing: '-0.03em',
                lineHeight: '1.2',
                display: 'inline-block',
                margin: 0,
                padding: '10px 0',
                position: 'relative',
                zIndex: 2
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              whileHover={{
                scale: 1.02
              }}
            >
              Let's Create Together
            </motion.h1>

            {/* Свечение */}
            <motion.div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '120%',
                height: '150%',
                background: 'radial-gradient(circle at center, rgba(67, 233, 123, 0.3) 0%, transparent 70%)',
                filter: 'blur(60px)',
                zIndex: 1,
                opacity: 0.5,
                pointerEvents: 'none'
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <motion.p
              style={{
                fontSize: 'clamp(18px, 3vw, 22px)',
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: '1.6',
                fontWeight: '300',
                maxWidth: '600px',
                margin: '0 auto',
                marginTop: '20px'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Ready to discuss your project and explore creative solutions
            </motion.p>
          </div>

          {/* Форма (уменьшена высота полей для компактности) */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              background: 'rgba(0, 0, 0, 0.6)',
              padding: '40px',
              borderRadius: '30px',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: '60px'
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {/* Анимированная граница формы - ПО ВСЕМ 4 СТОРОНАМ */}
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '200%',
                height: '2px',
                background: GRADIENTS.primary,
                transformOrigin: '0 0'
              }}
              animate={{
                x: ['0%', '100%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            <motion.div
              style={{
                position: 'absolute',
                top: '-100%',
                right: 0,
                width: '2px',
                height: '200%',
                background: GRADIENTS.primary,
                transformOrigin: '0 0'
              }}
              animate={{
                y: ['0%', '100%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                delay: 1.5
              }}
            />

            <motion.div
              style={{
                position: 'absolute',
                bottom: 0,
                right: '-100%',
                width: '200%',
                height: '2px',
                background: GRADIENTS.primary,
                transformOrigin: '0 0'
              }}
              animate={{
                x: ['0%', '-100%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                delay: 1
              }}
            />

            <motion.div
              style={{
                position: 'absolute',
                bottom: '-100%',
                left: 0,
                width: '2px',
                height: '200%',
                background: GRADIENTS.primary,
                transformOrigin: '0 0'
              }}
              animate={{
                y: ['0%', '-100%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                delay: 0.5
              }}
            />

            {/* Поле имени */}
            <div style={{ marginBottom: '25px', position: 'relative' }}>
              <motion.label
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500',
                  fontSize: '15px',
                  color: 'rgba(255, 255, 255, 0.9)'
                }}
                whileHover={{ x: 5 }}
              >
                Name *
              </motion.label>

              <motion.div
                style={{
                  position: 'relative',
                  borderRadius: '10px',
                  overflow: 'hidden'
                }}
                whileHover={{ scale: 1.01 }}
              >
                <input
                  {...register('name')}
                  onFocus={() => setHoveredField('name')}
                  onBlur={() => setHoveredField(null)}
                  style={{
                    width: '100%',
                    padding: '15px 18px',
                    borderRadius: '10px',
                    border: `2px solid ${errors.name ? '#ff4757' : 'rgba(255, 255, 255, 0.1)'}`,
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)'
                  }}
                  placeholder="Your name"
                />

                {/* Индикатор фокуса */}
                <motion.div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '2px',
                    background: hoveredField === 'name' ? GRADIENTS.neon : 'transparent'
                  }}
                  animate={{
                    width: hoveredField === 'name' ? '100%' : '0%'
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              <AnimatePresence>
                {errors.name && (
                  <motion.span
                    style={{
                      color: '#ff4757',
                      fontSize: '13px',
                      marginTop: '6px',
                      display: 'block',
                      fontWeight: '500'
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    ⚠️ {errors.name.message}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Поле email */}
            <div style={{ marginBottom: '25px', position: 'relative' }}>
              <motion.label
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500',
                  fontSize: '15px',
                  color: 'rgba(255, 255, 255, 0.9)'
                }}
                whileHover={{ x: 5 }}
              >
                Email *
              </motion.label>

              <motion.div
                style={{
                  position: 'relative',
                  borderRadius: '10px',
                  overflow: 'hidden'
                }}
                whileHover={{ scale: 1.01 }}
              >
                <input
                  {...register('email')}
                  type="email"
                  onFocus={() => setHoveredField('email')}
                  onBlur={() => setHoveredField(null)}
                  style={{
                    width: '100%',
                    padding: '15px 18px',
                    borderRadius: '10px',
                    border: `2px solid ${errors.email ? '#ff4757' : 'rgba(255, 255, 255, 0.1)'}`,
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)'
                  }}
                  placeholder="your@email.com"
                />

                <motion.div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '2px',
                    background: hoveredField === 'email' ? GRADIENTS.secondary : 'transparent'
                  }}
                  animate={{
                    width: hoveredField === 'email' ? '100%' : '0%'
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              <AnimatePresence>
                {errors.email && (
                  <motion.span
                    style={{
                      color: '#ff4757',
                      fontSize: '13px',
                      marginTop: '6px',
                      display: 'block',
                      fontWeight: '500'
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    ⚠️ {errors.email.message}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Бюджет */}
            <div style={{ marginBottom: '25px', position: 'relative' }}>
              <motion.label
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500',
                  fontSize: '15px',
                  color: 'rgba(255, 255, 255, 0.9)'
                }}
                whileHover={{ x: 5 }}
              >
                Project Budget *
              </motion.label>

              <motion.div
                style={{
                  position: 'relative',
                  borderRadius: '10px',
                  overflow: 'hidden'
                }}
                whileHover={{ scale: 1.01 }}
              >
                <select
                  {...register('budget')}
                  onFocus={() => setHoveredField('budget')}
                  onBlur={() => setHoveredField(null)}
                  style={{
                    width: '100%',
                    padding: '15px 18px',
                    borderRadius: '10px',
                    border: `2px solid ${errors.budget ? '#ff4757' : 'rgba(255, 255, 255, 0.1)'}`,
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '15px',
                    outline: 'none',
                    backdropFilter: 'blur(10px)',
                    cursor: 'pointer'
                  }}
                >
                  <option value="" style={{ background: '#1a1a1a', color: 'rgba(255,255,255,0.5)' }}>
                    Select budget range
                  </option>
                  <option value="10-30" style={{ background: '#1a1a1a' }}>$10,000 - $30,000</option>
                  <option value="30-50" style={{ background: '#1a1a1a' }}>$30,000 - $50,000</option>
                  <option value="50-100" style={{ background: '#1a1a1a' }}>$50,000 - $100,000</option>
                  <option value="100+" style={{ background: '#1a1a1a' }}>$100,000+</option>
                </select>

                <motion.div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '2px',
                    background: hoveredField === 'budget' ? GRADIENTS.success : 'transparent'
                  }}
                  animate={{
                    width: hoveredField === 'budget' ? '100%' : '0%'
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              <AnimatePresence>
                {errors.budget && (
                  <motion.span
                    style={{
                      color: '#ff4757',
                      fontSize: '13px',
                      marginTop: '6px',
                      display: 'block',
                      fontWeight: '500'
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    ⚠️ {errors.budget.message}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Сообщение */}
            <div style={{ marginBottom: '30px', position: 'relative' }}>
              <motion.label
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500',
                  fontSize: '15px',
                  color: 'rgba(255, 255, 255, 0.9)'
                }}
                whileHover={{ x: 5 }}
              >
                Message *
              </motion.label>

              <motion.div
                style={{
                  position: 'relative',
                  borderRadius: '10px',
                  overflow: 'hidden'
                }}
                whileHover={{ scale: 1.01 }}
              >
                <textarea
                  {...register('message')}
                  rows="5"
                  onFocus={() => setHoveredField('message')}
                  onBlur={() => setHoveredField(null)}
                  style={{
                    width: '100%',
                    padding: '15px 18px',
                    borderRadius: '10px',
                    border: `2px solid ${errors.message ? '#ff4757' : 'rgba(255, 255, 255, 0.1)'}`,
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    fontSize: '15px',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    minHeight: '120px',
                    backdropFilter: 'blur(10px)'
                  }}
                  placeholder="Tell me about your project, timeline, and goals..."
                />

                <motion.div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '2px',
                    background: hoveredField === 'message' ? GRADIENTS.deepBlue : 'transparent'
                  }}
                  animate={{
                    width: hoveredField === 'message' ? '100%' : '0%'
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              <AnimatePresence>
                {errors.message && (
                  <motion.span
                    style={{
                      color: '#ff4757',
                      fontSize: '13px',
                      marginTop: '6px',
                      display: 'block',
                      fontWeight: '500'
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    ⚠️ {errors.message.message}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Кнопка отправки */}
            <motion.button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                background: isLoading
                  ? 'rgba(255, 255, 255, 0.1)'
                  : GRADIENTS.primary,
                color: 'white',
                border: 'none',
                padding: '16px',
                borderRadius: '12px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(10px)',
                boxShadow: isLoading
                  ? 'none'
                  : '0 10px 40px rgba(102, 126, 234, 0.3)'
              }}
              whileHover={!isLoading ? {
                scale: 1.02,
                boxShadow: '0 15px 50px rgba(102, 126, 234, 0.5)'
              } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px'
                    }}
                  >
                    <motion.div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        border: '3px solid rgba(255,255,255,0.3)',
                        borderTopColor: 'white'
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Sending...
                  </motion.div>
                ) : (
                  <motion.div
                    key="send"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px'
                    }}
                  >
                    <span style={{ fontSize: '18px' }}>✉️</span>
                    Send Message
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Эффект при наведении */}
              {!isLoading && (
                <motion.div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '200%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)'
                  }}
                  initial={{ x: '-100%' }}
                  whileHover={{
                    x: '100%',
                    transition: { duration: 0.6 }
                  }}
                />
              )}
            </motion.button>
          </motion.form>

          {/* Контактная информация */}
          <motion.div
            style={{
              textAlign: 'center',
              padding: '35px',
              background: 'rgba(0, 0, 0, 0.4)',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              marginBottom: '40px'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <h3 style={{
              fontSize: '22px',
              marginBottom: '20px',
              background: GRADIENTS.sunset,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: '600'
            }}>
              Alternative Contact
            </h3>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '30px',
              flexWrap: 'wrap'
            }}>
              <motion.a
                href="mailto:starun.flow@gmail.com"
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                whileHover={{
                  color: '#43e97b',
                  scale: 1.05
                }}
                transition={{ duration: 0.2 }}
              >
                <span style={{ fontSize: '18px' }}>📧</span>
                starun.flow@gmail.com
              </motion.a>

              <motion.a
                href="https://www.behance.net/toandfro"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                whileHover={{
                  color: '#667eea',
                  scale: 1.05
                }}
                transition={{ duration: 0.2 }}
              >
                <span style={{ fontSize: '18px' }}>𓃗</span>
                Behance Portfolio
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;