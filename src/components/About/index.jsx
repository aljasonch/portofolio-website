import React from "react";
import Profile from "../../assets/aljasonch.jpeg";

const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6 max-w-6xl flex items-center justify-between">
        {" "}
        {/* Set max-width here */}
        <div className="w-1/2">
          <p className="text-gray-400 text-sm mb-2">Hey, I'm Jason</p>
          <h2 className="text-5xl font-bold text-white mb-4">
            I'm an Experienced <span className="text-blue-500">Website</span>{" "}
            and <span className="text-blue-500">App Developer</span>
          </h2>
          <p className="text-gray-400 text-base mb-6">
            I'm a passionate website and app developer with a strong background
            in creating engaging and functional websites. I'm also deeply
            interested in the latest technologies and always eager to explore
            new tools and frameworks.
          </p>
          <button className="bg-blue-500 hover:bg-transparent hover:border-blue-500 hover:border text-white hover:text-blue-500 font-bold py-3 px-6 mr-6 rounded-full">
            Get In Touch
          </button>
          <button className="bg-transparent border border-blue-500 hover:bg-blue-600 text-blue-500 hover:text-white font-bold py-3 px-6 rounded-full">
            Download CV
          </button>
        </div>
        <div className="w-[350px] h-[350px] relative overflow-hidden rounded-full">
          <img
            src={Profile}
            alt="Profile Photo"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
