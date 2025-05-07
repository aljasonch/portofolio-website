// App.js
import React from 'react';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Navbar from './components/navbar';
import ScrollToTopButton from './components/ScrollToTopButton'; // Import the new component

function App() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar scrollToSection={scrollToSection} />
      <About scrollToSection={scrollToSection} />
      <Experience />
      <Projects />
      <Contact />
      <ScrollToTopButton /> {/* Add the button here */}
    </div>
  );
}

export default App;
