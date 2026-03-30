import React, { useState } from 'react';
import ScrambleLink from './ScrambleLink';

export default function Header() {
  const [logoSrc, setLogoSrc] = useState('/shutter-open.png');

  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-6 z-50 bg-transparent font-sans">
      <a href='/'>
        <div
          className="cursor-pointer"
          onMouseEnter={() => setLogoSrc('/shutter-click.png')}
          onMouseLeave={() => setLogoSrc('/shutter-open.png')}
        >
          <img
            src={logoSrc}
            alt="Shutter Logo"
            className="w-8 h-8 object-contain transition-transform duration-300"
          />
        </div>
      </a>

      <nav className="flex space-x-8 items-center">
        <ScrambleLink href="/about">{'{ ABOUT }'}</ScrambleLink>
        <ScrambleLink href="/projects">{'{ PROJECTS }'}</ScrambleLink>
        <ScrambleLink href="/contacts">{'{ CONTACTS }'}</ScrambleLink>
      </nav>
    </header>
  );
}
