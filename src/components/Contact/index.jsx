import React from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaTwitter, FaYoutube, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const iconVariants = {
    hover: { 
      scale: 1.2, 
      rotate: 5,
      filter: "drop-shadow(0px 5px 15px rgba(16, 185, 129, 0.4))",
      transition: { type: "spring", stiffness: 300 }
    },
    tap: { scale: 0.9 },
  };

  const socialLinks = [
    { href: "https://www.instagram.com/jasonchrist_5/", icon: FaInstagram, label: "Instagram" },
    { href: "https://twitter.com/alfonsus_jason", icon: FaTwitter, label: "Twitter" },
    { href: "https://www.youtube.com/@alfonsusjason9308", icon: FaYoutube, label: "YouTube" },
  ];  return (
    <motion.section
      id="contact"
      className="relative pt-32 pb-20 bg-gradient-to-br from-neutral-50 via-secondary-50/30 to-accent-50/40 text-dark-800 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-16 right-20 w-40 h-40 bg-gradient-to-br from-accent-300 to-secondary-300 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-16 w-56 h-56 bg-gradient-to-br from-primary-300 to-accent-300 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-gradient-to-br from-secondary-300 to-primary-300 rounded-full blur-2xl animate-float" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="container mx-auto px-6 max-w-4xl text-justify relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-green-600 mb-12"
          variants={itemVariants}
        >
          LET'S CONNECT
        </motion.h2>
        
        <motion.div className="glass-card p-8 rounded-3xl mb-8 border border-white/30" variants={itemVariants}>
          <p className="text-dark-600 text-lg mb-6 leading-relaxed">
            I am an IT student currently pursuing my degree at Multimedia Nusantara
            University and am open for internship opportunities. I have extensive
            experience and have completed various projects related to my coursework,
            including developing organizational websites, Android applications, and
            much more.
          </p>
          <p className="text-dark-600 text-lg mb-8 leading-relaxed">
            Feel free to reach out if you'd like me to contribute to your projects
            or company! You can contact me through the social media links below or
            email me directly.
          </p>
        </motion.div>

        <motion.a
          href="mailto:alfonsusjasonchristian@gmail.com"
          className="btn-modern bg-gradient-to-r p-2 rounded-xl from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-semibold text-lg flex items-center justify-center md:justify-start mb-12 transition-all duration-300 group w-fit mx-auto md:mx-0"
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaEnvelope className="mr-3 text-xl group-hover:rotate-12 transition-transform duration-300" />
          alfonsusjasonchristian@gmail.com
        </motion.a>

        <motion.div
          className="flex justify-center md:justify-start space-x-8"
          variants={sectionVariants}
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="glass-card p-4 rounded-2xl text-green-600 hover:text-green-500 transition-all duration-300 group hover:shadow-xl border border-white/30"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <link.icon size={32} className="group-hover:scale-110 transition-transform duration-300" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;
