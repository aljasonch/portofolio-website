import React from 'react';

const Navbar = ({ scrollToSection }) => {
  return (
    <header className="bg-neutral-900 shadow sticky top-0 z-50">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-evenly gap-12">
          <div
            onClick={() => scrollToSection('about')}
            className="text-2xl font-bold text-white poppins-extrabold mr-24 cursor-pointer"
          >
            aljasonch
          </div>
          <nav className="flex space-x-12">
            <div
              onClick={() => scrollToSection('about')}
              className="text-white poppins-regular hover:text-gray-600 cursor-pointer"
            >
              About
            </div>
            <div
              onClick={() => scrollToSection('projects')}
              className="text-white poppins-regular hover:text-gray-600 cursor-pointer"
            >
              Projects
            </div>
            <div
              onClick={() => scrollToSection('experience')}
              className="text-white poppins-regular hover:text-gray-600 cursor-pointer"
            >
              Experience
            </div>
            <div
              onClick={() => scrollToSection('contact')}
              className="text-white poppins-regular hover:text-gray-600 cursor-pointer"
            >
              Contact
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;