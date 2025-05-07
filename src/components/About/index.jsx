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
      ref={sectionRef} // Attach ref here
      className="py-20 bg-neutralBg" // Updated background
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          <motion.div className="md:w-1/2 mb-8 md:mb-0" variants={itemVariants}> {/* Text content part */}
            <motion.p className="text-secondary poppins-regular text-lg" variants={itemVariants}>Hey, I'm Jason</motion.p>
            <motion.h2 className="text-3xl md:text-5xl poppins-bold text-neutralText mb-4 h-24 md:h-36 lg:h-24" variants={itemVariants}> {/* Adjusted height for responsiveness */}
              <TypeAnimation
                sequence={[
                  "I'm an Experienced Website Developer",
                  2000,
                  "I'm an Experienced App Developer",
                  2000,
                  // "I'm an Experienced Full Stack Developer", // Keeping it to two for better flow on smaller headline areas
                  // 2000,
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                style={{ display: 'inline-block' }}
                className="text-primary" 
              />
               {/* Static text part if needed, or ensure TypeAnimation fills the role */}
            </motion.h2>
            <motion.p className="text-gray-700 poppins-regular text-base mb-6" variants={itemVariants}>
              I'm a passionate website and app developer with a strong background
              in creating engaging and functional websites. I'm also deeply
              interested in the latest technologies and always eager to explore
              new tools and frameworks.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row" variants={itemVariants}>
              <motion.button
                onClick={() => navigate('/contact')}
                className="bg-primary hover:bg-secondary text-white font-bold py-3 px-6 lg:mr-6 rounded-full mb-4 sm:mb-0 sm:mr-6 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.button>
              <motion.button
                className="bg-transparent border border-primary hover:bg-primary text-primary hover:text-white font-bold py-3 px-6 rounded-full transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="/CV_Alfonsus Jason Christian.pdf"
                  download="CV_Alfonsus Jason Christian.pdf"
                >
                  Download CV
                </a>
              </motion.button>
            </motion.div>
          </motion.div>
          <motion.div // Image container
            className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] relative overflow-hidden rounded-full mb-8 md:mb-0 shadow-xl"
            variants={imageVariants} // Initial animation variants
            style={{ y: imageParallaxY }} // Apply parallax style
          >
            <img
              src={Profile}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
