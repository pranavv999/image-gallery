import React, { useState, useRef, useEffect } from 'react';
import ScrambleLink from './ScrambleLink';

// Using portrait and square placeholders per instructions
const carouselItems = [
  { id: 1, category: '{ Wedding }', type: 'portrait', title: 'Portrait 01' },
  { id: 2, category: '{ Wedding }', type: 'square', title: 'Square 01' },
  { id: 3, category: '{ Engagement }', type: 'portrait', title: 'Portrait 02' },
  { id: 4, category: '{ Engagement }', type: 'portrait', title: 'Portrait 03' },
  { id: 5, category: '{ Birthday }', type: 'square', title: 'Square 02' },
  { id: 6, category: '{ Birthday }', type: 'portrait', title: 'Portrait 04' },
  { id: 7, category: '{ Maternity }', type: 'square', title: 'Square 02' },
  { id: 8, category: '{ Maternity }', type: 'portrait', title: 'Portrait 04' },
  { id: 9, category: '{ Other }', type: 'square', title: 'Square 02' },
  { id: 10, category: '{ Other }', type: 'portrait', title: 'Portrait 04' },
];

export default function ProjectCarousel({ onProgress, onActiveCategory }) {
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    const maxScroll = scrollWidth - clientWidth;
    let currentProgress = 0;
    if (maxScroll > 0) {
      currentProgress = scrollLeft / maxScroll;
    }
    if (onProgress) onProgress(currentProgress);

    // Calculate overlapping card logic
    const absoluteScannerX = scrollLeft + (currentProgress * clientWidth);
    const childrenNodes = Array.from(scrollRef.current.children);

    for (let child of childrenNodes) {
      if (absoluteScannerX >= child.offsetLeft && absoluteScannerX <= child.offsetLeft + child.offsetWidth) {
        const cat = child.getAttribute('data-category');
        if (cat && onActiveCategory) {
          onActiveCategory(cat);
        }
        break;
      }
    }
  };

  // Initial calculation & Wheel interception
  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);

    // Wheel event to map traditional vertical mouse wheels safely into horizontal scrolling
    const el = scrollRef.current;
    const onWheel = (e) => {
      // If there's primarily vertical scrolling input (deltaY)
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollBy({
          left: e.deltaY,
          behavior: 'auto'
        });
      }
    };

    if (el) {
      // passive: false allows us to safely use e.preventDefault avoiding page jumping
      el.addEventListener('wheel', onWheel, { passive: false });
    }

    return () => {
      window.removeEventListener('resize', handleScroll);
      if (el) el.removeEventListener('wheel', onWheel);
    };
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
          // Adjusted height to allow more breathing room for the footer text 
          const heightClass = isPortrait ? 'h-[46vh]' : 'h-[32vh]';

          return (
            <div
              key={item.id}
              data-category={item.category}
              // Retro Polaroid Frame Design
              className="snap-center shrink-0 bg-white p-4 pb-8 flex flex-col items-center shadow-xl border border-gray-100"
            >
              <div className={`bg-gray-200 ${heightClass} ${aspectRatioClass}`}>
                {/* Placeholder for the real image */}
              </div>

              <div className="mt-6">
                <ScrambleLink href="#">{item.title}</ScrambleLink>
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
