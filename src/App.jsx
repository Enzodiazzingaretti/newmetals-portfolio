import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Services from './components/Services.jsx'
import Works from './components/Works.jsx'
import Values from './components/Values.jsx'
import Process from './components/Process.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-coal">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Works />
        <Values />
        <Process />
      </main>
      <Footer />
    </div>
  )
}
