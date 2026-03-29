import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const BlinkLink = ({ href = "#", children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isBlack, setIsBlack] = useState(false);
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Initial color hit
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

  // If hovered, toggle between black and gray. If not hovered, always gray.
  const textColorClass = isHovered && isBlack ? 'text-black' : 'text-gray-400';

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
