import React from 'react';
import { motion } from 'motion/react';

interface Bubble {
  id: number;
  size: number;
  x: string;
  y: string;
  duration: number;
  delay: number;
  opacity: number;
}

export default function FloatingBubbles() {
  const bubbles: Bubble[] = [
    { id: 1, size: 520, x: '-8%', y: '5%', duration: 40, delay: 0, opacity: 0.95 },
    { id: 2, size: 420, x: '42%', y: '-12%', duration: 35, delay: 2, opacity: 0.95 },
    { id: 3, size: 480, x: '68%', y: '15%', duration: 45, delay: 1, opacity: 0.9 },
    { id: 4, size: 340, x: '18%', y: '38%', duration: 32, delay: 3, opacity: 0.95 },
    { id: 5, size: 380, x: '-12%', y: '60%', duration: 48, delay: 4, opacity: 0.9 },
    { id: 6, size: 500, x: '58%', y: '55%', duration: 42, delay: 0, opacity: 0.95 },
    { id: 7, size: 310, x: '82%', y: '3%', duration: 28, delay: 5, opacity: 0.95 },
    { id: 8, size: 440, x: '32%', y: '15%', duration: 38, delay: 1.5, opacity: 0.92 },
    { id: 9, size: 360, x: '12%', y: '-8%', duration: 34, delay: 3.5, opacity: 0.9 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-neutral-100">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full bg-white"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: bubble.x,
            top: bubble.y,
            opacity: bubble.opacity,
          }}
          animate={{
            x: [0, 50, -35, 25, 0],
            y: [0, -45, 30, -25, 0],
            scale: [1, 1.05, 0.96, 1.02, 1],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
