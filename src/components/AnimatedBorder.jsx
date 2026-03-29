import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedBorder({ children }) {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
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

    const ctx = gsap.context(() => {
      gsap.fromTo(pathRef.current, 
        { strokeDashoffset: -halfPerimeter }, 
        { 
          strokeDashoffset: 0, 
          duration: 1.5, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    });

    return () => ctx.revert(); // clean up GSAP instance cleanly
  }, [dimensions]);

  const { width, height } = dimensions;

  return (
    <div ref={containerRef} className="relative w-full h-full group">
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
            strokeWidth="2"
            strokeDasharray={`${(width+height)/2} ${(width+height)/2}`}
            strokeLinecap="square"
          />
        </svg>
      )}
    </div>
  );
}
