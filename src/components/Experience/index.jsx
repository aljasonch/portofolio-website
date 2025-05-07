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

  return (
    <motion.section
      id="experience"
      className="py-20 bg-neutralBg text-neutralText" // Updated background and default text color
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.h2
          className="text-3xl md:text-4xl text-center poppins-bold text-primary mb-12"
          variants={itemVariants}
        >
          EXPERIENCE WITH
        </motion.h2>
        <motion.div
          className="flex flex-wrap justify-center items-center gap-6 md:gap-8 pb-16" // Increased gap and padding bottom
          variants={sectionVariants} // Stagger children
        >
          {skills.map((skill, index) => (
            <motion.img
              key={index}
              src={skill.src}
              alt={skill.alt}
              className="w-12 h-12 md:w-16 md:h-16 object-contain"
              variants={skillIconVariants}
              whileHover="hover"
            />
          ))}
        </motion.div>

        <motion.h2
          className="text-3xl md:text-4xl text-center poppins-bold text-primary mb-12 pt-10 border-t border-gray-300" // Added top border for separation
          variants={itemVariants}
        >
          ORGANIZATION EXPERIENCE
        </motion.h2>

        <motion.div className="flex flex-col space-y-10" variants={sectionVariants}> {/* Increased space-y */}
          {experiences.map((exp, index) => (
            <motion.div key={index} className="bg-white p-6 rounded-lg shadow-md" variants={itemVariants}> {/* Added card styling */}
              <div className="flex flex-col md:flex-row md:justify-between mb-1">
                <h3 className="text-xl poppins-bold text-secondary">{exp.title}</h3>
                <p className="text-gray-600 poppins-regular md:mb-0 mb-1">{exp.date}</p>
              </div>
              <p className="poppins-semibold text-neutralText mb-2">{exp.organization}</p>
              <p className="text-gray-700 text-justify text-sm leading-relaxed">{exp.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Experience;
