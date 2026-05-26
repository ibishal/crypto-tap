import React from 'react';
import { ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';
import FloatingBubbles from './FloatingBubbles';

export default function HeroSection() {
  return (
    <section
      id="hero-top"
      className="relative min-h-screen pt-28 pb-12 flex flex-col items-center justify-center text-center overflow-hidden px-4 bg-neutral-200"
    >
      {/* Dynamic drifting background balls (Floating bubbles) */}
      <FloatingBubbles />

      {/* Decorative large visual container matching minitap */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-6 mt-6 md:mt-10 relative z-10">
        
        {/* Massive custom-designed MiniTAP vector logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative inline-block w-full max-w-lg md:max-w-xl px-4"
        >
          {/* SVG representing exact typography curve style of 'minitap' with fat geometric shapes */}
          <svg
            viewBox="0 0 440 160"
            className="w-full h-auto filter drop-shadow-sm select-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Custom mathematically perfect geometric shapes for "minitap" */}
            <g fill="#09090b">
              {/* letter 'm' - thick rounded merging pillars */}
              <rect x="10" y="44" width="20" height="66" rx="10" />
              <rect x="42" y="44" width="20" height="66" rx="10" />
              <rect x="74" y="44" width="20" height="66" rx="10" />
              <rect x="10" y="44" width="52" height="20" rx="10" />
              <rect x="42" y="44" width="52" height="20" rx="10" />
              
              {/* letter 'i' - thick pill body and circle top */}
              <circle cx="112" cy="22" r="10" />
              <rect x="102" y="44" width="20" height="66" rx="10" />
              
              {/* letter 'n' - thick round arch */}
              <rect x="132" y="44" width="20" height="66" rx="10" />
              <rect x="164" y="44" width="20" height="66" rx="10" />
              <rect x="132" y="44" width="52" height="20" rx="10" />
              
              {/* letter 'i' - thick pill body and circle top */}
              <circle cx="202" cy="22" r="10" />
              <rect x="192" y="44" width="20" height="66" rx="10" />
              
              {/* letter 't' - curved bottom with sleek bar */}
              <rect x="218" y="44" width="48" height="20" rx="10" />
              <rect x="230" y="24" width="20" height="70" rx="10" />
              <path d="M230 24 h20 v60 a16 16 0 0 0 16 16 h4 v20 h-6 a36 36 0 0 1-34 -36 Z" />
              
              {/* letter 'a' - elegant chubby ball with straight right stem */}
              <circle cx="295" cy="77" r="23" fill="none" stroke="#09090b" strokeWidth="20" />
              <rect x="305" y="44" width="20" height="66" rx="10" />
              
              {/* letter 'p' - vertical left stem with a beautiful round loop */}
              <rect x="342" y="44" width="20" height="86" rx="10" />
              <circle cx="372" cy="74" r="23" fill="none" stroke="#09090b" strokeWidth="20" />
            </g>

            {/* Sparkle explosion element (8-pointed star on the tip of the 'p' letter body) */}
            <g transform="translate(395, 51)" fill="#09090b" className="animate-pulse">
              {/* Beautiful custom-proportioned 8-point sparkle design */}
              <path d="M 0,-24 C 1.2,-9 9,-1.2 24,0 C 9,1.2 1.2,9 0,24 C -1.2,9 -9,1.2 -24,0 C -9,-1.2 -1.2,-9 0,-24 Z" />
              {/* Center glow light */}
              <circle cx="0" cy="0" r="3" fill="#ffffff" />
            </g>
          </svg>
        </motion.div>

        {/* Subtitle wording exactly matching description */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-4xl md:text-6xl lg:text-7.5xl font-black text-neutral-950 tracking-tighter leading-[1.08] font-sans max-w-3xl px-2"
        >
          A fun sequencer for the web <br />
          <span className="text-neutral-500 font-bold block mt-1.5">that runs as a browser extension.</span>
        </motion.h1>

        {/* Interactive primary action: Install extension button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-2"
        >
          <a
            href="#learn-section"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('learn-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group flex items-center justify-between gap-5 pl-3 pr-6 py-2.5 bg-neutral-950 text-white rounded-full font-black text-sm hover:bg-neutral-900 transition-all shadow-lg hover:shadow-xl active:scale-98 cursor-pointer relative z-10"
          >
            {/* Download Icon circle nested */}
            <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white text-bold group-hover:scale-105 transition-all">
              <ArrowDown className="w-5 h-5 stroke-[3px]" />
            </div>
            <span className="tracking-wide">Install extension</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

