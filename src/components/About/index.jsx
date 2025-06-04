import React, { useRef } from "react"; // Added useRef
import { motion, useScroll, useTransform } from "framer-motion"; // Added useScroll, useTransform
import { TypeAnimation } from "react-type-animation";
import Profile from "../../assets/aljasonch.png";
import { useNavigate } from 'react-router-dom';

const About = ({ scrollToSection }) => {
  const navigate = useNavigate();
  const sectionRef = useRef(null); // Ref for the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"], // Track scroll from when section bottom enters viewport to when section top leaves
  });

  // Create a parallax effect for the image, moving it up slower than scroll
  // When scrollYProgress is 0 (bottom of section at bottom of viewport), y is 0.
  // When scrollYProgress is 1 (top of section at top of viewport), y is -50 (moves up 50px).
  // Adjust the output range (e.g. [0, -50] or [0, 50]) for desired speed and direction.
  const imageParallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]); // Image moves down as section scrolls up

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } },
  };
  return (    
  <motion.section
      id="about"
      ref={sectionRef}
      className="pt-32 pb-20 section-mesh min-h-screen flex items-center relative overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary-500/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-secondary-500/10 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-3/4 left-1/2 w-24 h-24 bg-accent-500/10 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          <motion.div className="md:w-1/2 mb-8 md:mb-0" variants={itemVariants}>
            <motion.p 
              className="text-secondary-600 poppins-medium text-lg mb-2 tracking-wide" 
              variants={itemVariants}
            >
              Hey, I'm Jason
            </motion.p>
            <motion.h2 
              className="text-3xl md:text-5xl mr-16 poppins-bold xl:mb-8 h-24 md:h-36 lg:h-24" 
              variants={itemVariants}
            >
              <TypeAnimation
                sequence={[
                  "I'm an Experienced Website Developer",
                  2000,
                  "I'm an Experienced App Developer",
                  2000,
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                style={{ display: 'inline-block', lineHeight: '1.2' }}
                className="gradient-text-modern text-modern"
              />
            </motion.h2>
            <motion.p 
              className="text-neutral-600 poppins-regular text-lg mb-8 leading-relaxed text-modern mt-4" 
              variants={itemVariants}
            >
              I'm a passionate website and app developer with a strong background
              in creating engaging and functional websites. I'm also deeply
              interested in the latest technologies and always eager to explore
              new tools and frameworks.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
              <motion.button
                onClick={() => navigate('/contact')}
                className="btn-modern bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 poppins-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.button>
              <motion.button
                className="glass-card border border-primary-200 hover:border-primary-300 text-primary-600 hover:text-primary-700 font-semibold py-4 px-8 rounded-full transition-all duration-300 poppins-medium interactive-hover"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="/CV_Alfonsus Jason Christian.pdf"
                  download="CV_Alfonsus Jason Christian.pdf"
                  className="flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download CV
                </a>
              </motion.button>
            </motion.div>
          </motion.div>
          <motion.div
            className="relative group"
            variants={imageVariants}
            style={{ y: imageParallaxY }}
          >
            <div className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] relative overflow-hidden rounded-full shadow-large">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 via-transparent to-accent-500/20 rounded-full"></div>
              <img
                src={Profile}
                alt="Profile"
                className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 rounded-full border-4 border-white/20 group-hover:border-white/40 transition-all duration-300"></div>
            </div>
            {/* Floating decoration elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary-500 rounded-full animate-bounce-gentle opacity-80"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent-500 rounded-full animate-bounce-gentle opacity-80" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute top-1/2 -left-8 w-4 h-4 bg-secondary-500 rounded-full animate-bounce-gentle opacity-80" style={{animationDelay: '1s'}}></div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
