import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaYoutube, FaEnvelope } from 'react-icons/fa';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/jasonchrist_5/', icon: FaInstagram },
  { label: 'Twitter', href: 'https://twitter.com/alfonsus_jason', icon: FaTwitter },
  { label: 'YouTube', href: 'https://www.youtube.com/@alfonsusjason9308', icon: FaYoutube },
];

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', when: 'beforeChildren', staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="relative pt-20 pb-10 bg-gradient-to-br from-neutral-50 via-white to-secondary-50/60 text-neutral-700 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-10 w-60 h-60 bg-primary-500/15 rounded-full blur-3xl animate-float" />
        <div className="absolute top-24 right-10 w-48 h-48 bg-secondary-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-0 left-1/3 w-36 h-36 bg-accent-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div variants={itemVariants}>
            <Link to="/" className="inline-flex items-center text-3xl poppins-extrabold text-green-600 tracking-tight">
              aljasonch
            </Link>
            <p className="mt-4 text-neutral-600 leading-relaxed text-base max-w-sm">
              Crafting immersive digital experiences through thoughtful code and vibrant design. I build responsive web and mobile interfaces that feel modern yet approachable.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-glow">
                <FaEnvelope />
              </span>
              <a
                href="mailto:alfonsusjasonchristian@gmail.com"
                className="text-green-600 hover:text-green-700 transition-colors duration-200 poppins-medium"
              >
                alfonsusjasonchristian@gmail.com
              </a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="md:pl-10">
            <h3 className="text-lg poppins-semibold text-neutral-800 tracking-wide">
              Quick Links
            </h3>
            <div className="mt-4 w-12 h-0.5 bg-gradient-to-r from-green-500 to-green-600 rounded-full" />
            <ul className="mt-6 space-y-3">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center text-neutral-600 hover:text-green-600 transition-all duration-200"
                  >
                    <span className="w-2 h-2 mr-3 rounded-full bg-green-200 group-hover:bg-green-500 transition-colors duration-200" />
                    <span className="poppins-medium">{link.label}</span>
                    <span className="ml-2 text-green-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg poppins-semibold text-neutral-800 tracking-wide">
              Stay Connected
            </h3>
            <div className="mt-4 w-12 h-0.5 bg-gradient-to-r from-green-500 to-green-600 rounded-full" />
            <p className="mt-6 text-neutral-600 leading-relaxed">
              Follow my journey and see the latest projects, behind-the-scenes snapshots, and tech explorations.
            </p>
            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="glass-card w-12 h-12 rounded-2xl flex items-center justify-center border border-white/40 text-green-600 hover:text-green-700 transition-all duration-200"
                  whileHover={{ scale: 1.08, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={22} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-16 pt-6 border-t border-white/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-500"
        >
          <p>© {currentYear} Alfonsus Jason Christian. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Crafted with React & Tailwind CSS
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
