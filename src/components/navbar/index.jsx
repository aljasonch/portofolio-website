import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => { 
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const desktopNavItemVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
    },
  };

  const mobileMenuPanelVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 35, delayChildren: 0.2, staggerChildren: 0.07 },
    },
    closed: {
      x: '100%',
      opacity: 0.8,
      transition: { type: 'spring', stiffness: 300, damping: 35, staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const mobileNavListItemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: { y: { stiffness: 1000, velocity: -100 } },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: { y: { stiffness: 1000 } },
    },
  };
  
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Projects', path: '/projects' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];

  return (    
  <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 w-full z-50 bg-white/80 transition-all duration-300 shadow-md"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between lg:justify-evenly gap-12">
          <Link to="/" className="cursor-pointer">
            <motion.div
              className="text-2xl font-bold text-green-500 poppins-extrabold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              aljasonch
            </motion.div>
          </Link>
          <nav className="hidden lg:flex space-x-8">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} className="cursor-pointer group">
                <motion.div
                  className="relative text-dark-700 hover:text-green-600 font-semibold transition-all duration-300 py-2 px-4 rounded-lg"
                  variants={desktopNavItemVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {item.label}
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-green-500 to-green-600 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full"></div>
                </motion.div>
              </Link>
            ))}
          </nav>          
          <div className="lg:hidden">
            <button
              onClick={toggleNavbar}
              className="text-dark-700 hover:text-green-600 focus:outline-none transition-colors duration-300 p-2 rounded-lg bg-white/80 backdrop-blur-sm border border-white/30 shadow-sm"
              aria-label="Open menu"
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
                <motion.path
                  animate={isOpen ? { d: "M6 18L18 6M6 6l12 12" } : { d: "M4 6h16M4 12h16M4 18h16" }}
                  transition={{ duration: 0.3 }}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden fixed inset-0"
            initial="closed"
            animate="open"
            exit="closed"
          >
            <motion.div
              className="absolute inset-0 "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={toggleNavbar} 
            />

            <motion.div
              className="fixed top-0 right-0 h-full w-3/4 max-w-xs glass-card shadow-large p-6 z-60 flex flex-col"
              variants={mobileMenuPanelVariants}
              onClick={(e) => e.stopPropagation()} 
            >
              <div className="flex justify-end mb-6">
                <motion.button
                  onClick={toggleNavbar}
                  className="text-neutral-700 hover:text-accent-500 p-2 rounded-full hover:bg-white/50 transition-all duration-300"
                  whileHover={{ scale: 1.2, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close menu"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              <nav className="flex flex-col items-start space-y-4">
                {navItems.map((item) => (
                  <Link 
                    key={item.path} 
                    to={item.path} 
                    className="text-green-500  poppins-medium text-lg cursor-pointer py-3 px-4 w-full rounded-lg hover:bg-white/50 transition-all duration-300" 
                    onClick={() => setIsOpen(false)}
                  >
                    <motion.div
                      variants={mobileNavListItemVariants}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.label}
                    </motion.div>
                  </Link>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
