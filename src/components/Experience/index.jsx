import React from "react";
import { motion } from "framer-motion";
import tailwindcss from "../../assets/tailwindcss.png";
import html from "../../assets/html.png";
import css from "../../assets/css.png";
import react from "../../assets/react.png";
import kotlin from "../../assets/kotlin.png";

const skills = [
  { src: html, alt: "HTML5" },
  { src: css, alt: "CSS3" },
  { src: react, alt: "React" },
  { src: tailwindcss, alt: "Tailwind CSS" },
  { src: kotlin, alt: "Kotlin" },
];

const experiences = [
  {
    title: "Website Coordinator",
    date: "Jan 2024 - Present",
    organization: "Character Building Mentoring UMN 2024",
    description:
      "Leading the development of UMN Mentoring's official website with a developer team using React JS, Tailwind CSS, and Firebase. Focused on creating a responsive and user-friendly platform to support mentoring activities.",
  },
  {
    title: "Participant Garuda Hacks 5.0",
    date: "Jul 2024 - Jul 2024",
    organization: "Garuda Hacks 5.0",
    description:
      'Being a participant for Garuda Hacks 5.0 by creating a project named "WeShare" that could help unprivilege people that difficult getting access to health care',
  },
  {
    title: "Mentor",
    date: "Mar 2023 - Dec 2023",
    organization: "Character Building Mentoring UMN 2023",
    description:
      "Guided Mentees (first-year students) to understand and apply UMN's 5C values (Caring, Credible, Competent, Competitive, Customer Delight) in their university life. Committed to supporting their personal and professional development through mentoring.",
  },
  {
    title: "Logistics and Security",
    date: "Feb 2023 - Aug 2023",
    organization: "ISFEST UMN 2023",
    description:
      "Committee for Equipment and Security at ISFEST 2023. Ensuring seamless organization, logistics, and safety for the event. Skilled in problem-solving, communication, and critical decision-making. Committed to delivering exceptional results.",
  },
];

const Experience = () => {
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

  const skillIconVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    hover: {
      scale: 1.25,
      rotate: 5, // Slight rotation
      filter: "drop-shadow(0px 5px 10px rgba(0,0,0,0.2))", // Add a drop shadow
      transition: { duration: 0.2, type: "spring", stiffness: 300 },
    },
  };
  return (    <motion.section
      id="experience"
      className="relative pt-32 pb-20 bg-gradient-to-br from-neutral-50 via-primary-50/30 to-secondary-50/40 text-dark-800 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary-300 to-secondary-300 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-32 right-16 w-48 h-48 bg-gradient-to-br from-accent-300 to-primary-300 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-secondary-300 to-accent-300 rounded-full blur-2xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl text-center font-bold gradient-text-modern mb-16"
          variants={itemVariants}
        >
          EXPERIENCE WITH
        </motion.h2>
        
        <motion.div
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12 pb-20"
          variants={sectionVariants}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="glass-card p-4 rounded-2xl hover:shadow-xl transition-all duration-300"
              variants={skillIconVariants}
              whileHover="hover"
            >
              <img
                src={skill.src}
                alt={skill.alt}
                className="w-16 h-16 md:w-20 md:h-20 object-contain filter drop-shadow-lg"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-16 rounded-full"
          variants={itemVariants}
        ></motion.div>

        <motion.h2
          className="text-4xl md:text-5xl text-center font-bold gradient-text-modern mb-16"
          variants={itemVariants}
        >
          ORGANIZATION EXPERIENCE
        </motion.h2>

        <motion.div className="flex flex-col space-y-8" variants={sectionVariants}>
          {experiences.map((exp, index) => (
            <motion.div 
              key={index} 
              className="glass-card p-8 rounded-2xl border border-white/20 hover:border-primary-300/50 transition-all duration-500 group hover:shadow-xl"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex flex-col md:flex-row md:justify-between mb-4">
                <h3 className="text-2xl font-bold text-primary-700 group-hover:text-primary-600 transition-colors duration-300">
                  {exp.title}
                </h3>
                <div className="px-4 py-2 bg-gradient-to-r from-secondary-100 to-accent-100 text-secondary-700 rounded-full text-sm font-semibold mt-2 md:mt-0 w-fit">
                  {exp.date}
                </div>
              </div>
              <p className="font-semibold text-accent-600 mb-4 text-lg">{exp.organization}</p>
              <p className="text-dark-600 text-justify leading-relaxed">{exp.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Experience;
