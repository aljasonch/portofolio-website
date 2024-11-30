import React from "react";
import { FaGoogle, FaApple } from "react-icons/fa";
import tailwindcss from "../../assets/tailwindcss.png";
import html from "../../assets/html.png";
import css from "../../assets/css.png";
import react from "../../assets/react.png";
import kotlin from "../../assets/kotlin.png";
const Experience = () => {
  return (
    <section id="experience" className=" py-20 text-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-3xl poppins-bold text-white mb-8 poppins-bold text-center">
          EXPERIENCE WITH
        </h2>
        <div className="flex justify-center items-center gap-8 pb-20">
          <img src={html} alt="HTML5" className="w-16 h-16 " />
          <img src={css} alt="CSS3" className="w-16 h-16 " />
          <img src={react} alt="React" className="w-16 h-16 " />
          <img src={tailwindcss} alt="React" className="w-16 h-16 " />
          <img src={kotlin} alt="React" className="w-16 h-16 " />
        </div>
        <h2 className="text-3xl poppins-bold text-center mb-12 poppins-bold pt-20">
          ORGANIZATION EXPERIENCE
        </h2>

        <div className="flex flex-col space-y-8">
          {/* Google */}
          <div className="flex">

            <div>
              <div className="flex justify-between">
                <h3 className="text-xl poppins-semibold">Website Coordinator</h3>
                <p className="text-gray-400">Jan 2024 - Present</p>
              </div>
              <p className="text-gray-300">
                Leading the development of UMN Mentoring's official website with
                a developer team using React JS, Tailwind CSS, and Firebase.
                Focused on creating a responsive and user-friendly platform to
                support mentoring activities.
              </p>
            </div>
          </div>

          {/* Apple */}
          <div className="flex">
            <div>
              <div className="flex justify-between">
                <h3 className="text-xl poppins-semibold">
                  Participant Garuda Hacks 5.0
                </h3>
                <p className="text-gray-400">Jul 2024 - Jul 2024</p>
              </div>
              <p className="text-gray-300">
                Being a participant for Garuda Hacks 5.0 by creating a project
                named "WeShare" that could help unprivilege people that
                difficult getting access to health care
              </p>
            </div>
          </div>
          <div className="flex">
            <div>
              <div className="flex justify-between">
                <h3 className="text-xl poppins-semibold">Mentor</h3>
                <p className="text-gray-400">Mar 2023 - Dec 2023</p>
              </div>
              <p className="text-gray-300">
                Guided Mentees (first-year students) to understand and apply
                UMN's 5C values (Caring, Credible, Competent, Competitive,
                Customer Delight) in their university life. Committed to
                supporting their personal and professional development through
                mentoring.
              </p>
            </div>
          </div>
          <div className="flex">
            <div>
              <div className="flex justify-between">
                <h3 className="text-xl poppins-semibold">
                  Logistics and Security
                </h3>
                <p className="text-gray-400">Feb 2023 - Aug 2023</p>
              </div>
              <p className="text-gray-300">
                Committee for Equipment and Security at ISFEST 2023. Ensuring
                seamless organization, logistics, and safety for the event.
                Skilled in problem-solving, communication, and critical
                decision-making. Committed to delivering exceptional results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
