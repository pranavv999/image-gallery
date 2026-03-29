import { ReactLenis } from 'lenis/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ReactLenis root options={{ infinite: true }}>
        <div className="min-h-screen w-full bg-white text-black font-sans selection:bg-black selection:text-white relative">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
          <Footer />
        </div>
      </ReactLenis>
    </BrowserRouter>
  );
}

export default App;
