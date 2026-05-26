import React from 'react';
import { Twitter, Sparkles, Heart, Landmark, Globe } from 'lucide-react';
import { motion } from 'motion/react';

export default function StorySection() {
  return (
    <section id="story-section" className="relative px-4 py-20 bg-neutral-200">
      {/* Floating container card styled with large rounded edges matching Image 3 */}
      <div className="bg-white rounded-[40px] shadow-xl p-8 md:p-14 w-full max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-stretch">
          
          {/* Left Column Stack: story text boxes */}
          <div className="md:col-span-7 flex flex-col gap-4">
            
            {/* Primary blue bold highlight trigger */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-blue-600 rounded-3xl p-6 md:p-8 text-white flex flex-col justify-start items-start gap-4 shadow-md"
            >
              <h3 className="text-3xl md:text-4.5xl font-extrabold tracking-tight leading-tight leading-none">
                I coded <br />
                MiniTAP <br />
                in <span className="inline-block mt-1 font-black bg-neutral-950 text-white rounded-xl px-4 py-1 pb-2 shadow text-2xl md:text-3xl font-mono uppercase tracking-wide">26 hours</span>!
              </h3>
            </motion.div>

            {/* Sub content card */}
            <div className="bg-blue-600 rounded-3xl p-6 text-white text-sm md:text-base font-semibold leading-relaxed shadow-sm">
              I needed a fun and easy way to control 3D graphics in real time. So I challenged myself to code a Chrome Extension in 2 days.
            </div>

            {/* Sub content card 2 */}
            <div className="bg-blue-600 rounded-3xl p-6 text-white text-sm md:text-base font-semibold leading-relaxed shadow-sm">
              It ended up taking longer than expected. Development of the extension took 3 days. Design, documentation and promo stuff took a few days more.
            </div>

            {/* Sub content card 3 */}
            <div className="bg-blue-600 rounded-3xl p-6 text-white text-sm md:text-base font-semibold leading-relaxed shadow-sm">
              Ended up going from idea to release on Chrome Web Store completely alone. Looking forward to see what songs you make!
            </div>
          </div>

          {/* Right Column: Developer Profile Block */}
          <div className="md:col-span-5 flex flex-col items-center justify-center text-center p-6 bg-neutral-50 rounded-3xl border border-neutral-100/80 shadow-inner">
            
            {/* Smooth orange Squircle containing the vector portrait */}
            <div className="relative w-48 h-48 rounded-[48px] bg-amber-500 flex items-center justify-center p-4 shadow-md mb-6 overflow-hidden">
              {/* Radial gradient backing */}
              <div className="absolute inset-0 bg-radial from-amber-400 to-amber-600/80" />
              
              {/* Custom SVG illustration of yellow cute robot mascot with gloves peace sign */}
              <svg viewBox="0 0 160 160" className="w-[130px] h-[130px] relative z-10 select-none animate-float">
                {/* Antennas / Point on top of head */}
                <ellipse cx="80" cy="22" rx="6" ry="6" fill="#1e293b" />
                <path d="M80 22 C80 35, 80 40, 80 50" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
                
                {/* Ears */}
                <circle cx="45" cy="80" r="14" fill="#ffedd5" stroke="#ea580c" strokeWidth="2.5" />
                <circle cx="115" cy="80" r="14" fill="#ffedd5" stroke="#ea580c" strokeWidth="2.5" />
                
                {/* Head container */}
                <circle cx="80" cy="80" r="38" fill="#fef08a" stroke="#1e293b" strokeWidth="4" />
                
                {/* Inner Face glow */}
                <path d="M 50 82 A 30 30 0 0 1 110 82 Z" fill="#ffffff" opacity="0.1" />

                {/* Face headband gradient highlight */}
                <path d="M46 68 C60 58, 100 58, 114 68" fill="none" stroke="#ea580c" strokeWidth="3" />

                {/* Big expressive Anime-styled gaming fighter Eyes */}
                <g>
                  {/* Left Eye */}
                  <ellipse cx="66" cy="78" rx="8" ry="11" fill="#1e293b" />
                  <ellipse cx="64" cy="74" rx="3.5" ry="5.5" fill="#ffffff" />
                  <ellipse cx="68" cy="81" rx="1.5" ry="2" fill="#ffffff" />
                  {/* Left Fighter angry brow */}
                  <path d="M56 65 C62 64, 70 68, 74 72" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" fill="none" />

                  {/* Right Eye */}
                  <ellipse cx="94" cy="78" rx="8" ry="11" fill="#1e293b" />
                  <ellipse cx="92" cy="74" rx="3.5" ry="5.5" fill="#ffffff" />
                  <ellipse cx="96" cy="81" rx="1.5" ry="2" fill="#ffffff" />
                  {/* Right Fighter angry brow */}
                  <path d="M104 65 C98 64, 90 68, 86 72" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" fill="none" />
                </g>

                {/* Cheerful mouth & pink cheeks */}
                <g>
                  <circle cx="56" cy="86" r="4.5" fill="#f43f5e" opacity="0.4" />
                  <circle cx="104" cy="86" r="4.5" fill="#f43f5e" opacity="0.4" />
                  <path d="M75 88 Q80 93 85 88" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" fill="none" />
                </g>

                {/* Peace Sign White Glove rising from LHS */}
                <g transform="translate(10, 52)">
                  {/* Shadow */}
                  <circle cx="28" cy="38" r="8" fill="#1e293b" opacity="0.1" />
                  {/* Glove body */}
                  <path d="M20 30 Q30 24 35 34 T22 45 Z" fill="#ffffff" stroke="#1e293b" strokeWidth="3.5" />
                  {/* Victory fingers (V sign) */}
                  {/* Index finger */}
                  <rect x="23" y="6" width="7" height="20" rx="3.5" fill="#ffffff" stroke="#1e293b" strokeWidth="3.5" />
                  {/* Middle finger */}
                  <rect x="33" y="10" width="7" height="18" rx="3.5" fill="#ffffff" stroke="#1e293b" strokeWidth="3.5" />
                  {/* Wrist collar cuff */}
                  <ellipse cx="23" cy="38" rx="6" ry="3" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
                </g>
              </svg>
            </div>

            {/* Profile Info */}
            <h4 className="text-xl font-bold font-sans text-neutral-900 tracking-tight">
              Xavier (Jack)
            </h4>
            <span className="text-sm font-mono text-neutral-400 mt-1 block mb-5">
              @kmkota0
            </span>

            {/* Follow On X pill button */}
            <a
              href="https://x.com/kmkota0"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between gap-4 pl-3 pr-6 py-2 bg-neutral-950 hover:bg-neutral-900 text-white rounded-full font-black text-xs transition-with-all active:scale-95 shadow cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold group-hover:scale-105 transition-all">
                {/* Minimalist X/Twitter representation */}
                <Twitter className="w-3.5 h-3.5 fill-white stroke-none" />
              </div>
              <span className="tracking-wider uppercase">Follow on X</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
