import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MediaModal = ({ expandedImage, expandedVideo, onClose }) => {
    return (
        <>
            {/* Модальное окно для изображений */}
            <AnimatePresence>
                {expandedImage && (
                    <motion.div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.95)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1000,
                            cursor: 'pointer'
                        }}
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.img
                            src={`/images/${expandedImage}`}
                            alt="Mikhail Starun"
                            style={{
                                maxWidth: '90%',
                                maxHeight: '90%',
                                objectFit: 'contain',
                                borderRadius: '12px',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.8)'
                            }}
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Модальное окно для видео */}
            <AnimatePresence>
                {expandedVideo && (
                    <motion.div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.98)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1001,
                            cursor: 'pointer'
                        }}
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            style={{
                                position: 'relative',
                                width: '80%',
                                maxWidth: '900px',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                boxShadow: '0 25px 80px rgba(0,0,0,0.8)'
                            }}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            <video
                                src={`/videos/${expandedVideo}`}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block'
                                }}
                                controls
                                autoPlay
                                muted
                                onClick={(e) => e.stopPropagation()}
                            />
                            <motion.button
                                onClick={onClose}
                                style={{
                                    position: 'absolute',
                                    top: '16px',
                                    right: '16px',
                                    background: 'rgba(212, 9, 32, 0.9)',
                                    border: 'none',
                                    color: 'white',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    fontSize: '18px',
                                    fontWeight: 'bold'
                                }}
                                whileHover={{ scale: 1.1, background: 'rgba(212, 9, 32, 1)' }}
                                whileTap={{ scale: 0.9 }}
                            >
                                ×
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default memo(MediaModal);