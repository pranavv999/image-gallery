import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const BlinkLink = ({ href = "#", isActive = false, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isBlack, setIsBlack] = useState(false);
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsBlack(true);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIsBlack(prev => !prev);
    }, 150); // fast blink interval
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    clearInterval(timerRef.current);
    setIsBlack(false);
  };

  // If active, force black. Otherwise, fallback to hover rules.
  let textColorClass = 'text-gray-400';
  if (isActive) {
    textColorClass = 'text-black';
  } else if (isHovered && isBlack) {
    textColorClass = 'text-black';
  }

  return (
    <Link 
      to={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block px-3 py-1 font-mono text-sm tracking-wider cursor-pointer transition-none ${textColorClass}`}
    >
      {children}
    </Link>
  );
};

export default BlinkLink;
