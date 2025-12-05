import React, { useRef, useEffect, useState, memo } from 'react';
import { motion } from 'framer-motion';

const Block = ({ block, onImageClick, onVideoClick }) => {
    const [isVisible, setIsVisible] = useState(false);
    const blockRef = useRef(null);

    const blockVariants = {
        initial: { scale: 0.9, opacity: 0.8 },
        animate: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.5 }
        },
        hover: {
            scale: 1.05,
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            transition: { duration: 0.2 }
        }
    };

    // Intersection Observer для lazy loading
    useEffect(() => {
        if (!blockRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        // Отключаем наблюдение после первой загрузки
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                rootMargin: '100px', // Начинаем загрузку за 100px до появления
                threshold: 0.1
            }
        );

        observer.observe(blockRef.current);

        return () => {
            if (blockRef.current) {
                observer.unobserve(blockRef.current);
            }
        };
    }, []);

    return (
        <motion.div
            ref={blockRef}
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
                pointerEvents: 'auto'
            }}
            variants={blockVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            layout
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
            }}
        >
            {/* Видео с Lazy Loading */}
            {block.video && (
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
                            position: 'relative',
                            backgroundColor: 'rgba(0,0,0,0.2)' // Placeholder пока грузится
                        }}
                        onClick={() => onVideoClick(block.video)}
                        whileHover={{ scale: 1.08, boxShadow: '0 12px 40px rgba(212, 9, 32, 0.3)' }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        {isVisible ? (
                            <video
                                ref={el => {
                                    if (el) {
                                        const setRandomFrame = () => {
                                            const minTime = 3;
                                            const maxTime = 15;
                                            if (el.duration && el.duration > minTime) {
                                                const safeMaxTime = Math.min(maxTime, el.duration - 0.5);
                                                const randomTime = Math.random() * (safeMaxTime - minTime) + minTime;
                                                el.currentTime = randomTime;
                                                el.pause();
                                            } else if (el.duration > 0) {
                                                el.currentTime = el.duration / 3;
                                                el.pause();
                                            } else {
                                                el.currentTime = 3;
                                                el.pause();
                                            }
                                        };
                                        el.onloadedmetadata = setRandomFrame;
                                        if (el.readyState >= 1) {
                                            setRandomFrame();
                                        }
                                    }
                                }}
                                src={`/videos/${block.video}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    filter: 'brightness(0.9) contrast(1.1)'
                                }}
                                playsInline
                                preload="metadata" // Загружаем только метаданные, не само видео
                            />
                        ) : (
                            // Placeholder пока видео не загружено
                            <div style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'rgba(255,255,255,0.3)',
                                fontSize: '14px'
                            }}>
                                Loading...
                            </div>
                        )}

                        {/* Иконка Play */}
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '60px',
                            height: '60px',
                            backgroundColor: 'rgba(212, 9, 32, 0.2)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px solid white',
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
            )}

            {/* Изображение с Lazy Loading */}
            {!block.video && block.image && (
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
                    {isVisible ? (
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
                            onClick={() => onImageClick(block.image)}
                            whileHover={{ border: '2px solid rgba(255,255,255,0.6)', boxShadow: '0 8px 25px rgba(0,0,0,0.3)' }}
                        />
                    ) : (
                        // Placeholder для изображения
                        <div style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            borderRadius: '8px',
                            color: 'rgba(255,255,255,0.3)',
                            fontSize: '14px'
                        }}>
                            Loading...
                        </div>
                    )}
                </motion.div>
            )}

            {/* Текст/Контент (загружается сразу - легковесный) */}
            {!block.video && !block.image && block.content && (
                <motion.div
                    style={{
                        width: '100%',
                        height: '100%',
                        padding: 'clamp(6px, 1.5vmin, 16px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: block.contentStyle?.color || 'white',
                        fontSize: block.contentStyle?.fontSize || 'clamp(10px, 1.5vmin, 14px)',
                        fontWeight: block.contentStyle?.fontWeight || '300',
                        lineHeight: block.contentStyle?.lineHeight || '1.2',
                        fontStyle: block.contentStyle?.fontStyle || 'normal',
                        textAlign: block.contentStyle?.textAlign || 'left',
                        fontFamily: '"DM Mono", monospace',
                        overflow: 'auto',
                        wordWrap: 'break-word',
                        hyphens: 'auto'
                    }}
                >
                    <div style={{
                        width: '100%',
                        maxHeight: '100%'
                    }}>
                        <div dangerouslySetInnerHTML={{ __html: block.content }} />
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default memo(Block);