import React, { useRef } from 'react';
import { motion }from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from 'react-router-dom';

import Profile from '../../assets/aljasonch.png';
import tailwindcss from '../../assets/tailwindcss.png';
import html from '../../assets/html.png';
import css from '../../assets/css.png';
import reactLogo from '../../assets/react.png';
import kotlin from '../../assets/kotlin.png';

const skills = [
  { src: html, alt: 'HTML5' },
  { src: css, alt: 'CSS3' },
  { src: reactLogo, alt: 'React' },
  { src: tailwindcss, alt: 'Tailwind CSS' },
  { src: kotlin, alt: 'Kotlin' },
];

const experiences = [
  {
    title: 'Website Coordinator',
    date: 'Jan 2024 - Dec 2024',
    organization: 'Character Building Mentoring UMN 2024',
    description:
      "Leading the development of UMN Mentoring's official website with a developer team using React JS, Tailwind CSS, and Firebase. Focused on creating a responsive and user-friendly platform to support mentoring activities.",
  },
  {
    title: 'Participant Garuda Hacks 5.0',
    date: 'Jul 2024 - Jul 2024',
    organization: 'Garuda Hacks 5.0',
    description:
      'Being a participant for Garuda Hacks 5.0 by creating a project named "WeShare" that could help unprivilege people that difficult getting access to health care',
  },
  {
    title: 'Mentor',
    date: 'Mar 2023 - Dec 2023',
    organization: 'Character Building Mentoring UMN 2023',
    description:
      "Guided Mentees (first-year students) to understand and apply UMN's 5C values (Caring, Credible, Competent, Competitive, Customer Delight) in their university life. Committed to supporting their personal and professional development through mentoring.",
  },
  {
    title: 'Logistics and Security',
    date: 'Feb 2023 - Aug 2023',
    organization: 'ISFEST UMN 2023',
    description:
      "Committee for Equipment and Security at ISFEST 2023. Ensuring seamless organization, logistics, and safety for the event. Skilled in problem-solving, communication, and critical decision-making. Committed to delivering exceptional results.",
  },
];

const work = [
  {
    title: 'Junior Software Engineer Intern',
    date: 'Jan 2025 - Present',
    organization: 'Kompas Gramedia',
    description:
      "",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const aboutSectionRef = useRef(null);

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
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
    hover: {
      scale: 1.25,
      rotate: 5,
      filter: 'drop-shadow(0px 5px 10px rgba(0,0,0,0.2))',
      transition: { duration: 0.2, type: 'spring', stiffness: 300 },
    },
  };

  return (
    <motion.section id="home" ref={aboutSectionRef} className="flex flex-col" initial="hidden" animate="visible" variants={{ hidden: {}, visible: {} }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary-500/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-secondary-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-3/4 left-1/2 w-24 h-24 bg-accent-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <motion.div
          className="container mx-auto px-6 max-w-6xl relative z-10 mt-36"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
            <motion.div className="md:w-1/2 mb-8 md:mb-0" variants={itemVariants}>
              <motion.p className="text-green-500 poppins-medium text-xl mb-2 tracking-wide" variants={itemVariants}>
                Hey, I'm Jason
              </motion.p>
              <motion.h2 className="text-3xl md:text-5xl mr-10 poppins-bold xl:mb-8 h-24 md:h-36 lg:h-24" variants={itemVariants}>
                <TypeAnimation
                  sequence={["I'm an Experienced Website Developer", 2000, "I'm an Experienced App Developer", 2000]}
                  wrapper="span"
                  cursor
                  repeat={Infinity}
                  style={{ display: 'inline-block', lineHeight: '1.2' }}
                  className="text-green-600"
                />
              </motion.h2>
              <motion.p
                className="text-neutral-600 poppins-regular text-lg mb-8 leading-relaxed text-modern mt-4"
                variants={itemVariants}
              >
                I'm a passionate website and app developer with a strong background in creating engaging and functional
                websites. I'm also deeply interested in the latest technologies and always eager to explore new tools and
                frameworks.
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
                <motion.button
                  onClick={() => navigate('/contact')}
                  className="btn-modern bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 poppins-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </motion.button>
                <motion.button
                  className="glass-card border border-green-200 hover:border-green-300 text-green-600 hover:text-green-700 font-semibold py-4 px-8 rounded-full transition-all duration-300 poppins-medium interactive-hover"
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

            <motion.div className="relative group">
              <div className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] relative overflow-hidden rounded-full shadow-large">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 via-transparent to-accent-500/20 rounded-full"></div>
                <img
                  src={Profile}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary-500 rounded-full animate-bounce-gentle opacity-80"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent-500 rounded-full animate-bounce-gentle opacity-80" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute top-1/2 -left-8 w-4 h-4 bg-secondary-500 rounded-full animate-bounce-gentle opacity-80" style={{ animationDelay: '1s' }}></div>
            </motion.div>
          </div>
        </motion.div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/80 to-transparent z-[1]"></div>
        <div className="absolute inset-0 opacity-30 z-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary-300 to-secondary-300 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-32 right-16 w-48 h-48 bg-gradient-to-br from-accent-300 to-primary-300 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-secondary-300 to-accent-300 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <motion.div
          className="container mx-auto px-6 max-w-6xl relative z-10 mt-36"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 className="text-4xl md:text-5xl text-center font-bold text-green-600 mb-16" variants={itemVariants}>
            EXPERIENCE WITH
          </motion.h2>

          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 md:gap-12 pb-20"
            variants={sectionVariants}
          >
            {skills.map((skill) => (
              <motion.div
                key={skill.alt}
                className="p-4 rounded-2xl hover:shadow-xl transition-all duration-300"
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

          <motion.h2 className="text-4xl md:text-5xl text-center font-bold text-green-600 mb-16" variants={itemVariants}>
            WORK EXPERIENCE
          </motion.h2>

          <motion.div
            className="relative max-w-5xl mx-auto pl-12 md:pl-16"
            variants={sectionVariants}
          >
            <div className="space-y-10 md:space-y-14">
              {work.map((exp, index) => (
                <motion.article
                  key={exp.title}
                  className="relative pl-12 md:pl-16"
                  variants={itemVariants}
                  whileHover={{ x: 6 }}
                >
                  <div className="absolute left-0 top-6 md:top-7 w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-glow flex items-center justify-center">
                    <span className="text-base font-semibold">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="rounded-3xl border border-gray hover:border-gray-300/50 p-6 md:p-8  shadow-lg">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <p className="text-xs tracking-[0.35em] uppercase text-green-500 poppins-medium mb-2">
                          Role
                        </p>
                        <h3 className="text-2xl md:text-3xl poppins-bold text-neutral-800">
                          {exp.title}
                        </h3>
                      </div>
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white text-sm poppins-semibold shadow-soft">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {exp.date}
                      </div>
                    </div>
                    <div className="mt-5">
                      <p className="text-sm uppercase tracking-[0.2em] text-neutral-400 poppins-medium">
                        {exp.organization}
                      </p>
                      <p className="mt-3 text-neutral-600 leading-relaxed text-justify">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>

          <motion.h2 className="text-4xl md:text-5xl text-center font-bold text-green-600 mt-24 mb-16" variants={itemVariants}>
            ORGANIZATION EXPERIENCE
          </motion.h2>

          <motion.div
            className="relative max-w-5xl mb-24 mx-auto pl-12 md:pl-16"
            variants={sectionVariants}
          >
            <div className="space-y-10 md:space-y-14">
              {experiences.map((exp, index) => (
                <motion.article
                  key={exp.title}
                  className="relative pl-12 md:pl-16"
                  variants={itemVariants}
                  whileHover={{ x: 6 }}
                >
                  <div className="absolute left-0 top-6 md:top-7 w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-glow flex items-center justify-center">
                    <span className="text-base font-semibold">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="rounded-3xl border border-gray hover:border-gray-300/50 p-6 md:p-8  shadow-lg">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <p className="text-xs tracking-[0.35em] uppercase text-green-500 poppins-medium mb-2">
                          Role
                        </p>
                        <h3 className="text-2xl md:text-3xl poppins-bold text-neutral-800">
                          {exp.title}
                        </h3>
                      </div>
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white text-sm poppins-semibold shadow-soft">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {exp.date}
                      </div>
                    </div>
                    <div className="mt-5">
                      <p className="text-sm uppercase tracking-[0.2em] text-neutral-400 poppins-medium">
                        {exp.organization}
                      </p>
                      <p className="mt-3 text-neutral-600 leading-relaxed text-justify">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </motion.div>
    </motion.section>
  );
};

export default Home;
