import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 py-10 px-4 text-center text-neutral-500">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Side: Brand Trademark label */}
        <div className="flex items-center gap-2.5 justify-center md:justify-start">
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-black">
            <svg className="w-3.5 h-3.5 text-neutral-950 fill-current" viewBox="0 0 24 24">
              <path d="M12 2c-5.522 0-10 4.477-10 10s4.478 10 10 10 10-4.477 10-10-4.478-10-10-10zm2 14.5c0 .276-.224.5-.5.5h-3c-.276 0-.5-.224-.5-.5v-1c0-.276.224-.5.5-.5h3c.276 0 .5.224.5.5v1zm2.39-4.834l-.707.707c-.195.195-.512.195-.707 0l-.707-.707c-.195-.195-.195-.512 0-.707.195-.195.512-.195.707 0l.707.707c.195.195.195.512 0 .707zm-1.89-2.166c-.276 0-.5-.224-.5-.5v-1c0-.276.224-.5.5-.5h1c.276 0 .5.224.5.5v1c0 .276-.224.5-.5.5h-1zm.39 5.834c-.195.195-.512.195-.707 0l-.707-.707c-.195-.195-.195-.512 0-.707.195-.195.512-.195.707 0l.707.707c.195.195.195.512 0 .707zm-4.39-3.334c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm.5-4.5c0-.276-.224-.5-.5-.5h-1c-.276 0-.5.224-.5.5v1c0 .276.224.5.5.5h1c.276 0 .5-.224.5-.5v-1zm-4.39 3.334c-.195.195-.512.195-.707 0l-.707-.707c-.195-.195-.195-.512 0-.707.195-.195.512-.195.707 0l.707.707c.195.195.195.512 0 .707zm-.5 4.5c0-.276-.224-.5-.5-.5H6.5c-.276 0-.5.224-.5.5v1c0 .276.224.5.5.5h1c.276 0 .5-.224.5-.5v-1zm1.5-1.166l-.707-.707c-.195-.195-.195-.512 0-.707s.512-.195.707 0l.707.707c.195.195.195.511 0 .707s-.512.195-.707 0z" />
            </svg>
          </div>
          <span className="text-xs font-mono font-medium tracking-tight text-neutral-400">
            <strong>MiniTAP</strong> — Built by Xavier (Jack) for Desktop.fm B.V.
          </span>
        </div>

        {/* Right Side: Small subtle utility links */}
        <div className="flex gap-4 justify-center text-[10px] font-mono tracking-wider uppercase font-bold text-neutral-600">
          <span className="hover:text-neutral-400 cursor-default">Privacy</span>
          <span>·</span>
          <span className="hover:text-neutral-400 cursor-default">Terms</span>
          <span>·</span>
          <span className="hover:text-neutral-400 cursor-default">Extension Config v1.0.4</span>
        </div>

      </div>
    </footer>
  );
}
