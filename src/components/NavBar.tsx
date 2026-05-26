import React from 'react';

interface NavBarProps {
  onSupportClick: () => void;
}

export default function NavBar({ onSupportClick }: NavBarProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-5 left-0 right-0 z-50 px-4">
      {/* Floating Pill Menu */}
      <nav className="bg-white/90 backdrop-blur-md border border-neutral-200/60 rounded-full px-5 py-2 hover:shadow-xl transition-all duration-300 flex items-center justify-between gap-6 max-w-[420px] mx-auto shadow-md">
        {/* Logo Icon (Circle with bomb/sparkle explosion logo) */}
        <button
          onClick={() => scrollToSection('hero-top')}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-950 hover:scale-105 transition-all text-white cursor-pointer"
          title="MiniTAP"
        >
          {/* Custom SVG bomb explosion icon matching exactly the image */}
          <svg className="w-5 h-5 text-white fill-white" viewBox="0 0 24 24">
            <path d="M12 2c-5.522 0-10 4.477-10 10s4.478 10 10 10 10-4.477 10-10-4.478-10-10-10zm2 14.5c0 .276-.224.5-.5.5h-3c-.276 0-.5-.224-.5-.5v-1c0-.276.224-.5.5-.5h3c.276 0 .5.224.5.5v1zm2.39-4.834l-.707.707c-.195.195-.512.195-.707 0l-.707-.707c-.195-.195-.195-.512 0-.707.195-.195.512-.195.707 0l.707.707c.195.195.195.512 0 .707zm-1.89-2.166c-.276 0-.5-.224-.5-.5v-1c0-.276.224-.5.5-.5h1c.276 0 .5.224.5.5v1c0 .276-.224.5-.5.5h-1zm.39 5.834c-.195.195-.512.195-.707 0l-.707-.707c-.195-.195-.195-.512 0-.707.195-.195.512-.195.707 0l.707.707c.195.195.195.512 0 .707zm-4.39-3.334c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm.5-4.5c0-.276-.224-.5-.5-.5h-1c-.276 0-.5.224-.5.5v1c0 .276.224.5.5.5h1c.276 0 .5-.224.5-.5v-1zm-4.39 3.334c-.195.195-.512.195-.707 0l-.707-.707c-.195-.195-.195-.512 0-.707.195-.195.512-.195.707 0l.707.707c.195.195.195.512 0 .707zm-.5 4.5c0-.276-.224-.5-.5-.5H6.5c-.276 0-.5.224-.5.5v1c0 .276.224.5.5.5h1c.276 0 .5-.224.5-.5v-1zm1.5-1.166l-.707-.707c-.195-.195-.195-.512 0-.707s.512-.195.707 0l.707.707c.195.195.195.511 0 .707s-.512.195-.707 0z" />
          </svg>
        </button>

        {/* Navigation Links */}
        <div className="flex items-center gap-1.5 sm:gap-3 text-neutral-600">
          <button
            onClick={() => scrollToSection('hero-top')}
            className="px-3 py-1.5 rounded-full text-xs font-semibold hover:text-neutral-950 hover:bg-neutral-100/80 transition-all cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('learn-section')}
            className="px-3 py-1.5 rounded-full text-xs font-semibold hover:text-neutral-950 hover:bg-neutral-100/80 transition-all cursor-pointer"
          >
            Learn
          </button>
          <button
            onClick={() => scrollToSection('story-section')}
            className="px-3 py-1.5 rounded-full text-xs font-semibold hover:text-neutral-950 hover:bg-neutral-100/80 transition-all cursor-pointer"
          >
            Story
          </button>
          <button
            onClick={onSupportClick}
            className="px-3 py-1.5 rounded-full text-xs font-semibold hover:text-neutral-950 hover:bg-neutral-100/80 transition-all cursor-pointer bg-neutral-100/10 hover:bg-neutral-100"
          >
            Support
          </button>
        </div>
      </nav>
    </header>
  );
}
