import React from 'react';
import GalleryGrid from '../components/GalleryGrid';

export default function Home() {
  return (
    <>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 w-full text-center">
        <h1 className="text-[5vw] font-bold tracking-tighter whitespace-nowrap text-black uppercase leading-none">
          FrontEnd Studios
        </h1>
      </div>

      <main className="w-full max-w-screen-2xl mx-auto pt-[20vh] relative z-10">
        <GalleryGrid />
        <GalleryGrid />
      </main>
    </>
  );
}
