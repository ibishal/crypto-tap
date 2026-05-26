import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Activity, HelpCircle, Volume2, Plus, Minus, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CardConfig, ChannelKey } from '../types';
import { audioSynth } from '../utils/audio';

interface SequencerProps {
  onKeyPressAction?: (key: string) => void;
}

export default function SequencerDeck({ onKeyPressAction }: SequencerProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [bpm, setBpm] = useState<number>(100);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [activePressedKey, setActivePressedKey] = useState<string | null>(null);

  // Initial config representing minitap.io sequencer channels
  const [cards, setCards] = useState<Record<ChannelKey, CardConfig>>({
    A: {
      id: 1,
      key: 'A',
      title: 'Flash',
      color: 'brand-green',
      type: 'dots',
      steps: [true, false, false, false, true, false, false, false],
      unlocked: true,
    },
    S: {
      id: 2,
      key: 'S',
      title: 'Spawn',
      color: 'brand-green',
      type: 'radar',
      steps: [false, true, false, true, false, true, false, true],
      radarPoints: [
        { id: 1, x: 20, y: 15, intensity: 0.8 },
        { id: 2, x: 45, y: 35, intensity: 0.5 },
        { id: 3, x: 10, y: 40, intensity: 0.9 },
        { id: 4, x: 35, y: 10, intensity: 0.4 },
      ],
      sliderVal: 12,
      unlocked: true,
    },
    D: {
      id: 3,
      key: 'D',
      title: 'Fwd',
      color: 'brand-orange',
      type: 'key',
      steps: [false, true, false, false, false, true, false, false],
      unlocked: true,
    },
    F: {
      id: 4,
      key: 'F',
      title: 'Bwd',
      color: 'brand-orange',
      type: 'key',
      steps: [false, false, true, false, false, false, true, false],
      unlocked: true,
    },
    H: {
      id: 5,
      key: 'H',
      title: 'Pixel',
      color: 'brand-blue',
      type: 'dots',
      steps: [false, false, true, false, false, false, true, false],
      unlocked: true,
    },
    J: {
      id: 6,
      key: 'J',
      title: 'PixelXL',
      color: 'brand-blue',
      type: 'key',
      steps: [true, false, false, false, false, false, false, true],
      unlocked: true,
    },
    K: {
      id: 7,
      key: 'K',
      title: 'Chime',
      color: 'brand-red',
      type: 'disabled',
      steps: [false, false, false, false, false, false, false, false],
      unlocked: false, // Start locked, can be clicked to unlock!
    },
    L: {
      id: 8,
      key: 'L',
      title: 'Trails',
      color: 'brand-red',
      type: 'radar',
      steps: [true, false, true, false, true, false, true, false],
      radarPoints: [
        { id: 1, x: 15, y: 25, intensity: 0.8 },
        { id: 2, x: 30, y: 15, intensity: 0.7 },
        { id: 3, x: 40, y: 45, intensity: 0.9 },
      ],
      sliderVal: 8,
      unlocked: true,
    },
  });

  const lastTapRef = useRef<number>(0);
  const stepIntervalRef = useRef<any>(null);

  // Play sequencer sound representing current active steps at the current step index
  useEffect(() => {
    if (!isPlaying) return;

    // Trigger sounds for active notes on the current step
    Object.keys(cards).forEach((key) => {
      const card = cards[key as ChannelKey];
      if (card.unlocked && card.steps[currentStep]) {
        audioSynth.playChannel(card.key);
      }
    });
  }, [currentStep, isPlaying, cards]);

  // Handle Metronome Step Interval
  useEffect(() => {
    if (stepIntervalRef.current) {
      clearInterval(stepIntervalRef.current);
    }

    if (!isPlaying) return;

    // Convert BPM to step size in milliseconds (e.g. at 100bpm, quarter note is 600ms)
    // We treat steps as 1/8 notes, so half of quarter note = 300ms
    const stepDurationMs = (60 / bpm / 2) * 1000;

    stepIntervalRef.current = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 8);
    }, stepDurationMs);

    return () => {
      if (stepIntervalRef.current) {
        clearInterval(stepIntervalRef.current);
      }
    };
  }, [isPlaying, bpm]);

  // Keyboard Event Handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toUpperCase();
      if (['A', 'S', 'D', 'F', 'H', 'J', 'K', 'L'].includes(k)) {
        // Trigger key animation and sound
        audioSynth.playChannel(k);
        setActivePressedKey(k);
        if (onKeyPressAction) {
          onKeyPressAction(k);
        }

        // Toggles step overlay highlight briefly
        setTimeout(() => {
          setActivePressedKey((prev) => (prev === k ? null : prev));
        }, 150);
      } else if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onKeyPressAction]);

  // Tap Tempo calculation
  const handleTapTempo = () => {
    const now = Date.now();
    if (lastTapRef.current > 0) {
      const diff = now - lastTapRef.current;
      if (diff < 2000 && diff > 150) {
        // Convert interval to BPM
        const computedBpm = Math.round(60000 / diff);
        if (computedBpm >= 40 && computedBpm <= 240) {
          setBpm(computedBpm);
        }
      }
    }
    lastTapRef.current = now;
    audioSynth.playChannel('h'); // Fun light woodblock-like tap audio feedback!
  };

  const toggleStep = (channelKey: ChannelKey, stepIdx: number) => {
    setCards((prev) => {
      const card = prev[channelKey];
      const updatedSteps = [...card.steps];
      updatedSteps[stepIdx] = !updatedSteps[stepIdx];
      return {
        ...prev,
        [channelKey]: {
          ...card,
          steps: updatedSteps,
        },
      };
    });
    audioSynth.playChannel(channelKey);
  };

  const setRadarVal = (channelKey: ChannelKey, val: number) => {
    setCards((prev) => ({
      ...prev,
      [channelKey]: {
        ...prev[channelKey],
        sliderVal: val,
      },
    }));
  };

  const unlockCard = (channelKey: ChannelKey) => {
    setCards((prev) => ({
      ...prev,
      [channelKey]: {
        ...prev[channelKey],
        unlocked: true,
        type: 'key', // Unlocks it as a simple chord key
      },
    }));
    audioSynth.playChannel(channelKey);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 z-40">
      {/* Small floating prompt arrow shown in real site header */}
      <div className="flex justify-start pl-6 mb-2">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="flex flex-col items-center cursor-default opacity-85"
        >
          <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 font-bold mb-1">
            Playable sequencer deck
          </span>
          <svg
            className="w-5 h-5 text-neutral-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>

      {/* Main Glassmorphic Sequencer Loop Shell */}
      <div
        id="mini-sequencer"
        className="bg-neutral-950/95 border-2 border-neutral-900 shadow-2xl rounded-3xl p-4 md:p-5 flex flex-col md:flex-row items-stretch gap-4 overflow-x-auto w-full transition-all duration-300"
      >
        {/* Left Side Metronome Station */}
        <div className="flex md:flex-col items-center justify-between min-w-[130px] md:w-32 bg-neutral-900 border border-neutral-800 rounded-2xl p-4 gap-4">
          {/* Play Trigger */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            id="play-sequencer-btn"
            className={`w-14 h-14 rounded-full flex flex-col items-center justify-center transition-all cursor-pointer ${
              isPlaying
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
            }`}
          >
            {isPlaying ? (
              <>
                <Square className="w-5 h-5 fill-white" />
                <span className="text-[8px] tracking-wider font-mono uppercase font-bold mt-1">PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-6 h-6 fill-white ml-0.5" />
                <span className="text-[8px] tracking-wider font-mono uppercase font-bold mt-1">PLAY</span>
              </>
            )}
          </button>

          {/* BPM Meter Reader */}
          <div className="flex flex-col items-center mt-1">
            <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase font-black">
              TEMPO
            </span>
            <div className="flex items-center gap-1 mt-1 text-white">
              <button
                onClick={() => setBpm((b) => Math.max(60, b - 5))}
                className="w-5 h-5 bg-neutral-800 rounded flex items-center justify-center hover:bg-neutral-700 active:scale-95 cursor-pointer text-xs font-bold"
              >
                -
              </button>
              <span className="text-xl font-bold font-mono tracking-tight text-neutral-100 min-w-[36px] text-center">
                {bpm}
              </span>
              <button
                onClick={() => setBpm((b) => Math.min(240, b + 5))}
                className="w-5 h-5 bg-neutral-800 rounded flex items-center justify-center hover:bg-neutral-700 active:scale-95 cursor-pointer text-xs font-bold"
              >
                +
              </button>
            </div>
            <span className="text-[9px] text-neutral-400 font-mono mt-0.5">BPM</span>
          </div>

          {/* Grid Multiplier Indicator */}
          <div className="flex items-center gap-2 px-2.5 py-1 bg-neutral-950 border border-neutral-800/80 rounded font-mono text-[10px] text-neutral-400 font-bold uppercase">
            <span>GRID:</span>
            <span className="text-emerald-400">1/4</span>
          </div>

          {/* TAP Green Button */}
          <button
            onClick={handleTapTempo}
            id="tap-tempo-btn"
            className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-sans font-black text-xs uppercase tracking-wide flex items-center justify-center active:scale-95 transition-all cursor-pointer shadow-md shadow-emerald-500/20"
          >
            TAP
          </button>
        </div>

        {/* Channels Columns */}
        <div className="flex flex-1 items-stretch gap-3 overflow-x-auto py-1 scrollbar-thin select-none">
          {(Object.keys(cards) as ChannelKey[]).map((key) => {
            const card = cards[key];
            const isNoteActiveThisStep = isPlaying && card.unlocked && card.steps[currentStep];
            const isKeyPressedNow = activePressedKey === key;

            return (
              <motion.div
                key={card.key}
                onClick={() => {
                  if (!card.unlocked) {
                    unlockCard(key);
                  } else {
                    audioSynth.playChannel(key);
                    setActivePressedKey(key);
                    if (onKeyPressAction) onKeyPressAction(key);
                    setTimeout(() => setActivePressedKey(null), 150);
                  }
                }}
                className={`relative rounded-2xl h-48 w-36 min-w-[136px] p-3 border cursor-pointer select-none transition-all flex flex-col justify-between ${
                  !card.unlocked
                    ? 'bg-neutral-900/30 border-dashed border-neutral-800 opacity-60 hover:opacity-90 justify-center items-center'
                    : isKeyPressedNow
                    ? 'bg-neutral-800 border-yellow-400 shadow-xl shadow-yellow-400/10 scale-[0.98]'
                    : isNoteActiveThisStep
                    ? 'bg-neutral-900 border-neutral-700 ring-2 ring-emerald-500/30'
                    : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
                }`}
                whileTap={{ scale: 0.96 }}
              >
                {/* Header channel key & wave signals */}
                {card.unlocked ? (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-neutral-950 ${
                            card.color === 'brand-green'
                              ? 'bg-emerald-400'
                              : card.color === 'brand-blue'
                              ? 'bg-sky-400'
                              : card.color === 'brand-orange'
                              ? 'bg-orange-400'
                              : 'bg-red-400'
                          }`}
                        >
                          {card.id}
                        </span>
                        <span className="px-2 py-0.5 bg-neutral-800 border border-neutral-700 text-neutral-200 text-[10px] rounded font-bold font-mono">
                          {card.key}
                        </span>
                      </div>

                      {/* Small visual icons matching standard look */}
                      <div className="flex items-center gap-1 text-neutral-500">
                        <Activity className="w-3.5 h-3.5" />
                        <Volume2 className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Channel Title Name */}
                    <div className="mt-1">
                      <h4 className="text-sm font-bold text-neutral-100 tracking-tight">
                        {card.title}
                      </h4>
                    </div>

                    {/* Interface Layouts per Channel Type */}
                    {card.type === 'dots' && (
                      <div className="mt-3 flex flex-col gap-2">
                        {/* 8 trigger dots */}
                        <div className="grid grid-cols-4 gap-1.5 p-1.5 bg-neutral-950/80 rounded-xl border border-neutral-800/60">
                          {card.steps.map((stepActive, idx) => {
                            const isTick = isPlaying && currentStep === idx;
                            return (
                              <button
                                key={idx}
                                onClick={(e) => {
                                  e.stopPropagation(); // prevent card-wide play trigger
                                  toggleStep(key, idx);
                                }}
                                className={`h-6 rounded flex items-center justify-center transition-all ${
                                  stepActive
                                    ? card.color === 'brand-green'
                                      ? 'bg-emerald-500 text-neutral-950 shadow-sm shadow-emerald-500/20'
                                      : 'bg-sky-500 text-neutral-950 shadow-sm shadow-sky-500/20'
                                    : 'bg-neutral-800/80 hover:bg-neutral-700/80 text-neutral-600'
                                } ${isTick ? 'ring-2 ring-white/70' : ''}`}
                              >
                                <div
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    stepActive ? 'bg-white' : 'bg-neutral-500'
                                  }`}
                                />
                              </button>
                            );
                          })}
                        </div>
                        {/* mini active step line */}
                        <div className="flex justify-between px-1.5 text-[8px] font-mono text-neutral-500 font-bold">
                          <span>1-4</span>
                          <span>5-8</span>
                        </div>
                      </div>
                    )}

                    {card.type === 'radar' && (
                      <div className="mt-2 flex flex-col items-center">
                        {/* SVG Radar animation */}
                        <div className="relative w-16 h-16 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center overflow-hidden">
                          {/* Radial sweeping line line */}
                          <div
                            className={`absolute inset-0 origin-center animate-scan border-r ${
                              card.color === 'brand-green'
                                ? 'border-emerald-500/40 bg-gradient-to-l from-emerald-500/5 to-transparent'
                                : 'border-red-500/40 bg-gradient-to-l from-red-500/5 to-transparent'
                            }`}
                          />
                          {/* Radar coordinates cross */}
                          <div className="absolute w-full h-[0.5px] bg-neutral-800/50" />
                          <div className="absolute h-full w-[0.5px] bg-neutral-800/50" />
                          {/* Circle rings */}
                          <div className="absolute w-10 h-10 rounded-full border border-neutral-900/80" />

                          {/* Green or Red static coordinates dots */}
                          {card.radarPoints?.map((pt) => (
                            <div
                              key={pt.id}
                              className={`absolute w-1.5 h-1.5 rounded-full animate-ping ${
                                card.color === 'brand-green'
                                  ? 'bg-emerald-400'
                                  : 'bg-red-400 animate-pulse'
                              }`}
                              style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
                            />
                          ))}
                        </div>

                        {/* Slider value knob display */}
                        <div className="w-full flex items-center justify-between gap-2 mt-2 px-1">
                          <span className="text-[10px] font-mono text-neutral-400 font-bold">
                            {card.sliderVal || 0}
                          </span>
                          <input
                            type="range"
                            min="2"
                            max="20"
                            value={card.sliderVal || 10}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              e.stopPropagation();
                              setRadarVal(key, parseInt(e.target.value));
                            }}
                            className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-neutral-300"
                          />
                        </div>
                      </div>
                    )}

                    {card.type === 'key' && (
                      <div className="mt-4 flex flex-col justify-end items-center flex-1 w-full pb-1">
                        {/* Large character button representing triggers */}
                        <div className="w-14 h-14 rounded-xl bg-neutral-950 border-2 border-neutral-800 flex items-center justify-center font-black font-mono text-xl text-neutral-400 shadow-inner group-hover:text-white">
                          {card.key}
                        </div>
                        <span className="text-[8px] font-mono tracking-widest text-neutral-500 uppercase font-black mt-2">
                          TAP DIRECTLY
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  // Locked State Screen
                  <div className="flex flex-col items-center justify-center text-center p-3">
                    <span className="w-8 h-8 rounded-full bg-neutral-800/80 flex items-center justify-center text-sm font-bold text-neutral-400 font-mono mb-2">
                      {card.key}
                    </span>
                    <span className="text-xs font-bold font-display text-neutral-400 block mb-1">
                      Chime Locked
                    </span>
                    <p className="text-[9px] text-neutral-500 leading-normal mb-2.5">
                      Press K or click to configure channel trigger!
                    </p>
                    <button className="px-3 py-1 bg-sky-500 text-neutral-950 rounded-full font-black text-[9px] tracking-wider uppercase shadow-md shadow-sky-500/10 hover:bg-sky-400 transition-all cursor-pointer">
                      UNLOCK
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
