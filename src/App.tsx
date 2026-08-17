import { SmoothScrollProvider } from './components/layout/SmoothScrollProvider';
import { NoiseOverlay } from './components/layout/NoiseOverlay';
import { CyberCursor } from './components/layout/CyberCursor';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Lab } from './components/Lab';
import { Research } from './components/Research';
import { JourneyGallery } from './components/JourneyGallery';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-obsidian text-ghost-white font-body">
        <NoiseOverlay />
        <CyberCursor />
        <Navigation />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Lab />
          <Research />
          <JourneyGallery />
          <Contact />
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}

export default App;
