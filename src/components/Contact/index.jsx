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
    hover: { scale: 1.2, color: "#F97316" }, // Accent color on hover
    tap: { scale: 0.9 },
  };

  const socialLinks = [
    { href: "https://www.instagram.com/jasonchrist_5/", icon: FaInstagram, label: "Instagram" },
    { href: "https://twitter.com/alfonsus_jason", icon: FaTwitter, label: "Twitter" },
    { href: "https://www.youtube.com/@alfonsusjason9308", icon: FaYoutube, label: "YouTube" },
  ];

  return (
    <motion.section
      id="contact"
      className="py-20 bg-neutralBg text-neutralText" // Updated background and text
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-6 max-w-4xl text-center md:text-start"> {/* Centered on small screens */}
        <motion.h2
          className="text-3xl md:text-4xl poppins-bold text-primary mb-8" // Increased margin bottom
          variants={itemVariants}
        >
          CONTACT
        </motion.h2>
        <motion.p className="text-gray-700 poppins-regular mb-6 leading-relaxed" variants={itemVariants}>
          I am an IT student currently pursuing my degree at Multimedia Nusantara
          University and am open for internship opportunities. I have extensive
          experience and have completed various projects related to my coursework,
          including developing organizational websites, Android applications, and
          much more.
        </motion.p>
        <motion.p className="text-gray-700 poppins-regular mb-8 leading-relaxed" variants={itemVariants}> {/* Increased margin bottom */}
          Feel free to reach out if you'd like me to contribute to your projects
          or company! You can contact me through the social media links below or
          email me directly.
        </motion.p>
        <motion.a
          href="mailto:alfonsusjason01@gmail.com"
          className="text-secondary hover:text-accent poppins-semibold text-lg flex items-center justify-center md:justify-start mb-10 transition-colors duration-300" // Centered on small, increased margin bottom
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <FaEnvelope className="mr-3 text-2xl" /> {/* Increased icon size and margin */}
          alfonsusjason01@gmail.com
        </motion.a>
        <motion.div
          className="flex justify-center md:justify-start space-x-8" // Increased space-x
          variants={sectionVariants} // Stagger children
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-primary hover:text-accent transition-colors duration-300"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <link.icon size={28} /> {/* Increased icon size */}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;
