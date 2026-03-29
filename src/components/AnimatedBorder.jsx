import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';

export default function AnimatedBorder({ children }) {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const tweenRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const { width, height } = dimensions;
    if (width === 0 || height === 0 || !pathRef.current) return;

    const halfPerimeter = width + height;
    
    // Set initial state
    gsap.set(pathRef.current, { strokeDashoffset: -halfPerimeter });

    const ctx = gsap.context(() => {
      // Create a paused tween that we can play and reverse
      tweenRef.current = gsap.to(pathRef.current, {
        strokeDashoffset: 0, 
        duration: 0.8, 
        ease: 'power3.out',
        paused: true
      });
    });

    return () => ctx.revert();
  }, [dimensions]);

  const handleMouseEnter = () => {
    if (tweenRef.current) tweenRef.current.play();
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) tweenRef.current.reverse();
  };

  const { width, height } = dimensions;

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      {width > 0 && height > 0 && (
        <svg 
          width={width} 
          height={height} 
          className="absolute inset-0 pointer-events-none z-20"
          style={{ overflow: 'visible' }}
        >
          <path
            ref={pathRef}
            d={`M ${width/2},0 L ${width},0 L ${width},${height} L 0,${height} L 0,0 Z`}
            fill="none"
            stroke="black"
            strokeWidth="3"
            strokeDasharray={`${(width+height)/2} ${(width+height)/2}`}
            strokeLinecap="square"
          />
        </svg>
      )}
    </div>
  );
}
