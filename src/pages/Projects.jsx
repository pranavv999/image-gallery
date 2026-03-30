import React, { useState } from 'react';
import BlinkLink from '../components/BlinkLink';
import ProjectCarousel from '../components/ProjectCarousel';

export default function Projects() {
  const [progress, setProgress] = useState(0);
  const [activeCategory, setActiveCategory] = useState('{ Wedding }');

  const categories = [
    '{ Wedding }',
    '{ Engagement }',
    '{ Birthday }',
    '{ Maternity }',
    '{ Other }'
  ];

  return (
    <main className="w-full h-screen pt-32 pb-24 flex flex-col relative overflow-hidden">

      {/* BACKGROUND LAYER: Trailing lines & floating section navigation */}
      <div className="absolute inset-0 pt-32 pb-24 flex flex-col items-center pointer-events-none z-0">
        <div className="w-full flex-1 px-8 max-w-screen-2xl mx-auto relative">
          
          <div className="w-full h-full flex justify-between items-stretch">
            {categories.map((cat) => (
              <div key={cat} className="flex flex-col items-center group pointer-events-auto">
                {/* Dynamically assign active highlighting from child event triggers */}
                <BlinkLink href="/projects" isActive={cat === activeCategory}>{cat}</BlinkLink>
                <div className="w-[1px] flex-grow bg-gray-200 mt-6 min-h-[40vh] transition-colors duration-500 group-hover:bg-gray-400"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOREGROUND LAYER: The Horizontal Carousel Overlay */}
      {/* Decreased mt-20 to mt-4 to move cards cleanly closer to section headers */}
      <div className="w-full flex-1 flex flex-col mt-4 max-w-screen-2xl mx-auto relative z-10 pointer-events-none">

        <div className="flex-1 w-full pointer-events-auto">
          <ProjectCarousel onProgress={setProgress} onActiveCategory={setActiveCategory} />
        </div>
      </div>

      {/* SCANNER OVERLAY: The moving vertical line crossing everything */}
      <div className="absolute inset-0 pt-32 pb-24 flex flex-col items-center pointer-events-none z-20">
        <div className="w-full flex-1 px-8 max-w-screen-2xl mx-auto relative">
          <div 
            className="absolute top-10 bottom-0 w-[1px] bg-black"
            style={{ left: `calc(2rem + ${progress} * calc(100% - 4rem))` }}
          ></div>
        </div>
      </div>

    </main>
  );
}
