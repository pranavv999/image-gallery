import { ReactLenis } from 'lenis/react';
import Header from './components/Header';
import GalleryGrid from './components/GalleryGrid';
import './App.css';

function App() {
  return (
    <ReactLenis root options={{ infinite: true }}>
      <div className="min-h-screen w-full bg-white text-black font-sans selection:bg-black selection:text-white">
        <Header />

        {/* Fixed Center Text */}
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 w-full text-center">
          <h1 className="text-[5vw] font-bold tracking-tighter whitespace-nowrap text-black uppercase leading-none">
            Pranav Studios
          </h1>
        </div>

        {/* Gallery Content Container */}
        <main className="w-full max-w-screen-2xl mx-auto pt-[20vh] relative z-10">
          {/* We render multiple grids so infinite scroll has a duplicate to loop seamlessly into */}
          <GalleryGrid />
          <GalleryGrid />
        </main>
      </div>
    </ReactLenis>
  );
}

export default App;
