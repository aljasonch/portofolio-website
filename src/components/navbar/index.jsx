import React, { useState } from 'react';

const Navbar = ({ scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavItemClick = (section) => {
    scrollToSection(section);
    setIsOpen(false);
  };

  return (
    <header className="bg-neutral-900 shadow sticky top-0 z-50">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between lg:justify-evenly gap-12">
          <div
            onClick={() => handleNavItemClick('about')}
            className="text-2xl font-bold text-white poppins-extrabold cursor-pointer"
          >
            aljasonch
          </div>
          {/* Tombol Hamburger */}
          <div className="lg:hidden">
            <button
              onClick={toggleNavbar}
              className="text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
          {/* Navigasi Desktop */}
          <nav className="hidden lg:flex space-x-12">
            <div
              onClick={() => handleNavItemClick('about')}
              className="text-white poppins-regular hover:text-gray-600 cursor-pointer"
            >
              About
            </div>
            <div
              onClick={() => handleNavItemClick('projects')}
              className="text-white poppins-regular hover:text-gray-600 cursor-pointer"
            >
              Projects
            </div>
            <div
              onClick={() => handleNavItemClick('experience')}
              className="text-white poppins-regular hover:text-gray-600 cursor-pointer"
            >
              Experience
            </div>
            <div
              onClick={() => handleNavItemClick('contact')}
              className="text-white poppins-regular hover:text-gray-600 cursor-pointer"
            >
              Contact
            </div>
          </nav>
        </div>
      </div>
      {/* Side Panel Mobile/Tablet */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="fixed inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out"
            style={{ backgroundColor: isOpen ? 'rgba(0, 0, 0, 0.7)' : 'transparent' }}
            onClick={toggleNavbar}
          >
            <div
              className=" shadow-lg rounded-lg p-6 w-11/12 max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center space-y-6">
                <div
                  onClick={() => handleNavItemClick('about')}
                  className="text-white poppins-regular hover:text-gray-600 cursor-pointer w-full py-2 text-center"
                >
                  About
                </div>
                <div
                  onClick={() => handleNavItemClick('projects')}
                  className="text-white poppins-regular hover:text-gray-600 cursor-pointer w-full py-2 text-center"
                >
                  Projects
                </div>
                <div
                  onClick={() => handleNavItemClick('experience')}
                  className="text-white poppins-regular hover:text-gray-600 cursor-pointer w-full py-2 text-center"
                >
                  Experience
                </div>
                <div
                  onClick={() => handleNavItemClick('contact')}
                  className="text-white poppins-regular hover:text-gray-600 cursor-pointer w-full py-2 text-center"
                >
                  Contact
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;