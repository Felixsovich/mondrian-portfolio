// src/components/Particles3D.jsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Particles3D = () => {
    const containerRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // ИНИЦИАЛИЗАЦИЯ
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });

        // Сохраняем ссылки
        sceneRef.current = scene;
        cameraRef.current = camera;
        rendererRef.current = renderer;

        // Размеры контейнера
        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
        container.appendChild(renderer.domElement);

        // ПАРАМЕТРЫ (уменьшены для маленького блока)
        const config = {
            centerParticles: 1500,
            ringCount: 3,
            particlesPerRing: 2000,
            baseRadius: 1.5,
            ringSpacing: 0.8,
            thickness: 0.8
        };

        // ГРУППЫ
        const centerGroup = new THREE.Group();
        const ringsGroup = new THREE.Group();
        scene.add(centerGroup);
        scene.add(ringsGroup);

        // ШЕЙДЕРНЫЙ МАТЕРИАЛ
        const createParticleMaterial = (isCenter = false) => {
            const vertexShader = `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (150.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `;

            const fragmentShader = `
        varying vec3 vColor;
        
        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float distance = length(coord);
          
          if (distance > 0.5) discard;
          
          float alpha = 1.0 - smoothstep(0.4, 0.5, distance);
          alpha *= ${isCenter ? '0.9' : '0.8'};
          
          float glow = exp(-distance * 30.0) * 0.4;
          alpha += glow;
          
          gl_FragColor = vec4(vColor, alpha);
        }
      `;

            return new THREE.ShaderMaterial({
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                transparent: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });
        };

        // ЦЕНТРАЛЬНАЯ СФЕРА
        const centerPositions = [];
        const centerColors = [];
        const centerSizes = [];

        for (let i = 0; i < config.centerParticles; i++) {
            const phi = Math.acos(1 - 2 * (i + 0.5) / config.centerParticles);
            const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
            const radius = 0.8 + Math.random() * 0.4;

            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);

            centerPositions.push(x, y, z);

            const hue = 0.65 + Math.random() * 0.25;
            const saturation = 0.8 + Math.random() * 0.2;
            const color = new THREE.Color().setHSL(hue, saturation, 0.7);
            centerColors.push(color.r, color.g, color.b);

            centerSizes.push(0.05 + Math.random() * 0.08);
        }

        const centerGeometry = new THREE.BufferGeometry();
        centerGeometry.setAttribute('position', new THREE.Float32BufferAttribute(centerPositions, 3));
        centerGeometry.setAttribute('color', new THREE.Float32BufferAttribute(centerColors, 3));
        centerGeometry.setAttribute('size', new THREE.Float32BufferAttribute(centerSizes, 1));

        const centerMaterial = createParticleMaterial(true);
        const centerParticles = new THREE.Points(centerGeometry, centerMaterial);
        centerGroup.add(centerParticles);

        // КОЛЬЦА
        const rings = [];
        const ringAngles = [Math.PI / 2, Math.PI / 4, 0];

        for (let ringIndex = 0; ringIndex < config.ringCount; ringIndex++) {
            const ringGroup = new THREE.Group();
            const ringPositions = [];
            const ringColors = [];
            const ringSizes = [];

            const radius = config.baseRadius + ringIndex * config.ringSpacing;
            const tiltAngle = ringAngles[ringIndex % ringAngles.length];

            for (let j = 0; j < config.particlesPerRing; j++) {
                const angle = (j / config.particlesPerRing) * Math.PI * 2;
                const radiusVariation = radius + (Math.random() - 0.5) * config.thickness;
                const baseX = Math.cos(angle) * radiusVariation;
                const baseY = (Math.random() - 0.5) * config.thickness * 0.3;
                const baseZ = Math.sin(angle) * radiusVariation;

                const x = baseX;
                const y = baseY * Math.cos(tiltAngle) - baseZ * Math.sin(tiltAngle);
                const z = baseY * Math.sin(tiltAngle) + baseZ * Math.cos(tiltAngle);

                ringPositions.push(x, y, z);

                const hue = (ringIndex / config.ringCount) * 0.8 + 0.1;
                const saturation = 0.9;
                const lightness = 0.7 + Math.random() * 0.2;
                const color = new THREE.Color().setHSL(hue, saturation, lightness);
                ringColors.push(color.r, color.g, color.b);

                ringSizes.push(0.03 + Math.random() * 0.06);
            }

            const ringGeometry = new THREE.BufferGeometry();
            ringGeometry.setAttribute('position', new THREE.Float32BufferAttribute(ringPositions, 3));
            ringGeometry.setAttribute('color', new THREE.Float32BufferAttribute(ringColors, 3));
            ringGeometry.setAttribute('size', new THREE.Float32BufferAttribute(ringSizes, 1));

            const ringMaterial = createParticleMaterial(false);
            const ringParticles = new THREE.Points(ringGeometry, ringMaterial);
            ringGroup.add(ringParticles);
            ringsGroup.add(ringGroup);

            rings.push({
                group: ringGroup,
                speed: 0.02,
                phase: ringIndex * 0.5
            });
        }

        // КАМЕРА
        camera.position.z = 10;
        scene.fog = new THREE.Fog(0x000000, 5, 15);

        // АНИМАЦИЯ
        const animate = () => {
            animationRef.current = requestAnimationFrame(animate);
            const time = performance.now() * 0.001;

            centerGroup.rotation.x = time * 0.08;
            centerGroup.rotation.y = time * 0.12;
            centerGroup.rotation.z = time * 0.04;

            rings.forEach((ring, index) => {
                ring.group.rotation.y = time * ring.speed + ring.phase;
                ring.group.rotation.x = Math.sin(time * 0.15 + index) * 0.1;
                ring.group.rotation.z = Math.cos(time * 0.25 + index) * 0.04;
            });

            renderer.render(scene, camera);
        };

        // RESIZE HANDLER
        const handleResize = () => {
            if (!containerRef.current || !camera || !renderer) return;

            const width = containerRef.current.clientWidth;
            const height = containerRef.current.clientHeight;

            if (width > 0 && height > 0) {
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
                renderer.setSize(width, height);
            }
        };

        window.addEventListener('resize', handleResize);

        // Запускаем ресайз сразу
        setTimeout(handleResize, 100);

        // Запуск анимации
        animate();

        // Очистка
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            window.removeEventListener('resize', handleResize);

            if (renderer && renderer.domElement && containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }

            // Очистка Three.js объектов
            if (centerGeometry) centerGeometry.dispose();
            if (centerMaterial) centerMaterial.dispose();
            if (renderer) renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                background: '#000000'
            }}
        />
    );
};

export default Particles3D;