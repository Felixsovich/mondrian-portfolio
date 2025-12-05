import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Block from './Block';

const CompositionGrid = ({ blocks, onImageClick, onVideoClick }) => {
    return (
        <motion.div
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                backgroundColor: '#000000',
                padding: '8px',
                border: '12px solid #000000',
                pointerEvents: 'auto'
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            <AnimatePresence mode="wait">
                {blocks.map((block) => (
                    <Block
                        key={block.id}
                        block={block}
                        onImageClick={onImageClick}
                        onVideoClick={onVideoClick}
                    />
                ))}
            </AnimatePresence>
        </motion.div>
    );
};

export default memo(CompositionGrid);