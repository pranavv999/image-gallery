import React from 'react';
import BlinkLink from '../components/BlinkLink';

export default function Projects() {
  return (
    <main className="w-full min-h-screen pt-32 pb-40 flex flex-col items-center">
      {/* Horizontal Sub-Navigation */}
      <div className="w-full flex justify-between px-8 max-w-screen-2xl mx-auto">
        <BlinkLink href="/projects">{'{ Wedding }'}</BlinkLink>
        <BlinkLink href="/projects">{'{ Engagement }'}</BlinkLink>
        <BlinkLink href="/projects">{'{ Birthday }'}</BlinkLink>
        <BlinkLink href="/projects">{'{ Maternity }'}</BlinkLink>
        <BlinkLink href="/projects">{'{ Other }'}</BlinkLink>
      </div>

      {/* 
        The rest of the actual projects interface goes here.
        For now, this space is preserved for the next implementation steps!
      */}
      <div className="flex-1 flex items-center justify-center">
        <h2 className="text-4xl px-8 text-neutral-300 font-sans tracking-wide">Select a category</h2>
      </div>
    </main>
  );
}
