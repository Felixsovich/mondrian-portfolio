import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
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
  name: yup.string().required('Имя обязательно').min(2, 'Минимум 2 символа'),
  email: yup.string().email('Неверный формат email').required('Email обязателен'),
  message: yup.string().required('Сообщение обязательно').min(10, 'Минимум 10 символов'),
  budget: yup.string().required('Выберите бюджет')
});

const ContactPage = () => {
  usePageTitle('Контакты');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
          title: 'Новое сообщение с сайта'
        },
        EMAILJS_CONFIG.publicKey
      );
      console.log('Email отправлен успешно:', result);
      setIsLoading(false);
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('Ошибка отправки email:', error);
      setIsLoading(false);
      alert('Ошибка отправки сообщения. Попробуйте еще раз.');
    }
  };

  if (isSubmitted) {

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
              padding: '40px',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
              maxWidth: '500px',
              border: '1px solid rgba(212, 9, 32, 0.3)'
            }}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.h2
              style={{ color: '#F7D842', marginBottom: '20px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              ✅ Сообщение отправлено!
            </motion.h2>
            <motion.p
              style={{ marginBottom: '30px', lineHeight: '1.6' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Спасибо за ваше сообщение! Я свяжусь с вами в ближайшее время.
            </motion.p>
            <motion.button
              onClick={() => setIsSubmitted(false)}
              style={{
                background: 'rgba(212, 9, 32, 0.8)',
                color: 'white',
                border: 'none',
                padding: '12px 30px',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500'
              }}
              whileHover={{ scale: 1.05, background: 'rgba(212, 9, 32, 1)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Отправить еще одно сообщение
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', padding: '50px 20px' }}>
      <BackgroundAnimation />

      <motion.div
        style={{
          position: 'relative',
          zIndex: 10,
          color: 'white',
          maxWidth: '600px',
          margin: '0 auto'
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          style={{
            textAlign: 'center',
            fontSize: '48px',
            marginBottom: '10px',
            background: 'linear-gradient(45deg, #F7D842, #D40920)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Свяжитесь со мной
        </motion.h1>

        <motion.p
          style={{
            textAlign: 'center',
            fontSize: '18px',
            marginBottom: '40px',
            opacity: 0.8
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Готов обсудить ваш проект и предложить решение
        </motion.p>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            background: 'rgba(0, 0, 0, 0.8)',
            padding: '40px',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {/* Поле имени */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Имя *
            </label>
            <input
              {...register('name')}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: `2px solid ${errors.name ? '#D40920' : 'rgba(255, 255, 255, 0.2)'}`,
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              placeholder="Ваше имя"
            />
            {errors.name && (
              <motion.span
                style={{ color: '#D40920', fontSize: '14px', marginTop: '5px', display: 'block' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {errors.name.message}
              </motion.span>
            )}
          </div>

          {/* Поле email */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Email *
            </label>
            <input
              {...register('email')}
              type="email"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: `2px solid ${errors.email ? '#D40920' : 'rgba(255, 255, 255, 0.2)'}`,
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              placeholder="your@email.com"
            />
            {errors.email && (
              <motion.span
                style={{ color: '#D40920', fontSize: '14px', marginTop: '5px', display: 'block' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {errors.email.message}
              </motion.span>
            )}
          </div>

          {/* Бюджет */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Бюджет проекта *
            </label>
            <select
              {...register('budget')}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: `2px solid ${errors.budget ? '#D40920' : 'rgba(255, 255, 255, 0.2)'}`,
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '16px',
                outline: 'none'
              }}
            >
              <option value="">Выберите бюджет</option>
              <option value="10-30">10,000 - 30,000 ₽</option>
              <option value="30-50">30,000 - 50,000 ₽</option>
              <option value="50-100">50,000 - 100,000 ₽</option>
              <option value="100+">100,000+ ₽</option>
            </select>
            {errors.budget && (
              <motion.span
                style={{ color: '#D40920', fontSize: '14px', marginTop: '5px', display: 'block' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {errors.budget.message}
              </motion.span>
            )}
          </div>

          {/* Сообщение */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Сообщение *
            </label>
            <textarea
              {...register('message')}
              rows="5"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: `2px solid ${errors.message ? '#D40920' : 'rgba(255, 255, 255, 0.2)'}`,
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '16px',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
              placeholder="Опишите ваш проект..."
            />
            {errors.message && (
              <motion.span
                style={{ color: '#D40920', fontSize: '14px', marginTop: '5px', display: 'block' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {errors.message.message}
              </motion.span>
            )}
          </div>

          {/* Кнопка отправки */}
          <motion.button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              background: isLoading
                ? 'rgba(212, 9, 32, 0.5)'
                : 'linear-gradient(45deg, #D40920, #1356A2)',
              color: 'white',
              border: 'none',
              padding: '15px',
              borderRadius: '12px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              position: 'relative'
            }}
            whileHover={!isLoading ? { scale: 1.02 } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
          >
            {isLoading ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                ⏳ Отправка...
              </motion.span>
            ) : (
              '📨 Отправить сообщение'
            )}
          </motion.button>
        </motion.form>

        {/* Контактная информация */}
        <motion.div
          style={{
            marginTop: '40px',
            textAlign: 'center',
            opacity: 0.7
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.8 }}
        >
          <p>Email: mikhail@example.com</p>
          <p>Телефон: +7 (XXX) XXX-XX-XX</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactPage;