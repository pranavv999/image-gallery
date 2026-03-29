import React from 'react';
import BlinkLink from '../components/BlinkLink';

export default function Projects() {
  const categories = [
    '{ Wedding }', 
    '{ Engagement }', 
    '{ Birthday }', 
    '{ Maternity }', 
    '{ Other }'
  ];

  return (
    <main className="w-full min-h-screen pt-32 pb-32 flex flex-col items-center">
      <div className="w-full flex-1 flex justify-between px-8 max-w-screen-2xl mx-auto items-stretch">
        {categories.map((cat) => (
          <div key={cat} className="flex flex-col items-center group">
            <BlinkLink href="/projects">{cat}</BlinkLink>
            {/* The vertical gray line */}
            <div className="w-[1px] flex-grow bg-gray-200 mt-6 min-h-[40vh] transition-colors duration-500 group-hover:bg-gray-400"></div>
          </div>
        ))}
      </div>
    </main>
  );
}
