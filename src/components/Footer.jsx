import React from 'react';
import ScrambleLink from './ScrambleLink';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full flex items-center justify-center gap-12 px-8 py-6 z-50 bg-transparent font-sans">
      <ScrambleLink href="https://instagram.com" target="_blank">
        {'{ Instagram }'}
      </ScrambleLink>
      <ScrambleLink href="https://linkedin.com" target="_blank">
        {'{ Linkedin }'}
      </ScrambleLink>
    </footer>
  );
}
