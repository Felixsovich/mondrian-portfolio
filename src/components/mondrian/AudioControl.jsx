import React, { useRef, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import * as Tone from 'tone';

const AudioControl = ({ isAudioEnabled, setIsAudioEnabled, activeIndex, scrollProgress }) => {
    // Refs для Tone.js
    const synthRef = useRef(null);
    const reverbRef = useRef(null);
    const filterRef = useRef(null);

    // Инициализация аудио
    useEffect(() => {
        synthRef.current = new Tone.PolySynth(Tone.Synth, {
            oscillator: { type: "sine" },
            envelope: {
                attack: 2,
                decay: 1,
                sustain: 0.5,
                release: 4
            }
        }).toDestination();

        reverbRef.current = new Tone.Reverb({
            decay: 8,
            wet: 0.6
        }).toDestination();

        filterRef.current = new Tone.Filter({
            frequency: 400,
            type: "lowpass",
            Q: 1
        }).toDestination();

        synthRef.current.connect(filterRef.current);
        filterRef.current.connect(reverbRef.current);
        synthRef.current.volume.value = -30;

        return () => {
            synthRef.current?.dispose();
            reverbRef.current?.dispose();
            filterRef.current?.dispose();
        };
    }, []);

    // Функция для запуска ambient-аккорда
    const playAmbientChord = () => {
        if (!synthRef.current) return;
        const chord = ["D3", "F3", "A3", "C4", "E4"];
        chord.forEach((note, index) => {
            synthRef.current.triggerAttack(note, Tone.now() + index * 0.1);
        });
    };

    // Функция для включения/выключения звука
    const toggleAudio = async () => {
        if (!isAudioEnabled) {
            await Tone.start();
            console.log('Audio context started');
            playAmbientChord();
        } else {
            synthRef.current.releaseAll();
        }
        setIsAudioEnabled(!isAudioEnabled);
    };

    // Обновляем звук при скролле
    useEffect(() => {
        if (!isAudioEnabled || !synthRef.current) return;
        const filterFreq = 200 + (scrollProgress * 800);
        filterRef.current.frequency.rampTo(filterFreq, 0.1);
        const volume = -25 + (Math.abs(scrollProgress) * 5);
        synthRef.current.volume.rampTo(volume, 0.2);
    }, [scrollProgress, isAudioEnabled]);

    // Обновляем звук при смене страницы
    useEffect(() => {
        if (!isAudioEnabled || !synthRef.current) return;
        const chords = [
            ["D3", "F3", "A3", "C4", "E4"],
            ["C3", "E3", "G3", "B3", "D4"],
            ["E3", "G3", "B3", "D4", "F#4"],
            ["F3", "A3", "C4", "E4", "G4"],
            ["G3", "B3", "D4", "F4", "A4"],
            ["A3", "C4", "E4", "G4", "B4"],
            ["B3", "D4", "F#4", "A4", "C5"]
        ];
        synthRef.current.releaseAll();
        setTimeout(() => {
            const chord = chords[activeIndex % chords.length];
            chord.forEach((note, index) => {
                synthRef.current.triggerAttack(note, Tone.now() + index * 0.15);
            });
        }, 200);
    }, [activeIndex, isAudioEnabled]);

    return (
        <motion.button
            onClick={toggleAudio}
            style={{
                position: 'fixed',
                top: 'auto',
                bottom: '32px',
                left: '32px',
                right: 'auto',
                zIndex: 100,
                background: isAudioEnabled ? 'rgba(212, 9, 32, 0.8)' : 'rgba(255, 255, 255, 0.2)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)'
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            title={isAudioEnabled ? "Выключить звук" : "Включить ambient-звук"}
        >
            {isAudioEnabled ? '🔊' : '🔇'}
        </motion.button>
    );
};

export default memo(AudioControl);