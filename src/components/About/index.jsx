import React from "react";
import Profile from "../../assets/aljasonch.jpeg";

const About = ({scrollToSection}) => {
  const handleNavItemClick = (section) => {
    scrollToSection(section);
  };
  return (
    <section id="about" className="py-20 bg-neutral-950">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <p className="text-gray-400 poppins-regular text-lg">Hey, I'm Jason</p>
            <h2 className="text-3xl md:text-5xl poppins-bold text-white mb-4">
              I'm an Experienced <span className="text-blue-500">Website</span> and <span className="text-blue-500">App Developer</span>
            </h2>
            <p className="text-gray-400 poppins-regular text-base mb-6">
              I'm a passionate website and app developer with a strong background
              in creating engaging and functional websites. I'm also deeply
              interested in the latest technologies and always eager to explore
              new tools and frameworks.
            </p>
            <div className="flex flex-col sm:flex-row">
              <button onClick={() => handleNavItemClick('contact')} className="bg-blue-500 hover:bg-transparent hover:border-blue-500 hover:border text-white hover:text-blue-500 font-bold py-3 px-6 lg:mr-6 rounded-full mb-4 sm:mb-0 sm:mr-6">
                Get In Touch
              </button>
              <button className="bg-transparent border border-blue-500 hover:bg-blue-600 text-blue-500 hover:text-white font-bold py-3 px-6 rounded-full">
                <a
                  href="/CV_Alfonsus Jason Christian.pdf"
                  download="CV_Alfonsus Jason Christian.pdf"
                >
                  Download CV
                </a>
              </button>
            </div>
          </div>
          <div className=" w-[300px] h-[300px] md:w-[350px] md:h-[350px] relative overflow-hidden rounded-full mb-8 md:mb-0">
            <img
              src={Profile}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;