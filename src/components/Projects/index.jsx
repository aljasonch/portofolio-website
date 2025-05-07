import React from "react";
import { motion } from "framer-motion";
// import htmlImg from "../../assets/html.png"; // Not used, can be removed
import Mentoring from "../../assets/mentoring.png";
import Minko from "../../assets/minko.png";
import Orion from "../../assets/orion.png";

const projectData = [
  {
    title: "MENTORING UMN 2024",
    image: Mentoring,
    link: "https://mentoring2024.vercel.app",
    alt: "Mentoring UMN 2024 Project",
  },
  {
    title: "Minko | Furniture Store",
    image: Minko,
    link: "https://minko.vercel.app",
    alt: "Minko Furniture Store Project",
  },
  {
    title: "Kailux",
    image: Orion, // Assuming Orion is the image for Kailux
    link: "http://kailux.vercel.app/",
    alt: "Kailux Project",
  },
];

const Projects = () => {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      id="projects"
      className="py-20 bg-neutralBg" // Use neutralBg for consistency
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.h2
          className="text-3xl md:text-4xl poppins-bold text-primary text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          PROJECTS
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={sectionVariants} // Stagger children within this div
        >
          {projectData.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden" // Card background and shadow
              variants={cardVariants}
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={project.image}
                  alt={project.alt}
                  className="w-full aspect-video object-cover"
                />
                <div className="px-6 py-4">
                  <p className="text-secondary poppins-regular text-sm mb-1">
                    Click here to visit
                  </p>
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl poppins-bold text-neutralText mb-0"> {/* Removed mb-2 */}
                      {project.title}
                    </h3>
                    <div className="text-accent text-2xl transition-transform duration-300 group-hover:translate-x-1">→</div>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Projects;
