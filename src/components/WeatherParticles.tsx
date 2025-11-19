import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

interface WeatherParticlesProps {
    weatherMain: string;
    rainAmount?: number; // 3h precipitation in mm
    cloudiness: number; // 0-100
    windSpeed: number; // m/s
}

const WeatherParticles: React.FC<WeatherParticlesProps> = ({
    weatherMain,
    rainAmount = 0,
    cloudiness,
    windSpeed,
}) => {
    const [particles, setParticles] = useState<React.ReactElement[]>([]);

    useEffect(() => {
        const newParticles: React.ReactElement[] = [];

        // Generate rain particles
        if (weatherMain === 'Rain' || weatherMain === 'Drizzle' || weatherMain === 'Thunderstorm') {
            // Calculate number of rain drops based on rain amount
            // light rain (< 2mm): ~30 drops
            // moderate rain (2-7mm): ~60 drops
            // heavy rain (> 7mm): ~100+ drops
            let rainCount = 30;
            if (rainAmount > 7) {
                rainCount = 120;
            } else if (rainAmount > 2) {
                rainCount = 60;
            } else if (rainAmount > 0.5) {
                rainCount = 40;
            }

            // Wind affects rain angle (0-30 degrees)
            const rainAngle = Math.min(windSpeed * 3, 30);

            for (let i = 0; i < rainCount; i++) {
                newParticles.push(
                    <RainDrop
                        key={`rain-${i}`}
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${0.5 + Math.random() * 0.5}s`,
                            opacity: 0.3 + Math.random() * 0.4,
                        }}
                        $windSpeed={windSpeed}
                        $angle={rainAngle}
                    />
                );
            }
        }

        // Generate snow particles
        if (weatherMain === 'Snow') {
            const snowCount = Math.min(50 + Math.floor(rainAmount * 10), 100);
            
            for (let i = 0; i < snowCount; i++) {
                newParticles.push(
                    <SnowFlake
                        key={`snow-${i}`}
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${3 + Math.random() * 4}s`,
                            fontSize: `${8 + Math.random() * 8}px`,
                        }}
                        $windSpeed={windSpeed}
                    />
                );
            }
        }

        // Generate cloud particles
        if (cloudiness > 20) {
            // More clouds = more cloud particles (2-8 clouds)
            const cloudCount = Math.floor((cloudiness / 100) * 6) + 2;
            
            for (let i = 0; i < cloudCount; i++) {
                const verticalPosition = 5 + Math.random() * 40; // Spread across top half
                const duration = 40 - (windSpeed * 3); // Wind affects speed
                const scale = 0.5 + Math.random() * 1.2; // Wide variety of sizes (0.5x to 1.7x)
                
                // Random cloud shape variation
                const width = 180 + Math.random() * 100; // 180-280px
                const height = 50 + Math.random() * 40; // 50-90px
                const beforeSize = 70 + Math.random() * 40; // 70-110px
                const afterSize = 50 + Math.random() * 40; // 50-90px
                const beforeLeft = 30 + Math.random() * 40; // 30-70px
                const afterRight = 30 + Math.random() * 40; // 30-70px
                
                // Negative delay makes clouds start mid-animation (already on screen)
                const delay = -(Math.random() * Math.max(duration, 25));
                
                newParticles.push(
                    <Cloud
                        key={`cloud-${i}`}
                        style={{
                            top: `${verticalPosition}%`,
                            animationDelay: `${delay}s`,
                            animationDuration: `${Math.max(duration, 25)}s`, // Min 25s
                            opacity: 0.2 + (cloudiness / 100) * 0.3,
                            transform: `scale(${scale})`,
                            width: `${width}px`,
                            height: `${height}px`,
                            borderRadius: `${height * 1.5}px`,
                            // @ts-ignore - CSS custom properties
                            '--before-size': `${beforeSize}px`,
                            '--after-size': `${afterSize}px`,
                            '--before-left': `${beforeLeft}px`,
                            '--after-right': `${afterRight}px`,
                        }}
                        $windSpeed={windSpeed}
                    />
                );
            }
        }

        setParticles(newParticles);
    }, [weatherMain, rainAmount, cloudiness, windSpeed]);

    return <ParticlesContainer>{particles}</ParticlesContainer>;
};

const ParticlesContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
    z-index: 1;
`;

// Rain animation
const rainFall = (angle: number) => keyframes`
    0% {
        transform: translateY(-100vh) translateX(0) rotate(${angle}deg);
    }
    100% {
        transform: translateY(100vh) translateX(${angle * 2}px) rotate(${angle}deg);
    }
`;

const RainDrop = styled.div<{ $windSpeed: number; $angle: number }>`
    position: absolute;
    top: -10px;
    width: 2px;
    height: 20px;
    background: linear-gradient(
        to bottom,
        rgba(174, 194, 224, 0.1),
        rgba(174, 194, 224, 0.6)
    );
    border-radius: 50%;
    animation: ${props => rainFall(props.$angle)} linear infinite;
    transform-origin: center;
`;

// Snow animation
const snowFall = (windSpeed: number) => keyframes`
    0% {
        transform: translateY(-10px) translateX(0) rotate(0deg);
    }
    50% {
        transform: translateY(50vh) translateX(${windSpeed * 20}px) rotate(180deg);
    }
    100% {
        transform: translateY(100vh) translateX(${windSpeed * 10}px) rotate(360deg);
    }
`;

const SnowFlake = styled.div<{ $windSpeed: number }>`
    position: absolute;
    top: -10px;
    color: rgba(255, 255, 255, 0.8);
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
    animation: ${props => snowFall(props.$windSpeed)} linear infinite;
    
    &::before {
        content: '❄';
    }
`;

// Cloud animation
const cloudFloat = keyframes`
    0% {
        transform: translateX(-250px) translateY(0);
        opacity: 0;
    }
    5% {
        opacity: 1;
    }
    25% {
        transform: translateX(25vw) translateY(-5px);
    }
    50% {
        transform: translateX(50vw) translateY(5px);
    }
    75% {
        transform: translateX(75vw) translateY(-3px);
    }
    95% {
        opacity: 1;
    }
    100% {
        transform: translateX(calc(100vw + 250px)) translateY(0);
        opacity: 0;
    }
`;

const Cloud = styled.div<{ $windSpeed: number }>`
    position: absolute;
    left: 0;
    width: 200px;
    height: 60px;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 100px;
    animation: ${cloudFloat} linear infinite;
    filter: blur(25px);
    will-change: transform, opacity;
    
    &::before {
        content: '';
        position: absolute;
        top: -25px;
        left: var(--before-left, 50px);
        width: var(--before-size, 90px);
        height: var(--before-size, 90px);
        background: rgba(255, 255, 255, 0.4);
        border-radius: 50%;
    }
    
    &::after {
        content: '';
        position: absolute;
        top: -15px;
        right: var(--after-right, 50px);
        width: var(--after-size, 70px);
        height: var(--after-size, 70px);
        background: rgba(255, 255, 255, 0.4);
        border-radius: 50%;
    }

    @media (max-width: 768px) {
        transform: scale(0.7);
    }
`;

export default WeatherParticles;
