import React, { useState, useRef, useEffect } from 'react';
import ScrambleLink from './ScrambleLink';

// Using portrait and square placeholders per instructions
const carouselItems = [
  { id: 1, type: 'portrait', title: '{ Portrait 01 }' },
  { id: 2, type: 'square', title: '{ Square 01 }' },
  { id: 3, type: 'portrait', title: '{ Portrait 02 }' },
  { id: 4, type: 'portrait', title: '{ Portrait 03 }' },
  { id: 5, type: 'square', title: '{ Square 02 }' },
  { id: 6, type: 'portrait', title: '{ Portrait 04 }' },
  { id: 7, type: 'square', title: '{ Square 02 }' },
  { id: 8, type: 'portrait', title: '{ Portrait 04 }' },
  { id: 9, type: 'square', title: '{ Square 02 }' },
  { id: 10, type: 'portrait', title: '{ Portrait 04 }' },
];

export default function ProjectCarousel({ onProgress }) {
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      if (onProgress) onProgress(0);
      return;
    }
    const currentProgress = scrollLeft / maxScroll;
    if (onProgress) onProgress(currentProgress);
  };

  // Initial calculation
  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col justify-center pb-24 z-10">

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="w-full flex gap-x-12 px-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar items-center py-12"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {carouselItems.map((item) => {
          const isPortrait = item.type === 'portrait';
          const aspectRatioClass = isPortrait ? 'aspect-[3/4]' : 'aspect-square';
          // Make square images noticeably shorter than portrait ones
          const heightClass = isPortrait ? 'h-[55vh]' : 'h-[40vh]';

          return (
            <div key={item.id} className={`snap-center shrink-0 ${heightClass} flex flex-col items-center gap-4`}>
              <ScrambleLink href="#">{item.title}</ScrambleLink>
              <div className={`h-full bg-gray-200 ${aspectRatioClass}`}>
                {/* Placeholder for the real image */}
              </div>
            </div>
          );
        })}
      </div>

      {/* 
        Horizontal Black Progress Bar 
        Rests at the bottom of this component container
      */}
    </div>
  );
}
