import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SupportDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportDialog({ isOpen, onClose }: SupportDialogProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !msg) return;

    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      // Reset after success
      setTimeout(() => {
        setName('');
        setEmail('');
        setMsg('');
        setStatus('idle');
        onClose();
      }, 2000);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-white rounded-[32px] overflow-hidden max-w-md w-full shadow-2xl border border-neutral-100/90"
          >
            {/* Header banner */}
            <div className="bg-neutral-950 p-5 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-sm font-mono uppercase tracking-wider font-bold text-neutral-300">
                  MiniTAP Support Desk
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Inner Content form */}
            <div className="p-6 md:p-8">
              {status === 'success' ? (
                <div className="py-8 flex flex-col items-center justify-center text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4 animate-bounce">
                    <Check className="w-8 h-8 stroke-[3px]" />
                  </div>
                  <h4 className="text-xl font-bold font-display text-neutral-900">
                    Message Transmitted!
                  </h4>
                  <p className="text-xs text-neutral-500 mt-2 max-w-xs leading-relaxed">
                    Thank you! Xavier (Jack) and the Desktop.fm team will explore your request and write back shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-[10px] font-mono tracking-wider text-neutral-400 uppercase font-black mb-1.5ClassName">
                      Developer / Musician Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Jack"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-neutral-50 hover:bg-neutral-100/50 focus:bg-white px-4 py-2.5 rounded-xl border border-neutral-200 outline-none text-sm text-neutral-800 font-sans transition-all focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono tracking-wider text-neutral-400 uppercase font-black mb-1.5">
                      Your Email (Required)
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. musician@minitap.io"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-neutral-50 hover:bg-neutral-100/50 focus:bg-white px-4 py-2.5 rounded-xl border border-neutral-200 outline-none text-sm text-neutral-800 font-sans transition-all focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono tracking-wider text-neutral-400 uppercase font-black mb-1.5">
                      How can we help? (Bug / Sound Request)
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe your suggestion: new synth channel types, layout feedback, or support queries..."
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                      className="w-full bg-neutral-50 hover:bg-neutral-100/50 focus:bg-white px-4 py-2.5 rounded-xl border border-neutral-200 outline-none text-sm text-neutral-800 font-sans transition-all focus:ring-2 focus:ring-blue-500/20 resize-none leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full mt-2 py-3 bg-neutral-950 hover:bg-neutral-900 text-white rounded-full font-black text-xs uppercase tracking-widest flex items-center justify-center transition-all disabled:opacity-50 cursor-pointer shadow-md"
                  >
                    {status === 'sending' ? 'Transmitting message...' : 'Transmit message'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
