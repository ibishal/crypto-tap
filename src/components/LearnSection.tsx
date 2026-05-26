import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { audioSynth } from '../utils/audio';

interface LearnSectionProps {
  onVirtualKeyPress?: (key: string) => void;
  lastPressedKey?: string | null;
}

export default function LearnSection({ onVirtualKeyPress, lastPressedKey }: LearnSectionProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeKeys, setActiveKeys] = useState<Record<string, boolean>>({});

  // Synchronize external keyboard triggers with on-screen depression animations
  useEffect(() => {
    if (lastPressedKey) {
      const k = lastPressedKey.toUpperCase();
      setActiveKeys((prev) => ({ ...prev, [k]: true }));
      const timer = setTimeout(() => {
        setActiveKeys((prev) => ({ ...prev, [k]: false }));
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [lastPressedKey]);

  const handleKeyClick = (keyChar: string) => {
    const k = keyChar.toUpperCase();
    if (['A', 'S', 'D', 'F', 'H', 'J', 'K', 'L'].includes(k)) {
      audioSynth.playChannel(k);
      setActiveKeys((prev) => ({ ...prev, [k]: true }));
      setTimeout(() => {
        setActiveKeys((prev) => ({ ...prev, [k]: false }));
      }, 150);
      if (onVirtualKeyPress) {
        onVirtualKeyPress(k);
      }
    }
  };

  // Keyboard layout matrices
  const row1 = [
    { label: '±\n§', val: '§' },
    { label: '!\n1', val: '1' },
    { label: '@\n2', val: '2' },
    { label: '#\n3', val: '3' },
    { label: '$\n4', val: '4' },
    { label: '%\n5', val: '5' },
    { label: '^\n6', val: '6' },
    { label: '&\n7', val: '7' },
    { label: '*\n8', val: '8' },
    { label: '(\n9', val: '9' },
    { label: ')\n0', val: '0' },
    { label: '_\n-', val: '-' },
    { label: '+\n=', val: '=' },
    { label: '⌫\ndelete', val: 'delete', wide: true },
  ];

  const row2 = [
    { label: '⇥\ntab', val: 'tab', wide: true },
    { label: 'Q', val: 'Q' },
    { label: 'W', val: 'W' },
    { label: 'E', val: 'E' },
    { label: 'R', val: 'R' },
    { label: 'T', val: 'T' },
    { label: 'Y', val: 'Y' },
    { label: 'U', val: 'U' },
    { label: 'I', val: 'I' },
    { label: 'O', val: 'O' },
    { label: 'P', val: 'P' },
    { label: '{\n[', val: '[' },
    { label: '}\n]', val: ']' },
    { label: '↵\nenter', val: 'enter', wide: true },
  ];

  const row3 = [
    { label: '⇪\ncaps', val: 'caps', wide: true },
    { label: 'A', val: 'A', dot: { id: 1, color: 'bg-emerald-500' } },
    { label: 'S', val: 'S', dot: { id: 2, color: 'bg-emerald-500' } },
    { label: 'D', val: 'D', dot: { id: 3, color: 'bg-orange-500' } },
    { label: 'F', val: 'F', dot: { id: 4, color: 'bg-orange-500' } },
    { label: 'G', val: 'G' },
    { label: 'H', val: 'H', dot: { id: 5, color: 'bg-sky-500' } },
    { label: 'J', val: 'J', dot: { id: 6, color: 'bg-sky-500' } },
    { label: 'K', val: 'K', dot: { id: 7, color: 'bg-red-500 opacity-60' } },
    { label: 'L', val: 'L', dot: { id: 8, color: 'bg-red-500' } },
    { label: ':\n;', val: ';' },
    { label: '"\n\'', val: "'" },
    { label: '|\n\\', val: '\\' },
    { label: '⇧\nshift', val: 'shift', wide: true },
  ];

  return (
    <section id="learn-section" className="relative px-4 py-16 bg-neutral-200">
      {/* Curved high-contrast layout card box matching Image 2 */}
      <div className="bg-white rounded-[40px] shadow-xl p-8 md:p-14 w-full max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Title block */}
        <h2 className="text-4xl md:text-5.5xl font-extrabold text-neutral-950 tracking-tight font-sans text-center mb-6">
          MiniTAP in 30sec.
        </h2>

        {/* Video button action */}
        <button
          onClick={() => setIsVideoOpen(true)}
          className="group flex items-center justify-between gap-4 pl-3.5 pr-6 py-2 bg-neutral-950 hover:bg-neutral-900 text-white rounded-full font-black text-sm transition-all shadow-md active:scale-95 mb-14 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-bold group-hover:scale-105 transition-all">
            <Play className="w-4 h-4 fill-white ml-0.5" />
          </div>
          <span className="tracking-wide">Watch intro video</span>
        </button>

        {/* Interactive Keyboard Layout */}
        <div className="w-full max-w-4xl bg-neutral-100/90 border border-neutral-200 rounded-3xl p-4 md:p-6 shadow-inner overflow-x-auto">
          <div className="min-w-[760px] flex flex-col gap-2 font-sans select-none">
            
            {/* Row 1 */}
            <div className="flex gap-1.5 justify-center">
              {row1.map((k, idx) => (
                <div
                  key={idx}
                  className={`relative h-12 bg-white rounded-lg border border-neutral-200 flex flex-col justify-center items-center text-center text-[10px] font-medium text-neutral-600 shadow-sm ${
                    k.wide ? 'flex-[1.8] min-w-[70px]' : 'w-11'
                  }`}
                >
                  <span className="whitespace-pre-line leading-tight">{k.label}</span>
                </div>
              ))}
            </div>

            {/* Row 2 */}
            <div className="flex gap-1.5 justify-center">
              {row2.map((k, idx) => (
                <div
                  key={idx}
                  className={`relative h-12 bg-white rounded-lg border border-neutral-200 flex flex-col justify-center items-center text-center text-[11px] font-semibold text-neutral-700 shadow-sm ${
                    k.wide ? 'flex-[1.8] min-w-[70px]' : 'w-11'
                  }`}
                >
                  <span className="whitespace-pre-line leading-tight">{k.label}</span>
                </div>
              ))}
            </div>

            {/* Row 3 - The Active Interactive Sequencer triggers row */}
            <div className="flex gap-1.5 justify-center">
              {row3.map((k, idx) => {
                const isTrigger = ['A', 'S', 'D', 'F', 'H', 'J', 'K', 'L'].includes(k.val);
                const isPressed = activeKeys[k.val];
                return (
                  <button
                    key={idx}
                    onClick={() => handleKeyClick(k.val)}
                    disabled={k.wide}
                    className={`relative h-12 rounded-lg border transition-all flex flex-col justify-center items-center text-center text-xs font-bold shadow-sm ${
                      k.wide
                        ? 'flex-[2.1] min-w-[80px] bg-white border-neutral-200 text-neutral-500 font-medium'
                        : isTrigger
                        ? `w-11 cursor-pointer hover:border-neutral-400 ${
                            isPressed
                              ? 'bg-neutral-900 border-neutral-950 text-white scale-[0.94] translate-y-[2px] shadow-inner'
                              : 'bg-white border-neutral-200 text-neutral-800'
                          }`
                        : 'w-11 bg-white border-neutral-200 text-neutral-400'
                    }`}
                  >
                    {/* Small colored sequential dot exactly matching Image 2 */}
                    {k.dot && (
                      <div className="absolute top-1 left-1.5 flex items-center justify-center">
                        <span
                          className={`w-4 h-4 rounded-full text-[8.5px] font-black text-white flex items-center justify-center transform scale-90 ${k.dot.color}`}
                        >
                          {k.dot.id}
                        </span>
                      </div>
                    )}
                    <span className="mt-2.5 whitespace-pre-line leading-tight">{k.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="text-center mt-5 text-neutral-500 text-xs font-mono font-medium">
            💡 Press <span className="px-1.5 py-0.5 bg-neutral-200 rounded text-neutral-700">A, S, D, F, H, J, K, L</span> on your keyboard to triggers real synthesizer sounds live!
          </div>
        </div>
      </div>

      {/* Retro watch intro video mockup modal popup */}
      <AnimatePresence>
        {isVideoOpen && (
          <div className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full border border-neutral-100"
            >
              <div className="bg-neutral-950 p-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-xs font-mono font-bold tracking-wider text-neutral-400 uppercase">
                    MiniTAP Overview Video Player
                  </span>
                </div>
                <button
                  onClick={() => setIsVideoOpen(false)}
                  className="text-xs uppercase font-mono px-2 py-1 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded cursor-pointer font-bold"
                >
                  Close
                </button>
              </div>

              {/* Synthetic Video / Graphic Tutorial Screen */}
              <div className="aspect-video bg-neutral-100 flex flex-col justify-center items-center text-center p-8 relative">
                <div className="w-16 h-16 rounded-full bg-zinc-950 flex items-center justify-center text-white mb-4 animate-float">
                  <Play className="w-8 h-8 fill-white ml-1" />
                </div>
                <h3 className="text-2xl font-black text-neutral-900 tracking-tight font-display mb-2">
                  How does MiniTAP work?
                </h3>
                <p className="text-sm text-neutral-600 max-w-md leading-relaxed">
                  Pressing keys triggers individual audio channels or records step patterns live. It synchronizes automatically with high-contrast web animations via a Chrome extension. Play notes to create dynamic custom rhythms instantly!
                </p>

                {/* Overlay details */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-white/70 backdrop-blur border border-neutral-200/50 rounded-xl px-4 py-2.5 text-xs text-neutral-600 font-mono font-medium">
                  <span>🔊 Output: Digital Pluck Synthesizer</span>
                  <span>⏱️ Length: 30 Seconds</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
