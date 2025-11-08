import { useEffect } from 'react';

const usePageTitle = (title) => {
  useEffect(() => {
    const baseTitle = 'Mikhail Starun';
    const fullTitle = title ? `${title} | ${baseTitle}` : baseTitle;
    
    document.title = fullTitle;
    
    // Также обновляем meta description динамически
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      // Можно задать разные описания для разных страниц
      const descriptions = {
        '/': 'Портфолио Mikhail Starun - современный дизайн, моушн графика и цифровое искусство в стиле Мондриана',
        '/about': 'О Mikhail Starun - дизайнер, моушн-художник, создатель цифрового искусства',
        '/portfolio': 'Портфолио работ Mikhail Starun - моушн дизайн, видео, графика',
        '/contact': 'Свяжитесь с Mikhail Starun для сотрудничества и заказа проектов'
      };
      
      metaDescription.setAttribute('content', descriptions[window.location.pathname] || descriptions['/']);
    }
  }, [title]);
};

export default usePageTitle;