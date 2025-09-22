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
  };  return (
    <motion.section
      id="projects"
      className="pt-32 pb-20 section-gradient relative overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-40 h-40 bg-primary-500/5 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-accent-500/5 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl poppins-bold text-green-600 mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            PROJECTS
          </motion.h2>
          <motion.p
            className="text-lg text-neutral-600 poppins-regular max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A showcase of innovative solutions and creative implementations
          </motion.p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto mt-6 rounded-full"></div>
        </motion.div>        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={sectionVariants}
        >
          {projectData.map((project, index) => (
            <motion.div
              key={index}
              className="card-modern group cursor-pointer"
              variants={cardVariants}
              whileHover={{ y: -12, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                <div className="relative overflow-hidden rounded-t-[20px]">
                  <img
                    src={project.image}
                    alt={project.alt}
                    className="w-full aspect-video object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-3">
                    <span className="text-green-600 poppins-medium text-sm tracking-wide">
                      Click to visit
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl poppins-bold text-neutral-800 group-hover:text-green-600 transition-colors duration-300 leading-tight">
                      {project.title}
                    </h3>
                    <div className="text-green-600 text-xl transition-all duration-300 group-hover:translate-x-1 group-hover:text-green-500 ml-2 mt-1">
                      →
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-neutral-100 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="flex items-center text-sm text-neutral-500 poppins-regular">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View Project
                    </div>
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
