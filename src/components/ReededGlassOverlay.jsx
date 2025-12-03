import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';

const ReededGlassOverlay = () => {
  const containerRef = useRef(null);

  // Motion Values for mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Physics for "Smooth Return" (Spring)
  const springConfig = { damping: 30, stiffness: 200, mass: 1.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Wind Oscillation Values
  const windX = useMotionValue(0);
  const windY = useMotionValue(0);

  useEffect(() => {
    // 1. Mouse Event Listener
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      // Calculate offset from center (-1 to 1 range approx)
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);

      // Multiplier determines how far the glass moves relative to mouse (Parallax)
      const moveDistance = 40;
      mouseX.set(x * moveDistance);
      mouseY.set(y * moveDistance);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 2. Wind Effect (Continuous randomized oscillation)
    // We animate the 'wind' motion values in a loop
    const controlsX = animate(windX, [0, 8, -8, 0], {
      duration: 12,
      repeat: Infinity,
      ease: "easeInOut",
      repeatType: "mirror"
    });

    const controlsY = animate(windY, [0, 5, -5, 0], {
      duration: 15,
      repeat: Infinity,
      ease: "easeInOut",
      repeatType: "mirror",
      delay: 1
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      controlsX.stop();
      controlsY.stop();
    };
  }, [mouseX, mouseY, windX, windY]);

  // Combine Spring (Mouse) + Wind for final transform
  const x = useTransform([smoothX, windX], (latest) => latest[0] + latest[1]);
  const y = useTransform([smoothY, windY], (latest) => latest[0] + latest[1]);

  // CSS for the Ribbed/Reeded texture
  // Creates vertical lines: Transparent -> White/Black edge -> Transparent
  // This mimics the refraction of glass ribs.
  const reededTexture = {
    background: `
      repeating-linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0px,
        rgba(255, 255, 255, 0) 3px,
        rgba(255, 255, 255, 0.15) 4px,
        rgba(20, 20, 20, 0.1) 5px,
        rgba(255, 255, 255, 0) 8px
      )
    `,
    backgroundSize: '100% 100%',
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: -50, // Overlap slightly to allow movement without showing edges
        left: -50,
        right: -50,
        bottom: -50,
        zIndex: 5, // Layer 3: Above background, below content
        pointerEvents: 'none', // Allow clicks to pass through to MondrianScroll
        overflow: 'hidden'
      }}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          // The Physics motion applied here
          x,
          y,
          // Glass properties
          backdropFilter: 'blur(12px) contrast(1.1)',
          WebkitBackdropFilter: 'blur(12px) contrast(1.1)',
          ...reededTexture
        }}
      >
        {/* Optional: Add a subtle gradient map overlay to enhance the "glass" feel */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0.1) 100%)',
          mixBlendMode: 'overlay'
        }} />
      </motion.div>
    </div>
  );
};

export default ReededGlassOverlay;