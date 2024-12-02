import React from "react";
import tailwindcss from "../../assets/tailwindcss.png";
import html from "../../assets/html.png";
import css from "../../assets/css.png";
import react from "../../assets/react.png";
import kotlin from "../../assets/kotlin.png";

const Experience = () => {
  return (
    <section id="experience" className="py-20 text-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-3xl text-center poppins-bold mb-8">EXPERIENCE WITH</h2>
        <div className="flex flex-wrap justify-center items-center gap-4 pb-20">
          <img src={html} alt="HTML5" className="w-12 h-12 md:w-16 md:h-16" />
          <img src={css} alt="CSS3" className="w-12 h-12 md:w-16 md:h-16" />
          <img src={react} alt="React" className="w-12 h-12 md:w-16 md:h-16" />
          <img src={tailwindcss} alt="Tailwind CSS" className="w-12 h-12 md:w-16 md:h-16" />
          <img src={kotlin} alt="Kotlin" className="w-12 h-12 md:w-16 md:h-16" />
        </div>

        <h2 className="text-3xl text-center poppins-bold mb-12 pt-20">ORGANIZATION EXPERIENCE</h2>

        <div className="flex flex-col space-y-8">
          <div>
            <div className="flex flex-col md:flex-row md:justify-between">
              <h3 className="text-xl poppins-bold">Website Coordinator</h3>
              <p className="text-gray-400 poppins-regular md:mb-0 mb-1">Jan 2024 - Present</p>
            </div>
            <p className="poppins-regular">Character Building Mentoring UMN 2024</p>
            <p className="text-gray-300 text-justify">
              Leading the development of UMN Mentoring's official website with a
              developer team using React JS, Tailwind CSS, and Firebase. Focused on
              creating a responsive and user-friendly platform to support mentoring
              activities.
            </p>
          </div>

          <div>
            <div className="flex flex-col md:flex-row md:justify-between">
              <h3 className="text-xl poppins-bold">Participant Garuda Hacks 5.0</h3>
              <p className="text-gray-400 poppins-regular md:mb-0 mb-1">Jul 2024 - Jul 2024</p>
            </div>
            <p className="poppins-regular">Garuda Hacks 5.0</p>
            <p className="text-gray-300 text-justify">
              Being a participant for Garuda Hacks 5.0 by creating a project
              named "WeShare" that could help unprivilege people that
              difficult getting access to health care
            </p>
          </div>

          <div>
            <div className="flex flex-col md:flex-row md:justify-between">
              <h3 className="text-xl poppins-bold">Mentor</h3>
              <p className="text-gray-400 poppins-regular md:mb-0 mb-1">Mar 2023 - Dec 2023</p>
            </div>
            <p>Character Building Mentoring UMN 2023</p>
            <p className="text-gray-300 text-justify">
              Guided Mentees (first-year students) to understand and apply
              UMN's 5C values (Caring, Credible, Competent, Competitive,
              Customer Delight) in their university life. Committed to
              supporting their personal and professional development through
              mentoring.
            </p>
          </div>

          <div>
            <div className="flex flex-col md:flex-row md:justify-between">
              <h3 className="text-xl poppins-bold">Logistics and Security</h3>
              <p className="text-gray-400 poppins-regular md:mb-0 mb-1">Feb 2023 - Aug 2023</p>
            </div>
            <p className="poppins-regular">ISFEST UMN 2023</p>
            <p className="text-gray-300 text-justify">
              Committee for Equipment and Security at ISFEST 2023. Ensuring
              seamless organization, logistics, and safety for the event.
              Skilled in problem-solving, communication, and critical
              decision-making. Committed to delivering exceptional results.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;