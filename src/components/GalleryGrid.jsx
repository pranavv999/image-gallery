import React from 'react';
import AnimatedBorder from './AnimatedBorder';

const items = [
  { id: 1, type: 'portrait', offset: 'mt-0' },
  { id: 2, type: 'landscape', offset: 'mt-[15vh]' },
  { id: 3, type: 'portrait', offset: 'mt-[5vh]' },
  
  { id: 4, type: 'landscape', offset: 'mt-[10vh]' },
  { id: 5, type: 'square', offset: 'mt-[0vh]' },
  { id: 6, type: 'portrait', offset: 'mt-[20vh]' },
  
  { id: 7, type: 'square', offset: 'mt-[5vh]' },
  { id: 8, type: 'portrait', offset: 'mt-[15vh]' },
  { id: 9, type: 'landscape', offset: 'mt-[0vh]' },
];

export default function GalleryGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16 px-8 pb-16">
      {items.map((item) => {
        let aspectRatioClass = 'aspect-[4/3]';
        if (item.type === 'portrait') aspectRatioClass = 'aspect-[3/4]';
        if (item.type === 'landscape') aspectRatioClass = 'aspect-[16/9]';
        if (item.type === 'square') aspectRatioClass = 'aspect-square';

        return (
          <div 
            key={item.id} 
            className={`w-full relative z-10 bg-gray-200 ${aspectRatioClass} ${item.offset}`}
          >
            <AnimatedBorder>
              {/* Image element should be here in the future, covering the entire relative container */}
              <div className="w-full h-full bg-transparent"></div>
            </AnimatedBorder>
          </div>
        );
      })}
    </div>
  );
}
