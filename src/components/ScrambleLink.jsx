import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const chars = '!<>-_\\\\/[]{}—=+*^?#_';

const ScrambleLink = ({ href = "#", target, children }) => {
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
      iteration += 1 / 2;
    }, 40);
  };

  const handleMouseLeave = () => {
    clearInterval(timerRef.current);
    setText(internalText);
  };

  const cssClasses = "inline-block px-3 py-1 font-mono text-sm tracking-wider transition-colors duration-300 hover:bg-black hover:text-white text-black";

  if (target === "_blank") {
    return (
      <a 
        href={href}
        target={target}
        rel="noopener noreferrer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cssClasses}
      >
        {text}
      </a>
    );
  }

  return (
    <Link 
      to={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cssClasses}
    >
      {text}
    </Link>
  );
};

export default ScrambleLink;
