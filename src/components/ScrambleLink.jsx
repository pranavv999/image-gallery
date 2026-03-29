import React, { useState, useEffect, useRef } from 'react';

const chars = '!<>-_\\\\/[]{}—=+*^?#_';

const ScrambleLink = ({ href = "#", children }) => {
  const [text, setText] = useState(children);
  const internalText = children.toString();
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    let iteration = 0;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setText(prev => 
        internalText.split('').map((letter, index) => {
          if(index < iteration) {
            return internalText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );

      if(iteration >= internalText.length) {
        clearInterval(timerRef.current);
      }
      iteration += 1 / 2; // Speed of resolving
    }, 40);
  };

  const handleMouseLeave = () => {
    clearInterval(timerRef.current);
    setText(internalText);
  };

  return (
    <a 
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="inline-block px-3 py-1 font-mono text-sm tracking-wider transition-colors duration-300 hover:bg-black hover:text-white text-black"
    >
      {text}
    </a>
  );
};

export default ScrambleLink;
