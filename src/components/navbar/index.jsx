import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => { // scrollToSection prop removed
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavItemClick = (path) => {
    navigate(path);
    setIsOpen(false); // Close menu on item click
  };

  // Variants for desktop navigation items
  const desktopNavItemVariants = {
    hover: {
      scale: 1.1,
      color: '#F97316', // Accent color
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
    },
  };

  // Variants for the mobile menu container (sliding panel)
  const mobileMenuPanelVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 35, delayChildren: 0.2, staggerChildren: 0.07 },
    },
    closed: {
      x: '100%', // Slide out to the right
      opacity: 0.8,
      transition: { type: 'spring', stiffness: 300, damping: 35, staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  // Variants for individual mobile navigation items
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
    { label: 'About', path: '/about' },
    { label: 'Experience', path: '/experience' },
    { label: 'Projects', path: '/projects' },
    { label: 'News', path: '/news' }, // Added News link
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-gradient-to-r from-primary to-secondary shadow sticky top-0 z-50"
    >
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between lg:justify-evenly gap-12">
          <Link to="/" className="text-2xl font-bold text-white poppins-extrabold cursor-pointer">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              aljasonch
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-12">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} className="text-white poppins-regular cursor-pointer">
                <motion.div
                  variants={desktopNavItemVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {item.label}
                </motion.div>
              </Link>
            ))}
          </nav>

          {/* Hamburger Icon (Mobile) */}
          <div className="lg:hidden">
            <button
              onClick={toggleNavbar}
              className="text-white focus:outline-none"
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
                {/* Animated hamburger/close icon path */}
                <motion.path
                  animate={isOpen ? { d: "M6 18L18 6M6 6l12 12" } : { d: "M4 6h16M4 12h16M4 18h16" }}
                  transition={{ duration: 0.3 }}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Side Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-40" // Full screen container for overlay + panel
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={toggleNavbar} // Close menu by clicking overlay
            />

            {/* Menu Panel Content */}
            <motion.div
              className="fixed top-0 right-0 h-full w-3/4 max-w-xs bg-neutralBg shadow-xl p-6 z-50 flex flex-col"
              variants={mobileMenuPanelVariants}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside menu
            >
              <div className="flex justify-end mb-6">
                <motion.button
                  onClick={toggleNavbar}
                  className="text-neutralText hover:text-accent p-1"
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
                  <Link key={item.path} to={item.path} className="text-primary hover:text-accent poppins-medium text-lg cursor-pointer py-2 w-full" onClick={() => setIsOpen(false)}>
                    <motion.div
                      variants={mobileNavListItemVariants}
                      whileHover={{ x: 5, color: '#F97316' }}
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
