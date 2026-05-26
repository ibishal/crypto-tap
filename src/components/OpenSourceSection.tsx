import React from 'react';
import { Github, Code } from 'lucide-react';
import { motion } from 'motion/react';

export default function OpenSourceSection() {
  return (
    <section
      id="open-source-promo"
      className="relative checkerboard-pattern min-h-[440px] py-16 flex flex-col items-center justify-center text-center overflow-hidden px-4"
    >
      {/* Container spacing */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-6">
        
        {/* Sub title */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white text-3xl md:text-4.5xl font-extrabold tracking-tight font-sans drop-shadow-md"
        >
          One more thing...
        </motion.p>

        {/* The massive iconic capsule block */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-neutral-950 px-12 py-5 rounded-[40px] md:py-6 shadow-2xl border-2 border-neutral-900 inline-block max-w-full hover:scale-[1.02] transition-transform duration-300"
        >
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase font-display leading-tight">
            It's Open Source!
          </h2>
        </motion.div>

        {/* View on GitHub button pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-4"
        >
          <a
            href="https://github.com/kmkota0/minitap"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between gap-4 pl-3.5 pr-7 py-2.5 bg-white text-neutral-950 rounded-full font-black text-sm hover:bg-neutral-50 transition-all shadow-xl active:scale-98 cursor-pointer"
          >
            {/* Custom rounded blue gradient frame for GitHub icon */}
            <div className="w-8.5 h-8.5 rounded-full bg-blue-500 flex items-center justify-center text-white text-bold group-hover:scale-105 transition-all">
              <Github className="w-4.5 h-4.5 stroke-[2.5px] fill-current" />
            </div>
            <span className="tracking-wide text-neutral-900 font-bold">View on Github</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
